<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\QuestionOptionResource;
use App\Models\QuestionOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuestionOptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = new ApiResponse($request, QuestionOption::class);

        return $data->returnCollectionAsJsonResponse(QuestionOptionResource::collection($data->collection('question_options')));
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
            'question_id' => 'required|integer',
            'option_text' => 'required|string',
            'is_correct' => 'required|boolean',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $questionOption = QuestionOption::create([
            'question_id' => $request->question_id,
            'option_text' => $request->option_text,
            'is_correct' => $request->is_correct,
        ]);

        return response()->json([
            'id' => $questionOption->id,
            'message' => __('validator.success'),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\QuestionOption  $questionOption
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $questionOption = QuestionOption::findOrFail($id);

        return new QuestionOptionResource($questionOption);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\QuestionOption  $questionOption
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $questionOption = QuestionOption::findOrFail($id);

        $questionOption->update($request->all());

        return $questionOption;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\QuestionOption  $questionOption
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $questionOption = QuestionOption::findOrFail($id);

        $questionOption->delete();

        return response()->json([
            'error' => 'successfully_deleted', 'message' => __('errors.successfully_deleted'),
        ]);
    }
}
