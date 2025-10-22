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
        Schema::create('adult_film_ratings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id'); // Liên kết với bảng products
            $table->unsignedBigInteger('user_id')->nullable();
            $table->integer('rating'); // 1-5 sao
            $table->text('review')->nullable(); // Đánh giá chi tiết
            $table->string('ip_address', 45)->nullable();
            $table->boolean('is_anonymous')->default(false);
            $table->timestamps();
            
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            
            $table->unique(['product_id', 'user_id']);
            $table->unique(['product_id', 'ip_address']);
            $table->index('product_id');
            $table->index('rating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adult_film_ratings');
    }
};
