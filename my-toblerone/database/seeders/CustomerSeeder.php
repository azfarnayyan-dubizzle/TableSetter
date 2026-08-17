<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        $customers = [
            ['user_id' => 4, 'phone_number' => '+923015551122', 'date_of_birth' => '1995-04-12', 'loyalty_points' => 150, 'dietary_preferences' => 'Halal, Less Spicy'],
            ['user_id' => 5, 'phone_number' => '+923344443322', 'date_of_birth' => '1998-09-25', 'loyalty_points' => 320, 'dietary_preferences' => 'Vegetarian'],
            ['user_id' => 6, 'phone_number' => '+923129998877', 'date_of_birth' => '1992-11-05', 'loyalty_points' => 45, 'dietary_preferences' => 'No Dairy'],
            ['user_id' => 7, 'phone_number' => '+923087776655', 'date_of_birth' => '2001-01-30', 'loyalty_points' => 500, 'dietary_preferences' => 'Extra Spicy'],
        ];

        foreach ($customers as $customer) {
            DB::table('customers')->insert(array_merge($customer, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
