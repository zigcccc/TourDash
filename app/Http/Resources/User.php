<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Debugbar;

class User extends JsonResource
{
    /**
     * Create a new resource instance.
     *
     * @param  mixed  $resource
     * @return void
     */
    public function __construct($resource, $message = [])
    {
        // Ensure you call the parent constructor
        parent::__construct($resource);
        $this->resource = $resource;
        
        $this->message = $message;
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'avatar' => $this->avatar ? avatar_asset($this->avatar) : null,
            'role' => $this->roles()->first()->name,
            'saved_items' => $this->saved_items
        ];
    }

    public function with($request)
    {
        return [
            'message' => $this->when(!empty($this->message), $this->message),
            'meta' => [
                'version' => config('app.version'),
                'app_env' => config('app.env'),
                'locale' => config('app.locale')
            ]
        ];
    }
}
