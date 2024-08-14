<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class LibraryPageResource extends JsonResource
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
            'id'   => $this->id,
            'title' => $this->title,
            'tag' => $this->tag,
            'description' => $this->description,
            'author' => $this->author,
            'date' => $this->date,
            'modules' => $this->libraryPageModules
        ];
    }
}
