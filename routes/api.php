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

Route::post('login', 'API\PassportController@login');

// Pages
Route::get('pages/menu', 'API\PageController@getMenu');
Route::get('pages', 'API\PageController@index');
Route::get('pages/{id}', 'API\PageController@show');
Route::post('pages/search', 'API\PageController@search');



Route::group(['middleware' => 'auth:api'], function() {
    // User CRUD
    Route::get('users', 'API\UserController@getUsers');
    Route::get('user/{id}', 'API\UserController@getUser');
    Route::put('user/{id}', 'API\UserController@updateUser');
    Route::delete('user/{id}', 'API\UserController@deleteUser');

    // Get currently signed in user info
    Route::get('auth-user', 'API\UserController@getUserDetails');

    // Update user's password
    Route::put('auth-user/update-password', 'API\UserController@updatePassword');

    // Update or set user's profile image
    Route::post('user/{id}/update-profile-image', 'API\UserController@setProfileImage');

    // Update user role
    Route::put('user/{id}/update-role', 'API\UserController@updateUserRole');

    // Search for users
    Route::get('users/search', 'API\UserController@searchUsers');


    // Images actions
    Route::post('image/add-new', 'API\ImageController@store');

    // Pages CRUD
    Route::post('pages', 'API\PageController@create');
    Route::delete('pages/{id}', 'API\PageController@destroy');
    Route::put('pages/menu', 'API\PageController@updateMenu');
    Route::put('pages/{id}', 'API\PageController@update');

});
