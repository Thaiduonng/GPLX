# Mối Quan Hệ Cơ Sở Dữ Liệu (Database Relationships)
`docs/knowledge/database-relationships.md`

Tài liệu này giải thích chi tiết mục đích tồn tại, bội số quan hệ (cardinality), hành vi ràng buộc khóa ngoại (referential actions) và các luồng quan hệ nghiệp vụ cốt lõi trong cơ sở dữ liệu `gplx_db`.

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

### Luồng 3: Tổ chức Lớp học, Lịch đào tạo & Giám sát DAT (Training Pipeline)
```text
license_categories ──(1:N)──> training_classes (Lớp đào tạo)
                                    │
          ┌─────────────────────────┴─────────────────────────┐
          ▼                                                   ▼
class_enrollments (Ghi danh)                         training_schedules (Thời khóa biểu)
    │        │                                              │           │
    ▼        ▼                                              ▼           ▼
  users   classes                                      attendance   vehicles (Xe tập)
                                                       (Điểm danh)
```
- **Ý nghĩa:** Lớp đào tạo gắn với một hạng bằng lái và một giáo viên chủ nhiệm. Học viên được ghi danh vào lớp qua `class_enrollments`. Lịch học (`training_schedules`) kiểm tra xung đột thời gian giữa giáo viên và phương tiện tập lái (`vehicles`).

### Luồng 4: Thực hành Đường trường DAT (Distance & Time Tracking)
```text
users (Học viên) ────────┐
users (Giáo viên) ───────┼──> dat_practice_sessions (Phiên thực hành DAT)
vehicles (Xe tập lái) ───┘
```
- **Ý nghĩa:** Mỗi phiên thực hành đường trường DAT bắt buộc phải có sự tham gia của 3 thực thể: đúng học viên, đúng giáo viên hướng dẫn và phương tiện tập lái được cấp phép. Kết quả tích lũy số km và số giờ là căn cứ quyết định để mở điều kiện dự thi.

### Luồng 5: Sát hạch & Kết quả Sát hạch (Examination Pipeline)
```text
exam_sessions (Kỳ thi) ──(1:N)──> exam_candidates (Thí sinh) ──(1:1)──> exam_results (Điểm thi)
       │                                 │
       ▼                                 ▼
license_categories                     users (Học viên)
```
- **Ý nghĩa:** Kỳ thi sát hạch tổ chức cho từng hạng GPLX. Thí sinh chỉ được chấp thuận vào bảng `exam_candidates` khi đã vượt qua bộ kiểm tra điều kiện tự động (`eligibility_status = 'ELIGIBLE'`). Khi kỳ thi kết thúc, sát hạch viên ghi điểm vào `exam_results` và khóa sổ vĩnh viễn.

---

## 2. Bảng Danh Mục Khóa Ngoại & Hành Vi Ràng Buộc Toàn Vẹn

| Bảng Con (Child) | Khóa Ngoại (FK) | Bảng Cha (Parent) | Hành vi ON DELETE | Lý Do Kiến Trúc |
| :--- | :--- | :--- | :--- | :--- |
| `user_roles` | `user_id` | `users(id)` | `CASCADE` | Khi tài khoản người dùng bị xóa, vai trò gán tương ứng tự động bị xóa. |
| `user_roles` | `role_id` | `roles(id)` | `CASCADE` | Khi một vai trò bị hủy, quan hệ phân vai trò tương ứng tự động xóa. |
| `role_permissions` | `role_id` | `roles(id)` | `CASCADE` | Khi vai trò bị xóa, quyền hạn của vai trò bị dọn dẹp. |
| `role_permissions` | `permission_id` | `permissions(id)` | `CASCADE` | Khi một quyền hạn bị hủy, liên kết phân quyền bị xóa. |
| `applications` | `user_id` | `users(id)` | `RESTRICT` | **Bảo toàn pháp lý:** Không cho phép xóa người dùng khi đang có hồ sơ dự tuyển. |
| `applications` | `category_id` | `license_categories(id)`| `RESTRICT` | Không thể xóa hạng GPLX khi đang có hồ sơ đã nộp theo hạng đó. |
| `applications` | `reviewed_by` | `users(id)` | `SET NULL` | Giữ nguyên hồ sơ và ngày duyệt kể cả khi cán bộ duyệt nghỉ việc. |
| `application_documents` | `application_id` | `applications(id)` | `CASCADE` | Tài liệu đính kèm phụ thuộc hoàn toàn vào hồ sơ. |
| `application_status_history`| `application_id`| `applications(id)` | `CASCADE` | Lịch sử thẩm định đi liền với hồ sơ. |
| `course_lessons` | `course_id` | `courses(id)` | `CASCADE` | Các bài giảng thuộc về cấu trúc môn học của khóa học. |
| `learning_progress` | `user_id` | `users(id)` | `CASCADE` | Tiến độ học tập của người dùng. |
| `learning_progress` | `lesson_id` | `course_lessons(id)` | `CASCADE` | Tiến độ gắn với bài giảng. |
| `theory_answers` | `question_id` | `theory_questions(id)` | `CASCADE` | Các đáp án lựa chọn thuộc về câu hỏi trắc nghiệm cha. |
| `class_enrollments` | `class_id` | `training_classes(id)` | `CASCADE` | Danh sách lớp học. |
| `class_enrollments` | `student_id` | `users(id)` | `RESTRICT` | Không được xóa học viên khi đang học trong một lớp đang mở. |
| `training_schedules` | `class_id` | `training_classes(id)` | `CASCADE` | Thời khóa biểu của lớp học. |
| `training_schedules` | `vehicle_id` | `vehicles(id)` | `SET NULL` | Giữ lịch học nếu xe tập lái được đổi sang xe khác. |
| `attendance_records` | `schedule_id`| `training_schedules(id)` | `CASCADE` | Bản ghi điểm danh của ca học. |
| `dat_practice_sessions`| `student_id`| `users(id)` | `RESTRICT` | Bảo vệ dữ liệu giám sát hành trình DAT của học viên. |
| `dat_practice_sessions`| `vehicle_id`| `vehicles(id)` | `RESTRICT` | Không thể xóa xe tập lái khi đã có dữ liệu hành trình DAT đã ghi. |
| `exam_candidates` | `session_id` | `exam_sessions(id)` | `CASCADE` | Danh sách thí sinh của kỳ thi. |
| `exam_candidates` | `student_id` | `users(id)` | `RESTRICT` | Không được xóa học viên đang đăng ký kỳ thi. |
| `exam_results` | `candidate_id` | `exam_candidates(id)` | `CASCADE` | Kết quả thi gắn liền với thí sinh dự thi. |
| `fee_invoices` | `user_id` | `users(id)` | `RESTRICT` | Không thể xóa người dùng khi đang có hóa đơn công nợ chưa tất toán. |
| `payment_receipts` | `invoice_id` | `fee_invoices(id)` | `RESTRICT` | **Chứng từ tài chính bất biến:** Không được xóa hóa đơn khi đã có biên lai nộp tiền. |
| `vehicle_maintenances` | `vehicle_id` | `vehicles(id)` | `CASCADE` | Nhật ký bảo dưỡng gắn liền với phương tiện. |
| `audit_logs` | `user_id` | `users(id)` | `SET NULL` | Bảo toàn nhật ký kiểm toán vĩnh viễn kể cả khi người dùng bị xóa. |
