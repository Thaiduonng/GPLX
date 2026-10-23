# Nhật ký Thay đổi (Changelog)

Toàn bộ các cập nhật quan trọng của dự án sẽ được ghi nhận tại đây theo chuẩn [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.0] — 2026-10-23

### Phát hành Chính thức Nghiệm thu Đồ án (Phase 7 — Final Polish & Release v1.0.0)
- **Đóng gói & Triển khai Production:**
  - Hoàn thiện Dockerfile Multi-stage build cho Backend (`infra/docker/backend.Dockerfile`): Tận dụng Eclipse Temurin 21 JDK để build Maven và Eclipse Temurin 21 JRE runtime tối ưu kích thước, bảo mật chạy dưới quyền non-root `appuser`.
  - Hoàn thiện Dockerfile Multi-stage build cho Frontend (`infra/docker/frontend.Dockerfile`): Node 20 Alpine build bundle tĩnh và Nginx Alpine siêu nhẹ phục vụ production.
  - Cấu hình Nginx (`frontend/nginx.conf` & `infra/docker/nginx.conf`): Hỗ trợ React Router SPA Fallback (`try_files $uri $uri/ /index.html;`), cấu hình nén Gzip và Reverse Proxy bảo mật đến Backend `/api/` và Swagger UI.
  - Cập nhật `docker-compose.yml`: Khởi chạy 1-click toàn diện 3 dịch vụ liên thông (`mysql:8.4`, `gplx-backend`, `gplx-frontend`) kèm cơ chế Health Check tự động.
- **Tài liệu & Nghiệm thu:**
  - Cập nhật `README.md` hướng dẫn chi tiết khởi chạy 1-click, tài khoản kiểm thử mặc định cho 7 vai trò, danh mục API và quy trình test tự động.
  - Hoàn tất toàn bộ backlog trong `docs/backlog/tasks.md` (từ `TSK-P0-01` đến `TSK-P7-02` đều đạt trạng thái `DONE`).
- **Chất lượng Mã nguồn:**
  - Đạt 100% tỷ lệ pass kiểm thử tự động: **66/66 test cases** trên nền Java 21, Spring Boot 4.1.1 và MySQL 8.4 LTS.

## [0.7.0] — 2026-10-23

### Báo cáo Quản trị & Nhật ký Kiểm toán (Phase 6 — Reporting & Audit Logging)
- **Cơ sở dữ liệu & Migration:**
  - Bổ sung Flyway migration `V7__create_reporting_and_audit_tables.sql` tạo bảng `audit_logs` (lưu vết thao tác: `user_id`, `username`, `action`, `resource_type`, `resource_id`, `details`, `ip_address`, `created_at`).
  - Seed các bản ghi audit log mẫu cho các hành động quan trọng (duyệt hồ sơ, xếp lịch thi, ghi nhận điểm sát hạch, thu học phí, phân công xe tập lái).
- **Nghiệp vụ & Tuân thủ Quy tắc:**
  - `ReportingService` tổng hợp KPI quản trị đa chiều liên module theo thời gian thực:
    - Tổng số học viên và phân bố hồ sơ tuyển sinh (Tổng số / Đã phê duyệt).
    - Thí sinh dự thi và tỷ lệ đỗ sát hạch toàn hệ thống cũng như chi tiết theo từng hạng bằng (A1, B1, B2, C...).
    - Doanh thu học phí thực tế đã thu qua các biên lai xác nhận.
    - Quãng đường thực hành lái xe DAT (km) tích lũy toàn khóa.
    - Trạng thái đội xe tập lái: số xe đang sẵn sàng hoạt động so với tổng số xe.
  - Kiểm toán và truy vết: Cung cấp API và giao diện lọc nhật ký kiểm toán theo phân hệ (`ADMISSION`, `EXAMINATION`, `FINANCE`, `FLEET`, `TRAINING`) và hành động cụ thể.
