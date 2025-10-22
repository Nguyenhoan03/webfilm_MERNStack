<?php

declare(strict_types=1);

namespace App\Presenter\Providers;

use App\Domain\AdultCategory\AdultCategoryRepositoryInterface;
use App\Infrastructure\Database\AdultCategory\AdultCategoryRepository;
use App\Infrastructure\Database\AdultCategory\AdultCategoryModel;
use App\Presenter\Http\Controllers\Api\ListAdultCategoryController;
use Illuminate\Support\ServiceProvider;

class AdultCategoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            AdultCategoryRepositoryInterface::class,
            AdultCategoryRepository::class
        );
    }

    public function boot(): void
    {
        // Load controller để đăng ký routes
        $this->app->make(ListAdultCategoryController::class);
    }
}
