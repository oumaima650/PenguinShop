<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('commande_product', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('commande_id'); // Foreign key to commandes
            $table->unsignedBigInteger('product_id');  // Foreign key to products
            $table->integer('quantity');  // Quantity of the product
            $table->decimal('price', 8, 2);  // Price of the product at the time of order
            $table->timestamps();

            $table->foreign('commande_id')->references('id')->on('commandes')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('commande_product');
    }
};
