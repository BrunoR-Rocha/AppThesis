<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function adminLogin(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'auth.login_error',
            ], 400);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $user->tokens()->delete();

        $tokenResult = $user->createToken('auth_token');
        $token = $tokenResult->plainTextToken;

        // Set expiration (1 hour from now)
        $tokenResult = $user->createToken('auth_token');
        $token = $tokenResult->plainTextToken;

        // Retrieve the PersonalAccessToken instance
        $accessToken = $tokenResult->accessToken;

        // Set expiration (1 hour from now)
        $accessToken->expires_at = Carbon::now()->addHour();
        $accessToken->save();

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_at'   => $accessToken->expires_at->toDateTimeString(),
            'name' => $user->name,
        ]);
    }

    public function register(Request $request)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
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
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Create user
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Optionally, generate a token immediately after registration
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return response
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'user'         => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Check user credentials
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid email or password',
            ], 401);
        }

        $user->tokens()->delete();

        // Generate token
        $tokenResult = $user->createToken('auth_token');
        $token = $tokenResult->plainTextToken;

        // Set expiration (1 hour from now)
        $tokenResult->accessToken->expires_at = Carbon::now()->addHour();
        $tokenResult->accessToken->save();

        // Return response
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'expires_at'   => $tokenResult->accessToken->expires_at->toDateTimeString(),
            'user'         => [
                'name'     => $user->name,
                'email'    => $user->email,
            ]
        ]);
    }

    public function logout(Request $request)
    {
        // Revoke the token that was used to authenticate the current request
        $request->user()->currentAccessToken()->delete();

        if (Auth::guard('api')->check()) {
            $request->user()->tokens()->delete();
        }

        $request->session()->invalidate();
        $request->session()->regenerateToken();
    
        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}
