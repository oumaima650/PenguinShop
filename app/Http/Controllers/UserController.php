<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Request;

class UserController extends Controller{
    public function index(){
        return response()->json(User::all());
    }

}
