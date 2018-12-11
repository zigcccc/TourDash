<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Validator;

class UserController extends Controller
{
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

        $user = User::where('id', $id)->get();
        return response()->json(['data' => $user], 200);
    }

    // Update user
    public function updateUser(Request $request, $id) {
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
