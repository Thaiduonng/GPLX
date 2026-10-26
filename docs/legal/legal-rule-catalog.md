# Danh Mục Quy Tắc Pháp Lý Hệ Thống (Legal Rule Catalog)
`docs/legal/legal-rule-catalog.md`

Tài liệu này hệ thống hóa toàn bộ các quy tắc pháp lý bắt buộc (Legal Rules), phân loại trạng thái xác minh, điều khoản căn cứ và liên kết trực tiếp tới mã nguồn hệ thống GPLX Training System.

---

## 1. Bảng Tổng Hợp Quy Tắc Pháp Lý

| Mã Quy Tắc (`rule_id`) | Tên Quy Tắc Pháp Lý | Hạng Áp Dụng | Nguồn Căn Cứ (`source_id`) | Điều Khoản | Trạng Thái Xác Minh | Module Chịu Trách Nhiệm |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`LEG-LICENSE-001`** | Phân hạng Giấy phép lái xe mới | Tất cả các hạng | `SRC-LAW-01` (Luật 36/2024) | Điều 57 Khoản 1 | `VERIFIED` | `admission` |
| **`LEG-LICENSE-002`** | Phân hạng GPLX cũ và quy định chuyển tiếp | A1, B1, B2, C cũ | `SRC-LAW-02`, `SRC-LAW-01` | Điều 89 Luật 36 | `SUPERSEDED` | `admission` |
| **`LEG-ADMISSION-001`**| Độ tuổi tối thiểu học và thi GPLX | A1, A, B1, B, C1, C | `SRC-LAW-01` (Luật 36/2024) | Điều 59 Khoản 1 | `VERIFIED` | `admission` |
| **`LEG-ADMISSION-002`**| Giấy khám sức khỏe đủ điều kiện | Tất cả các hạng | `SRC-TTLT-01` (TTLT 24/2015)| Điều 3, Điều 4 | `VERIFIED` | `admission` |
| **`LEG-TRAINING-001`** | Bắt buộc thực hành lái xe đường trường DAT| Hạng ô tô (B, C1, C)| `SRC-TT-02` (TT 04/2022) | Điều 13a, 14 | `VERIFIED` | `training` |
| **`LEG-TRAINING-002`** | Đào tạo mô phỏng trên thiết bị Cabin điện tử| Hạng ô tô (B, C1, C)| `SRC-TT-02` (TT 04/2022) | Điều 13a | `VERIFIED` | `training` |
| **`LEG-TRAINING-003`** | Định mức km và giờ thực hành DAT cụ thể | Từng hạng xe | `SRC-TT-01`, `SRC-TT-03` | Phụ lục chương trình| `NEEDS_VERIFICATION` | `training` |
| **`LEG-ELIGIBILITY-001`**| Điều kiện dự thi sát hạch chứng chỉ và cấp GPLX| Tất cả các hạng | `SRC-TT-01` | Điều 25, Điều 26 | `VERIFIED` | `examination` |
| **`LEG-EXAM-001`** | Điểm liệt trong bài thi lý thuyết 600 câu | Tất cả các hạng | `SRC-TT-01`, Quyết định CĐB | Quy chế sát hạch | `VERIFIED` | `learning` |
| **`LEG-EXAM-002`** | Tiêu chuẩn chấm điểm thực hành sa hình (>=80/100)| Hạng ô tô | `SRC-TT-01` | Quy trình sát hạch | `VERIFIED` | `examination` |
| **`LEG-DATA-001`** | Bảo vệ dữ liệu cá nhân & Lưu vết kiểm toán | Toàn hệ thống | `SRC-ND-01` (NĐ 13/2023) | Điều 9, 13, 17 | `VERIFIED` | `reporting` |

---

## 2. Chi Tiết Từng Quy Tắc Pháp Lý

### 2.1. `LEG-LICENSE-001` — Phân hạng Giấy phép lái xe theo Luật 36/2024/QH15
- **Mô tả:** Hệ thống phân hạng giấy phép lái xe áp dụng chuẩn mới:
  - `A1`: Mô tô hai bánh đến 125 cm3 hoặc công suất điện đến 11 kW.
  - `A`: Mô tô hai bánh trên 125 cm3 hoặc công suất điện trên 11 kW.
  - `B1`: Mô tô ba bánh và các xe quy định cho hạng A1.
  - `B`: Xe ô tô chở người đến 8 chỗ ngồi; xe ô tô tải đến 3.500 kg (gộp B1 số tự động và B2 số sàn cũ).
  - `C1`: Xe ô tô tải từ trên 3.500 kg đến 7.500 kg.
  - `C`: Xe ô tô tải trên 7.500 kg.
