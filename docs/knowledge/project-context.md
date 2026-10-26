# Bối Cảnh Dự Án & Nguyên Tắc Vận Hành Hệ Thống GPLX
`docs/knowledge/project-context.md`

---

## 1. Mục tiêu Hệ thống

Dự án **Hệ thống học, đào tạo và tiếp nhận hồ sơ thi cấp giấy phép lái xe các hạng (GPLX Training System)** là đồ án tốt nghiệp đại học chuyên ngành Công nghệ Thông tin / Kỹ thuật Phần mềm.

Hệ thống được xây dựng nhằm giải quyết bài toán chuyển đổi số toàn diện trong công tác quản lý đào tạo và sát hạch lái xe cơ giới đường bộ:
1. **Minh bạch hóa & Số hóa hồ sơ:** Tiếp nhận hồ sơ điện tử, quản lý định danh người học, kiểm tra điều kiện y tế và giấy tờ tùy thân theo thời gian thực.
2. **Quản lý quy trình đào tạo chuẩn mực:** Quản lý khóa học, lớp học, phân bổ lịch học lý thuyết, mô phỏng cabin và thực hành sa hình không xung đột.
3. **Giám sát thiết bị hành trình DAT:** Lưu vết và tổng hợp số km, số giờ thực hành đường trường theo thiết bị giám sát hành trình DAT (Distance & Time).
4. **Hỗ trợ sát hạch & Đánh giá điều kiện:** Tự động xét duyệt điều kiện dự thi tốt nghiệp và chứng chỉ dựa trên tiến độ và pháp lý; quản lý chấm điểm thi lý thuyết (ngân hàng 600 câu hỏi, câu điểm liệt), thực hành và cấp chứng chỉ.
5. **Truy vết và Tuân thủ pháp luật:** Đảm bảo toàn vẹn dữ liệu, lưu vết kiểm toán (Audit Logs), bảo mật thông tin cá nhân theo Nghị định 13/2023/NĐ-CP.

---

## 2. Phạm vi Đồ án

### 2.1. Kiến trúc tổng thể: Modular Monolith
Hệ thống được tổ chức theo mô hình **Modular Monolith** trên nền tảng Spring Boot. Từng module nghiệp vụ có ranh giới rõ ràng (`boundary`), đóng gói độc lập theo phân tầng (API / Application / Domain / Infrastructure), giao tiếp liên module qua public contract / interfaces hoặc event nội bộ (ApplicationEventPublisher), không gọi chéo qua entity hoặc repository nội bộ của nhau.

### 2.2. Phân định phạm vi: MVP vs Mở rộng
- **Phạm vi MVP (Core Scope):**
  - Quản lý định danh (Identity & RBAC 7 vai trò).
  - Tiếp nhận và thẩm định hồ sơ điện tử (Admission).
  - Khóa học, bài học lý thuyết trực tuyến và thi thử 600 câu (Learning).
  - Quản lý lớp, thời khóa biểu và giám sát tiến độ DAT (Training).
  - Quản lý kỳ thi, xét điều kiện và chấm điểm sát hạch (Examination).
  - Thu học phí, hóa đơn và biên lai bảo toàn idempotency (Finance).
  - Quản lý phương tiện tập lái và lịch bảo dưỡng (Fleet).
  - Báo cáo KPI, thống kê đỗ/trượt và nhật ký kiểm toán (Reporting & Audit).
- **Phạm vi Mở rộng (Extended Scope):**
  - Tích hợp cổng thanh toán trực tuyến bên thứ ba (VNPAY / MoMo).
  - Nhận dạng OCR tài liệu tự động bằng AI (CCND/GKS).
  - Tích hợp API phần cứng DAT truyền tải dữ liệu trực tiếp theo thời gian thực (IoT WebSocket).

---

## 3. Các Vai trò Người dùng (7 Roles RBAC)

| Vai trò | Mã định danh (`RoleType`) | Trách nhiệm chính trong hệ thống |
| :--- | :--- | :--- |
| **Quản trị viên** | `ROLE_ADMIN` | Toàn quyền cấu hình hệ thống, quản lý người dùng, xem toàn bộ Audit Logs và Dashboard KPI cấp cao. |
| **Quản lý cơ sở** | `ROLE_MANAGER` | Quản lý kế hoạch tuyển sinh, thành lập lớp học, điều phối kỳ thi sát hạch, phân công đội xe và cơ sở vật chất. |
| **Cán bộ tuyển sinh** | `ROLE_STAFF` | Tiếp nhận, thẩm định hồ sơ điện tử, kiểm tra hồ sơ sức khỏe, yêu cầu bổ sung hoặc phê duyệt hồ sơ. |
| **Giáo viên đào tạo** | `ROLE_INSTRUCTOR` | Giảng dạy lý thuyết/thực hành, nhận phân công xe tập lái, theo dõi tiến độ học viên của lớp được giao. |
| **Sát hạch viên** | `ROLE_EXAMINER` | Giám sát kỳ thi, chấm điểm bài thi sa hình, đường trường và khóa sổ kết quả kỳ sát hạch. |
| **Học viên** | `ROLE_STUDENT` | Nộp hồ sơ, đóng học phí, học lý thuyết, làm đề thi thử 600 câu, theo dõi số giờ/km DAT và xem kết quả thi. |
| **Tư vấn viên** | `ROLE_COUNSELOR` | Tiếp nhận thông tin học viên tiềm năng (CRM Leads), tư vấn hạng bằng phù hợp và hỗ trợ đăng ký. |

