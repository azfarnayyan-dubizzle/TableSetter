<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $reviews = [
            [
                'id' => 1,
                'restaurant_id' => 1,
                'customer_id' => 4,
                'rating' => 5,
                'comment' => 'The Mutton Shinwari Karahi was extremely fresh and delicious! Great ambiance on MM Alam Road.',
            ],
            [
                'id' => 2,
                'restaurant_id' => 2,
                'customer_id' => 5, 
                'rating' => 5,
                'comment' => 'Best Butt Karahi in Lahore! The Desi Ghee flavor is unmatched.',
            ],
            [
                'id' => 3,
                'restaurant_id' => 3,
                'customer_id' => 6, 
                'rating' => 3,
                'comment' => 'Food was good, but the waiting time in F-7 was over an hour.',
            ],
        ];

        foreach ($reviews as $review) {
            DB::table('reviews')->insert(array_merge($review, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
