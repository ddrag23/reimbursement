<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Pagination\AbstractPaginator;

class QueryAdapterCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "data" => QueryAdapterResource::collection($this->collection),
            "totalCount" => $this->resource instanceof AbstractPaginator ? $this->total() : $this->count(),
        ];
    }
}
