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


---

## Danh mục Tasks — Phase 11: Chuyên Sâu Database & Backend Phân Hệ Lý Thuyết GPLX (Giai đoạn 2)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P11-01`** | CSDL & Flyway Migration V11 Cấu Trúc Đề Thi 7 Chương | TSK-P10-02 | `DONE` | Khởi tạo `V11__seed_exam_structure_and_import_helpers.sql` chuẩn hóa cấu trúc đề thi `structure_json` cho các hạng A1, A2, B1, B, C theo Thông tư 12 & 04; áp dụng thành công trên MySQL 8.4 LTS. |
| **`TSK-P11-02`** | Cơ Chế Bảo Mật & Lưu Tiến Độ Thi Thời Gian Thực | TSK-P10-03 | `DONE` | Nâng cấp `TheoryExamService` với API `POST /api/v1/theory/mock-exam/{sessionCode}/progress` lưu trạng thái từng câu thời gian thực; cơ chế tự động đánh dấu hết giờ `EXPIRED`; chống nộp lặp (idempotent); sinh đề phân bổ 7 chương bắt buộc có câu điểm liệt. |
| **`TSK-P11-03`** | Quản Trị Ngân Hàng Câu Hỏi: Bulk Import & Export JSON | TSK-P10-03 | `DONE` | Triển khai API `POST /api/v1/admin/theory/questions/import` và `GET /api/v1/admin/theory/questions/export` trên `TheoryAdminController` & `QuestionAdminService`; kiểm tra ràng buộc bắt buộc tối thiểu 2 phương án và duy nhất 1 đáp án đúng theo quy định GPLX Việt Nam. |
| **`TSK-P11-04`** | Tìm Kiếm & Phân Trang Nâng Cao Cho Câu Hỏi & Lịch Sử | TSK-P10-03 | `DONE` | Bổ sung query `searchQuestionsAdvanced` trong `TheoryQuestionRepository`; nâng cấp phân trang `Pageable` cho câu hỏi theo chủ đề, lọc câu điểm liệt, phân trang lịch sử rèn luyện và lịch sử thi thử. |
| **`TSK-P11-05`** | Bộ Kiểm Thử Tự Động Backend Chuyên Sâu | TSK-P11-02..04 | `DONE` | Mở rộng `TheoryExamSecureWorkflowTest` và khởi tạo `QuestionAdminServiceTest` kiểm thử toàn diện: lưu tiến độ, xử lý quá giờ, chống nộp đúp, validation import (10/10 tests PASS 100%). |
| **`TSK-P11-06`** | Đóng Gói Docker Container & Kiểm Thử Runtime Thực Tế | TSK-P11-05 | `DONE` | Multi-stage build lại `gplx-backend` container; kiểm thử trực tiếp trên container với chuỗi kịch bản: Topics -> Questions Pagination -> Start Exam -> Realtime Progress Save -> Submit Exam -> Paginated History. Tất cả phản hồi HTTP 200 OK. |


---

## Danh mục Tasks — Phase 12: Giao Diện Học Tập, Rèn Luyện & Ôn Tập Chuyên Sâu (Giai đoạn 3)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P12-01`** | Giao diện Học tập 7 Chương Tương tác Đa Chế độ | TSK-P11-06 | `DONE` | Nâng cấp `TheoryTopicStudyTab.tsx` với 2 chế độ hiển thị: 🎴 Học tương tác từng câu (Flashcard/Quiz) và 📜 Xem danh sách đầy đủ; hỗ trợ phím tắt bàn phím (ArrowLeft, ArrowRight, phím 1-4, phím B). |
| **`TSK-P12-02`** | Lưới Chuyển Nhanh Câu Hỏi & Tìm Kiếm Thông Minh | TSK-P12-01 | `DONE` | Xây dựng Question Grid Navigator 1..N hiển thị trực quan trạng thái câu điểm liệt và câu đang học; thanh tìm kiếm từ khóa nội dung hoặc số câu hỏi chuẩn 1-600. |
| **`TSK-P12-03`** | Nâng Cấp Giao Diện Rèn Luyện 8 Chế Độ Chuyên Sâu | TSK-P12-01 | `DONE` | Nâng cấp `TheoryPracticeTab.tsx` với bảng lưới câu hỏi trực quan hiển thị màu sắc đúng (xanh)/sai (đỏ), hỗ trợ phím tắt chọn đáp án và Enter chuyển câu; tổng kết buổi rèn luyện chi tiết. |
| **`TSK-P12-04`** | Phân Hệ Ôn Tập Câu Sai, Đánh Dấu & Lịch Sử Phiên Học | TSK-P12-02 | `DONE` | Nâng cấp `TheoryReviewTab.tsx` với 3 phân khu: Danh sách câu từng làm sai, Danh sách câu đã bookmark, Lịch sử các phiên rèn luyện phân trang; nút phím tắt "Rèn luyện ngay tập hợp này". |
| **`TSK-P12-05`** | Đóng Gói Docker Frontend & Kiểm Thử Runtime UI/UX | TSK-P12-03..04| `DONE` | Rebuild Vite bundle 0 lỗi TypeScript strict (`npm run build`); Nginx container hoạt động mượt mà tại `http://localhost:3000`. |


---

