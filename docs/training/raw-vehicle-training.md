# Hướng Dẫn Nghiệp Vụ & Quy Trình Đào Tạo Xe Thô

> **Phân định tính chất nghiệp vụ:**
> Tên gọi **"Đào tạo xe thô"** (Raw Vehicle Training / Basic Vehicle Familiarization) là thuật ngữ nghiệp vụ nội bộ của cơ sở đào tạo, dùng để chỉ giai đoạn làm quen xe ban đầu cho học viên chưa từng lái xe hoặc tay lái còn yếu trước khi thực hành sâu vào bài sa hình và đường trường DAT.
> Trạng thái quy định: `INTERNAL_RULE`. Không tự coi đây là thuật ngữ pháp lý chính thức của Nhà nước.

---

## 1. Mục Tiêu Đào Tạo

1. **Làm quen an toàn:** Giúp học viên vượt qua cảm giác bỡ ngỡ, làm quen với không gian buồng lái, nhận diện chính xác các bộ phận điều khiển và quy tắc an toàn trước khi vận hành xe.
2. **Hình thành phản xạ chuẩn:** Luyện tập tư thế ngồi đúng chuẩn công thái học, kỹ năng cầm vô lăng, cảm giác côn - phanh - ga (đối với xe số sàn) và phanh - ga (đối với xe số tự động), thao tác gạt cần số không cần nhìn.
3. **Phân tầng kỹ năng rõ ràng:** Từng bước làm quen từ trạng thái xe tắt máy $\to$ khởi động máy tại chỗ $\to$ di chuyển tốc độ chậm trong khu vực sân thực hành khép kín dưới sự giám sát trực tiếp 1-kèm-1 của giáo viên.
4. **Độc lập tiến độ:** Học viên có thể tham gia đào tạo xe thô song song cùng quá trình học lý thuyết, không bị phụ thuộc vào điều kiện phải thi đỗ lý thuyết mới được học làm quen xe.

---

## 2. Lộ Trình 8 Giai Đoạn Làm Quen Xe Thô (Skill Stages)

| Thứ tự | Mã giai đoạn | Tên giai đoạn | Mô tả nội dung | Điều kiện tiên quyết | Tiêu chí đánh giá hoàn thành |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | `RVT_STAGE_01` | Nhận biết cấu tạo & bộ phận điều khiển | Tìm hiểu khoang động cơ cơ bản, vị trí bình ắc quy, nước làm mát, bảng đồng hồ taplo, các loại đèn báo nguy hiểm, công tắc đèn, gạt mưa. | Không | Nhận biết đúng 100% các đèn báo và cần điều khiển cơ bản. |
| **2** | `RVT_STAGE_02` | Điều chỉnh ghế, gương & tư thế lái | Thao tác chỉnh khoảng cách ghế lái, độ nghiêng lưng ghế, chỉnh 3 gương chiếu hậu triệt tiêu điểm mù, thắt dây an toàn đúng cách. | RVT_STAGE_01 | Tư thế ngồi chuẩn, hai tay nắm vô lăng vị trí 9h-3h hoặc 10h-2h, gương quan sát rõ đuôi xe và làn đường. |
| **3** | `RVT_STAGE_03` | Làm quen bàn đạp, cần số & phanh tay | Thao tác đạp nhả bàn đạp côn/phanh/ga bằng mũi bàn chân, gạt các cấp số 1-2-3-4-5-R theo sơ đồ chữ H (hoặc P-R-N-D số tự động), kéo/hạ phanh tay an toàn. | RVT_STAGE_02 | Thao tác côn - số nhịp nhàng, mắt nhìn thẳng không nhìn cần số khi sang số. |
| **4** | `RVT_STAGE_04` | Kiểm tra an toàn trước khi khởi hành | Quy trình đi một vòng quanh xe kiểm tra áp suất lốp, chướng ngại vật, đóng chặt các cửa xe, kiểm tra mức xăng/dầu, xác nhận phanh tay đã kéo và số ở vị trí N/P. | RVT_STAGE_03 | Thực hiện đầy đủ 5 bước checklist an toàn trước khi bước vào xe. |
| **5** | `RVT_STAGE_05` | Khởi động máy, xuất phát & dừng xe êm | Quy trình đạp hết côn + đạp phanh, vặn khóa/bấm nút khởi động, vào số 1, hạ phanh tay, bật xi-nhan trái, nhả nhẹ côn tìm điểm tiếp giáp để xe lăn bánh êm ái, dừng xe an toàn. | RVT_STAGE_04 | Xe không bị giật, không chết máy khi khởi hành và dừng đúng vạch quy định. |
| **6** | `RVT_STAGE_06` | Điều khiển vô lăng & cua rẽ tốc độ chậm | Luyện kỹ thuật quay vô lăng chéo tay (pull-push / hand-over-hand), giữ đúng tim đường, căn khoảng cách hai bên sườn xe, trả lái mượt mà sau khi rẽ. | RVT_STAGE_05 | Quỹ đạo xe ổn định, không chém cua, tốc độ duy trì đều dưới 15 km/h trong sân tập. |
| **7** | `RVT_STAGE_07` | Luyện tập các thao tác phối hợp sa hình cơ bản | Phối hợp nhịp nhàng phanh - côn trong không gian hẹp, làm quen bài ghép xe vào nơi đỗ thô, điều khiển xe tiến lùi theo đường thẳng. | RVT_STAGE_06 | Lùi xe thẳng lái khoảng cách 20m, căn dừng chuẩn xác theo hướng dẫn của giáo viên. |
| **8** | `RVT_STAGE_08` | Đánh giá tổng kết kỹ năng làm quen xe | Giáo viên thực hiện bài kiểm tra thực hành tổng hợp các thao tác từ chuẩn bị $\to$ khởi hành $\to$ cua rẽ $\to$ dừng xe $\to$ tắt máy rời xe an toàn. | RVT_STAGE_07 | Đạt tối thiểu mức 3/5 trên toàn bộ các tiêu chí kỹ năng; giáo viên xác nhận đủ tự tin chuyển sang bài sa hình chính quy. |

