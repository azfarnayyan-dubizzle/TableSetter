<?php

namespace App\Policies;

use App\Models\MenuItem;
use App\Models\User;

class MenuItemPolicy
{
    public function create(User $user, int $restaurantOwnerId): bool
    {
        return $user->id === $restaurantOwnerId;
    }

    public function update(User $user, MenuItem $menuItem): bool
    {
        return $user->id === $menuItem->category->restaurant->owner_id;
    }

    public function delete(User $user, MenuItem $menuItem): bool
    {
        return $user->id === $menuItem->category->restaurant->owner_id;
    }
}
