<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OwnerSeeder extends Seeder
{
    public function run(): void
    {
        $owners = [
            ['user_id' => 1, 'business_tax_id' => 'NTN-9876543-1', 'phone_number' => '+923001234567', 'is_identity_verified' => true],
            ['user_id' => 2, 'business_tax_id' => 'NTN-8765432-2', 'phone_number' => '+923219876543', 'is_identity_verified' => true],
            ['user_id' => 3, 'business_tax_id' => 'NTN-7654321-3', 'phone_number' => '+923335554443', 'is_identity_verified' => false],
        ];

        foreach ($owners as $owner) {
            DB::table('owners')->insert(array_merge($owner, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
