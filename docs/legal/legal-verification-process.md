# Quy trình Rà soát và Xác minh Căn cứ Pháp lý

## 1. Mục đích

Quy trình này bảo đảm không có bất kỳ thông số hoặc điều kiện pháp luật nào được đưa vào logic ràng buộc cứng của hệ thống mà không có căn cứ pháp lý xác thực từ cơ quan nhà nước có thẩm quyền.

## 2. Các bước thực hiện

```text
[Bước 1: Xác định yêu cầu] 
        │
        ▼
[Bước 2: Tra cứu văn bản QPPL chính thống] (vanban.chinhphu.vn, congbao.chinhphu.vn)
        │
        ▼
[Bước 3: Kiểm tra hiệu lực văn bản] (Còn hiệu lực? Đã sửa đổi/thay thế chưa?)
        │
        ▼
[Bước 4: Trích xuất điều khoản cụ thể] (Số hiệu, Điều, Khoản, Điểm)
        │
        ▼
[Bước 5: Lập hồ sơ xác minh & Chuyển trạng thái sang VERIFIED]
        │
        ▼
[Bước 6: Cập nhật cấu hình hệ thống & Viết Unit Test kiểm chứng]
```

## 3. Tiêu chí công nhận trạng thái `VERIFIED`

Một điều khoản chỉ được chuyển từ `NEEDS_VERIFICATION` sang `VERIFIED` khi:
1. Có văn bản QPPL gốc từ cơ quan ban hành chính thức.
2. Xác nhận văn bản đang có hiệu lực tại thời điểm áp dụng.
3. Có sự phê duyệt và ghi nhận trong `docs/legal/legal-register.md`.
