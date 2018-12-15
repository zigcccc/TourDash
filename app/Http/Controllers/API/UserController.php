<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Validator;
use Debugbar;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    // Get logged in user
    public function getUserDetails()
    {
        try {
            $user = Auth::user();
            return new UserResource($user);
        } catch (AuthenticationException $e) {
            Debugbar::info($e->getMessage());
            return response()->json(['user' => null], 404);
        }
    }

    // Get all users
    public function getUsers(Request $request)
    {
        if (array_key_exists('role', $request->all())) {
            $role = $request->all()['role'];
            $validator = Validator::make(['role' => $role], [
                'role' => 'in:admin,user,subscriber'
            ]);
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }
            $users = User::where('role', $role)->orderBy('name')->get();
            return response()->json(['data' => $users], 200);
        } else {
            $users = DB::table('users')->orderBy('name')->get();
            return response()->json(['data' => $users], 200);
        }
    }

    // Get single user
    public function getUser($id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|integer'
        ]);

        // Check validation
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $user = User::where('id', $id)->first();
        $data = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'role' => $user->roles()->first()->name
        ];
        return response()->json(['user' => $data], 200);
    }

    // Update user
    public function updateUser(Request $request, $id)
    {
        $input = $request->except('id');
        $validator = Validator::make($input,
            [
                'name' => 'string',
                'role' => 'alpha',
                'password' => 'min:6',
                'email' => 'email|not_in:users'
            ]
        );

        // Check validation
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        // Find user and update it
        try {
            User::where('id', $id)->update($input);
            return response()->json([
                'data' => User::where('id', $id)->get(),
                'message' => 'Podatki uspešno posodobljeni!'
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'error' => 'Pri posodabljanju je prišlo do napake.',
                'error_details' => $e->errorInfo[2]
            ], 400);
        }
    }

    // Set user profile image
    public function setProfileImage(Request $request, $id)
    {
        $input = $request->only('image');
        $validatorMessages = [
            'image.image' => 'Izbrana datoteka ni fotografija.',
            'image.required' => 'Niste izbrali nobene fotografije.',
            'image.mimetypes' => 'Napačen format datoteke. Izberite JPG, GIF ali PNG datoteko.',
            'image.max' => 'Izbrana datoteka je prevelika. Največja dovoljena velikost datoteke je 2.5MB'
        ];
        $validator = Validator::make($input, [
            'image' => 'image|required|mimetypes:image/jpeg,image/gif,image/png|max:2500'
        ], $validatorMessages);

        // Check validation
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        // Check if parameter is integer
        if (!is_numeric($id)) {
            return response()->json(['error' => 'User id must be an integer.'], 422);
        }

        try {
            $user = Auth::user();
            if ($user->id !== intval($id)) {
                return response()->json(['error' => 'Napaka pri avtorizaciji.'], 403);
            }
            if ($user->avatar) {
                Storage::delete($user->avatar);
            }
            $user->avatar = $request->file('image')->store('image');
            $user->save();
            return new UserResource($user, ['success' => 'Profilna slika uspešno posodobljena!']);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Pri posodabljanju je prišlo do napake.',
                'error_details' => $e->getMessage()
            ], 400);
        }
    }

    // Delete user
    public function deleteUser($id)
    {
        if (!is_numeric($id)) {
            return response()->json(['error' => 'User id must be an integer.'], 422);
        }
        try {
            User::where('id', $id)->delete();
            return response()->json([
                'message' => 'Uporabnik uspešno izbrisan.'
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'error' => 'Pri brisanju uporabnika je prišlo do napake',
                'error_details' => $e->getMessage()
            ], 400);
        }
    }
}
