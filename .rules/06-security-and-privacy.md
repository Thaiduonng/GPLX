# Rule 06 — Bảo mật và Quyền riêng tư (Security & Privacy)

## 1. Kiến trúc Bảo mật với Spring Security 7

- Toàn bộ cơ chế an ninh Backend dựa trên **Spring Security 7** với cấu hình Lambda DSL hiện đại.
- Mô hình xác thực Stateless API (hoặc Stateful Session tùy ngữ cảnh) kết hợp mã hóa mật khẩu an toàn qua `DelegatingPasswordEncoder` (BCrypt mặc định với cost factor phù hợp).
- Tuyệt đối không lưu mật khẩu dạng văn bản thô (plaintext) trong database hoặc bất kỳ file cấu hình nào.

## 2. Kiểm soát truy cập (RBAC + Resource Ownership)

- **RBAC (Role-Based Access Control):** Kiểm tra vai trò của người dùng trên từng endpoint (`@PreAuthorize("hasRole('ADMIN')")`).
- **Resource Ownership Check:** Ngoài vai trò, hệ thống bắt buộc phải kiểm tra quyền sở hữu đối với dữ liệu nhạy cảm:
  - Học viên `ROLE_STUDENT` chỉ được xem/sửa hồ sơ, kết quả học tập và kết quả thi của CHÍNH MÌNH.
  - Giáo viên `ROLE_INSTRUCTOR` chỉ được xem và chấm điểm các lớp học/buổi thực hành mà mình được phân công.
  - Không để Frontend quyết định quyền hạn thực tế; mọi quyền phải được bảo đảm tại Service layer.

## 3. Bảo vệ dữ liệu cá nhân & Tải lên tệp tin (File Upload)

- **Dữ liệu cá nhân (CCCD, Số điện thoại, Địa chỉ, Hồ sơ sức khỏe):**
  - Tuân thủ nguyên tắc giảm thiểu dữ liệu (Data Minimization): Không trả về các trường nhạy cảm nếu API không yêu cầu.
  - Audit log không được ghi lại mật khẩu, mã OTP, token hoặc thông tin bí mật cá nhân.
- **Quy tắc an toàn tệp tin tải lên (Upload Security):**
  - Giới hạn dung lượng tệp tin (VD: tối đa 5MB cho ảnh, 10MB cho tài liệu PDF).
  - Kiểm tra MIME type thực tế (không chỉ tin tưởng phần mở rộng tệp tin).
  - Khử độc (sanitize) tên tệp tin để chống tấn công Path Traversal.
  - Lưu trữ tệp tin ngoài thư mục webroot hoặc dùng dịch vụ lưu trữ object chuyên biệt.

## 4. Phòng chống các lỗ hổng OWASP Top 10

- **SQL Injection:** Toàn bộ truy vấn sử dụng parameterized query qua Spring Data JPA/Hibernate.
- **XSS (Cross-Site Scripting):** Sanitize dữ liệu đầu vào và cấu hình Content Security Policy (CSP) headers.
- **CSRF:** Áp dụng phù hợp theo cơ chế xác thực.
- **Rate Limiting:** Áp dụng rate limiting trên các endpoint công khai nhạy cảm (đăng nhập, gửi OTP, đăng ký) để chống brute-force và DoS.
