<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\QuestionTypeResource;
use App\Models\QuestionType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuestionTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = new ApiResponse($request, QuestionType::class);

        return $data->returnCollectionAsJsonResponse(QuestionTypeResource::collection($data->collection('question_types')));
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
            'tag' => 'required|unique:question_topics|string|max:255',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $questionType = QuestionType::create([
            'name' => $request->name,
            'tag' => $request->tag,
        ]);

        return response()->json([
            'id' => $questionType->id, 
            'message' => __('validator.success'),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\QuestionType  $questionType
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $questionType = QuestionType::findOrFail($id);

        return new QuestionTypeResource($questionType);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\QuestionType  $questionType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $questionType = QuestionType::findOrFail($id);

        $questionType->update($request->all());

        return $questionType;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\QuestionType  $questionType
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $questionType = QuestionType::findOrFail($id);

        $questionType->delete();

        return response()->json([
            'error' => 'successfully_deleted', 'message' => __('errors.successfully_deleted'),
        ]);
    }
}
