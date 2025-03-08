<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::post('/', [ProductController::class, 'store']);
    Route::get('/{product}', [ProductController::class, 'show']);
    Route::put('/{product}', [ProductController::class, 'update']);
    Route::delete('/{product}', [ProductController::class, 'destroy']);
    Route::post('/{product}/checkout', [ProductController::class, 'checkout']);
});




