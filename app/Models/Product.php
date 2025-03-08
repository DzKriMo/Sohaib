<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'image',
        'available_colors',
        'available_sizes',
        'stock',
        'category',
        'gender',
        'age_group',
        'images'
    ];

    protected $casts = [
        'available_colors' => 'array',
        'available_sizes' => 'array',
        'stock' => 'array',
        'images'=> 'array'
    ];
}

