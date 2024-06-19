<?php

namespace App\Helpers;

class ResponseParsing
{
    protected static $queryOperators = [
        'gt' => '>',
        'lt' => '<',
        'gte' => '>=',
        'lte' => '<=',
        'like' => 'like'
    ];

    public $filter;
    public $range;
    public $sort;
    public $query;
    public $type;
    public $filterOperators;

    public function __construct($request)
    {
        $this->parseRequest($request);
    }

    private function parseRequest($request)
    {
        $this->parseFilter($request->filter);
        if (!is_null($request->range)) {
            $this->parseRange($request->range);
        }
        if (!is_null($request->sort)) {
            $this->parseSort($request->sort);
        }
    }

    private function parseFilter($filter_string)
    {
        $result = [];
        $this->filterOperators = [];
        try {
            foreach (json_decode($filter_string) as $key => $value) {
                $operatorData = static::convertToOperator($value);
                $result[] = $key;
                $this->filterOperators[] = $operatorData[1];
                $result[] = is_bool($operatorData[0]) || is_array($operatorData[0]) ? $operatorData[0] : addslashes($operatorData[0]);
            }
        } catch (\Exception $e) {
            $result = null;
        }

        $this->filter = $result;
    }

    private function parseRange($range_string)
    {
        $range = json_decode($range_string);

        $result = null;
        try {
            if (count($range) === 2) {
                $result = [
                    'min' => $range[0],
                    'max' => $range[1],
                ];
            }
        } catch (\Exception $e) {
            $result = null;
        }

        $this->range = $result;
    }

    private function parseSort($sort_string)
    {
        $sort = json_decode($sort_string);

        $result = null;
        try {
            if (count($sort) === 2) {
                $result = [
                    'column' => $sort[0],
                    'order' => $sort[1],
                ];
            }
        } catch (\Exception $e) {
            $result = null;
        }

        $this->sort = $result;
    }

    private static function convertToOperator($value)
    {
        if (!is_array($value)) {
            $key_parts = explode('_', $value);
            $key_end = array_shift($key_parts);
            if (in_array($key_end, array_keys(static::$queryOperators))) {
                return [implode('_', $key_parts), static::$queryOperators[$key_end]];
            } else {
                return [$value, '='];
            }
        } else {
            return [$value, '='];
        }
    }
}
