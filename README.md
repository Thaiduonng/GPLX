# Hệ thống Học, Đào tạo và Tiếp nhận Hồ sơ thi cấp Giấy phép Lái xe các Hạng (GPLX)

> **Đồ án tốt nghiệp đại học** — Kiến trúc **Modular Monolith** kết hợp **Java 21**, **Spring Boot 4.1.1**, **React 19 + TypeScript**, **MySQL 8.4 LTS** và **Docker Compose v2**.

---

## 1. Công nghệ Sử dụng

- **Backend:** Java 21, Spring Boot 4.1.1, Spring Security 7.x, Spring Data JPA, Hibernate, Bean Validation, Flyway Core & MySQL, OpenAPI Swagger UI (`springdoc-openapi` 3.1.1), JUnit 5, Mockito.
- **Frontend:** React 19, TypeScript, Vite, React Router DOM v7, Axios, CSS Modules (Responsive, hỗ trợ Tiếng Việt).
- **Database:** MySQL 8.4 LTS (Lưu trữ UTF-8 `utf8mb4_unicode_ci`, Múi giờ chuẩn UTC).
- **DevOps:** Docker, Docker Compose v2, Maven Wrapper (`mvnw`), Git.

---

## 2. Cấu trúc Dự án

```text
GPLX/
├── AGENTS.md                  # Hướng dẫn & Quy định hoạt động của AI Coding Agent
├── README.md                  # Hướng dẫn tổng quan & khởi chạy hệ thống
├── CHANGELOG.md               # Nhật ký các phiên bản & lịch sử thay đổi
├── .gitignore                 # Cấu hình bỏ qua tệp tin Git chuẩn hóa
├── .editorconfig              # Định dạng chuẩn hóa font chữ, tab, spacing
├── .gitattributes             # Chuẩn hóa ngắt dòng LF / CRLF
├── .env.example               # Biến môi trường mẫu bảo mật
├── docker-compose.yml         # Khởi chạy đồng bộ MySQL 8.4, Backend & Frontend
│
├── .rules/                    # Bộ 14 file Rule điều khiển quá trình phát triển
│   ├── 00-project-overview.md
│   ├── 01-technology-stack.md
│   ├── 02-architecture.md
│   ├── 03-coding-conventions.md
│   ├── 04-database-and-migrations.md
│   ├── 05-api-conventions.md
│   ├── 06-security-and-privacy.md
│   ├── 07-business-rules.md
│   ├── 08-legal-compliance.md
│   ├── 09-frontend-conventions.md
│   ├── 10-testing-and-quality.md
│   ├── 11-git-and-workflow.md
│   ├── 12-documentation.md
│   └── 13-definition-of-done.md
│
├── docs/                      # Bộ tài liệu kiến trúc, nghiệp vụ & pháp lý
│   ├── architecture/          # Kiến trúc hệ thống, ranh giới module, database, an ninh
│   ├── requirements/          # Tác nhân, Use Cases, Yêu cầu chức năng/phi chức năng
│   ├── legal/                 # Sổ đăng ký căn cứ pháp lý & quy trình rà soát
│   ├── testing/               # Chiến lược kiểm thử & tiêu chuẩn chất lượng
│   ├── deployment/            # Hướng dẫn chi tiết triển khai môi trường
│   └── backlog/               # Lộ trình tổng thể (Roadmap) & Task backlog chi tiết
│
├── backend/                   # Ứng dụng Spring Boot 4.1.1 (Modular Monolith)
│   ├── pom.xml
│   ├── mvnw / mvnw.cmd
│   └── src/
│       ├── main/java/vn/edu/gplx/
│       │   ├── GplxApplication.java
│       │   ├── config/        # SecurityConfig, WebConfig, OpenApiConfig
│       │   ├── shared/        # BaseEntity, ApiResponse, GlobalExceptionHandler
│       │   └── modules/       # 10 ranh giới module nghiệp vụ độc lập
│       │       ├── identity/  # HealthController & Quản lý tài khoản, vai trò
│       │       ├── admission/ # Tuyển sinh & tiếp nhận hồ sơ
│       │       ├── learning/  # Bài học trực tuyến & câu hỏi ôn tập
│       │       ├── training/  # Lớp học & giờ thực hành
│       │       ├── examination/ # Sát hạch & điều kiện thi
│       │       ├── crm/       # Quản trị khách hàng tư vấn
│       │       ├── finance/   # Học phí & công nợ
│       │       ├── fleet/     # Quản lý xe tập lái & bảo dưỡng
│       │       ├── notification/ # Email & nhắc lịch
│       │       └── reporting/ # Dashboard & báo cáo thống kê
│       └── main/resources/
│           ├── application.yml
│           └── db/migration/  # Flyway V1: Bảng users, roles, permissions
│
├── frontend/                  # Ứng dụng React 19 + TypeScript (Vite)
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── src/
│       ├── app/               # Khởi tạo App & Routes
│       ├── layouts/           # MainLayout chuẩn Responsive
│       ├── pages/             # HomePage (kết nối Health Check) & NotFoundPage
│       ├── services/          # apiClient Axios & healthService
│       └── types/             # Định nghĩa Type ApiResponse, HealthStatus
│
└── infra/docker/              # Dockerfiles cho Backend và Frontend
    ├── backend.Dockerfile
    └── frontend.Dockerfile
```

---

## 3. Hướng dẫn Khởi chạy Nhanh

### Cách 1: Khởi chạy bằng Docker Compose (Khuyến nghị)

1. Sao chép file cấu hình môi trường:
   ```bash
   cp .env.example .env
   ```
2. Khởi chạy toàn bộ dịch vụ:
   ```bash
   docker compose up -d --build
   ```
3. Truy cập các địa chỉ:
   - **Giao diện Người dùng (Frontend):** [http://localhost:3000](http://localhost:3000)
   - **Tài liệu API Swagger UI:** [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
   - **Kiểm tra Tình trạng Hệ thống (Health API):** [http://localhost:8080/api/v1/health](http://localhost:8080/api/v1/health)

### Cách 2: Khởi chạy Cục bộ từng Thành phần

1. **Khởi động Cơ sở dữ liệu MySQL:**
   ```bash
   docker compose up -d mysql
   ```
2. **Khởi động Backend (Spring Boot 4.1.1):**
   ```bash
   cd backend
   ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
   # Hoặc trên Windows:
   .\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
   ```
3. **Khởi động Frontend (React + Vite):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 4. Reset Dữ liệu Cơ sở dữ liệu

> ⚠️ **CẢNH BÁO:** Thao tác này sẽ xóa sạch toàn bộ cơ sở dữ liệu và tạo mới từ đầu thông qua Flyway:
```bash
docker compose down -v
docker compose up -d
```
