# Sổ Quản Lý Công Việc (Tasks Backlog)

Tài liệu này quản lý toàn bộ các hạng mục công việc (tasks) theo từng giai đoạn phát triển dự án GPLX Training System theo quy định tại `.rules/11-git-and-workflow.md` và `.rules/13-definition-of-done.md`.

---

## Danh mục Tasks — Phase 0: Foundation (Khởi tạo nền tảng)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P0-01`** | Khởi tạo cấu trúc dự án & Bộ Rule chuẩn | — | `DONE` | 14 files `.rules/`, `AGENTS.md`, cấu trúc thư mục backend & frontend |
| **`TSK-P0-02`** | Thiết lập cấu hình Maven & Docker Compose | TSK-P0-01 | `DONE` | `pom.xml` chuẩn Spring Boot 4.1.1, `docker-compose.yml` MySQL 8.4 LTS, `.env.example` |
| **`TSK-P0-03`** | Migration CSDL V1 & Entity Base | TSK-P0-02 | `DONE` | Flyway V1 tạo bảng: `users`, `roles`, `permissions`, `user_roles`, `role_permissions` |
| **`TSK-P0-04`** | Actuator & Healthcheck API | TSK-P0-03 | `DONE` | API `/api/v1/health` trả về trạng thái UP, HTTP 200 |
| **`TSK-P0-05`** | Khung Frontend Vite + React + TypeScript | TSK-P0-01 | `DONE` | Layout cơ bản, gọi API healthcheck, giao diện tiếng Việt |

---

## Danh mục Tasks — Phase 1: Identity & Authentication (Xác thực & Phân quyền)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P1-01`** | Migration V2 & Cấu hình Seed dữ liệu chuẩn | TSK-P0-03 | `DONE` | Seed 7 Roles hệ thống (`ADMIN`, `MANAGER`, `INSTRUCTOR`, `EXAMINER`, `STUDENT`, `STAFF`, `COUNSELOR`), permissions cốt lõi & tài khoản ban đầu |
| **`TSK-P1-02`** | Spring Security 7 & JJWT 0.12.6 Integration | TSK-P1-01 | `DONE` | Cấu hình SecurityFilterChain không dùng `.and()`, BCryptPasswordEncoder, JwtAuthenticationFilter stateless |
| **`TSK-P1-03`** | User Domain & Repository Layer | TSK-P1-01 | `DONE` | `User`, `Role`, `Permission` JPA Entities, quan hệ Many-to-Many chuẩn Hibernate 7 |
| **`TSK-P1-04`** | Authentication Service & DTOs | TSK-P1-03 | `DONE` | Login, Register, Refresh Token, UserProfile, mapping DTOs immutable records |
| **`TSK-P1-05`** | Authentication REST Controller | TSK-P1-04 | `DONE` | Endpoints: `POST /api/v1/auth/login`, `POST /api/v1/auth/register`, `GET /api/v1/auth/me` |
| **`TSK-P1-06`** | Frontend Auth Context & Form Đăng nhập/Đăng ký | TSK-P1-05 | `DONE` | React Context quản lý JWT token, lưu an toàn localStorage, tự động đính kèm Bearer token vào Axios, UI đẹp mắt tiếng Việt |
| **`TSK-P1-07`** | Kiểm thử Tự động (Unit & Integration Tests) | TSK-P1-05 | `DONE` | Kiểm tra Happy Path đăng nhập, mã hóa BCrypt, chặn đăng ký trùng email/username, bảo vệ endpoint phân quyền |

---

