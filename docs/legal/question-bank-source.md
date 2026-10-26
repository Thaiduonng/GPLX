# QUESTION BANK SOURCE — NGUỒN VÀ CẤU TRÚC BỘ 600 CÂU HỎI LÝ THUYẾT GPLX

## 1. Căn cứ pháp lý và cơ quan ban hành

- **Cơ quan ban hành:** Tổng cục Đường bộ Việt Nam (nay là Cục Đường bộ Việt Nam - Bộ Giao thông vận tải).
- **Văn bản căn cứ:**
  - Luật Giao thông đường bộ 2008 và Luật Trật tự, an toàn giao thông đường bộ 2024 (có hiệu lực từ 01/01/2025).
  - Thông tư số 12/2017/TT-BGTVT ngày 15/04/2017 của Bộ trưởng Bộ GTVT quy định về đào tạo, sát hạch, cấp giấy phép lái xe cơ giới đường bộ.
  - Thông tư số 04/2022/TT-BGTVT ngày 22/04/2022 sửa đổi, bổ sung một số điều của Thông tư 12/2017/TT-BGTVT.
  - Quyết định và Hướng dẫn thực hiện bộ 600 câu hỏi dùng cho sát hạch lái xe cơ giới đường bộ (áp dụng từ 01/08/2020).
- **Trạng thái pháp lý:** `VERIFIED`.

---

## 2. Phân loại cấu trúc 600 câu hỏi theo 7 chương

Bộ câu hỏi 600 câu được chuẩn hóa thành 7 chương chuyên đề nghiệp vụ và nhận thức:

| Mã chương | Tên chương / Chủ đề | Dải câu hỏi | Tổng số câu | Số câu điểm liệt |
|---|---|---|:---:|:---:|
| `CH1` / `RULE` | **Khái niệm và quy tắc giao thông đường bộ** | Câu 1 - Câu 166 | 166 | 45 |
| `CH2` / `TRANS` | **Nghiệp vụ vận tải** | Câu 167 - Câu 196 | 30 | 0 |
| `CH3` / `ETHIC` | **Văn hóa giao thông và đạo đức người lái xe** | Câu 197 - Câu 217 | 21 | 4 |
| `CH4` / `TECH` | **Kỹ thuật lái xe** | Câu 218 - Câu 273 | 56 | 11 |
| `CH5` / `MECH` | **Cấu tạo và sửa chữa xe cơ giới** | Câu 274 - Câu 308 | 35 | 0 |
| `CH6` / `SIGN` | **Hệ thống biển báo hiệu đường bộ** | Câu 309 - Câu 486 | 178 | 0 |
| `CH7` / `SCEN` | **Giải các thế sa hình & kỹ năng xử lý tình huống** | Câu 487 - Câu 600 | 114 | 0 |
| **Tổng cộng** | | | **600** | **60** |

---

## 3. Quy chuẩn 60 câu hỏi điểm liệt (Tình huống mất an toàn giao thông nghiêm trọng)

1. **Khái niệm:** Là những câu hỏi về quy tắc giao thông cơ bản, hành vi bị nghiêm cấm, kỹ năng xử lý khi qua đường giao nhau, giao cắt đường sắt, đường dốc quanh co hoặc hành vi cố tình vi phạm luật gây nguy hiểm tính mạng.
2. **Quy tắc sát hạch:**
   - Trong mỗi đề thi sát hạch lý thuyết bắt buộc có ít nhất 1 - 2 câu hỏi điểm liệt.
   - Thí sinh trả lời sai bất kỳ câu điểm liệt nào thì bài thi bị đánh giá là **KHÔNG ĐẠT (TRƯỢT)**, bất kể tổng số điểm các câu khác có đủ điểm đỗ hay không.
3. **Phân bổ trong 600 câu:**
   - Chương 1: 45 câu (các hành vi bị cấm, nồng độ cồn, ma túy, nhường đường tàu hỏa, phóng nhanh vượt ẩu).
   - Chương 3: 4 câu (đạo đức, ứng xử khi tai nạn).
   - Chương 4: 11 câu (kỹ thuật xuống dốc, phanh khẩn cấp, vượt xe an toàn).

---

## 4. Quản lý phiên bản và truy vết trong hệ thống

- Mỗi câu hỏi trong cơ sở dữ liệu (`theory_questions`) được gắn:
  - `question_number`: Số thứ tự chuẩn trong bộ 600 câu.
  - `topic_id`: Khóa ngoại liên kết bảng `theory_topics` (7 chương chuẩn).
  - `category_code`: Hạng GPLX áp dụng (`ALL`, `A1`, `B1`, `B`, `C`...).
  - `is_paralysis`: Boolean xác định câu điểm liệt.
  - `explanation`: Giải thích đáp án và căn cứ điều khoản luật.
  - `verification_status`: `VERIFIED` | `NEEDS_VERIFICATION`.
  - `version`: Chuỗi phiên bản (mặc định: `VN-600-2020`).
