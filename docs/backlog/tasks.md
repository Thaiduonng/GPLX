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


---

## Danh mục Tasks — Phase 8: Database & Legal Knowledge Consistency (Quản trị Tri Thức CSDL & Pháp Lý)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P8-01`** | Thiết lập Database Knowledge Base toàn diện | TSK-P7-02 | `DONE` | 9 tài liệu chuyên sâu trong `docs/knowledge/` (`project-context.md`, `module-catalog.md`, `database-overview.md`, `database-schema-catalog.md`, `database-relationships.md`, `data-dictionary.md`, `data-ownership.md`, `data-lifecycle.md`, `database-change-log.md`), cập nhật `erd.md` và `database-design.md` |
| **`TSK-P8-02`** | Thiết lập Legal Knowledge Base chuẩn hóa | TSK-P7-02 | `DONE` | 5 tài liệu pháp lý chuyên sâu trong `docs/legal/` (`legal-register.md`, `legal-source-catalog.md`, `legal-rule-catalog.md`, `legal-change-log.md`, `legal-verification-process.md`) |
| **`TSK-P8-03`** | Kiểm tra đối soát tính nhất quán MySQL Runtime & Tài liệu | TSK-P8-01..02| `DONE` | Truy vấn `INFORMATION_SCHEMA` trên MySQL 8.4 LTS; chuẩn hóa 100% tên bảng, tên cột, khóa ngoại và ràng buộc toàn vẹn giữa Entity, Migration và ERD |
| **`TSK-P8-04`** | Động hóa cấu hình định mức thực hành DAT (`LEG-TRAINING-003`) | TSK-P8-03 | `TODO` | Chuyển định mức km/giờ từ hằng số hard-code trong `DatPracticeServiceImpl.java` thành các thuộc tính động cấu hình theo từng hạng GPLX trong bảng `license_categories` (`min_dat_distance_km`, `min_dat_duration_hours`) |
| **`TSK-P8-05`** | Quản lý quy định chuyển đổi hạng GPLX theo Điều 89 Luật 36/2024 | TSK-P8-03 | `TODO` | Chuẩn bị lược đồ bảng lưu lịch sử chuyển đổi hoặc cấp đổi GPLX theo lộ trình Thông tư hướng dẫn mới của Bộ Công an / Bộ GTVT |

---

## Danh mục Tasks — Phase 9: Toàn Diện UI/UX & Design System Chuẩn Hóa

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P9-01`** | Thiết lập Design Tokens & Hệ thống Biến Giao diện Chuẩn | TSK-P7-02 | `DONE` | Khởi tạo `tokens.css` và chuẩn hóa `global.css` theo bảng màu Rule 09 (`--color-primary`, `--color-success`, `--color-warning`, `--color-danger`, neutral, spacing, shadows, radii, z-index). |
| **`TSK-P9-02`** | Xây dựng Bộ Shared UI Atomic Components dùng chung | TSK-P9-01 | `DONE` | Hoàn thiện 14 component chuẩn React 19 + TypeScript strict: `AppButton`, `AppInput`, `AppSelect`, `AppTextarea`, `StatusBadge`, `StatCard`, `Modal`, `ConfirmDialog`, `EmptyState`, `LoadingSpinner`, `Alert`, `PageHeader`, `DataTable`, `Tabs`. |
| **`TSK-P9-03`** | Tái cấu trúc Layout Phân quyền & Điều hướng Responsive | TSK-P9-02 | `DONE` | `MainLayout` tích hợp Header nhận diện vai trò, Workspace Bar thích ứng theo vai trò (Học viên / Tuyển sinh / Sát hạch / Quản trị), Mobile menu drawer mượt mà, liên kết Swagger OpenAPI. |
| **`TSK-P9-04`** | Nâng cấp toàn diện Phân hệ Học viên (Student Portal) | TSK-P9-03 | `DONE` | `HomePage` hero roadmap 4 bước; `TheoryExamPage` đếm ngược 20p + lưới chuyển nhanh câu hỏi + cảnh báo câu điểm liệt; `TrainingSchedulePage` tiến độ DAT trực quan; `SubmitApplicationPage` và `MyApplicationsPage` lịch sử thẩm định chi tiết; `CoursesPage` đếm thời gian học; `TuitionPaymentPage` chống duplicate submit. |
| **`TSK-P9-05`** | Nâng cấp toàn diện Phân hệ Nghiệp vụ Cán bộ & Quản trị | TSK-P9-03 | `DONE` | `ApplicationManagementPage` thẩm định hồ sơ chuẩn ADM-002; `ExamGradingPage` chấm điểm 4 môn sát hạch EXM-002; `FleetManagementPage` cảnh báo hạn kiểm định FLT-001 & modal bảo dưỡng; `DashboardPage` KPI charts; `AuditLogPage` tra cứu nhật ký kiểm toán. |
| **`TSK-P9-06`** | Loại bỏ 100% kiểu `any`, Format Chuẩn Tiếng Việt & Đóng gói Docker | TSK-P9-04..05 | `DONE` | Loại bỏ toàn bộ `any`, định dạng tiền tệ VND / ngày giờ tiếng Việt (`formatters.ts`), bổ sung `.dockerignore`, biên dịch Vite `npm run build` 0 lỗi và Nginx container hoạt động mượt mà tại `http://localhost:3000`. |


