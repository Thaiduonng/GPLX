# Kiểm thử ngân hàng PDF và danh mục GPLX

Ngày kiểm tra: 29/10/2026. Không giả lập kết quả kiểm thử; các kiểm tra API chạy với Spring Boot/MySQL thực trên bản sao dữ liệu cục bộ.

## Kết quả

- Python: 4/4 bài kiểm tra đạt. Đúng 600 số câu, mỗi câu 2–4 lựa chọn và 1 đáp án; số câu 6 chương 180/25/58/37/185/115; 318 ảnh đọc được; tập 250/300/600 và 20/30/60 câu điểm liệt.
- Java: 23/23 bài kiểm tra liên quan đạt qua hai lượt: `TheoryExamSecureWorkflowTest` 8, `QuestionAdminServiceTest` 5, `TheoryExamServiceTest` 2, `VersionedQuestionBankIntegrationTest` 3, `TheoryReviewServiceTest` 5. Lượt cuối sửa fixture ôn tập để có thời điểm tạo giống JPA thật; không bỏ assertion.
- Tích hợp JPA/H2: cùng số câu ở hai phiên bản, ẩn bản lưu trữ nhưng đọc được ID lịch sử; C/C1 không lẫn; câu 32 chỉ điểm liệt ở hạng thích hợp; lọc trang theo phạm vi; ẩn chương cũ.
- Service: từ chối hạng thiếu cấu hình, ngân hàng không đủ cơ cấu và cấu hình pháp lý quá hạn; giữ kiểm thử không lộ đáp án và chấm điểm liệt.
- Node: 12/12 kiểm tra điều hướng/phân quyền đạt sau khi thêm trang danh mục công khai.
- TypeScript strict và Docker production build backend/frontend đạt.
- MySQL bản sao nâng cấp: V15–V17 chạy thành công trên baseline V14; 1.200 câu tổng cộng, 600 hoạt động, 15 hạng hoạt động, 6 chương hoạt động; không có tập đáp án sai số lượng, đủ dấu vết nguồn và 318 câu có ảnh.
- API thật: đăng ký tài khoản kiểm thử riêng trong DB bản sao, JWT thật; đủ 15 hạng. Kiểm tra số câu, thời gian, điểm đạt, phạm vi, cơ cấu từng chương, đúng một câu điểm liệt, không lộ `isCorrect` khi thi. Nộp đúng toàn bộ 14 hạng thì đạt; B1 cố ý sai điểm liệt thì 24/25 vẫn trượt. Đọc lại kết quả qua API thành công.
- Cơ sở dữ liệu đang sử dụng: `scripts/verify_pdf_bank.py --database gplx_db` đạt sau triển khai; kết quả 600 câu mới + 600 cũ, 15 hạng, 6 chương, 318 ảnh và 0 tập đáp án không hợp lệ. Bản sao lưu giữ riêng, không đưa vào Git.

## Chạy lại

```powershell
python scripts/test_pdf_bank.py
node --test frontend/src/features/navigation/navigation.test.mjs
node frontend/node_modules/typescript/bin/tsc -b frontend/tsconfig.json
cd backend
./mvnw.cmd test '-Dtest=VersionedQuestionBankIntegrationTest,TheoryExamSecureWorkflowTest,TheoryExamServiceTest,QuestionAdminServiceTest,TheoryReviewServiceTest'
```

`question-bank-api-smoke.py` chỉ được chạy với container `gplx-bank-upgrade-verify` và DB `gplx_pdf_upgrade_20261029` (có kiểm tra chặn DB thật). Tạo các phiên thi và tài khoản mẫu trong DB kiểm thử, không tác động hồ sơ thật. Đáp án chấm lấy trực tiếp DB để kiểm thử; không ghi token hoặc mật khẩu ra log.

`question-bank-ui-smoke.mjs` dùng Chrome DevTools tại 127.0.0.1:9345, kiểm tra trang công khai 15 hạng trên giao diện sáng/tối và chiều rộng 390/1440; không cần thêm thư viện vào ứng dụng. Ảnh nằm trong `docs/testing/artifacts/license-categories/`.

## Chưa đạt ngoài thay đổi này

Cài mới toàn bộ Flyway trên database trắng bị lỗi V14 cũ do FK `admission_leads.assigned_to` trỏ user mẫu chưa tồn tại. Lượt đó dừng trước V15, được ghi nhận là FAIL. Không sửa migration V14 đã chạy, không xóa database người dùng. Đường nâng cấp từ baseline hiện có đã kiểm chứng độc lập và triển khai thành công. Cần task riêng xử lý dữ liệu mẫu CRM và chạy lại từ đầu trước khi công bố cài mới toàn hệ thống đạt DoD.

Chrome trực tiếp (DevTools, không giả lập API): PASS desktop-dark 1440×1100, desktop-light 1440×1100, mobile-dark 390×844; đủ 15 thẻ, nhãn B1 mô tô đúng, không tràn ngang và không có ngoại lệ JavaScript. Đã xem ảnh sau khi tăng độ tương phản liên kết trên giao diện tối. Tên ảnh: `catalog-desktop-dark.png`, `catalog-desktop-light.png`, `catalog-mobile-dark.png`.
