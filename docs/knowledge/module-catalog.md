# Danh Mục Module Nghiệp Vụ (Module Catalog)
`docs/knowledge/module-catalog.md`

Tài liệu này định nghĩa chi tiết ranh giới (`boundaries`), trách nhiệm nghiệp vụ, các bảng cơ sở dữ liệu và API endpoints của từng module trong kiến trúc **Modular Monolith** của GPLX Training System.

---

## 1. Module `identity` (Quản lý Định danh & Xác thực)

- **Package:** `vn.edu.gplx.modules.identity`
- **Trách nhiệm nghiệp vụ:**
  - Đăng ký tài khoản, đăng nhập cấp phát JSON Web Token (Stateless JWT).
  - Quản lý phân quyền RBAC (Role-Based Access Control) cho 7 vai trò chuẩn.
  - Quản lý danh mục quyền hạn (`permissions`) và gán quyền cho vai trò (`role_permissions`).
- **Các bảng CSDL sở hữu:**
  - `users`: Thông tin tài khoản người dùng, mật khẩu hash BCrypt.
  - `roles`: Danh mục vai trò (`ROLE_ADMIN`, `ROLE_MANAGER`, `ROLE_STAFF`, `ROLE_INSTRUCTOR`, `ROLE_EXAMINER`, `ROLE_STUDENT`, `ROLE_COUNSELOR`).
  - `permissions`: Danh mục quyền hạn theo module.
  - `user_roles`: Quan hệ gán vai trò cho người dùng (N:N).
  - `role_permissions`: Quan hệ gán quyền cho vai trò (N:N).
- **Entities JPA:** `User`, `Role`, `Permission`.
- **API Endpoints:**
  - `POST /api/v1/auth/login`: Xác thực đăng nhập.
  - `POST /api/v1/auth/register`: Đăng ký tài khoản người dùng mới.
  - `GET /api/v1/auth/profile`: Xem hồ sơ tài khoản hiện tại.
- **Quy tắc nghiệp vụ liên quan:** `ID-001` (Tên đăng nhập duy nhất), `ID-002` (Email duy nhất), `ID-003` (Mật khẩu BCrypt).

---

## 2. Module `admission` (Tuyển Sinh & Tiếp Nhận Hồ Sơ Điện Tử)

- **Package:** `vn.edu.gplx.modules.admission`
- **Trách nhiệm nghiệp vụ:**
  - Quản lý danh mục hạng bằng lái xe (`license_categories`) và mức học phí, độ tuổi tối thiểu.
  - Tiếp nhận hồ sơ đăng ký dự tuyển trực tuyến của học viên.
  - Quản lý tệp tin tài liệu số hóa (CCCD, Giấy khám sức khỏe, Ảnh chân dung 3x4).
  - Quản lý quy trình máy trạng thái thẩm định hồ sơ: `SUBMITTED` ➔ `UNDER_REVIEW` ➔ `APPROVED` / `REJECTED` / `SUPPLEMENT_REQUIRED`.
  - Ghi nhận nhật ký trạng thái thẩm định (`application_status_history`).
- **Các bảng CSDL sở hữu:**
  - `license_categories`: Danh mục hạng GPLX.
  - `applications`: Hồ sơ đăng ký tuyển sinh của học viên.
  - `application_documents`: Tài liệu số hóa đính kèm hồ sơ.
  - `application_status_history`: Lịch sử các bước xét duyệt hồ sơ.
- **Entities JPA:** `AdmissionApplication`, `AdmissionDocument`, `ApplicationStatusHistory`, `LicenseCategory`.
- **API Endpoints:**
  - `GET /api/v1/admissions/categories`: Danh sách các hạng GPLX đang hoạt động.
  - `POST /api/v1/admissions/applications`: Nộp hồ sơ tuyển sinh mới.
  - `GET /api/v1/admissions/applications`: Tìm kiếm và lọc danh sách hồ sơ tuyển sinh.
  - `GET /api/v1/admissions/applications/my`: Xem các hồ sơ của học viên đang đăng nhập.
  - `GET /api/v1/admissions/applications/{id}`: Xem chi tiết một bộ hồ sơ.
  - `PUT /api/v1/admissions/applications/{id}/review`: Thẩm định phê duyệt hoặc từ chối hồ sơ.
- **Quy tắc nghiệp vụ liên quan:** `ADM-001` (Máy trạng thái), `ADM-002` (Bắt buộc lý do khi từ chối), `ADM-003` (Bảo toàn hồ sơ đã duyệt), `ADM-004` (Độ tuổi tối thiểu), `ADM-005` (Chống nộp trùng CCCD).

---

## 3. Module `learning` (Đào Tạo Lý Thuyết & E-Learning)

- **Package:** `vn.edu.gplx.modules.learning`
- **Trách nhiệm nghiệp vụ:**
  - Quản lý chương trình học lý thuyết, môn học và bài giảng số hóa.
  - Theo dõi tiến độ học trực tuyến của từng học viên theo từng bài giảng.
  - Quản lý ngân hàng 600 câu hỏi lý thuyết sát hạch (phân loại câu hỏi điểm liệt).
  - Cung cấp tính năng làm đề thi thử lý thuyết và tính điểm tức thì.
