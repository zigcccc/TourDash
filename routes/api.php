<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->get('/rooms', function (Request $request) {
    $rooms = [
        [
            'uid' => 1,
            'type' => 'single',
            'trending' => false,
            'bestSeller' => false
        ],
        [
            'uid' => 2,
            'type' => 'double',
            'trending' => false,
            'bestSeller' => true
        ],
        [
            'uid' => 3,
            'type' => 'family',
            'trending' => true,
            'bestSeller' => false
        ]
    ];
    return json_encode($rooms);
});
