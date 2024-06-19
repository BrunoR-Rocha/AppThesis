<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\ForumThreadResource;
use App\Models\ForumThread;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ForumThreadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = new ApiResponse($request, ForumThread::class);

        return $data->returnCollectionAsJsonResponse(ForumThreadResource::collection($data->collection('forum_threads')));
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
            'description' => 'required|string|max:255',
            'forum_category_id' => 'required',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $forumThread = ForumThread::create([
            'title' => $request->title,
            'description' => $request->description,
            'forum_category_id' => $request->forum_category_id,
            'user_id' => Auth::user()->id
        ]);

        return response()->json([
            'id' => $forumThread->id, 
            'message' => __('validator.success'),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ForumThread  $forumThread
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $forumThread = ForumThread::findOrFail($id);

        return new ForumThreadResource($forumThread);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ForumThread  $forumThread
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $forumThread = ForumThread::findOrFail($id);

        $forumThread->update($request->all());

        return $forumThread;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ForumThread  $forumThread
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $forumThread = ForumThread::findOrFail($id);

        $forumThread->delete();

        return response()->json([
            'error' => 'successfully_deleted', 'message' => __('errors.successfully_deleted'),
        ]);
    }
}
