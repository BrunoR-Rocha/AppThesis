<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\CourseContentResource;
use App\Models\CourseContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseContentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = new ApiResponse($request, CourseContent::class);

        return $data->returnCollectionAsJsonResponse(CourseContentResource::collection($data->collection('course_contents')));
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
            'lesson_id' => 'required|exists:lessons,id',
            'content_type_id' => 'required|exists:course_content_types,id',
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $courseContent = CourseContent::create([
            'lesson_id' => $request->lesson_id,
            'content_type_id' => $request->content_type_id,
            'title' => $request->title,
            'content' => $request->content,
        ]);

        return response()->json([
            'id' => $courseContent->id, 
            'message' => __('validator.success'),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CourseContent  $courseContent
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $courseContent = CourseContent::findOrFail($id);

        return new CourseContentResource($courseContent);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CourseContent  $courseContent
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validatedData = Validator::make($request->all(), [
            'lesson_id' => 'sometimes|exists:lessons,id',
            'content_type_id' => 'sometimes|exists:course_content_types,id',
            'title' => 'sometimes|string|max:255',
            'content' => 'nullable|string',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $courseContent = CourseContent::findOrFail($id);

        $courseContent->update([
            'title' => $request->title,
            'content' => $request->content,
            'lesson_id' => $request->lesson_id,
            'content_type_id' => $request->content_type_id,
        ]);

        return $courseContent;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CourseContent  $courseContent
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $courseContent = CourseContent::findOrFail($id);

        $courseContent->delete();

        return response()->json([
            'error' => 'successfully_deleted', 'message' => __('errors.successfully_deleted'),
        ]);
    }
}