## Danh mục Tasks — Phase 13: Giao Diện Thi Thử Lý Thuyết Sát Hạch Chuyên Sâu (Giai đoạn 4)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **TSK-P13-01** | Phòng Thi Trực Tuyến & Đồng Hồ Đếm Ngược Countdown | TSK-P12-05 | DONE | Xây dựng phòng thi độc lập trên TheoryMockExamTab.tsx, đồng hồ đếm ngược chính xác, cảnh báo đổi màu dưới 2 phút, tự động nộp bài khi hết giờ (handleAutoSubmit). |
| **TSK-P13-02** | Lưới Điều Hướng Câu Hỏi & Tính Năng Cắm Cờ Xem Lại (Flag) | TSK-P13-01 | DONE | Bảng ma trận câu hỏi Question Grid hiển thị màu sắc: Đã làm (xanh), Chưa làm (xám), Đang xem (viền đậm), Điểm liệt (chấm đỏ), Cắm cờ xem lại (icon 🚩). Phím tắt F để cắm/gỡ cờ. |
| **TSK-P13-03** | Tự Động Lưu Tiến Độ Ngầm Thời Gian Thực (Auto-save) | TSK-P13-01 | DONE | Gọi ngầm saveExamProgress mỗi khi người học chọn hoặc thay đổi đáp án; hiển thị trạng thái lưu đám mây thời gian thực, phòng chống mất điện hoặc tải lại trang. |
| **TSK-P13-04** | Hệ Thống Phím Tắt Phòng Thi & Modal Xác Nhận Nộp Bài | TSK-P13-02 | DONE | Phím 1..4 chọn đáp án A..D, Mũi tên Trái/Phải chuyển câu; Modal nộp bài kiểm soát thống kê câu làm / câu chưa làm / câu cắm cờ, chống bấm nhầm và chống nộp lặp. |
| **TSK-P13-05** | Bảng Điểm Sát Hạch Chi Tiết & Tra Cứu Lịch Sử Thi Đã Lưu | TSK-P13-04 | DONE | Màn hình kết quả thông báo ĐẠT / KHÔNG ĐẠT, cảnh báo trượt điểm liệt; bộ lọc xem lại câu sai / điểm liệt; sub-tab tra cứu lịch sử các lượt thi cũ (getMockExamHistory). |
| **TSK-P13-06** | Đóng Gói Docker Frontend & Kiểm Thử Runtime | TSK-P13-05 | DONE | Biên dịch TypeScript strict 0 lỗi, đóng gói Docker Compose frontend v1.6.0 hoạt động mượt mà. |

---

## Danh mục Tasks — Phase 14: Quản Trị Dữ Liệu Ngân Hàng Câu Hỏi & Cấu Hình Đề Thi (Giai đoạn 5)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **TSK-P14-01** | Bảng Điều Khiển Cấu Hình Đề Thi Theo Hạng GPLX | TSK-P13-06 | DONE | Quản lý thông số đề thi cho các hạng A1, A2, B1, B, C (số câu hỏi, thời gian, điểm sàn đạt, phiên bản quy chế, căn cứ pháp lý); modal chỉnh sửa lưu trữ trên backend. |
| **TSK-P14-02** | Quản Lý Ngân Hàng Câu Hỏi: Tìm Kiếm, Lọc Đa Tiêu Chí & CRUD | TSK-P14-01 | DONE | Bảng quản trị câu hỏi phân trang; lọc theo 7 chương lý thuyết, theo hạng GPLX, lọc riêng câu hỏi điểm liệt ⚠️; modal xem chi tiết đáp án đúng và căn cứ pháp lý; chức năng thêm mới, sửa và xóa câu hỏi an toàn. |
| **TSK-P14-03** | Nhập Hàng Loạt Câu Hỏi Từ JSON (Bulk Import) | TSK-P14-01 | DONE | Chức năng nhập hàng loạt với tiền kiểm tra cú pháp JSON, kiểm tra tính toàn vẹn (tối thiểu 2 đáp án, duy nhất 1 đáp án đúng theo quy định GPLX); hiển thị báo cáo thành công/thất bại chi tiết. |
| **TSK-P14-04** | Xuất Dữ Liệu Ngân Hàng Câu Hỏi (Export JSON) & Xác Minh Pháp Lý | TSK-P14-02 | DONE | Xuất dữ liệu câu hỏi ra file JSON tiêu chuẩn theo chương hoặc hạng; quản lý thông tin phiên bản Bộ 600 câu hỏi Cục ĐBVN và 60 câu điểm liệt ở trạng thái VERIFIED (Thông tư 12 & Thông tư 04). |
| **TSK-P14-05** | Kiểm Thử Tự Động Backend & Đóng Gói Docker Toàn Diện | TSK-P14-02..04 | DONE | Mở rộng bộ unit tests QuestionAdminServiceTest đạt 5/5 PASS (tổng 7/7 tests module lý thuyết); đóng gói Docker frontend v1.7.0 phục vụ tại cổng 3000. |


---

## Danh mục Tasks — Phase 15: Kiểm Thử Toàn Diện & Nghiệm Thu Hệ Thống (Giai đoạn 6)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P15-01`** | Kiểm Thử Tự Động Backend Toàn Bộ (Test Suites) | TSK-P14-05 | `DONE` | Toàn bộ 76/76 unit & integration tests chạy thành công 100% BUILD SUCCESS; chuẩn hóa FlywayConfig tương thích giữa MySQL 8.4 và H2 in-memory test. |
| **`TSK-P15-02`** | Xác Thực Bảo Mật Phân Quyền RBAC Phía Server | TSK-P15-01 | `DONE` | Kiểm chứng kịch bản thực tế: Học viên `ROLE_STUDENT` bị chặn truy cập API Admin bằng HTTP 403; Quản trị viên `ROLE_ADMIN` truy cập đầy đủ API cấu hình và ngân hàng câu hỏi bằng HTTP 200. |
| **`TSK-P15-03`** | Đóng Gói Docker Compose & Xác Thực Container Healthy | TSK-P15-02 | `DONE` | Đóng gói production bundle cho `gplx-frontend` (Nginx Alpine) và `gplx-backend` (Eclipse Temurin 21 JRE); cả 3 containers (Frontend, Backend, MySQL) đạt trạng thái Up (healthy). |
| **`TSK-P15-04`** | Tài Liệu Hướng Dẫn Sử Dụng & Báo Cáo Nghiệm Thu | TSK-P15-03 | `DONE` | Khởi tạo `docs/guides/theory-learning-and-exam-system-guide.md` hướng dẫn 6 phân khu chức năng và đối soát toàn diện 14 tiêu chí nghiệm thu theo Master Prompt (ĐẠT 14/14). |


