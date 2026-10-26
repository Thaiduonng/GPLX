# Ma Trận Truy Vết Pháp Lý — Dữ Liệu — Mã Nguồn (Legal-Database Traceability Matrix)
`docs/knowledge/legal-database-traceability.md`

Tài liệu này thiết lập mối liên kết toàn vẹn hai chiều (Bidirectional Traceability) giữa Văn bản quy phạm pháp luật, Quy tắc nghiệp vụ, Cấu trúc Cơ sở dữ liệu, API Endpoints và Test Cases kiểm chứng trong hệ thống GPLX Training System (đã đối chiếu thực tế 100% với MySQL 8.4 LTS runtime schema).

---

## 1. Bảng Ma Trận Truy Vết Tổng Thể

| Rule ID | Nguồn Pháp Luật (`source_id`) | Điều Khoản Căn Cứ | Quy Tắc Nghiệp Vụ Suy Ra | Module Chịu Trách Nhiệm | Bảng / Cột CSDL Liên Quan | API Endpoint Áp Dụng | Test Case Kiểm Chứng | Trạng Thái Xác Minh |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`LEG-LICENSE-001`** | `SRC-LAW-01` (Luật 36/2024/QH15) | Điều 57 Khoản 1 Điểm a-m | Hệ thống phân hạng GPLX mới (A1, A, B1, B, C1, C) | `admission` | `license_categories.code`, `name` | `GET /api/v1/admissions/categories` | `AdmissionServiceTest.testGetCategories()` | `VERIFIED` |
| **`LEG-ADMISSION-001`** | `SRC-LAW-01` (Luật 36/2024/QH15) | Điều 59 Khoản 1 Điểm a, b | `ADM-004`: Kiểm tra tuổi tối thiểu khi tiếp nhận hồ sơ | `admission` | `license_categories.min_age`, `applications.date_of_birth` | `POST /api/v1/admissions/applications` | `AdmissionServiceTest.testAgeValidation()` | `VERIFIED` |
| **`LEG-ADMISSION-002`** | `SRC-TTLT-01` (TTLT 24/2015/TTLT) | Tiêu chuẩn y tế lái xe | Bắt buộc nộp Giấy khám sức khỏe hợp lệ | `admission` | `application_documents.document_type` | `POST /api/v1/admissions/applications` | `AdmissionServiceTest.testDocumentUpload()` | `VERIFIED` |
| **`LEG-TRAINING-001`** | `SRC-TT-02` (Thông tư 04/2022/TT-BGTVT)| Điều 13a, 14 | `TRN-003`: Bắt buộc thực hành đường trường và lưu vết DAT | `training` | `dat_practice_sessions.distance_km`, `duration_minutes`, `status` | `GET /api/v1/training/dat/summary` | `TrainingServiceTest.testDatAccumulation()` | `VERIFIED` |
| **`LEG-TRAINING-002`** | `SRC-TT-02` (Thông tư 04/2022/TT-BGTVT)| Điều 13a | Đào tạo mô phỏng trên thiết bị Cabin điện tử | `training` | `training_schedules.schedule_type = 'CABIN_SIMULATION'` | `GET /api/v1/training/classes/{id}/schedules` | `TrainingServiceTest.testCabinSchedule()` | `VERIFIED` |
| **`LEG-TRAINING-003`** | `SRC-TT-01`, `SRC-TT-03` | Thông tư hướng dẫn mới | Định mức km/giờ DAT chi tiết cho từng hạng xe | `training` | Tham số hóa ngưỡng km/giờ (hoặc cột trong `license_categories`) | `GET /api/v1/training/dat/summary` | `DatPracticeServiceImplTest.testTargetThreshold()` | `NEEDS_VERIFICATION` |
| **`LEG-ELIGIBILITY-001`**| `SRC-TT-01` (Thông tư 12/2017/TT-BGTVT)| Điều 25 | `EXM-001`: Đủ điều kiện dự thi (Hồ sơ duyệt, học phí đủ, đủ giờ/km DAT) | `examination` | `applications.status`, `fee_invoices.status`, `exam_candidates.eligibility_status` | `GET /api/v1/examinations/eligibility/check` | `ExaminationServiceTest.testEligibilityCheck()` | `VERIFIED` |
| **`LEG-EXAM-001`** | `SRC-TT-01`, Hướng dẫn CĐBVN | Quy chế 600 câu | `LRN-002`: Sai câu hỏi điểm liệt trượt ngay bài thi lý thuyết | `learning` | `theory_questions.is_paralysis` | `POST /api/v1/learning/theory-test/submit` | `LearningServiceTest.testCriticalQuestionFailure()` | `VERIFIED` |
| **`LEG-EXAM-002`** | `SRC-TT-01` (Thông tư 12/2017/TT-BGTVT)| Quy trình chấm sa hình | `EXM-003`: Điểm sa hình >= 80/100 mới đạt | `examination` | `exam_results.yard_score`, `yard_passed`, `final_result` | `POST /api/v1/examinations/sessions/{id}/results` | `ExaminationServiceTest.testGradingPracticeYard()` | `VERIFIED` |
| **`LEG-DATA-001`** | `SRC-ND-01` (Nghị định 13/2023/NĐ-CP) | Điều 9, 13, 17 | `REP-001`: Bảo vệ dữ liệu cá nhân, bất biến Audit Logs | `reporting` | `audit_logs` (user_id, action, resource_type, ip_address, created_at) | `GET /api/v1/audit-logs` | `AuditLogServiceTest.testImmutableAuditLog()` | `VERIFIED` |

