<?php

use App\Http\Controllers\Auth\CustomerAuthController;
use App\Http\Controllers\Auth\OwnerAuthController;
use App\Http\Controllers\Customer\DiningLogController;
use App\Http\Controllers\Customer\ProfileController as CustomerProfileController;
use App\Http\Controllers\Customer\ReviewController as CustomerReviewController;
use App\Http\Controllers\Owner\CategoryController;
use App\Http\Controllers\Owner\MenuItemController;
use App\Http\Controllers\Owner\ProfileController as OwnerProfileController;
use App\Http\Controllers\Owner\RestaurantController as OwnerRestaurantController;
use App\Http\Controllers\Owner\ReviewController as OwnerReviewController;
use App\Http\Controllers\Public\RestaurantController as PublicRestaurantController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Auth Routes
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
| Public Browsing Routes
|--------------------------------------------------------------------------
*/

Route::get('/restaurants', [PublicRestaurantController::class, 'index']);
Route::get('/restaurants/{restaurant}', [PublicRestaurantController::class, 'show']);
Route::get('/search/restaurants', [PublicRestaurantController::class, 'search']);

/*
|--------------------------------------------------------------------------
| Protected Owner Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', 'owner'])->prefix('owner')->group(function () {
    Route::post('/logout', [OwnerAuthController::class, 'logout']);
    Route::get('/me', [OwnerAuthController::class, 'me']);

    Route::get('/profile', [OwnerProfileController::class, 'show']);
    Route::put('/profile', [OwnerProfileController::class, 'update']);

    Route::apiResource('restaurants', OwnerRestaurantController::class);

    Route::get('restaurants/{restaurant}/categories', [CategoryController::class, 'index']);
    Route::post('restaurants/{restaurant}/categories', [CategoryController::class, 'store']);
    Route::put('categories/{category}', [CategoryController::class, 'update']);
    Route::delete('categories/{category}', [CategoryController::class, 'destroy']);

    Route::get('categories/{category}/menu-items', [MenuItemController::class, 'index']);
    Route::post('categories/{category}/menu-items', [MenuItemController::class, 'store']);
    Route::put('menu-items/{menuItem}', [MenuItemController::class, 'update']);
    Route::delete('menu-items/{menuItem}', [MenuItemController::class, 'destroy']);

    Route::get('restaurants/{restaurant}/reviews', [OwnerReviewController::class, 'index']);
    Route::post('reviews/{review}/reply', [OwnerReviewController::class, 'reply']);
});

/*
|--------------------------------------------------------------------------
| Protected Customer Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', 'customer'])->prefix('customer')->group(function () {
    Route::post('/logout', [CustomerAuthController::class, 'logout']);
    Route::get('/me', [CustomerAuthController::class, 'me']);

    Route::get('/profile', [CustomerProfileController::class, 'show']);
    Route::put('/profile', [CustomerProfileController::class, 'update']);

    Route::post('restaurants/{restaurant}/reviews', [CustomerReviewController::class, 'store']);
    Route::put('reviews/{review}', [CustomerReviewController::class, 'update']);
    Route::delete('reviews/{review}', [CustomerReviewController::class, 'destroy']);

    Route::get('dining-logs/summary', [DiningLogController::class, 'summary']);
    Route::apiResource('dining-logs', DiningLogController::class)->except(['show']);
});
