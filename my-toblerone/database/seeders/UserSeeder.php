<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $password = Hash::make('password123');

        $users = [
            // Owners
            ['id' => 1, 'name' => 'Tariq Mahmood', 'email' => 'tariq@toblerone.pk', 'password' => $password],
            ['id' => 2, 'name' => 'Usman Butt', 'email' => 'usman@toblerone.pk', 'password' => $password],
            ['id' => 3, 'name' => 'Zubair Khan', 'email' => 'zubair@toblerone.pk', 'password' => $password],
            
            // Customers
            ['id' => 4, 'name' => 'Ali Raza', 'email' => 'ali.raza@gmail.com', 'password' => $password],
            ['id' => 5, 'name' => 'Fatima Noor', 'email' => 'fatima.noor@yahoo.com', 'password' => $password],
            ['id' => 6, 'name' => 'Bilal Ahmed', 'email' => 'bilal.ahmed@outlook.com', 'password' => $password],
            ['id' => 7, 'name' => 'Ayesha Malik', 'email' => 'ayesha.m@gmail.com', 'password' => $password],
        ];

        foreach ($users as $user) {
            DB::table('users')->insert(array_merge($user, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
