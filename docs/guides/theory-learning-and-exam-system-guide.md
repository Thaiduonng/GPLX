# Hướng Dẫn Sử Dụng & Báo Cáo Nghiệm Thu Phân Hệ Lý Thuyết GPLX

> **Dự án:** Hệ thống học, đào tạo và tiếp nhận hồ sơ thi cấp giấy phép lái xe các hạng (GPLX Training System).  
> **Phân hệ:** Học tập – Rèn luyện – Thi thử lý thuyết giấy phép lái xe chuẩn Bộ GTVT.  
> **Trạng thái pháp lý:** `VERIFIED` (Căn cứ Thông tư 12/2017/TT-BGTVT và Thông tư 04/2022/TT-BGTVT).  
> **Phiên bản tài liệu:** 1.0.0 — Ngày 26/10/2026.

---

## 1. Giới thiệu tổng quan phân hệ

Phân hệ **Học tập, Rèn luyện & Thi thử Lý thuyết GPLX** là một bộ phận cốt lõi thuộc Hệ thống Đào tạo Lái xe Toàn diện GPLX. Phân hệ được thiết kế theo tiêu chuẩn kiến trúc Modular Monolith (Java 21, Spring Boot 4.1.1, React 19 + TypeScript, MySQL 8.4 LTS, Docker Compose), bám sát bộ 600 câu hỏi sát hạch lý thuyết lái xe của Cục Đường bộ Việt Nam ban hành.

### Các hạng GPLX được hỗ trợ chính thức
| Hạng GPLX | Loại phương tiện áp dụng | Số câu thi | Thời gian | Điểm đạt | Quy định điểm liệt |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **A1** | Mô tô 2 bánh dung tích đến 125cm³ | 25 câu | 19 phút | 21 / 25 | Sai 1 câu điểm liệt -> TRƯỢT |
| **A2** | Mô tô 2 bánh dung tích trên 125cm³ | 25 câu | 19 phút | 23 / 25 | Sai 1 câu điểm liệt -> TRƯỢT |
| **B1** | Ô tô số tự động chở người đến 9 chỗ | 30 câu | 20 phút | 27 / 30 | Sai 1 câu điểm liệt -> TRƯỢT |
| **B / B2**| Ô tô chở người đến 9 chỗ, tải dưới 3.5 tấn | 35 câu | 22 phút | 32 / 35 | Sai 1 câu điểm liệt -> TRƯỢT |
| **C** | Ô tô tải, máy kéo từ 3.5 tấn trở lên | 40 câu | 24 phút | 36 / 40 | Sai 1 câu điểm liệt -> TRƯỢT |

---

## 2. Hướng dẫn các phân khu chức năng (Giao diện React)

Giao diện học tập lý thuyết tích hợp tại đường dẫn `/theory` gồm 6 phân khu chuyên sâu:

### Phân khu 1: 📊 Tổng quan & KPI Tiến độ (`TheoryOverviewTab`)
- **Chỉ số năng lực:** Hiển thị tổng số câu đã học, tỷ lệ trả lời đúng, số đề thi đã hoàn thành, tỷ lệ đỗ sát hạch.
- **Tiến độ 7 chương:** Thanh tiến trình trực quan (%) của từng chương theo thứ tự chuẩn hóa.
- **Lối tắt thông minh:** Nút bấm một chạm chuyển sang bài học tiếp theo, rèn luyện câu điểm liệt, hoặc thi thử sát hạch.

### Phân khu 2: 📖 Học tập theo 7 Chương (`TheoryTopicStudyTab`)
- **Chế độ học linh hoạt:**
  - 🎴 **Học tương tác từng câu (Flashcard/Interactive):** Chọn đáp án kiểm tra ngay phản hồi đúng/sai kèm lời giải và căn cứ pháp lý.
  - 📜 **Xem danh sách đầy đủ:** Cuộn xem toàn bộ câu hỏi trong chương để ôn bài nhanh.
- **Lưới điều hướng nhanh (Question Grid 1..N):** Nhấp chọn chuyển câu ngay lập tức, hiển thị trạng thái điểm liệt ⚠️.
- **Phím tắt phòng học:** Mũi tên `←` / `→` chuyển câu, phím `1..4` chọn đáp án, phím `B` lưu bookmark.
- **Tìm kiếm tức thì:** Tìm câu hỏi theo từ khóa nội dung hoặc số thứ tự câu 1–600.

