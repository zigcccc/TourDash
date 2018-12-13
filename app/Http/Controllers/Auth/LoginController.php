<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Debugbar;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $adminRole = 'admin';
    protected $superadminRole = 'superadmin';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public $successStatus = 200;

    // Handle user login
    public function login()
    {
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            $success['token'] = $user->createToken('TourDash')->accessToken;
            if ($user->hasAnyRole([$this->adminRole, $this->superadminRole])) {
                return response()->json(['path' => '/admin', 'statusCode' => 200], 200);
            } else {
                return response()->json(['path' => '/', 'statusCode' => 200], 200);
            }
        } else {
            $user = User::where('email', request('email'))->first();
            if ($user) {
                return response()->json(['error' => 'Vnesli ste napačno geslo.'], 401);
            } else {
                return response()->json(['error' => 'Uporabnik ne obstaja.'], 401);
            }
        }
    }
}
