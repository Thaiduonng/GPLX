# AGENTS.md — Hướng dẫn cho AI Coding Agent

## 1. Tổng quan dự án

- **Tên dự án:** Hệ thống học, đào tạo và tiếp nhận hồ sơ thi cấp giấy phép lái xe các hạng (GPLX Training System).
- **Tính chất:** Đồ án tốt nghiệp đại học ngành Công nghệ Thông tin / Kỹ thuật Phần mềm.
- **Mô hình kiến trúc:** Modular Monolith (Java 21, Spring Boot 4.1.1, React 19 + TypeScript + Vite, MySQL 8.4 LTS, Docker Compose).
- **Mục tiêu cốt lõi:** Quản lý quy trình đào tạo lái xe, tiếp nhận hồ sơ điện tử, quản lý lớp/lịch học/thực hành, điều kiện dự thi và kết quả sát hạch với tiêu chí đúng đắn, an toàn, bảo mật và truy vết cao.

## 2. Nguồn quy tắc phát triển bắt buộc

- Thư mục `.rules/` là nguồn sự thật (single source of truth) duy nhất quy định mọi tiêu chuẩn kỹ thuật, kiến trúc và nghiệp vụ của dự án.
- Bất kỳ AI Agent nào khi tham gia phát triển đều **BẮT BUỘC** phải đọc và tuân thủ các quy tắc trong `.rules/` trước khi thực hiện thay đổi.
- Bảng danh mục quy tắc:
  - `.rules/00-project-overview.md`: Tổng quan dự án, vai trò, module nghiệp vụ, phạm vi MVP & mở rộng.
  - `.rules/01-technology-stack.md`: Phiên bản công nghệ, quy tắc dependency, tương thích Java 21 & Spring Boot 4.1.1.
  - `.rules/02-architecture.md`: Kiến trúc Modular Monolith, ranh giới module, phân tầng (API, App, Domain, Infra).
  - `.rules/03-coding-conventions.md`: Quy ước đặt tên, dependency injection, logging SLF4J, xử lý ngoại lệ tập trung.
  - `.rules/04-database-and-migrations.md`: Quy chuẩn MySQL 8.4 LTS, Flyway migrations, ràng buộc toàn vẹn, audit fields.
  - `.rules/05-api-conventions.md`: Quy ước RESTful API `/api/v1`, HTTP status codes, DTOs, OpenAPI/Swagger 3.1.1.
  - `.rules/06-security-and-privacy.md`: Spring Security 7, RBAC, hash mật khẩu BCrypt, phòng chống tấn công, bảo vệ dữ liệu cá nhân.
  - `.rules/07-business-rules.md`: Định danh quy tắc nghiệp vụ (ADM, LRN, TRN, EXM, FIN, FLT, NTF), phân loại trạng thái.
  - `.rules/08-legal-compliance.md`: Quy định tuân thủ pháp lý GPLX, phân định 3 trạng thái (`VERIFIED`, `NEEDS_VERIFICATION`, `INTERNAL_RULE`).
  - `.rules/09-frontend-conventions.md`: Kiến trúc React + TypeScript, Vite, cấu trúc thư mục, quản lý trạng thái, validation, tiếng Việt.
  - `.rules/10-testing-and-quality.md`: Chiến lược kiểm thử Unit Test, Integration Test (Spring Boot Test, Testcontainers), tiêu chuẩn coverage.
  - `.rules/11-git-and-workflow.md`: Quy ước Git flow, conventional commit, bảo toàn mã nguồn, bảo mật bí mật.
  - `.rules/12-documentation.md`: Quy chuẩn cập nhật tài liệu đồng bộ cùng mã nguồn.
  - `.rules/13-definition-of-done.md`: Tiêu chuẩn nghiệm thu một task/tính năng (DoD).

## 3. Quy trình thực hiện thay đổi mã nguồn

1. **Khảo sát:** Trước khi can thiệp mã nguồn, phải kiểm tra trạng thái git (`git status`), cấu trúc thư mục và file liên quan.
2. **Đối chiếu Rule:** Đọc file rule liên quan trực tiếp đến nghiệp vụ/kỹ thuật cần thao tác.
3. **Bảo tồn nội dung:** Tuyệt đối không ghi đè, xóa bỏ mã nguồn hoặc chú thích/docstring sẵn có nếu chưa hiểu rõ mục đích.
4. **Không tự ý đổi Stack:** Giữ đúng Java 21, Spring Boot 4.1.1, MySQL 8.4 LTS, React + TypeScript. Không tự ý hạ phiên bản.
5. **Không giả lập kết quả:** Nếu chưa chạy được lệnh build/test do giới hạn môi trường, phải ghi rõ nguyên nhân và trạng thái thực tế; tuyệt đối không bịa đặt kết quả kiểm thử.
6. **Không bịa đặt pháp luật:** Không tự ý đưa ra số giờ đào tạo, cấu trúc đề thi hay điểm đỗ khi chưa có văn bản quy phạm pháp luật xác minh ở trạng thái `VERIFIED`.
7. **Cập nhật tài liệu:** Sau khi code, cập nhật ngay backlog (`docs/backlog/tasks.md`), changelog (`CHANGELOG.md`) và tài liệu kiến trúc tương ứng.
