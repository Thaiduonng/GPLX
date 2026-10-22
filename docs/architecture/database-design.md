# Thiết kế Cơ sở dữ liệu và Lược đồ Bảng

## 1. Chuẩn hóa thiết kế

- **Hệ quản trị CSDL:** MySQL 8.4 LTS
- **Charset & Collation:** `utf8mb4` / `utf8mb4_unicode_ci`
- **Múi giờ lưu trữ:** UTC
- **Quy tắc audit:** Mọi bảng đều có `created_at` (DATETIME) và `updated_at` (DATETIME ON UPDATE).

## 2. Lược đồ các bảng nền tảng (Foundation Tables - V1 Migration)

### Bảng `users` (Tài khoản người dùng)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Định danh duy nhất của tài khoản |
| `username` | VARCHAR(50) | UNIQUE, NOT NULL | Tên đăng nhập |
| `email` | VARCHAR(100) | UNIQUE, NOT NULL | Địa chỉ thư điện tử |
| `password_hash` | VARCHAR(255) | NOT NULL | Mật khẩu đã hash bằng BCrypt |
| `full_name` | VARCHAR(100) | NOT NULL | Họ và tên đầy đủ |
| `phone` | VARCHAR(20) | NULL | Số điện thoại liên hệ |
| `is_active` | TINYINT(1) | NOT NULL, DEFAULT 1 | Trạng thái hoạt động (1: Active, 0: Locked) |
| `created_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Thời điểm tạo tài khoản |
| `updated_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE | Thời điểm cập nhật cuối |

### Bảng `roles` (Vai trò)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính vai trò |
| `name` | VARCHAR(50) | UNIQUE, NOT NULL | Tên vai trò (ROLE_ADMIN, ROLE_STUDENT,...) |
| `description` | VARCHAR(255) | NULL | Mô tả quyền hạn của vai trò |
| `created_at` | DATETIME | NOT NULL | Thời điểm tạo |
| `updated_at` | DATETIME | NOT NULL | Thời điểm cập nhật |

### Bảng `permissions` (Quyền hạn chi tiết)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính quyền |
| `name` | VARCHAR(100) | UNIQUE, NOT NULL | Tên quyền (VD: `admission:review`, `exam:grade`) |
| `description` | VARCHAR(255) | NULL | Diễn giải quyền |
| `module` | VARCHAR(50) | NOT NULL | Module sở hữu quyền |
| `created_at` | DATETIME | NOT NULL | Thời điểm tạo |

### Bảng liên kết `user_roles` và `role_permissions`
- `user_roles`: Khóa chính kết hợp `(user_id, role_id)`, Foreign Key đến `users(id)` và `roles(id)` với hành vi `ON DELETE CASCADE`.
- `role_permissions`: Khóa chính kết hợp `(role_id, permission_id)`, Foreign Key đến `roles(id)` và `permissions(id)` với hành vi `ON DELETE CASCADE`.