---

## Danh mục Tasks — Phase 16: Nâng Cấp Hệ Thống Giao Diện UI/UX Pro Max (Enterprise Government Portal & LMS)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P16-01`** | Tích Hợp Skill & Khởi Tạo Master Design System | TSK-P15-04 | `DONE` | Khởi tạo Source of Truth thiết kế tại `design-system/gplx-enterprise-portal/MASTER.md` theo preset `Accessible & Ethical` kết hợp `Enterprise Gateway`, chuẩn hóa bảng màu, typography và spacing. |
| **`TSK-P16-02`** | Nâng Cấp Bộ Tokens CSS & Base Accessibility Global | TSK-P16-01 | `DONE` | Cập nhật `tokens.css` và `global.css`: Nhúng font `Be Vietnam Pro` & `Atkinson Hyperlegible`, vòng nét `:focus-visible` 3px, `@media (prefers-reduced-motion)` và link `.skip-to-content`. |
| **`TSK-P16-03`** | Thay Thế Toàn Bộ Emojis Bằng Bộ SVG Icons Độc Lập | TSK-P16-02 | `DONE` | Khởi tạo thư viện `frontend/src/components/ui/Icons.tsx` với 20+ SVG icons nhẹ và sắc nét; loại bỏ toàn bộ emoji trên navigation và trang chủ theo quy tắc `AGENTS.md`. |
| **`TSK-P16-04`** | Nâng Cấp Shared UI Components Chuẩn WCAG 2.1 AA | TSK-P16-02 | `DONE` | Hoàn thiện `AppButton` (micro-interactions, touch target 44px), `AppInput`, `AppSelect`, `AppTextarea` (liên kết label `htmlFor`, focus ring phát sáng), `StatusBadge`, `StatCard`, `Modal`, `DataTable`. |
| **`TSK-P16-05`** | Tái Cấu Trúc MainLayout & Giao Diện Trang Chủ HomePage | TSK-P16-03..04 | `DONE` | Tái thiết kế Header phong cách Cổng thông tin Quốc gia, thanh Workspace Bar phân chia 4 phân hệ, Hero Banner uy tín, lộ trình 4 bước và lưới các phân hệ Modular Monolith. |
| **`TSK-P16-06`** | Đóng Gói Docker Frontend & Kiểm Thử Runtime | TSK-P16-05 | `DONE` | Biên dịch `tsc -b && vite build` 0 lỗi; đóng gói container Nginx `gplx-frontend` v1.9.0; phản hồi HTTP 200 OK tại cổng 3000 kết nối backend 8088. |
| **`TSK-P16-07`** | Tái Cấu Trúc Menu Góc Trái & Khu Vực Quản Lý Tài Khoản / Người Dùng Góc Phải | TSK-P16-05 | `DONE` | Bố trí thanh menu và drawer bên góc trái; đưa nút Đăng nhập/Đăng ký sang góc phải; sau đăng nhập hiển thị UserAccountMenu góc phải kèm quản lý tài khoản (hồ sơ, đổi mật khẩu) và quản lý người dùng hệ thống. |
| **`TSK-P16-08`** | Tái Cấu Trúc Trang Đầu Tiên Thành Landing Page Quảng Cáo Vào Đăng Ký / Đăng Nhập & Khóa Quyền Module | TSK-P16-07 | `DONE` | Thiết kế lại toàn diện HomePage.tsx thành Landing Page quảng cáo: Hero Banner nổi bật với 2 nút CTA Đăng ký / Đăng nhập, 4 chỉ số chất lượng, 4 trụ cột lợi thế đào tạo, Showcase 4 hạng GPLX (A1, B1, B2 - Popular, C), Lộ trình 4 bước, Đánh giá học viên & Cam kết 3 Không, Banner chuyển đổi cuối trang; ẩn hoàn toàn nút menu danh mục và các liên kết module ở Header khi chưa đăng nhập; bọc toàn bộ 16 routes module bằng `ProtectedRoute` chặn truy cập trực tiếp khi chưa đăng nhập. |


---

