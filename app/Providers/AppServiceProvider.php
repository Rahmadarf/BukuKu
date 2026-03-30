<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Laravel\Fortify\Fortify;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        //Login Page
        Fortify::loginView(function () {
            return Inertia::render('auth/login');
        });

        //Register Page
        Fortify::registerView(function () {
            return Inertia::render('auth/register');
        });

        //Forgot Password Page
        Fortify::requestPasswordResetLinkView(function () {
            return Inertia::render('auth/forgot-password');
        });

        //Reset Password Page
        Fortify::resetPasswordView(function ($request) {
            return Inertia::render('auth/reset-password', [
                'token' => $request->route('token'),
                'email' => $request->input('email'),
            ]);
        });
    }
}
