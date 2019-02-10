<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

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
        'gallery',
        'price',
        'num_of_guests',
        'trending',
        'best_seller',
        'visible',
        'author_id',
        'num_of_saves'
    ];

    protected $casts = [
        'gallery' => 'array',
        'features' => 'array',
        'best_seller' => 'boolean',
        'trending' => 'boolean',
        'visible' => 'boolean',
        'featured_image' => 'array'
    ];

    public function author()
    {
        return $this->hasOne('App\User', 'id', 'author_id');
    }
}
