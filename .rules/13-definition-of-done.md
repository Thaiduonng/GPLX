# Rule 13 — Tiêu chuẩn Hoàn thành (Definition of Done - DoD)

Một task hoặc một tính năng chỉ được phép chuyển trạng thái sang `DONE` khi thỏa mãn đồng thời tất cả các tiêu chí sau:

## 1. Tiêu chuẩn Mã nguồn & Nghiệp vụ
- [ ] Thỏa mãn đầy đủ các tiêu chí chấp nhận (Acceptance Criteria) được định nghĩa trong backlog.
- [ ] Mã nguồn tuân thủ toàn bộ các quy chuẩn đặt tên, clean code trong `.rules/03-coding-conventions.md`.
- [ ] Phân tầng rõ ràng: Controller chỉ điều phối, Service xử lý business logic, DTO tách biệt với JPA Entity.
- [ ] Dữ liệu đầu vào được kiểm tra nghiêm ngặt (Bean Validation) ở Backend; không tin tưởng dữ liệu từ client.
- [ ] Quyền truy cập được bảo vệ chặt chẽ qua Spring Security (RBAC và Resource Ownership).

## 2. Tiêu chuẩn Cơ sở dữ liệu & Migration
- [ ] Mọi thay đổi schema đều có file Flyway migration tương ứng đặt tên đúng quy ước.
- [ ] Migration chạy thành công trên database sạch từ đầu mà không gặp lỗi ràng buộc.
- [ ] Không chỉnh sửa các file migration lịch sử đã chạy.

## 3. Tiêu chuẩn Kiểm thử & Build
- [ ] Viết đầy đủ Unit Test và Integration Test cho các ca nghiệp vụ chính và các ca biên (edge cases).
- [ ] Tất cả các test cases đều chạy thành công (`BUILD SUCCESS`).
- [ ] Không có lỗi nghiêm trọng đã biết mà bị che giấu hoặc bỏ qua.

## 4. Tiêu chuẩn Tài liệu & Pháp lý
- [ ] Cập nhật tài liệu API (OpenAPI annotations hiển thị đầy đủ trên Swagger UI).
- [ ] Các quy tắc pháp lý liên quan có nguồn xác minh rõ ràng; nếu chưa xác minh thì để cấu hình linh hoạt.
- [ ] Cập nhật trạng thái trong `docs/backlog/tasks.md` và ghi nhận thay đổi trong `CHANGELOG.md`.
- [ ] Tuyệt đối không để lộ mật khẩu, API key hay secret trong git commit.
