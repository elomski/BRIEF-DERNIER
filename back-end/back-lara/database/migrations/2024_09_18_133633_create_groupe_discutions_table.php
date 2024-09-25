<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('groupe_discutions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('groupe_id')->nullable();
            $table->longText('message');
            $table->string('file')->nullable();
            $table->String('file_type')->default(0);

            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('groupe_id')->references('id')->on('groupes')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groupe_discutions');
    }
};