## Danh mục Tasks — Phase 17: Phân Hệ Ôn Tập GPLX — Spaced Repetition & Củng Cố Kiến Thức (Full-Stack)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P17-01`** | Database Migration V12 & Domain Entities Spaced Repetition | TSK-P16-07 | `DONE` | Flyway V12 tạo 3 bảng (`question_retention_states`, `review_sessions`, `review_session_answers`); Entity `QuestionRetentionState` thực thi thuật toán Leitner 5 hộp, chu kỳ 1->3->7->14->30 ngày và công thức tính điểm ưu tiên (`priorityScore`). |
| **`TSK-P17-02`** | Infrastructure Repositories & Dữ Liệu Lịch Sử | TSK-P17-01 | `DONE` | Khởi tạo 3 repositories Spring Data JPA; bổ sung query truy vấn danh sách câu hỏi đã đánh dấu; đồng bộ tự động câu sai từ lịch sử làm bài `PracticeAnswer`. |
| **`TSK-P17-03`** | Application Service & DTOs Nghiệp Vụ Ôn Tập | TSK-P17-02 | `DONE` | `TheoryReviewService` và `TheoryReviewServiceImpl`: Tổng quan chỉ số Dashboard, sinh hàng đợi ôn tập thông minh (Smart Review Queue), chấm điểm và cập nhật chu kỳ ngắt quãng, tổng kết và đưa ra gợi ý củng cố. |
| **`TSK-P17-04`** | REST API Controller Chuẩn OpenAPI 3.1.1 | TSK-P17-03 | `DONE` | `TheoryReviewController` cung cấp 10 endpoints tại `/api/v1/review/**`: Overview, Danh sách câu sai, 60 câu điểm liệt, Danh sách bookmark, Thống kê 7 chủ đề, Bắt đầu phiên, Nộp đáp án tức thì, Hoàn tất phiên, Lịch sử phiên ôn. |
| **`TSK-P17-05`** | Backend Unit Tests Suite | TSK-P17-03 | `DONE` | Khởi tạo `TheoryReviewServiceTest`: 5 kịch bản kiểm thử (Leitner thăng/hạ hộp khi trả lời đúng/sai, reset chu kỳ, Dashboard cho học viên mới, tạo phiên ôn thông minh, hoàn thành phiên và gợi ý bước tiếp theo). |
| **`TSK-P17-06`** | Frontend Giao Diện Ôn Tập React 19 + TypeScript | TSK-P17-04 | `DONE` | `TheoryReviewPage.tsx` và `reviewService.ts`: Dashboard 6 thẻ KPI, 6 tab nghiệp vụ (Tổng quan, Ôn câu sai, Ôn điểm liệt, Ôn câu đã lưu, Ôn theo 7 chủ đề, Lịch sử phiên ôn) + Màn hình phiên ôn trực tiếp với phản hồi tức thì, Leitner box level và giải thích pháp lý. |
| **`TSK-P17-07`** | Điều Hướng Routing, Layout & Kiểm Thử Tích Hợp E2E | TSK-P17-05..06 | `DONE` | Tích hợp route `/student/review` và `/theory-review` vào `App.tsx`; bổ sung liên kết vào Header, Drawer góc trái, Workspace bar học viên và `HomePage.tsx`; đóng gói Docker container và chạy kiểm thử E2E 8/8 bước thành công 100%. |


---

## Danh mục Tasks — Phase 18: Phân Hệ Đào Tạo Xe Thô (Raw Vehicle Familiarization Training — Full-Stack)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P18-01`** | Nghiệp Vụ & Pháp Lý Đào Tạo Xe Thô & Mô Hình Tiến Độ Độc Lập | TSK-P17-07 | `DONE` | Xây dựng tài liệu `docs/training/raw-vehicle-training.md`, `docs/training/training-progress-model.md`, `docs/legal/raw-vehicle-training-rules.md`; xác định rõ "Xe thô" là thuật ngữ nội bộ (`INTERNAL_RULE`), tiến độ độc lập hoàn toàn với lý thuyết (học song song, không khóa tiến độ, hoàn thành xe thô không tự động đủ điều kiện dự thi). |
| **`TSK-P18-02`** | Database Migration V13 & Seed Khung 8 Giai Đoạn Kỹ Năng | TSK-P18-01 | `DONE` | Flyway V13 tạo 6 bảng (`raw_vehicle_stages`, `raw_vehicle_enrollments`, `raw_vehicle_sessions`, `raw_vehicle_session_attendees`, `raw_vehicle_skill_evaluations`, `raw_vehicle_session_change_logs`); seed 8 giai đoạn làm quen xe ban đầu chuẩn hóa thời lượng và ghi chú an toàn. |
| **`TSK-P18-03`** | Domain Entities, Enums & Repositories Backend | TSK-P18-02 | `DONE` | Khởi tạo 6 JPA Entities, 4 Enums (`RawVehicleEnrollmentStatus`, `RawVehicleSessionStatus`, `AttendeeAttendanceStatus`, `SkillEvaluationStatus`) và 6 Spring Data JPA Repositories theo chuẩn Modular Monolith Rule 02. |
| **`TSK-P18-04`** | Application Service, An Toàn Kiểm Định FLT-001 & Thời Lượng Thực Tế | TSK-P18-03 | `DONE` | `RawVehicleTrainingServiceImpl`: Kiểm tra chặn xếp trùng lịch giáo viên, chặn phương tiện bảo dưỡng hoặc hết hạn kiểm định an toàn (FLT-001); tính thời lượng thực tế chính xác theo phút giữa giờ bắt đầu - kết thúc thực tế; chỉ tích lũy thời lượng cho học viên có mặt (`PRESENT`); ghi nhận audit log thay đổi lịch. |
| **`TSK-P18-05`** | REST API Controllers Cho 3 Phân Quyền (Học Viên, Giáo Viên, Quản Lý) | TSK-P18-04 | `DONE` | `RawVehicleStudentController` (`/student/**`), `RawVehicleInstructorController` (`/instructor/**`), `RawVehicleManagerController` (`/manager/**`) cung cấp đầy đủ API nghiệp vụ kèm bảo mật Spring Security RBAC. |
| **`TSK-P18-06`** | Backend Unit Tests Suite (RawVehicleTrainingServiceTest) | TSK-P18-04 | `DONE` | Khởi tạo 6 unit tests bao phủ 100% kịch bản trọng yếu: Đăng ký học viên, chặn trùng lặp active enrollment, chặn xung đột giáo viên, chặn xe hết hạn đăng kiểm an toàn, điểm danh & tích lũy phút thực tế, đánh giá kỹ năng 1-5 sao. Kết quả: 6/6 tests PASS. |
| **`TSK-P18-07`** | Frontend Giao Diện React 19 + TypeScript (3 Trang Chuyên Biệt) | TSK-P18-05 | `DONE` | `rawVehicleService.ts`, `rawVehicle.ts`, `RawVehicleStudentPage.tsx`, `RawVehicleInstructorPage.tsx`, `RawVehicleManagerPage.tsx`, `RawVehicle.module.css` theo phong cách `ui-ux-pro-max`, hỗ trợ điểm danh, tính thời lượng, đánh giá 1-5 sao và modal audit log. |
| **`TSK-P18-08`** | Tích Hợp Routing, MainLayout (Header, Drawer, Workspace) & Đóng Gói Docker | TSK-P18-06..07 | `DONE` | Bổ sung 3 routes mới được bảo vệ bởi `ProtectedRoute` trong `App.tsx`; tích hợp vào Header điều hướng, thanh Drawer danh mục góc trái và Workspace Bar phân quyền; build Docker frontend và backend thành công 100%. |

