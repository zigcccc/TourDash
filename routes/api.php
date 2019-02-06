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
Route::get('pages/homepage', 'API\PageController@homepage');
Route::get('pages/{id}', 'API\PageController@show');
Route::post('pages/search', 'API\PageController@search');

// Accommodations
Route::get('accommodations', 'API\AccommodationController@index');
Route::get('accommodations/{id}', 'API\AccommodationController@show');
Route::post('accommodations/search', 'API\AccommodationController@search');

// Common settings
Route::get('settings/contact', 'API\SettingController@indexContact');
Route::get('settings/visual', 'API\SettingController@indexVisual');
Route::get('settings/marketing', 'API\SettingController@indexMarketing');
Route::get('settings/{id}', 'API\SettingController@show');


Route::group(['middleware' => 'auth:api'], function() {
    // User CRUD
    Route::get('users', 'API\UserController@getUsers');
    Route::get('user/{id}', 'API\UserController@getUser');
    Route::put('user/{id}', 'API\UserController@updateUser');
    Route::delete('user/{id}', 'API\UserController@deleteUser');

    // Dashboard operations
    Route::get('dashboard/users', 'API\UserController@getUsersPreview');
    Route::get('dashboard/pages', 'API\PageController@getPagesPreview');
    Route::get('dashboard/accommodations', 'API\AccommodationController@getAccommodationsPreview');

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

    // Accommodations CRUD
    Route::post('accommodations', 'API\AccommodationController@create');
    Route::delete('accommodations/{id}', 'API\AccommodationController@destroy');
    Route::put('accommodations/{id}', 'API\AccommodationController@update');

    // Settings CRUD
    //Route::post('settings', 'API\SettingController@create');
    Route::delete('settings/{id}', 'API\SettingController@destroy');
    Route::post('settings', 'API\SettingController@store');

});