## Danh mục Tasks — Phase 2: Admission & Electronic Dossiers (Tuyển sinh & Hồ sơ điện tử)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P2-01`** | CSDL & Migrations V3 Tuyển sinh & Hạng GPLX | TSK-P1-01 | `DONE` | Flyway V3 tạo bảng: `license_categories`, `admission_applications`, `admission_documents`, `application_status_histories`. Seed 6 hạng GPLX (A1, A2, B1, B2, C, D) |
| **`TSK-P2-02`** | Domain Models & JPA Entities Admission | TSK-P2-01 | `DONE` | Entities: `LicenseCategory`, `AdmissionApplication`, `AdmissionDocument`, `ApplicationStatusHistory`. Hỗ trợ Optimistic Locking (`@Version`), Audit Fields |
| **`TSK-P2-03`** | Service Layer & Quy tắc nghiệp vụ Tuyển sinh | TSK-P2-02 | `DONE` | Thực thi quy trình trạng thái hợp lệ (`ADM-001`), bắt buộc lý do khi bổ sung/từ chối (`ADM-002`), chống ghi đè hồ sơ duyệt (`ADM-003`), tự động sinh mã hồ sơ `HS-CATEGORY-YYYYMM-XXXX`, ghi nhật ký chuyển trạng thái (`ADM-005`) |
| **`TSK-P2-04`** | REST API Endpoints Tuyển sinh & Hồ sơ | TSK-P2-03 | `DONE` | Endpoints: `GET /api/v1/license-categories`, `POST /api/v1/admissions/applications`, `GET /api/v1/admissions/applications/my`, `GET /api/v1/admissions/applications`, `POST /api/v1/admissions/applications/{id}/review` |
| **`TSK-P2-05`** | Giao diện Nộp & Quản lý Hồ sơ Điện tử | TSK-P2-04 | `DONE` | `SubmitApplicationPage`, `MyApplicationsPage`, `ApplicationManagementPage`, phân quyền theo Role, hiển thị trạng thái tiếng Việt |
| **`TSK-P2-06`** | Kiểm thử Tự động Phase 2 | TSK-P2-03..04 | `DONE` | 11 unit & integration tests mới (Validation CCCD, chuyển đổi trạng thái ADM-001/002/003/005, RBAC). Tổng: 26/26 tests PASS |

---

## Danh mục Tasks — Phase 3: Learning & Training (Đào tạo lý thuyết & thực hành)

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

## Danh mục Tasks — Phase 4: Examination (Tổ chức thi & Xét duyệt điều kiện dự thi)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P4-01`** | CSDL & Migrations V5: Kỳ thi, Thí sinh & Kết quả sát hạch | TSK-P3-05 | `DONE` | Flyway V5 tạo bảng: `exam_sessions`, `exam_candidates`, `exam_results`. Ràng buộc khóa ngoại, số báo danh, bảo toàn kết quả (EXM-002) |
| **`TSK-P4-02`** | Đánh giá tự động điều kiện dự thi tốt nghiệp/sát hạch (EXM-001) | TSK-P4-01 | `DONE` | `EligibilityService` tự động đối soát 3 tiêu chí: Hồ sơ tuyển sinh `APPROVED`, hoàn thành 100% bài học lý thuyết trực tuyến, đủ chỉ tiêu km và giờ thực hành DAT |
| **`TSK-P4-03`** | Quản lý Hội đồng thi, Đăng ký thí sinh & Bảng điểm sát hạch | TSK-P4-02 | `DONE` | Tạo kỳ thi, cấp số báo danh `SBD-CATEGORY-XXX`, nhập điểm 4 môn (Lý thuyết, Mô phỏng, Sa hình, Đường trường), tính kết quả `PASSED`/`FAILED`, phân quyền `EXAMINER`, `ADMIN` |
| **`TSK-P4-04`** | Giao diện Tra cứu điều kiện dự thi, Kỳ thi & Bảng điểm sát hạch GPLX | TSK-P4-03 | `DONE` | `EligibilityCheckPage`, `ExamSessionsPage`, `ExamGradingPage`, `MyExamResultsPage`, tích hợp menu điều hướng theo quyền |
| **`TSK-P4-05`** | Kiểm thử Tự động Toàn diện Phase 4 | TSK-P4-02..03| `DONE` | 12 tests mới cho Phase 4 (`EligibilityServiceTest`, `ExaminationServiceTest`, `ExaminationControllerTest`); Tổng: 50/50 tests PASS |

