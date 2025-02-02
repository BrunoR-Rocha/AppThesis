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
        $maintenance = SysConfig::where('tag', 'maintenance')->value('value');

        $maintenanceEnabled = filter_var($maintenance, FILTER_VALIDATE_BOOLEAN);
        $maintenanceCondition = $maintenanceEnabled && !$request->is('backend/front/config/*') && !$request->user()->hasRole('admin');
        if ($maintenanceCondition) {
            return response()->json([
                'maintenance_mode' => true, 
                'message' => 'System is undermaintenance'
            ], 503);
        }

        return $next($request);
    }
}
