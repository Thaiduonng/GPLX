# Từ Điển Dữ Liệu (Data Dictionary)
`docs/knowledge/data-dictionary.md`

Tài liệu này định nghĩa chi tiết ngữ nghĩa nghiệp vụ, kiểu dữ liệu, các ràng buộc validation, tính nhạy cảm PII và vòng đời của từng cột dữ liệu trọng yếu trong hệ thống GPLX Training System.

---

## 1. Dữ Liệu Định Danh & Nhân Thân (Identity & PII)

| Bảng | Tên Cột | Kiểu Dữ Liệu | Bắt Buộc | Đơn Vị | Giá Trị Hợp Lệ / Enum | Dữ Liệu Nhạy Cảm (PII) | Ý Nghĩa Nghiệp Vụ & Quy Tắc Validation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `users` | `username` | VARCHAR(50) | YES | - | Ký tự alphanumeric, 3-50 ký tự | KHÔNG | Tên đăng nhập duy nhất (`UK`), không phân biệt hoa thường. |
| `users` | `email` | VARCHAR(100) | YES | - | Chuẩn email RFC 5322 | CÓ (PII) | Email liên hệ và nhận thông báo kết quả thi, duy nhất (`UK`). |
| `users` | `password_hash` | VARCHAR(255) | YES | - | Chuỗi băm BCrypt 60 ký tự | CỰC KỲ NHẠY CẢM | Mật khẩu tài khoản đã mã hóa một chiều qua BCrypt (10 rounds). |
| `users` | `full_name` | VARCHAR(100) | YES | - | Chuỗi ký tự Unicode, tối đa 100 | CÓ (PII) | Họ và tên đầy đủ của người dùng theo giấy tờ tùy thân. |
| `users` | `phone` | VARCHAR(20) | NO | - | Chuẩn định dạng số ĐT VN (10 số) | CÓ (PII) | Số điện thoại di động học viên / cán bộ. |
| `users` | `is_active` | TINYINT(1) | YES | - | `1` (Active), `0` (Locked) | KHÔNG | Cờ kiểm soát quyền đăng nhập của tài khoản. |

---

## 2. Dữ Liệu Tuyển Sinh & Hồ Sơ Điện Tử (Admission & Dossiers)

| Bảng | Tên Cột | Kiểu Dữ Liệu | Bắt Buộc | Đơn Vị | Giá Trị Hợp Lệ / Enum | Dữ Liệu Nhạy Cảm (PII) | Ý Nghĩa Nghiệp Vụ & Quy Tắc Validation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `license_categories` | `code` | VARCHAR(20) | YES | - | `A1`, `A`, `B1`, `B`, `C1`, `C`, `D1`, `D2`, `D`, `BE`,... | KHÔNG | Mã hạng Giấy phép lái xe theo Luật Trật tự, ATGT đường bộ. |
| `license_categories` | `min_age` | INT | YES | Tuổi | Số nguyên từ 18 đến 27 | KHÔNG | Độ tuổi tối thiểu được phép học và dự sát hạch theo luật quy định. |
| `license_categories` | `tuition_fee` | DECIMAL(15,2) | YES | VNĐ | Số thực dương | KHÔNG | Mức học phí đào tạo trọn gói chuẩn của cơ sở. |
| `applications` | `application_code`| VARCHAR(50) | YES | - | Tiền tố `HS-` + Mã hạng + Thời gian | KHÔNG | Mã định danh hồ sơ điện tử duy nhất toàn hệ thống (`UK`). |
| `applications` | `national_id` | VARCHAR(20) | YES | - | 12 chữ số (CCCD gắn chip) | CỰC KỲ NHẠY CẢM | Số căn cước công dân của người học. Chống nộp trùng (`ADM-005`). |
| `applications` | `date_of_birth` | DATE | YES | - | Ngày hợp lệ trong quá khứ | CÓ (PII) | Ngày sinh dùng để kiểm tra độ tuổi học viên theo `min_age`. |
| `applications` | `status` | VARCHAR(30) | YES | - | `SUBMITTED`, `UNDER_REVIEW`, `APPROVED`, `REJECTED`, `SUPPLEMENT_REQUIRED` | KHÔNG | Trạng thái thẩm định hồ sơ theo máy trạng thái `ADM-001`. |
| `applications` | `rejection_reason`| TEXT | NO | - | Chuỗi ký tự tiếng Việt có dấu | KHÔNG | Bắt buộc phải có khi trạng thái là `REJECTED` hoặc `SUPPLEMENT_REQUIRED`. |
| `applications` | `version` | BIGINT | YES | - | Số nguyên >= 0 | KHÔNG | Khóa phiên bản chống ghi đè dữ liệu đồng thời (Optimistic Lock). |
| `application_documents` | `document_type` | VARCHAR(50) | YES | - | `NATIONAL_ID_FRONT`, `NATIONAL_ID_BACK`, `HEALTH_CERTIFICATE`, `PORTRAIT_PHOTO`, `OTHER` | CÓ (PII) | Phân loại tài liệu số hóa nộp kèm hồ sơ. |

