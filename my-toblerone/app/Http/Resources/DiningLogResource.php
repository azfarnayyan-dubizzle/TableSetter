<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DiningLogResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'restaurant' => $this->whenLoaded('restaurant', fn () => $this->restaurant ? [
                'id' => $this->restaurant->id,
                'name' => $this->restaurant->name,
            ] : null),
            'amount_spent' => $this->amount_spent,
            'note' => $this->note,
            'logged_at' => $this->created_at,
        ];
    }
}
