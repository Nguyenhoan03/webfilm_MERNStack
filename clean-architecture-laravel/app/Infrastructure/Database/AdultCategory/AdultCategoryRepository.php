<?php

declare(strict_types=1);

namespace App\Infrastructure\Database\AdultCategory;

use App\Domain\AdultCategory\AdultCategory;
use App\Domain\AdultCategory\AdultCategoryRepositoryInterface;

class AdultCategoryRepository implements AdultCategoryRepositoryInterface
{
    public function __construct(
        private AdultCategoryModel $model
    ) {
    }

    public function listAdultCategories(int $page = 1, int $perPage = 15): array
    {
        $offset = ($page - 1) * $perPage;
        
        $models = $this->model
            ->ordered()
            ->offset($offset)
            ->limit($perPage)
            ->get();

        return $models->map(fn($model) => $this->toDomain($model))->toArray();
    }

    public function findById(int $id): ?AdultCategory
    {
        $model = $this->model->find($id);
        
        return $model ? $this->toDomain($model) : null;
    }

    public function findBySlug(string $slug): ?AdultCategory
    {
        $model = $this->model->where('slug', $slug)->first();
        
        return $model ? $this->toDomain($model) : null;
    }

    public function listActiveAdultCategories(int $page = 1, int $perPage = 15): array
    {
        $offset = ($page - 1) * $perPage;
        
        $models = $this->model
            ->active()
            ->ordered()
            ->offset($offset)
            ->limit($perPage)
            ->get();

        return $models->map(fn($model) => $this->toDomain($model))->toArray();
    }

    public function countAdultCategories(): int
    {
        return $this->model->count();
    }

    public function countActiveAdultCategories(): int
    {
        return $this->model->active()->count();
    }

    private function toDomain(AdultCategoryModel $model): AdultCategory
    {
        return new AdultCategory(
            id: $model->id,
            name: $model->name,
            slug: $model->slug,
            description: $model->description,
            icon: $model->icon,
            color: $model->color,
            isActive: $model->is_active,
            sortOrder: $model->sort_order,
            filmCount: $model->film_count,
            createdAt: $model->created_at->toDateTimeImmutable(),
            updatedAt: $model->updated_at->toDateTimeImmutable()
        );
    }
}
