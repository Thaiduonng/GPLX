# Rule 07 — Sổ đăng ký Quy tắc Nghiệp vụ (Business Rules)

## 1. Nguyên tắc quản trị Quy tắc nghiệp vụ

- Mỗi quy tắc nghiệp vụ trong hệ thống phải có **Mã định danh (Rule ID)** duy nhất.
- Mọi rule phải được triển khai tập trung tại Application/Domain layer, có unit test kiểm chứng tương ứng, không được phân tán logic rải rác.
- Cấu trúc thông tin của một Business Rule:
  - **Rule ID:** Mã chuẩn hóa gồm tiền tố module và số thứ tự (VD: `ADM-001`).
  - **Mô tả:** Ý nghĩa và mục tiêu của quy tắc.
  - **Điều kiện kích hoạt:** Khi nào quy tắc được áp dụng.
  - **Hành vi hệ thống:** Xử lý logic và trạng thái sinh ra.
  - **Ngoại lệ:** Các tình huống từ chối hoặc rollback.
  - **Trạng thái xác minh:** `VERIFIED` / `NEEDS_VERIFICATION` / `INTERNAL_RULE`.

## 2. Danh mục Quy tắc nghiệp vụ khởi tạo

### Phân hệ Tuyển sinh & Hồ sơ (Admission - ADM)
- **`ADM-001`** [Trạng thái: `INTERNAL_RULE`]: Hồ sơ điện tử phải tuân thủ máy trạng thái nghiêm ngặt: `DRAFT` ➔ `SUBMITTED` ➔ `UNDER_REVIEW` ➔ `APPROVED` / `REJECTED` / `SUPPLEMENT_REQUIRED`.
- **`ADM-002`** [Trạng thái: `INTERNAL_RULE`]: Khi chuyên viên yêu cầu bổ sung (`SUPPLEMENT_REQUIRED`) hoặc từ chối (`REJECTED`), bắt buộc phải nhập lý do chi tiết vào hệ thống.
- **`ADM-003`** [Trạng thái: `INTERNAL_RULE`]: Hồ sơ đã được duyệt (`APPROVED`) thì không thể tự ý sửa đổi thông tin nhân thân trừ khi có sự phê duyệt đặc biệt từ Quản trị viên kèm lý do lưu vết audit log.

### Phân hệ Học tập & Đào tạo (Learning - LRN / Training - TRN)
- **`LRN-001`** [Trạng thái: `INTERNAL_RULE`]: Tiến độ học tập trực tuyến được lưu vết theo từng tài khoản học viên gắn với mã bài giảng và thời lượng học thực tế.
- **`TRN-001`** [Trạng thái: `INTERNAL_RULE`]: Hệ thống xếp lịch học thực hành phải kiểm tra xung đột thời gian: Một giáo viên hoặc một xe tập lái không thể được xếp vào 2 ca học trùng nhau.
- **`TRN-002`** [Trạng thái: `INTERNAL_RULE`]: Điểm danh chỉ được phép thực hiện trong khung giờ diễn ra buổi học cộng trừ 30 phút theo cấu hình.

### Phân hệ Sát hạch & Điều kiện dự thi (Examination - EXM)
- **`EXM-001`** [Trạng thái: `NEEDS_VERIFICATION`]: Điều kiện dự thi sát hạch các hạng phải căn cứ theo quy chuẩn pháp luật (đủ tuổi, đủ giờ học, đạt điểm kiểm tra lý thuyết). *Chờ xác minh số liệu chính thức trước khi hard-code.*
- **`EXM-002`** [Trạng thái: `INTERNAL_RULE`]: Kết quả thi sát hạch (Lý thuyết, Mô phỏng, Sa hình, Đường trường) khi đã khóa sổ thì bất biến và lưu trữ vĩnh viễn.

### Phân hệ Tài chính & Xe tập lái (Finance - FIN / Fleet - FLT)
- **`FIN-001`** [Trạng thái: `INTERNAL_RULE`]: Mọi giao dịch thu học phí phải sinh mã hóa đơn nội bộ duy nhất, kiểm tra idempotency để tránh ghi nhận kép.
- **`FLT-001`** [Trạng thái: `INTERNAL_RULE`]: Xe tập lái đang trong trạng thái bảo dưỡng (`MAINTENANCE`) hoặc hết hạn kiểm định không được phép phân công vào lịch học thực hành.
