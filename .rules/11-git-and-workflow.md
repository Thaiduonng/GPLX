# Rule 11 — Quy trình làm việc và Quản trị Git

## 1. Khảo sát trước khi thay đổi

- Trước khi thực hiện bất kỳ lệnh chỉnh sửa mã nguồn nào, phải chạy `git status` hoặc kiểm tra thư mục hiện hành.
- Tuyệt đối không xóa hay ghi đè các file mà chưa nắm rõ nguồn gốc và chức năng của file đó.
- Nêu rõ danh sách các file sẽ tạo mới hoặc cập nhật trước khi triển khai các thay đổi lớn.

## 2. Quy chuẩn Git Commit Message (Conventional Commits)

Định dạng commit chuẩn:
```text
<type>(<scope>): <mô tả ngắn bằng tiếng Việt hoặc tiếng Anh>

[Mô tả chi tiết nội dung thay đổi nếu cần]
```

- **Các kiểu commit (`type`):**
  - `feat`: Thêm tính năng mới cho hệ thống.
  - `fix`: Sửa lỗi (bug fix).
  - `docs`: Cập nhật tài liệu kỹ thuật, rule, backlog, README.
  - `refactor`: Tái cấu trúc mã nguồn (không thay đổi hành vi nghiệp vụ).
  - `test`: Thêm hoặc cập nhật mã kiểm thử.
  - `chore`: Cấu hình build tool, dependency, script môi trường.
  - `style`: Định dạng mã nguồn (khoảng trắng, dấu chấm phẩy, format).
- **Phạm vi commit (`scope`):** Tên module tương ứng (ví dụ: `identity`, `admission`, `training`, `rules`, `infra`).
  - Ví dụ: `feat(admission): implement electronic application submission API`
  - Ví dụ: `docs(legal): add legal register tracking table`

## 3. Quản lý nhánh (Branching Strategy)

- `main`: Nhánh ổn định, sẵn sàng deploy hoặc chấm đồ án.
- `develop`: Nhánh tích hợp chính cho các tính năng đang phát triển.
- `feature/<tên_tính_năng>`: Nhánh phát triển tính năng riêng biệt tách ra từ `develop`.
- `fix/<tên_lỗi>`: Nhánh sửa lỗi phát sinh.
