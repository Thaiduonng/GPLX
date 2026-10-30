# Hệ thống Học, Đào tạo và Tiếp nhận Hồ sơ thi cấp Giấy phép Lái xe các Hạng (GPLX Training System)

> **Đồ án tốt nghiệp đại học** ngành Công nghệ Thông tin / Kỹ thuật Phần mềm.
> Kiến trúc **Modular Monolith** kết hợp **Java 21**, **Spring Boot 4.1.1**, **React 19 + TypeScript**, **MySQL 8.4 LTS** và **Docker Compose v2**.
> Phiên bản chính thức: **v1.0.0**.

---

## 1. Công nghệ Sử dụng (Tech Stack)

- **Backend:** Java 21 LTS, Spring Boot 4.1.1, Spring Framework 7, Spring Security 7.x, Spring Data JPA, Hibernate 7, Bean Validation, Flyway Core & MySQL (10.x), OpenAPI Swagger UI (`springdoc-openapi` 3.1.1), JUnit 5, Mockito.
- **Frontend:** React 19, TypeScript (Strict Mode), Vite, React Router DOM v7, Axios, Nginx Alpine (Multi-stage Production Image), CSS Modules (Responsive, hỗ trợ Tiếng Việt).
- **Database:** MySQL 8.4 LTS (Lưu trữ UTF-8 `utf8mb4_unicode_ci`, Múi giờ chuẩn UTC, 7 Flyway migrations V1 ➔ V7).
- **DevOps:** Docker, Docker Compose v2, Maven Wrapper (`mvnw`), Git Flow.

---

## 2. Các Phân Hệ Nghiệp Vụ Cốt Lõi (Phases 0 — 6)

1. **Identity & Authentication (Phase 1):** RBAC 7 vai trò (`ADMIN`, `MANAGER`, `STAFF`, `INSTRUCTOR`, `EXAMINER`, `STUDENT`, `COUNSELOR`), xác thực Stateless JWT HMAC-SHA256, mã hóa BCrypt.
2. **Admission & Electronic Dossiers (Phase 2):** Tiếp nhận hồ sơ điện tử, tải tài liệu số hóa, máy trạng thái xét duyệt (`ADM-001`), bắt buộc lý do từ chối (`ADM-002`), chống sửa hồ sơ đã duyệt (`ADM-003`), chống nộp trùng CCCD (`ADM-005`).
3. **Learning & Training (Phase 3):** E-Learning theo dõi tiến độ (`LRN-001/002`), thi thử ngân hàng 600 câu hỏi (trượt ngay nếu sai câu điểm liệt), xếp lịch học không xung đột (`TRN-001`), điểm danh buổi học (`TRN-002`), giám sát km và giờ thực hành lái xe DAT.
4. **Examination (Phase 4):** Thẩm định tự động 3 điều kiện dự thi (`EXM-001`), quản lý kỳ thi và số báo danh, chấm điểm 4 môn (Lý thuyết, Mô phỏng, Sa hình, Đường trường), bảo toàn vĩnh viễn kết quả sát hạch (`EXM-002`).
5. **Support Modules — Finance & Fleet (Phase 5):** Hóa đơn học phí, nộp tiền an toàn với Idempotency Key chống trùng (`FIN-001`), cấm xóa chứng từ (`FIN-002`), quản lý đội xe và tự động loại xe quá hạn đăng kiểm (`FLT-001`).
6. **Reporting & Audit Logging (Phase 6):** Dashboard KPI quản trị thời gian thực, bảng phân tích tỷ lệ đỗ theo hạng bằng, truy vết toàn bộ thao tác hệ thống qua Audit Logs.

---

## 3. Cấu Trúc Dự Án

```text
GPLX/
├── AGENTS.md                  # Quy định hoạt động của AI Coding Agent
├── README.md                  # Hướng dẫn tổng quan & khởi chạy hệ thống
├── CHANGELOG.md               # Nhật ký phiên bản chi tiết (v0.1.0 -> v1.0.0)
├── docker-compose.yml         # Khởi chạy 1-click: MySQL 8.4, Backend & Frontend
├── .rules/                    # Bộ 14 file Rule quy chuẩn kiến trúc & nghiệp vụ
├── docs/                      # Tài liệu kiến trúc, database, pháp lý và backlog
│   ├── architecture/          # system-overview, module-boundaries, database-design
│   ├── requirements/          # actors-and-use-cases, functional-requirements
│   ├── legal/                 # legal-register (sổ đăng ký pháp lý GPLX)
│   └── backlog/               # roadmap, tasks.md (DoD)
├── backend/                   # Spring Boot 4.1.1 (Modular Monolith)
│   ├── src/main/java/vn/edu/gplx/modules/
│   │   ├── identity/          # Tài khoản, xác thực, phân quyền
│   │   ├── admission/         # Tuyển sinh, hồ sơ điện tử
│   │   ├── learning/          # E-learning, 600 câu hỏi thi thử
│   │   ├── training/          # Lớp học, lịch học, điểm danh, DAT
│   │   ├── examination/       # Sát hạch, điều kiện dự thi, chấm điểm
│   │   ├── finance/           # Hóa đơn học phí, biên lai thanh toán
│   │   ├── fleet/             # Phương tiện, đăng kiểm, bảo dưỡng
│   │   └── reporting/         # Dashboard báo cáo KPI, Audit Logs
│   └── src/main/resources/db/migration/ # 7 migrations Flyway (V1 -> V7)
├── frontend/                  # React 19 + TypeScript + Vite + Nginx
│   └── src/pages/             # 16 trang màn hình chức năng hoàn chỉnh
└── infra/docker/              # Dockerfiles Multi-stage Production & Nginx Conf
    ├── backend.Dockerfile
    ├── frontend.Dockerfile
    └── nginx.conf
```

