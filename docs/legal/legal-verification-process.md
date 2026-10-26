# Quy Trình Rà Soát & Xác Minh Căn Cứ Pháp Lý (Legal Verification Process)
`docs/legal/legal-verification-process.md`

Tài liệu này chuẩn hóa quy trình 6 bước rà soát, đánh giá hiệu lực và xác minh tính pháp lý của các quy tắc trước khi đưa vào cấu hình hoặc mã nguồn hệ thống GPLX Training System.

---

## 1. Mục Đích & Nguyên Tắc

Quy trình này bảo đảm mọi thông số, điều kiện và quy trình liên quan đến pháp luật trong hệ thống đều có căn cứ pháp lý xác thực từ cơ quan nhà nước có thẩm quyền, không bịa đặt, không suy diễn sai lệch và có khả năng giải trình minh bạch trước hội đồng đánh giá và cơ quan thanh tra.

---

## 2. Phân Định 5 Trạng Thái Pháp Lý

Mọi quy định trong hệ thống bắt buộc phải được gắn nhãn chính xác 1 trong 5 trạng thái sau:

1. **`VERIFIED` (Đã xác minh chính thức):**
   - Đã đối chiếu với văn bản QPPL gốc còn hiệu lực từ Cổng thông tin Chính phủ hoặc Cơ sở dữ liệu Quốc gia VBQPPL.
   - Có đầy đủ trích dẫn: Số hiệu văn bản, Cơ quan ban hành, Ngày có hiệu lực, Điều, Khoản, Điểm cụ thể.
   - **Chỉ các quy tắc `VERIFIED` mới được phép đưa vào logic ràng buộc tự động bắt buộc của hệ thống.**

2. **`NEEDS_VERIFICATION` (Chờ xác minh):**
   - Các quy định đang trong giai đoạn chuyển tiếp, chờ thông tư hướng dẫn chi tiết hoặc chưa đủ số liệu chính thống.
   - **Xử lý:** Tuyệt đối không hard-code vào code. Thiết kế dưới dạng tham số cấu hình động trong CSDL, có cảnh báo pháp lý trên giao diện người dùng.

3. **`CONFLICTING_SOURCES` (Nguồn mâu thuẫn / Chưa rõ ràng):**
   - Các văn bản có dấu hiệu mâu thuẫn hoặc chưa làm rõ được quan hệ áp dụng giữa luật chung và luật chuyên ngành.
   - Bắt buộc lập hồ sơ tham vấn ý kiến chuyên gia pháp lý trước khi ra quyết định kỹ thuật.

4. **`SUPERSEDED` (Hết hiệu lực / Đã bị thay thế):**
   - Văn bản hoặc điều khoản đã hết hiệu lực do có văn bản mới thay thế (Ví dụ: Luật Giao thông đường bộ 2008 bị thay thế bởi Luật Trật tự, an toàn giao thông đường bộ 2024 từ ngày 01/01/2025).
   - Bảo lưu lịch sử và quy định chuyển tiếp, không xóa bỏ khỏi hồ sơ.

5. **`INTERNAL_RULE` (Quy định nội bộ cơ sở):**
   - Quy định do trung tâm đào tạo tự ban hành (chính sách chia đợt học phí, quy trình xếp lịch, tiếp nhận khách hàng).
   - Không được trình bày như nghĩa vụ pháp luật bắt buộc của nhà nước.

---

## 3. Sơ Đồ Quy Trình 6 Bước Rà Soát Pháp Lý

```text
[Bước 1: Xác định yêu cầu nghiệp vụ cần căn cứ pháp luật]
        │
        ▼
[Bước 2: Tra cứu văn bản QPPL chính thống] (vanban.chinhphu.vn, congbao.chinhphu.vn)
        │
        ▼
[Bước 3: Kiểm tra hiệu lực văn bản & Quy định chuyển tiếp] (Còn hiệu lực? Đã sửa đổi/thay thế?)
        │
        ▼
[Bước 4: Trích xuất điều khoản gốc cụ thể] (Số hiệu văn bản, Điều, Khoản, Điểm)
        │
        ▼
[Bước 5: Lập hồ sơ xác minh & Chuyển trạng thái sang VERIFIED / NEEDS_VERIFICATION]
        │
        ▼
[Bước 6: Cập nhật CSDL, cấu hình hệ thống, viết Unit Test & ghi Legal Change Log]
```

---

## 4. Tiêu Chí Công Nhận Chuyển Sang Trạng Thái `VERIFIED`

Một điều khoản chỉ được chuyển từ `NEEDS_VERIFICATION` sang `VERIFIED` khi thỏa mãn đồng thời 4 tiêu chuẩn:
1. Có văn bản QPPL gốc từ cơ quan ban hành chính thức của Nhà nước (Quốc hội, Chính phủ, Bộ GTVT, Bộ Y tế).
2. Xác nhận văn bản đang có hiệu lực pháp lý tại thời điểm áp dụng thực tế.
3. Có sự phê duyệt và ghi nhận trong `docs/legal/legal-register.md` và `docs/legal/legal-rule-catalog.md`.
4. Có ít nhất một Automated Unit Test hoặc Integration Test kiểm chứng đúng hành vi hệ thống được suy ra từ điều khoản đó.