- **REST API (`/api/v1/reporting`):**
  - `GET /api/v1/reporting/dashboard`: Lấy dữ liệu tổng hợp KPI cho dashboard quản trị (phân quyền `ADMIN`, `MANAGER`).
  - `GET /api/v1/reporting/audit-logs`: Tra cứu nhật ký kiểm toán với phân trang và bộ lọc linh hoạt (phân quyền `ADMIN`, `MANAGER`).
- **Frontend (React 19 + TypeScript):**
  - Xây dựng types `types/reporting.ts` và service `reportingService.ts`.
  - Trang Dashboard Quản Trị (`DashboardPage.tsx`): 6 thẻ KPI trực quan, bảng thống kê tỷ lệ đỗ theo từng hạng GPLX kèm thanh tiến trình màu sắc, bảng 8 hoạt động kiểm toán gần nhất.
  - Trang Nhật Ký Kiểm Toán (`AuditLogPage.tsx`): Tra cứu toàn diện, lọc theo module, hành động, phân trang linh hoạt.
  - Cập nhật `MainLayout.tsx` và `App.tsx` với quyền truy cập chuyên biệt cho cán bộ quản lý (`ADMIN`, `MANAGER`).
- **Kiểm thử Tự động:**
  - 7 bài kiểm thử mới (`ReportingServiceTest`, `ReportingControllerTest`).
  - Toàn bộ 66/66 test cases của hệ thống đạt tỷ lệ 100% Passed.

## [0.6.0] — 2026-10-23

### Các Module Hỗ trợ: Tài chính & Quản lý Đội xe (Phase 5 — Finance & Fleet)
- **Cơ sở dữ liệu & Migration:**
  - Bổ sung Flyway migration `V6__create_support_modules_tables.sql` tạo 6 bảng nghiệp vụ:
    - Module Finance: `fee_invoices` (hóa đơn học phí, tổng tiền, tiền đã nộp, trạng thái PENDING, PARTIALLY_PAID, PAID), `payment_receipts` (biên lai nộp tiền, idempotency_key, hình thức thanh toán).
    - Module Fleet: `vehicles` (quản lý xe tập lái, biển số, hộp số sàn/tự động, hạng bằng tương ứng, hạn đăng kiểm, trạng thái), `vehicle_maintenances` (lịch sử bảo dưỡng định kỳ và sửa chữa).
    - Module Notification & CRM: `notifications` (thông báo nội bộ, chống gửi trùng `deduplication_key`), `crm_leads` (khách hàng tiềm năng, trạng thái tư vấn).
  - Seed dữ liệu 4 xe tập lái mẫu các hạng B1, B, C, A1.
- **Nghiệp vụ & Tuân thủ Quy tắc:**
  - `FIN-001`: Triển khai cơ chế Idempotency Key duy nhất cho mỗi giao dịch nộp tiền học phí, bảo đảm chống thanh toán trùng lặp khi người dùng click liên tiếp hoặc lỗi mạng.
  - `FIN-002`: Không cho phép xóa bản ghi biên lai tài chính đã được xác nhận trong hệ thống; bảo toàn truy vết kiểm toán dòng tiền.
  - Chặn thanh toán vượt quá số tiền còn nợ của hóa đơn; tự động chuyển trạng thái hóa đơn sang `PAID` khi hoàn tất 100% học phí.
  - `FLT-001`: Tự động loại trừ phương tiện hết hạn kiểm định an toàn kỹ thuật (đăng kiểm) hoặc đang trong lịch bảo dưỡng (`MAINTENANCE`) khỏi danh sách xe sẵn sàng phục vụ thực hành DAT/sa hình.
