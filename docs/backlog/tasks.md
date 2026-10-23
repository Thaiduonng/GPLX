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

## Danh mục Tasks — Phase 2: Admission (Tuyển sinh & Tiếp nhận hồ sơ điện tử)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P2-01`** | CSDL & Entity Danh mục Hạng GPLX (`license_categories`) | TSK-P1-01 | `DONE` | Flyway V3, bảng `license_categories`, seed 6 hạng chuẩn A1, A, B1, B, C1, C cấu hình động |
| **`TSK-P2-02`** | CSDL & Entity Hồ sơ Tuyển sinh (`applications`, `documents`, `status_history`) | TSK-P2-01 | `DONE` | Flyway V3, entities `AdmissionApplication`, `AdmissionDocument`, `ApplicationStatusHistory`, optimistic locking (`@Version`) |
| **`TSK-P2-03`** | API Nộp hồ sơ điện tử (`POST /api/v1/admissions`) | TSK-P2-02 | `DONE` | Sinh mã `APP-CODE`, kiểm tra tuổi tối thiểu (ADM-004), chống nộp trùng lặp (ADM-005), lưu tài liệu |
| **`TSK-P2-04`** | API Thẩm định & Xét duyệt hồ sơ (`POST /api/v1/admissions/{id}/review`) | TSK-P2-03 | `DONE` | Máy trạng thái (ADM-001), bắt buộc lý do khi từ chối/bổ sung (ADM-002), cấm hoàn tác hồ sơ đã duyệt (ADM-003) |
| **`TSK-P2-05`** | API Tra cứu & Phân trang hồ sơ | TSK-P2-03 | `DONE` | `GET /api/v1/admissions/my-applications`, `GET /api/v1/admissions/{id}`, `GET /api/v1/admissions?status=...` có phân trang |
| **`TSK-P2-06`** | Giao diện Frontend Nộp hồ sơ, Danh sách hồ sơ & Quản lý thẩm định | TSK-P2-03, 04 | `DONE` | `SubmitApplicationPage`, `MyApplicationsPage`, `ApplicationManagementPage`, tích hợp role-based navigation |
| **`TSK-P2-07`** | Kiểm thử Tự động Toàn diện Phase 2 | TSK-P2-03, 04 | `DONE` | 11 tests cho Admission (6 unit tests, 5 integration tests) + 15 tests Phase 1; Tổng: 26/26 tests PASS |

---

## Danh mục Tasks — Phase 3: Learning & Training (Học trực tuyến & Đào tạo thực hành)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P3-01`** | CSDL & Entities Khóa học, Bài giảng, Ngân hàng câu hỏi & Lớp/Lịch học | TSK-P2-02 | `DONE` | Flyway V4 tạo 9 bảng: `courses`, `course_lessons`, `learning_progress`, `theory_questions`, `theory_answers`, `training_classes`, `class_enrollments`, `training_schedules`, `attendance_records`, `dat_practice_sessions` |
| **`TSK-P3-02`** | Module Learning: E-Learning & Theo dõi tiến độ bài học | TSK-P3-01 | `DONE` | Lưu tiến độ học tập người dùng (LRN-001), chặn đánh dấu hoàn thành nếu chưa xem đủ thời gian (LRN-002) |
| **`TSK-P3-03`** | Module Learning: Ngân hàng 600 câu hỏi & Thi thử lý thuyết trực tuyến | TSK-P3-01 | `DONE` | Sinh đề thi ngẫu nhiên, chấm điểm tự động, trượt ngay lập tức nếu sai câu hỏi điểm liệt |
| **`TSK-P3-04`** | Module Training: Quản lý Lớp học & Xếp lịch học không xung đột | TSK-P3-01 | `DONE` | Kiểm tra chống trùng lặp lịch đào tạo của giảng viên (TRN-001), phân bổ học viên vào lớp |
| **`TSK-P3-05`** | Module Training: Điểm danh buổi học & Giám sát thực hành DAT | TSK-P3-01 | `DONE` | Điểm danh trong khung ngày cho phép (TRN-002), tính tổng km/giờ thực hành DAT và cabin mô phỏng |
| **`TSK-P3-06`** | Giao diện Frontend Khóa học, Thi thử lý thuyết & Lịch học/DAT | TSK-P3-02..05| `DONE` | `CoursesPage`, `TheoryExamPage`, `TrainingSchedulePage`, tích hợp điều hướng và theo dõi thanh tiến trình DAT |
| **`TSK-P3-07`** | Kiểm thử Tự động Toàn diện Phase 3 | TSK-P3-02..05| `DONE` | 12 tests mới cho Phase 3 (CourseServiceTest, TheoryExamServiceTest, TrainingScheduleServiceTest, AttendanceServiceTest, CourseAndTrainingIntegrationTest); Tổng: 38/38 tests PASS |

---

## Danh mục Tasks — Phase 4: Examination (Tổ chức thi & Xét điều kiện dự thi - Kế hoạch tiếp theo)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P4-01`** | Module Examination: Đánh giá tự động điều kiện dự thi tốt nghiệp/sát hạch | TSK-P3-05 | `TODO` | Kiểm tra hồ sơ duyệt (ADM), hoàn thành lý thuyết (LRN), đủ giờ/km thực hành DAT (TRN) (EXM-001) |
| **`TSK-P4-02`** | Module Examination: Quản lý Hội đồng thi, Kỳ thi, Danh sách thí sinh & Kết quả | TSK-P4-01 | `TODO` | Quản lý kỳ thi, số báo danh, nhập kết quả thi lý thuyết, sa hình, đường trường, bảo toàn kết quả vĩnh viễn (EXM-002) |
| **`TSK-P4-03`** | Giao diện Tra cứu điều kiện dự thi & Bảng điểm sát hạch GPLX | TSK-P4-02 | `TODO` | Tra cứu điều kiện dự thi tự động, xem kết quả thi sát hạch và biên bản tổng hợp |
