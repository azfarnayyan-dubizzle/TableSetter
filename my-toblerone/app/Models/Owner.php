<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Owner extends Model
{
    use HasFactory;

    // Owner's primary key IS user_id, not an auto-incrementing "id".
    protected $primaryKey = 'user_id';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'business_tax_id',
        'phone_number',
        'is_identity_verified',
    ];

    /**
     * The underlying user identity (login credentials) for this owner.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * An owner can manage multiple restaurants.
     */
    public function restaurants(): HasMany
    {
        return $this->hasMany(Restaurant::class, 'owner_id', 'user_id');
    }
}
