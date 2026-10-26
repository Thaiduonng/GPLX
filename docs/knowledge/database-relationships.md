# Mối Quan Hệ Cơ Sở Dữ Liệu (Database Relationships)
`docs/knowledge/database-relationships.md`

Tài liệu này giải thích chi tiết mục đích tồn tại, bội số quan hệ (cardinality), hành vi ràng buộc khóa ngoại (referential actions) và các luồng quan hệ nghiệp vụ cốt lõi trong cơ sở dữ liệu `gplx_db` (đã đối chiếu thực tế 100% với MySQL 8.4 LTS runtime schema).

---

## 1. Các Luồng Quan Hệ Nghiệp Vụ Cốt Lõi

Hệ thống được thiết kế theo 5 luồng quan hệ xuyên suốt quá trình từ khi tiếp nhận hồ sơ đến khi cấp chứng chỉ sát hạch:

### Luồng 1: Tuyển sinh, Xét duyệt & Số hóa Hồ sơ (Admission Pipeline)
```text
users (Học viên) ──(1:N)──> applications (Hồ sơ) ──(1:N)──> application_documents (Tài liệu)
       │                            │
       │                            └──(1:N)──> application_status_history (Nhật ký duyệt)
       ▼
license_categories (Hạng GPLX) ──(1:N)──> applications
```
- **Ý nghĩa:** Mỗi hồ sơ (`applications`) bắt buộc thuộc về một tài khoản học viên (`users`) và đăng ký một hạng bằng lái (`license_categories`). Khi hồ sơ bị từ chối hoặc yêu cầu bổ sung, một bản ghi lịch sử tương ứng được thêm vào `application_status_history`.

### Luồng 2: Nghĩa vụ Tài chính & Thu Học phí (Finance Pipeline)
```text
applications ──(1:1)──> fee_invoices (Hóa đơn) ──(1:N)──> payment_receipts (Biên lai)
                           │                                      │
                           ▼                                      ▼
                        users (Học viên)                       users (Thu ngân/Cashier)
```
- **Ý nghĩa:** Khi hồ sơ được phê duyệt, hệ thống phát sinh hóa đơn học phí (`fee_invoices`). Học viên có thể đóng một lần hoặc nhiều đợt; mỗi lần thanh toán thành công tạo ra một biên lai thu tiền (`payment_receipts`) có kèm `idempotency_key` duy nhất chống thanh toán trùng.

### Luồng 3: Tổ chức Lớp học, Lịch đào tạo & Điểm danh (Training Pipeline)
```text
courses (Khóa học) ──(1:N)──> training_classes (Lớp đào tạo)
                                    │
          ┌─────────────────────────┴─────────────────────────┐
          ▼                                                   ▼
class_enrollments (Ghi danh)                         training_schedules (Thời khóa biểu)
    │        │                                              │           │
    ▼        ▼                                              ▼           ▼
  users   classes                                      attendance   users (Giáo viên phụ trách)
                                                       (Điểm danh)
```
- **Ý nghĩa:** Lớp đào tạo gắn với một khóa học cụ thể (`courses`) và giáo viên chủ nhiệm (`instructor_id -> users`). Học viên được ghi danh vào lớp qua `class_enrollments` (`user_id -> users`). Lịch học (`training_schedules`) quản lý các ca lý thuyết hoặc thực hành, phân công giáo viên giảng dạy và theo dõi qua `attendance_records`.

### Luồng 4: Thực hành Đường trường DAT (Distance & Time Tracking)
```text
users (Học viên - user_id) ────────┐
                                   ├──> dat_practice_sessions (Phiên thực hành DAT)
users (Giáo viên - instructor_id) ─┘
```
- **Ý nghĩa:** Mỗi phiên thực hành đường trường DAT bắt buộc phải có sự tham gia của 2 thực thể: đúng học viên (`user_id`) và giáo viên hướng dẫn (`instructor_id`), cùng mã thiết bị nhận dạng (`device_id`). Kết quả tích lũy số km (`distance_km`) và số giờ (`duration_minutes`) là căn cứ quyết định để mở điều kiện dự thi.

