<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReviewReply extends Model
{
    use HasFactory;

    protected $fillable = [
        'review_id',
        'owner_reply',
    ];

    public function review(): BelongsTo
    {
        return $this->belongsTo(Review::class);
    }

    /**
     * NOT a database relation -- review_replies has no owner_id column
     * in the documented schema. This is a derived accessor that walks
     * review -> restaurant -> owner to find who is allowed to reply.
     * Use sparingly (it triggers extra queries); prefer eager loading
     * ['review.restaurant.owner'] when you need this on many rows.
     */
    public function owner(): ?Owner
    {
        return $this->review?->restaurant?->owner;
    }
}
