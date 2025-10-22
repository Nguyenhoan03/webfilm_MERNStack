# 🚀 Quick Start - Database Backup

## ⚡ Cách sử dụng nhanh

### 1. Setup lần đầu
```bash
# Tạo file .env
./setup-env.sh

# Kiểm tra kết nối
./backup.sh status
```

### 2. Sử dụng hàng ngày
```bash
# Tạo backup trước khi code
./backup.sh backup

# Nếu có lỗi, rollback
./backup.sh rollback

# Kiểm tra trạng thái
./backup.sh status
```

## 📋 Commands

| Command | Mô tả |
|---------|-------|
| `./backup.sh backup` | Tạo backup database |
| `./backup.sh rollback` | Khôi phục từ backup |
| `./backup.sh status` | Kiểm tra kết nối |
| `./setup-env.sh` | Tạo file .env |

## 🎯 Chỉ cần nhớ 3 lệnh:
- `backup` - Tạo backup
- `rollback` - Khôi phục
- `status` - Kiểm tra

---
**Xem chi tiết: `HUONG-DAN-SU-DUNG.md`**
