# Danh Mục Lược Đồ Cơ Sở Dữ Liệu (Database Schema Catalog)
`docs/knowledge/database-schema-catalog.md`

Tài liệu này lập danh mục và phân loại chi tiết toàn bộ **30 bảng dữ liệu thực tế** đang hoạt động trong cơ sở dữ liệu `gplx_db` của hệ thống GPLX Training System.

---

## Bảng Tổng Hợp Trạng Thái Triển Khai 30 Bảng Thực Tế

| STT | Tên Bảng | Module Sở Hữu | Migration | Entity JPA Tương Ứng | Trạng Thái Thực Tế Trong MySQL |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `users` | `identity` | `V1` | `User.java` | ✅ Đã tồn tại & Hoạt động |
| 2 | `roles` | `identity` | `V1` | `Role.java` | ✅ Đã tồn tại & Hoạt động |
| 3 | `permissions` | `identity` | `V1`, `V8` | `Permission.java` | ✅ Đã tồn tại & Hoạt động |
| 4 | `user_roles` | `identity` | `V1` | (Join Table) | ✅ Đã tồn tại & Hoạt động |
| 5 | `role_permissions` | `identity` | `V1` | (Join Table) | ✅ Đã tồn tại & Hoạt động |
| 6 | `license_categories` | `admission` | `V3` | `LicenseCategory.java` | ✅ Đã tồn tại & Hoạt động |
| 7 | `applications` | `admission` | `V3` | `AdmissionApplication.java` | ✅ Đã tồn tại & Hoạt động |
| 8 | `application_documents` | `admission` | `V3` | `AdmissionDocument.java` | ✅ Đã tồn tại & Hoạt động |
| 9 | `application_status_history` | `admission` | `V3` | `ApplicationStatusHistory.java`| ✅ Đã tồn tại & Hoạt động |
| 10 | `courses` | `learning` | `V4` | `Course.java` | ✅ Đã tồn tại & Hoạt động |
| 11 | `course_lessons` | `learning` | `V4` | `CourseLesson.java` | ✅ Đã tồn tại & Hoạt động |
| 12 | `learning_progress` | `learning` | `V4` | `LearningProgress.java` | ✅ Đã tồn tại & Hoạt động |
| 13 | `theory_questions` | `learning` | `V4` | `TheoryQuestion.java` | ✅ Đã tồn tại & Hoạt động |
| 14 | `theory_answers` | `learning` | `V4` | `TheoryAnswer.java` | ✅ Đã tồn tại & Hoạt động |
| 15 | `training_classes` | `training` | `V4` | `TrainingClass.java` | ✅ Đã tồn tại & Hoạt động |
| 16 | `class_enrollments` | `training` | `V4` | `ClassEnrollment.java` | ✅ Đã tồn tại & Hoạt động |
| 17 | `training_schedules` | `training` | `V4` | `TrainingSchedule.java` | ✅ Đã tồn tại & Hoạt động |
| 18 | `attendance_records` | `training` | `V4` | `AttendanceRecord.java` | ✅ Đã tồn tại & Hoạt động |
| 19 | `dat_practice_sessions` | `training` | `V4` | `DatPracticeSession.java` | ✅ Đã tồn tại & Hoạt động |
| 20 | `exam_sessions` | `examination`| `V5` | `ExamSession.java` | ✅ Đã tồn tại & Hoạt động |
| 21 | `exam_candidates` | `examination`| `V5` | `ExamCandidate.java` | ✅ Đã tồn tại & Hoạt động |
| 22 | `exam_results` | `examination`| `V5` | `ExamResult.java` | ✅ Đã tồn tại & Hoạt động |
| 23 | `fee_invoices` | `finance` | `V6` | `FeeInvoice.java` | ✅ Đã tồn tại & Hoạt động |
| 24 | `payment_receipts` | `finance` | `V6` | `PaymentReceipt.java` | ✅ Đã tồn tại & Hoạt động |
| 25 | `vehicles` | `fleet` | `V6` | `Vehicle.java` | ✅ Đã tồn tại & Hoạt động |
| 26 | `vehicle_maintenances` | `fleet` | `V6`, `V8` | `VehicleMaintenance.java` | ✅ Đã tồn tại & Hoạt động |
| 27 | `notifications` | `support` | `V6` | (Hỗ trợ mở rộng) | ✅ Đã tồn tại & Hoạt động |
| 28 | `crm_leads` | `support` | `V6` | (Hỗ trợ mở rộng) | ✅ Đã tồn tại & Hoạt động |
| 29 | `audit_logs` | `reporting` | `V7` | `AuditLog.java` | ✅ Đã tồn tại & Hoạt động |
| 30 | `flyway_schema_history` | `system` | Auto | (Flyway Quản trị) | ✅ Đã tồn tại & Hoạt động |

