<?php

namespace App\Http\Controllers;

use App\Models\CourseRating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseRatingController extends Controller
{
    // Add index function to display in admin page

    public function frontStore(Request $request, $courseId)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $user = Auth::user();

        $existingRating = CourseRating::where('course_id', $courseId)
            ->where('user_id', $user->id)
            ->first();

        if ($existingRating) {
            return response()->json([
                'message' => 'You have already rated this course.',
            ], 400);
        }

        $rating = CourseRating::updateOrCreate(
            [
                'course_id' => $courseId,
                'user_id' => $user->id,
            ],
            [
                'rating' => $validated['rating'],
                'comment' => $validated['comment'],
            ]
        );

        return response()->json([
            'message' => 'Thank you for your feedback!',
            'rating' => $rating,
        ]);
    }
}
