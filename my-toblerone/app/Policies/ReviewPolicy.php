<?php

namespace App\Policies;

use App\Models\Review;
use App\Models\User;

class ReviewPolicy
{
    public function create(User $user): bool
    {
        return $user->customer()->exists(); // Only customers can leave reviews
    }

    public function update(User $user, Review $review): bool
    {
        return $user->id === $review->customer_id; // Only the customer who wrote the review
    }

    public function delete(User $user, Review $review): bool
    {
        return $user->id === $review->customer_id;
    }
}
