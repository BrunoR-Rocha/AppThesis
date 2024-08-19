<?php

namespace App\Http\Controllers;

use App\Models\ForumThread;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ForumThreadLikeController extends Controller
{
    public function like(ForumThread $thread)
    {
        $user = Auth::user();

        if ($user) {
            $thread->like($user);
            return response()->json(['message' => 'Thread liked successfully.']);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function unlike(ForumThread $thread)
    {
        $user = Auth::user();

        if ($user) {
            $thread->unlike($user);
            return response()->json(['message' => 'Thread like removed successfully.']);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }
}
