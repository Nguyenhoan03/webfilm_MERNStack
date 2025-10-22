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
        Schema::create('adult_film_views', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id'); // Liên kết với bảng products
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent', 500)->nullable();
            $table->string('country', 2)->nullable(); // ISO country code
            $table->string('city', 100)->nullable();
            $table->timestamp('viewed_at')->useCurrent();
            $table->integer('duration_watched')->nullable(); // Thời gian xem (giây)
            $table->string('referrer', 500)->nullable();
            $table->timestamps();
            
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            
            $table->index(['product_id', 'viewed_at']);
            $table->index('ip_address');
            $table->index('country');
            $table->index('viewed_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adult_film_views');
    }
};
