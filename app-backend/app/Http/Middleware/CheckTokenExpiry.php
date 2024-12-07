<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Exception;
use Illuminate\Http\Request;

class CheckTokenExpiry
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        
        try{

            if (!$user) {
                return response()->json(['message' => 'Unauthenticated.'], 401);
            }

            if($request->user()->hasRole('admin'))
            {
                return $next($request);
            }

            $token = $user->currentAccessToken();

            if ($token && $token->expires_at && Carbon::now()->greaterThan($token->expires_at)) {
                $token->delete();
    
                return response()->json(['message' => 'Token has expired.'], 401);
            }
    
            return $next($request);
        }catch (Exception $e)
        {
            \Log::info($e->getMessage());
        }
        
    }
}
