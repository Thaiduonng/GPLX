# Rule 01 — Công nghệ và Tương thích

## 1. Danh mục công nghệ chuẩn hóa

| Thành phần | Phiên bản | Ghi chú & Tương thích |
| :--- | :--- | :--- |
| **Java Platform** | **Java 21 (LTS)** | Baseline bắt buộc, tận dụng Virtual Threads, Pattern Matching |
| **Backend Framework** | **Spring Boot 4.1.1** | Nền tảng Spring Framework 7, Jakarta EE 11 |
| **Security** | **Spring Security 7.x** | Quản lý qua Spring Boot Starter Security, Lambda DSL bắt buộc |
| **ORM / Persistence** | **Hibernate 7.x / Spring Data JPA** | Quản lý qua Spring Boot Starter Data JPA |
| **Database** | **MySQL 8.4 LTS** | Phiên bản Long Term Support mới nhất của MySQL |
| **JDBC Driver** | **`com.mysql:mysql-connector-j`** | Driver chính thức chuẩn (không dùng artifact cũ) |
| **Database Migration** | **Flyway Core + Flyway MySQL** | Quản lý schema database qua file SQL versioned |
| **API Docs / OpenAPI** | **springdoc-openapi 3.1.1** | Hỗ trợ Spring Boot 4.x và OpenAPI 3.1 |
| **Frontend Framework** | **React 19 + TypeScript** | Strict Mode, Function Components, Hooks |
| **Frontend Build Tool** | **Vite** | Tốc độ dev server cực nhanh, cấu hình proxy `/api` |
| **Frontend Routing** | **React Router DOM v7** | Định tuyến SPA mượt mà |
| **HTTP Client** | **Axios** | Wrapper có interceptor xử lý token và lỗi tập trung |
| **Containerization** | **Docker & Docker Compose v2** | Multi-stage build, container hóa toàn bộ stack |

## 2. Nguyên tắc quản lý Dependency & Tương thích

1. **Tuân thủ BOM (Bill of Materials):**
   - Với Backend: Luôn ưu tiên dùng version do `spring-boot-starter-parent:4.1.1` quản lý.
   - Không khai báo phiên bản tường minh (`<version>`) cho các thư viện đã được Spring Boot quản lý (như `hibernate`, `spring-security`, `flyway-core`, `mysql-connector-j`).
2. **Khắc phục xung đột thư viện:**
   - Spring Boot 4.x yêu cầu SpringDoc OpenAPI phiên bản `3.x` (cụ thể `3.1.1`). Không sử dụng `springdoc-openapi` 2.x vì chỉ hỗ trợ Spring Boot 3.x.
   - Flyway tách biệt hỗ trợ MySQL: Bắt buộc khai báo cả `flyway-core` lẫn `flyway-mysql`.
3. **Lockfile & Reproducible Builds:**
   - Frontend bắt buộc phải commit file `package-lock.json` vào repository để bảo đảm mọi môi trường đều cài đặt chính xác cùng phiên bản gói thư viện.
4. **Tuyệt đối không commit Secret:**
   - Tuyệt đối không đưa mật khẩu database thật, secret key JWT, token hoặc credentials vào mã nguồn Git. Sử dụng `.env` và Docker environment variables.