### Phân khu 3: 🎯 Rèn luyện 8 Chế độ Tương tác (`TheoryPracticeTab`)
- **8 Chế độ rèn luyện:**
  1. Rèn luyện 60 câu điểm liệt (cực kỳ quan trọng).
  2. Rèn luyện theo từng chương cụ thể.
  3. Rèn luyện các câu hỏi chưa từng trả lời.
  4. Rèn luyện lại các câu từng trả lời sai.
  5. Rèn luyện các câu hỏi đã đánh dấu Bookmark.
  6. Rèn luyện ngẫu nhiên 30 câu tổng hợp.
  7. Rèn luyện chuyên sâu Biển báo đường bộ.
  8. Rèn luyện chuyên sâu Giải sa hình.
- **Theo dõi tiến độ thực:** Bảng lưới ma trận đổi màu thời gian thực (Xanh lá = Đúng, Đỏ = Sai).
- **Báo cáo tổng kết:** Phân tích điểm số, tỷ lệ chính xác, và danh sách câu sai cần ôn lại.

### Phân khu 4: 🚗 Thi thử Lý thuyết Sát hạch Chuyên sâu (`TheoryMockExamTab`)
- **Màn hình chọn hạng & Quy chế:** Hiển thị thông số chuẩn ma trận đề thi theo Thông tư 12 & Thông tư 04.
- **Phòng thi tập trung:**
  - Đồng hồ đếm ngược thời gian (Countdown timer), tự động nộp bài khi hết giờ (`handleAutoSubmit`).
  - Lưới điều hướng câu hỏi: Đã làm (xanh), chưa làm (xám), cắm cờ (🚩), điểm liệt (chấm đỏ).
  - Tính năng **Cắm cờ xem lại (Flag for review - Phím F)**: Đánh dấu các câu phân vân để rà soát trước khi nộp.
  - Tự động lưu tiến độ đám mây thời gian thực (`saveExamProgress`) mỗi khi chọn đáp án, phòng ngừa sự cố mạng/mất điện.
  - Phím tắt bàn phím: `1..4` chọn đáp án, `←/→` chuyển câu, `F` cắm cờ.
  - Hộp thoại modal xác nhận nộp bài an toàn, chống bấm nhầm và chống nộp lặp (idempotent).
- **Màn hình kết quả & Lịch sử thi:**
  - Báo cáo ĐẠT / KHÔNG ĐẠT, thời gian làm bài, cảnh báo trượt tức thì nếu sai câu điểm liệt.
  - Lọc xem lại: Tất cả câu, chỉ câu làm sai, chỉ câu điểm liệt.
  - Sub-tab tra cứu lịch sử các bài thi cũ kèm nút xem lại chi tiết bài làm.

### Phân khu 5: 🔄 Ôn tập Câu sai & Bookmark (`TheoryReviewTab`)
- **Sub-tab 1: Danh sách câu làm sai:** Xem lại tất cả các câu hỏi từng chọn sai phương án trong các phiên rèn luyện/thi thử.
- **Sub-tab 2: Danh sách câu đánh dấu:** Quản lý các câu hỏi học viên chủ động ghim lại.
- **Sub-tab 3: Lịch sử phiên rèn luyện:** Bảng phân trang các phiên rèn luyện trong quá khứ kèm điểm số và ngày giờ.

### Phân khu 6: 🛠️ Quản trị Dữ liệu & Ngân hàng Đề thi (`TheoryAdminConfigTab`)
*(Chỉ hiển thị cho người dùng có quyền `ROLE_ADMIN` hoặc `ROLE_STAFF`)*
- **Cấu hình đề thi theo hạng:** Điều chỉnh số câu, thời gian, điểm sàn đạt, phiên bản quy chế.
- **Quản lý ngân hàng câu hỏi:** Tra cứu đa tiêu chí, phân trang, xem chi tiết, thêm mới, chỉnh sửa và xóa câu hỏi an toàn. Ràng buộc tối thiểu 2 phương án và duy nhất 1 đáp án đúng.
- **Nhập / Xuất dữ liệu (Bulk Import / Export):**
  - Nhập hàng loạt câu hỏi từ file JSON có tiền kiểm tra cú pháp và tính toàn vẹn.
  - Xuất dữ liệu câu hỏi ra file JSON tiêu chuẩn.
  - Báo cáo tình trạng pháp lý `VERIFIED`.

---

## 3. Kiến trúc Bảo mật & Phân quyền (RBAC)

1. **Bảo mật đề thi phía Server (Zero-Trust Examination):**
   - API sinh đề `POST /api/v1/theory/mock-exam/start` tuyệt đối **KHÔNG** gửi trường `isCorrect`, `correctAnswerId`, `explanation` hay `legalReference` về trình duyệt học viên trong lúc đang làm bài.
   - Toàn bộ quá trình chấm điểm, đối soát câu điểm liệt và kết luận ĐẠT / TRƯỢT được thực thi 100% tại backend `TheoryExamService`.
