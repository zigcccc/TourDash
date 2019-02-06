<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Setting;
use Debugbar;

class WebController extends Controller
{
    private function generateResponse()
    {
        $settings = Setting::where('setting_name', 'favicon')
                            ->orWhere('setting_name', 'primary_color')
                            ->orWhere('setting_name', 'heading_font')
                            ->orWhere('setting_name', 'text_font')
                            ->get()
                            ->toArray();
        
        $output = [];
        foreach($settings as $setting) {
            
            if ($setting['setting_name'] === "heading_font" || $setting['setting_name'] === "text_font") {
                $output[$setting['setting_name']] = str_replace(" ", "+", $setting['setting_value']);
            } else {
                $output[$setting['setting_name']] = $setting['setting_value'];
            }
            
        }
        return $output;
    }

    public function index()
    {
        $response = $this->generateResponse();
        return view('index')->with($response);
    }

    public function wildcard($wildcard)
    {
        $response = $this->generateResponse();
        return view('index')->with($response);
    }
}
