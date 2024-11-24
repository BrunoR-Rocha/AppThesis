<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\StaticContentResource;
use App\Models\StaticContent;
use Illuminate\Http\Request;

class StaticContentController extends Controller
{
    public function index(Request $request)
    {
        $data = new ApiResponse($request, StaticContent::class);

        return $data->returnCollectionAsJsonResponse(StaticContentResource::collection($data->collection('static_contents')));
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'tag' => 'required|unique:static_contents,tag',
            'translations' => 'required|array',
            'translations.*.locale' => 'required|string',
            'translations.*.title' => 'nullable|string',
            'translations.*.content' => 'nullable|string',
        ]);

        $staticContent = StaticContent::create([
            'tag' => $validatedData['tag'],
        ]);

        foreach ($validatedData['translations'] as $translationData) {
            $staticContent->translations()->create($translationData);
        }

        $staticContent->load('translations');

        return response()->json($staticContent, 201);
    }

    public function show($id)
    {
        $staticContent = StaticContent::with('translations')->findOrFail($id);

        return new StaticContentResource($staticContent);
    }

    public function update(Request $request, $id)
    {
        $staticContent = StaticContent::findOrFail($id);

        $validatedData = $request->validate([
            'tag' => 'required|unique:static_contents,tag,' . $staticContent->id,
            'translations' => 'required|array',
            'translations.*.locale' => 'required|string',
            'translations.*.title' => 'nullable|string',
            'translations.*.content' => 'nullable|string',
        ]);

        $staticContent->update([
            'tag' => $validatedData['tag'],
        ]);

        $existingLocales = [];

        foreach ($validatedData['translations'] as $translationData) {
            $locale = $translationData['locale'];
            $existingLocales[] = $locale;

            $translation = $staticContent->translations()->where('locale', $locale)->first();

            if ($translation) {
                $translation->update($translationData);
            } else {
                $staticContent->translations()->create($translationData);
            }
        }

        $staticContent->translations()->whereNotIn('locale', $existingLocales)->delete();

        $staticContent->load('translations');

        return response()->json($staticContent);
    }

    public function destroy(Request $request, $id)
    {
        $staticContent = StaticContent::findOrFail($id);
        $staticContent->delete();

        return response()->json([
            'error' => 'successfully_deleted',
            'message' => __('errors.successfully_deleted'),
        ]);
    }

    public function getContentByTag(Request $request, $tag)
    {
        $locale = $request->input('locale', app()->getLocale());

        $staticContent = StaticContent::where('tag', $tag)->first();

        if (!$staticContent) {
            return response()->json(['error' => 'Content not found'], 404);
        }

        $translation = $staticContent->translations()->where('locale', $locale)->first();

        if (!$translation) {
            $fallbackLocale = config('app.fallback_locale');
            $translation = $staticContent->translations()->where('locale', $fallbackLocale)->first();

            if (!$translation) {
                return response()->json(['error' => 'Translation not found'], 404);
            }
        }

        return response()->json([
            'id' => $staticContent->id,
            'tag' => $staticContent->key,
            'locale' => $translation->locale,
            'title' => $translation->title,
            'content' => $translation->content,
        ]);
    }
}