---

## Danh mục Tasks — Phase 5: Support Modules (Finance, Fleet, CRM, Notification)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P5-01`** | CSDL & Migrations V6: Hóa đơn, Biên lai, Đội xe & Bảo dưỡng | TSK-P4-05 | `DONE` | Flyway V6 tạo 6 bảng: `fee_invoices`, `payment_receipts`, `vehicles`, `vehicle_maintenances`, `notifications`, `crm_leads` |
| **`TSK-P5-02`** | Module Finance: Quản lý biểu phí & Biên lai nộp tiền chống trùng | TSK-P5-01 | `DONE` | Ghi nhận hóa đơn học phí, nộp tiền với Idempotency Key (FIN-001), bảo toàn vĩnh viễn không xóa chứng từ tài chính (FIN-002) |
| **`TSK-P5-03`** | Module Fleet: Quản lý đội xe tập lái & Giám sát hạn đăng kiểm | TSK-P5-01 | `DONE` | Thêm xe, theo dõi số sàn/tự động, tự động loại trừ xe quá hạn đăng kiểm hoặc đang bảo dưỡng khỏi danh sách khả dụng (FLT-001) |
| **`TSK-P5-04`** | Giao diện Frontend Quản lý Học phí & Đội xe tập lái | TSK-P5-02..03| `DONE` | `TuitionPaymentPage` (theo dõi nợ, nộp học phí an toàn), `FleetManagementPage` (danh sách xe, cảnh báo đăng kiểm, lịch sử bảo dưỡng) |
| **`TSK-P5-05`** | Kiểm thử Tự động Toàn diện Phase 5 | TSK-P5-02..03| `DONE` | 9 tests mới (`FinanceServiceTest`, `FleetServiceTest`, `FinanceAndFleetIntegrationTest`); Tổng: 59/59 tests PASS |

---

## Danh mục Tasks — Phase 6: Reporting & Audit Logging (Báo cáo & Giám sát hệ thống)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P6-01`** | Dashboard Thống kê đào tạo, Tỷ lệ đỗ & Doanh thu học phí | TSK-P5-05 | `DONE` | Tổng hợp KPI thời gian thực: học viên, hồ sơ, tỷ lệ đỗ, doanh thu học phí, quãng đường DAT, xe khả dụng, thống kê chi tiết theo hạng GPLX |
| **`TSK-P6-02`** | Audit Log: Giám sát vết thao tác nghiệp vụ nhạy cảm | TSK-P5-05 | `DONE` | Bảng `audit_logs` (Flyway V7), ghi nhận người thực hiện, thời gian, module, mã đối tượng, IP và chi tiết thay đổi; hỗ trợ tra cứu lọc theo phân hệ/hành động |
| **`TSK-P6-03`** | Kiểm thử Tự động Toàn diện Phase 6 | TSK-P6-01..02| `DONE` | 7 tests mới (`ReportingServiceTest`, `ReportingControllerTest`); Tổng: 66/66 tests PASS 100% |

---

## Danh mục Tasks — Phase 7: Final Polish & Release (Đóng gói & Nghiệm thu v1.0.0)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P7-01`** | Hoàn thiện Docker Compose Production & Multi-stage Build | TSK-P6-03 | `DONE` | Multi-stage Dockerfile cho backend (Temurin JDK/JRE 21 non-root) và frontend (Node 20 + Nginx Alpine), cấu hình Nginx reverse proxy & SPA fallback, healthcheck đồng bộ |
| **`TSK-P7-02`** | Merge nhánh main & Release v1.0.0 | TSK-P7-01 | `DONE` | Merge `--no-ff` từ develop vào main, gắn Git tag `v1.0.0`, tài liệu hoàn chỉnh sẵn sàng nghiệm thu bảo vệ đồ án tốt nghiệp |
