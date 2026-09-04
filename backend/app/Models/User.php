<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * A user MAY have an owner profile attached.
     * If this relation is null, the user is not registered as an owner.
     */
    public function owner(): HasOne
    {
        return $this->hasOne(Owner::class, 'user_id', 'id');
    }

    public function customer(): HasOne
    {
        return $this->hasOne(Customer::class, 'user_id', 'id');
    }

    /**
     * Convenience helpers so controllers/middleware read cleanly,
     * e.g. if ($user->isOwner()) { ... }
     */
    public function isOwner(): bool
    {
        return $this->owner()->exists();
    }

    public function isCustomer(): bool
    {
        return $this->customer()->exists();
    }
}
