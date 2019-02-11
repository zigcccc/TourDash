<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        "type",
        "user_id",
        "refers_to",
        "content"
    ];

    protected $casts = ["content" => "array"];


    public function user()
    {
        return $this->belongsTo('\App\User', 'user_id', 'id')->select('name', 'avatar');
    }

}
