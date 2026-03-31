<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index(Request $request)
    {
        set_time_limit(60);

        $search = $request->input('search', '');
        $genre = $request->input('genre', '');
        $page = $request->input('page', 1);
        $perPage = 28;

        $cacheKey = "book_search_" . md5("{$search}_{$genre}_{$page}");

        // Bungkus SEMUA proses fetching ke dalam Cache
        $data = Cache::remember($cacheKey, now()->addMinutes(30), function () use ($search, $genre, $page, $perPage) {
            // Build query untuk Google Books API
            $query = !empty($search) ? $search : 'novel';
            if (!empty($genre) && $genre !== 'all') {
                $query .= "+subject:{$genre}";
            }

            // Google Books API menggunakan startIndex (0-based) dan maxResults
            $startIndex = ($page - 1) * $perPage;

            $response = Http::timeout(5)->retry(1, 100)->get('https://www.googleapis.com/books/v1/volumes', [
                'q' => $query,
                'startIndex' => $startIndex,
                'maxResults' => $perPage,
                'printType' => 'books',
            ]);

            return $response->successful() ? $response->json() : ['items' => [], 'totalItems' => 0];
        });

        // Map data ke format yang dibutuhkan frontend
        $books = collect($data['items'] ?? [])->map(fn($item) => [
            'id' => $item['id'],
            'title' => $item['volumeInfo']['title'] ?? 'Tanpa Judul',
            'author' => implode(', ', array_slice($item['volumeInfo']['authors'] ?? ['Unknown'], 0, 2)),
            'cover' => $item['volumeInfo']['imageLinks']['thumbnail']
                ?? $item['volumeInfo']['imageLinks']['smallThumbnail']
                ?? null,
            'genre' => $item['volumeInfo']['categories'][0] ?? null,
            'badge' => 'Gratis',
        ]);

        $total = $data['totalItems'] ?? 0;
        $lastPage = (int) ceil($total / $perPage);

        $wishlistedIds = auth()->check()
            ? auth()->user()->wishlists()->pluck('book_id')->toArray()
            : [];

        return Inertia::render('Collection', [
            'books' => $books,
            'pagination' => [
                'current_page' => (int) $page,
                'last_page' => $lastPage,
                'total' => $total,
                'per_page' => $perPage,
            ],
            'filters' => $request->only(['search', 'genre']),
            'wishlistedIds' => $wishlistedIds
        ]);
    }
}