<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Owner\ReplyToReviewRequest;
use App\Http\Resources\ReviewReplyResource;
use App\Http\Resources\ReviewResource;
use App\Models\Restaurant;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Request $request, Restaurant $restaurant)
    {
        abort_if(
            $restaurant->owner_id !== $request->user()->id,
            403,
            'You do not own this restaurant.'
        );

        $reviews = $restaurant->reviews()
            ->with(['customer.user', 'reply'])
            ->latest()
            ->get();

        return ReviewResource::collection($reviews);
    }

    public function reply(ReplyToReviewRequest $request, Review $review)
    {
        abort_if(
            $review->restaurant->owner_id !== $request->user()->id,
            403,
            'You cannot reply to a review on a restaurant you do not own.'
        );

        abort_if(
            $review->reply()->exists(),
            409,
            'This review already has a reply.'
        );

        $reply = $review->reply()->create([
            'owner_reply' => $request->validated('owner_reply'),
        ]);

        return new ReviewReplyResource($reply);
    }
}
