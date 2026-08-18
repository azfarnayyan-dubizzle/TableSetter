<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            OwnerSeeder::class,
            CustomerSeeder::class,
            RestaurantSeeder::class,
            CategorySeeder::class,
            MenuItemSeeder::class,
            ReviewSeeder::class,
            ReviewReplySeeder::class,
            DiningLogSeeder::class,
        ]);
    }
}