- **REST API (`/api/v1`):**
  - Finance API (`/api/v1/finance`):
    - `POST /api/v1/finance/invoices`: Tạo hóa đơn học phí cho học viên (Role `ADMIN`, `STAFF`, `MANAGER`).
    - `GET /api/v1/finance/invoices`: Danh sách toàn bộ hóa đơn học phí (Phân quyền quản lý).
    - `GET /api/v1/finance/invoices/my`: Học viên tra cứu hóa đơn học phí của chính mình.
    - `POST /api/v1/finance/invoices/{id}/pay`: Ghi nhận biên lai nộp tiền học phí kèm Idempotency Key (`FIN-001`).
    - `GET /api/v1/finance/invoices/{id}/receipts`: Xem lịch sử các đợt nộp học phí.
  - Fleet API (`/api/v1/fleet`):
    - `GET /api/v1/fleet/available`: Công khai danh sách xe tập lái sẵn sàng hoạt động (còn hạn đăng kiểm - `FLT-001`).
    - `GET /api/v1/fleet`: Quản lý danh sách toàn bộ phương tiện trong đội xe.
    - `POST /api/v1/fleet`: Thêm xe mới vào đội xe (Role `ADMIN`, `MANAGER`).
    - `PATCH /api/v1/fleet/{id}/status`: Cập nhật trạng thái xe (`AVAILABLE`, `MAINTENANCE`, `IN_USE`).
    - `POST /api/v1/fleet/{id}/maintenances`: Ghi nhận lịch bảo dưỡng/sửa chữa xe.
    - `GET /api/v1/fleet/{id}/maintenances`: Xem lịch sử bảo dưỡng phương tiện.
- **Frontend (React 19 + TypeScript):**
  - Xây dựng types `types/finance.ts`, `types/fleet.ts` và services `financeService.ts`, `fleetService.ts`.
  - Trang Quản lý Học phí & Biên lai (`TuitionPaymentPage.tsx`): Tra cứu hóa đơn học phí, theo dõi dư nợ, modal nộp tiền học phí an toàn với Idempotency Key tự sinh.
  - Trang Quản lý Đội xe tập lái (`FleetManagementPage.tsx`): Theo dõi danh sách xe, cảnh báo trực quan xe quá hạn đăng kiểm (`FLT-001`), modal ghi nhận bảo dưỡng định kỳ.
- **Kiểm thử:**
  - 9 test cases mới (`FinanceServiceTest`, `FleetServiceTest`, `FinanceAndFleetIntegrationTest`).
  - Toàn bộ 59/59 test cases của hệ thống đạt tỷ lệ 100% Passed.

## [0.5.0] — 2026-10-23

### Tổ chức thi & Xét duyệt điều kiện dự thi (Phase 4 — Examination Module)
- **Cơ sở dữ liệu & Migration:**
  - Bổ sung Flyway migration `V5__create_examination_tables.sql` tạo 3 bảng nghiệp vụ:
    - `exam_sessions`: Quản lý hội đồng thi, tên kỳ thi, ngày tổ chức, địa điểm, hạng GPLX, loại kỳ thi (Sát hạch Sở GTVT / Tốt nghiệp trường lái).
    - `exam_candidates`: Danh sách thí sinh dự thi, số báo danh (`candidate_number`), trạng thái đủ điều kiện (`QUALIFIED` / `DISQUALIFIED`), lý do bị loại.
    - `exam_results`: Kết quả thi 4 nội dung (Lý thuyết, Mô phỏng tình huống, Sa hình, Đường trường), kết quả chung (`PASSED`, `FAILED`, `PENDING`), ghi chú và chữ ký giám thị.
- **Nghiệp vụ & Tuân thủ Quy tắc:**
  - `EXM-001`: Đánh giá tự động điều kiện dự thi dựa trên 3 tiêu chuẩn liên module bắt buộc:
    1. Hồ sơ tuyển sinh tại module `admission` ở trạng thái đã được phê duyệt hợp lệ (`APPROVED`).
    2. Đã hoàn thành 100% thời lượng các bài giảng lý thuyết trực tuyến tại module `learning`.
    3. Tích lũy đủ số km (810 km) và số giờ (20 giờ) thực hành lái xe trên đường DAT tại module `training` (đối với xe ô tô).
  - `EXM-002`: Kết quả thi được bảo toàn vĩnh viễn trong CSDL, không cho phép xóa bản ghi nhằm phục vụ thanh tra, kiểm tra và cấp giấy phép lái xe.
  - Tự động hóa sinh mã kỳ thi `EXAM-CATEGORY-YYYYMMDD-XXX` và số báo danh `SBD-CATEGORY-XXX`.
  - Tự động tổng kết kết quả thi chung: Đạt khi và chỉ khi vượt qua tất cả các phần thi bắt buộc tương ứng theo từng hạng xe.
