<?php

use App\Http\Controllers\CommandeController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
// In your routes/api.php or in a middleware

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth:sanctum')->group(function() {
    // Fetch all orders
    Route::get('commandes', [CommandeController::class, 'index']);

    Route::get('/my-commandes', [CommandeController::class, 'userCommandes']);


    // Fetch a specific order by ID
    Route::get('commandes/{commande}', [CommandeController::class, 'show']);
    Route::get('/users', [UserController::class, 'index']);
    // Place a new order
    Route::post('commandes', [CommandeController::class, 'store']);

    // Product routes that should be protected
    Route::post('/products', [ProductController::class, 'store']);
});



Route::post('/register', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'address' => 'required|string|max:255',
        'phone' => 'required|string|max:20',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8',
    ]);

    $user = User::create([
        'name' => $request->name,
        'address' => $request->address,
        'phone' => $request->phone,
        'email' => $request->email,
        'password' => bcrypt($request->password),
    ]);

    return response()->json($user, 201);
});

// Login
Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return $user->createToken('auth_token')->plainTextToken;
});


// Logout
Route::post('/logout', function (Request $request) {
    $request->user()->tokens()->delete();
    return response()->json(['message' => 'Logged out']);
})->middleware('auth:sanctum');
