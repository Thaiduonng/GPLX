# EXAM FORMAT BY LICENSE CLASS — CẤU TRÚC ĐỀ THI SÁT HẠCH LÝ THUYẾT THEO HẠNG GPLX

## 1. Căn cứ pháp lý

- **Căn cứ:**
  - Thông tư số 12/2017/TT-BGTVT và Thông tư số 04/2022/TT-BGTVT của Bộ Giao thông vận tải.
  - Hướng dẫn sát hạch lý thuyết lái xe của Cục Đường bộ Việt Nam.
  - Luật Trật tự, an toàn giao thông đường bộ 2024.
- **Trạng thái:** `VERIFIED`.

---

## 2. Bảng thông số cấu trúc đề thi theo từng hạng GPLX

| Hạng GPLX | Số câu hỏi | Thời gian làm bài | Điểm tối thiểu đạt | Quy định điểm liệt | Cơ cấu câu hỏi trong đề |
|---|:---:|:---:|:---:|:---:|---|
| **A1** (Mô tô 2 bánh < 125cc / 175cc cũ) | **25 câu** | **19 phút** | **21 / 25** | Sai 1 câu liệt = TRƯỢT | - 1 câu điểm liệt<br>- 8 câu khái niệm & quy tắc<br>- 1 câu văn hóa & đạo đức<br>- 1 câu kỹ thuật lái xe<br>- 7 câu biển báo<br>- 7 câu sa hình |
| **A2** (Mô tô 2 bánh phân khối lớn) | **25 câu** | **19 phút** | **23 / 25** | Sai 1 câu liệt = TRƯỢT | Tương tự A1 với yêu cầu điểm đạt cao hơn |
| **B1** (Ô tô số tự động chở người đến 8 chỗ) | **30 câu** | **20 phút** | **27 / 30** | Sai 1 câu liệt = TRƯỢT | - 1 câu điểm liệt<br>- 9 câu khái niệm & quy tắc<br>- 1 câu văn hóa & đạo đức<br>- 2 câu kỹ thuật lái xe & sửa chữa<br>- 9 câu biển báo<br>- 8 câu sa hình |
| **B** (hoặc B2 cũ - Xe số sàn chở người, tải < 3.5T) | **35 câu** | **22 phút** | **32 / 35** | Sai 1 câu liệt = TRƯỢT | - 1-2 câu điểm liệt<br>- 10 câu khái niệm & quy tắc<br>- 1 câu nghiệp vụ vận tải<br>- 1 câu đạo đức<br>- 2 câu kỹ thuật<br>- 1 câu cấu tạo xe<br>- 10 câu biển báo<br>- 9 câu sa hình |
| **C1 / C** (Ô tô tải lớn, đầu kéo) | **40 câu** | **24 phút** | **36 / 40** | Sai 1 câu liệt = TRƯỢT | - 1-2 câu điểm liệt<br>- 12 câu khái niệm & quy tắc<br>- 1 câu nghiệp vụ vận tải<br>- 1 câu đạo đức<br>- 2 câu kỹ thuật<br>- 2 câu cấu tạo xe<br>- 11 câu biển báo<br>- 11 câu sa hình |
| **D1, D2, D, E** (Xe khách, rơ-moóc) | **45 câu** | **26 phút** | **41 / 45** | Sai 1 câu liệt = TRƯỢT | - 1-2 câu điểm liệt<br>- 14 câu khái niệm & quy tắc<br>- 2 câu nghiệp vụ vận tải<br>- 1 câu đạo đức<br>- 2 câu kỹ thuật<br>- 2 câu cấu tạo xe<br>- 12 câu biển báo<br>- 12 câu sa hình |

---

## 3. Quy tắc bảo mật và chống gian lận trong thi thử

1. **Bảo mật đáp án phía máy khách (Client-Side Protection):**
   - API trả danh sách câu hỏi làm bài (`GET /api/v1/theory/mock-exam/start` hoặc `GET /api/v1/theory/mock-exam/{sessionId}`) **tuyệt đối không chứa trường `isCorrect` hay đáp án đúng**.
   - Thí sinh chỉ nhận được nội dung câu hỏi, danh sách các lựa chọn (`optionId`, `content`) và hình ảnh.
2. **Chấm điểm tại máy chủ (Server-Side Evaluation):**
   - Chỉ khi thí sinh ấn "Nộp bài" hoặc bộ đếm giờ hết hạn gửi request lên server (`POST /api/v1/theory/mock-exam/{sessionId}/submit`), hệ thống backend mới đối chiếu đáp án với cơ sở dữ liệu và lưu vào bảng kết quả.
3. **Chống nộp đúp (Idempotency):**
   - Mỗi phiên thi có một `session_token` / `id` duy nhất và trạng thái `COMPLETED` / `IN_PROGRESS` / `EXPIRED`.
   - Nếu session đã nộp hoặc hết hạn, các lượt submit tiếp theo sẽ bị từ chối và trả lại kết quả của lần submit đầu tiên.
4. **Kiểm soát thời gian (Time Integrity):**
   - Backend ghi nhận thời gian bắt đầu `started_at` và thời gian kết thúc `completed_at`.
   - Nếu thời gian nộp vượt quá giới hạn thời gian cho phép cộng thêm độ trễ mạng hợp lý (grace period ví dụ 30 giây), hệ thống tự động khóa bài và chỉ tính các câu đã trả lời trước mốc thời gian đó.
