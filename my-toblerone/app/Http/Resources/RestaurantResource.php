<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RestaurantResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'address' => $this->address,
            'cuisine_type' => $this->cuisine_type,
            'price_range' => $this->price_range,
            'avg_rating' => $this->avg_rating,
            'categories' => CategoryResource::collection($this->whenLoaded('categories')),
            'reviews' => ReviewResource::collection($this->whenLoaded('reviews')),
            'created_at' => $this->created_at,
        ];
    }
}
