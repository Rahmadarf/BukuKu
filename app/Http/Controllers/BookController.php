<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $genre = $request->input('genre', '');
        $page = $request->input('page', 1);
        $perPage = 24;

        // Fetch dari Open Library API
        $response = Http::get('https://openlibrary.org/search.json', [
            'q' => !empty($search) ? $search : 'novel',
            'subject' => $genre,
            'page' => $page,
            'limit' => $perPage,
            'fields' => 'key,title,author_name,cover_i,subject,first_publish_year',
        ]);

        $data = $response->json();

        // Map data ke format yang dibutuhkan frontend
        $books = collect($data['docs'] ?? [])->map(fn($book) => [
        'id' => $book['key'],
        'title' => $book['title'] ?? 'Tanpa Judul',
        'author' => implode(', ', array_slice($book['author_name'] ?? ['Unknown'], 0, 2)),
        'cover' => isset($book['cover_i'])
        ? "https://covers.openlibrary.org/b/id/{$book['cover_i']}-M.jpg"
        : null,
        'genre' => $book['subject'][0] ?? null,
        'badge' => 'Gratis', // Open Library semua gratis
        ]);

        $total = $data['numFound'] ?? 0;
        $lastPage = (int)ceil($total / $perPage);

        return Inertia::render('Collection', [
            'books' => $books,
            'pagination' => [
                'current_page' => (int)$page,
                'last_page' => $lastPage,
                'total' => $total,
                'per_page' => $perPage,
            ],
            'filters' => $request->only(['search', 'genre']),
        ]);
    }
}