<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $data = new ApiResponse($request, User::class);

        return $data->returnCollectionAsJsonResponse(UserResource::collection($data->collection('users')));
    }

    public function show($id)
    {
        $user = User::findOrFail($id);

        return new UserResource($user);
    }

    public function store(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'nullable|string',
            'phone_number' => 'nullable|digits:9',
            'birth_date' => 'required|date',
            'role' => 'required|string'
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('auth.register_fail'),
            ], 400);
        }

        if (is_null($request->password)) {
            $password = Str::random(16);
        } else {
            $password = $request->password;
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($password),
            'phone_number' => $request->phone_number,
            'birth_date' => $request->birth_date,
        ]);

        $role = Role::firstOrCreate(['name' => $request->role]);
        $user->assignRole($role);

        return response()->json([
            'id' => $user->id,
            'message' => __('auth.register'),
        ], 200);
    }

    public function frontRegister(Request $request)
    {
        $requestData = $request->all();

        if (isset($requestData['remember'])) {
            $requestData['remember'] = filter_var($requestData['remember'], FILTER_VALIDATE_BOOLEAN);
        }
        
        $validator = Validator::make($requestData, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|confirmed|string',
            'remember' => 'nullable|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
                'message' => __('auth.register_fail'),
            ], 400);
        }

        $validatedData = $validator->validated();

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        $role = Role::firstOrCreate(['name' => 'user']);
        $user->assignRole($role);

        // Auth::login($user, $validatedData['remember'] ?? false);

        // TODO - deve redirecionar para uma pagina de validação de email
        return response()->json([
            'message' => __('auth.register'),
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());

        return $user;
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'error' => 'successfully_deleted',
            'message' => __('errors.successfully_deleted'),
        ]);
    }
}
