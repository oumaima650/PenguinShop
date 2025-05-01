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
            'name' => 'Pack : 2 Mugs',
            'price' => 49,
            'image' => url('https://countrybean.in/cdn/shop/products/website-mugs-1stimage.jpg?v=1676634717')
        ]);
        DB::table('products')->insert([
            'name' => 'Yellow Mug',
            'price' => 29,
            'image' => url('https://www.unicornsuperfoods.com/cdn/shop/files/mugs6.jpg?v=1701408818')
        ]);
        DB::table('products')->insert([
            'name' => 'Bleu Mug',
            'price' => 39,
            'image' => url('https://linatelier.fr/Ils4rR5LPeWqai/uploads/2022/12/P1140287-3.jpg')
        ]);
        DB::table('products')->insert([
            'name' => 'Dark bleu Mug',
            'price' => 29,
            'image' => url('https://www.lepanierdeglantine.com/4969-large_default/mug-greengate-alice-dark-blue.jpg')
        ]);
        DB::table('products')->insert([
            'name' => 'Pink Mug',
            'price' => 39,
            'image' => url('https://wheelandbarrow.com.au/cdn/shop/products/117536_2.jpg?v=1648525001')
        ]);
        DB::table('products')->insert([
            'name' => 'Grey Mug',
            'price' => 29,
            'image' => url('https://standardgifts.co.za/cdn/shop/files/SGN2728_4.png?v=1721312914&width=480')
        ]);
        DB::table('products')->insert([
            'name' => 'Simple White Mug',
            'price' => 29,
            'image' => url('https://aaprintsupplyco.com/cdn/shop/products/11ozceramicmug_800x.jpg?v=1668549652')
        ]);
        DB::table('products')->insert([
            'name' => 'Cast Tan Mug',
            'price' => 39,
            'image' => url('https://cb2.scene7.com/is/image/CB2/CastTanRctvMug12ozSHF23?$web_pdp_main_carousel_med$')
        ]);
        DB::table('products')->insert([
            'name' => 'Pack : 2 Mugs ',
            'price' => 49,
            'image' => url('https://sunday.ma/wp-content/uploads/2021/11/b-300x300.jpg')
        ]);
        DB::table('products')->insert([
            'name' => 'Green Mug',
            'price' => 39,
            'image' => url('https://store.moma.org/cdn/shop/products/e86382f5-75cc-4845-b2fb-e406af0d41eb.jpg?v=1707428961')
        ]);

    }
}