- **REST API (`/api/v1/examination`):**
  - `GET /api/v1/examination/sessions`: Danh sách kỳ thi sát hạch (Public).
  - `GET /api/v1/examination/sessions/{id}`: Chi tiết kỳ thi.
  - `POST /api/v1/examination/sessions`: Tạo kỳ thi mới (Role `ADMIN`, `MANAGER`).
  - `GET /api/v1/examination/eligibility/check`: Tự động thẩm định điều kiện dự thi của học viên (EXM-001).
  - `POST /api/v1/examination/sessions/{id}/register`: Đăng ký thí sinh vào kỳ thi (Tự động cấp SBD & gán trạng thái QUALIFIED/DISQUALIFIED).
  - `GET /api/v1/examination/sessions/{id}/candidates`: Danh sách thí sinh & SBD trong kỳ thi.
  - `POST /api/v1/examination/candidates/{candidateId}/score`: Ghi nhận điểm 4 môn sát hạch (Role `EXAMINER`, `ADMIN`).
  - `GET /api/v1/examination/candidates/{candidateId}/result`: Tra cứu kết quả thi của thí sinh.
  - `GET /api/v1/examination/my-results`: Học viên tra cứu lịch sử và kết quả thi sát hạch cá nhân.
- **Frontend (React 19 + TypeScript):**
  - Xây dựng types `types/examination.ts` và services `examinationService.ts`.
  - Trang Xét duyệt điều kiện dự thi (`EligibilityCheckPage.tsx`): Bảng điều khiển trực quan thẩm định 3 tiêu chuẩn, chỉ dẫn khắc phục tiêu chí còn thiếu.
  - Trang Danh sách kỳ thi sát hạch (`ExamSessionsPage.tsx`): Danh mục kỳ thi, modal tạo kỳ thi mới cho Quản lý/Admin, nút Đăng ký dự thi.
  - Trang Bảng điểm sát hạch (`ExamGradingPage.tsx`): Dành cho Sát hạch viên chấm điểm 4 môn, tự động tính Pass/Fail, nhập nhận xét hội đồng thi.
  - Trang Kết quả thi cá nhân (`MyExamResultsPage.tsx`): Tra cứu SBD và điểm thi chi tiết của học viên.
- **Kiểm thử:**
  - 12 unit và integration tests mới (`EligibilityServiceTest`, `ExaminationServiceTest`, `ExaminationControllerTest`).
  - Toàn bộ 50/50 tests hệ thống đạt tỷ lệ 100% Passed.

## [0.4.0] — 2026-10-23

### Học trực tuyến, Đào tạo thực hành & Giám sát DAT (Phase 3 — Learning & Training)
- **Cơ sở dữ liệu & Migration:**
  - Bổ sung Flyway migration `V4__create_learning_and_training_tables.sql` tạo 9 bảng:
    - Module Learning: `courses`, `course_lessons`, `learning_progress`, `theory_questions`, `theory_answers`.
    - Module Training: `training_classes`, `class_enrollments`, `training_schedules`, `attendance_records`, `dat_practice_sessions`.
  - Hạt giống dữ liệu khóa học mẫu, bài học mẫu và câu hỏi lý thuyết kèm câu hỏi điểm liệt.
