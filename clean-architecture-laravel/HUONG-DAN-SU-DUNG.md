# 🎯 Hướng Dẫn Sử Dụng Database Backup

## 📋 Tổng Quan
Hệ thống backup đơn giản cho database phim 18+ với khả năng rollback an toàn.

## ⚙️ Cấu Hình

### 1. Tạo file .env (nếu chưa có)
```env
DB_HOST=your_server_ip
DB_PORT=3306
DB_DATABASE=homwork
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 2. Kiểm tra kết nối
```bash
# Linux/Mac
./backup.sh status

# Windows
backup.bat status
```

## 🚀 Sử Dụng

### **Tạo Backup**
```bash
# Linux/Mac
./backup.sh backup

# Windows
backup.bat backup
```
**Kết quả:** File backup được lưu trong `database/backups/backup_YYYYMMDD_HHMMSS.sql`

### **Rollback Database**
```bash
# Linux/Mac
./backup.sh rollback

# Windows
backup.bat rollback
```
**Quy trình:**
1. Hiển thị danh sách backup có sẵn
2. Chọn số thứ tự backup muốn restore
3. Xác nhận "y" để tiếp tục
4. Database được khôi phục

### **Kiểm Tra Trạng Thái**
```bash
# Linux/Mac
./backup.sh status

# Windows
backup.bat status
```
**Hiển thị:**
- Thông tin kết nối database
- Trạng thái kết nối (OK/Failed)
- Số lượng backup files

## 📁 Cấu Trúc Files

```
clean-architecture-laravel/
├── backup.sh              # Script Linux/Mac
├── backup.bat             # Script Windows
├── .env                   # Cấu hình database
├── database/
│   └── backups/          # Thư mục lưu backup
│       ├── backup_20240115_120000.sql
│       ├── backup_20240115_130000.sql
│       └── ...
└── HUONG-DAN-SU-DUNG.md   # File này
```

## 🔄 Quy Trình Phát Triển

### **Trước khi thay đổi:**
```bash
./backup.sh backup
```

### **Sau khi thay đổi, nếu có lỗi:**
```bash
./backup.sh rollback
```

### **Kiểm tra định kỳ:**
```bash
./backup.sh status
```

## ⚠️ Lưu Ý Quan Trọng

### **An Toàn:**
- ✅ Luôn tạo backup trước khi thay đổi
- ✅ Kiểm tra kết nối trước khi backup
- ✅ Xác nhận trước khi rollback
- ✅ Giữ nhiều version backup

### **Troubleshooting:**
```bash
# Lỗi kết nối database
# → Kiểm tra .env file
# → Kiểm tra server database

# Lỗi backup
# → Kiểm tra quyền ghi file
# → Kiểm tra dung lượng ổ cứng

# Lỗi rollback
# → Kiểm tra file backup có tồn tại
# → Kiểm tra quyền database
```

## 🎯 Ví Dụ Thực Tế

### **Scenario 1: Phát triển bình thường**
```bash
# 1. Tạo backup trước khi code
./backup.sh backup
# → backup_20240115_120000.sql

# 2. Code, test, deploy...
# 3. Mọi thứ OK, tiếp tục
```

### **Scenario 2: Có lỗi cần rollback**
```bash
# 1. Phát hiện lỗi
# 2. Rollback về trạng thái trước
./backup.sh rollback
# → Chọn backup_20240115_120000.sql
# → Xác nhận "y"
# → Database được khôi phục
```

### **Scenario 3: Kiểm tra định kỳ**
```bash
# Kiểm tra mọi thứ OK
./backup.sh status
# → Database: homwork@192.168.1.100:3306
# → Connection OK
# → Backups: 5 files
```

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra file `.env` có đúng không
2. Kiểm tra kết nối database: `./backup.sh status`
3. Kiểm tra file backup có tồn tại trong `database/backups/`
4. Thử rollback về backup gần nhất

---
**🎯 Chỉ cần nhớ 3 lệnh: `backup`, `rollback`, `status`!**
