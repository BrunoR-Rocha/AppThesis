<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CourseResource extends JsonResource
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
            'average_time' => $this->average_time,
            'difficulty' => $this->difficulty,
            'topic_id' => $this->topic_id,
            'enabled' => $this->enabled,
            'image' => Storage::disk('public')->url($this->file_path),
            'file_path' => $this->file_path,
            'lessons' => $this->lessons
        ];
    }
}
