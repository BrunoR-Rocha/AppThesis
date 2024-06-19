<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class QuestionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'title' => $this->title,
            'explanation' => $this->explanation,
            'hint' => $this->hint,
            'difficulty' => $this->difficulty,
            'status' => $this->status,
            'type_id' => $this->type_id,
            'user_id' => $this->user_id,
            'tags' => json_decode($this->tags),
            'image' => Storage::disk('public')->url($this->image_path),
            'image_path' => $this->image_path
        ];
    }
}
