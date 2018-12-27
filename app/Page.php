<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Page extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'slug', 'type', 'description', 'content', 'featuredImage', 'options'
    ];

    public function lastEditedBy()
    {
        return $this->belongsTo(User::class);
    }
}
