<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'price', 'image'];

    public function commandes()
    {
        return $this->belongsToMany(Commande::class)->withPivot('quantity', 'price');
    }
}
