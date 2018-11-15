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

Route::get('login', function() {
    return view('admin');
});

Route::get('register', function() {
    return view('admin');
});

// Check if the route === admin
Route::get('admin', function() {
    return view('admin');
});
// Check if the route is a child of /admin
Route::get('admin/{wildcard}', function($wildcard) {
    return view('admin');
})->where('wildcard', '.+');


// Check if the route === amp
Route::get('amp', function() {
    return view('amp', ['data' => '']);
});
// Check if the route is a child of /mobile
Route::get('amp/{wildcard}', function($wildcard) {
    return view('amp', ['data' => $wildcard]);
})->where('wildcard', '.+');


// Check if the route is index
Route::get('/', function () {
    return view('index');
});
// Check if route is a child of index
Route::get('/{wildcard}', function ($wildcard) {
    return view('index');
})->where('wildcard', '.+');