# Mô hình An ninh và Bảo vệ Dữ liệu

## 1. Cơ chế Xác thực (Authentication)

- Áp dụng chuẩn **Spring Security 7** với cấu hình Lambda DSL.
- Toàn bộ mật khẩu được mã hóa an toàn qua `DelegatingPasswordEncoder` với thuật toán BCrypt mặc định (độ phức tạp 10-12 rounds).
- Thiết lập endpoint công khai (Public):
  - `GET /api/v1/health` (Kiểm tra tình trạng sống của ứng dụng)
  - `GET /swagger-ui/**`, `GET /v3/api-docs/**` (Tài liệu OpenAPI)
  - `POST /api/v1/auth/login`, `POST /api/v1/auth/register` (Xác thực đăng nhập/đăng ký)
- Tất cả các endpoint khác đều yêu cầu xác thực hợp lệ (`authenticated()`).

## 2. Kiểm soát phân quyền (RBAC & Method Security)

- Kích hoạt bảo vệ cấp phương thức với `@EnableMethodSecurity`.
- Sử dụng `@PreAuthorize` để kiểm tra vai trò người dùng trước khi gọi hàm nghiệp vụ:
  - `@PreAuthorize("hasRole('ADMIN')")`: Dành riêng cho Quản trị viên.
  - `@PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")`: Dành cho Quản trị viên và Nhân viên giáo vụ.
- **Quyền sở hữu tài nguyên (Resource Ownership):**
  - Học viên không thể xem hoặc sửa đổi thông tin của học viên khác bằng cách thay đổi ID trên URL request.
  - Service layer bắt buộc lấy ID người dùng từ `SecurityContext` hiện tại và so sánh với ID của chủ sở hữu tài nguyên trước khi trả về dữ liệu.


## Điều hướng frontend theo vai trò (29/10/2026)

Danh mục, lối tắt và route frontend dùng chung bảng quyền trong `features/navigation/navigation.ts`; mặc định từ chối trang chưa khai báo. Ma trận và giới hạn phạm vi: [role-navigation.md](role-navigation.md). Đây là lớp điều hướng bổ sung, không thay thế quyền tại backend.
