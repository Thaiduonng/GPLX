# Bảng Yêu cầu Phi chức năng (Non-Functional Requirements)

## 1. Hiệu năng & Khả năng mở rộng (Performance & Scalability)
- **Thời gian phản hồi:** Các API truy vấn thông thường phải phản hồi dưới 1 giây với 95% số request (P95 < 1s).
- **Hỗ trợ đồng thời:** Đáp ứng tải tối thiểu 100 người dùng đồng thời trong môi trường kiểm thử đồ án tốt nghiệp.
- **Phân trang:** Mọi API trả về danh sách dữ liệu đều phải áp dụng phân trang (Pagination) với kích thước mặc định 10-20 bản ghi/trang.

## 2. An toàn & Bảo mật (Security)
- Mã hóa toàn bộ mật khẩu bằng BCrypt.
- Sử dụng Parameterized Queries ngăn chặn 100% tấn công SQL Injection.
- Sanitize đầu vào và thiết lập CSP headers ngăn chặn XSS.
- Giới hạn kích thước và kiểm tra loại file upload nghiêm ngặt.

## 3. Khả năng bảo trì & Tương thích (Maintainability & Compatibility)
- Kiến trúc Modular Monolith với ranh giới module rõ ràng, tính phụ thuộc thấp (loose coupling).
- Mã nguồn tuân thủ coding conventions, tỷ lệ code coverage cho tầng service đạt tối thiểu 80%.
- Giao diện người dùng chuẩn Responsive trên màn hình máy tính để bàn (Desktop) và máy tính bảng (Tablet), hỗ trợ 100% tiếng Việt.
