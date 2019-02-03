<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Setting;
use Debugbar;

class WebController extends Controller
{
    public function index()
    {
        $settings = Setting::where('setting_name', 'favicon')
                            ->orWhere('setting_name', 'primary_color')
                            ->orWhere('setting_name', 'heading_font')
                            ->orWhere('setting_name', 'text_font')
                            ->get()
                            ->toArray();
        
        $response = [];
        foreach($settings as $setting) {
            
            if ($setting['setting_name'] === "heading_font" || $setting['setting_name'] === "text_font") {
                $response[$setting['setting_name']] = str_replace(" ", "+", $setting['setting_value']);
            } else {
                $response[$setting['setting_name']] = $setting['setting_value'];
            }
            
        }
        Debugbar::info($response);
        
        return view('index')->with($response);
    }
}
