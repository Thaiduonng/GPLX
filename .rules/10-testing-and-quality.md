# Rule 10 — Chiến lược Kiểm thử và Đảm bảo Chất lượng

## 1. Nguyên tắc kiểm thử bắt buộc

- Kiểm thử không phải là công việc tùy chọn sau khi hoàn thành code, mà là thành phần bắt buộc của mỗi tính năng (Test-First hoặc Test-Driven nếu phù hợp).
- Không tự ý đánh dấu một task/feature là "Hoàn thành" nếu các test cases tương ứng chưa được viết hoặc chưa chạy thành công.
- Nếu môi trường cục bộ chưa có sẵn công cụ chạy test (ví dụ thiếu tool test container hoặc thiếu mạng), phải ghi rõ nguyên nhân và trạng thái kiểm thử chưa thể xác minh trong báo cáo.

## 2. Các cấp độ kiểm thử Backend

- **Unit Test (JUnit 5 + Mockito):**
  - Tập trung kiểm thử logic nghiệp vụ tại tầng Application Service và Domain rules.
  - Sử dụng Mockito để giả lập (mock) các phụ thuộc ngoại vi như JPA Repository, External Services.
  - Kiểm thử đầy đủ: Happy path (trường hợp thành công), Validation errors (dữ liệu sai), Business exceptions (vi phạm rule).
  - Tỷ lệ bao phủ (Coverage target): Tối thiểu 80% đối với các lớp Service nghiệp vụ trọng yếu.
- **Integration Test (Spring Boot Test + Testcontainers / H2):**
  - Kiểm thử luồng dữ liệu end-to-end từ Controller qua Service xuống Cơ sở dữ liệu.
  - Kiểm tra tính đúng đắn của Flyway migrations trên schema database sạch.
  - Kiểm tra tính hợp lệ của cơ chế phân quyền Spring Security trên từng endpoint.

## 3. Quy ước đặt tên Test Case

- Đặt tên theo chuẩn BDD / Given-When-Then rõ nghĩa:
  - `should_<kết_quả_kỳ_vọng>_when_<điều_kiện_đầu_vào>()`
  - Ví dụ:
    - `should_createApplication_when_validInput()`
    - `should_throwException_when_emailAlreadyRegistered()`
    - `should_denyAccess_when_studentAccessesAdminEndpoint()`
