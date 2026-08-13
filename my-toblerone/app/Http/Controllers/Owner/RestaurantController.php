<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Owner\StoreRestaurantRequest;
use App\Http\Requests\Owner\UpdateRestaurantRequest;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function index(Request $request)
    {
        $restaurants = $request->user()->owner->restaurants()->latest()->get();

        return RestaurantResource::collection($restaurants);
    }

    public function store(StoreRestaurantRequest $request)
    {
        $restaurant = $request->user()->owner->restaurants()->create($request->validated());

        return new RestaurantResource($restaurant);
    }

    public function show(Request $request, Restaurant $restaurant)
    {
        $this->authorizeOwnership($request, $restaurant);

        return new RestaurantResource($restaurant->load(['categories.menuItems', 'reviews.customer.user', 'reviews.reply']));
    }

    public function update(UpdateRestaurantRequest $request, Restaurant $restaurant)
    {
        $this->authorizeOwnership($request, $restaurant);

        $restaurant->update($request->validated());

        return new RestaurantResource($restaurant);
    }

    public function destroy(Request $request, Restaurant $restaurant)
    {
        $this->authorizeOwnership($request, $restaurant);

        $restaurant->delete();

        return response()->json(null, 204);
    }

    private function authorizeOwnership(Request $request, Restaurant $restaurant): void
    {
        abort_if(
            $restaurant->owner_id !== $request->user()->id,
            403,
            'You do not own this restaurant.'
        );
    }
}
