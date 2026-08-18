<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function index(Request $request)
    {
        $query = Restaurant::query();

        if ($request->filled('cuisine_type')) {
            $query->where('cuisine_type', $request->query('cuisine_type'));
        }

        if ($request->filled('price_range')) {
            $query->where('price_range', $request->query('price_range'));
        }

        if ($request->filled('min_rating')) {
            $query->where('avg_rating', '>=', $request->query('min_rating'));
        }

        $restaurants = $query->latest()->paginate(12);

        return RestaurantResource::collection($restaurants);
    }

    public function show(Restaurant $restaurant)
    {
        $restaurant->load(['categories.menuItems', 'reviews.customer.user', 'reviews.reply']);

        return new RestaurantResource($restaurant);
    }

    public function search(Request $request)
    {
        $request->validate(['q' => ['required', 'string']]);

        $results = Restaurant::search($request->query('q'))->get();

        return RestaurantResource::collection($results);
    }
}
