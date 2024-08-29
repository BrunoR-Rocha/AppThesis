<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\ForumCategoryResource;
use App\Models\ForumCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ForumCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = new ApiResponse($request, ForumCategory::class);

        return $data->returnCollectionAsJsonResponse(ForumCategoryResource::collection($data->collection('forum_categories')));
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
            'tag' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'active' => 'required|boolean',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $forumCategory = ForumCategory::create([
            'tag' => $request->tag,
            'name' => $request->name,
            'active' => $request->active,
        ]);

        return response()->json([
            'id' => $forumCategory->id,
            'message' => __('validator.success'),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ForumCategory  $forumCategory
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $forumCategory = ForumCategory::findOrFail($id);

        return new ForumCategoryResource($forumCategory);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ForumCategory  $forumCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $forumCategory = ForumCategory::findOrFail($id);

        $forumCategory->update($request->all());

        return $forumCategory;
    }

    public function getAll()
    {
        return ForumCategory::active()->select('id', 'name')->get();
    }
}
