# Bảng Đối Chiếu Quy Tắc Pháp Lý & Quy Định Nội Bộ Phân Hệ Đào Tạo Xe Thô

Tài liệu này tuân thủ nguyên tắc phân định 3 trạng thái pháp lý theo quy chuẩn `.rules/08-legal-compliance.md`.

---

## 1. Bảng Phân Định Quy Tắc Nghiệp Vụ

| Mã quy tắc | Tên quy tắc nghiệp vụ | Phân loại | Căn cứ / Nguồn gốc quy định | Trạng thái xác minh | Ứng xử trong mã nguồn |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **`LEG-RVT-001`** | Giáo viên thực hành phải có chứng chỉ sư phạm và giấy chứng nhận giáo viên dạy lái xe hợp lệ | Điều kiện pháp lý bắt buộc | Luật Trật tự an toàn giao thông đường bộ; Thông tư quy định về đào tạo lái xe của Bộ GTVT | `VERIFIED` | Giáo viên phụ trách bắt buộc phải có tài khoản vai trò `ROLE_INSTRUCTOR`, hồ sơ giáo viên đang hoạt động (`active = true`). |
| **`LEG-RVT-002`** | Xe tập lái phải có giấy chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường còn hiệu lực | Điều kiện pháp lý bắt buộc | Luật Giao thông đường bộ; Quy định đăng kiểm phương tiện cơ giới đường bộ | `VERIFIED` | Kiểm tra tự động khi xếp lịch: `inspection_expiry_date >= session_date`. Nếu hết hạn, hệ thống ném lỗi `VehicleInspectionExpiredException`. |
| **`LEG-RVT-003`** | Xe tập lái dùng cho đào tạo phải có biển "TẬP LÁI" và hệ thống phanh phụ hoạt động tốt | Điều kiện an toàn bắt buộc | Thông tư của Bộ GTVT về tiêu chuẩn kỹ thuật xe tập lái | `VERIFIED` | Giáo viên bắt buộc phải xác nhận `safety_checklist_passed = true` trước khi bắt đầu buổi thực hành di chuyển trên xe. |
| **`LEG-RVT-004`** | Học viên tham gia thực hành phải có giấy khám sức khỏe đủ điều kiện lái xe hạng tương ứng | Điều kiện pháp lý bắt buộc | Thông tư liên tịch Bộ Y tế - Bộ GTVT về tiêu chuẩn sức khỏe người lái xe | `VERIFIED` | Hồ sơ tuyển sinh của học viên phải được duyệt (`APPROVED`) với tài liệu KSK hợp lệ trước khi được xếp lịch thực hành có lăn bánh. |
| **`LEG-RVT-005`** | Số giờ và số km thực hành bắt buộc cho từng hạng bằng (chạy đường trường DAT) | Điều kiện pháp lý đang chuyển tiếp | Thông tư 04/2022/TT-BGTVT và các thông tư hướng dẫn theo Luật mới 2025/2026 | `NEEDS_VERIFICATION` | Lưu dưới dạng tham số cấu hình linh hoạt trong Database, không hard-code số km/giờ cố định vào code. Hiển thị cảnh báo cập nhật xác minh trên UI. |
| **`RVT-INT-001`** | Tên gọi "Đào tạo xe thô" | Quy định nội bộ trung tâm | Quy trình đào tạo làm quen xe ban đầu của trung tâm đào tạo | `INTERNAL_RULE` | Thuật ngữ nội bộ, tuyệt đối không tuyên bố đây là chương trình sát hạch chính thức của Bộ GTVT. |
| **`RVT-INT-002`** | Lộ trình 8 giai đoạn làm quen xe cơ bản | Quy chuẩn kỹ năng nội bộ | Chương trình thực hành cơ bản do tổ giáo vụ xây dựng | `INTERNAL_RULE` | Có thể tùy biến và cấu hình theo từng hạng bằng và dòng xe qua bảng `raw_vehicle_stages`. |
| **`RVT-INT-003`** | Thang đánh giá kỹ năng 1 - 5 điểm của giáo viên | Tiêu chí sư phạm nội bộ | Hướng dẫn chuyên môn của bộ môn thực hành lái xe | `INTERNAL_RULE` | Dùng để ghi nhận nhận xét tiến bộ và đề xuất nội dung ôn thêm, không thay thế cho bài thi sát hạch lái xe chính thức. |
| **`RVT-INT-004`** | Tính thời lượng thực tế dựa trên thời gian bắt đầu và kết thúc thực tế | Quy định quản trị nội bộ | Quy chế giám sát giờ dạy thực tế của trung tâm | `INTERNAL_RULE` | Hệ thống tính `actual_duration_minutes = ChronoUnit.MINUTES.between(actualStart, actualEnd)`, không dùng thời lượng dự kiến. |
| **`RVT-INT-005`** | Cho phép học viên học song song xe thô cùng lúc với học lý thuyết | Quy định tổ chức nội bộ | Kế hoạch đào tạo linh hoạt tạo điều kiện cho học viên | `INTERNAL_RULE` | Độc lập tiến độ hoàn toàn, không khóa tiến độ của nhau. |

---

## 2. Nguyên Tắc Ứng Xử Đối Với Quy Tắc Chưa Xác Minh (`NEEDS_VERIFICATION`)

1. Tuyệt đối **không dùng quy tắc chưa xác minh** để tự động từ chối hoặc cấp quyền dự sát hạch cho học viên.
2. Mọi thông số về quy chuẩn DAT hoặc sát hạch phải cấu hình qua tham số cơ sở dữ liệu (`training_configs` hoặc `exam_configs`), cho phép ban giám đốc cập nhật theo từng thông tư mới mà không cần sửa mã nguồn.