---

## 3. Phân Quyền & Quy Trình Thao Tác

### 3.1. Dành Cho Học Viên (`ROLE_STUDENT`)
- Xem tiến độ đào tạo xe thô cá nhân: Tỷ lệ hoàn thành các giai đoạn, tổng số buổi và thời lượng thực tế đã tích lũy.
- Xem danh sách kỹ năng đã đạt (`PASSED`) và kỹ năng cần rèn luyện thêm (`NEEDS_PRACTICE`).
- Xem lịch học sắp tới (thời gian, địa điểm, giáo viên phụ trách, xe phân công).
- **Nguyên tắc an toàn:** Học viên **tuyệt đối không được tự ý xác nhận hoàn thành** buổi học hay tự chỉnh sửa thời lượng thực hành.

### 3.2. Dành Cho Giáo Viên Phụ Trách (`ROLE_INSTRUCTOR`)
- Chỉ được phân quyền thao tác với các học viên và buổi thực hành nằm trong danh sách phân công của mình.
- Trong buổi thực hành:
  1. Xác nhận điểm danh học viên (`PRESENT`, `ABSENT`, `EXCUSED`).
  2. Bấm "Bắt đầu buổi học" và "Kết thúc buổi học" để ghi nhận **thời gian thực tế** (`actualStartTime`, `actualEndTime`). Thời lượng thực tế được tính tự động bằng số phút giữa hai mốc thời gian, không lấy mặc định thời lượng dự kiến.
  3. Chọn các kỹ năng đã hướng dẫn trong buổi, chấm điểm đánh giá (1 - 5 điểm) kèm trạng thái Đạt / Cần luyện thêm.
  4. Ghi nhận nhận xét sư phạm và dặn dò cho buổi kế tiếp.

### 3.3. Dành Cho Quản Lý Đào Tạo (`ROLE_ADMIN`, `ROLE_MANAGER`, `ROLE_STAFF`)
- Đăng ký học viên vào chương trình xe thô gắn với hạng bằng tương ứng (A1, A2, B1, B2, C).
- Tạo lịch thực hành và phân công giáo viên - phương tiện.
- **Quy tắc kiểm tra xung đột bắt buộc:**
  - Không xếp trùng giờ cho cùng một giáo viên ở 2 buổi khác nhau.
  - Không xếp trùng giờ cho cùng một xe ở 2 buổi khác nhau.
  - Xe phân công phải ở trạng thái hoạt động bình thường (`AVAILABLE`) và hạn đăng kiểm phải còn hiệu lực tại ngày tổ chức buổi học (`inspection_expiry_date >= sessionDate`).
- Theo dõi báo cáo tiến độ, các buổi bị hủy hoặc đổi lịch và lịch sử thay đổi (Audit Log).
