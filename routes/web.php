<?php

use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::get('/collection/wishlist', function () {
    return Inertia::render('wishlist');
})->name('wishlist');

Route::get('/collection', [BookController::class, 'index'])->name('collection');
