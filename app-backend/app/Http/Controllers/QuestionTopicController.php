<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\QuestionTopicResource;
use App\Models\Question;
use App\Models\QuestionTopic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuestionTopicController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = new ApiResponse($request, QuestionTopic::class);

        return $data->returnCollectionAsJsonResponse(QuestionTopicResource::collection($data->collection('question_topics')));
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
            'question_id' => 'nullable|exists:questions,id'
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $questionTopic = QuestionTopic::create([
            'name' => $request->name,
            'tag' => $request->tag,
        ]);

        if($request->question_id)
        {
            $question = Question::findOrFail($request->question_id);
            $question->topics()->attach($questionTopic->id);
        }

        return response()->json([
            'id' => $questionTopic->id, 
            'message' => __('validator.success'),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\QuestionTopic  $questionTopic
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $questionTopic = QuestionTopic::findOrFail($id);

        return new QuestionTopicResource($questionTopic);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\QuestionTopic  $questionTopic
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $questionTopic = QuestionTopic::findOrFail($id);

        $questionTopic->update($request->all());

        return $questionTopic;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\QuestionTopic  $questionTopic
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $questionTopic = QuestionTopic::findOrFail($id);

        $questionTopic->delete();

        return response()->json([
            'error' => 'successfully_deleted', 'message' => __('errors.successfully_deleted'),
        ]);
    }
}
