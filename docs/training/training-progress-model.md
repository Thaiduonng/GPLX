# Mô Hình Quản Lý Tiến Độ Đa Luồng (Multi-Track Progress Model)

## 1. Khái Niệm Cốt Lõi

Trong hệ thống đào tạo GPLX tổng thể, quá trình đào tạo của một học viên không thể biểu diễn bằng một biến cờ đơn lẻ (chẳng hạn như `trainingCompleted: boolean`). Thay vào đó, hệ thống xây dựng mô hình **Tiến độ đa luồng độc lập (Independent Multi-Track Progress)** gồm 4 luồng nghiệp vụ song song:

```text
+-------------------------------------------------------------------------------+
|                       HỒ SƠ HỌC VIÊN (ADMISSION DOSSIER)                      |
+-------------------------------------------------------------------------------+
       |                                                                  |
       v                                                                  v
+-------------------------------+                       +-------------------------------+
|    LUỒNG 1: HỌC LÝ THUYẾT     |                       |    LUỒNG 2: ĐÀO TẠO XE THÔ    |
| (600 câu, Spaced Repetition)  |                       |  (8 giai đoạn làm quen xe)    |
| • Hoàn thành các bài học LMS  |                       | • Làm quen cấu tạo, ghế gương |
| • Ôn tập câu sai & điểm liệt  |                       | • Thao tác côn, số, phanh, ga |
| • Trạng thái:                 |                       | • Đánh giá kỹ năng giáo viên  |
|   [NOT_STARTED -> IN_PROGRESS |                       | • Trạng thái:                 |
|    -> COMPLETED]              |                       |   [ENROLLED -> IN_PROGRESS    |
+-------------------------------+                       |    -> COMPLETED]              |
       |                                                +-------------------------------+
       |                                                                  |
       +-------------------------------+----------------------------------+
                                       |
                                       v
                        +-------------------------------+
                        |   LUỒNG 3: ĐÀO TẠO THỰC HÀNH  |
                        |   CHÍNH QUY & GIÁM SÁT DAT    |
                        | • Sa hình 11 bài liên hoàn    |
                        | • Chạy DAT đường trường (km)  |
                        | • Cabin mô phỏng điện tử      |
                        +-------------------------------+
                                       |
                                       v
                        +-------------------------------+
                        |  LUỒNG 4: XÉT ĐIỀU KIỆN THI   |
                        |   & KỲ SÁT HẠCH SỞ GTVT       |
                        | • Đối soát đủ 100% điều kiện  |
                        | • Hội đồng sát hạch chấm điểm |
                        +-------------------------------+
```

---

## 2. Nguyên Tắc Độc Lập Giữa Lý Thuyết & Đào Tạo Xe Thô

1. **Không có phụ thuộc tuần tự gượng ép:**
   - Tuyệt đối **không** áp dụng điều kiện: `completeTheory -> unlockRawVehicleTraining`.
   - Học viên vừa nộp hồ sơ hợp lệ có thể được xếp lịch học làm quen xe thô ngay cả khi mới học được 10 câu lý thuyết.
2. **Kịch bản thực tế được hỗ trợ:**
   - **Kịch bản A:** Học viên A đang học chương 1 lý thuyết nhưng đã hoàn thành giai đoạn 1, 2, 3 xe thô (ngồi vững, biết đạp côn sang số).
   - **Kịch bản B:** Học viên B đã thi thử đạt 35/35 lý thuyết nhưng vẫn đang cần luyện thêm kỹ năng đánh lái ở giai đoạn 6 xe thô.
   - **Kịch bản C:** Học viên C bận công tác tạm bảo lưu lịch thực hành xe thô nhưng vẫn mở ứng dụng ôn lý thuyết và làm đề thi thử bình thường.
3. **Phân định rõ các mốc trạng thái nghiệp vụ:**
   - `AdmissionStatus`: Trạng thái thẩm định hồ sơ điện tử (`PENDING`, `APPROVED`, etc.).
   - `TheoryProgress`: Tỷ lệ hoàn thành ngân hàng câu hỏi và điểm số thi thử.
   - `RawVehicleStatus`: Tiến độ 8 giai đoạn làm quen xe ban đầu (`ENROLLED`, `IN_PROGRESS`, `COMPLETED`, `PAUSED`).
   - `DatTrainingProgress`: Tổng số km và giờ lái xe đường trường ghi nhận qua thiết bị DAT.
   - `EligibilityStatus`: Kết quả xét duyệt điều kiện dự sát hạch (`QUALIFIED`, `DISQUALIFIED`).
4. **Quy tắc an toàn pháp lý:**
   - Hoàn thành module xe thô **không đồng nghĩa** với việc học viên đã hoàn thành khóa đào tạo lái xe.
   - Hoàn thành module xe thô **không tự động cấp quyền** cho học viên được dự thi sát hạch. Việc xét duyệt dự thi phải qua quy trình thẩm định điều kiện độc lập theo Thông tư của Bộ GTVT.
