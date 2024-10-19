<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function verify(Request $request)
    {

        $user = User::find($request->id);

        if (!$user) {
            return redirect()->to(config('app.frontend_url') . '/email-confirmation?status=error');
        }

        if ($user->hasVerifiedEmail()) {
            return redirect()->to(config('app.frontend_url') . '/email-confirmation?status=already_verified');
        }


        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return redirect()->to(config('app.frontend_url') . '/email-confirmation?status=success');
    }
}
