<?php

declare(strict_types=1);

namespace App\Presenter\Http\Controllers\Api;

use App\Application\AdultCategory\ListAdultCategoryQuery;
use App\Application\AdultCategory\ListAdultCategoryHandler;
use App\Application\AdultCategory\ListAdultCategoryResponse;
use App\Infrastructure\Database\AdultCategory\AdultCategoryValidator;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
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
        try {
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
            
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
            
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Adult categories not found'
            ], 404);
            
        } catch (\Throwable $th) {
            Log::error('ListAdultCategoryController error: ' . $th->getMessage(), [
                'exception' => $th,
                'request' => $request->all()
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Internal server error'
            ], 500);
        }
    }
}
