# Quy Chuẩn Lập Trình & Checklist Kiểm Tra Tính Nhất Quán
`docs/knowledge/knowledge-consistency-checklist.md`

Tài liệu này cung cấp hướng dẫn bắt buộc cho Lập trình viên và AI Coding Assistant khi thực hiện thay đổi mã nguồn, cùng bảng Checklist định kỳ kiểm tra tính nhất quán giữa Văn bản pháp luật, Cấu trúc Cơ sở dữ liệu và Codebase thực tế.

---

## 1. Quy Trình 10 Bước Bắt Buộc Trước Khi Viết Code Nghiệp Vụ

Trước khi can thiệp vào bất kỳ module hoặc task nào trong dự án GPLX Training System, bạn bắt buộc phải tuân thủ nghiêm ngặt 10 bước sau:

1. **Đọc Rule liên quan:** Đọc file tương ứng trong `.rules/` (VD: `.rules/08-legal-compliance.md`, `.rules/07-business-rules.md`, `.rules/04-database-and-migrations.md`).
2. **Đọc tài liệu module:** Tra cứu `docs/knowledge/module-catalog.md` để nắm rõ ranh giới (`boundaries`) và quyền sở hữu dữ liệu của module.
3. **Kiểm tra bảng và quan hệ database hiện có:** Đối chiếu `docs/knowledge/database-schema-catalog.md` và `docs/knowledge/database-relationships.md`.
4. **Đọc migration tạo bảng:** Đọc trực tiếp các file SQL trong `backend/src/main/resources/db/migration/` để hiểu chính xác kiểu dữ liệu và constraint thực tế.
5. **Kiểm tra Entity, Service, Controller và API hiện có:** Rà soát mã nguồn đã viết để tái sử dụng, tuyệt đối không viết trùng lặp hoặc tạo logic mâu thuẫn.
6. **Xác định Business Rule liên quan:** Tra cứu mã Rule ID trong `docs/knowledge/legal-database-traceability.md`.
7. **Tra cứu Legal Rule nếu phụ thuộc pháp luật:** Kiểm tra `docs/legal/legal-rule-catalog.md` để xác định căn cứ pháp lý.
8. **Kiểm tra trạng thái xác minh:** 
   - Nếu `VERIFIED`: Đưa vào ràng buộc bắt buộc.
   - Nếu `NEEDS_VERIFICATION`: Tuyệt đối không hard-code, thiết kế dạng tham số cấu hình Database.
9. **Lập danh sách file cần sửa:** Lập kế hoạch chi tiết (Entity, DTO, Repository, Service, Controller, Test, Frontend).
10. **Triển khai, kiểm thử và cập nhật tài liệu:** Viết mã nguồn, bổ sung Unit/Integration test, kiểm tra `docker compose` và cập nhật tài liệu liên quan trong `docs/`.

---

## 2. Những Điều Tuyệt Đối Nghiêm Cấm (Strict Prohibitions)

- ❌ **Không tự tạo bảng trùng với bảng hiện có:** Phải kiểm tra danh mục 30 bảng thực tế trước khi viết migration mới.
- ❌ **Không tạo enum mâu thuẫn nghiệp vụ:** Các enum trạng thái (`ApplicationStatus`, `ExamType`, `RoleType`) phải đồng bộ 100% giữa Backend Java và Frontend TypeScript.
- ❌ **Không tự thêm điều kiện pháp lý chưa xác minh:** Không tự ý bịa đặt số km DAT, điểm liệt hay độ tuổi nếu chưa có căn cứ `VERIFIED`.
- ❌ **Không coi comment trong code hoặc dữ liệu seed là bằng chứng pháp lý.**
- ❌ **Không tự ý sửa migration cũ đã chạy trên database chung:** Mọi thay đổi cấu trúc bảng bắt buộc phải tạo migration mới (như `V8`).
- ❌ **Không xóa lịch sử dữ liệu để làm đẹp kết quả:** Bảng `audit_logs` và `payment_receipts` là bất biến.
- ❌ **Không đưa dữ liệu cá nhân nhạy cảm thật vào báo cáo, log hoặc file git.**

---

## 3. Checklist Kiểm Tra Tính Nhất Quán Định Kỳ (Consistency Checklist)

### 3.1. Tính Nhất Quán Cơ Sở Dữ Liệu (Database Consistency)
- [x] Mọi file migration (`V1` đến `V8`) đều chạy thành công trên MySQL 8.4 LTS với `success = 1` trong `flyway_schema_history`.
- [x] 100% Entity JPA kế thừa `BaseEntity` đều có 2 cột audit tương ứng `created_at` và `updated_at` trong CSDL.
- [x] Tên bảng, tên cột và kiểu dữ liệu trong Entity JPA khớp hoàn toàn với schema migration.
- [x] Khóa ngoại và hành vi `ON DELETE` (`RESTRICT`, `CASCADE`, `SET NULL`) tuân thủ đúng nguyên tắc an toàn dữ liệu.
- [x] Không có bảng hoặc cột nào mồ côi (không được Entity hoặc logic nghiệp vụ sử dụng).
- [x] Dữ liệu seed trong migration không vi phạm bất kỳ ràng buộc khóa ngoại hoặc quy tắc nào.

### 3.2. Tính Nhất Quán Pháp Lý (Legal Consistency)
- [x] Toàn bộ các quy tắc bắt buộc áp dụng trong logic code đều có mã `rule_id` và trích dẫn văn bản nguồn chính thức (`SRC-LAW-01`, `SRC-TT-01`, `SRC-TTLT-01`, `SRC-ND-01`).
- [x] Trạng thái hiệu lực của văn bản đã được đối chiếu (Luật số 36/2024/QH15 có hiệu lực từ 01/01/2025; Luật số 23/2008/QH12 ở trạng thái `SUPERSEDED`).
- [x] Các quy định chưa có văn bản hướng dẫn chính thức (như định mức km DAT chi tiết theo Luật mới) được gắn nhãn `NEEDS_VERIFICATION` và lưu dưới dạng tham số cấu hình CSDL, không hard-code.
- [x] Phân định rạch ròi giữa quy định bắt buộc của nhà nước và quy tắc nội bộ của trung tâm đào tạo (`INTERNAL_RULE`).

### 3.3. Tính Nhất Quán Truy Vết (Traceability Consistency)
- [x] Bảng ma trận truy vết `legal-database-traceability.md` phản ánh đầy đủ mối quan hệ: Luật định ➔ Quy tắc ➔ Module ➔ Cột CSDL ➔ API ➔ Test case.
- [x] Mỗi chức năng nghiệp vụ trọng yếu đều có ít nhất 1 Unit Test / Integration Test kiểm chứng hành vi.
- [x] Mọi biến động pháp lý và thay đổi lược đồ CSDL đều được ghi vết đầy đủ trong `database-change-log.md` và `legal-change-log.md`.