---

## 4. Hướng Dẫn Khởi Chạy Nhanh

### Cách 1: Khởi chạy 1-Click với Docker Compose (Khuyến nghị)

1. **Chuẩn bị file môi trường:**
   ```bash
   cp .env.example .env
   ```
2. **Khởi chạy toàn bộ hệ thống:**
   ```bash
   docker compose up -d --build
   ```
3. **Truy cập ứng dụng:**
   - **Giao diện Người dùng (Frontend):** [http://localhost:3000](http://localhost:3000)
   - **Tài liệu API Swagger UI:** [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
   - **Kiểm tra Tình trạng Hệ thống (Health API):** [http://localhost:8080/api/v1/health](http://localhost:8080/api/v1/health)

### Cách 2: Khởi chạy Cục bộ cho Lập trình viên (Development)

1. **Khởi động Cơ sở dữ liệu MySQL:**
   ```bash
   docker compose up -d mysql
   ```
2. **Khởi động Backend (Spring Boot 4.1.1):**
   ```bash
   cd backend
   .\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
   # Trên Linux/macOS: ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
   ```
3. **Khởi động Frontend (React 19 + Vite):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 5. Tài Khoản Mẫu Kiểm Thử Mặc Định (Seed Data)

| Tài khoản (Username) | Mật khẩu | Vai trò (Role) | Chức năng chính |
| :--- | :--- | :--- | :--- |
| `admin` | `admin123` | `ROLE_ADMIN` | Quản trị toàn hệ thống, xem Dashboard KPI, Audit Logs |
| `manager` | `manager123` | `ROLE_MANAGER` | Quản lý cơ sở đào tạo, tạo kỳ thi, quản lý đội xe |
| `staff` | `staff123` | `ROLE_STAFF` | Thẩm định & duyệt hồ sơ tuyển sinh điện tử |
| `examiner` | `examiner123` | `ROLE_EXAMINER` | Giám khảo chấm điểm 4 môn sát hạch GPLX |
| `instructor` | `instructor123`| `ROLE_INSTRUCTOR` | Giảng viên dạy lái, điểm danh, hướng dẫn DAT |
| `student` | `student123` | `ROLE_STUDENT` | Học viên nộp hồ sơ, thi thử 600 câu, nộp học phí, xem điểm |

---

## 6. Chạy Kiểm Thử Tự Động Toàn Diện (Testing)

Hệ thống sở hữu bộ kiểm thử tự động toàn diện đạt tỷ lệ **100% Passed (66/66 test cases)**:

```bash
cd backend
.\mvnw.cmd test
# Trên Linux/macOS: ./mvnw test
```

---

## 7. Giấy Phép & Bản Quyền

- Dự án phục vụ mục đích nghiên cứu và bảo vệ đồ án tốt nghiệp đại học.
- Toàn bộ quy tắc về đào tạo và sát hạch lái xe tuân thủ pháp luật giao thông đường bộ Việt Nam.


## MVP sa hình ô tô 3D

Module 3D tại `/student/driving-simulation`: xe B/C1/C/D1/D2/D, ba bài đầu, physics cơ bản, camera/HUD, phát hiện lỗi, chấm điểm từ bộ cấu hình có nguồn/phiên bản, lưu/phát lại cục bộ. Bản 2D giữ ở `/student/driving-simulation/2d`. Chỉ phản hồi phạm vi MVP, không phải kết quả sát hạch chính thức.

- [Cài đặt, chạy thử và kiểm tra](docs/training/simulation3d-mvp.md)
- [Mã nguồn độc lập ZIP](artifacts/simulation3d-mvp-source.zip) — giải nén, `npm ci`, `npm run dev`, mở cổng 5173; không cần backend.
- [Kiến trúc và giới hạn](docs/architecture/simulation3d-mvp.md)
