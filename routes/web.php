<?php

use App\Http\Controllers\BookController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::get('/collection/wishlist', function () {
    return Inertia::render('wishlist');
})->name('wishlist');

Route::get('/collection', [BookController::class, 'index'])->name('collection');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/collection/wishlist', function () {
        return Inertia::render('wishlist');
    })->name('wishlist');
});

Route::get('/reset-password/{token}', function ($token, Request $request) {
    // Cek apakah token ada di database dan belum expired
    $record = DB::table('password_reset_tokens')->where('email', $request->email)->first();

    if (
        !$record || !Hash::check($token, $record->token) ||
        Carbon::parse($record->created_at)->addMinutes(config('auth.passwords.users.expire'))->isPast()
    ) {

        // Jika expired atau tidak valid, arahkan ke halaman lain atau tampilkan error
        return abort(403);
    }

    return Inertia::render('Auth/ResetPassword', [
        'token' => $token,
        'email' => $request->email
    ]);
})->name('password.reset');