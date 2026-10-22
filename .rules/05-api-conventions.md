# Rule 05 — Quy ước thiết kế API RESTful

## 1. Định dạng URI và Tiền tố

- Tất cả các endpoint API nghiệp vụ đều có tiền tố phiên bản: `/api/v1/<tên_tài_nguyên_số_nhiều>`.
  - Ví dụ: `/api/v1/users`, `/api/v1/courses`, `/api/v1/admissions`.
- Định dạng tên tài nguyên: Danh từ số nhiều, chữ thường, nối từ bằng dấu gạch ngang (kebab-case):
  - Ví dụ: `/api/v1/exam-sessions`, `/api/v1/training-schedules`.
- Thao tác phi CRUD (RPC-style action): Dùng động từ ở cuối URI:
  - Ví dụ: `POST /api/v1/admissions/{id}/approve`, `POST /api/v1/admissions/{id}/reject`.

## 2. HTTP Methods & Mã phản hồi (HTTP Status Codes)

| Method | Ý nghĩa | Mã thành công | Mã lỗi thường gặp |
| :--- | :--- | :--- | :--- |
| `GET` | Đọc dữ liệu | `200 OK` | `404 Not Found` |
| `POST` | Tạo mới tài nguyên | `201 Created` | `400 Bad Request`, `422 Unprocessable` |
| `PUT` | Cập nhật toàn phần | `200 OK` | `400`, `404`, `409 Conflict` |
| `PATCH` | Cập nhật một phần | `200 OK` | `400`, `404` |
| `DELETE` | Xóa (soft delete) | `204 No Content` / `200 OK` | `404 Not Found` |

## 3. Cấu trúc Response chuẩn

### Phản hồi thành công (`ApiResponse<T>`):
```json
{
  "success": true,
  "message": "Thao tác thành công",
  "data": { ... },
  "timestamp": "2026-10-22T09:00:00Z"
}
```

### Phản hồi thất bại (`ErrorResponse`):
```json
{
  "timestamp": "2026-10-22T09:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Dữ liệu đầu vào không hợp lệ",
  "path": "/api/v1/admissions",
  "details": [
    {
      "field": "nationalId",
      "message": "Số CCCD không đúng định dạng 12 chữ số"
    }
  ]
}
```

## 4. Idempotency & Quản lý cập nhật đồng thời

- **Idempotency Key:** Với các thao tác nhạy cảm, dễ bị gửi lặp (như ghi nhận học phí, nộp hồ sơ), cần hỗ trợ header `X-Idempotency-Key` để tránh tạo trùng bản ghi.
- **Optimistic Locking:** Với các entity trạng thái quan trọng (như trạng thái hồ sơ duyệt, kết quả thi), sử dụng annotation `@Version` để ngăn ngừa lỗi ghi đè dữ liệu đồng thời (Lost Updates).
