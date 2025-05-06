<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommandeController extends Controller
{

    public function index()
    {
        $user = Auth::user();
        $commandes = $user->commandes;
        return response()->json($commandes);
    }
    public function userCommandes(Request $request)
    {
        $user = $request->user();

        $commandes = Commande::with(['products'])
        ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($commandes);
    }

    // Show a specific order
    public function show($id)
    {
        $commande = Commande::with('products')->findOrFail($id);
        return response()->json($commande);
    }

    // Store a new order (with products)
    public function store(Request $request)
    {
        $request->validate([
            'total_price' => 'required|numeric',
            'products' => 'required|array',
            'products.*.product_id' => 'required|integer|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();

        $commande = Commande::create([
            'user_id' => $user->id,
            'total_price' => $request->total_price,
            'status' => 'pending',
        ]);

        foreach ($request->products as $productData) {
            $product = Product::findOrFail($productData['product_id']);
            $commande->products()->attach($product, [
                'quantity' => $productData['quantity'],
                'price' => $product->price,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Order placed successfully!',
            'commande' => $commande
        ], 201);

    }

}
