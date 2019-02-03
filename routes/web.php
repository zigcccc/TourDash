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

Route::get('login', ['as' => 'login', 'uses' => function() {
    return view('auth');
}]);

Route::get('register', ['as' => 'register', 'uses' => function() {
    return view('auth');
}]);

Auth::routes(['verify' => true]);

// Check if the route === admin
// Check if the route is a child of /admin
Route::group(['middleware' => ['admin', 'verified']], function() {
    Route::get('admin', ['as' => 'admin', 'uses' =>  function() {
        return view('admin');
    }]);

    Route::get('admin/{wildcard}', function($wildcard) {
        return view('admin');
    })->where('wildcard', '.+');
});


// Check if the route is index
Route::get('/', ['as' => 'home', 'uses' => 'WebController@index']);
// Check if route is a child of index
Route::get('/{wildcard}', function ($wildcard) {
    return view('index');
})->where('wildcard', '.+');