### Luồng 5: Sát hạch & Kết quả Sát hạch (Examination Pipeline)
```text
exam_sessions (Kỳ thi) ──(1:N)──> exam_candidates (Thí sinh) ──(1:1)──> exam_results (Điểm thi)
       │                                 │                                     │
       ▼                                 ▼                                     ▼
license_categories                     users (user_id)                  users (examiner_id)
```
- **Ý nghĩa:** Kỳ thi sát hạch tổ chức cho từng hạng GPLX. Thí sinh chỉ được chấp thuận vào bảng `exam_candidates` khi đã vượt qua bộ kiểm tra điều kiện tự động (`eligibility_status = 'ELIGIBLE'`). Khi kỳ thi diễn ra, hội đồng sát hạch viên (`examiner_id -> users`) chấm và lưu kết quả chi tiết từng phần (Lý thuyết, Mô phỏng, Sa hình, Đường trường) vào `exam_results`.

---

## 2. Bảng Danh Mục Khóa Ngoại & Hành Vi Ràng Buộc Toàn Vẹn Thực Tế

| Bảng Con (Child) | Khóa Ngoại (FK) | Bảng Cha (Parent) | Constraint Tên | Hành vi ON DELETE | Lý Do Kiến Trúc |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `user_roles` | `user_id` | `users(id)` | `fk_user_roles_user` | `CASCADE` | Khi người dùng bị xóa, vai trò gán tương ứng tự động bị xóa. |
| `user_roles` | `role_id` | `roles(id)` | `fk_user_roles_role` | `CASCADE` | Khi một vai trò bị hủy, quan hệ phân vai trò tương ứng tự động xóa. |
| `role_permissions` | `role_id` | `roles(id)` | `fk_role_permissions_role` | `CASCADE` | Khi vai trò bị xóa, quyền hạn của vai trò bị dọn dẹp. |
| `role_permissions` | `permission_id` | `permissions(id)` | `fk_role_permissions_permission` | `CASCADE` | Khi một quyền hạn bị hủy, liên kết phân quyền bị xóa. |
| `applications` | `user_id` | `users(id)` | `fk_applications_user` | `RESTRICT` | **Bảo toàn pháp lý:** Không cho phép xóa người dùng khi đang có hồ sơ dự tuyển. |
| `applications` | `category_id` | `license_categories(id)`| `fk_applications_category` | `RESTRICT` | Không thể xóa hạng GPLX khi đang có hồ sơ đã nộp theo hạng đó. |
| `applications` | `reviewed_by` | `users(id)` | `fk_applications_reviewer` | `SET NULL` | Giữ nguyên hồ sơ và ngày duyệt kể cả khi cán bộ duyệt nghỉ việc. |
| `application_documents` | `application_id` | `applications(id)` | `fk_documents_application` | `CASCADE` | Tài liệu đính kèm phụ thuộc hoàn toàn vào hồ sơ. |
| `application_status_history`| `application_id`| `applications(id)` | `fk_history_application` | `CASCADE` | Lịch sử thẩm định đi liền với hồ sơ. |
| `courses` | `category_id` | `license_categories(id)` | `fk_courses_category` | `RESTRICT` | Không xóa hạng GPLX nếu đang có chương trình đào tạo mở theo hạng. |
| `course_lessons` | `course_id` | `courses(id)` | `fk_lessons_course` | `CASCADE` | Các bài giảng thuộc về cấu trúc môn học của khóa học. |
| `learning_progress` | `user_id` | `users(id)` | `fk_learning_progress_user` | `CASCADE` | Tiến độ học tập của người dùng. |
| `learning_progress` | `lesson_id` | `course_lessons(id)` | `fk_learning_progress_lesson` | `CASCADE` | Tiến độ gắn với bài giảng. |
| `theory_answers` | `question_id` | `theory_questions(id)` | `fk_theory_answers_question` | `CASCADE` | Các đáp án lựa chọn thuộc về câu hỏi trắc nghiệm cha. |
| `training_classes` | `course_id` | `courses(id)` | `fk_classes_course` | `RESTRICT` | Lớp đào tạo gắn liền với khóa học. |
| `training_classes` | `instructor_id` | `users(id)` | `fk_classes_instructor` | `SET NULL` | Cho phép điều chuyển hoặc để trống giáo viên chủ nhiệm khi cần. |
| `class_enrollments` | `class_id` | `training_classes(id)` | `fk_enrollments_class` | `CASCADE` | Danh sách phân lớp theo lớp học. |
| `class_enrollments` | `user_id` | `users(id)` | `fk_enrollments_user` | `RESTRICT` | Không được xóa học viên khi đang có ghi danh học tập. |
| `training_schedules` | `class_id` | `training_classes(id)` | `fk_schedules_class` | `CASCADE` | Thời khóa biểu của lớp học. |
| `training_schedules` | `instructor_id` | `users(id)` | `fk_schedules_instructor` | `SET NULL` | Giữ lịch học kể cả khi phân công lại giáo viên phụ trách. |
| `attendance_records` | `schedule_id`| `training_schedules(id)` | `fk_attendance_schedule` | `CASCADE` | Bản ghi điểm danh của ca học. |
| `attendance_records` | `user_id`| `users(id)` | `fk_attendance_user` | `RESTRICT` | Bảo vệ lịch sử điểm danh của học viên. |
| `dat_practice_sessions`| `user_id`| `users(id)` | `fk_dat_user` | `RESTRICT` | **Hồ sơ DAT bắt buộc:** Bảo vệ dữ liệu giám sát hành trình của học viên. |
| `dat_practice_sessions`| `instructor_id`| `users(id)` | `fk_dat_instructor` | `RESTRICT` | Giữ thông tin giáo viên bảo trợ phiên lái xe đường trường. |
| `exam_sessions` | `category_id` | `license_categories(id)` | `fk_exam_sessions_category` | `RESTRICT` | Kỳ thi sát hạch theo hạng lái xe. |
| `exam_candidates` | `exam_session_id` | `exam_sessions(id)` | `fk_candidates_session` | `CASCADE` | Danh sách thí sinh của kỳ thi. |
| `exam_candidates` | `user_id` | `users(id)` | `fk_candidates_user` | `RESTRICT` | Không được xóa học viên đang đăng ký kỳ thi. |
| `exam_results` | `candidate_id` | `exam_candidates(id)` | `fk_results_candidate` | `CASCADE` | Kết quả thi gắn liền với thí sinh dự thi. |
| `exam_results` | `examiner_id` | `users(id)` | `fk_results_examiner` | `SET NULL` | Giữ kết quả thi kể cả khi sát hạch viên nghỉ việc. |
| `fee_invoices` | `user_id` | `users(id)` | `fk_fee_invoices_user` | `RESTRICT` | Không thể xóa người dùng khi đang có hóa đơn công nợ chưa tất toán. |
| `fee_invoices` | `category_id` | `license_categories(id)` | `fk_fee_invoices_category` | `RESTRICT` | Ràng buộc hóa đơn với biểu phí hạng GPLX. |
| `payment_receipts` | `invoice_id` | `fee_invoices(id)` | `fk_payment_receipts_invoice` | `RESTRICT` | **Chứng từ tài chính bất biến:** Không được xóa hóa đơn khi đã có biên lai nộp tiền. |
| `vehicles` | `category_id` | `license_categories(id)` | `fk_vehicles_category` | `RESTRICT` | Xe đào tạo gắn với phân hạng GPLX tương ứng. |
| `vehicle_maintenances` | `vehicle_id` | `vehicles(id)` | `fk_maintenances_vehicle` | `CASCADE` | Nhật ký bảo dưỡng gắn liền với phương tiện. |
| `audit_logs` | `user_id` | `users(id)` | `fk_audit_logs_user` | `SET NULL` | Bảo toàn nhật ký kiểm toán vĩnh viễn kể cả khi người dùng bị xóa. |
| `notifications` | `user_id` | `users(id)` | `fk_notifications_user` | `CASCADE` | Thông báo gửi tới người dùng. |
| `crm_leads` | `assigned_to` | `users(id)` | `fk_crm_leads_assigned` | `SET NULL` | Lead tư vấn tuyển sinh bàn giao cho nhân viên khác. |
