<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->user_id,
            'name' => $this->user->name,
            'email' => $this->user->email,
            'phone_number' => $this->phone_number,
            'date_of_birth' => $this->date_of_birth?->toDateString(),
            'loyalty_points' => $this->loyalty_points,
            'dietary_preferences' => $this->dietary_preferences,
        ];
    }
}
