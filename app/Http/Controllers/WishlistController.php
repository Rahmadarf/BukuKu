<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WishlistController extends Controller
{
    // Tampilkan halaman wishlist
    public function index()
    {
        $books = auth()->user()->wishlists()->latest()->get()->map(function ($item) {
            return [
                'id' => $item->book_id,
                'title' => $item->title,
                'author' => $item->author,
                'cover' => $item->cover,
                'genre' => $item->genre,
                'status' => $item->status,
            ];
        });

        return Inertia::render('wishlist', [
            'books' => $books,
        ]);
    }

    // Tambah ke wishlist
    public function store(Request $request)
    {
        $already = Wishlist::where('user_id', auth()->id())
            ->where('book_id', $request->book_id)
            ->exists();

        if (!$already) {
            Wishlist::create([
                'user_id' => auth()->id(),
                'book_id' => $request->book_id,
                'title' => $request->title,
                'author' => $request->author,
                'cover' => $request->cover,
                'genre' => $request->genre,
                'status' => 'unread',
            ]);
        }

        return back();
    }

    // Hapus dari wishlist
    public function destroy($bookId)
    {

        $bookId = urldecode($bookId);

        Wishlist::where('user_id', auth()->id())
            ->where('book_id', $bookId)
            ->delete();

        return back();
    }

    // Update status buku
    public function updateStatus(Request $request, $bookId)
    {

        $bookId = urldecode($bookId);

        Wishlist::where('user_id', auth()->id())
            ->where('book_id', $bookId)
            ->update(['status' => $request->status]);

        return back();
    }
}