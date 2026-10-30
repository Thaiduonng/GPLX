# Ngân hàng PDF 600 câu và danh mục GPLX 2026

Cập nhật ngày 29/10/2026. Module sở hữu: admission (danh mục hạng), learning (câu hỏi, chương, đề, lịch sử). Giữ kiến trúc Modular Monolith và stack hiện có.

## Nguồn và phiên bản

- Tệp người dùng: `D:/Downloads/600-cau-hoi-sat-hach.pdf`, 188 trang; SHA-256 `6a6dab8543eb334b36ac9de6abcd938e864f2e0e915be27c3a2157ee6e518575`.
- Phiên bản nhập: `PDF-2025-6a6dab85`. Đây là dấu vết tệp người dùng, không tuyên bố hash này trùng bản tải từ cơ quan nhà nước.
- Dữ liệu trích xuất và báo cáo: `data/gplx/question-bank/pdf-2025-6a6dab85/`.
- Hình: `frontend/public/question-images/pdf-2025-6a6dab85/`, 318 câu có hình.
- Danh mục giao diện dùng chung: `frontend/src/data/licenseCategories2026.json`.

## Luồng nhập và bảo toàn dữ liệu

1. `scripts/extract_question_pdf.py` đọc ký tự hiển thị, bỏ lớp chữ bị che bằng hình trắng, nhận đáp án qua nét gạch chân. Xử lý câu 507 dùng dấu hai chấm, lựa chọn cùng dòng và bảng hai cột; không suy luận đáp án bằng AI.
2. `scripts/prepare_question_applicability.py` ghi danh sách câu từ phụ lục 1, 2, 3 CV2262 đã đối chiếu bằng ảnh chính thức. A/A1 có 250 câu, B1 có 300, các hạng ô tô/kéo rơ moóc có 600.
3. `scripts/test_pdf_bank.py` kiểm tra số câu, chương, đáp án, ảnh, tập câu điểm liệt, tính không xóa dữ liệu.
4. `scripts/build_pdf_bank_migration.py` sinh V15/V16. Các migration đã chạy là bất biến; lần nhập tài liệu khác phải tạo phiên bản và migration mới, không chạy lại công cụ để thay migration lịch sử.
5. Flyway V15 chuẩn hóa 15 hạng; B1 ô tô cũ thành `B1_LEGACY` không hoạt động, giữ nguyên khóa ngoại; khóa tuyển sinh khóa học gắn danh mục này. Không tự chuyển giấy phép hoặc hồ sơ cũ thành B1 mô tô ba bánh.
6. V16 lưu câu cũ với `is_active=0`, giữ nguyên ID và đáp án; thêm 600 câu mới, 6 chủ đề mới. Các truy vấn ôn tập và tạo đề chỉ dùng bản hoạt động; đọc lịch sử theo ID vẫn truy cập bản cũ. Không tắt khóa ngoại, không xóa đáp án hay kết quả thi.
7. V17 bổ sung cấu hình hạng kéo rơ moóc và `valid_until`. Toàn bộ cấu hình chuyển tiếp hết hạn sau 28/02/2027; service từ chối tạo đề mới quá hạn, vẫn cho đọc lịch sử.

`applicable_categories` và `paralysis_categories` lưu danh sách có dấu phẩy ở hai đầu; truy vấn kiểm tra trọn mã để C không trùng C1. Câu 32 là ví dụ có mặt trong A/A1 nhưng chỉ là câu điểm liệt của ô tô, không được suy ra điểm liệt mô tô bằng giao tập 60 câu. Cấu hình điểm liệt theo hạng được dùng khi lấy đề, tiếp tục phiên, chấm và trả kết quả.

Tạo đề bắt buộc đủ đúng số lượng từng nhóm. Không đủ câu hay thiếu cấu hình phải báo lỗi, không tự lấy câu của hạng khác hoặc mặc định một ngưỡng điểm chung. Phần thi mới không trả đáp án đúng; chỉ trả khi xem kết quả theo quyền sở hữu. Thống kê tiến độ ngân hàng hiện tại loại ID câu đã lưu trữ, còn lịch sử làm bài giữ nguyên.

## Cấu hình thi thử hiện hành

| Hạng | Câu ôn tập | Điểm liệt trong ngân hàng | Câu/đề | Phút | Điểm đạt |
|---|---:|---:|---:|---:|---:|
| A1 | 250 | 20 | 25 | 19 | 21 |
| A | 250 | 20 | 25 | 19 | 23 |
| B1 | 300 | 30 | 25 | 19 | 23 |
| B | 600 | 60 | 30 | 20 | 27 |
| C1 | 600 | 60 | 35 | 22 | 32 |
| C | 600 | 60 | 40 | 24 | 36 |
| D1, D2, D | 600 | 60 | 45 | 26 | 41 |
| BE, C1E, CE, D1E, D2E, DE | 600 | 60 | 45 | 26 | 41 |

Mỗi đề có đúng một câu điểm liệt theo phạm vi hạng. Sai hoặc bỏ trống câu đó không đạt dù đủ tổng điểm. Kết quả này phục vụ luyện tập, không phải kết quả sát hạch chính thức.

## Sử dụng

- Tra cứu công khai: `/license-categories`, liên kết **15 hạng GPLX** trong menu.
- Ôn tập, chọn hạng, câu điểm liệt: `/student/review`.
- Thi thử theo hạng: `/student/theory`, tab **Thi thử theo hạng**.
- Quản trị viên/giáo vụ: `/admin/theory`; học viên không thấy tab quản trị. Giữ kiểm tra quyền phía máy chủ hiện có.
- Các bộ chọn hạng học/thi/quản trị dùng danh mục chung. Danh mục xe thô lấy ID thực từ API, bỏ ID mẫu cố định.

## Tái lập và kiểm tra

```powershell
python -m pip install pymupdf pillow
python scripts/extract_question_pdf.py --pdf D:/Downloads/600-cau-hoi-sat-hach.pdf
python scripts/prepare_question_applicability.py
python scripts/test_pdf_bank.py
node frontend/node_modules/typescript/bin/tsc -b frontend/tsconfig.json
# Khi đã có migration được duyệt trong mã nguồn:
docker compose up -d --build backend frontend
python scripts/verify_pdf_bank.py --database gplx_db
```

Công cụ trích xuất từ chối tệp khác hash đã rà soát. Không nhập bằng `data/gplx/question-bank/generate_sql.js` cũ vì công cụ đó ghi đè ID và xóa đáp án. Công cụ `verify_pdf_bank.py` chỉ đọc và kiểm tra trạng thái nâng cấp bộ dữ liệu mẫu hiện tại (600 cũ + 600 mới), không phải công cụ kiểm kê tổng quát cho mọi cơ sở dữ liệu tùy biến.

Bản sao lưu trước cập nhật ở `.local-backups/before-pdf-bank-20261029.sql`, đã loại khỏi Git vì có thể chứa dữ liệu cá nhân. Không đưa bản sao lưu vào gói nguồn chia sẻ.

## Giới hạn cài mới đã phát hiện

Thử Flyway từ cơ sở dữ liệu trắng bị chặn tại V14 có sẵn: dữ liệu mẫu `admission_leads.assigned_to` tham chiếu ID người dùng 7/3 chưa tồn tại. V15–V17 chưa được chạy trong lần thử trắng đó. Không sửa checksum V14 đã áp dụng. Đường nâng cấp từ bản sao cơ sở dữ liệu V14 hiện có đã kiểm tra thành công. Cần xử lý riêng chiến lược dữ liệu mẫu CRM để xác nhận trọn bộ cài mới; không đánh dấu kiểm tra này là đã đạt.
