<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\JournalResource;
use App\Models\Journal;
use App\Models\SysConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class JournalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = new ApiResponse($request, Journal::class);

        return $data->returnCollectionAsJsonResponse(JournalResource::collection($data->collection('journals')));
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
            'publisher' => 'nullable|string',
            'link' => 'required|string',
            'citeScore' => 'nullable',
            'subjectArea' => 'required',
            'SNIP' => 'required',
            'SJR' => 'required',
            'coverageStart' => 'required',
            'coverageEnd' => 'required',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $journal = Journal::create([
            'title' => $request->title,
            'body' => $request->body,
            'journal_title' => $request->journal_title,
            'doi' => $request->doi,
            'enabled' => $request->enabled,
        ]);

        return response()->json([
            'id' => $journal->id,
            'message' => __('validator.success'),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Journal  $journal
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $journal = Journal::findOrFail($id);

        return new JournalResource($journal);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Journal  $journal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // TODO: adicionar validacao de que apenas o utilizador admin loggado deve conseguir fazer a atualizacao ou eliminacao deste tipo de informacao
        $journal = Journal::findOrFail($id);

        $journal->update($request->all());

        return $journal;
    }

    public function autoUpdateJournalData()
    {
        $theme = SysConfig::tag('theme')->first()->value;
        // $response = Http::get('https://api.crossref.org/journals', [
        //     'query' => $theme,
        //     'rows' => 60
        // ]);

        $response = Http::get('https://api.openalex.org/journals', [
            'search' => $theme,
            'per-page' => 70,
            'mailto' => 'brunor_gon_rocha@hotmail.com'
        ]);

        if ($response->successful()) {
            $data = $response->json();

            foreach ($data['results'] as $journalData) {
                Journal::updateOrCreate(
                    ['title' => $journalData['display_name']],
                    [
                        'publisher' => $journalData['host_organization_name'] ?? '',
                        'link' => $journalData['homepage_url'],
                        'subject_area' => json_encode(array_map(function ($topic) {
                            return $topic['display_name'];
                        }, $journalData['topics'] ?? [])),
                        'issn' => json_encode($journalData['issn'] ?? []),
                    ]
                );
            }
        }

        return response()->json(['message' => 'Journal data updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Journal  $journal
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $journal = Journal::findOrFail($id);

        $journal->delete();

        return response()->json([
            'error' => 'successfully_deleted',
            'message' => __('errors.successfully_deleted'),
        ]);
    }

    public function getAll()
    {
        $journals = Journal::active()->get();

        return JournalResource::collection($journals);
    }
}
