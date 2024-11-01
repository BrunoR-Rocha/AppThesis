<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\NewsResource;
use App\Models\News;
use App\Models\SysConfig;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = new ApiResponse($request, News::class);

        return $data->returnCollectionAsJsonResponse(NewsResource::collection($data->collection('news')));
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
            'body' => 'nullable|string',
            'journal_title' => 'required|string',
            'doi' => 'nullable',
            'enabled' => 'required|boolean',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $news = News::create([
            'title' => $request->title,
            'body' => $request->body,
            'journal_title' => $request->journal_title,
            'doi' => $request->doi,
            'enabled' => $request->enabled,
        ]);

        return response()->json([
            'id' => $news->id,
            'message' => __('validator.success'),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $news = News::findOrFail($id);

        return new NewsResource($news);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);
        $news->update($request->all());

        return $news;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $news = News::findOrFail($id);
        $news->delete();

        return response()->json([
            'error' => 'successfully_deleted',
            'message' => __('errors.successfully_deleted'),
        ]);
    }

    public function getAll()
    {
        $news = News::active()->get();

        return NewsResource::collection($news);
    }

    public function autoUpdateNews()
    {
        $theme = SysConfig::tag('theme')->first()->value;
        $rows = SysConfig::tag('newsPerDay')->first()?->value ?? 50;

        $response = Http::get('https://api.openalex.org/works', [
            'per-page' => $rows,
            'filter' => 'title.search:' . $theme,
            'sort' => 'publication_date:desc',
            'mailto' => 'brunor_gon_rocha@hotmail.com'
        ]);

        if ($response->successful()) {
            $data = $response->json();

            foreach ($data['results'] as $newsData) {

                if (isset($newsData['doi'])) {
                    $existingNews = News::where('doi', $newsData['doi'])->orWhere('title', $newsData['title'])->first();

                    if (!$existingNews) {
                        News::create([
                            'title' => $newsData['title'] ?? 'No Title',
                            'body' => $newsData['primary_topic'] ? $newsData['primary_topic']['display_name'] : null,
                            'doi' => $newsData['doi'],
                            'journal_title' => $newsData['primary_location']['source'] ? $newsData['primary_location']['source']['display_name'] : 'N/A',
                            'enabled' => true
                        ]);
                    }
                }
            }

            $retentionPeriod = Carbon::now()->subDays(90);
            News::where('created_at', '<', $retentionPeriod)
                ->where('enabled', true)
                ->update(['enabled' => false]);
        }

        return response()->json(['message' => 'Journal data updated successfully.']);
    }
}
