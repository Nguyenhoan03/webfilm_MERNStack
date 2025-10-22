<?php

declare(strict_types=1);

namespace App\Infrastructure\Database\AdultCategory;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Database\Factories\AdultCategoryFactory;

class AdultCategoryModel extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return AdultCategoryFactory::new();
    }

    protected $table = 'adult_categories';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'color',
        'is_active',
        'sort_order',
        'film_count',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'film_count' => 'integer',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc')->orderBy('name', 'asc');
    }
}
