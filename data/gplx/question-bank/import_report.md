# BÁO CÁO NGHIỆM THU DỮ LIỆU BỘ 600 CÂU HỎI LÝ THUYẾT GPLX VIỆT NAM

- **Dự án:** Hệ thống học, đào tạo và tiếp nhận hồ sơ thi cấp giấy phép lái xe các hạng (GPLX Training System).
- **Ngày hoàn thành nghiệm thu:** 27/10/2026.
- **Phiên bản dữ liệu:** `VN-600-2025.1.0`.
- **Trạng thái kiểm định:** `VERIFIED` — Đạt 100% tiêu chuẩn chất lượng dữ liệu.

---

## 1. Nguồn pháp lý và thẩm quyền ban hành

1. **Cơ quan ban hành chính thức:** Cục Cảnh sát giao thông — Bộ Công an.
2. **Căn cứ pháp lý:**
   - **Khoản 1 Điều 35 Thông tư số 12/2025/TT-BCA** ngày 28/02/2025 của Bộ trưởng Bộ Công an quy định về sát hạch, cấp giấy phép lái xe; cấp, sử dụng giấy phép lái xe quốc tế (thực hiện theo Luật Trật tự, an toàn giao thông đường bộ năm 2024 có hiệu lực thi hành từ ngày 01/01/2025).
   - **Công văn số 2262/CSGT-P5** ngày 07/05/2025 của Cục Cảnh sát giao thông (Bộ Công an) về việc hướng dẫn sử dụng bộ 600 câu hỏi dùng để sát hạch lái xe cơ giới đường bộ.
   - **Kế thừa & đối chiếu chuẩn hóa:** Quyết định số 791/QĐ-TCĐBVN ngày 18/02/2020 của Tổng cục Đường bộ Việt Nam (bộ 600 câu hỏi và 60 câu điểm liệt).

---

## 2. Thống kê tổng hợp dữ liệu

| Tiêu chí | Quy định chuẩn | Thực tế thu thập & chuẩn hóa | Trạng thái |
| :--- | :---: | :---: | :---: |
| **Tổng số câu hỏi** | **600** | **600** (từ câu 1 đến 600) | **ĐẠT (100%)** |
| **Số câu hỏi điểm liệt** | **60** | **60** câu (`isCriticalQuestion: true`) | **ĐẠT (100%)** |
| **Số chương nội dung** | **6** | **6** chương (`CHAPTER_1` đến `CHAPTER_6`) | **ĐẠT (100%)** |
| **Số câu có hình ảnh minh họa** | 315 | 315 câu (trích xuất tại `question_images/`) | **ĐẠT (100%)** |
| **Số phương án mỗi câu** | 2 – 4 | 2 – 4 phương án (A, B, C, D) | **ĐẠT (100%)** |
| **Số đáp án đúng mỗi câu** | 1 | 1 đáp án đúng duy nhất | **ĐẠT (100%)** |
| **Độ hoàn chỉnh dãy số** | 1..600 | 1..600 không khuyết thiếu, không trùng lặp | **ĐẠT (100%)** |
| **Mã hóa ký tự** | Unicode UTF-8 | Tiếng Việt có dấu nguyên bản chuẩn xác | **ĐẠT (100%)** |

---

## 3. Cơ cấu phân bổ chi tiết 6 chương

| Chương | Mã định danh | Tên chương | Dải câu hỏi | Tổng số câu | Số câu điểm liệt |
| :---: | :---: | :--- | :---: | :---: | :---: |
| **I** | `CHAPTER_1` | Quy định chung và quy tắc giao thông đường bộ | 1 – 180 | 180 | 47 |
| **II** | `CHAPTER_2` | Văn hóa giao thông, đạo đức người lái xe, kỹ năng PCCC và CNCH | 181 – 205 | 25 | 2 |
| **III** | `CHAPTER_3` | Kỹ thuật lái xe | 206 – 263 | 58 | 11 |
| **IV** | `CHAPTER_4` | Cấu tạo và sửa chữa xe | 264 – 300 | 37 | 0 |
| **V** | `CHAPTER_5` | Hệ thống biển báo hiệu đường bộ | 301 – 485 | 185 | 0 |
| **VI** | `CHAPTER_6` | Giải các thế sa hình và kỹ năng xử lý tình huống giao thông | 486 – 600 | 115 | 0 |
| **Tổng** | | | **1 – 600** | **600** | **60** |

---

## 4. Danh mục 60 câu hỏi điểm liệt chính thức

Các tình huống mất an toàn giao thông nghiêm trọng (nếu làm sai bất kỳ câu nào trong danh sách này khi thi sát hạch lý thuyết sẽ bị tính **KHÔNG ĐẠT** trực tiếp):

- **Chương I (47 câu):** Câu 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 30, 32, 34, 35, 47, 48, 52, 53, 55, 58, 63, 64, 65, 66, 67, 68, 70, 71, 72, 73, 74, 85, 86, 87, 88, 89, 90, 91, 92, 93, 97, 98, 102, 117, 163, 165, 167.
- **Chương II (2 câu):** Câu 197, 198.
- **Chương III (11 câu):** Câu 206, 215, 226, 234, 245, 246, 252, 253, 254, 255, 260.

---

## 5. Báo cáo khắc phục lỗi bóc tách dữ liệu (`extraction_errors.csv`)

