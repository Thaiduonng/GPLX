# Rule 12 — Quản trị Tài liệu kỹ thuật

## 1. Tính đồng bộ giữa Tài liệu và Mã nguồn

- Tài liệu kỹ thuật phải phản ánh chính xác 100% hiện trạng thực tế của mã nguồn và hệ thống.
- Nghiêm cấm việc mô tả một tính năng trong tài liệu như thể nó đã hoàn thành trong khi mã nguồn thực tế chưa được triển khai hoặc chưa qua kiểm thử.
- Mọi thay đổi về cấu trúc bảng (schema), endpoint API, quy tắc nghiệp vụ hay căn cứ pháp lý đều phải kích hoạt việc cập nhật tài liệu tương ứng ngay trong cùng đợt cập nhật code.

## 2. Bản đồ tài liệu kỹ thuật của dự án

| Thư mục tài liệu | Vai trò và Nội dung |
| :--- | :--- |
| `docs/architecture/` | Tổng quan kiến trúc, ranh giới module, thiết kế database, mô hình an ninh |
| `docs/requirements/` | Danh sách tác nhân (actors), use cases, yêu cầu chức năng và phi chức năng |
| `docs/legal/` | Sổ theo dõi văn bản pháp luật và quy trình xác minh điều khoản pháp lý GPLX |
| `docs/testing/` | Chiến lược kiểm thử, kịch bản test, tiêu chuẩn đánh giá chất lượng |
| `docs/deployment/` | Hướng dẫn chi tiết thiết lập môi trường và chạy dự án từ máy mới |
| `docs/backlog/` | Lộ trình tổng thể (Roadmap) và danh sách chi tiết các công việc (Tasks backlog) |
