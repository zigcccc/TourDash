<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ImageModel extends Model
{
    protected $fillable = [
        'filename',
        'originalImageUrl',
        'mediumImageUrl',
        'thumbnailImageUrl'
    ];
}
