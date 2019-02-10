<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Activity extends JsonResource
{
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
            'created_at' => $this->created_at,
            'author' => $this->user,
            'type' => $this->type,
            'refers_to' => $this->refers_to
        ];
    }
}
