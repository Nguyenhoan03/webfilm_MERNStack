<?php

declare(strict_types=1);

namespace App\Infrastructure\Database\AdultCategory;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AdultCategoryValidator
{
    public function validateListRequest(array $data): array
    {
        $validator = Validator::make($data, [
            'page' => 'integer|min:1',
            'per_page' => 'integer|min:1|max:100',
            'active_only' => 'boolean',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    public function validateCreateRequest(array $data): array
    {
        $validator = Validator::make($data, [
            'name' => 'required|string|max:255|unique:adult_categories,name',
            'slug' => 'required|string|max:255|unique:adult_categories,slug|regex:/^[a-z0-9-]+$/',
            'description' => 'nullable|string|max:1000',
            'icon' => 'nullable|string|max:255',
            'color' => 'required|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    public function validateUpdateRequest(array $data, int $id): array
    {
        $validator = Validator::make($data, [
            'name' => 'sometimes|required|string|max:255|unique:adult_categories,name,' . $id,
            'slug' => 'sometimes|required|string|max:255|unique:adult_categories,slug,' . $id . '|regex:/^[a-z0-9-]+$/',
            'description' => 'nullable|string|max:1000',
            'icon' => 'nullable|string|max:255',
            'color' => 'sometimes|required|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
