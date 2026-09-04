<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReviewReplySeeder extends Seeder
{
    public function run(): void
    {
        $reviewReplies = [
            [
                'review_id' => 1,
                'owner_reply' => 'Thank you so much Ali Bhai! Looking forward to hosting you again soon.',
            ],
            [
                'review_id' => 3,
                'owner_reply' => 'Apologies for the delay, Bilal. Weekend rush in Islamabad gets intense. We are working on speeding up service!',
            ],
        ];

        foreach ($reviewReplies as $reply) {
            DB::table('review_replies')->insert(array_merge($reply, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
