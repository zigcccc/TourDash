<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = ["user_id", "accommodation_id", "rating", "review", "approved"];

    protected $casts = ["approved" => "boolean"];

    public function author()
    {
        return $this->belongsTo('\App\User', 'user_id', 'id');
    }

    public function accommodation()
    {
        return $this->belongsTo('\App\Accommodation', 'accommodation_id', 'id');
    }
}
