<?php

declare(strict_types=1);

namespace App\Presenter\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ListAdultCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'page' => 'integer|min:1',
            'per_page' => 'integer|min:1|max:100',
            'active_only' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'page.integer' => 'Page must be an integer',
            'page.min' => 'Page must be at least 1',
            'per_page.integer' => 'Per page must be an integer',
            'per_page.min' => 'Per page must be at least 1',
            'per_page.max' => 'Per page cannot exceed 100',
            'active_only.boolean' => 'Active only must be a boolean value',
        ];
    }
}
