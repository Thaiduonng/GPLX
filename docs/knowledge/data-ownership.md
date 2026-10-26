# Quyền Sở Hữu Dữ Liệu Theo Phân Hệ (Data Ownership)
`docs/knowledge/data-ownership.md`

Tài liệu này xác định ranh giới sở hữu nghiệp vụ (Business Ownership), quyền hạn đọc/ghi và quy chuẩn tương tác liên module trong kiến trúc **Modular Monolith** của GPLX Training System.

---

## 1. Nguyên Tắc Cốt Lõi Về Quyền Sở Hữu Dữ Liệu

> [!IMPORTANT]
> **Nguyên tắc "Đơn quyền sở hữu" (Single Ownership Principle):**
> Mỗi bảng cơ sở dữ liệu chỉ do **DUY NHẤT MỘT MODULE** làm chủ sở hữu (Owner).
> - Chỉ module chủ sở hữu mới có quyền thực thi các câu lệnh `INSERT`, `UPDATE`, `DELETE` trên bảng đó thông qua JPA Repository của chính nó.
> - Các module khác tuyệt đối **KHÔNG ĐƯỢC PHÉP** can thiệp trực tiếp vào bảng của module khác. Mọi nhu cầu thay đổi dữ liệu phải thông qua Public Service Interface hoặc phát tán sự kiện nghiệp vụ (`Spring ApplicationEvent`).

---

## 2. Bảng Phân Định Quyền Sở Hữu Chi Tiết

| Module Nghiệp Vụ | Bảng Thuộc Quyền Sở Hữu Độc Quyền | Quyền Ghi (Write / Modify) | Giao Diện Giao Tiếp Công Khai (Contract API) |
| :--- | :--- | :--- | :--- |
| **`identity`** | `users`, `roles`, `permissions`, `user_roles`, `role_permissions` | Chỉ `AuthService` và `IdentityService` | `UserService`, `UserPrincipal`, `JwtService` |
| **`admission`** | `license_categories`, `applications`, `application_documents`, `application_status_history` | Chỉ `AdmissionService` | `AdmissionService.getApplicationById()`, `AdmissionService.getCategories()` |
| **`learning`** | `courses`, `course_lessons`, `learning_progress`, `theory_questions`, `theory_answers` | Chỉ `LearningService` | `LearningService.getStudentProgress()` |
| **`training`** | `training_classes`, `class_enrollments`, `training_schedules`, `attendance_records`, `dat_practice_sessions` | Chỉ `TrainingService` | `TrainingService.getMyDatSummary()`, `TrainingService.isStudentEligibleDAT()` |
| **`examination`** | `exam_sessions`, `exam_candidates`, `exam_results` | Chỉ `ExaminationService` | `ExaminationService.checkEligibility()`, `ExaminationService.recordResult()` |
| **`finance`** | `fee_invoices`, `payment_receipts` | Chỉ `FinanceService` | `FinanceService.createInvoice()`, `FinanceService.isTuitionFullyPaid()` |
| **`fleet`** | `vehicles`, `vehicle_maintenances` | Chỉ `FleetService` | `FleetService.getAvailableVehicles()`, `FleetService.checkVehicleStatus()` |
| **`reporting`** | `audit_logs` | Chỉ `AuditLogService` (Chỉ INSERT) | `AuditLogService.logEvent()` |
| **`support`** | `notifications`, `crm_leads` | Chỉ `NotificationService` / `CrmService` | `NotificationService.sendNotification()` |

---

## 3. Quy Chuẩn Tương Tác Liên Module (Inter-Module Communication)

### 3.1. Truy vấn Dữ liệu (Querying)
- Khi Module A cần đọc dữ liệu từ Module B:
  - **Cách làm đúng:** Module A inject Public Service Interface của Module B và gọi phương thức trả về DTO độc lập (Ví dụ: `ExaminationService` gọi `TrainingService.getMyDatSummary(studentId)`).
  - **Cách làm sai:** Module A inject trực tiếp `DatPracticeSessionRepository` hoặc join SQL trực tiếp bảng `dat_practice_sessions`.

### 3.2. Thay đổi Trạng thái Dữ liệu (State Changes)
- **Kịch bản ví dụ: Thẩm định duyệt hồ sơ tuyển sinh:**
  1. `AdmissionService` cập nhật trạng thái `applications.status = 'APPROVED'`.
  2. `AdmissionService` ghi lịch sử vào `application_status_history`.
  3. `AdmissionService` gọi `FinanceService.generateInvoice(applicationId, fee)` để module Finance tạo hóa đơn.
  4. `AdmissionService` phát tán sự kiện `ApplicationApprovedEvent` để module Notification gửi thông báo cho học viên.
- **Không bao giờ:** `AdmissionService` tự mở `FeeInvoiceRepository` để `save()` hóa đơn.

---

## 4. Chống Thất Thoát Dữ Liệu & Ràng Buộc Khóa Ngoại

- Mặc dù dữ liệu phân tách theo module, tính toàn vẹn cấp CSDL vẫn được bảo đảm qua các Foreign Key ở mức `RESTRICT` hoặc `SET NULL` theo tài liệu `database-relationships.md`.
- Trường hợp xóa dữ liệu người dùng (`users`): Ràng buộc `RESTRICT` ở các bảng nghiệp vụ (`applications`, `fee_invoices`, `exam_candidates`) sẽ chặn đứng thao tác xóa nếu học viên đang có hồ sơ hoặc kỳ thi đang xử lý, bảo đảm không làm gãy tính toàn vẹn dữ liệu.
