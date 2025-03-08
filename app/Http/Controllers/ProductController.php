<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
  
    public function index()
    {
        return Product::all();
    }


  public function store(Request $request)
{
    try {
        Log::info("Received data: " . json_encode($request->all())); // Log request data
        
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'discount_price' => 'nullable|numeric',
            'image' => 'required|string|max:255',
            'images' => 'required|array',
            'available_colors' => 'required|array',
            'available_sizes' => 'required|array',
            'stock' => 'required|array',
            'category' => 'required|string|max:255',
            'gender' => 'required|string|max:255',
            'age_group' => 'required|string|max:255'
        ]);

        Log::info("Validated data: " . json_encode($validatedData));

        $product = Product::create($validatedData);
        Log::info("Product created: " . json_encode($product));

        return response()->json($product, 201);
    } catch (\Exception $e) {
        Log::error("Error creating product: " . $e->getMessage());
        return response()->json(['error' => 'Internal Server Error'], 500);
    }
}


    
    public function show(Product $product)
    {
        return $product;
    }

    
    public function update(Request $request, Product $product)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'image' => 'sometimes|string|max:255',
            'available_colors' => 'sometimes|array',
            'available_sizes' => 'sometimes|array',
            'stock' => 'sometimes|array',
            'category' => 'sometimes|string|max:255',
            'gender' => 'sometimes|string|max:255',
            'age_group' => 'sometimes|string|max:255'
        ]);

        $product->update($validatedData);

        return response()->json($product, 200);
    }

  
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(null, 204);
    }


public function checkout(Request $request, $id)
{
    Log::info("Checkout request received for product ID: $id");

    $validatedData = $request->validate([
        'color' => 'required|string|max:255',
        'size' => 'required|string|max:255',
        'quantity' => 'required|integer|min:1'
    ]);

    try {
        $product = Product::findOrFail($id);
        Log::info("Product found: " . $product->name);

        $variant = $validatedData['color'] . '_' . $validatedData['size'];
        Log::info("Variant: $variant");

        if (!isset($product->stock[$variant])) {
            Log::warning("Variant not found: $variant");
            return response()->json(['error' => 'Variant not found'], 404);
        }

        if ($product->stock[$variant] < $validatedData['quantity']) {
            Log::warning("Insufficient stock for variant: $variant");
            return response()->json(['error' => 'Insufficient stock'], 400);
        }

        $product->stock[$variant] -= $validatedData['quantity'];

        if ($product->stock[$variant] == 0) {
            unset($product->stock[$variant]);
        }
        $product->save();

        return response()->json($product, 200);

    } catch (ModelNotFoundException $e) {
        Log::error("Product not found: $id");
        return response()->json(['error' => 'Product not found'], 404);
    } catch (\Exception $e) {
        Log::error("An error occurred: " . $e->getMessage());
        return response()->json(['error' => 'An internal error occurred'], 500);
    }
}

   
}