---

## Chi Tiết Từng Bảng Theo Module

### 1. Phân Hệ Quản Lý Định Danh (Identity)

#### 1.1. Bảng `users`
- **Module:** `identity`
- **Mục đích:** Lưu trữ tài khoản người dùng, chứng thực đăng nhập và thông tin nhân thân cơ bản.
- **Khóa chính:** `id` (BIGINT AUTO_INCREMENT).
- **Ràng buộc duy nhất:** `uk_users_username (username)`, `uk_users_email (email)`.
- **Chỉ mục:** `idx_users_email`, `idx_users_username`, `idx_users_is_active`.
- **Cột quan trọng:** `username`, `email`, `password_hash` (BCrypt), `full_name`, `phone`, `is_active`, `created_at`, `updated_at`.
- **Migration:** `V1__create_identity_tables.sql`.
- **Entity JPA:** `vn.edu.gplx.modules.identity.domain.User`.
- **Nguồn tạo / Sử dụng:** Tạo khi đăng ký tài khoản hoặc seed quản trị; dùng bởi `AuthService`, Spring Security.

#### 1.2. Bảng `roles`
- **Module:** `identity`
- **Mục đích:** Danh mục các vai trò người dùng trong hệ thống RBAC.
- **Khóa chính:** `id` (BIGINT AUTO_INCREMENT).
- **Ràng buộc duy nhất:** `uk_roles_name (name)`.
- **Cột quan trọng:** `name` (`ROLE_ADMIN`, `ROLE_STUDENT`,...), `description`, `created_at`, `updated_at`.
- **Migration:** `V1__create_identity_tables.sql`, seed dữ liệu tại `V2`.
- **Entity JPA:** `vn.edu.gplx.modules.identity.domain.Role`.

#### 1.3. Bảng `permissions`
- **Module:** `identity`
- **Mục đích:** Danh mục các quyền thao tác nghiệp vụ chi tiết theo từng module.
- **Khóa chính:** `id` (BIGINT AUTO_INCREMENT).
- **Ràng buộc duy nhất:** `uk_permissions_name (name)`.
- **Chỉ mục:** `idx_permissions_module (module)`.
- **Cột quan trọng:** `name` (VD: `admission:review`), `description`, `module`, `created_at`, `updated_at`.
- **Migration:** `V1__create_identity_tables.sql`, cập nhật audit field tại `V8`.
- **Entity JPA:** `vn.edu.gplx.modules.identity.domain.Permission`.

#### 1.4. Bảng `user_roles` (Join Table)
- **Mục đích:** Quan hệ nhiều-nhiều giữa người dùng và vai trò.
- **Khóa chính kết hợp:** `(user_id, role_id)`.
- **Khóa ngoại:** `fk_user_roles_user → users(id) ON DELETE CASCADE`, `fk_user_roles_role → roles(id) ON DELETE CASCADE`.

#### 1.5. Bảng `role_permissions` (Join Table)
- **Mục đích:** Quan hệ nhiều-nhiều giữa vai trò và danh sách quyền hạn.
- **Khóa chính kết hợp:** `(role_id, permission_id)`.
- **Khóa ngoại:** `fk_role_permissions_role → roles(id) ON DELETE CASCADE`, `fk_role_permissions_perm → permissions(id) ON DELETE CASCADE`.

---

### 2. Phân Hệ Tuyển Sinh & Hồ Sơ Điện Tử (Admission)

#### 2.1. Bảng `license_categories`
- **Module:** `admission`
- **Mục đích:** Danh mục các hạng GPLX (A1, A, B1, B, C1, C,...), độ tuổi tối thiểu và mức học phí chuẩn.
- **Khóa chính:** `id` (BIGINT AUTO_INCREMENT).
- **Ràng buộc duy nhất:** `uk_license_categories_code (code)`.
- **Chỉ mục:** `idx_license_categories_active (is_active)`.
- **Cột quan trọng:** `code`, `name`, `description`, `min_age`, `tuition_fee`, `is_active`, `created_at`, `updated_at`.
- **Migration:** `V3__create_admission_tables.sql`.
- **Entity JPA:** `vn.edu.gplx.modules.admission.domain.LicenseCategory`.

