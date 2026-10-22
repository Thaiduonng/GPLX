# Rule 08 — Tuân thủ Quy định Pháp lý cấp GPLX

## 1. Tầm quan trọng đặc thù của Dự án

Lĩnh vực đào tạo, sát hạch và cấp giấy phép lái xe tại Việt Nam chịu sự điều chỉnh chặt chẽ của hệ thống Văn bản Quy phạm Pháp luật (Luật Trật tự an toàn giao thông đường bộ, các Nghị định của Chính phủ, Thông tư của Bộ Giao thông Vận tải và Bộ Y tế). Do đó, dự án đặt tính pháp lý và tính minh bạch lên mức ưu tiên cao nhất.

## 2. Ba trạng thái pháp lý nghiêm ngặt

Mọi thông số, điều kiện hay quy trình liên quan đến luật pháp trong hệ thống đều phải được gắn nhãn một trong 3 trạng thái:

1. **`VERIFIED` (Đã xác minh chính thức):**
   - Đã được đối chiếu với văn bản pháp luật hiện hành có hiệu lực thi hành.
   - Có đầy đủ trích dẫn: Số hiệu văn bản, Cơ quan ban hành, Ngày có hiệu lực, Điều, Khoản, Điểm cụ thể.
   - Đã kiểm tra các văn bản sửa đổi, bổ sung, thay thế hoặc bãi bỏ.
   - **Chỉ các quy tắc ở trạng thái `VERIFIED` mới được phép đưa vào logic ràng buộc tự động bắt buộc của hệ thống.**

2. **`NEEDS_VERIFICATION` (Chờ xác minh):**
   - Các điều kiện dự kiến (như độ tuổi tối thiểu theo từng hạng, số giờ thực hành DAT, số câu hỏi lý thuyết, điểm liệt, điểm đạt).
   - Chưa có văn bản pháp luật đối chiếu hoặc đang trong giai đoạn chuyển tiếp luật mới.
   - **Xử lý trong hệ thống:** Tuyệt đối không hard-code cố định vào mã nguồn. Bắt buộc phải thiết kế dưới dạng tham số cấu hình linh hoạt trong Database, có cảnh báo "Quy định đang chờ cập nhật xác minh pháp lý" trên giao diện người dùng.

3. **`INTERNAL_RULE` (Quy định nội bộ cơ sở):**
   - Các quy định do trung tâm/cơ sở đào tạo tự ban hành (như quy định đóng học phí thành nhiều đợt, chính sách bảo lưu khóa học, quy trình tư vấn chăm sóc khách hàng).
   - Tuyệt đối không được trình bày hoặc gây nhầm lẫn đây là quy định bắt buộc của nhà nước.

## 3. Danh mục văn bản pháp luật trọng tâm cần tra cứu

- **Luật Trật tự, an toàn giao thông đường bộ** (Luật mới có hiệu lực từ 2025/2026 điều chỉnh các hạng GPLX và quy chuẩn mới).
- **Thông tư của Bộ Giao thông vận tải** quy định về đào tạo, sát hạch, cấp giấy phép lái xe cơ giới đường bộ.
- **Thông tư liên tịch của Bộ Y tế và Bộ GTVT** quy định về tiêu chuẩn sức khỏe của người lái xe và việc khám sức khỏe định kỳ.
- **Nghị định số 13/2023/NĐ-CP** của Chính phủ về bảo vệ dữ liệu cá nhân.

## 4. Nghiêm cấm đối với AI và Lập trình viên

- ❌ Tuyệt đối không tự bịa đặt, suy đoán hay tự tiện đưa ra các con số về: Độ tuổi thi từng hạng, số km thực hành bắt buộc, số câu hỏi trong đề thi, điểm liệt, thời hạn của giấy phép lái xe nếu chưa có bằng chứng xác minh.
- ❌ Không coi các bài viết không chính thức trên mạng xã hội, diễn đàn hay trang quảng cáo là căn cứ pháp lý.
