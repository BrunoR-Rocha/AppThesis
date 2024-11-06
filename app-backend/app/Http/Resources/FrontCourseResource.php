<?php

namespace App\Http\Resources;

use App\Models\Difficulty;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class FrontCourseResource extends JsonResource
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
            'id' => $this->id,
            'title' => $this->title,
            'short_description' => $this->short_description,
            'description' => $this->description,
            'average_time' => $this->handleTime($this->average_time),
            'difficulty' => Difficulty::getStandardDifficulty($this->difficulty),
            'created_at' => $this->created_at ? Carbon::parse($this->created_at)->format('d/m/Y') : null,
            'updated_at' => $this->updated_at ? Carbon::parse($this->updated_at)->format('d/m/Y') : null,
            'topic_id' => [
                'id' => $this->questionTopic->id,
                'name' => $this->questionTopic->name
            ],
            'contents' => $this->courseContents,
            'num_contents' => $this->courseContents->count(),
            'lessons' => $this->lessons->map(function ($lesson) {
                return [
                    'id' => $lesson->id,
                    'title' => $lesson->title,
                    'description' => $lesson->short_description,
                    'estimated_duration' =>  $this->handleTime($lesson->estimated_duration),
                ];
            }),
            'num_lessons' => $this->lessons->count(),
            'is_subscribed' => $this->isUserSubscribed(Auth::user()),
            'subscribed_at' => $this->user_subscribed_date ? $this->user_subscribed_date->format('d/m/Y') : null,
            'general_progress' => $this->general_progress . '%',
        ];
    }

    private function handleTime($time)
    {
        if ($time >= 60) {
            $hours = floor($time / 60);
            $minutes = $time % 60;
            return $minutes > 0
                ? $hours . ' hours ' . $minutes . ' minutes'
                : $hours . ' hours';
        }

        return $time . ' minutes';
    }
}