- **Nghiệp vụ & Tuân thủ Quy tắc:**
  - `LRN-001`: Ghi nhận tiến độ học tập gắn với người học (`user_id`) và bài giảng (`lesson_id`).
  - `LRN-002`: Chặn đánh dấu hoàn thành bài giảng nếu người học chưa tích lũy thời gian học tối thiểu theo quy định.
  - Sát hạch lý thuyết: Tự động đánh trượt ngay lập tức nếu làm sai câu hỏi điểm liệt (`isParalysis = true`).
  - `TRN-001`: Kiểm tra chống xung đột lịch đào tạo của giảng viên trong cùng khung giờ.
  - `TRN-002`: Kiểm tra điều kiện điểm danh chỉ được phép ghi nhận trong ngày diễn ra buổi học.
  - Giám sát DAT: Tích lũy quãng đường và thời gian thực hành đường trường/cabin (đối chiếu chuẩn 810km / 20 giờ).
- **REST API (`/api/v1`):**
  - Khóa học & E-Learning:
    - `GET /api/v1/courses`: Danh mục khóa học đào tạo (Public).
    - `GET /api/v1/courses/{id}`: Chi tiết khóa học.
    - `GET /api/v1/courses/{id}/lessons`: Danh sách bài giảng kèm tiến độ học viên.
    - `POST /api/v1/courses/lessons/{id}/progress`: Cập nhật tiến độ và hoàn thành bài giảng.
  - Ngân hàng câu hỏi & Thi thử:
    - `GET /api/v1/theory/questions`: Ngân hàng câu hỏi ôn tập theo hạng GPLX (Public).
    - `GET /api/v1/theory/mock-exam`: Sinh đề thi ngẫu nhiên theo hạng bằng (Public).
    - `POST /api/v1/theory/mock-exam/submit`: Nộp bài thi thử trực tuyến và chấm điểm tự động.
  - Quản lý Đào tạo & Thực hành DAT:
    - `GET /api/v1/training/classes`, `POST /api/v1/training/classes`, `POST /api/v1/training/classes/{id}/enroll`.
    - `GET /api/v1/training/schedules/class/{classId}`, `POST /api/v1/training/schedules`.
    - `POST /api/v1/training/attendance`, `GET /api/v1/training/attendance/schedule/{scheduleId}`, `GET /api/v1/training/attendance/my-records`.
    - `POST /api/v1/training/dat/sessions`, `GET /api/v1/training/dat/my-summary`.
- **Frontend (React 19 + TypeScript):**
  - Xây dựng types `types/learning.ts`, `types/training.ts` và services `learningService.ts`, `trainingService.ts`.
  - Trang Khóa học & Bài giảng (`CoursesPage.tsx`): Danh mục khóa học, bài học có video mô phỏng, tính giờ học tích lũy và nút hoàn thành bài học.
  - Trang Thi thử lý thuyết (`TheoryExamPage.tsx`): Chế độ ôn tập theo hạng, chế độ thi thử ngẫu nhiên 20-25 câu, cảnh báo câu điểm liệt.
  - Trang Kế hoạch đào tạo & Lịch học (`TrainingSchedulePage.tsx`): Lịch học theo lớp, thanh tiến trình quãng đường thực hành DAT (tổng số km và giờ lái thực tế).
- **Kiểm thử:**
  - 12 test cases mới cho Phase 3 (`CourseServiceTest`, `TheoryExamServiceTest`, `TrainingScheduleServiceTest`, `AttendanceServiceTest`, `CourseAndTrainingIntegrationTest`).
  - Toàn bộ 38/38 test cases của toàn hệ thống đạt kết quả 100% Passed.

## [0.3.0] — 2026-10-23

