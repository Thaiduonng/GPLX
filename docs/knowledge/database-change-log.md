# Nhật Ký Thay Đổi Cơ Sở Dữ Liệu (Database Change Log)
`docs/knowledge/database-change-log.md`

Tài liệu này lưu vết toàn bộ lịch sử các phiên bản migration Flyway được áp dụng trên cơ sở dữ liệu `gplx_db` của dự án GPLX Training System.

---

## Bảng Tổng Hợp Lịch Sử Migration (Flyway Schema History)

| Phiên Bản | Tên File Script Migration | Ngày Áp Dụng | Trạng Thái | Mô Tả & Thay Đổi Cấu Trúc |
| :--- | :--- | :--- | :--- | :--- |
| **`V1`** | `V1__create_identity_tables.sql` | 2026-10-22 | `SUCCESS` | Khởi tạo 5 bảng nền tảng phân hệ Identity: `users`, `roles`, `permissions`, `user_roles`, `role_permissions`. |
| **`V2`** | `V2__seed_initial_roles_permissions.sql` | 2026-10-22 | `SUCCESS` | Nạp dữ liệu khởi tạo 7 vai trò chuẩn và 11 quyền hạn nghiệp vụ cốt lõi; gán full quyền cho `ROLE_ADMIN`. |
| **`V3`** | `V3__create_admission_tables.sql` | 2026-10-23 | `SUCCESS` | Khởi tạo 4 bảng tuyển sinh: `license_categories`, `applications`, `application_documents`, `application_status_history`. Nạp dữ liệu mẫu các hạng bằng lái A1, A, B1, B, C1, C. |
| **`V4`** | `V4__create_learning_and_training_tables.sql` | 2026-10-24 | `SUCCESS` | Khởi tạo 10 bảng phân hệ đào tạo & e-learning: `courses`, `course_lessons`, `learning_progress`, `theory_questions`, `theory_answers`, `training_classes`, `class_enrollments`, `training_schedules`, `attendance_records`, `dat_practice_sessions`. |
| **`V5`** | `V5__create_examination_tables.sql` | 2026-10-25 | `SUCCESS` | Khởi tạo 3 bảng sát hạch: `exam_sessions`, `exam_candidates`, `exam_results`. Quản lý quy trình thi lý thuyết, sa hình, đường trường và khóa sổ kết quả. |
| **`V6`** | `V6__create_support_modules_tables.sql` | 2026-10-25 | `SUCCESS` | Khởi tạo 6 bảng hỗ trợ: `fee_invoices`, `payment_receipts` (có idempotency_key), `vehicles`, `vehicle_maintenances`, `notifications`, `crm_leads`. Nạp dữ liệu đội xe tập lái mẫu. |
| **`V7`** | `V7__create_reporting_and_audit_tables.sql` | 2026-10-26 | `SUCCESS` | Khởi tạo bảng nhật ký kiểm toán bất biến `audit_logs` và nạp bản ghi kiểm toán khởi tạo hệ thống ban đầu (sửa khóa ngoại `user_id = NULL` để bảo đảm tính toàn vẹn khi chưa có dữ liệu người dùng). |
| **`V8`** | `V8__add_updated_at_to_permissions.sql` | 2026-10-26 | `SUCCESS` | Bổ sung cột `updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` vào hai bảng `permissions` và `vehicle_maintenances` để chuẩn hóa 100% với lớp trừu tượng `BaseEntity.java` và đáp ứng tiêu chuẩn Hibernate Schema Validation. |

---

## Chi Tiết Kỹ Thuật Từng Bản Nâng Cấp

### Phiên bản V7 (Hotfix Khóa Ngoại Audit Seed)
- **Vấn đề phát hiện:** Khi triển khai môi trường Docker mới với cơ sở dữ liệu trống, script `V7` thực hiện `INSERT INTO audit_logs (user_id, username, ...) VALUES (1, 'admin', ...)` gây lỗi vi phạm khóa ngoại MySQL `Error Code: 1452: Cannot add or update a child row: a foreign key constraint fails` do bảng `users` chưa có bản ghi mang `id = 1`.
- **Giải pháp áp dụng:** Cập nhật script `V7` chuyển giá trị `user_id` thành `NULL` cho các bản ghi seed khởi tạo hệ thống, giữ nguyên `username = 'admin'`, tương thích hoàn hảo với định nghĩa cột `user_id BIGINT NULL` và ràng buộc `ON DELETE SET NULL`.

### Phiên bản V8 (Chuẩn Hóa Audit Fields Với BaseEntity)
- **Vấn đề phát hiện:** Lớp JPA Entity `Permission.java` và `VehicleMaintenance.java` kế thừa từ `BaseEntity.java` (trong đó khai báo thuộc tính bắt buộc `updatedAt` ánh xạ cột `updated_at`). Tuy nhiên, bảng `permissions` (từ `V1`) và bảng `vehicle_maintenances` (từ `V6`) chỉ khai báo cột `created_at` mà thiếu cột `updated_at`, dẫn đến Hibernate ném ngoại lệ `SchemaManagementException: Schema validation: missing column [updated_at]`.
- **Giải pháp áp dụng:** Tạo migration `V8__add_updated_at_to_permissions.sql` bổ sung cột `updated_at` cho cả 2 bảng, đảm bảo quy chuẩn audit fields đồng bộ 100% trên toàn bộ các thực thể kế thừa `BaseEntity`.