#### 2.2. Bảng `applications`
- **Module:** `admission`
- **Mục đích:** Lưu trữ hồ sơ tuyển sinh của học viên, thông tin CCCD, ngày sinh, và trạng thái xét duyệt.
- **Khóa chính:** `id` (BIGINT AUTO_INCREMENT).
- **Ràng buộc duy nhất:** `uk_applications_code (application_code)`.
- **Khóa ngoại:** 
  - `fk_applications_user → users(id) ON DELETE RESTRICT`
  - `fk_applications_category → license_categories(id) ON DELETE RESTRICT`
  - `fk_applications_reviewer → users(id) ON DELETE SET NULL`
- **Chỉ mục:** `idx_applications_user`, `idx_applications_category`, `idx_applications_status`, `idx_applications_national_id`.
- **Cột quan trọng:** `application_code`, `user_id`, `category_id`, `full_name`, `national_id`, `date_of_birth`, `status`, `rejection_reason`, `version` (Optimistic Lock).
- **Migration:** `V3__create_admission_tables.sql`.
- **Entity JPA:** `vn.edu.gplx.modules.admission.domain.AdmissionApplication`.

#### 2.3. Bảng `application_documents`
- **Module:** `admission`
- **Mục đích:** Quản lý các tệp tài liệu số hóa đính kèm hồ sơ (Mặt trước/sau CCCD, Giấy khám sức khỏe, Ảnh 3x4).
- **Khóa chính:** `id` (BIGINT AUTO_INCREMENT).
- **Khóa ngoại:** `fk_documents_application → applications(id) ON DELETE CASCADE`.
- **Chỉ mục:** `idx_documents_app_type (application_id, document_type)`.
- **Cột quan trọng:** `document_type`, `file_name`, `file_url`, `file_size`, `mime_type`.
- **Migration:** `V3__create_admission_tables.sql`.
- **Entity JPA:** `vn.edu.gplx.modules.admission.domain.AdmissionDocument`.

#### 2.4. Bảng `application_status_history`
- **Module:** `admission`
- **Mục đích:** Lưu vết các bước chuyển trạng thái thẩm định hồ sơ theo ADM-001/002.
- **Khóa chính:** `id` (BIGINT AUTO_INCREMENT).
- **Khóa ngoại:** `fk_history_application → applications(id) ON DELETE CASCADE`, `fk_history_changed_by → users(id) ON DELETE SET NULL`.
- **Cột quan trọng:** `from_status`, `to_status`, `note`, `changed_by`, `created_at`.
- **Migration:** `V3__create_admission_tables.sql`.
- **Entity JPA:** `vn.edu.gplx.modules.admission.domain.ApplicationStatusHistory`.

---

### 3. Phân Hệ Đào Tạo & E-Learning (Learning & Training)

#### 3.1. Bảng `courses` & `course_lessons`
- **Module:** `learning`
- **Mục đích:** Lưu cấu trúc chương trình đào tạo lý thuyết và bài học trực tuyến theo hạng.
- **Khóa chính:** `id` (BIGINT AUTO_INCREMENT).
- **Khóa ngoại:** `fk_courses_category → license_categories(id)`, `fk_lessons_course → courses(id) ON DELETE CASCADE`.
- **Entity JPA:** `Course.java`, `CourseLesson.java`.

#### 3.2. Bảng `learning_progress`
- **Module:** `learning`
- **Mục đích:** Theo dõi tiến độ học bài giảng và thời lượng học của học viên (LRN-001).
- **Khóa ngoại:** `fk_progress_user → users(id)`, `fk_progress_lesson → course_lessons(id)`.
- **Ràng buộc duy nhất:** `uk_learning_user_lesson (user_id, lesson_id)`.
- **Entity JPA:** `LearningProgress.java`.

#### 3.3. Bảng `theory_questions` & `theory_answers`
- **Module:** `learning`
- **Mục đích:** Ngân hàng 600 câu hỏi trắc nghiệm sát hạch GPLX.
- **Cột quan trọng:** `is_critical` (Câu điểm liệt - nếu sai trượt ngay theo LRN-002), `question_text`, `image_url`, `chapter`.
- **Entity JPA:** `TheoryQuestion.java`, `TheoryAnswer.java`.

#### 3.4. Bảng `training_classes` & `class_enrollments`
- **Module:** `training`
- **Mục đích:** Quản lý lớp học đào tạo tập trung và danh sách học viên theo khóa.
- **Khóa chính:** `id` (BIGINT AUTO_INCREMENT).
- **Khóa ngoại:** `fk_classes_category → license_categories(id)`, `fk_classes_instructor → users(id)`, `fk_enrollments_class → training_classes(id)`, `fk_enrollments_student → users(id)`.
- **Entity JPA:** `TrainingClass.java`, `ClassEnrollment.java`.

