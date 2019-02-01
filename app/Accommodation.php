<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Accommodation extends Model
{
    protected $fillable = [
        'title',
        'featured_image',
        'type',
        'num_of_beds',
        'features',
        'content',
        'description',
        'images',
        'price',
        'num_of_guests'
    ];

    protected $casts = [
        'images' => 'array',
        'features' => 'array',
        'best_seller' => 'boolean',
        'trending' => 'boolean'
    ];
}
