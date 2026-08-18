<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RestaurantSeeder extends Seeder
{
    public function run(): void
    {
        $restaurants = [
            [
                'id' => 1,
                'owner_id' => 1,
                'name' => 'Haveli Shinwari & BBQ',
                'description' => 'Authentic Peshawari Shinwari Karahi and charcoal BBQ in Lahore.',
                'address' => 'MM Alam Road, Gulberg III, Lahore',
                'cuisine_type' => 'Pakistani',
                'price_range' => '$$$',
                'avg_rating' => 4.5,
            ],
            [
                'id' => 2,
                'owner_id' => 2,
                'name' => 'Butt Karahi Tikka',
                'description' => 'Famous Desi Mutton and Chicken Karahi prepared in pure desi ghee.',
                'address' => 'Lakshmi Chowk, McLeod Road, Lahore',
                'cuisine_type' => 'Desi / Pakistani',
                'price_range' => '$$',
                'avg_rating' => 4.8,
            ],
            [
                'id' => 3,
                'owner_id' => 3,
                'name' => 'Khyber Charsi Tikka',
                'description' => 'Traditional KPK style lamb tikka and salted karahi.',
                'address' => 'F-7 Markaz, Islamabad',
                'cuisine_type' => 'Pashtun / BBQ',
                'price_range' => '$$$',
                'avg_rating' => 4.2,
            ],
        ];

        foreach ($restaurants as $restaurant) {
            DB::table('restaurants')->insert(array_merge($restaurant, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
