<?php

namespace App\Http\Middleware;

use App\Models\SysConfig;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckMaintenanceMode
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

        $maintenance = SysConfig::where('tag', 'maintenance')->value('value') === 'true';

        if ($maintenance && !$request->user()->hasRole('admin')) {
            return response()->json(['message' => 'In maintenance'], 503);
        }

        return $next($request);
    }
}
