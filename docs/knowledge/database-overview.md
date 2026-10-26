# Tổng Quan Cơ Sở Dữ Liệu (Database Overview)
`docs/knowledge/database-overview.md`

Tài liệu này cung cấp toàn cảnh kiến trúc quản trị dữ liệu, quy chuẩn cấu hình, quy ước thiết kế và nguyên tắc an toàn dữ liệu của hệ thống GPLX Training System.

---

## 1. Thông Tin Cơ Bản

- **Hệ quản trị CSDL (DBMS):** MySQL 8.4 LTS Server
- **Tên cơ sở dữ liệu mặc định:** `gplx_db`
- **Bộ mã ký tự (Character Set):** `utf8mb4` (Hỗ trợ đầy đủ tiếng Việt và ký tự Unicode mở rộng)
- **Quy tắc sắp xếp (Collation):** `utf8mb4_unicode_ci`
- **Múi giờ lưu trữ (Storage Timezone):** UTC (`+00:00`)
- **Engine lưu trữ mặc định:** `InnoDB` (ACID Compliant, Row-level locking)
- **Mức cô lập giao dịch (Transaction Isolation Level):** `REPEATABLE_READ`

---

## 2. Cách Khởi Tạo & Quản Lý Migration

### 2.1. Khởi tạo Cơ sở dữ liệu tự động
Database được khởi tạo thông qua dịch vụ `mysql` trong `docker-compose.yml`:
- Môi trường: Biến cấu hình `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD` được nạp từ file `.env`.
- Volume lưu trữ bền vững: Docker Named Volume `gplx_mysql_data` mount vào thư mục `/var/lib/mysql` trong container. Dữ liệu không bị mất khi container khởi động lại hoặc recreate.

### 2.2. Cơ chế thực thi Flyway Migration tự động
- Công cụ: **Flyway 12.4.0**
- Thư mục chứa script: `backend/src/main/resources/db/migration/`
- Cơ chế thực thi: Lớp cấu hình `vn.edu.gplx.config.FlywayConfig` được cấu hình để tự động chạy phương thức `repair()` và `migrate()` ngay khi DataSource sẵn sàng, **trước khi** Hibernate JPA EntityManagerFactory thực hiện Schema Validation.
- Bảng lịch sử di trú: `flyway_schema_history` lưu vết từng phiên bản script, checksum, thời gian thực thi và trạng thái thành công.

---

## 3. Cấu Hình Kết Nối & Connection Pool

Spring Boot sử dụng **HikariCP** làm connection pool mặc định với các tham số tối ưu:

```yaml
spring:
  datasource:
    url: jdbc:mysql://${DB_HOST:localhost}:${DB_PORT:3306}/${DB_NAME:gplx_db}?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&characterEncoding=UTF-8
    username: ${DB_USERNAME:gplx_user}
    password: ${DB_PASSWORD:dev_password_only}
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
```

> [!CAUTION]
> Tuyệt đối không ghi mật khẩu thật hoặc credentials sản xuất vào tài liệu markdown, mã nguồn git hoặc file `.env.example`.

---

## 4. Quy Ước Đặt Tên (Naming Conventions)

1. **Bảng (Tables):**
   - Dạng chữ thường, số nhiều, dùng dấu gạch dưới (snake_case, plural): `users`, `roles`, `applications`, `fee_invoices`, `training_schedules`.
   - Bảng liên kết nhiều-nhiều (Join Tables): Kết hợp tên 2 bảng liên kết: `user_roles`, `role_permissions`, `class_enrollments`.
2. **Cột (Columns):**
   - Dạng chữ thường, snake_case: `user_id`, `created_at`, `inspection_expiry_date`, `is_active`.
   - Khóa chính (Primary Key): Luôn đặt tên là `id` kiểu `BIGINT AUTO_INCREMENT`.
   - Khóa ngoại (Foreign Key): Tên bảng đơn số + `_id`: `user_id`, `category_id`, `vehicle_id`.
   - Cột boolean: Tiền tố `is_` hoặc `has_`: `is_active`, `is_read`, `is_passed`.
3. **Chỉ mục & Ràng buộc (Indexes & Constraints):**
   - Khóa ngoại: `fk_{tên_bảng}_{tên_bảng_cha}` (VD: `fk_applications_user`).
   - Ràng buộc duy nhất: `uk_{tên_bảng}_{tên_cột}` (VD: `uk_users_email`, `uk_applications_code`).
   - Chỉ mục tìm kiếm: `idx_{tên_bảng}_{tên_cột}` (VD: `idx_applications_status`, `idx_audit_logs_action`).

