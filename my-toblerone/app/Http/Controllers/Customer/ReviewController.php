<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\StoreReviewRequest;
use App\Http\Requests\Customer\UpdateReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Restaurant;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(StoreReviewRequest $request, Restaurant $restaurant)
    {
        $review = $restaurant->reviews()->create([
            'customer_id' => $request->user()->id,
            ...$request->validated(),
        ]);

        $this->refreshAverageRating($restaurant);

        return new ReviewResource($review);
    }

    public function update(UpdateReviewRequest $request, Review $review)
    {
        $this->authorizeReviewOwnership($request, $review);

        $review->update($request->validated());

        $this->refreshAverageRating($review->restaurant);

        return new ReviewResource($review);
    }

    public function destroy(Request $request, Review $review)
    {
        $this->authorizeReviewOwnership($request, $review);

        $restaurant = $review->restaurant;
        $review->delete();

        $this->refreshAverageRating($restaurant);

        return response()->json(null, 204);
    }

    private function authorizeReviewOwnership(Request $request, Review $review): void
    {
        abort_if(
            $review->customer_id !== $request->user()->id,
            403,
            'You can only edit your own reviews.'
        );
    }

    private function refreshAverageRating(Restaurant $restaurant): void
    {
        $restaurant->update([
            'avg_rating' => round($restaurant->reviews()->avg('rating') ?? 0, 1),
        ]);
    }
}
