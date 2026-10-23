# Bảng Quản trị Công việc (Task Backlog)

## Quy ước Trạng thái:
- `TODO`: Chưa bắt đầu
- `IN_PROGRESS`: Đang tiến hành
- `DONE`: Đã hoàn thành (đạt chuẩn DoD)
- `BLOCKED`: Đang bị nghẽn

---

## Danh mục Tasks — Phase 0: Foundation

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P0-01`** | Khảo sát workspace và tương thích công nghệ | Không | `DONE` | Xác nhận tính tương thích Java 21, Spring Boot 4.1.1, MySQL 8.4, React 19 |
| **`TSK-P0-02`** | Xây dựng AGENTS.md và Bộ Rule `.rules/` | TSK-P0-01 | `DONE` | Đầy đủ AGENTS.md và 14 file rule từ 00 đến 13 |
| **`TSK-P0-03`** | Xây dựng Bộ Tài liệu Kiến trúc, Yêu cầu, Pháp lý | TSK-P0-02 | `DONE` | Đầy đủ 13 file tài liệu trong thư mục `docs/` |
| **`TSK-P0-04`** | Khởi tạo Khung Backend Modular Monolith | TSK-P0-01 | `DONE` | `pom.xml`, GplxApplication, cấu hình Security, Web, OpenApi, Shared, Module packages |
| **`TSK-P0-05`** | Thiết lập Cơ sở dữ liệu và Flyway Migration V1 | TSK-P0-04 | `DONE` | File `V1__create_identity_tables.sql` tạo bảng users, roles, permissions |
| **`TSK-P0-06`** | Khởi tạo Khung Frontend React + TypeScript + Vite | TSK-P0-01 | `DONE` | `package.json`, `tsconfig.json`, `vite.config.ts`, MainLayout, HomePage, API Client |
| **`TSK-P0-07`** | Cấu hình DevOps Docker Compose & Môi trường | TSK-P0-04, 06 | `DONE` | `docker-compose.yml`, Dockerfiles, `.env.example`, `.gitignore`, `.editorconfig` |
| **`TSK-P0-08`** | Xây dựng Healthcheck Endpoint & Test cơ bản | TSK-P0-04 | `DONE` | Controller `/api/v1/health` và các test case JUnit 5 tương ứng |
| **`TSK-P0-09`** | Hoàn thiện README & Báo cáo Khởi tạo | TSK-P0-08 | `DONE` | File `README.md`, `CHANGELOG.md` và tài liệu hướng dẫn khởi chạy |

---

## Danh mục Tasks — Phase 1: Identity & Authentication

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P1-01`** | Thiết kế Entity và Repository cho Identity | TSK-P0-05 | `DONE` | User, Role, Permission entities khớp với Flyway V1 schema |
| **`TSK-P1-02`** | Triển khai API Đăng ký tài khoản (`/auth/register`) | TSK-P1-01 | `DONE` | Mã hóa BCrypt, kiểm tra trùng email/username, validation DTO |
| **`TSK-P1-03`** | Triển khai API Đăng nhập và Xác thực (`/auth/login`) | TSK-P1-02 | `DONE` | Xác thực Spring Security 7 JWT, trả token, xử lý lỗi đăng nhập sai |
| **`TSK-P1-04`** | Triển khai Phân quyền RBAC và Method Security | TSK-P1-03 | `DONE` | `@PreAuthorize` hoạt động chính xác theo từng role, CustomUserDetailsService |
| **`TSK-P1-05`** | Xây dựng Giao diện Đăng nhập và Đăng ký Frontend | TSK-P1-03 | `DONE` | Form validation React, kết nối API backend, lưu token an toàn, AuthContext |

---

## Danh mục Tasks — Phase 2: Admission (Kế hoạch tiếp theo)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P2-01`** | CSDL & Entity Danh mục Hạng GPLX (`license_categories`) | TSK-P1-01 | `TODO` | Flyway V3, Category entity (A1, A, B1, B, C1, C,... cấu hình động) |
| **`TSK-P2-02`** | CSDL & Entity Hồ sơ Tuyển sinh (`applications`, `documents`) | TSK-P2-01 | `TODO` | Flyway V3, Application entity, trạng thái hồ sơ (ADM-001) |
| **`TSK-P2-03`** | API Nộp hồ sơ tuyển sinh điện tử (`/applications/submit`) | TSK-P2-02 | `TODO` | DTO validation, kiểm tra điều kiện hồ sơ, upload tài liệu CCCD/sức khỏe |
| **`TSK-P2-04`** | API Thẩm định & Phê duyệt hồ sơ (`/applications/{id}/review`) | TSK-P2-03 | `TODO` | Duyệt/từ chối/yêu cầu bổ sung kèm lý do (ADM-002, ADM-003), RBAC STAFF/ADMIN |
| **`TSK-P2-05`** | Giao diện Đăng ký khóa học & Nộp hồ sơ Frontend | TSK-P2-03 | `TODO` | Form nộp hồ sơ, chọn hạng bằng lái, upload tài liệu, tra cứu trạng thái |
