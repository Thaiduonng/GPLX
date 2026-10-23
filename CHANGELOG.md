# Nhật ký Thay đổi (Changelog)

Toàn bộ các cập nhật quan trọng của dự án sẽ được ghi nhận tại đây theo chuẩn [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.2.0] — 2026-10-23

### Xác thực & Phân quyền (Phase 1 — Identity & Authentication)
- **Cơ sở dữ liệu & Entity:**
  - Bổ sung Flyway migration `V2__seed_initial_roles_permissions.sql` nạp 7 vai trò hệ thống (`ROLE_ADMIN`, `ROLE_MANAGER`, `ROLE_STAFF`, `ROLE_INSTRUCTOR`, `ROLE_EXAMINER`, `ROLE_STUDENT`, `ROLE_COUNSELOR`) và danh mục quyền chuẩn.
  - Xây dựng JPA Entity: `User`, `Role`, `Permission`, enum `RoleType`.
  - Xây dựng JPA Repository: `UserRepository`, `RoleRepository`, `PermissionRepository`.
- **Bảo mật & JWT (Spring Security 7):**
  - Tích hợp thư viện JJWT 0.12.6 (`jjwt-api`, `jjwt-impl`, `jjwt-jackson`).
  - Triển khai `JwtService` tạo, ký HMAC-SHA256 và xác thực token JWT stateless.
  - Triển khai `CustomUserDetailsService` và `UserPrincipal` hỗ trợ đăng nhập bằng username hoặc email.
  - Triển khai `JwtAuthenticationFilter` tự động trích xuất token từ Authorization header.
  - Cấu hình `JwtAuthenticationEntryPoint` trả về JSON lỗi 401 Unauthorized chuẩn hóa.
  - Cập nhật `SecurityConfig` Lambda DSL, bảo vệ các endpoint nghiệp vụ và phân quyền Method Security.
- **REST API:**
  - `POST /api/v1/auth/register`: Đăng ký tài khoản người dùng kèm validation, kiểm tra trùng lặp và mã hóa BCrypt.
  - `POST /api/v1/auth/login`: Xác thực tài khoản và phát hành JWT token.
  - `GET /api/v1/auth/me`: Trả về thông tin chi tiết tài khoản hiện tại từ token.
- **Frontend (React 19 + TypeScript):**
  - Xây dựng `AuthContext` và hook `useAuth` quản lý trạng thái đăng nhập toàn cục.
  - Cập nhật `apiClient` Axios tự động gắn token `Bearer` và điều hướng khi token hết hạn.
  - Xây dựng trang Đăng nhập (`LoginPage.tsx`) và Đăng ký (`RegisterPage.tsx`) có validation và giao diện tiếng Việt.
  - Cập nhật `MainLayout.tsx` hiển thị thông tin người dùng đang đăng nhập và nút Đăng xuất.
- **Kiểm thử:**
  - 15 test cases (Unit tests `AuthServiceTest`, Integration tests `AuthControllerTest`, `HealthControllerTest`, `GplxApplicationTests`) đạt kết quả 100% Passed.

## [0.1.0] — 2026-10-22

### Khởi tạo Khung Dự án (Phase 0 — Foundation)
- **Kiến trúc & Quy tắc:**
  - Tạo `AGENTS.md` chỉ dẫn hoạt động nghiêm ngặt cho AI Coding Agent.
  - Xây dựng trọn bộ 14 file Rule trong `.rules/` bao gồm tiêu chuẩn công nghệ, kiến trúc Modular Monolith, quy ước code, Flyway migrations, REST API, bảo mật Spring Security 7, quy tắc nghiệp vụ, tuân thủ pháp lý GPLX, frontend conventions, testing và tiêu chuẩn hoàn thành (DoD).
- **Tài liệu Kỹ thuật:**
  - Xây dựng 13 file tài liệu trong `docs/` bao gồm kiến trúc hệ thống, ranh giới module, thiết kế database, an ninh, use cases, yêu cầu chức năng/phi chức năng, sổ đăng ký pháp lý (`legal-register.md`), quy trình rà soát pháp luật, chiến lược kiểm thử, hướng dẫn triển khai và lộ trình backlog (`roadmap.md`, `tasks.md`).
- **Backend (Spring Boot 4.1.1 & Java 21):**
  - Cấu hình `pom.xml` với Spring Boot 4.1.1, Jakarta EE 11, Hibernate, Spring Security 7, Flyway Core & MySQL, OpenAPI Swagger UI (`springdoc-openapi` 3.1.1).
  - Triển khai `GplxApplication.java`, `SecurityConfig.java`, `WebConfig.java`, `OpenApiConfig.java`.
  - Triển khai các thành phần dùng chung: `BaseEntity.java`, `ApiResponse.java`, `ErrorResponse.java`, `GlobalExceptionHandler.java`.
  - Phân tách cấu trúc 10 package module độc lập: `identity`, `admission`, `learning`, `training`, `examination`, `crm`, `finance`, `fleet`, `notification`, `reporting`.
  - Xây dựng `HealthController.java` (`GET /api/v1/health`) và unit/integration tests với JUnit 5 MockMvc.
  - Viết migration ban đầu `V1__create_identity_tables.sql` cho các bảng `users`, `roles`, `permissions`, `user_roles`, `role_permissions`.
- **Frontend (React 19 + TypeScript + Vite):**
  - Thiết lập dự án React 19, TypeScript strict mode, Vite, React Router DOM v7.
  - Xây dựng `MainLayout.tsx` chuẩn responsive hỗ trợ tiếng Việt.
  - Xây dựng `HomePage.tsx` tích hợp gọi Health Check API và hiển thị bản đồ các module nghiệp vụ.
  - Xây dựng Axios client wrapper và type definitions `ApiResponse<T>`, `HealthStatus`.
- **DevOps & Môi trường:**
  - Thiết lập `docker-compose.yml` v2 đồng bộ MySQL 8.4 LTS, Backend và Frontend.
  - Viết `backend.Dockerfile` đa tầng (multi-stage) và `frontend.Dockerfile`.
  - Cung cấp `.env.example`, `.gitignore`, `.editorconfig`, `.gitattributes`, `README.md`.
