# Rule 04 — Cơ sở dữ liệu và Quản lý Migration (Flyway)

## 1. Tiêu chuẩn Cơ sở dữ liệu MySQL 8.4 LTS

- **Bảng mã & Collation:** Bắt buộc sử dụng `utf8mb4` và collation `utf8mb4_unicode_ci` cho toàn bộ database, table và text columns để hỗ trợ tiếng Việt đầy đủ.
- **Thời gian (Timezone):** Lưu trữ toàn bộ timestamp/datetime theo chuẩn UTC. Chuyển đổi hiển thị sang GMT+7 tại tầng Application hoặc Frontend.
- **Tiền tệ & Điểm số:** Sử dụng kiểu `DECIMAL(15, 2)` cho mọi cột liên quan đến tiền bạc (học phí, công nợ). Không dùng `FLOAT` hay `DOUBLE`.
- **Khóa chính (Primary Key):** Sử dụng `BIGINT AUTO_INCREMENT` cho khóa chính bảng.
- **Ràng buộc toàn vẹn:**
  - Khai báo đầy đủ Foreign Key (`CONSTRAINT fk_...`) và Unique Constraint (`CONSTRAINT uk_...`).
  - Tạo Index (`INDEX idx_...`) cho các cột thường xuyên tìm kiếm, lọc hoặc join (email, username, status, foreign keys).

## 2. Quy tắc Flyway Migration

- Toàn bộ thay đổi schema cơ sở dữ liệu **PHẢI** được quản lý bằng các file migration của Flyway đặt tại `src/main/resources/db/migration/`.
- **Cấu hình Spring Boot JPA:**
  - `spring.jpa.hibernate.ddl-auto: validate` (môi trường production/staging).
  - Tuyệt đối không sử dụng `ddl-auto: update` hay `create` trên môi trường chia sẻ.
- **Đặt tên file migration:**
  - Định dạng: `V<Version>__<Mô_tả_ngắn_snake_case>.sql` (hai dấu gạch dưới).
  - Ví dụ: `V1__create_identity_tables.sql`, `V2__create_admission_tables.sql`.
- **Bất biến của Migration:**
  - Tuyệt đối không chỉnh sửa file migration đã được merge hoặc chạy trên môi trường khác.
  - Muốn sửa đổi schema, bắt buộc tạo một version migration mới (VD: `V3__alter_users_table.sql`).
- **Lưu trữ dữ liệu nhạy cảm & Lịch sử:**
  - Không bao giờ xóa cứng (hard delete) dữ liệu hồ sơ, kết quả sát hạch hoặc lịch sử giao dịch. Áp dụng soft-delete (`is_active` hoặc `deleted_at`).
  - Không lưu trực tiếp tệp tin nhị phân dung lượng lớn (ảnh hồ sơ, CCCD, video) vào database dưới dạng BLOB. Chỉ lưu metadata và đường dẫn tệp tin.
