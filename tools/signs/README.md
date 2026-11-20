# tools/signs — Trích danh mục biển báo từ tài liệu QCVN 41

Script dùng **một lần** để sinh dữ liệu seed cho bảng `traffic_signs` từ
`docs/legal/sources/tong-hop-bien-bao-QCVN41-2019.doc`.

## Cách chạy

```bash
pip install -r tools/signs/requirements.txt
antiword -w 0 -m UTF-8.txt docs/legal/sources/tong-hop-bien-bao-QCVN41-2019.doc > /tmp/signs.txt
python -I tools/signs/extract_signs.py docs/legal/sources/tong-hop-bien-bao-QCVN41-2019.doc --text /tmp/signs.txt
```

`antiword` có sẵn trong Git Bash cho Windows. Bắt buộc `-w 0` (không ngắt dòng) để không cắt đôi ký tự UTF-8.

## Đầu ra

- `frontend/public/signs/raster/<Hình>.png|jpg` — ảnh biển, tên theo số hình trong tài liệu (vd `C-26` = Hình C.26).
- `docs/legal/sources/sign-catalog-qcvn41-2019.json` — danh mục.
- `docs/legal/sources/sign-extraction-report.md` — thống kê, mã chưa có ảnh, bảng ghép hình → ảnh.
- `backend/src/main/resources/db/migration/V14__seed_traffic_signs_qcvn41_2019.sql` — migration seed (không sửa tay).

## Cách ghép ảnh

Thứ tự ảnh lấy theo vị trí ký tự ảnh trong văn bản (`sprmCPicLocation` trong các trang CHPX FKP của file .doc),
không theo thứ tự lưu trong stream `Data` (hai thứ tự này lệch nhau). Ảnh chỉ được gán cho biển khi ngay sau
`[pic]` (≤ 3 dòng) có chú thích "Hình X.n - Biển số …"; mã trong chú thích không có chữ cái biến thể áp dụng cho
mọi biến thể (vd `P.103` → `P.103a/b/c`). Ảnh không ghép được thì để trống, không gán tay.

## Kiểm thử

```bash
python -I tools/signs/test_extract_signs.py -v
```
