<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;

class CategoryPolicy
{
    public function create(User $user, int $restaurantOwnerId): bool
    {
        return $user->id === $restaurantOwnerId;
    }

    public function update(User $user, Category $category): bool
    {
        return $user->id === $category->restaurant->owner_id;
    }

    public function delete(User $user, Category $category): bool
    {
        return $user->id === $category->restaurant->owner_id;
    }
}
