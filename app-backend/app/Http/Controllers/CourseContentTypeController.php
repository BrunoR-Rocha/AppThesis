<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\CourseContentTypeResource;
use App\Models\CourseContentType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseContentTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = new ApiResponse($request, CourseContentType::class);

        return $data->returnCollectionAsJsonResponse(CourseContentTypeResource::collection($data->collection('course_content_types')));
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
            'name' => 'required|string|max:255',
            'tag' => 'required|unique:course_content_types|string|max:255',
            'enabled' => 'required|bool',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $courseContentType = CourseContentType::create([
            'name' => $request->name,
            'tag' => $request->tag,
            'enabled' => $request->enabled,
        ]);

        return response()->json([
            'id' => $courseContentType->id, 
            'message' => __('validator.success'),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CourseContentType  $courseContentType
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $courseContentType = CourseContentType::find($id);

        return new CourseContentTypeResource($courseContentType);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CourseContentType  $courseContentType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validatedData = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'tag' => 'sometimes|unique:course_content_types|string|max:255',
            'enabled' => 'sometimes|bool',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $courseContentType = CourseContentType::findOrFail($id);

        $courseContentType->update([
            'name' => $request->name,
            'tag' => $request->tag,
            'enabled' => $request->enabled
        ]);

        return $courseContentType;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CourseContentType  $courseContentType
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $courseContentType = CourseContentType::findOrFail($id);

        $courseContentType->delete();

        return response()->json([
            'error' => 'successfully_deleted', 'message' => __('errors.successfully_deleted'),
        ]);
    }
}