---

## Danh mục Tasks — Phase 19: Thu Thập 600 Câu Chuẩn CSGT, Tái Cấu Trúc Thi Thử Vào Ôn Tập & Giao Diện Mới

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P19-01`** | Thu Thập & Xác Thực 600 Câu Hỏi CSGT (CV 2262/CSGT-P5) | TSK-P18-08 | `DONE` | Thu thập 600 câu hỏi, 60 câu điểm liệt, 1.858 đáp án và 315 ảnh sa hình/biển báo; kiểm định 24/24 test bằng script xác thực tự động; nạp trọn vẹn dữ liệu UTF-8 vào MySQL 8.4 LTS. |
| **`TSK-P19-02`** | Chuyển Đổi "Thi Thử 600 Câu" Sang "Lý Thuyết" & Tích Hợp 20 Bộ Đề Vào Ôn Tập | TSK-P19-01 | `DONE` | Thay liên kết `/theory-exam` thành `/theory` trên thanh điều hướng; chuyển chức năng thi thử ngẫu nhiên từ 20 bộ đề mẫu chuẩn vào module Ôn tập (`/student/review?tab=MOCK_EXAM_SETS`) với đồng hồ đếm ngược, bảng 35 ô số và phân tích kết quả đỗ/trượt điểm liệt. |
| **`TSK-P19-03`** | Tái Thiết Kế Header & Hệ Thống Theme Light/Dark | TSK-P19-02 | `DONE` | Header hiện đại: Logo tròn 4 màu CSGT "600 Ôn Thi GPLX", menu trung tâm dạng Pill, nút chuyển đổi Light/Dark theme đồng bộ `localStorage` và CSS tokens. |
| **`TSK-P19-04`** | Tái Thiết Kế Trang Chủ Theo Mẫu Cổng Ôn Thi CSGT 2026 | TSK-P19-03 | `DONE` | Hero Ribbon CSGT, Tiêu đề tích xanh chuẩn, Floating Config Capsule chọn hạng (A1, A2, B1, B, C) kèm 4 chỉ số đề thi thời gian thực, 2 Card Hero Lộ trình đậu bằng & Thi thử Online gradient, bố trí 4 phân hệ đào tạo sinh thái. |
| **`TSK-P19-05`** | Biên Dịch Production & Đóng Gói Docker Compose | TSK-P19-04 | `DONE` | `tsc -b && vite build` hoàn tất 0 lỗi; container frontend `gplx-frontend:3000` và backend `gplx-backend:8088` chạy Healthy, phản hồi HTTP 200 OK. |
| **`TSK-P19-06`** | Tích Hợp Motion Design & Animation Động Cho Giao Diện | TSK-P19-05 | `DONE` | Ambient Glow pulse 8s, Badge tích xanh và Ribbon nhịp thở, Sóng định vị radar Trạm 1 (`radarPing`), Xe ô tô lăn bánh nhấp nhô (`floatCar`), Thẻ thi thử gradient chuyển sắc & CTA Shimmer ánh sáng quét, Micro-interactions Logo/Theme/Cards hover lift. |

---

## Danh mục Tasks — Phase 20: Xây Dựng Giao Diện Ôn Thi EdTech Phong Cách OnThiGPLX

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P20-01`** | Phân Hệ Tra Cứu Biển Báo Giao Thông Đường Bộ (`/road-signs`) | TSK-P19-06 | `DONE` | 30+ biển báo theo QCVN 41:2019/BGTVT, phân chia 5 nhóm (Cấm, Nguy hiểm, Hiệu lệnh, Chỉ dẫn, Phụ), SVG vector render, thanh tìm kiếm mã/tên, modal phóng to chi tiết. |
| **`TSK-P20-02`** | Phân Hệ Mẹo Thi Lý Thuyết & Sa Hình (`/tips`) | TSK-P20-01 | `DONE` | Kho mẹo thi: Từ khóa vàng, Quy tắc 5 bước giải sa hình (Nhất chớm, Nhì ưu...), Cấm nhỏ cấm lớn, Độ tuổi, Tốc độ, Khoảng cách và 60 câu điểm liệt. |
| **`TSK-P20-03`** | Tái Cấu Trúc Trang Chủ & 6 Box Chức Năng Chuẩn OnThiGPLX | TSK-P20-02 | `DONE` | Bổ sung 6 khối chức năng EdTech trên trang chủ, quy trình 4 bước ôn thi, FAQ giải đáp thắc mắc và Footer hệ thống đầy đủ thông tin pháp lý. |
| **`TSK-P20-04`** | Biên Dịch & Đóng Gói Container Frontend Nginx | TSK-P20-03 | `DONE` | `tsc -b && vite build` hoàn tất 0 lỗi; container `gplx-frontend:3000` chạy Healthy, kiểm thử HTTP 200 OK. |

