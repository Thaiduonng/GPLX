# Bảng Yêu cầu Chức năng (Functional Requirements)

## 1. Yêu cầu Chức năng Phân hệ Nền tảng & Xác thực (FR-ID)
- **`FR-ID-01`**: Hệ thống phải hỗ trợ xác thực người dùng bằng username/email và mật khẩu.
- **`FR-ID-02`**: Hệ thống phải phân quyền theo mô hình vai trò RBAC kết hợp kiểm tra quyền sở hữu dữ liệu.
- **`FR-ID-03`**: Hệ thống phải có endpoint kiểm tra tình trạng sức khỏe (`/api/v1/health`) không yêu cầu xác thực.
- **`FR-ID-04`**: Mọi thao tác quản trị tài khoản phải được ghi lại audit log.

## 2. Yêu cầu Chức năng Phân hệ Tuyển sinh & Hồ sơ (FR-ADM)
- **`FR-ADM-01`**: Cho phép học viên đăng ký hồ sơ theo từng hạng giấy phép lái xe cụ thể.
- **`FR-ADM-02`**: Học viên có thể tải lên tệp tin ảnh và tài liệu chứng minh nhân thân, giấy khám sức khỏe.
- **`FR-ADM-03`**: Chuyên viên tuyển sinh có thể duyệt, từ chối hoặc yêu cầu bổ sung hồ sơ kèm lý do.
- **`FR-ADM-04`**: Hệ thống lưu vết toàn bộ lịch sử thay đổi trạng thái hồ sơ.

## 3. Yêu cầu Chức năng Phân hệ Đào tạo & Sát hạch (FR-TRN / FR-EXM)
- **`FR-TRN-01`**: Lập lịch học lý thuyết và thực hành, kiểm tra xung đột thời gian giảng viên và phương tiện.
- **`FR-EXM-01`**: Tự động đánh giá điều kiện dự thi của học viên dựa trên cấu hình điều kiện đã được xác minh.
- **`FR-EXM-02`**: Quản lý kỳ thi sát hạch và ghi nhận kết quả từng phần thi (Lý thuyết, Mô phỏng, Thực hành).
