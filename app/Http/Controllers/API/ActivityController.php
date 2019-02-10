<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Activity;
use App\Http\Resources\Activity as ActivityResource;

class ActivityController extends Controller
{
    public function index()
    {
        return ActivityResource::collection(Activity::orderBy('created_at', 'DESC')->paginate(10));
    }
}