---

## Danh mục Tasks — Phase 10: Phân Hệ Học Tập, Rèn Luyện & Thi Thử Lý Thuyết GPLX Việt Nam

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **TSK-P10-01** | Chuẩn hóa Căn cứ Pháp lý & Cấu trúc 600 Câu hỏi GPLX | TSK-P9-06 | DONE | Khởi tạo question-bank-source.md (7 chương, 60 câu điểm liệt), exam-format-by-license-class.md (cấu trúc đề A1, A2, B1, B, C theo Thông tư 12 & 04), legal-verification-log.md trạng thái VERIFIED. |
| **TSK-P10-02** | Database Migrations V9 & V10 cho Phân hệ Lý thuyết | TSK-P10-01 | DONE | Tạo bảng 	heory_topics, exam_configurations, ookmarked_questions, practice_sessions, practice_answers, mock_exam_sessions, mock_exam_session_answers; audit fields created_at, updated_at; seed 7 chương, cấu hình đề và câu hỏi mẫu. |
| **TSK-P10-03** | Triển khai Domain & Application Services Backend | TSK-P10-02 | DONE | Java 21 Spring Boot 4.1.1: TheoryTopicService, TheoryBookmarkService, TheoryPracticeService (8 chế độ rèn luyện), TheoryExamService (bảo mật đề, chấm điểm server, rẽ nhánh điểm liệt, idempotent), TheoryStatisticsService, ExamConfigService, QuestionAdminService. |
| **TSK-P10-04** | Xây dựng REST API Controllers & Unit Test Bảo Mật | TSK-P10-03 | DONE | TheoryExamController, TheoryLearningController, TheoryAdminController; bộ test TheoryExamSecureWorkflowTest và TheoryExamServiceTest đạt BUILD SUCCESS 100%. |
| **TSK-P10-05** | Xây dựng Giao diện React Frontend Chuyên Sâu 5 Phân Khu | TSK-P10-04 | DONE | Nâng cấp TheoryExamPage với 6 Tabs: Tổng quan & KPI, Học theo 7 chương, Rèn luyện 8 chế độ tương tác, Thi thử chuẩn theo từng hạng GPLX, Ôn tập câu sai & Bookmark, Quản trị cấu hình đề thi. |
| **TSK-P10-06** | Kiểm thử Tích hợp End-to-End & Đóng gói Docker Stack | TSK-P10-05 | DONE | Build Docker Compose thành công, các container gplx-frontend, gplx-backend, gplx-mysql hoạt động healthy, API 	opics và questions phản hồi chuẩn xác. |
