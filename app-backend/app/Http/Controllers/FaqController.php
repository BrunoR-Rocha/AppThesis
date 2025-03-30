<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\FaqResource;
use App\Models\Faq;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class FaqController extends Controller
{
    public function index(Request $request)
    {
        $data = new ApiResponse($request, Faq::class);
        return $data->returnCollectionAsJsonResponse(FaqResource::collection($data->collection('faqs')));
    }

    public function store(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'tag' => 'required|string',
            'enabled' => 'required|boolean',
            'translations' => 'required|array',
            'translations.*.locale' => 'required|string',
            'translations.*.title' => 'nullable|string',
            'translations.*.body' => 'nullable|string',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('auth.register_fail'),
            ], 400);
        }

        $faq = Faq::create([
            'tag' => $request->tag,
            'enabled' => $request->enabled,
        ]);

        foreach ($validatedData['translations'] as $translationData) {
            $faq->translations()->create($translationData);
        }

        $faq->load('translations');

        return response()->json([
            'id' => $faq->id,
            'message' => __('auth.register'),
        ], 200);
    }

    public function show($id)
    {
        $faq = Faq::with('translations')->findOrFail($id);
        return new FaqResource($faq);
    }


    public function update(Request $request, $id)
    {
        $faq = Faq::findOrFail($id);

        $validatedData = $request->validate([
            'tag' => 'required|unique:faqs,tag,' . $faq->id,
            'enabled' => 'required|boolean',
            'translations' => 'required|array',
            'translations.*.locale' => 'required|string',
            'translations.*.title' => 'nullable|string',
            'translations.*.body' => 'nullable|string',
        ]);

        $faq->update([
            'tag' => $validatedData['tag'],
            'enabled' => $validatedData['enabled'],
        ]);
        
        $existingLocales = [];

        foreach ($validatedData['translations'] as $translationData) {
            $locale = $translationData['locale'];
            $existingLocales[] = $locale;

            $translation = $faq->translations()->where('locale', $locale)->first();

            if ($translation) {
                $translation->update($translationData);
            } else {
                $faq->translations()->create($translationData);
            }
        }

        $faq->translations()->whereNotIn('locale', $existingLocales)->delete();

        $faq->load('translations');

        return response()->json($faq);
    }

    public function destroy($id)
    {
        $faq = Faq::findOrFail($id);
        $faq->delete();

        return response()->json([
            'error' => 'successfully_deleted',
            'message' => __('errors.successfully_deleted'),
        ]);
    }

    public function getAll()
    {
        $locale = app()->getLocale();

        $faqs = Faq::active()->with(['translations' => function($query) use ($locale) {
            $query->where('locale', $locale);
        }])->get();

        if ($faqs->isEmpty()) {
            return response()->json(['error' => 'Error when fetching the data'], 401);
        }
    
        $parsedFaqs = $faqs->flatMap(function ($faq) {
            return $faq->translations->map(function ($translation) use ($faq) {
                return [
                    'id'      => $faq->id,
                    'tag'     => $faq->tag,
                    'locale'  => $translation->locale,
                    'title'   => $translation->title,
                    'body'    => $translation->body,
                ];
            });
        });
    
        return response()->json($parsedFaqs, 200);
    }
}
