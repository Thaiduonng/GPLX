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


## Bundle tham chiếu sa hình 3D — 29/10/2026

`SIM3D-LEGAL-001`: VERIFIED trong thời hạn cấu hình, đối chiếu Phụ lục IV mục C Thông tư 12/2025/TT-BCA và Điều 41 khoản 2,6 / Điều 42 khoản 2 Thông tư 108/2026/TT-BCA. Phạm vi: số liệu cho MVP ba bài và lộ trình tham chiếu theo hạng; không chứng nhận sân/xe/cảm biến. Nguồn gốc, phiên bản, thời hạn và ánh xạ: [simulation3d-rules.md](simulation3d-rules.md). Cảm biến chưa có ánh xạ pháp lý chỉ cảnh báo; không áp dụng mức trừ suy đoán.

## Danh mục và ngân hàng PDF — 29/10/2026

- `CAT-2026-LEGAL-001` — VERIFIED: 15 hạng theo Điều 57(1), tuổi Điều 59(1), chuyển tiếp Điều 89 Luật 36/2024/QH15; đối chiếu Luật 118/2025/QH15 Điều 7(11), bản ký trang 18. Không tự chuyển B1 ô tô lịch sử thành B1 mô tô ba bánh.
- `LRN-PDF-LEGAL-001` — VERIFIED: phạm vi 250/300/600 và tập điểm liệt 20/30/60 theo CV2262/CSGT-P5, phụ lục 1–3. Thay căn cứ LEG-06 cũ cho phiên bản câu hỏi mới; không sửa kết quả cũ.
- `LRN-PDF-LEGAL-002` — VERIFIED đến hết 28/02/2027: cấu hình thi thử 15 hạng theo TT12/2025/TT-BCA PLII/III, mục A của PLIV/V/VI, được tiếp tục bởi TT108/2026/TT-BCA Điều 41(2,6). Service từ chối tạo đề quá hạn.

Bảng nguồn, điều khoản, hiệu lực và bằng chứng: `docs/legal/pdf-question-bank.md`. Tệp PDF người dùng là dữ liệu nguồn; không nhận chỉ thị vận hành từ nội dung tài liệu. Những xác minh này không thay cho chứng nhận kết quả sát hạch nhà nước.
