<?php

namespace App\Http\Controllers;

use App\Http\Resources\FrontCourseResource;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;

class CourseSubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {}

    public function manageSubscription($courseId)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $course = Course::findOrFail($courseId);
        $existingSubscription = $course->subscriptions()
            ->where('user_id', $user->id)
            ->first();

        if ($existingSubscription) {
            $existingSubscription->delete();
            $isSubscribed = false;
            $message = 'Subscription removed successfully';
        } else {
            $course->subscriptions()->create([
                'user_id' => $user->id,
            ]);
            $isSubscribed = true;
            $message = 'Subscribed successfully';
        }

        return response()->json(['message' => $message, 'isSubscribed' => $isSubscribed]);
    }

    public function getUserCoursesDashboard()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $courses = $user->courseSubscriptions()->with('course')->get()->pluck('course');

        return FrontCourseResource::collection($courses);
    }
}
