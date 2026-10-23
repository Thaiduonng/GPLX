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

---

## 3. Lược đồ các bảng Tuyển sinh & Hồ sơ điện tử (Admission Tables - V3 Migration)

### Bảng `license_categories` (Danh mục Hạng Giấy phép lái xe)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính hạng GPLX |
| `code` | VARCHAR(20) | UNIQUE, NOT NULL | Mã hạng GPLX (A1, A, B1, B, C1, C,...) |
| `name` | VARCHAR(100) | NOT NULL | Tên đầy đủ của hạng bằng lái xe |
| `description` | TEXT | NULL | Diễn giải quy chuẩn phương tiện được phép điều khiển |
| `min_age` | INT | NOT NULL, DEFAULT 18 | Độ tuổi tối thiểu theo quy định |
| `tuition_fee` | DECIMAL(15,2) | NOT NULL, DEFAULT 0.00 | Mức học phí đào tạo |
| `is_active` | TINYINT(1) | NOT NULL, DEFAULT 1 | Trạng thái mở tiếp nhận hồ sơ |
| `created_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Thời điểm tạo |
| `updated_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE | Thời điểm cập nhật |

### Bảng `applications` (Hồ sơ đăng ký tuyển sinh)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính hồ sơ |
| `application_code`| VARCHAR(50) | UNIQUE, NOT NULL | Mã định danh hồ sơ (`APP-CATEGORY-YYYYMMDD-XXXX`) |
| `user_id` | BIGINT | FK → `users(id)`, NOT NULL | Tài khoản học viên nộp hồ sơ |
| `category_id` | BIGINT | FK → `license_categories(id)`, NOT NULL | Hạng bằng lái xe đăng ký |
| `full_name` | VARCHAR(100) | NOT NULL | Họ và tên học viên |
| `national_id` | VARCHAR(20) | NOT NULL, INDEX | Số thẻ CCCD / CMND |
| `date_of_birth` | DATE | NOT NULL | Ngày tháng năm sinh |
| `gender` | VARCHAR(10) | NOT NULL, DEFAULT 'MALE' | Giới tính (MALE, FEMALE, OTHER) |
| `phone` | VARCHAR(20) | NOT NULL | Số điện thoại liên hệ |
| `email` | VARCHAR(100) | NOT NULL | Địa chỉ thư điện tử |
| `address` | VARCHAR(255) | NOT NULL | Địa chỉ liên lạc thường trú/tạm trú |
| `status` | VARCHAR(30) | NOT NULL, INDEX | Trạng thái hồ sơ (`SUBMITTED`, `UNDER_REVIEW`, `APPROVED`, `REJECTED`, `SUPPLEMENT_REQUIRED`) |
| `rejection_reason`| TEXT | NULL | Lý do từ chối hoặc yêu cầu bổ sung hồ sơ (ADM-002) |
| `reviewed_by` | BIGINT | FK → `users(id)`, NULL | Cán bộ tuyển sinh thực hiện xét duyệt |
| `reviewed_at` | DATETIME | NULL | Thời điểm thẩm định |
| `version` | BIGINT | NOT NULL, DEFAULT 0 | Khóa phiên bản chống Lost Updates (Optimistic Lock) |
| `created_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Ngày nộp hồ sơ |
| `updated_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE | Ngày cập nhật |

### Bảng `application_documents` (Tài liệu số hóa đính kèm)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính tài liệu |
| `application_id` | BIGINT | FK → `applications(id)` ON DELETE CASCADE | Hồ sơ sở hữu tài liệu |
| `document_type` | VARCHAR(50) | NOT NULL | Phân loại (`NATIONAL_ID_FRONT`, `NATIONAL_ID_BACK`, `HEALTH_CERTIFICATE`, `PORTRAIT_PHOTO`, `OTHER`) |
| `file_name` | VARCHAR(255) | NOT NULL | Tên tệp gốc |
| `file_url` | VARCHAR(500) | NOT NULL | Đường dẫn lưu trữ tài liệu |
| `file_size` | BIGINT | NOT NULL | Dung lượng tệp tính bằng byte |
| `mime_type` | VARCHAR(100) | NOT NULL | Định dạng MIME của tệp (image/jpeg, application/pdf,...) |
| `created_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Thời điểm tải lên |

### Bảng `application_status_history` (Nhật ký trạng thái thẩm định)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính bản ghi lịch sử |
| `application_id` | BIGINT | FK → `applications(id)` ON DELETE CASCADE | Hồ sơ được ghi nhận |
| `from_status` | VARCHAR(30) | NULL | Trạng thái nguồn |
| `to_status` | VARCHAR(30) | NOT NULL | Trạng thái đích |
| `note` | TEXT | NULL | Diễn giải, lý do hoặc ghi chú của cán bộ duyệt |
| `changed_by` | BIGINT | FK → `users(id)`, NULL | Người thực hiện thay đổi trạng thái |
| `created_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Thời điểm ghi nhận |