- **Các bảng CSDL sở hữu:**
  - `courses`: Danh mục khóa học lý thuyết theo từng hạng bằng.
  - `course_lessons`: Các bài giảng chi tiết trong khóa học.
  - `learning_progress`: Tiến độ và thời lượng học bài giảng của học viên.
  - `theory_questions`: Ngân hàng câu hỏi trắc nghiệm lý thuyết.
  - `theory_answers`: Các phương án trả lời và đáp án đúng.
- **Entities JPA:** `Course`, `CourseLesson`, `LearningProgress`, `TheoryQuestion`, `TheoryAnswer`.
- **API Endpoints:**
  - `GET /api/v1/learning/courses`: Danh sách khóa học theo hạng bằng.
  - `GET /api/v1/learning/courses/{courseId}/lessons`: Danh sách bài học của khóa.
  - `POST /api/v1/learning/lessons/{lessonId}/progress`: Cập nhật tiến độ hoàn thành bài học.
  - `GET /api/v1/learning/theory-test/mock-exam`: Tạo đề thi thử ngẫu nhiên từ ngân hàng câu hỏi.
  - `POST /api/v1/learning/theory-test/submit`: Nộp bài thi thử lý thuyết và nhận kết quả.
- **Quy tắc nghiệp vụ liên quan:** `LRN-001` (Lưu vết tiến độ chi tiết), `LRN-002` (Sai câu điểm liệt trượt ngay bài thi thử).

---

## 4. Module `training` (Tổ Chức Lớp & Giám Sát Thực Hành DAT)

- **Package:** `vn.edu.gplx.modules.training`
- **Trách nhiệm nghiệp vụ:**
  - Quản lý các lớp đào tạo lái xe tập trung theo từng khóa.
  - Xếp lịch đào tạo (Lý thuyết, Thực hành Sa hình, Đường trường DAT, Mô phỏng Cabin) không xung đột giáo viên và xe.
  - Điểm danh học viên tham gia từng buổi học.
  - Thu thập, giám sát và tổng hợp dữ liệu quãng đường (km) và thời gian (giờ) thực hành lái xe đường trường từ thiết bị giám sát hành trình DAT.
- **Các bảng CSDL sở hữu:**
  - `training_classes`: Danh mục lớp học và thông tin khóa đào tạo.
  - `class_enrollments`: Danh sách học viên được ghi danh vào lớp.
  - `training_schedules`: Thời khóa biểu các ca học.
  - `attendance_records`: Bản ghi điểm danh học viên từng buổi.
  - `dat_practice_sessions`: Dữ liệu chi tiết từng phiên thực hành lái xe đường trường DAT.
- **Entities JPA:** `TrainingClass`, `ClassEnrollment`, `TrainingSchedule`, `AttendanceRecord`, `DatPracticeSession`.
- **API Endpoints:**
  - `GET /api/v1/training/classes`: Danh sách lớp đào tạo.
  - `GET /api/v1/training/classes/{classId}/schedules`: Thời khóa biểu của một lớp.
  - `POST /api/v1/training/schedules/{scheduleId}/attendance`: Điểm danh ca học.
  - `GET /api/v1/training/dat/summary`: Xem tiến độ tích lũy DAT của học viên.
- **Quy tắc nghiệp vụ liên quan:** `TRN-001` (Chống xung đột lịch xe & giáo viên), `TRN-002` (Khung giờ điểm danh hợp lệ), `TRN-003` (Đủ số km và số giờ thực hành DAT bắt buộc).

---

## 5. Module `examination` (Tổ Chức Thi Sát Hạch & Kết Quả)

- **Package:** `vn.edu.gplx.modules.examination`
- **Trách nhiệm nghiệp vụ:**
  - Quản lý các kỳ thi (Thi tốt nghiệp cấp chứng chỉ nghề & Thi sát hạch chính thức).
  - Tự động thẩm định điều kiện dự thi của học viên (hồ sơ duyệt, học phí, tiến độ học, hoàn thành DAT).
  - Lập danh sách thí sinh và số báo danh dự thi.
  - Ghi nhận và khóa sổ kết quả 4 phần thi: Lý thuyết, Mô phỏng, Sa hình, Đường trường.
- **Các bảng CSDL sở hữu:**
  - `exam_sessions`: Danh mục các kỳ thi sát hạch.
  - `exam_candidates`: Danh sách thí sinh dự thi và trạng thái điều kiện.
  - `exam_results`: Kết quả điểm số từng nội dung thi và kết luận chung.
