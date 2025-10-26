<?php

declare(strict_types=1);

namespace App\Presenter\Http\Controllers\Api;

use App\Application\AdultCategory\ListAdultCategoryQuery;
use App\Application\AdultCategory\ListAdultCategoryHandler;
use App\Application\AdultCategory\ListAdultCategoryResponse;
use App\Infrastructure\Database\AdultCategory\AdultCategoryValidator;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Spatie\RouteAttributes\Attributes\Get;

class ListAdultCategoryController
{
    public function __construct(
        private AdultCategoryValidator $validator,
        private ListAdultCategoryHandler $handler
    ) {
    }
    #[Get('/api/adult-categories', name: 'adult-categories.index')]
    public function index(Request $request): JsonResponse
    {
        // Validate request
        $validatedData = $this->validator->validateListRequest($request->all());
        
        // Create query from request
        $query = ListAdultCategoryQuery::fromRequest($validatedData);
        
        // Handle the query
        $categories = $this->handler->handle($query);
        
        // Create response
        $response = new ListAdultCategoryResponse(
            categories: $categories,
            total: count($categories),
            page: $query->getPage(),
            perPage: $query->getPerPage(),
            lastPage: (int) ceil(count($categories) / $query->getPerPage())
        );
        
        return response()->json([
            'status' => 'success',
            'message' => 'Adult categories retrieved successfully',
            'data' => $response->toArray()
        ], 200);
    }
}
