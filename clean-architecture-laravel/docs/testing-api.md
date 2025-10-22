# Testing Adult Categories API

## Lỗi đã được sửa

✅ **DirectoryNotFoundException** - Đã sửa lỗi trong `app/Presenter/Http/Routes/api.php`:
- Thêm kiểm tra `is_dir()` trước khi load routes
- Di chuyển routes adult-categories vào file chính
- Đăng ký Service Provider trong `config/app.php`

## Cách test API

### 1. Chạy Migration
```bash
php artisan migrate
```

### 2. Seed dữ liệu test
```bash
php artisan tinker
```

Trong tinker:
```php
use App\Infrastructure\Database\AdultCategory\AdultCategoryModel;

// Tạo dữ liệu test
AdultCategoryModel::factory()->count(10)->create();
AdultCategoryModel::factory()->active()->count(5)->create();
AdultCategoryModel::factory()->inactive()->count(3)->create();
```

### 3. Test API endpoints

#### Lấy tất cả categories
```bash
curl -X GET "http://localhost:8000/api/adult-categories"
```

#### Lấy categories với pagination
```bash
curl -X GET "http://localhost:8000/api/adult-categories?page=1&per_page=5"
```

#### Chỉ lấy active categories
```bash
curl -X GET "http://localhost:8000/api/adult-categories?active_only=true"
```

#### Test validation errors
```bash
# Invalid page
curl -X GET "http://localhost:8000/api/adult-categories?page=0"

# Invalid per_page
curl -X GET "http://localhost:8000/api/adult-categories?per_page=101"

# Invalid active_only
curl -X GET "http://localhost:8000/api/adult-categories?active_only=invalid"
```

### 4. Chạy tests
```bash
php artisan test --filter=AdultCategoryTest
```

## Response Format

### Success Response
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
                "film_count": 10,
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

### Error Response
```json
{
    "status": "error",
    "message": "Validation failed",
    "errors": {
        "page": ["Page must be at least 1"]
    }
}
```

## Troubleshooting

### Nếu vẫn gặp lỗi DirectoryNotFoundException:

1. **Kiểm tra cấu trúc thư mục:**
```bash
ls -la app/Presenter/Http/Routes/
ls -la app/Presenter/Http/Routes/v1/
```

2. **Clear cache:**
```bash
php artisan config:clear
php artisan route:clear
php artisan cache:clear
```

3. **Kiểm tra RouteServiceProvider:**
```bash
php artisan route:list
```

### Nếu gặp lỗi Service Provider:

1. **Kiểm tra config/app.php:**
```php
'providers' => [
    // ...
    App\Presenter\Providers\AdultCategoryServiceProvider::class,
],
```

2. **Kiểm tra namespace:**
```bash
php artisan config:cache
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/adult-categories` | Lấy danh sách adult categories |
| GET | `/api/adult-categories?page=1` | Pagination |
| GET | `/api/adult-categories?per_page=10` | Số items per page |
| GET | `/api/adult-categories?active_only=true` | Chỉ lấy active categories |

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Số trang |
| `per_page` | integer | 15 | Số items per page (max: 100) |
| `active_only` | boolean | false | Chỉ lấy active categories |

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 422 | Validation Error |
| 404 | Not Found |
| 500 | Internal Server Error |
