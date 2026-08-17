<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        $menuItems = [
            // Haveli Shinwari
            ['category_id' => 1, 'name' => 'Mutton Shinwari Karahi (1KG)', 'description' => 'Fresh mutton cooked in lamb fat, tomatoes, and green chillies.', 'price' => 3200.00, 'is_available' => true],
            ['category_id' => 1, 'name' => 'Chicken Shinwari Karahi (1KG)', 'description' => 'Fresh chicken prepared with minimal spices and green peppers.', 'price' => 1800.00, 'is_available' => true],
            ['category_id' => 2, 'name' => 'Chicken Malai Boti (Plate)', 'description' => 'Creamy grilled chicken skewers.', 'price' => 950.00, 'is_available' => true],
            ['category_id' => 2, 'name' => 'Roghni Naan', 'description' => 'Fresh tandoori naan topped with sesame seeds and butter.', 'price' => 120.00, 'is_available' => true],

            // Butt Karahi
            ['category_id' => 3, 'name' => 'Desi Ghee Mutton Karahi (1KG)', 'description' => 'Lahori style mutton karahi prepared in premium desi ghee.', 'price' => 3800.00, 'is_available' => true],
            ['category_id' => 3, 'name' => 'Chicken Karahi (1KG)', 'description' => 'Classic spicy Lahori chicken karahi.', 'price' => 2100.00, 'is_available' => true],
            ['category_id' => 4, 'name' => 'Garlic Naan', 'description' => 'Tandoori naan topped with fresh garlic and coriander.', 'price' => 100.00, 'is_available' => true],

            // Khyber Charsi Tikka
            ['category_id' => 5, 'name' => 'Dumba Salted Tikka (500g)', 'description' => 'Juicy lamb pieces seasoned purely with sea salt.', 'price' => 2200.00, 'is_available' => true],
            ['category_id' => 5, 'name' => 'Kabuli Pulao', 'description' => 'Traditional Afghan rice served with raisins and carrots.', 'price' => 850.00, 'is_available' => false],
            ['category_id' => 6, 'name' => 'Peshawari Qahwa', 'description' => 'Green tea brewed with cardamom and mint.', 'price' => 150.00, 'is_available' => true],
        ];

        foreach ($menuItems as $item) {
            DB::table('menu_items')->insert(array_merge($item, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
