# Danh mục Tác nhân và Use Case Tổng thể

## 1. Danh sách các Tác nhân (Actors)

| Mã tác nhân | Tên tác nhân | Vai trò trong hệ thống |
| :--- | :--- | :--- |
| `ACT-01` | **Khách vãng lai / Học viên tiềm năng** | Xem thông tin khóa học, hạng bằng lái, gửi thông tin tư vấn |
| `ACT-02` | **Học viên (Student)** | Nộp hồ sơ điện tử, theo dõi xét duyệt, học lý thuyết, xem lịch học/thi |
| `ACT-03` | **Giáo viên (Instructor)** | Điểm danh lớp lý thuyết, ghi nhận giờ thực hành lái xe, đánh giá học viên |
| `ACT-04` | **Sát hạch viên (Examiner)** | Tổ chức kỳ thi, nhập kết quả sát hạch lý thuyết/thực hành |
| `ACT-05` | **Nhân viên Tuyển sinh / Giáo vụ (Staff)** | Thẩm định hồ sơ điện tử, xếp lớp, quản lý hóa đơn thu học phí |
| `ACT-06` | **Quản lý cơ sở đào tạo (Manager)** | Xem báo cáo tuyển sinh, tỷ lệ thi đỗ, điều phối xe tập lái |
| `ACT-07` | **Quản trị viên hệ thống (Admin)** | Quản lý tài khoản, phân quyền, cấu hình hệ thống, audit log |

## 2. Danh mục Use Cases chính theo từng Module

### Module Identity
- `UC-ID-01`: Đăng nhập hệ thống
- `UC-ID-02`: Đăng xuất hệ thống
- `UC-ID-03`: Đổi mật khẩu / Khôi phục mật khẩu
- `UC-ID-04`: Quản lý tài khoản và phân vai trò

### Module Admission
- `UC-ADM-01`: Đăng ký khóa học và nộp hồ sơ điện tử
- `UC-ADM-02`: Tải lên tài liệu đính kèm (ảnh chân dung, CCCD, giấy khám sức khỏe)
- `UC-ADM-03`: Thẩm định hồ sơ học viên (Duyệt / Từ chối / Yêu cầu bổ sung)
- `UC-ADM-04`: Tra cứu tiến độ xử lý hồ sơ

### Module Learning & Training
- `UC-LRN-01`: Học bài giảng lý thuyết trực tuyến
- `UC-LRN-02`: Luyện thi câu hỏi trắc nghiệm
- `UC-TRN-01`: Phân lớp học và lập lịch học
- `UC-TRN-02`: Điểm danh và ghi nhận kết quả thực hành

### Module Examination
- `UC-EXM-01`: Thẩm định điều kiện dự thi của học viên
- `UC-EXM-02`: Tạo danh sách thí sinh dự thi theo khóa/kỳ thi
- `UC-EXM-03`: Ghi nhận và công bố kết quả thi
