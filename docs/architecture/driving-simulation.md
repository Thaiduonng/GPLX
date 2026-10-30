# Module luyện sa hình với xe ảo

## Phạm vi đã triển khai

- Route `/student/driving-simulation`, yêu cầu đăng nhập qua ProtectedRoute, truy cập từ navbar và menu thực hành.
- Module frontend `features/simulation`: engine TypeScript thuần, không thêm dependency. Trang React và CSS Modules hiển thị sân tập SVG 2D nhìn từ trên xuống.
- Dùng API hiện có `admissionService.getActiveCategories()`; có trạng thái loading, empty, error/retry và success. Không thêm API hoặc migration.
- Cấu hình xe minh họa A1, A, B, B2 (nếu danh mục hiện có), C1, C. Mã hạng chưa cấu hình hiển thị chưa hỗ trợ, không tự suy luận phương tiện từ mã. B1 hiện chưa được ánh xạ vì danh mục cũ cần đối chiếu trước.
- Hai bài luyện nội bộ: chuyển hướng và zích zắc theo điểm dẫn đường tuần tự. Có ga, lực cản, phanh, đánh lái theo chiều tiến/lùi, kiểm tra toàn bộ thân xe tại biên sân, thời gian và số lần chạm biên.
- Bàn phím chỉ bắt phím điều khiển khi vùng sân tập có focus; nút giữ hỗ trợ pointer capture và bàn phím. Tự tạm dừng khi đổi tab/mất focus cửa sổ. Đổi hạng/bài hoặc luyện lại sẽ xóa phiên hiện tại.
- Kết quả chỉ ở bộ nhớ trang, không lưu tài khoản hoặc trình duyệt, không dùng xét điều kiện dự thi.

## Quy tắc nội bộ

- SIM-001 [INTERNAL_RULE]: kích thước, tốc độ (đơn vị mô phỏng/giây), góc lái, khoảng chạm điểm và sân tập là thông số minh họa; không biểu thị thông số pháp lý hoặc động lực học xe thật.
- SIM-002 [INTERNAL_RULE]: đi qua các điểm theo thứ tự để hoàn thành bài; không có điểm đỗ/trượt sát hạch.
- SIM-003 [INTERNAL_RULE]: mô tô không có lùi; ô tô/xe tải chỉ đổi D/R khi dừng hoàn toàn qua giao diện. Giữ phanh không khiến xe tự lùi.
- Không ghi nhận giờ DAT, số km đào tạo hoặc kết quả sát hạch. Không đưa cấu trúc bài thi chuẩn nhà nước vào bản này.

## Kiểm chứng và giới hạn

Chạy `node --test frontend/src/features/simulation/engine.test.mjs` bằng Node 24: 6/6 PASS, bao gồm ga/phanh, lùi, hướng lái, thân xe chạm biên, thứ tự điểm/hoàn thành và giới hạn bước thời gian.
TypeScript PASS (exit 0), kiểm tra riêng bằng `node node_modules/typescript/bin/tsc -b` tại frontend.
Vite production build PASS trong Docker (29/10/2026), khắc phục giới hạn thư viện native Windows bằng môi trường build hiện có. Chrome smoke PASS ở 375/768/1440px: bàn phím, nút giữ ga, danh mục hạng xe thật và hạng chưa hỗ trợ. Chi tiết: `docs/testing/role-navigation.md`. Chưa kiểm tra cảm ứng trên thiết bị vật lý hoặc đánh giá mô hình với giáo viên; lịch sử và cấu hình backend chưa triển khai.

## Mở rộng còn lại

Lịch sử luyện có quyền sở hữu trên backend; cấu hình xe/bài tập được quản lý; mô hình 3D, số sàn/côn, ghép xe, sa hình pháp lý sau xác minh; kiểm thử cảm ứng trên thiết bị thật và đánh giá mô hình với giáo viên.


## Nâng cấp 3D (29/10/2026)

Route chính chuyển sang MVP 3D; nội dung 2D mô tả ở trên vẫn còn nguyên tại `/student/driving-simulation/2d`. Xem [simulation3d-mvp.md](simulation3d-mvp.md) và hướng dẫn `docs/training/simulation3d-mvp.md`. Cả hai route dùng cùng quyền đã được cấu hình.
