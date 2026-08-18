<?php

namespace App\Policies;

use App\Models\DiningLog;
use App\Models\User;

class DiningLogPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->customer()->exists();
    }

    public function view(User $user, DiningLog $diningLog): bool
    {
        return $user->id === $diningLog->customer_id; // Only view own dining logs
    }

    public function create(User $user): bool
    {
        return $user->customer()->exists();
    }

    public function delete(User $user, DiningLog $diningLog): bool
    {
        return $user->id === $diningLog->customer_id;
    }
}
