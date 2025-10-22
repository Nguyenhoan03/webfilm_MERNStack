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
        Schema::create('adult_film_product_tags', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id'); // Liên kết với bảng products
            $table->unsignedBigInteger('tag_id'); // Liên kết với bảng adult_film_tags
            $table->timestamps();
            
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('tag_id')->references('id')->on('adult_film_tags')->onDelete('cascade');
            
            $table->unique(['product_id', 'tag_id']);
            $table->index('product_id');
            $table->index('tag_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adult_film_product_tags');
    }
};
