# Nhật ký Thay đổi (Changelog)

Toàn bộ các cập nhật quan trọng của dự án sẽ được ghi nhận tại đây theo chuẩn [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
