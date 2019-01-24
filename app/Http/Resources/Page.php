<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Debugbar;

class Page extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $allData = parent::toArray($request);
        unset($allData['user_id']);
        $allData['author'] = $this->author()->first()->toArray();
        
        return $allData;
    }
}
