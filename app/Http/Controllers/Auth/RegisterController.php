<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
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
        $this->middleware('guest');
    }

    // Handle user registration
    public function register(Request $request)
    {   
        $input = $request->except('id');
        $validatorMessages = [
            'email.required' => 'Polje e-mail je obvezno.',
            'email.unique' => 'Uporabnik s tem e-poštnim naslovom že obstaja.',
            'email.email' => 'Vnešeno e-poštni naslov ni pravilen.',
            'password.required' => 'Polje geslo je obvezno in mora vsebovati vsaj 6 znakov.',
            'password.min' => 'Geslo mora vsebovati vsaj 6 znakov.',
            'password_repeat.required' => 'Polje ponovitev gesla je obvezno.',
            'password_repeat.same' => 'Vnešeni gesli se ne ujemata.',
            'name.required' => 'Polje ime in priimek je obvezno'
        ];
        $validator = Validator::make($input, [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'password_repeat' => 'required|same:password'
        ], $validatorMessages);
        
        // Check validation
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 303);
        }

        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] = $user->createToken('TourDash')->accessToken;
        $success['email'] = $user->email;
        Auth::login($user);
        return response()->json(['success' => $success, 'path' => '/'], 200);
    }
}
