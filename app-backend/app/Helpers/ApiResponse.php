<?php

namespace App\Helpers;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Schema;

class ApiResponse extends ResponseParsing
{
    private $model;
    private $q;
    private $countRows;
    private $complex_filters_array;
    private $ignore_filters_array;
    private $relation_array;
    private $relation_filters_array;
    private $search_q_limit_columns_array;

    private $other_tables_array;
    private $full_text_search;

    private $load_with;
    public $sort;

    public function __construct($request, $model, $arr_filters = [], $sort = [])
    {
        parent::__construct($request);
        $this->model = $model;
        $this->query = $this->model::select('*');
        $this->setInitialQueryStrings($arr_filters);
        $this->getQstring();
        $this->complex_filters_array = [];
        $this->ignore_filters_array = [];
        $this->relation_array = [];
        $this->relation_filters_array = [];
        $this->search_q_limit_columns_array = [];
        $this->other_tables_array = [];
        $this->full_text_search = false;
        if (isset($sort) && count($sort) > 0)
            $this->sort = $sort;
    }

    public function loadWith($load_with)
    {
        $this->load_with = $load_with;
    }

    private function setInitialQueryStrings($arr_filters)
    {
        foreach ($arr_filters as $key => $value) {
            if (is_array($value)) {
                if ($value[0] == 'not') {
                    $this->query->where($key, '!=', $value[1])->orWhereNull($key);
                } else {
                    $this->query->whereIn($key, $value);
                }
            } else {
                $this->query->where($key, $value);
            }
        }
    }

    private function getQstring()
    {
        if (!is_null($this->filter)) {
            $q_index = null;
            for ($i = 0; $i < count($this->filter); $i++) {
                if ($this->filter[$i] === 'q') {
                    $q_index = $i;
                    $query = str_replace(['\\', '/', '\'', '|', '"', ',', ':', ';', '<', '>', '#', '&', '$', '€', '=', ')', '(', '!', '[', ']'], '', $this->filter[$i + 1]);
                    $this->q = transliterator_transliterate('Any-Latin; NFD; [:Nonspacing Mark:] Remove; Lower();', $query);
                }
            }
            if (!is_null($q_index)) {
                array_splice($this->filter, $q_index, 2);
            }
        }
    }

    public function collection($type, $searchCollumns = true, $usePagination = true)
    {
        if ($this->q) {
            if ($this->full_text_search) {
                $this->query->search($this->q);
            } else {
                if (count($this->search_q_limit_columns_array) > 0) {
                    $this->_searchQLimitColumns($this->q);
                } else {
                    $this->searchAllColumns($type, $this->q);
                }
            }
        }

        if ($this->filter !== null && count($this->filter) !== 0 && $searchCollumns) {
            $this->searchSpecificColumns();
        }

        if (count($this->relation_array) > 0) {
            foreach ($this->relation_array as $key => $value) {
                $this->query->whereHas($key, $value);
            }
        }

        $this->countRows = $this->countRows();
        $data = $this->runQuery($usePagination);

        return $data;
    }

    private function runQuery($usePagination)
    {
        if (!is_null($this->range) && $usePagination) {
            $this->query->skip($this->range['min'])->take($this->range['max'] - $this->range['min'] + 1);
        }

        if (!is_null($this->sort) && !$this->full_text_search) {
            $this->query->orderBy($this->sort['column'], $this->sort['order']);
        }

        if (!is_null($this->load_with)) {
            $this->query->with($this->load_with);
        }

        if ($this->full_text_search) {
            if (!is_null($this->q)) {
                $this->query->SortByRank($this->q);
            } else {
                $this->query->orderBy($this->sort['column'], $this->sort['order']);
            }
        }

        $data = $this->query->get();

        return $data;
    }

    private function countRows()
    {
        return $this->query->count();
    }

    public function returnCollectionAsJsonResponse($data)
    {
        if (is_null($this->range)) {
            return response()->json($data, 200);
        }

        return response()
            ->json($data, 200)
            ->header('Content-Range', "{$this->type} {$this->range['min']}-{$this->range['max']}/{$this->countRows}")
            ->header('Access-Control-Expose-Headers', 'Content-Range');
    }