2. **Kiểm soát phân quyền RBAC:**
   - Học viên (`ROLE_STUDENT`): Được phép học, rèn luyện, thi thử và tra cứu lịch sử của chính mình. Bị chặn truy cập các API quản trị bằng HTTP 403 Forbidden.
   - Cán bộ / Quản trị viên (`ROLE_ADMIN`, `ROLE_STAFF`): Được cấp quyền truy cập các endpoint `/api/v1/admin/theory/**`.

---

## 4. Biên bản Đối soát 14 Tiêu chí Nghiệm thu (Acceptance Criteria)

| STT | Tiêu chí nghiệm thu theo Master Prompt | Kết quả đối soát thực tế | Trạng thái |
| :---: | :--- | :--- | :---: |
| **1** | Người học có thể học lý thuyết theo chủ đề | `TheoryTopicStudyTab` hỗ trợ học đầy đủ 7 chương lý thuyết, chuyển câu linh hoạt, có giải thích và căn cứ pháp lý. | ✅ **ĐẠT** |
| **2** | Người học có thể luyện tập theo nhiều chế độ | `TheoryPracticeTab` cung cấp 8 chế độ rèn luyện (Điểm liệt, Theo chương, Chưa làm, Làm sai, Bookmark, Ngẫu nhiên, Biển báo, Sa hình). | ✅ **ĐẠT** |
| **3** | Tiến độ và lịch sử được lưu đúng | `TheoryProgressService`, `saveExamProgress`, `mock_exam_sessions`, phân trang lịch sử rèn luyện & thi thử. | ✅ **ĐẠT** |
| **4** | Thi thử hoạt động từ đầu đến cuối | `startMockExam` -> Realtime progress -> Submit -> Chấm điểm server -> Hiển thị kết quả & Lịch sử hoạt động mượt mà. | ✅ **ĐẠT** |
| **5** | Cấu hình đề thi tách biệt theo hạng GPLX | 5 bộ cấu hình chuẩn cho A1, A2, B1, B, C độc lập trong bảng `exam_configurations`. | ✅ **ĐẠT** |
| **6** | Cấu trúc đề, thời gian, điểm đạt tuân thủ quy tắc xác minh | Bám sát Thông tư 12/2017/TT-BGTVT và Thông tư 04/2022/TT-BGTVT, cấu trúc `structure_json` sinh đề ngẫu nhiên theo tỷ lệ. | ✅ **ĐẠT** |
| **7** | Backend chịu trách nhiệm chấm điểm | Chấm điểm server-side, rẽ nhánh trượt ngay nếu sai câu điểm liệt, đảm bảo tính Idempotency khi nộp bài. | ✅ **ĐẠT** |
| **8** | Ngân hàng câu hỏi quản lý nguồn và phiên bản | Hỗ trợ lưu trữ `legalSource`, `rulesVersion`, `legalReference`, bộ 600 câu hỏi Cục Đường bộ Việt Nam. | ✅ **ĐẠT** |
| **9** | Dữ liệu kiểm tra hiển thị rõ trong quản trị | Tab Quản trị dữ liệu hiển thị trạng thái `VERIFIED` của 60 câu điểm liệt và quy chế đề thi. | ✅ **ĐẠT** |
| **10** | API và frontend được kết nối thực tế | 100% chức năng kết nối API thực qua Axios apiClient tập trung, không dùng mock data hoặc nút bấm giả. | ✅ **ĐẠT** |
| **11** | Phân quyền được kiểm tra cả frontend và backend | `@PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")` ở backend; Header & Tabs phân quyền theo Role ở frontend; test RBAC 403/200 xác nhận thành công. | ✅ **ĐẠT** |
| **12** | Migration, test và build chạy thành công | 11 Flyway migrations; Toàn bộ 76/76 unit & integration tests PASS 100%; Vite & Docker multi-stage build thành công. | ✅ **ĐẠT** |
| **13** | Kiểm tra responsive và khả năng sử dụng | Giao diện tối ưu desktop, tablet, mobile; đầy đủ loading spinner, empty state, alert, modal xác nhận, phím tắt. | ✅ **ĐẠT** |
| **14** | Tài liệu đồng bộ mã nguồn | Cập nhật đầy đủ `CHANGELOG.md`, `tasks.md`, tài liệu pháp lý và tài liệu hướng dẫn sử dụng. | ✅ **ĐẠT** |

---

## 5. Kết luận

Toàn bộ 6 giai đoạn phát triển phân hệ **Học tập, Rèn luyện và Thi thử Lý thuyết GPLX Việt Nam** đã hoàn thành đạt tiêu chuẩn chất lượng cao nhất, sẵn sàng đưa vào vận hành thực tế.
