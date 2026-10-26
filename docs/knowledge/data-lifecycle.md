# Vòng Đời Dữ Liệu & Quy Tắc Lưu Trữ (Data Lifecycle & Retention)
`docs/knowledge/data-lifecycle.md`

Tài liệu này quy định trạng thái vòng đời (Lifecycle States), quy chuẩn chuyển dịch trạng thái và thời hạn lưu trữ (Retention Policy) cho các nhóm dữ liệu cốt lõi trong hệ thống GPLX Training System.

---

## 1. Vòng Đời Hồ Sơ Tuyển Sinh Điện Tử (`applications`)

```text
[DRAFT] (Học viên soạn thảo)
   │
   ▼
[SUBMITTED] (Đã nộp, chờ cán bộ tiếp nhận)
   │
   ▼
[UNDER_REVIEW] (Cán bộ tuyển sinh đang thẩm định)
   ├───► [SUPPLEMENT_REQUIRED] (Thiếu CCCD/GKSK, yêu cầu bổ sung) ──► [SUBMITTED]
   ├───► [REJECTED] (Từ chối chính thức kèm lý do chi tiết) ────────► [ARCHIVED]
   └───► [APPROVED] (Đã duyệt thành công, chuyển sang đào tạo) ────► [ACTIVE_TRAINING]
```

### Quy tắc chuyển đổi:
- **`SUBMITTED`:** Học viên hoàn thành nộp form và tải lên tối thiểu 3 tài liệu số hóa bắt buộc: CCCD mặt trước, CCCD mặt sau và Giấy khám sức khỏe còn hạn.
- **`APPROVED`:** Khi hồ sơ đã chuyển sang `APPROVED`, toàn bộ thông tin nhân thân được khóa bảo vệ. Chỉ quản trị viên cấp cao mới có quyền mở khóa sửa chữa kèm lý do bắt buộc ghi vết vào `audit_logs`.
- **Thời hạn lưu trữ:** Hồ sơ trúng tuyển được lưu trữ tối thiểu **05 năm** kể từ ngày kết thúc khóa học; thông tin trích lục cấp bằng lưu trữ **vĩnh viễn**.

---

## 2. Vòng Đời Nghĩa Vụ Tài Chính & Học Phí (`fee_invoices` & `payment_receipts`)

```text
[PENDING] (Phát sinh hóa đơn học phí)
   │
   ├───► [PARTIALLY_PAID] (Học viên đóng đợt 1 / đặt cọc)
   │            │
   │            ▼
   └───► [PAID] (Đã thanh toán đủ 100% học phí)
                │
                ▼
         [LOCKED_RECORD] (Chứng từ tài chính bất biến)
```

### Quy tắc bảo toàn tài chính:
- **FIN-001 (Idempotency):** Mọi giao dịch tạo biên lai thu tiền bắt buộc phải kèm một mã `idempotency_key` duy nhất từ client/cổng thanh toán để ngăn ngừa thanh toán trùng lặp.
- **FIN-002 (Bảo toàn vĩnh viễn):** Bảng `payment_receipts` không hỗ trợ thao tác `DELETE`. Nếu có sai sót thu thừa/thiếu, hệ thống xử lý bằng nghiệp vụ xuất hóa đơn/biên lai điều chỉnh hoặc hoàn phí (Refund), không được xóa bản ghi cũ.
- **Thời hạn lưu trữ:** Chứng từ kế toán học phí lưu trữ tối thiểu **10 năm** theo Luật Kế toán Việt Nam.

---

## 3. Vòng Đời Dữ Liệu Giám Sát Hành Trình DAT (`dat_practice_sessions`)

```text
[RECORDING] (Thiết bị DAT trên xe truyền dữ liệu phiên chạy)
   │
   ▼
[SYNCED] (Đồng bộ vào cơ sở dữ liệu gplx_db)
   │
   ├───► [INVALID] (Vi phạm: Quá tốc độ quy định / Sai khuôn mặt nhận diện)
   │
   └───► [VALIDATED] (Phiên học hợp lệ, cộng dồn km và giờ thực hành)
            │
            ▼
   [AGGREGATED] (Tổng hợp vào tiến độ xét điều kiện thi: TRN-003)
```

### Quy tắc lưu trữ:
- Dữ liệu chi tiết từng phiên chạy DAT lưu trữ tối thiểu **02 năm** phục vụ công tác thanh tra sát hạch của Sở Giao thông Vận tải và Cục Đường bộ Việt Nam.

---

## 4. Vòng Đời Kết Quả Sát Hạch (`exam_results`)

```text
[CANDIDATE_SCHEDULED] (Thí sinh có tên trong danh sách thi)
   │
   ▼
[EXAM_IN_PROGRESS] (Đang thực hiện các bài thi sát hạch)
   │
   ▼
[SCORED] (Sát hạch viên nhập điểm: Lý thuyết, Sa hình, Đường trường)
   │
   ▼
[LOCKED] (Khóa sổ kỳ sát hạch, ký biên bản nghiệm thu)
   │
   ▼
[PERMANENT_RECORD] (Hồ sơ sát hạch lưu trữ vĩnh viễn)
```

### Quy tắc toàn vẹn kết quả:
- **EXM-002:** Sau khi kỳ sát hạch chuyển sang trạng thái `COMPLETED` và điểm số được `LOCKED`, kết quả là bất biến. Không một tài khoản nào (kể cả ADMIN) được quyền sửa đổi trực tiếp điểm thi trong cơ sở dữ liệu nếu không có quyết định thành lập hội đồng chấm phúc khảo chính thức.
- **Thời hạn lưu trữ:** Kết quả sát hạch lái xe lưu trữ **vĩnh viễn** phục vụ việc tra cứu, cấp đổi, cấp lại giấy phép lái xe theo thời gian.

---

## 5. Vòng Đời Nhật Ký Kiểm Toán (`audit_logs`)

```text
[EVENT_TRIGGERED] (Phát sinh hành động nhạy cảm trong hệ thống)
   │
   ▼
[ASYNC_LOGGED] (Ghi bất đồng bộ vào bảng audit_logs)
   │
   ▼
[IMMUTABLE_STORAGE] (Lưu trữ bất biến, không hỗ trợ UPDATE / DELETE)
```

- **Chính sách:** Toàn bộ nhật ký kiểm toán hệ thống được lưu trữ tối thiểu **03 năm** nhằm tuân thủ quy định tại Nghị định số 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân và an ninh mạng.
