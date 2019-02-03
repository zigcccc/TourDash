<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        "setting_name",
        "setting_value",
        "setting_purpose",
        "public"
    ];

    protected $casts = [
        "public" => "boolean"
    ];
}
