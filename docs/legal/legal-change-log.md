# Nhật Ký Thay Đổi Căn Cứ Pháp Lý (Legal Change Log)
`docs/legal/legal-change-log.md`

Tài liệu này theo dõi các biến động pháp lý, thay đổi hiệu lực văn bản, quy định chuyển tiếp và các đợt cập nhật căn cứ pháp luật vào hệ thống GPLX Training System.

---

## Bảng Lịch Sử Biến Động Pháp Lý

| Ngày Cập Nhật | Mã Quy Tắc Tác Động | Văn Bản Cũ (Trước Đó) | Văn Bản Mới (Thay Thế / Áp Dụng) | Nội Dung Thay Đổi Trọng Tâm | Tác Động Hệ Thống GPLX |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **2024-06-27** | `LEG-LICENSE-001`, `LEG-ADMISSION-001` | Luật GTĐB 2008 (Luật số 23/2008/QH12) | Luật Trật tự, ATGTĐB 2024 (Luật số 36/2024/QH15) | Quốc hội ban hành Luật mới: Đổi mới phân hạng GPLX (B1 số tự động & B2 số sàn cũ gộp thành hạng B; thêm hạng C1; hạng B1 mới là xe 3 bánh); quy định lại độ tuổi tối thiểu theo từng hạng mới. Hiệu lực từ 01/01/2025. | Cấu hình bảng `license_categories` theo danh mục mã hạng mới; chuẩn hóa logic kiểm tra tuổi theo Điều 59 Luật 36. |
| **2022-04-22** | `LEG-TRAINING-001`, `LEG-TRAINING-002` | Thông tư 12/2017/TT-BGTVT | Thông tư 04/2022/TT-BGTVT | Bổ sung quy định bắt buộc học viên lái xe ô tô phải học mô phỏng Cabin và thực hành trên đường thông qua thiết bị giám sát hành trình DAT. | Bổ sung bảng `dat_practice_sessions`, thêm hình thức học `CABIN_SIMULATION` và `PRACTICE_ROAD` trong `training_schedules`. |
| **2023-04-17** | `LEG-DATA-001` | Luật An toàn thông tin mạng 2015 | Nghị định 13/2023/NĐ-CP | Quy định chặt chẽ về quyền chủ thể dữ liệu, bắt buộc áp dụng biện pháp bảo vệ dữ liệu cá nhân cơ bản và nhạy cảm (CCCD, Sức khỏe), lưu vết nhật ký kiểm toán. | Triển khai bảng `audit_logs` bất biến, mã hóa mật khẩu BCrypt, che giấu dữ liệu nhạy cảm trong phản hồi API. |
| **2024-03-31** | `LEG-TRAINING-003` | Thông tư 04/2022/TT-BGTVT | Thông tư 05/2024/TT-BGTVT | Cho phép đào tạo lý thuyết trực tuyến kết hợp tập trung đối với một số môn học lý thuyết lái xe. | Cho phép học trực tuyến E-Learning lưu vết qua bảng `learning_progress`. |

---

## Quy Định Chuyển Tiếp & Bảo Lưu Lịch Sử

Theo **Điều 89 Luật Trật tự, an toàn giao thông đường bộ 2024 (Luật số 36/2024/QH15)**:
1. Giấy phép lái xe được cấp trước ngày 01/01/2025 được tiếp tục sử dụng theo thời hạn ghi trên giấy phép.
2. Giấy phép lái xe được cấp lại do bị mất hoặc đổi do hết thời hạn được đổi sang hạng mới tương ứng theo quy định của Luật mới (Ví dụ: Hạng B1 tự động cũ đổi sang hạng B có điều kiện tự động; B2 cũ đổi sang hạng B).
3. **Quy tắc hệ thống:** Hệ thống GPLX Training System giữ nguyên khả năng ánh xạ lịch sử đối với các hạng cũ trong trường hợp học viên nộp hồ sơ xin cấp đổi/cấp lại, không xóa bỏ bất kỳ mã hạng lịch sử nào trong CSDL.
