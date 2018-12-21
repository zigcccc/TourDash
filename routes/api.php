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

Route::post('/login', 'API\PassportController@login');

Route::group(['middleware' => 'auth:api'], function() {
    // User CRUD
    Route::get('users', 'API\UserController@getUsers');
    Route::get('user/{id}', 'API\UserController@getUser');
    Route::put('user/{id}', 'API\UserController@updateUser');
    Route::delete('user/{id}', 'API\UserController@deleteUser');

    // Get currently signed in user info
    Route::get('auth-user', 'API\UserController@getUserDetails');

    // Update or set user's profile image
    Route::post('user/{id}/update-profile-image', 'API\UserController@setProfileImage');

    // Update user role
    Route::put('user/{id}/update-role', 'API\UserController@updateUserRole');
});
