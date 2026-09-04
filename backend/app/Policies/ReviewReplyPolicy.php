<?php

namespace App\Policies;

use App\Models\Review;
use App\Models\ReviewReply;
use App\Models\User;

class ReviewReplyPolicy
{
    public function create(User $user, Review $review): bool
    {
        // Only the owner of the reviewed restaurant can reply
        return $user->id === $review->restaurant->owner_id;
    }

    public function update(User $user, ReviewReply $reviewReply): bool
    {
        return $user->id === $reviewReply->review->restaurant->owner_id;
    }

    public function delete(User $user, ReviewReply $reviewReply): bool
    {
        return $user->id === $reviewReply->review->restaurant->owner_id;
    }
}