---

## Danh mục Tasks — Phase 21: Chuẩn Hóa Toàn Diện Giao Diện Bằng UI/UX Pro Max

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P21-01`** | Chuẩn Hóa Bộ Icons SVG Đồng Bộ & Pre-Delivery Checklist | TSK-P20-04 | `DONE` | Bổ sung đầy đủ 10+ icon SVG mới trong `Icons.tsx` (`Lightbulb`, `Clock`, `Zap`, `AlertOctagon`, `RotateCcw`, `Trophy`, `HelpCircle`, `Check`...); loại bỏ 100% emoji rời rạc trong giao diện. |
| **`TSK-P21-02`** | Tái Cấu Trúc Bento Grid & Visual Hierarchy Toàn Hệ Thống | TSK-P21-01 | `DONE` | Chuẩn hóa Bento Grid trên Trang chủ, Mẹo thi và Biển báo; đồng nhất độ tương phản WCAG 2.1 AA, hover state mượt mà, focus-visible cho bàn phím. |
| **`TSK-P21-03`** | Đóng Gói Container Frontend & Kiểm Thử Runtime | TSK-P21-02 | `DONE` | `tsc -b && vite build` hoàn tất 0 lỗi; container `gplx-frontend:3000` phản hồi HTTP 200 OK, đồng bộ Dark/Light theme. |

---

## Danh mục Tasks — Phase 22: Tái Cấu Trúc Component & Visual Design Modern SaaS (Blue–Purple Gradient & Soft Glassmorphism)

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P22-01`** | Tái Cấu Trúc Kiến Trúc Component Độc Lập | TSK-P21-03 | `DONE` | Tách rời các module giao diện thành các components độc lập tại `frontend/src/components/home/` và `frontend/src/components/layout/`: `Navbar.tsx`, `HeroSection.tsx`, `LicenseCategorySelector.tsx`, `StatisticsBar.tsx`, `ConfigCapsuleBar.tsx`, `LearningRoadmapCard.tsx`, `MockExamCard.tsx`, `EdTechToolsSection.tsx`, `StudyWorkflowSection.tsx`, `FAQSection.tsx`, `ThemeToggle.tsx`, `Footer.tsx`. |
| **`TSK-P22-02`** | Hệ Thống Token Màu Sắc Chuẩn Xác Theo Master Prompt | TSK-P22-01 | `DONE` | Cập nhật `tokens.css` với hệ màu Modern SaaS EdTech: Light Mode (nền gradient `#DCEBFF` đến `#F0E4FF`, primary `#165DFF`, surface kính mờ `rgba(255,255,255,0.82)`, viền `rgba(255,255,255,0.75)`), Dark Mode (nền gradient `#0B1B46` đến `#17112F`, surface `#172544`, accent `#4D9BFF`, violet `#8B7CFF`, viền `rgba(148,163,184,0.18)`). |
| **`TSK-P22-03`** | Bố Trí Layout Desktop Tỷ Lệ 62% / 38% & Soft Glassmorphism | TSK-P22-02 | `DONE` | Thiết lập Bento Grid chuẩn với tỷ lệ 62% Lộ trình học 3 trạm và 38% Thi thử Online gradient, bo góc 24-28px, hiệu ứng đổ bóng đa tầng và kính mờ blur 20px. |
| **`TSK-P22-04`** | Tích Hợp Navbar 78px & Footer Chuẩn SaaS | TSK-P22-03 | `DONE` | Navbar kính mờ 78px, logo tròn 600 đa sắc, text thương hiệu *"Ôn Thi GPLX"*, menu điều hướng pill, social Facebook/TikTok, ThemeToggle, tích hợp đầy đủ vào `MainLayout.tsx` và `Footer.tsx`. |
| **`TSK-P22-05`** | Biên Dịch TypeScript, Build & Kiểm Thử Runtime Container | TSK-P22-04 | `DONE` | `tsc -b && vite build` thành công 0 lỗi; container Docker `gplx-frontend:3000` chạy Healthy, phản hồi HTTP 200 OK. |

---

