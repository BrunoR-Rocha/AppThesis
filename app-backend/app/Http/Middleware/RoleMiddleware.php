<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
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
        return $next($request);
    }

    // public function handle(Request $request, Closure $next, $role)
    // {
    //     if (!Auth::check()) {
    //         return redirect('login');
    //     }

    //     if (!Auth::user()->hasRole($role)) {
    //         abort(403, 'Unauthorized');
    //     }

    //     return $next($request);
    // }
}
