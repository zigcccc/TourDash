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
        'title', 'slug', 'type', 'user_id', 'content'
    ];

    protected $casts = [
        'content' => 'array'
    ];

    public function author()
    {
        return $this->belongsTo('App\User', 'user_id', 'id')->select(['id', 'name', 'email', 'avatar']);
    }
}
