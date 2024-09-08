<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\ForumPostResource;
use App\Models\ForumPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ForumPostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = new ApiResponse($request, ForumPost::class);

        return $data->returnCollectionAsJsonResponse(ForumPostResource::collection($data->collection('forum_posts')));
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
            'body' => 'required|string',
            'forum_thread_id' => 'required',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $forumPost = ForumPost::create([
            'body' => $request->body,
            'forum_thread_id' => $request->forum_thread_id,
            'user_id' => Auth::user()->id
        ]);

        return response()->json([
            'id' => $forumPost->id,
            'message' => __('validator.success'),
        ], 200);
    }

    public function frontStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'comment' => 'required|string|max:255',
            'forum_thread_id' => 'required|exists:forum_threads,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        // TODO - add antispam mechanism
        
        $validatedData = $validator->validated();
        $validatedData['user_id'] = Auth::user()->id ?? 1;
        $validatedData['body'] = $validatedData['comment'];
        $forumPost = ForumPost::create($validatedData);

        return response()->json([
            'comment' => new ForumPostResource($forumPost),
            'message' => __('validator.success'),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ForumPost  $forumPost
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $forumPost = ForumPost::findOrFail($id);

        return new ForumPostResource($forumPost);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ForumPost  $forumPost
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $forumPost = ForumPost::findOrFail($id);

        $forumPost->update($request->all());

        return $forumPost;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ForumPost  $forumPost
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $forumPost = ForumPost::findOrFail($id);

        $forumPost->delete();

        return response()->json([
            'error' => 'successfully_deleted', 'message' => __('errors.successfully_deleted'),
        ]);
    }
}
