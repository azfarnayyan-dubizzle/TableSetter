<?php

use App\Http\Controllers\Auth\CustomerAuthController;
use App\Http\Controllers\Auth\OwnerAuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Auth Routes (no token required — this is how you GET a token)
|--------------------------------------------------------------------------
*/

Route::prefix('owner')->group(function () {
    Route::post('/register', [OwnerAuthController::class, 'register']);
    Route::post('/login', [OwnerAuthController::class, 'login']);
});

Route::prefix('customer')->group(function () {
    Route::post('/register', [CustomerAuthController::class, 'register']);
    Route::post('/login', [CustomerAuthController::class, 'login']);
}); 

/*
|--------------------------------------------------------------------------
| Protected Owner Routes
|--------------------------------------------------------------------------
| 'auth:sanctum' checks the token is valid at all.
| 'owner' (our custom middleware) checks the token belongs to an Owner.
| Both must pass before the request reaches the controller.
*/

Route::middleware(['auth:sanctum', 'owner'])->prefix('owner')->group(function () {
    Route::post('/logout', [OwnerAuthController::class, 'logout']);
    Route::get('/me', [OwnerAuthController::class, 'me']);

    // Example of where future owner-only endpoints will live:
    // Route::apiResource('restaurants', RestaurantController::class);
    // Route::apiResource('menu-items', MenuItemController::class);
});

/*
|--------------------------------------------------------------------------
| Protected Customer Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', 'customer'])->prefix('customer')->group(function () {
    Route::post('/logout', [CustomerAuthController::class, 'logout']);
    Route::get('/me', [CustomerAuthController::class, 'me']);

    // Example of where future customer-only endpoints will live:
    // Route::apiResource('reviews', ReviewController::class);
    // Route::apiResource('dining-logs', DiningLogController::class);
});

/*
|--------------------------------------------------------------------------
| Public Routes (no auth needed — browsing restaurants/menus)
|--------------------------------------------------------------------------
*/

// Route::get('/restaurants', [RestaurantController::class, 'index']);
// Route::get('/restaurants/{restaurant:slug}', [RestaurantController::class, 'show']);
