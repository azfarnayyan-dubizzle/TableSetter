<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OwnerProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->user_id,
            'name' => $this->user->name,
            'email' => $this->user->email,
            'business_tax_id' => $this->business_tax_id,
            'phone_number' => $this->phone_number,
            'is_identity_verified' => $this->is_identity_verified,
        ];
    }
}
