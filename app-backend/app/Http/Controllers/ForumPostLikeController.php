<?php

namespace App\Http\Controllers;

use App\Models\ForumPost;
use Illuminate\Support\Facades\Auth;

class ForumPostLikeController extends Controller
{
    public function like(ForumPost $post)
    {
        $user = Auth::user();

        if ($user) {
            $post->like($user);
            return response()->json(['message' => 'Post liked successfully.']);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function unlike(ForumPost $post)
    {
        $user = Auth::user();

        if ($user) {
            $post->unlike($user);
            return response()->json(['message' => 'Post like removed successfully.']);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }
}
