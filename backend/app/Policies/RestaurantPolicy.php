<?php

namespace App\Policies;

use App\Models\Restaurant;
use App\Models\User;

class RestaurantPolicy
{
    public function viewAny(?User $user): bool
    {
        return true; // Anyone can list restaurants
    }

    public function view(?User $user, Restaurant $restaurant): bool
    {
        return true; // Anyone can view a specific restaurant
    }

    public function create(User $user): bool
    {
        return $user->owner()->exists(); // Only registered owners can create restaurants
    }

    public function update(User $user, Restaurant $restaurant): bool
    {
        return $user->id === $restaurant->owner_id; // Only the restaurant owner
    }

    public function delete(User $user, Restaurant $restaurant): bool
    {
        return $user->id === $restaurant->owner_id;
    }
}
