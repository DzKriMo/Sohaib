<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;




Route::get('/dashboard', function () {
    if (Auth::user()->id !== 1) {
        abort(403, 'Unauthorized action.');
    }
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/', function () {
    return Inertia::render('App');
});

Route::get('/store', function () {
    return Inertia::render('App');
});

Route::get('/cart', function () {
    return Inertia::render('App');
});

Route::get('/contact', function () {
    return Inertia::render('App');
});

Route::get('/loginn', function () {
    return Inertia::render('App');
});

Route::get('/signupp', function () {
    return Inertia::render('App');
});
Route::get('/checkout', function () {
    return Inertia::render('App');
});
Route::get('/dash', function () {
    return Inertia::render('App');
});

Route::get('/productdetails/{id}', function ($id) {
    $product = Product::findOrFail($id); 
    return Inertia::render('ProductDetails', [
        'product' => $product
    ]);
});


require __DIR__.'/auth.php';