### Tuyển sinh & Tiếp nhận Hồ sơ điện tử (Phase 2 — Admission Module)
- **Cơ sở dữ liệu & Entity:**
  - Bổ sung Flyway migration `V3__create_admission_tables.sql` tạo 4 bảng: `license_categories`, `applications`, `application_documents`, `application_status_history`.
  - Hạt giống (seed) dữ liệu 6 hạng GPLX chuẩn: A1, A, B1, B, C1, C với cấu hình động về độ tuổi tối thiểu và mức học phí.
  - Xây dựng JPA Entity: `LicenseCategory`, `AdmissionApplication`, `AdmissionDocument`, `ApplicationStatusHistory`.
  - Hỗ trợ Optimistic Locking qua `@Version private Long version` chống Lost Updates khi thẩm định đồng thời.
  - Xây dựng JPA Repository: `LicenseCategoryRepository`, `AdmissionApplicationRepository`, `AdmissionDocumentRepository`, `ApplicationStatusHistoryRepository`.
- **Nghiệp vụ & Tuân thủ Quy tắc:**
  - `ADM-001`: Triển khai máy trạng thái tiếp nhận và xét duyệt (`SUBMITTED` ➔ `UNDER_REVIEW` ➔ `APPROVED` / `REJECTED` / `SUPPLEMENT_REQUIRED`).
  - `ADM-002`: Bắt buộc ghi nhận lý do cụ thể khi từ chối hoặc yêu cầu bổ sung hồ sơ.
  - `ADM-003`: Cấm hoàn tác hoặc thay đổi trạng thái hồ sơ đã được phê duyệt (`APPROVED`).
  - `ADM-004`: Kiểm tra độ tuổi tối thiểu của học viên căn cứ theo ngày sinh và hạng bằng đăng ký.
  - `ADM-005`: Chống nộp trùng lặp hồ sơ đang trong quá trình tiếp nhận/chờ duyệt theo số CCCD.
- **REST API (`/api/v1`):**
  - `GET /api/v1/license-categories`: Danh mục hạng bằng lái xe công khai (Public).
  - `GET /api/v1/license-categories/{id}`: Chi tiết hạng bằng lái xe.
  - `POST /api/v1/admissions`: Học viên nộp hồ sơ điện tử đính kèm tài liệu số hóa (Authenticated).
  - `GET /api/v1/admissions/my-applications`: Học viên tra cứu danh sách hồ sơ của chính mình (Resource Ownership).
  - `GET /api/v1/admissions/{id}`: Xem chi tiết hồ sơ, tài liệu và lịch sử thẩm định.
  - `GET /api/v1/admissions`: Cán bộ tuyển sinh (`STAFF`, `ADMIN`, `MANAGER`) tra cứu danh sách hồ sơ có phân trang và lọc theo trạng thái.
  - `POST /api/v1/admissions/{id}/review`: Cán bộ thực hiện thẩm định, ghi nhận ghi chú/lý do và cập nhật trạng thái.
- **Frontend (React 19 + TypeScript):**
  - Xây dựng Service `admissionService.ts` với đầy đủ kiểu dữ liệu TypeScript trong `types/admission.ts`.
  - Trang Nộp hồ sơ (`SubmitApplicationPage.tsx`): Dropdown chọn hạng bằng hiển thị học phí và điều kiện tuổi, form kiểm tra tính hợp lệ của CCCD/ngày sinh, đính kèm tài liệu số hóa.
  - Trang Hồ sơ của tôi (`MyApplicationsPage.tsx`): Danh sách hồ sơ đã nộp, trạng thái gắn nhãn màu sắc trực quan, modal xem chi tiết tài liệu và nhật ký thẩm định.
  - Trang Quản lý & Thẩm định (`ApplicationManagementPage.tsx`): Bảng hồ sơ cho cán bộ tuyển sinh, bộ lọc trạng thái, popup thẩm định xét duyệt tuân thủ ADM-002.
  - Cập nhật điều hướng `MainLayout.tsx` phân tách rõ quyền hạn học viên và cán bộ (`isStaffOrAdmin`).
- **Kiểm thử:**
  - 11 test cases mới cho module Admission (6 unit tests `AdmissionServiceTest`, 5 integration tests `AdmissionControllerTest`).
  - Toàn bộ 26/26 test cases của hệ thống đạt kết quả 100% Passed.

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