---

## 5. Quy Chuẩn Audit Fields & Toàn Vẹn Dữ Liệu

1. **Cột Audit bắt buộc (`BaseEntity`):**
   Mọi bảng dữ liệu nghiệp vụ chuẩn bắt buộc phải có 2 trường:
   - `created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP`: Ghi nhận thời điểm tạo bản ghi.
   - `updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`: Tự động cập nhật thời điểm sửa đổi.
2. **Khóa chống Lost Update (Optimistic Locking):**
   Các bảng có khả năng tranh chấp xét duyệt đồng thời (như `applications`) sử dụng cột `version BIGINT NOT NULL DEFAULT 0` gắn annotation JPA `@Version`.
3. **Ràng buộc toàn vẹn quan hệ (Referential Integrity):**
   - Nghiêm cấm `ON DELETE CASCADE` trên các thực thể cha mang tính cốt lõi (User, LicenseCategory). Sử dụng `ON DELETE RESTRICT` để ngăn chặn việc xóa nhầm người dùng đang có hồ sơ hoặc điểm thi.
   - Các bảng phụ thuộc hoàn toàn (như `application_documents`, `theory_answers`) được áp dụng `ON DELETE CASCADE` khi hồ sơ hoặc câu hỏi cha bị xóa.
   - Các trường tham chiếu người xét duyệt (`reviewed_by`, `cashier_id`, `changed_by`) sử dụng `ON DELETE SET NULL` để lưu vết lịch sử kể cả khi tài khoản nhân viên đó bị vô hiệu hóa.

---

## 6. Quy Tắc Giao Dịch (Transaction Rules)

- Mọi thao tác ghi dữ liệu (Create, Update, Delete) ở tầng Service phải được bao bọc bởi `@Transactional(rollbackFor = Exception.class)`.
- Các thao tác đọc dữ liệu sử dụng `@Transactional(readOnly = true)` để tối ưu hóa hiệu năng Hibernate Session và không tạo dirty checking lock.
- Với các quy trình nghiệp vụ phức tạp gồm nhiều bước (như duyệt hồ sơ kiêm phát sinh hóa đơn học phí), giao dịch phải tuân thủ tính nguyên tử (Atomicity): nếu phát sinh hóa đơn thất bại thì trạng thái hồ sơ phải rollback về trạng thái trước đó.

---

## 7. Quy Tắc Bảo Toàn Lịch Sử & Tính Bất Biến

1. **Nhật ký kiểm toán (`audit_logs`):**
   - Bất biến tuyệt đối. Không có API cập nhật hay xóa audit log.
   - Ghi nhận đầy đủ: `user_id`, `username`, `action`, `resource_type`, `resource_id`, `details`, `ip_address`, `created_at`.
2. **Biên lai học phí (`payment_receipts`):**
   - Lưu trữ vĩnh viễn không được xóa.
   - Bắt buộc kiểm tra `idempotency_key` duy nhất để ngăn ngừa việc hệ thống thanh toán hoặc người dùng ấn nút 2 lần gây ghi nhận kép.
3. **Kết quả sát hạch (`exam_results`):**
   - Khi kỳ thi đã kết thúc và được Sát hạch viên / Quản lý ký khóa sổ (`LOCKED`), điểm số và kết luận đỗ/trượt là bất biến. Mọi trường hợp điều chỉnh phải thông qua biên bản phúc khảo và ghi vết audit log đặc biệt.

---

## 8. Phương Án Sao Lưu & Khôi Phục Dữ Liệu (Backup & Recovery)

### Sao lưu dự phòng (Backup):
Sử dụng công cụ chính thống `mysqldump` để sao lưu toàn bộ cấu trúc và dữ liệu ra file nén `.sql`:
```powershell
docker exec gplx-mysql mysqldump -u root -p${DB_ROOT_PASSWORD} --single-transaction --routines --triggers gplx_db > backup_gplx_$(Get-Date -Format "yyyyMMdd_HHmmss").sql
```

### Khôi phục dữ liệu (Restore):
```powershell
docker exec -i gplx-mysql mysql -u root -p${DB_ROOT_PASSWORD} gplx_db < backup_file.sql
```
