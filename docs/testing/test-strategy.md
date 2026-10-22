# Chiến lược Kiểm thử và Đảm bảo Chất lượng

## 1. Mục tiêu kiểm thử

- Đảm bảo 100% các endpoint API hoạt động đúng với định dạng dữ liệu chuẩn.
- Đảm bảo các quy tắc nghiệp vụ (Business Rules) và điều kiện ràng buộc được kiểm tra nghiêm ngặt.
- Đảm bảo tính bảo mật, ngăn chặn truy cập trái phép và bảo vệ dữ liệu cá nhân.

## 2. Phân loại kiểm thử

| Cấp độ | Công cụ | Mục tiêu kiểm tra |
| :--- | :--- | :--- |
| **Unit Test** | JUnit 5, Mockito | Kiểm tra logic nghiệp vụ tại tầng Service, tính toán điều kiện, validation |
| **Integration Test** | Spring Boot Test, H2 / Testcontainers | Kiểm tra tích hợp Controller - Service - Database, xác thực Spring Security |
| **Frontend Test** | Vitest, React Testing Library | Kiểm tra render component, hiển thị trạng thái loading/empty/error, validation form |
| **Smoke Test** | Curl / Postman / Swagger UI | Kiểm tra tính sẵn sàng của hệ thống sau khi deploy Docker Compose |

## 3. Kịch bản kiểm thử nền tảng (Foundation Tests)
- `TC-HEALTH-01`: Kiểm tra API `/api/v1/health` trả về `200 OK` kèm thông tin trạng thái `UP`.
- `TC-SEC-01`: Kiểm tra các endpoint bảo mật trả về `401 Unauthorized` khi không có thông tin xác thực.
- `TC-MIGRATION-01`: Kiểm tra Flyway migration tạo đầy đủ bảng `users`, `roles`, `permissions` trên database sạch.
