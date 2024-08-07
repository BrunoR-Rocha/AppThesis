<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\CourseInteractiveElementResource;
use App\Models\CourseInteractiveElement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseInteractiveElementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = new ApiResponse($request, CourseInteractiveElement::class);

        return $data->returnCollectionAsJsonResponse(CourseInteractiveElementResource::collection($data->collection('course_interactive_elements')));
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
            'content_id' => 'required|exists:course_contents,id',
            'type' => 'required|string|max:255',
            'data' => 'required',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $courseContent = CourseInteractiveElement::create([
            'content_id' => $request->content_id,
            'type' => $request->type,
            'data' => $request->data,
        ]);

        return response()->json([
            'id' => $courseContent->id, 
            'message' => __('validator.success'),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CourseInteractiveElement  $courseInteractiveElement
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $courseInteractiveElement = CourseInteractiveElement::findOrFail($id);

        return new CourseInteractiveElementResource($courseInteractiveElement);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CourseInteractiveElement  $courseInteractiveElement
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validatedData = Validator::make($request->all(), [
            'content_id' => 'sometimes|exists:course_contents,id',
            'type' => 'sometimes|string|max:255',
            'data' => 'sometimes',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $courseInteractiveElement = CourseInteractiveElement::findOrFail($id);

        $courseInteractiveElement->update([
            'content_id' => $request->content_id,
            'type' => $request->type,
            'data' => $request->data,
        ]);

        return $courseInteractiveElement;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CourseInteractiveElement  $courseInteractiveElement
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $courseInteractiveElement = CourseInteractiveElement::findOrFail($id);

        $courseInteractiveElement->delete();

        return response()->json([
            'error' => 'successfully_deleted', 'message' => __('errors.successfully_deleted'),
        ]);
    }
}
