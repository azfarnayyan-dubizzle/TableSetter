<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DiningLogSeeder extends Seeder
{
    public function run(): void
    {
        $diningLogs = [
            ['customer_id' => 4, 'restaurant_id' => 1, 'amount_spent' => 4270.00, 'note' => 'Family dinner at Haveli Shinwari'],
            ['customer_id' => 5, 'restaurant_id' => 2, 'amount_spent' => 3900.00, 'note' => 'Weekend lunch with friends'],
            ['customer_id' => 6, 'restaurant_id' => 3, 'amount_spent' => 2350.00, 'note' => 'Dumba Tikka night out'],
            ['customer_id' => 7, 'restaurant_id' => 1, 'amount_spent' => 1920.00, 'note' => 'Casual dining'],
        ];

        foreach ($diningLogs as $log) {
            DB::table('dining_logs')->insert(array_merge($log, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