    private function searchAllColumns($type, $val)
    {
        $columns = Schema::getColumnListing($type);

        $vals = [$val];

        $this->query->where(function ($query) use ($columns, $vals) {
            foreach ($columns as $column) {
                foreach ($vals as $subval) {
                    $query->orWhere($column, 'ilike', "%{$subval}%");
                }
            }
        });
    }

    private function searchSpecificColumns()
    {
        for ($i = 0; $i < count($this->filter); $i += 2) {
            if (array_key_exists($this->filter[$i], $this->other_tables_array)) {
                $this->applySpecificFilter($this->other_tables_array[$this->filter[$i]], $this->filter[$i], $this->filter[$i + 1]);
                continue;
            }

            if (array_key_exists($this->filter[$i], $this->complex_filters_array)) {
                $this->query->whereRaw('(' . $this->complex_filters_array[$this->filter[$i]] . ')');
                continue;
            }

            if (array_key_exists($this->filter[$i], $this->ignore_filters_array)) {
                continue;
            }

            if (array_key_exists($this->filter[$i], $this->relation_filters_array)) {
                $column = $this->filter[$i];
                $relationship = $this->relation_filters_array[$this->filter[$i]];
                $value = $this->filter[$i + 1];

                $this->query->whereHas($relationship, function (Builder $query) use ($column, $value) {
                    $query->where($column, $value);
                });
                continue;
            }

            if (!array_key_exists(($i + 1), $this->filter)) {
                continue;
            }

            if (is_array($this->filter[$i + 1])) {
                $this->query->whereIn($this->filter[$i], $this->filter[$i + 1]);
            } else {
                $value = self::parseBoolValue($this->filter[$i + 1]);
                $this->query->where($this->filter[$i], $value);
            }
        }
    }

    private static function parseBoolValue($value)
    {
        if (in_array($value, ['true', 'false'])) {
            return filter_var($value, FILTER_VALIDATE_BOOLEAN);
        }

        return $value;
    }

    public function setComplexFilterArray($array)
    {
        if (!is_array($array)) {
            throw new Exception('Given argument is not an array.');
        }

        $this->complex_filters_array = $array;
    }

    public function ignoreFilterArray($array)
    {
        if (!is_array($array)) {
            throw new Exception('Given argument is not an array.');
        }

        $this->ignore_filters_array = $array;
    }

    public function setRelationArray($array)
    {
        if (!is_array($array)) {
            throw new Exception('Given argument is not an array.');
        }

        $this->relation_array = $array;
    }

    public function setRelationFiltersArray($array)
    {
        if (!is_array($array)) {
            throw new Exception('Given argument is not an array.');
        }

        $this->relation_filters_array = $array;
    }

    public function setOtherTables($array)
    {
        if (!is_array($array)) {
            throw new Exception('Given argument is not an array.');
        }

        $this->other_tables_array = $array;
    }

    public function getParamenterFilterValue($name)
    {
        if (is_null($this->filter)) {
            return;
        }

        if (!in_array($name, $this->filter)) {
            return;
        }

        $index = array_search($name, $this->filter, true);

        if ($index === null) {
            return;
        }

        return $this->filter[$index + 1];
    }

    public function setSearchQLimitcColumnsArray($array)
    {
        if (!is_array($array)) {
            throw new Exception('Given argument is not an array.');
        }

        $this->search_q_limit_columns_array = $array;
    }

    private function _searchQLimitColumns($val)
    {
        $vals = [$val];

        $this->query->where(function ($query) use ($vals) {
            foreach ($this->search_q_limit_columns_array as $column) {
                foreach ($vals as $subval) {
                    $query->orWhere($column, 'ilike', "%{$subval}%");
                }
            }
        });
    }

    public function activeFullTextSearch()
    {
        $this->full_text_search = true;
    }

    private function applySpecificFilter($table, $key, $value)
    {
        switch ($key) {

            default:
                break;
        }
    }
}