---

## 4. Danh mục Module Nghiệp vụ

1. **`identity`**: Xác thực Stateless JWT HMAC-SHA512, quản lý tài khoản, vai trò và phân quyền hạn (Permissions).
2. **`admission`**: Quản lý danh mục hạng bằng lái (A1, A, B1, B, C1, C,...), tiếp nhận hồ sơ, tài liệu số hóa, máy trạng thái thẩm định hồ sơ.
3. **`learning`**: Quản lý khóa học, bài học, tiến độ học viên và ngân hàng 600 câu hỏi lý thuyết sát hạch đường bộ.
4. **`training`**: Quản lý lớp đào tạo, phân bổ lịch học lý thuyết/sa hình/đường trường/cabin và dữ liệu phiên thực hành DAT.
5. **`examination`**: Quản lý kỳ thi sát hạch, danh sách thí sinh, đánh giá điều kiện dự thi và ghi nhận kết quả sát hạch.
6. **`finance`**: Quản lý biểu phí học phí, phát hành hóa đơn và biên lai thanh toán (bảo vệ Idempotency).
7. **`fleet`**: Quản lý danh mục phương tiện tập lái, kiểm định đăng kiểm và lịch sử bảo dưỡng kỹ thuật.
8. **`reporting`**: Tổng hợp dữ liệu phân tích tỷ lệ đỗ/trượt, báo cáo tiến độ đào tạo và lưu vết kiểm toán bất biến (Audit Logging).

---

## 5. Công Nghệ và Nền Tảng

- **Ngôn ngữ & Runtime:** Java 21 LTS (Amazon Corretto / Eclipse Temurin).
- **Backend Framework:** Spring Boot 4.1.1 (Spring Framework 7.0.9).
- **ORM / Persistence:** Spring Data JPA + Hibernate ORM 7.4.5.Final.
- **Database:** MySQL 8.4 LTS (`utf8mb4`, `utf8mb4_unicode_ci`, Isolation: REPEATABLE READ).
- **Database Migration:** Flyway Community Edition 12.4.0 (V1 đến V8).
- **Bảo mật:** Spring Security 7.1.1 + JJWT 0.12.6 (BCrypt 10 rounds).
- **Tài liệu API:** Springdoc OpenAPI 3.1.1 (Swagger UI 3.1.1).
- **Frontend:** React 19 + TypeScript 5.8 + Vite 6.4 (Nginx Alpine reverse proxy).
- **Môi trường & Triển khai:** Docker & Docker Compose v2.

---

## 6. Những Quyết định Kiến trúc Đã Chốt (Architectural Decisions)

1. **ADR-001 (Modular Monolith Boundaries):** Tuyệt đối không cho phép truy vấn SQL join trực tiếp giữa bảng thuộc module này với bảng nội bộ module khác nếu không thông qua khóa ngoại có thỏa thuận rõ ràng trong contract.
2. **ADR-002 (Stateless JWT Authentication):** Không sử dụng `HttpSession` trên server. Mọi yêu cầu được xác thực qua Authorization Bearer Token.
3. **ADR-003 (Optimistic Locking):** Áp dụng `@Version` trên các thực thể nhạy cảm tranh chấp đồng thời (`AdmissionApplication`) để loại trừ Lost Updates.
4. **ADR-004 (Immutable Audit Logging):** Bảng `audit_logs` chỉ hỗ trợ thao tác `INSERT` và `SELECT`. Không hỗ trợ `UPDATE` hay `DELETE` từ bất kỳ endpoint nghiệp vụ nào.
5. **ADR-005 (Flyway Before Hibernate Validation):** Flyway migration luôn thực thi `repair()` và `migrate()` trước khi Hibernate thực hiện Schema Validation (`ddl-auto: validate`).

---

## 7. Những Vấn đề Chưa Có Quyết định & Đang Chờ Xác Minh

1. **Quy định chuyển tiếp Luật Trật tự, ATGT đường bộ 2024:** Việc thay đổi hệ thống phân hạng bằng lái xe (B1, B2 cũ chuyển thành B, C1) cần cấu hình động và giữ khả năng ánh xạ lịch sử.
2. **Cơ chế kiểm tra khuôn mặt thiết bị DAT:** Mức độ tích hợp dữ liệu nhận diện khuôn mặt trực tiếp từ thiết bị DAT đang được mô phỏng ở tầng dữ liệu phiên thực hành (`dat_practice_sessions`), chưa kết nối luồng camera sinh trắc học trực tiếp.

---

## 8. Nguyên Tắc Bắt Buộc Khi AI Phát Triển Dự Án

- **Bảo toàn hiện trạng:** Không tự ý sửa đổi phiên bản công nghệ Java 21, Spring Boot 4.1.1, MySQL 8.4 LTS, React 19.
- **Không giả lập kết quả:** Không được bịa đặt test pass nếu chưa chạy lệnh thực tế.
- **Không bịa đặt pháp luật:** Chỉ đưa vào ràng buộc cứng nếu quy tắc ở trạng thái `VERIFIED`. Toàn bộ quy tắc `NEEDS_VERIFICATION` phải cấu hình trong Database.
- **Truy vết tài liệu:** Khi thay đổi code, cập nhật ngay các catalog tương ứng trong `docs/`.
