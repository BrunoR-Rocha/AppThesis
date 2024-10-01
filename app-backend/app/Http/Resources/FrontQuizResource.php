<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FrontQuizResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'params' => [
                'id' => $this->id,
                'title' => $this->title,
                'description' => $this->description,
                'difficulty' => $this->difficulty,
                'time_limit' => $this->time_limit ?? $this->estimatedCompletionTime(),
            ],
            'questions' => $this->questions->map(function ($question) {
                return [
                    'id' => $question->id,
                    'title' => $question->title,
                    'type' => $question->type->tag,
                    'options' => $question->options->map(function ($option) {
                        return [
                            'option_text' => $option->option_text,
                        ];
                    }),
                ];
            }),
        ];
    }
}
