<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\WishlistController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::get('/collection', [BookController::class, 'index'])->name('collection');

Route::get('/reset-password/{token}', function ($token, Request $request) {
    // Cek token
    $record = DB::table('password_reset_tokens')->where('email', $request->email)->first();

    if (
        !$record || !Hash::check($token, $record->token) ||
        Carbon::parse($record->created_at)->addMinutes(config('auth.passwords.users.expire'))->isPast()
    ) {

        // Expired = direct error
        return abort(403);
    }

    return Inertia::render('auth/reset-password', [
        'token' => $token,
        'email' => $request->email
    ]);
})->name('password.reset');


Route::middleware('auth')->group(function () {
    Route::get('/collection/wishlist', [WishlistController::class, 'index'])->name('wishlist');
    Route::post('/collection/wishlist', [WishlistController::class, 'store'])->name('wishlist.store');
    Route::delete('/collection/wishlist/{bookId}', [WishlistController::class, 'destroy'])
        ->where('bookId', '.*') // ← tambah ini, terima semua karakter termasuk slash
        ->name('wishlist.destroy');
    Route::patch('/collection/wishlist/{bookId}', [WishlistController::class, 'updateStatus'])
        ->where('bookId', '.*') // ← tambah ini juga
        ->name('wishlist.updateStatus');
});