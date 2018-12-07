<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('login', ['as' => 'login', 'uses' =>function() {
    return view('auth');
}]);

Route::get('register', ['as' => 'register', 'uses' => function() {
    return view('auth');
}]);

// Check if the route === admin
Route::get('admin', function() {
    return view('admin');
})->middleware('auth');
// Check if the route is a child of /admin
Route::get('admin/{wildcard}', function($wildcard) {
    return view('admin');
})->where('wildcard', '.+')->middleware('auth');


// Check if the route is index
Route::get('/', function () {
    return view('index');
});
// Check if route is a child of index
Route::get('/{wildcard}', function ($wildcard) {
    return view('index');
})->where('wildcard', '.+');
