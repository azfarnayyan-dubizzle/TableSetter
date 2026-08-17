<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['id' => 1, 'restaurant_id' => 1, 'name' => 'Shinwari Karahi'],
            ['id' => 2, 'restaurant_id' => 1, 'name' => 'BBQ & Tandoor'],
            ['id' => 3, 'restaurant_id' => 2, 'name' => 'Desi Ghee Karahi'],
            ['id' => 4, 'restaurant_id' => 2, 'name' => 'Naan & Bread'],
            ['id' => 5, 'restaurant_id' => 3, 'name' => 'Special Tikka'],
            ['id' => 6, 'restaurant_id' => 3, 'name' => 'Beverages'],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert(array_merge($category, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
