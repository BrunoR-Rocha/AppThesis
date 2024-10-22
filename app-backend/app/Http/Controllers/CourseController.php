<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\CourseResource;
use App\Http\Resources\FrontCourseResource;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = new ApiResponse($request, Course::class);

        return $data->returnCollectionAsJsonResponse(CourseResource::collection($data->collection('courses')));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'short_description' => 'nullable|string',
            'description' => 'required|string',
            'average_time' => 'nullable',
            'difficulty' => 'nullable',
            'image' => 'nullable|image',
            'topic_id' => 'required|exists:question_topics,id',
            'enabled' => 'required',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }


        $image = null;

        if ($request->hasFile('image')) {
            $filePath = $request->file('image')->store('course_images', 'public');
            $image = $filePath;
        }

        $course = Course::create([
            'title' => $request->title,
            'short_description' => $request->short_description,
            'description' => $request->description,
            'average_time' => $request->average_time,
            'difficulty' => $request->difficulty,
            'file_path' => $image,
            'topic_id' => $request->topic_id,
            'enabled' => $request->enabled
        ]);

        return response()->json([
            'id' => $course->id,
            'message' => __('validator.success'),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $course = Course::find($id);

        return new CourseResource($course);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validatedData = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'short_description' => 'sometimes|string',
            'description' => 'sometimes|string',
            'average_time' => 'nullable',
            'difficulty' => 'nullable',
            'image' => 'nullable|image',
            'topic_id' => 'sometimes|exists:question_topics,id',
            'enabled' => 'sometimes',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $course = Course::findOrFail($id);

        if ($request->hasFile('image')) {
            if ($course->file_path) {
                Storage::disk('public')->delete($course->file_path);
            }

            $filePath = $request->file('image')->store('course_images', 'public');
            $course->file_path = $filePath;
        }

        $course->update([
            'title' => $request->title,
            'short_description' => $request->short_description,
            'description' => $request->description,
            'average_time' => $request->average_time,
            'difficulty' => $request->difficulty,
            'topic_id' => $request->topic_id,
            'enabled' => $request->enabled,
        ]);

        return $course;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $course = Course::findOrFail($id);

        $course->delete();

        return response()->json([
            'error' => 'successfully_deleted',
            'message' => __('errors.successfully_deleted'),
        ]);
    }

    public function getAll()
    {
        $courses = Course::active()->get();

        return FrontCourseResource::collection($courses);
    }

    public function getContent($id)
    {
        $course = Course::active()->whereId($id)->firstOrFail();

        dd($course);
    }
}
