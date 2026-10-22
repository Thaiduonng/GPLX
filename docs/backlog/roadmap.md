# Lộ trình Phát triển Hệ thống (Roadmap)

## Giai đoạn 0: Khởi tạo Nền tảng (Phase 0 — Foundation) — [HOÀN TẤT]
- Khảo sát repository hiện tại và kiểm tra tính tương thích công nghệ.
- Xây dựng bộ quy tắc `.rules/` gồm 14 file và tài liệu chỉ dẫn `AGENTS.md`.
- Xây dựng tài liệu kiến trúc, yêu cầu chức năng/phi chức năng, quy trình pháp lý.
- Thiết lập cấu trúc Modular Monolith cho Backend Spring Boot 4.1.1 (Java 21).
- Thiết lập cấu trúc Frontend React + TypeScript + Vite.
- Thiết lập Docker Compose v2 cho MySQL 8.4 LTS, Backend, Frontend.
- Tạo migration nền tảng Flyway V1 (bảng users, roles, permissions).
- Xây dựng Healthcheck endpoint và giao diện hiển thị trạng thái hệ thống.

## Giai đoạn 1: Xác thực và Phân quyền (Phase 1 — Identity)
- Hoàn thiện nghiệp vụ Đăng ký tài khoản, Đăng nhập, Đăng xuất.
- Cơ chế quản lý Token và Refresh Token.
- Triển khai phân quyền RBAC và kiểm tra quyền sở hữu tài nguyên.
- Giao diện đăng nhập, trang quản lý người dùng và hồ sơ cá nhân.

## Giai đoạn 2: Tuyển sinh và Tiếp nhận Hồ sơ (Phase 2 — Admission)
- Cấu hình danh mục Hạng bằng lái và Khóa học đào tạo.
- Biểu mẫu nộp hồ sơ điện tử dành cho học viên kèm upload tài liệu.
- Quy trình xét duyệt hồ sơ dành cho nhân viên giáo vụ.
- Quản lý lịch sử và trạng thái hồ sơ.

## Giai đoạn 3: Học tập và Đào tạo (Phase 3 — Learning & Training)
- Quản lý bài học lý thuyết trực tuyến và ghi nhận tiến độ học tập.
- Ngân hàng câu hỏi trắc nghiệm và ôn luyện thi.
- Quản lý lớp học, lập lịch học, điểm danh và theo dõi thực hành.

## Giai đoạn 4: Sát hạch và Cấp giấy phép (Phase 4 — Examination)
- Cấu hình điều kiện dự thi dựa trên các căn cứ pháp lý đã xác minh.
- Thẩm định tự động điều kiện dự thi của học viên.
- Tổ chức kỳ thi và ghi nhận biên bản kết quả thi sát hạch.

## Giai đoạn 5: Các Phân hệ Hỗ trợ (Phase 5 — Supporting Modules)
- Phân hệ quản lý khách hàng (CRM).
- Phân hệ quản lý học phí và công nợ (Finance).
- Phân hệ quản lý xe tập lái và bảo dưỡng (Fleet).
- Hệ thống gửi email thông báo và nhắc lịch (Notification).
- Báo cáo thống kê quản trị và Audit Log (Reporting).

## Giai đoạn 6: Tích hợp, Tối ưu và Báo cáo Đồ án (Phase 6 — Integration & Release)
- Kiểm thử tích hợp toàn diện end-to-end.
- Kiểm thử tải và tối ưu hóa hiệu năng truy vấn cơ sở dữ liệu.
- Hoàn thiện tài liệu thuyết minh đồ án và chuẩn bị kịch bản demo bảo vệ.
