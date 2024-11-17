<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class ChatRateLimit
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle($request, Closure $next)
    {
        $key = 'chat:' . $request->user()->id;

        $limit = (int) config('chat.limit');
        if (RateLimiter::tooManyAttempts($key, $limit)) {
            return response()->json([
                'error' => 'Too many requests. You have reached your daily limit.',
            ], 429);
        }

        RateLimiter::hit($key, 86400); 

        \Log::info("User {$request->user()->id} has made " . RateLimiter::attempts($key) . " requests.");

        return $next($request);
    }
}