---

## 2. Các Quy Tắc Vận Hành Nội Bộ Cơ Sở (Internal Rules — Không Thuộc Luật Định Bắt Buộc)

| Rule ID | Tên Quy Tắc | Module | Bảng CSDL Liên Quan | Ý Nghĩa Vận Hành Nội Bộ |
| :--- | :--- | :--- | :--- | :--- |
| **`ADM-001`** | Máy trạng thái xét duyệt hồ sơ | `admission` | `applications.status`, `application_status_history` | Quy trình duyệt: SUBMITTED ➔ UNDER_REVIEW ➔ APPROVED / REJECTED / SUPPLEMENT_REQUIRED |
| **`ADM-002`** | Bắt buộc nhập lý do từ chối hồ sơ | `admission` | `applications.rejection_reason` | Minh bạch hóa lý do từ chối để học viên nắm rõ và bổ sung hồ sơ |
| **`ADM-003`** | Khóa sửa thông tin khi hồ sơ đã duyệt | `admission` | `applications.version` | Chống gian lận thay đổi thông tin người học sau khi đã nộp báo cáo Sở |
| **`TRN-001`** | Chống xung đột lịch giáo viên | `training` | `training_schedules.instructor_id`, `start_time`, `end_time` | Một giáo viên không thể ở 2 địa điểm/ca học cùng lúc |
| **`TRN-002`** | Khung giờ điểm danh hợp lệ | `training` | `attendance_records.checked_in_at` | Điểm danh trong khung giờ ca học +/- 30 phút theo cấu hình |
| **`FIN-001`** | Idempotency Key thanh toán học phí | `finance` | `payment_receipts.idempotency_key` | Chống thu kép hoặc phát hành 2 biên lai do người dùng nhấn thanh toán nhiều lần |
| **`FIN-002`** | Chứng từ tài chính bất biến vĩnh viễn| `finance` | `payment_receipts` | Không hỗ trợ xóa biên lai; xử lý sai lệch bằng nghiệp vụ điều chỉnh |
| **`FLT-001`** | Khóa xe quá hạn đăng kiểm hoặc bảo dưỡng| `fleet` | `vehicles.inspection_expiry_date`, `status` | Đảm bảo an toàn kỹ thuật phương tiện tập lái khi đưa vào giảng dạy |
| **`EXM-002`** | Khóa sổ kết quả kỳ thi vĩnh viễn | `examination` | `exam_results.final_result` | Kết quả thi sau khi ký biên bản không được sửa đổi trực tiếp |

---

## 3. Các Vấn Đề Còn Cần Xác Minh & Kế Hoạch Xử Lý (Open Action Items)

1. **`LEG-TRAINING-003` (Số giờ & số km DAT chính thức theo Thông tư hướng dẫn Luật số 36/2024/QH15):**
   - *Thực trạng trong mã nguồn:* Trong `DatPracticeServiceImpl.java`, hệ thống đang tạm hard-code hằng số `TARGET_DISTANCE_KM = 810.0` và `TARGET_DURATION_MINUTES = 1200` (dành cho hạng B1 cũ). Trong khi đó, người học đăng ký các hạng khác (như A1, A, C, C1) cần các định mức khác biệt hoặc không yêu cầu DAT.
   - *Rủi ro phát hiện:* Quy tắc đang ở trạng thái `NEEDS_VERIFICATION` nhưng lại được áp dụng số cứng trực tiếp trong logic hoàn thành DAT của học viên.
   - *Kế hoạch khắc phục:*
     - Thêm cấu hình tham số động vào bảng `license_categories` (cột `min_dat_distance_km`, `min_dat_duration_hours`) hoặc cấu hình `application.yml`.
     - Hiển thị nhãn chú thích trên giao diện người dùng: "Định mức thực hành DAT đang áp dụng tạm thời theo Thông tư 04/2022/TT-BGTVT và chờ văn bản hướng dẫn chi tiết theo Luật TTATGTĐB 2024".
