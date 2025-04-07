<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\UserQuiz;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
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
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ],
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


        event(new Registered($user));

        // Auth::login($user, $validatedData['remember'] ?? false);

        // TODO - deve redirecionar para uma pagina de validação de email
        return response()->json([
            'message' => __('auth.register'),
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => [
                'sometimes',
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($id),
            ],
            'password' => 'sometimes|nullable|string|min:8|confirmed',
            'phone_number' => 'sometimes|nullable|digits:9',
            'birth_date' => 'sometimes|required|date',
            'role' => [
                'sometimes',
                'required',
                'string',
                Rule::exists('roles', 'name'),
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
                'message' => __('auth.update_fail'),
            ], 400);
        }

        $user->name = $request->has('name') ? $request->name : $user->name;
        $user->email = $request->has('email') ? $request->email : $user->email;
        $user->phone_number = $request->has('phone_number') ? $request->phone_number : $user->phone_number;
        $user->birth_date = $request->has('birth_date') ? $request->birth_date : $user->birth_date;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        if ($request->has('role')) {
            $user->syncRoles([$request->role]);
        }

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone_number' => $user->phone_number,
            'birth_date' => $user->birth_date,
            'roles' => $user->getRoleNames(),
            'message' => __('auth.update_success'),
        ], 200);
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

    public function profileUpdate(Request $request)
    {
        $user = Auth::user();


        $validator = Validator::make($request->all(), [
            'name'  => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            // 'image' => 'nullable|image|mimes:jpg,jpeg,png|dimensions:ratio=1/1|max:1024',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Profile update failed.',
                'errors'  => $validator->errors(),
            ], 422);
        }

        if ($user->name != $request->input('name')) {
            $user->name  = $request->input('name');
        }

        if ($user->email != $request->input('email')) {
            $user->email = $request->input('email');
        }

        // if ($request->hasFile('image')) {

        //     if ($user->profile_image) {
        //         Storage::disk('public')->delete($user->profile_image);
        //     }

        //     $path = $request->file('image')->store('profile_images', 'public');
        //     $user->profile_image = $path;
        // }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully.',
            'user'         => [
                'name'     => $user->name,
                'email'    => $user->email,
            ]
        ], 200);
    }

    public function changePassword(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'current_password'  => 'required|string',
            // 'new_password'      => 'required|string|min:8|confirmed',
            'new_password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ],
        ], [
            'new_password.confirmed' => 'The new password confirmation does not match.',
        ]);

        // Check validation failures
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Password change failed.',
                'errors'  => $validator->errors(),
            ], 422);
        }

        // Check if current password matches
        if (!Hash::check($request->input('current_password'), $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect.',
                'errors'  => ['current_password' => ['Current password is incorrect.']],
            ], 422);
        }

        // Update password
        $user->password = Hash::make($request->input('new_password'));
        $user->save();

        return response()->json([
            'message' => 'Password changed successfully.',
        ], 200);
    }

    public function getUserDashboard(Request $request)
    {
        $user = $request->user();
        $userQuizzes = UserQuiz::where('user_id', $user->id)->get();
        $totalScore = $userQuizzes->sum('score');
        $finished = $userQuizzes->filter(function ($quiz) {
            return $quiz->is_completed;
        })->count();

        $courses = $user->courseSubscriptions()->with('course')->get()->pluck('course');

        return [
            'userQuizzes' => $finished,
            'userCourses' => count($courses),
            'generalScore' => $totalScore
        ];
    }
}