- **Entities JPA:** `ExamSession`, `ExamCandidate`, `ExamResult`.
- **API Endpoints:**
  - `GET /api/v1/examinations/sessions`: Danh sách kỳ thi sát hạch.
  - `POST /api/v1/examinations/sessions`: Tạo mới kỳ thi sát hạch.
  - `POST /api/v1/examinations/sessions/{id}/register`: Đăng ký thí sinh vào kỳ thi.
  - `GET /api/v1/examinations/eligibility/check`: Kiểm tra tự động điều kiện dự thi của học viên.
  - `POST /api/v1/examinations/sessions/{id}/results`: Nhập điểm và kết quả thi sát hạch.
  - `GET /api/v1/examinations/results/my`: Xem kết quả thi của thí sinh đăng nhập.
- **Quy tắc nghiệp vụ liên quan:** `EXM-001` (Điều kiện dự thi bắt buộc), `EXM-002` (Bất biến kết quả sau khi khóa sổ), `EXM-003` (Tiêu chí đỗ từng phần thi).

---

## 6. Module `finance` (Tài Chính & Quản Lý Học Phí)

- **Package:** `vn.edu.gplx.modules.finance`
- **Trách nhiệm nghiệp vụ:**
  - Phát hành hóa đơn học phí tương ứng với hồ sơ trúng tuyển.
  - Thu học phí, phát hành biên lai thu tiền.
  - Cơ chế kiểm soát khóa Idempotency Key để chống tình trạng thu trùng, phát hành 2 biên lai cho cùng một giao dịch thanh toán.
- **Các bảng CSDL sở hữu:**
  - `fee_invoices`: Hóa đơn học phí phát sinh theo hồ sơ.
  - `payment_receipts`: Biên lai thu học phí chi tiết.
- **Entities JPA:** `FeeInvoice`, `PaymentReceipt`.
- **API Endpoints:**
  - `GET /api/v1/finance/invoices`: Danh sách hóa đơn học phí.
  - `GET /api/v1/finance/invoices/my`: Danh sách hóa đơn của học viên đăng nhập.
  - `POST /api/v1/finance/invoices/{id}/pay`: Thu học phí và tạo biên lai.
- **Quy tắc nghiệp vụ liên quan:** `FIN-001` (Idempotency Key), `FIN-002` (Bảo toàn vĩnh viễn chứng từ tài chính), `FIN-003` (Hoàn thành học phí mới đủ điều kiện thi).

---

## 7. Module `fleet` (Quản Lý Phương Tiện & Bảo Dưỡng)

- **Package:** `vn.edu.gplx.modules.fleet`
- **Trách nhiệm nghiệp vụ:**
  - Quản lý danh mục xe tập lái, biển số, loại hộp số (Số sàn / Số tự động), hạng xe tương ứng.
  - Theo dõi hạn kiểm định đăng kiểm xe tập lái.
  - Theo dõi lịch bảo dưỡng định kỳ và chi phí sửa chữa kỹ thuật xe.
- **Các bảng CSDL sở hữu:**
  - `vehicles`: Danh mục xe tập lái của cơ sở đào tạo.
  - `vehicle_maintenances`: Nhật ký bảo dưỡng, sửa chữa xe tập lái.
- **Entities JPA:** `Vehicle`, `VehicleMaintenance`.
- **API Endpoints:**
  - `GET /api/v1/fleet/vehicles`: Danh sách xe tập lái.
  - `POST /api/v1/fleet/vehicles`: Thêm mới xe tập lái.
  - `POST /api/v1/fleet/vehicles/{id}/maintenance`: Ghi nhận bảo dưỡng xe.
- **Quy tắc nghiệp vụ liên quan:** `FLT-001` (Xe hết hạn đăng kiểm hoặc đang bảo dưỡng không được phân lịch học).

---

## 8. Module `reporting` & `support` (Báo Cáo KPI, CRM & Audit Logs)

- **Package:** `vn.edu.gplx.modules.reporting`
- **Trách nhiệm nghiệp vụ:**
  - Tổng hợp Dashboard KPI: Số lượng hồ sơ, tỷ lệ đỗ sát hạch theo hạng, doanh thu học phí.
  - Lưu trữ và truy vấn nhật ký kiểm toán hệ thống (`audit_logs`) bất biến phục vụ thanh tra.
  - Quản lý thông tin học viên tiềm năng (`crm_leads`) và thông báo (`notifications`).
- **Các bảng CSDL sở hữu:**
  - `audit_logs`: Nhật ký kiểm toán các hành động nhạy cảm trong hệ thống.
  - `notifications`: Danh sách thông báo đẩy gửi tới người dùng.
  - `crm_leads`: Khách hàng tiềm năng cần tư vấn.
- **Entities JPA:** `AuditLog`.
- **API Endpoints:**
  - `GET /api/v1/reports/kpi-dashboard`: Thống kê KPI tổng thể cơ sở đào tạo.
  - `GET /api/v1/audit-logs`: Truy vấn lịch sử kiểm toán hệ thống (Chỉ dành cho ADMIN).
- **Quy tắc nghiệp vụ liên quan:** `REP-001` (Bất biến Audit Log), `NTF-001` (Chống trùng lặp thông báo qua deduplication key).
