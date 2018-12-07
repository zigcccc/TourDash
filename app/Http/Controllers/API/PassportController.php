<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class PassportController extends Controller
{
    public $successStatus = 200;

    // Handle user registration
    public function register(Request $request)
    {   
        $input = $request->all();
        $validatorMessages = [
            'email.required' => 'Polje e-mail je obvezno.',
            'email.unique' => 'Uporabnik s tem e-poštnim naslovom že obstaja.',
            'email.email' => 'Vnešeno e-poštni naslov ni pravilen.',
            'password.required' => 'Polje geslo je obvezno.',
            'password.min' => 'Geslo mora vsebovati vsaj 6 znakov.',
            'password_repeat.required' => 'Polje ponovitev gesla je obvezno.',
            'password_repeat.same' => 'Vnešeni gesli se ne ujemata.'
        ];
        $validator = Validator::make($input, [
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
        return response()->json(['success'=>$success], $this->successStatus);
    }

    // Handle user login
    public function login()
    {
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            $success['token'] = $user->createToken('TourDash')->accessToken;
            return response()->json(['success' => $success], $this->successStatus);
        } else {
            $user = User::where('email', request('email'))->first();
            if ($user) {
                return response()->json(['error' => 'Vnesli ste napačno geslo.'], 401);
            } else {
                return response()->json(['error' => 'Uporabnik ne obstaja.'], 401);
            }
        }
    }

    // Get user details
    public function getUserDetails()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], $this->successStatus);
    }
}
