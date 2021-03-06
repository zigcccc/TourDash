<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\Role;
use App\Accommodation;
use App\Activity;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Validator;
use Illuminate\Validation\Rule;
use Debugbar;

class UserController extends Controller
{

    // public function __construct()
    // {
    //     $this->middleware('auth:api');
    // }

    // Get all users
    public function getUsers()
    {
        try {
            return UserResource::collection(User::where('id', '!=', Auth::id())->orderBy('name')->paginate(10));
        } catch (Exception $e) {
            return response()->json(["error" => $e->getMessage()]);
        }
    }

    // Get users preview
    public function getUsersPreview(Request $request)
    {
        $amount = $request->amount;
        try {
            $users = User::where('id', '!=', Auth::id())
                            ->with('roles')
                            ->orderBy('created_at', 'desc')
                            ->limit($amount ? intval($amount) : 3)
                            ->get();

            $usersCount = User::count();         
                            
            return response()->json([
                'success' => 'Uporabniki uspešno pridobljeni',
                'users' => $users,
                'all_users_count' => $usersCount
            ], 200);

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
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
        $saved_items = [];
        $data = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'role' => $user->roles()->first()->name,
            'saved_items' => $user->saved_items
        ];
        return response()->json(['user' => $data], 200);
    }

    public function getUserSavedItems($userId)
    {
        try {
            $user = User::where('id', $userId)->first();
            $saved_items = [];
            foreach ($user->saved_items as $accommodationId) {
                $accommodation = Accommodation::where('id', $accommodationId)
                                                ->select('id', 'title', 'price', 'featured_image->medium as image', 'description')
                                                ->get();
                array_push($saved_items, $accommodation);
            }
            return response()->json(['saved_items' => $saved_items], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function updateUserSavedItems(Request $request, $userId)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'saved_items' => 'array',
            'accommodation' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 403);
        }

        try {

            $user = User::find($userId);
            $accommodation = Accommodation::where('title', $input['accommodation'])->first();

            $deleteAction = false;
            if ($user->saved_items) {
                $deleteAction = sizeof($user->saved_items) > sizeof($input['saved_items']);
            }

            if ($user) {
                $user->saved_items = $input['saved_items'];
                $user->save();

                $activity = new Activity;
                $activity->type = $deleteAction ? "unfavorite" : "favorite";
                $activity->refers_to = $input['accommodation'];
                $activity->user_id = $user->id;
                $activity->save();
            }

            if ($accommodation) {
                if ($deleteAction) {
                    $accommodation->num_of_saves = $accommodation->num_of_saves - 1;
                } else {
                    $accommodation->num_of_saves = $accommodation->num_of_saves + 1;
                }
                $accommodation->save();
            }

            return new UserResource($user);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    // Update user
    public function updateUser(Request $request, $id)
    {
        $input = $request->except('id');
        $validator = Validator::make($input,
            [
                'name' => 'string',
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
            $user = Auth::user();
            if ($user->id !== intval($id) && !$user->hasRole('superadmin')) {
                return response()->json(['error' => 'Napaka pri avtorizaciji.'], 403);
            }
            $user->update($input);
            return new UserResource($user, ['success' => 'Podatki uspešno posodobljeni']);
            // return response()->json([
            //     'data' => User::where('id', $id)->get(),
            //     'message' => 'Podatki uspešno posodobljeni!'
            // ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'error' => 'Pri posodabljanju je prišlo do napake.',
                'error_details' => $e->errorInfo[2]
            ], 400);
        }
    }

    // Update user's password
    public function updatePassword(Request $request)
    {
        $input = $request->only(['password_old', 'password_new', 'password_new_confirmation']);
        $validator = Validator::make($input, [
            'password_old' => 'required',
            'password_new' => 'required|min:6|different:password_old',
            'password_new_confirmation' => 'required|same:password_new'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $user = Auth::user();

        if (Hash::check($request['password_old'], $user->password)) {
            $user->password = Hash::make($request['password_new']);
            $user->save();
            return response()->json(['success' => 'Geslo je bilo uspešno posodobljeno!'], 200);
        } else {
            return response()->json(['error' => 'Vnešeno staro geslo je napačno.'], 403);
        }
    }

    // Update user's role
    public function updateUserRole(Request $request, $id)
    {
        $input = $request->only('role');
        $validator = Validator::make($input,
            [
                'role' => ['required', 'alpha', Rule::in(['user', 'admin', 'superadmin'])]
            ]
        );
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        
        // Check if auth user is superadmin
        $auth = Auth::user();
        if (!$auth->hasRole('superadmin')) {
            return response()->json(['error' => 'Napaka pri avtorizaciji.'], 403);
        }

        try {
            $user = User::findOrFail($id);
            $newRoleId = Role::where('name', $input['role'])->first();
            $user->roles()->sync($newRoleId);

            return new UserResource($user, ['success' => 'Vloga uporabnika uspešno posodobljena']);

        } catch (Exception $e) {
            return response()->json([
                'error' => 'Pri posodabljanju je prišlo do napake.',
                'error_details' => $e->getMessage()
            ], 400);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Ta uporabnik ne obstaja.',
                'error_details' => $e->getMessage()
            ], 404);
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

    // Search Users
    public function searchUsers(Request $request)
    {
        $input = $request->only('q');
        $q = $input['q'];
        
        $result = User::where('name', 'LIKE', '%' . $q . '%')->where('id', '!=', Auth::id())->orderBy('name');
        return UserResource::collection($result->paginate(10));
    }

    // Delete user
    public function deleteUser($id)
    {
        if (!is_numeric($id)) {
            return response()->json(['error' => 'User id must be an integer.'], 422);
        }
        try {

            $authUserId = Auth::id();
            $isSuperadmin = Auth::user()->hasRole('superadmin');

            if ($authUserId !== intval($id) && !$isSuperadmin) {
                return response()->json(['error' => 'Napaka pri avtentikaciji.'], 403);
            }

            User::findOrFail($id)->delete();
            return response()->json([
                'message' => 'Uporabnik uspešno izbrisan.',
                'refresh' => $authUserId === intval($id)
            ], 200);

        } catch(ModelNotFoundException $e) {

            return response()->json([
                'error' => 'Ta uporabnik ne obstaja.',
                'error_details' => $e->getMessage()
            ], 404);

        } catch (QueryException $e) {

            return response()->json([
                'error' => 'Pri brisanju uporabnika je prišlo do napake',
                'error_details' => $e->getMessage()
            ], 400);

        }
    }
}
