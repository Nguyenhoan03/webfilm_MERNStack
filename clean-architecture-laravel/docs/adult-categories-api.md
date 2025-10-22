# Adult Categories API - Clean Architecture Implementation

## Tổng quan

Đây là implementation hoàn chỉnh của Clean Architecture cho việc quản lý Adult Categories với các tính năng:

- Get list adult categories với pagination
- Filter theo trạng thái active/inactive
- Validation đầy đủ
- Error handling
- Type safety với Value Objects

## Cấu trúc Clean Architecture

### 1. Domain Layer (`app/Domain/AdultCategory/`)
- **AdultCategory.php**: Entity chính với business logic
- **ValueObjects/**: Các value objects để đảm bảo type safety
- **AdultCategoryRepositoryInterface.php**: Interface cho repository

### 2. Application Layer (`app/Application/AdultCategory/`)
- **ListAdultCategoryQuery.php**: Query object với validation
- **ListAdultCategoryHandler.php**: Handler xử lý business logic
- **ListAdultCategoryResponse.php**: Response object

### 3. Infrastructure Layer (`app/Infrastructure/Database/AdultCategory/`)
- **AdultCategoryModel.php**: Eloquent model
- **AdultCategoryRepository.php**: Implementation của repository interface
- **AdultCategoryValidator.php**: Validation rules

### 4. Presenter Layer (`app/Presenter/Http/`)
- **Controllers/Api/ListAdultCategoryController.php**: HTTP controller
- **Requests/ListAdultCategoryRequest.php**: Form request validation
- **Resources/**: API resources cho response formatting
- **Providers/AdultCategoryServiceProvider.php**: Service provider

## API Endpoints

### GET /api/adult-categories

Lấy danh sách adult categories với pagination.

**Query Parameters:**
- `page` (integer, optional): Số trang (default: 1)
- `per_page` (integer, optional): Số items per page (default: 15, max: 100)
- `active_only` (boolean, optional): Chỉ lấy categories đang active (default: false)

**Response:**
```json
{
    "status": "success",
    "message": "Adult categories retrieved successfully",
    "data": {
        "data": [
            {
                "id": 1,
                "name": "Action",
                "slug": "action",
                "description": "Action movies",
                "icon": "action-icon.svg",
                "color": "#FF6B6B",
                "is_active": true,
                "sort_order": 1,
                "film_count": 25,
                "created_at": "2024-01-15 10:00:00",
                "updated_at": "2024-01-15 10:00:00"
            }
        ],
        "pagination": {
            "total": 10,
            "page": 1,
            "per_page": 15,
            "last_page": 1
        }
    }
}
```

**Error Responses:**
- `422`: Validation errors
- `404`: Not found
- `500`: Internal server error

## Cách sử dụng

### 1. Đăng ký Service Provider

Thêm vào `config/app.php`:
```php
'providers' => [
    // ...
    App\Presenter\Providers\AdultCategoryServiceProvider::class,
],
```

### 2. Chạy Migration

```bash
php artisan migrate
```

### 3. Test API

```bash
# Lấy tất cả categories
curl -X GET "http://localhost:8000/api/adult-categories"

# Lấy categories với pagination
curl -X GET "http://localhost:8000/api/adult-categories?page=1&per_page=10"

# Chỉ lấy active categories
curl -X GET "http://localhost:8000/api/adult-categories?active_only=true"
```

## Tính năng nổi bật

### 1. Type Safety
- Sử dụng Value Objects để đảm bảo type safety
- Validation ở mọi layer
- Strict typing với `declare(strict_types=1)`

### 2. Clean Architecture
- Dependency inversion principle
- Interface segregation
- Single responsibility principle
- Separation of concerns

### 3. Error Handling
- Comprehensive error handling
- Proper HTTP status codes
- Detailed error messages
- Logging cho debugging

### 4. Performance
- Efficient database queries
- Proper indexing
- Pagination support
- Query optimization

## Mở rộng

Để thêm các tính năng mới như Create, Update, Delete:

1. **Domain Layer**: Thêm methods vào repository interface
2. **Application Layer**: Tạo Command/Query mới
3. **Infrastructure Layer**: Implement methods trong repository
4. **Presenter Layer**: Tạo controllers và routes mới

## Testing

```bash
# Chạy tests
php artisan test

# Test specific feature
php artisan test --filter=AdultCategoryTest
```

## Database Schema

```sql
CREATE TABLE adult_categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(255),
    color VARCHAR(7) DEFAULT '#FF6B6B',
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    film_count BIGINT DEFAULT 0,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    
    INDEX idx_slug (slug),
    INDEX idx_is_active (is_active),
    INDEX idx_sort_order (sort_order)
);
```