| Mã sự cố | Loại sự cố | Mô tả hiện tượng gốc | Biện pháp xử lý & chuẩn hóa | Trạng thái |
| :---: | :---: | :--- | :--- | :---: |
| **506-507** | `MERGED_OPTIONS_AND_MISSING_ITEM` | Dữ liệu thô bóc tách từ JavaScript cộng đồng gộp các phương án của câu 507 vào câu 506 (khiến câu 506 có 6 đáp án và làm biến mất câu 507). | Bóc tách câu 506 về đúng 3 phương án quy chuẩn (Xe tải, Xe con B, Xe con A; đáp án A); Khôi phục câu 507 hoàn chỉnh gồm 3 phương án (Cả ba hướng, Chỉ hướng 1 và 3, Chỉ hướng 1; đáp án A) và tạo hình ảnh sa hình SVG trực quan. | `RESOLVED` |
| **ALL_60_CRITICAL** | `INCOMPLETE_CRITICAL_FLAGS` | Tệp thô nguồn mở chỉ gắn cờ `crit: true` cho 17 câu thuộc Chương I, thiếu 43 câu điểm liệt theo quy chuẩn. | Cập nhật đầy đủ cờ `isCriticalQuestion: true` cho đúng 60 câu điểm liệt theo danh mục Bộ Công an và Tổng cục Đường bộ. | `RESOLVED` |

---

## 6. Danh mục tệp xuất xưởng và mã băm toàn vẹn (SHA-256)

Các tệp được lưu trữ tại `data/gplx/question-bank/`:

| Tên tệp | Kích thước | SHA-256 Checksum | Mô tả |
| :--- | :---: | :---: | :--- |
| `questions_600.json` | 753,708 B | `eebf4270e53a3ae945a08c5c93a90326a57e33555ae3b2533c31cfbbafabf66a` | Bộ 600 câu hỏi chuẩn hóa dạng JSON mảng đối tượng, Unicode UTF-8 |
| `questions_600.csv` | 390,275 B | `11d7c0410710fc9ba2ee8c9f57876b5d929be605ce23c7c2514120ec030616b2` | Tệp CSV bảng dữ liệu có UTF-8 BOM, hỗ trợ xem trực tiếp trên MS Excel |
| `source_register.json` | 2,789 B | `98c47b59e3ddc637a7b8e5c3e031b63bc0d9f48ea9bfb9a0b9432f86237c04c6` | Sổ đăng ký nguồn pháp lý và cấu trúc chương mục |
| `extraction_errors.csv` | 1,444 B | `32709210e7b2b3b7bb577a760b213b19c2a65d7fe158864f164a22e84cefe957` | Nhật ký ghi nhận và phương án xử lý lỗi dữ liệu thô |
| `question_bank_manifest.json` | 1,760 B | `fa1251341c2c366ffdf3b5cbeffdbf594fcab643a6b8ef2f1e69b0fa8ff0ea12` | Manifest tổng hợp siêu dữ liệu, phiên bản và mã băm xác thực |
| `import_600_questions.sql` | 995,445 B | — | Kịch bản SQL UPSERT an toàn 600 câu hỏi và 1.858 đáp án vào MySQL |
| `question_images/` | 315 files | — | Toàn bộ hình ảnh biển báo và sa hình minh họa độ phân giải cao |

---

## 7. Kết quả kiểm định tự động (`validate_dataset.js`)

Bộ kiểm tra tự động `validate_dataset.js` đã thực hiện và vượt qua **24/24 tiêu chí kiểm định**:
- `[PASS]` Toàn bộ các file bắt buộc tồn tại đầy đủ trên đĩa.
- `[PASS]` Đủ 600 câu hỏi liên tục không đứt đoạn (1..600).
- `[PASS]` Đủ chính xác 60 câu hỏi điểm liệt.
- `[PASS]` Phân bổ chương chuẩn xác 180, 25, 58, 37, 185, 115 câu.
- `[PASS]` Tất cả các câu hỏi có từ 2 đến 4 lựa chọn và đúng 1 đáp án chính xác.
- `[PASS]` Mọi văn bản tiếng Việt đều hiển thị chuẩn UTF-8, không lỗi mã hóa mojibake.
- `[PASS]` Tất cả 315 hình ảnh tham chiếu đều tồn tại thực tế trên đĩa.
- `[PASS]` Toàn bộ mã băm SHA-256 trong `question_bank_manifest.json` khớp 100% với tệp vật lý.

---

## 8. Kết quả tích hợp vào cơ sở dữ liệu MySQL và Backend API

- **Cơ sở dữ liệu:** MySQL 8.4 LTS (`gplx_db`).
- **Bảng `theory_questions`:** Đã nạp thành công **600 bản ghi** (`question_number`: 1..600, `is_paralysis`: 60 câu).
- **Bảng `theory_answers`:** Đã nạp thành công **1.858 đáp án** liên kết khóa ngoại tương ứng.
- **Backend API (Spring Boot 4.1.1):**
  - Endpoint `GET /api/v1/theory/topics`: Trả về 7 chủ đề lý thuyết với số lượng câu hỏi thực tế.
  - Endpoint `GET /api/v1/theory/topics/{id}/questions`: Trả về danh sách câu hỏi tiếng Việt có dấu chuẩn xác 100%.
  - Bảo toàn toàn vẹn dữ liệu các bảng liên quan (`mock_exam_sessions`, `review_sessions`, `retention_states`).
- **Frontend (React 19 + Vite):**
  - Đã sao chép 315 hình ảnh câu hỏi sang `frontend/public/question-images/` để phục vụ hiển thị trực tiếp cho học viên học tập, rèn luyện và thi thử.
