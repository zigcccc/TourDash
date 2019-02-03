<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Debugbar;

class Setting extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $parentArray = parent::toArray($request);

        $name = $parentArray['setting_name'];

        $response = [
            $name => $parentArray
        ];

        return $response;
    }
}