#### 3.5. Bảng `training_schedules` & `attendance_records`
- **Module:** `training`
- **Mục đích:** Lịch học lý thuyết, thực hành sa hình, đường trường và điểm danh từng ca (TRN-001, TRN-002).
- **Khóa ngoại:** `fk_schedules_class → training_classes(id)`, `fk_schedules_vehicle → vehicles(id)`, `fk_attendance_schedule → training_schedules(id)`.
- **Entity JPA:** `TrainingSchedule.java`, `AttendanceRecord.java`.

#### 3.6. Bảng `dat_practice_sessions`
- **Module:** `training`
- **Mục đích:** Lưu vết các phiên thực hành lái xe đường trường từ thiết bị giám sát hành trình DAT (TRN-003).
- **Cột quan trọng:** `student_id`, `instructor_id`, `vehicle_id`, `distance_km`, `duration_minutes`, `start_time`, `end_time`, `is_valid`.
- **Entity JPA:** `DatPracticeSession.java`.

---

### 4. Phân Hệ Sát Hạch & Đánh Giá Điều Kiện (Examination)

#### 4.1. Bảng `exam_sessions`
- **Module:** `examination`
- **Mục đích:** Kỳ thi sát hạch lý thuyết và thực hành (Tốt nghiệp nội bộ / Sát hạch chính thức).
- **Cột quan trọng:** `session_code`, `category_id`, `exam_type` (`GRADUATION`, `CERTIFICATION`), `exam_date`, `status` (`SCHEDULED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`).
- **Entity JPA:** `ExamSession.java`.

#### 4.2. Bảng `exam_candidates`
- **Module:** `examination`
- **Mục đích:** Thí sinh dự thi, số báo danh và trạng thái đủ điều kiện dự thi (EXM-001).
- **Khóa ngoại:** `fk_candidates_session → exam_sessions(id)`, `fk_candidates_student → users(id)`.
- **Ràng buộc duy nhất:** `uk_candidates_session_student (session_id, student_id)`.
- **Entity JPA:** `ExamCandidate.java`.

#### 4.3. Bảng `exam_results`
- **Module:** `examination`
- **Mục đích:** Kết quả 4 phần thi: Lý thuyết, Mô phỏng, Sa hình, Đường trường và kết luận đỗ/trượt (EXM-002, EXM-003).
- **Khóa ngoại:** `fk_results_candidate → exam_candidates(id) ON DELETE CASCADE`.
- **Entity JPA:** `ExamResult.java`.

---

### 5. Phân Hệ Tài Chính & Đội Xe (Finance & Fleet)

#### 5.1. Bảng `fee_invoices` & `payment_receipts`
- **Module:** `finance`
- **Mục đích:** Hóa đơn học phí và biên lai thu tiền.
- **Ràng buộc duy nhất:** `uk_payment_receipts_idempotency (idempotency_key)` đảm bảo tính Idempotency FIN-001.
- **Entity JPA:** `FeeInvoice.java`, `PaymentReceipt.java`.

#### 5.2. Bảng `vehicles` & `vehicle_maintenances`
- **Module:** `fleet`
- **Mục đích:** Xe tập lái, hạn đăng kiểm và nhật ký bảo dưỡng kỹ thuật (FLT-001).
- **Khóa ngoại:** `fk_vehicles_category → license_categories(id)`, `fk_maintenances_vehicle → vehicles(id) ON DELETE CASCADE`.
- **Entity JPA:** `Vehicle.java`, `VehicleMaintenance.java`.

---

### 6. Phân Hệ Hỗ Trợ & Kiểm Toán (Support & Reporting)

#### 6.1. Bảng `audit_logs`
- **Module:** `reporting`
- **Mục đích:** Lưu trữ nhật ký kiểm toán bất biến các sự kiện hệ thống phục vụ hậu kiểm và tuân thủ pháp lý.
- **Khóa ngoại:** `fk_audit_logs_user → users(id) ON DELETE SET NULL`.
- **Chỉ mục:** `idx_audit_logs_resource`, `idx_audit_logs_action`, `idx_audit_logs_created_at`.
- **Entity JPA:** `AuditLog.java`.

#### 6.2. Bảng `notifications` & `crm_leads`
- **Module:** `support`
- **Mục đích:** Quản lý thông báo người dùng và khách hàng tiềm năng.
- **Ràng buộc duy nhất:** `uk_notifications_dedup (deduplication_key)`.