---

## 3. Dữ Liệu Đào Tạo, E-Learning & Giám Sát DAT (Learning & Training)

| Bảng | Tên Cột | Kiểu Dữ Liệu | Bắt Buộc | Đơn Vị | Giá Trị Hợp Lệ / Enum | Dữ Liệu Nhạy Cảm | Ý Nghĩa Nghiệp Vụ & Quy Tắc Validation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `theory_questions` | `is_critical` | TINYINT(1) | YES | - | `1` (Điểm liệt), `0` (Bình thường) | KHÔNG | Câu hỏi điểm liệt; nếu học viên trả lời sai sẽ trượt ngay bài thi lý thuyết. |
| `training_schedules`| `schedule_type` | VARCHAR(30) | YES | - | `THEORY`, `PRACTICE_YARD`, `PRACTICE_ROAD`, `CABIN_SIMULATION` | KHÔNG | Hình thức học: Lý thuyết tập trung, Sa hình, Đường trường, Cabin. |
| `dat_practice_sessions`| `distance_km`| DECIMAL(8,2) | YES | Kilômét | Số thực >= 0 | KHÔNG | Quãng đường học viên thực hành lái xe đường trường ghi nhận qua DAT. |
| `dat_practice_sessions`| `duration_minutes`| INT | YES | Phút | Số nguyên >= 0 | KHÔNG | Thời gian thực hành thực tế được thiết bị giám sát công nhận. |
| `dat_practice_sessions`| `is_valid` | TINYINT(1) | YES | - | `1` (Hợp lệ), `0` (Không hợp lệ) | KHÔNG | Cờ công nhận phiên học (loại trừ nếu vi phạm tốc độ hoặc gian lận khuôn mặt). |

---

## 4. Dữ Liệu Sát Hạch & Đánh Giá Điều Kiện (Examination)

| Bảng | Tên Cột | Kiểu Dữ Liệu | Bắt Buộc | Đơn Vị | Giá Trị Hợp Lệ / Enum | Dữ Liệu Nhạy Cảm | Ý Nghĩa Nghiệp Vụ & Quy Tắc Validation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `exam_sessions` | `exam_type` | VARCHAR(30) | YES | - | `GRADUATION` (Thi tốt nghiệp), `CERTIFICATION` (Sát hạch cấp bằng) | KHÔNG | Phân loại kỳ thi sát hạch theo cấp thẩm quyền. |
| `exam_sessions` | `status` | VARCHAR(30) | YES | - | `SCHEDULED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED` | KHÔNG | Tiến trình tổ chức kỳ thi sát hạch. |
| `exam_candidates` | `eligibility_status`| VARCHAR(30)| YES | - | `ELIGIBLE`, `INELIGIBLE`, `PENDING_REVIEW` | KHÔNG | Kết luận đủ điều kiện dự thi dựa trên hồ sơ, học phí và tiến độ DAT. |
| `exam_results` | `theory_score` | INT | NO | Điểm | Số câu đúng (0 đến 35/40 tùy hạng) | KHÔNG | Điểm thi trắc nghiệm lý thuyết. |
| `exam_results` | `simulation_score`| INT | NO | Điểm | Thang điểm 0 - 50 | KHÔNG | Điểm thi phần mềm mô phỏng các tình huống giao thông. |
| `exam_results` | `practice_yard_score`| INT | NO | Điểm | Thang điểm 0 - 100 | KHÔNG | Điểm thi thực hành lái xe trong sa hình (Đạt từ 80/100 trở lên). |
| `exam_results` | `practice_road_score`| INT | NO | Điểm | Thang điểm 0 - 100 | KHÔNG | Điểm thi thực hành lái xe trên đường giao thông công cộng. |
| `exam_results` | `final_result` | VARCHAR(20) | YES | - | `PASSED` (Đỗ), `FAILED` (Trượt) | KHÔNG | Kết luận chung của kỳ sát hạch. Bất biến sau khi khóa sổ. |