- **Nguồn căn cứ:** `SRC-LAW-01` (Luật số 36/2024/QH15, Điều 57 Khoản 1).
- **Ngày bắt đầu áp dụng:** 01/01/2025.
- **Trạng thái:** `VERIFIED`.
- **Quy tắc hệ thống suy ra:** Bảng `license_categories` nạp các mã hạng mới `A1`, `A`, `B1`, `B`, `C1`, `C`.
- **Bảng/Cột liên quan:** `license_categories.code`, `license_categories.name`.
- **API liên quan:** `GET /api/v1/admissions/categories`.
- **Test Case kiểm chứng:** `AdmissionServiceTest.testGetCategories()`.

---

### 2.2. `LEG-ADMISSION-001` — Độ tuổi tối thiểu học và dự sát hạch
- **Mô tả:** Người học lái xe phải đủ độ tuổi tính đến ngày dự thi sát hạch:
  - Đủ **18 tuổi trở lên:** Hạng A1, A, B1, B, C1.
  - Đủ **21 tuổi trở lên:** Hạng C.
- **Nguồn căn cứ:** `SRC-LAW-01` (Luật số 36/2024/QH15, Điều 59 Khoản 1 Điểm a, b).
- **Ngày bắt đầu áp dụng:** 01/01/2025.
- **Trạng thái:** `VERIFIED`.
- **Quy tắc hệ thống suy ra (`ADM-004`):** Khi học viên nộp hồ sơ, hệ thống tính toán khoảng cách giữa `date_of_birth` và ngày hiện tại; nếu nhỏ hơn `min_age` của hạng đăng ký thì từ chối tiếp nhận hồ sơ ngay lập tức.
- **Bảng/Cột liên quan:** `license_categories.min_age`, `applications.date_of_birth`.
- **API liên quan:** `POST /api/v1/admissions/applications`.
- **Test Case kiểm chứng:** `AdmissionServiceTest.testAgeValidation()`.

---

### 2.3. `LEG-ADMISSION-002` — Hồ sơ Giấy khám sức khỏe người lái xe
- **Mô tả:** Học viên bắt buộc phải có Giấy khám sức khỏe do cơ sở y tế đủ điều kiện cấp, còn thời hạn hiệu lực (không quá 06 tháng).
- **Nguồn căn cứ:** `SRC-TTLT-01` (Thông tư liên tịch 24/2015/TTLT-BYT-BGTVT).
- **Trạng thái:** `VERIFIED`.
- **Quy tắc hệ thống suy ra:** Hồ sơ nộp trực tuyến bắt buộc phải tải lên tệp số hóa thuộc loại `HEALTH_CERTIFICATE` vào bảng `application_documents`.
- **Bảng/Cột liên quan:** `application_documents.document_type`.
- **API liên quan:** `POST /api/v1/admissions/applications`.

---

### 2.4. `LEG-TRAINING-001` — Thiết bị giám sát thời gian và quãng đường thực hành (DAT)
- **Mô tả:** Học viên học lái xe ô tô (hạng B, C1, C) bắt buộc phải tích lũy đủ thời gian và quãng đường thực hành lái xe trên đường thông qua thiết bị DAT được cơ quan nhà nước kiểm định.
- **Nguồn căn cứ:** `SRC-TT-02` (Thông tư 04/2022/TT-BGTVT, sửa đổi bổ sung Thông tư 12/2017/TT-BGTVT).
- **Trạng thái:** `VERIFIED`.
- **Quy tắc hệ thống suy ra (`TRN-003`):** Mỗi phiên thực hành DAT được lưu vết trong `dat_practice_sessions` kèm trạng thái `is_valid`. Chỉ các phiên hợp lệ mới được cộng dồn vào tiến độ học viên.
- **Bảng/Cột liên quan:** `dat_practice_sessions.distance_km`, `dat_practice_sessions.duration_minutes`, `dat_practice_sessions.is_valid`.
- **API liên quan:** `GET /api/v1/training/dat/summary`.
- **Test Case kiểm chứng:** `TrainingServiceTest.testDatAccumulation()`.

---

