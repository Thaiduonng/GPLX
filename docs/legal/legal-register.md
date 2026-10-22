# Sổ Đăng ký Quy tắc Pháp lý GPLX (Legal Register)

## 1. Nguyên tắc quản lý Sổ Đăng ký

Sổ Đăng ký này ghi nhận toàn bộ các căn cứ pháp luật, tình trạng xác minh và ánh xạ vào các quy tắc trong hệ thống GPLX Training System.

> [!IMPORTANT]
> Tại thời điểm khởi tạo dự án, **KHÔNG CÓ BẤT KỲ QUY ĐỊNH PHÁP LUẬT NÀO ĐƯỢC TỰ Ý ĐÁNH DẤU LÀ `VERIFIED`**.
> Toàn bộ các thông số quy định đều được đặt ở trạng thái `NEEDS_VERIFICATION` và phải lưu trữ dưới dạng cấu hình linh hoạt trong cơ sở dữ liệu, có cảnh báo pháp lý trên giao diện.

## 2. Bảng Theo dõi Căn cứ Pháp luật

| Mã mục | Lĩnh vực quy định | Văn bản đối chiếu (Dự kiến) | Trạng thái | Nguồn chính thức | Ngày rà soát | Ghi chú xử lý hệ thống |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `LEG-01` | Phân hạng Giấy phép lái xe | Luật Trật tự an toàn giao thông đường bộ | `NEEDS_VERIFICATION` | Cổng TTĐT Chính phủ | Đang rà soát | Lưu bảng `license_categories` cấu hình động |
| `LEG-02` | Độ tuổi tối thiểu theo từng hạng | Luật Trật tự an toàn giao thông đường bộ | `NEEDS_VERIFICATION` | Cơ sở dữ liệu Quốc gia VBQPPL | Đang rà soát | Cấu hình min_age trong Database |
| `LEG-03` | Tiêu chuẩn sức khỏe học lái xe | Thông tư liên tịch Bộ Y tế - Bộ GTVT | `NEEDS_VERIFICATION` | Cổng TTĐT Bộ Y tế | Đang rà soát | Danh mục tiêu chuẩn đính kèm hồ sơ |
| `LEG-04` | Số giờ học lý thuyết & thực hành | Thông tư Bộ Giao thông vận tải | `NEEDS_VERIFICATION` | Cổng TTĐT Bộ GTVT | Đang rà soát | Cấu hình tổng giờ/km học tập |
| `LEG-05` | Cấu trúc đề thi & Điểm đạt | Quy chế sát hạch của Cục Đường bộ VN | `NEEDS_VERIFICATION` | Cục Đường bộ Việt Nam | Đang rà soát | Cấu hình bộ đề, số câu, điểm liệt |
| `LEG-06` | Bảo vệ dữ liệu cá nhân học viên | Nghị định 13/2023/NĐ-CP | `NEEDS_VERIFICATION` | Cổng TTĐT Chính phủ | Đang rà soát | Quy chuẩn mã hóa dữ liệu & Audit Log |