---

## 5. Dữ Liệu Tài Chính & Xe Tập Lái (Finance & Fleet)

| Bảng | Tên Cột | Kiểu Dữ Liệu | Bắt Buộc | Đơn Vị | Giá Trị Hợp Lệ / Enum | Dữ Liệu Nhạy Cảm | Ý Nghĩa Nghiệp Vụ & Quy Tắc Validation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `fee_invoices` | `total_amount` | DECIMAL(15,2) | YES | VNĐ | Số tiền >= 0 | KHÔNG | Tổng học phí phải nộp theo quy định của hạng GPLX. |
| `fee_invoices` | `paid_amount` | DECIMAL(15,2) | YES | VNĐ | Số tiền >= 0 | KHÔNG | Số tiền học viên đã thanh toán lũy kế. |
| `fee_invoices` | `status` | VARCHAR(30) | YES | - | `PENDING`, `PARTIALLY_PAID`, `PAID`, `CANCELLED` | KHÔNG | Trạng thái công nợ học phí của học viên. |
| `payment_receipts` | `idempotency_key`| VARCHAR(100) | YES | - | Chuỗi UUID v4 duy nhất (`UK`) | KHÔNG | Khóa chống thanh toán trùng lặp (FIN-001). |
| `vehicles` | `plate_number` | VARCHAR(20) | YES | - | Biển số xe chuẩn VN (VD: `29A-888.12`) | KHÔNG | Biển kiểm soát phương tiện tập lái (`UK`). |
| `vehicles` | `inspection_expiry_date`| DATE | YES | - | Ngày kiểm định còn hiệu lực | KHÔNG | Hạn đăng kiểm xe tập lái; nếu hết hạn xe sẽ bị khóa lịch học (FLT-001). |
| `vehicles` | `status` | VARCHAR(30) | YES | - | `AVAILABLE`, `IN_USE`, `MAINTENANCE`, `DECOMMISSIONED` | KHÔNG | Tình trạng sẵn sàng phục vụ của xe tập lái. |

---

## 6. Dữ Liệu Kiểm Toán & Giám Sát (Audit & Compliance)

| Bảng | Tên Cột | Kiểu Dữ Liệu | Bắt Buộc | Đơn Vị | Giá Trị Hợp Lệ / Enum | Dữ Liệu Nhạy Cảm | Ý Nghĩa Nghiệp Vụ & Quy Tắc Validation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `audit_logs` | `action` | VARCHAR(50) | YES | - | `SYSTEM_INITIALIZE`, `APPROVE_APPLICATION`, `PUBLISH_EXAM`, `PAY_TUITION`,... | KHÔNG | Hành động nghiệp vụ quan trọng được kích hoạt trong hệ thống. |
| `audit_logs` | `resource_type` | VARCHAR(50) | YES | - | `SYSTEM`, `ADMISSION`, `EXAMINATION`, `FINANCE`, `USER` | KHÔNG | Phân loại phân hệ hoặc thực thể bị tác động. |
| `audit_logs` | `ip_address` | VARCHAR(50) | NO | - | Địa chỉ IPv4 hoặc IPv6 hợp lệ | CÓ (PII) | Địa chỉ IP của máy khách gửi yêu cầu phục vụ điều tra an ninh. |
| `audit_logs` | `created_at` | DATETIME | YES | - | Múi giờ UTC, giá trị hiện tại | KHÔNG | Thời điểm phát sinh sự kiện. Lưu vĩnh viễn, không xóa. |
