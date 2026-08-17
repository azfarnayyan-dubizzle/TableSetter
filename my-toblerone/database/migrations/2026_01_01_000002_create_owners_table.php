<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('owners', function (Blueprint $table) {
            // user_id is BOTH the primary key AND a foreign key to users.id.
            // This is what makes owners a "satellite" table of users --
            // an owner IS a user, identified by the same id.
            $table->foreignId('user_id')->primary()->constrained('users')->cascadeOnDelete();
            $table->string('business_tax_id', 50)->nullable();
            $table->string('phone_number', 20)->nullable();
            $table->boolean('is_identity_verified')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('owners');
    }
};