### 2.5. `LEG-TRAINING-003` — Định mức chi tiết km và giờ DAT theo từng hạng
- **Mô tả:** Số km thực hành cụ thể (ví dụ: Hạng B số sàn dự kiến 810 km / 40 giờ; Hạng B số tự động dự kiến 710 km / 24 giờ).
- **Trạng thái:** `NEEDS_VERIFICATION`.
- **Lý do:** Đang trong giai đoạn ban hành Thông tư hướng dẫn chi tiết thi hành Luật số 36/2024/QH15.
- **Xử lý hệ thống:** **Tuyệt đối không hard-code số km/giờ cố định vào mã nguồn Java.** Thiết kế dưới dạng tham số cấu hình linh hoạt trong Database, có ghi chú "Thông số tham chiếu đang chờ văn bản xác minh chính thức".

---

### 2.6. `LEG-ELIGIBILITY-001` — Điều kiện tự động dự thi sát hạch
- **Mô tả:** Học viên chỉ được lập danh sách dự thi sát hạch cấp GPLX khi đáp ứng đồng thời 4 tiêu chuẩn:
  1. Hồ sơ tuyển sinh ở trạng thái đã phê duyệt (`status = 'APPROVED'`).
  2. Đã hoàn thành 100% nghĩa vụ học phí (`fee_invoices.status = 'PAID'`).
  3. Hoàn thành tiến độ các môn học lý thuyết bắt buộc.
  4. Hoàn thành 100% định mức km và thời gian thực hành đường trường DAT.
- **Nguồn căn cứ:** `SRC-TT-01` (Điều 25 Thông tư 12/2017/TT-BGTVT) & `SRC-TT-02`.
- **Trạng thái:** `VERIFIED`.
- **Quy tắc hệ thống suy ra (`EXM-001`):** API kiểm tra điều kiện trả về `ELIGIBLE` hoặc `INELIGIBLE` kèm danh sách chi tiết các tiêu chí chưa đạt.
- **API liên quan:** `GET /api/v1/examinations/eligibility/check`.
- **Test Case kiểm chứng:** `ExaminationServiceTest.testEligibilityCheck()`.

---

### 2.7. `LEG-EXAM-001` — Quy chế thi trắc nghiệm lý thuyết và câu hỏi điểm liệt
- **Mô tả:** Bộ đề thi trắc nghiệm lý thuyết được trích xuất ngẫu nhiên từ ngân hàng 600 câu hỏi. Nếu thí sinh trả lời sai câu hỏi điểm liệt (tình huống mất an toàn giao thông nghiêm trọng), bài thi bị đánh giá `FAILED` (Trượt) ngay lập tức kể cả khi đạt đủ tổng số câu đúng.
- **Nguồn căn cứ:** `SRC-TT-01`, Hướng dẫn của Cục Đường bộ Việt Nam.
- **Trạng thái:** `VERIFIED`.
- **Quy tắc hệ thống suy ra (`LRN-002`):** Thuộc tính `theory_questions.is_critical = 1`. Thuật toán chấm điểm thi kiểm tra danh sách câu sai, nếu có bất kỳ câu điểm liệt nào thì gán `is_passed = false`.
- **Bảng/Cột liên quan:** `theory_questions.is_critical`.
- **API liên quan:** `POST /api/v1/learning/theory-test/submit`.
- **Test Case kiểm chứng:** `LearningServiceTest.testCriticalQuestionFailure()`.

---

### 2.8. `LEG-DATA-001` — Bảo vệ dữ liệu cá nhân và lưu vết kiểm toán (Audit Trail)
- **Mô tả:** Hệ thống thu thập dữ liệu cá nhân cơ bản (họ tên, ngày sinh, số điện thoại) và dữ liệu nhạy cảm (CCCD, hồ sơ sức khỏe). Hệ thống phải áp dụng biện pháp bảo vệ dữ liệu cá nhân, mã hóa mật khẩu và ghi vết kiểm toán mọi hành vi truy cập.
- **Nguồn căn cứ:** `SRC-ND-01` (Nghị định 13/2023/NĐ-CP, Điều 9, 13, 17).
- **Trạng thái:** `VERIFIED`.
- **Quy tắc hệ thống suy ra (`REP-001`):** Mọi hành vi tạo tài khoản, duyệt hồ sơ, nộp điểm sát hạch được ghi nhận vào `audit_logs` với IP, user_id, action và timestamp. Bảng `audit_logs` có tính chất bất biến.
- **Bảng/Cột liên quan:** `audit_logs`.
- **API liên quan:** `GET /api/v1/audit-logs`.
