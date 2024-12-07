<?php

namespace App\Http\Middleware;

use App\Models\SysConfig;
use Closure;
use Illuminate\Http\Request;

class CheckMailSend
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
        $mailSendEnabled = SysConfig::where('tag', 'mail_send')->value('value') === 'true';

        if (!$mailSendEnabled) {
            return response()->json(['message' => 'Email sending is currently disabled.'], 503);
        }

        return $next($request);
    }
}
