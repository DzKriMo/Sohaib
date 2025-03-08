<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    public function checkout(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer',
            'size' => 'required|string',
            'color' => 'required|string',
            'quantity' => 'required|integer|min:1',
        ]);

        $productId = $request->input('product_id');
        $size = $request->input('size');
        $color = $request->input('color');
        $quantity = $request->input('quantity');

        Log::info("Checkout request: product_id=$productId, size=$size, color=$color, quantity=$quantity");

        try {
            $product = Product::findOrFail($productId);

            Log::info("Product found: " . json_encode($product));

            $stockKey = $color . '_' . $size;

            if (isset($product->stock[$stockKey])) {
                $currentStock = $product->stock[$stockKey];

                Log::info("Current stock for $stockKey: $currentStock");

                if ($currentStock >= $quantity) {
                    $product->stock[$stockKey] = $currentStock - $quantity;

                    Log::info("Updated stock for $stockKey: " . $product->stock[$stockKey]);

                    $product->save();

                    return response()->json([
                        'success' => true,
                        'message' => 'Checkout successful',
                        'remaining_stock' => $product->stock[$stockKey],
                    ]);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Insufficient stock',
                    ], 400);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid color or size',
                ], 400);
            }
        } catch (ModelNotFoundException $e) {
            Log::error("Product not found: $productId");
            return response()->json([
                'success' => false,
                'message' => 'Product not found',
            ], 404);
        } catch (\Exception $e) {
            Log::error("Error during checkout: " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'An error occurred',
            ], 500);
        }
    }
}
