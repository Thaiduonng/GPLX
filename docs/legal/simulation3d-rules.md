# Kiểm chứng bộ quy tắc sa hình 3D — 29/10/2026

## Nguồn chính thức

- [Công báo: Thông tư 12/2025/TT-BCA](https://congbaocdn.chinhphu.vn/CongBaoCP/VanBan/2025/2/44366/55281-1-2025471-47212-2025-tt-bca.pdf), Bộ Công an, ban hành 28/02/2025, hiệu lực 01/03/2025. Đọc phần Phụ lục IV mục C.2.2.1 và C.2.2.2(a,b,c), PDF trang 56–60; giới hạn kết quả xem phần kết thúc mục C.
- [Trang thuộc tính Chính phủ: Thông tư 108/2026/TT-BCA](https://chinhphu.vn/?docid=218725&pageid=27160), Bộ Công an, ban hành 29/06/2026, hiệu lực 01/07/2026.
- [PDF ký chính thức TT108](https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/7/thong-tu-so-108.2026.tt-bca-ngay-29.6.2026-ban-day-du-v03.pdf), đã tải và xem ảnh trực tiếp trang 36–37: Điều 41 khoản 2,6, Điều 42 khoản 2. SHA-256: `7f879c2404948203d693a0109b1f584a5484c1514b5c5ea6c6d4d7c956983c71`.

Điều khoản chuyển tiếp giữ mục C Phụ lục IV TT12 tới hết 28/02/2027; bộ cấu hình này không tự áp dụng phần nội dung mới trước thời điểm chuyển tiếp. Đã tra cứu văn bản thay thế/sửa đổi theo số hiệu trên nguồn Chính phủ/Bộ Công an tại ngày ghi nhận; không lấy bài quảng cáo hoặc dự thảo làm mức phạt. Cần kiểm tra lại khi có văn bản mới hoặc áp dụng sau thời hạn bundle.

## Ánh xạ triển khai

Bundle `frontend/public/simulation3d/rules-2026-10.json`, version `tt12-2025-transition-2026-10-29-mvp1`, chứa trạng thái và nguồn riêng cho mỗi rule. Các nhóm: dây an toàn/xi nhan/chậm xuất phát; dừng người đi bộ; vị trí dừng/khởi hành/tụt dốc; va chạm/lề; tắt máy/vòng tua/tốc độ; phản ứng nguy hiểm. Các thông số được chép vào cấu hình, không đặt mức trừ trong component.

Profiles theo hạng chứa số/thứ tự bài, loại ghép xe, tốc độ và thời gian đầy đủ theo mục C.2.2.1; runtime chỉ thực thi ba module có thật. Ngưỡng điểm kết quả của bộ tham chiếu chỉ được dùng để phản hồi MVP, không xác nhận thi đủ toàn bộ nội dung.

- VERIFIED: số liệu đã đối chiếu trên bản chính thức trong phạm vi/hiệu lực nêu trên. Việc xác minh số liệu không có nghĩa mô hình vật lý/cảm biến đã được cơ quan chức năng chứng nhận.
- NEEDS_VERIFICATION: cảnh báo chạm vạch dẫn đường/đi ngược trên sân mẫu chưa được quy đổi mức phạt; chỉ ghi cảnh báo 0 điểm, không đình chỉ theo suy đoán.
- INTERNAL_RULE: kích thước/khối lượng/lực kéo xe minh họa, sân thẳng, ngưỡng cảm biến số, phạm vi ba bài, frame rate/retention và giới hạn tài nguyên; không trình bày là quy chuẩn sân sát hạch.

Tự ngừng khấu trừ và không cho bắt đầu thi mô phỏng nếu bundle chưa VERIFIED hoặc ngoài thời hạn. Luôn giữ snapshot version và nguồn khi lưu phiên; replay không dùng bản luật mới để tính lại lịch sử. Sau 28/02/2027 phải thêm bundle mới sau đối chiếu, không sửa lịch sử để hợp thức hóa.

## Giới hạn sử dụng

Đây là phần mềm luyện tập frontend. Xe, sân và cảm biến chưa hiệu chuẩn/kiểm định; điểm client không có bảo đảm chống sửa. Không tích hợp kết quả vào điều kiện dự thi, DAT, hồ sơ sát hạch hoặc báo cáo chính thức.
