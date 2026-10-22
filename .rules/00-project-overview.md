# Rule 00 — Tổng quan dự án

## 1. Mục tiêu đồ án

Xây dựng **Hệ thống học, đào tạo và tiếp nhận hồ sơ thi cấp giấy phép lái xe các hạng (GPLX Training System)** phục vụ quản lý toàn diện quy trình đào tạo lái xe:
- Tiếp nhận và thẩm định hồ sơ điện tử của học viên theo từng hạng GPLX (A1, A2, B1, B2, C,...).
- Đào tạo lý thuyết trực tuyến và giám sát tiến độ học tập.
- Lập lịch và quản lý đào tạo thực hành lái xe, điểm danh, phương tiện đào tạo.
- Thẩm định điều kiện dự thi tốt nghiệp và sát hạch cấp GPLX theo đúng quy chuẩn.
- Quản lý học phí, hỗ trợ tuyển sinh (CRM) và hệ thống báo cáo, audit log bảo mật.

## 2. Phạm vi chức năng và các module nghiệp vụ

Hệ thống được tổ chức theo kiến trúc **Modular Monolith** gồm 11 module:

1. **`identity`**: Xác thực (Authentication), phân quyền (Authorization RBAC), quản lý tài khoản, vai trò và quyền hạn.
2. **`admission`**: Tuyển sinh, đăng ký khóa học, tiếp nhận hồ sơ điện tử, quản lý hồ sơ và quy trình phê duyệt hồ sơ học viên.
3. **`learning`**: Bài giảng lý thuyết, giáo trình điện tử, tiến độ học tập, ngân hàng câu hỏi ôn tập và thi thử.
4. **`training`**: Quản lý lớp học, lịch học lý thuyết/thực hành, điểm danh, phân công giảng viên và theo dõi giờ thực hành.
5. **`examination`**: Cấu hình điều kiện dự thi, thẩm định tư cách dự thi, lập kỳ thi, ghi nhận kết quả sát hạch và lịch sử dự thi.
6. **`crm`**: Quản lý khách hàng tiềm năng, kênh tư vấn, ghi nhận lịch sử tương tác tư vấn viên.
7. **`finance`**: Quản lý biểu mức học phí, hóa đơn thu tiền nội bộ, công nợ học viên, ghi nhận chứng từ thanh toán.
8. **`fleet`**: Quản lý danh mục xe tập lái, lịch bảo dưỡng, phân công phương tiện theo lớp/buổi học thực hành.
9. **`notification`**: Hệ thống thông báo tự động (email, thông báo hệ thống), nhắc lịch học, lịch thi, hạn nộp hồ sơ.
10. **`reporting`**: Dashboard quản trị, báo cáo thống kê tuyển sinh, đào tạo, tỷ lệ đỗ sát hạch và audit log hệ thống.
11. **`shared`**: Các thành phần hạ tầng dùng chung (Base Entity, API Response wrapper, Common Exceptions, Security Utils).

## 3. Vai trò người dùng (User Roles)

- `ROLE_ADMIN`: Quản trị viên hệ thống toàn quyền (quản lý phân quyền, cấu hình hệ thống, audit logs).
- `ROLE_MANAGER`: Ban giám đốc/Quản lý cơ sở đào tạo (duyệt kế hoạch đào tạo, báo cáo, phân bổ nguồn lực).
- `ROLE_STAFF`: Nhân viên giáo vụ / tuyển sinh (tiếp nhận hồ sơ, thẩm định hồ sơ, ghi nhận học phí, xếp lớp).
- `ROLE_INSTRUCTOR`: Giáo viên lý thuyết và giáo viên dạy thực hành (điểm danh, ghi nhận giờ thực hành, đánh giá học viên).
- `ROLE_EXAMINER`: Giám khảo / Sát hạch viên (chấm thi, cập nhật biên bản và kết quả thi).
- `ROLE_STUDENT`: Học viên (nộp hồ sơ, đóng học phí, học trực tuyến, xem lịch học/thi, tra cứu kết quả).
- `ROLE_COUNSELOR`: Tư vấn viên tuyển sinh (tiếp nhận thông tin khách hàng, tư vấn khóa học).

## 4. Phạm vi MVP và Lộ trình mở rộng

- **Phạm vi MVP (Phase 0, 1, 2):**
  - Khung kiến trúc nền tảng, Docker Compose, Database migration, Healthcheck API.
  - Phân quyền Identity hoàn chỉnh, quản lý tài khoản, đăng nhập/đăng xuất.
  - Tuyển sinh & tiếp nhận hồ sơ điện tử, tải tài liệu đính kèm, quy trình phê duyệt hồ sơ.
- **Phạm vi mở rộng (Phase 3, 4, 5, 6):**
  - Quản lý học tập lý thuyết, lớp thực hành, ngân hàng câu hỏi.
  - Tổ chức kỳ thi và thẩm định điều kiện dự thi.
  - Phân hệ tài chính học phí, đội xe tập lái, thông báo và báo cáo quản trị.

## 5. Ngoài phạm vi hệ thống (Out of Scope)

- Tích hợp thanh toán trực tuyến qua cổng trung gian bên thứ ba (VNPay/Momo/ZaloPay) ở giai đoạn khởi tạo (chỉ hỗ trợ ghi nhận biên lai thu tiền nội bộ).
- Tích hợp trực tiếp dữ liệu vào Cổng Dịch vụ công Quốc gia hoặc cơ sở dữ liệu GPLX của Cục Đường bộ Việt Nam (chỉ chuẩn hóa schema sẵn sàng xuất file báo cáo theo quy chuẩn).
- Ứng dụng di động Native (chỉ tập trung Web Responsive hoàn chỉnh).
- Hệ thống nhận diện khuôn mặt AI chống gian lận thi cử (không triển khai trong đồ án này).
