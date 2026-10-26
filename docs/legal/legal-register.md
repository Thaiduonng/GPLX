# Sổ Đăng Ký Quy Tắc Pháp Lý GPLX (Legal Register)
`docs/legal/legal-register.md`

Sổ Đăng Ký này ghi nhận toàn bộ các căn cứ pháp luật, tình trạng xác minh và ánh xạ vào các quy tắc trong hệ thống GPLX Training System theo quy định nghiêm ngặt của Rule 08.

---

## 1. Nguyên Tắc Quản Trị Căn Cứ Pháp Luật

- Mọi điều khoản pháp luật đưa vào hệ thống đều phải phân định rõ ràng 1 trong 3 trạng thái:
  - **`VERIFIED` (Đã xác minh chính thức):** Có văn bản gốc, số hiệu, điều khoản cụ thể từ cơ quan có thẩm quyền. Được đưa vào ràng buộc nghiệp vụ.
  - **`NEEDS_VERIFICATION` (Chờ xác minh):** Chưa đủ số liệu chính thức hoặc đang chuyển tiếp thông tư hướng dẫn. Tuyệt đối không hard-code vào code Java, lưu dưới dạng cấu hình Database.
  - **`INTERNAL_RULE` (Quy định nội bộ cơ sở):** Quy định vận hành của trung tâm đào tạo, không được trình bày như nghĩa vụ pháp luật nhà nước.

---

## 2. Bảng Theo Dõi Căn Cứ Pháp Luật & Tình Trạng Xác Minh

| Mã Mục | Lĩnh Vực Quy Định | Văn Bản Đối Chiếu Chính Thức | Điều Khoản Căn Cứ | Trạng Thái | Ngày Xác Minh | Quy Tắc Hệ Thống Áp Dụng |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`LEG-01`** | Phân hạng Giấy phép lái xe | Luật số 36/2024/QH15 (Luật Trật tự ATGT đường bộ) | Điều 57 Khoản 1 | `VERIFIED` | 2026-10-26 | Bảng `license_categories` (A1, A, B1, B, C1, C) |
| **`LEG-02`** | Độ tuổi tối thiểu theo từng hạng | Luật số 36/2024/QH15 (Luật Trật tự ATGT đường bộ) | Điều 59 Khoản 1 | `VERIFIED` | 2026-10-26 | Quy tắc `ADM-004`: Kiểm tra tuổi tối thiểu khi nộp hồ sơ |
| **`LEG-03`** | Tiêu chuẩn sức khỏe người lái xe | Thông tư liên tịch 24/2015/TTLT-BYT-BGTVT | Bảng tiêu chuẩn y tế | `VERIFIED` | 2026-10-26 | Bắt buộc đính kèm Giấy khám sức khỏe (`HEALTH_CERTIFICATE`) |
| **`LEG-04`** | Giám sát thực hành đường trường DAT | Thông tư 04/2022/TT-BGTVT (sửa đổi TT 12/2017) | Điều 13a, 14 | `VERIFIED` | 2026-10-26 | Quy tắc `TRN-003`: Bảng `dat_practice_sessions` |
| **`LEG-05`** | Định mức chi tiết km/giờ DAT | Thông tư hướng dẫn thi hành Luật 36/2024/QH15 | Dự thảo / Thông tư mới| `NEEDS_VERIFICATION` | 2026-10-26 | Cấu hình tham số km/giờ trong Database, không hard-code |
| **`LEG-06`** | Cấu trúc đề thi & Điểm liệt | Thông tư 12/2017/TT-BGTVT & Quy chế Cục ĐBVN | Bộ đề 600 câu hỏi | `VERIFIED` | 2026-10-26 | Quy tắc `LRN-002`: Sai câu điểm liệt (`is_critical = 1`) trượt ngay |
| **`LEG-07`** | Tiêu chuẩn đỗ thực hành sa hình | Thông tư 12/2017/TT-BGTVT | Thang điểm 100, đạt >= 80| `VERIFIED` | 2026-10-26 | Quy tắc `EXM-003`: Điểm sa hình >= 80 điểm |
| **`LEG-08`** | Bảo vệ dữ liệu cá nhân học viên | Nghị định 13/2023/NĐ-CP | Điều 9, 13, 17 | `VERIFIED` | 2026-10-26 | Bảng `audit_logs` bất biến, mã hóa BCrypt, bảo mật PII |
