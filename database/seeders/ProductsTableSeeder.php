<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('products')->insert([
            'name' => 'Penguin Hoodie',
            'price' => 45.99,
            'image' => url('https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg')
        ]);
    }
}