## Danh mục Tasks — Phase 23: Phân Hệ Quảng Cáo & Tiếp Nhận, Quản Lý Hồ Sơ Đào Tạo Lái Xe Điện Tử

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P23-01`** | Thiết Kế Giao Diện Quảng Cáo Tiếp Nhận Hồ Sơ (`AdmissionPromoSection`) | TSK-P22-05 | `DONE` | Khởi tạo component `AdmissionPromoSection.tsx` & `AdmissionPromoSection.module.css` theo phong cách Modern SaaS Soft Glassmorphism, 4 trụ cột nghiệp vụ (100% online, liên thông GKSK, theo dõi 4 giai đoạn, học phí điện tử). |
| **`TSK-P23-02`** | Xây Dựng Thẻ Mô Phỏng Hồ Sơ Mẫu Trực Quan (Interactive Mockup) | TSK-P23-01 | `DONE` | Thẻ mô phỏng hồ sơ điện tử `HS-B2-2026-0899` với huy hiệu trạng thái `APPROVED` nhấp nháy, thông tin học viên, khóa học và stepper timeline 4 chặng thẩm định. |
| **`TSK-P23-03`** | Nâng Cấp Điều Hướng Header & Tích Hợp Định Tuyến Song Song | TSK-P23-02 | `DONE` | Thêm nút *"Nộp hồ sơ"* có badge *"Trực tuyến"* trên `Navbar.tsx`; bổ sung route alias `/submit-application` song song với `/admissions/new` trong `App.tsx`. |
| **`TSK-P23-04`** | Tích Hợp Vào Trang Chủ & Đóng Gói Container Docker | TSK-P23-03 | `DONE` | Tích hợp vào `HomePage.tsx`; biên dịch production (`tsc -b && vite build`) thành công 0 lỗi; container `gplx-frontend:3000` chạy Healthy, kiểm thử HTTP 200 OK. |

---

## Danh mục Tasks — Phase 24: Phân Hệ Toàn Diện Quảng Bá Khóa Học, CRM Tuyển Sinh & Quản Lý Hồ Sơ Học Viên

| Task ID | Tên công việc | Phụ thuộc | Trạng thái | Tiêu chí nghiệm thu (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **`TSK-P24-01`** | Migration V14 & Schema CRM Leads & Course Marketing | TSK-P23-04 | `DONE` | Tạo bảng `crm_leads`, `crm_lead_interactions`, mở rộng `courses` (marketing fields: slug, tuition_fee, expected_start_date...), mở rộng `admission_applications` (tracking_token, preferred_schedule, enrolled_class_id...), enum `RESUBMITTED`, `ENROLLED`. |
| **`TSK-P24-02`** | Backend CRM Tuyển Sinh & Dashboard Analytics | TSK-P24-01 | `DONE` | Module `crm` với `CrmLeadService`, `CrmLeadController`, `PublicCrmController`: gửi yêu cầu tư vấn, cập nhật trạng thái leads, ghi log cuộc gọi/zalo, dashboard stats realtime. Unit test 3/3 PASS. |
| **`TSK-P24-03`** | Backend Tuyển Sinh Trực Tuyến Công Khai & Xếp Lớp | TSK-P24-01 | `DONE` | `PublicAdmissionController`: Nộp hồ sơ công khai sinh mã `APP-...` & `tracking_token`, tra cứu an toàn theo SĐT/token che PII, bổ sung hồ sơ trực tuyến, API xếp lớp đào tạo `TrainingClass` cho cán bộ tuyển sinh. Unit test 6/6 PASS. |
| **`TSK-P24-04`** | Frontend Danh Mục & Chi Tiết Khóa Học Tuyển Sinh | TSK-P24-02 | `DONE` | `CoursesPage.tsx` dạng thẻ khóa học kèm học phí/lịch khai giảng/địa điểm, `CourseDetailPage.tsx` theo slug SEO, `ConsultationModal.tsx` gửi yêu cầu tư vấn nhanh từ mọi trang. |
| **`TSK-P24-05`** | Frontend Stepper Nộp Hồ Sơ Trực Tuyến 4 Bước (`/apply`) | TSK-P24-03 | `DONE` | `ApplyPage.tsx`: Chọn khóa học & lịch học, thông tin cá nhân & kiểm tra độ tuổi tự động, upload checklist tài liệu, đồng thuận xử lý dữ liệu Nghị định 13/2023/NĐ-CP, màn hình hoàn tất kèm mã hồ sơ & tracking token. |
| **`TSK-P24-06`** | Frontend Tra Cứu Tiến Độ Hồ Sơ & Nộp Bổ Sung (`/application-status`) | TSK-P24-03 | `DONE` | `ApplicationStatusPage.tsx`: Tra cứu an toàn theo mã hồ sơ + SĐT/token, hiển thị stepper tiến trình, form upload tài liệu bổ sung khi trạng thái `SUPPLEMENT_REQUIRED`. |
| **`TSK-P24-07`** | Frontend CRM Leads & Dashboard Tuyển Sinh Cán Bộ | TSK-P24-02 | `DONE` | `AdmissionDashboardPage.tsx` biểu đồ KPI tuyển sinh & chuyển đổi realtime; `CrmLeadsPage.tsx` quản lý khách hàng tiềm năng & tương tác; `ApplicationManagementPage.tsx` thẩm định và xếp lớp học viên chính thức. |
| **`TSK-P24-08`** | Biên Dịch Production, Kiểm Thử Tích Hợp & Đóng Gói Docker Compose | TSK-P24-07 | `DONE` | `tsc -b && vite build` 0 lỗi; rebuild và restart các container; kiểm thử API endpoints qua curl/REST thành công; các service chạy Healthy. |


## Module luyện sa hình trực tuyến với xe ảo

| Task ID | Công việc | Trạng thái | Tiêu chí / hiện trạng |
| :--- | :--- | :--- | :--- |
| SIM-01 | Mô phỏng 2D theo hạng xe, điều khiển bàn phím/cảm ứng, bài luyện tuần tự | IN_PROGRESS | Đã triển khai engine, giao diện, route/menu; 6/6 unit tests PASS, TypeScript và Vite build Docker PASS; Chrome smoke bàn phím/nút giữ ga và danh mục thật PASS ở 375/768/1440px. Chờ cảm ứng thiết bị thật/đánh giá mô hình với giáo viên; chưa đạt DoD toàn bộ module. |
| SIM-02 | Lưu lịch sử luyện và quản lý cấu hình xe/bài tập trên backend | TODO | Phân quyền theo tài khoản, migration, API và kiểm thử tích hợp. |
| SIM-03 | Sa hình chuẩn và mô hình nâng cao | TODO | Xác minh pháp lý, đối chiếu với giáo viên trước khi mô hình hóa; không quy đổi dữ liệu mô phỏng thành DAT. |

Thiết kế và giới hạn: `docs/architecture/driving-simulation.md`.


## Điều hướng theo vai trò — 29/10/2026

| Task ID | Công việc | Trạng thái | Tiêu chí / kiểm chứng |
| :--- | :--- | :--- | :--- |
| NAV-01 | Đồng bộ quyền frontend và tổ chức menu cho 7 vai trò | DONE | Bảng quyền dùng chung cho menu/route/alias, phân nhóm, menu tài khoản/footer, từ chối sai quyền, hợp nhiều vai trò. 12/12 unit tests PASS. |
| NAV-02 | Khôi phục mục sa hình trên giao diện đang chạy | DONE | Lối tắt rõ trên desktop/mobile, sửa DTO active; production Docker build và recreate frontend. Chrome 21/21 tổ hợp vai trò/viewport + guest PASS, sa hình dùng danh mục thật, phím và nút giữ ga hoạt động. |

Ma trận: `docs/architecture/role-navigation.md`. Phạm vi kiểm chứng frontend và giới hạn backend: `docs/testing/role-navigation.md`.


## MVP sa hình 3D — 29/10/2026

| Task ID | Công việc | Trạng thái | Phạm vi / nghiệm thu |
| :--- | :--- | :--- | :--- |
| SIM3D-01 | Kiến trúc, xe/sân 3D, vật lý cơ bản và input/camera | DONE (MVP) | Tách module, sáu hạng, ba camera, physics 60 Hz; TypeScript/build PASS, Chrome WebGL2/camera/input PASS. |
| SIM3D-02 | Ba bài đầu, cảm biến, luật có phiên bản và HUD | DONE (MVP) | 58/58 kiểm thử phần bị ảnh hưởng PASS; Chrome phát hiện lỗi/trừ điểm PASS.  Xuất phát/người đi bộ/ngang dốc; bundle có nguồn và thời hạn, profile từng hạng, không suy đoán điểm phạt. |
| SIM3D-03 | Lịch sử cục bộ, replay, nhập sân giới hạn và source ZIP độc lập | DONE (MVP) | Chrome lưu/reload/replay/seek/validation PASS.  5 phiên trong IndexedDB; snapshot/seek/import/export, schema Layout v1; ZIP đã npm ci + build trên container sạch. |
| SIM3D-04 | Hoàn thiện toàn bộ bài thi, hiệu chuẩn xe/sân và backend | TODO | Các bài còn lại, detector đỏ/đường sắt/ghép xe, sân nhiều nhánh/CAD, động lực học nâng cao, hiệu chuẩn với giáo viên; server sở hữu dữ liệu/audit/chống sửa. Không coi MVP là hoàn thành toàn bộ ứng dụng sát hạch. |

Hướng dẫn: `docs/training/simulation3d-mvp.md`; kiểm chứng và giới hạn: `docs/testing/simulation3d-mvp.md`.

## Danh mục GPLX 2026 và nhập ngân hàng từ PDF — 29/10/2026

| Task ID | Công việc | Trạng thái | Nghiệm thu |
|---|---|---|---|
| CAT-2026-01 | Chuẩn hóa 15 hạng, phân biệt B1 mô tô và B1 ô tô lịch sử | DONE | V15; trang /license-categories; bộ chọn dùng danh mục chung; giữ ID hồ sơ/khóa học cũ, 15 hạng hoạt động qua API thực. |
| LRN-PDF-01 | Nhập 600 câu/đáp án/hình từ PDF người dùng | DONE | Phiên bản PDF-2025-6a6dab85; 6 chương; 318 câu có hình; mỗi câu một đáp án gạch chân; lưu hash/trang nguồn; V16 giữ 600 câu cũ. |
| LRN-PDF-02 | Phạm vi và điểm liệt theo hạng, cấu trúc thi có thời hạn | DONE | 250/300/600 và 20/30/60 theo phụ lục; 15 cấu hình thi, V17 hết hạn 28/02/2027; 23 test Java, 4 Python, API thực 15 hạng đạt. |
| INFRA-SEED-14 | Xử lý tham chiếu user mẫu CRM của V14 trên database trắng | TODO | Cài trắng hiện lỗi FK assigned_to trước V15; nâng cấp từ dữ liệu V14 hiện hữu đã đạt. Không sửa checksum migration đã chạy. |

Kiến trúc, giới hạn và thao tác: `docs/architecture/pdf-question-bank.md`; pháp lý: `docs/legal/pdf-question-bank.md`; bằng chứng: `docs/testing/pdf-question-bank.md`.

### Kiểm chứng trước commit — 30/10/2026

- Backend: 96/96 tests PASS; frontend điều hướng/mô phỏng: 58/58 PASS; dữ liệu PDF: 4/4 PASS.
- Production frontend build PASS trong container Node 20 sạch, cài dependency bằng `npm ci`; còn cảnh báo kích thước bundle.
- INFRA-SEED-14 giữ TODO. Bộ test H2 không thay thế kiểm chứng Flyway trên MySQL trắng; đợt commit này không xác nhận đủ điều kiện triển khai production.
