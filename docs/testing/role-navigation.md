# Kết quả kiểm chứng menu theo vai trò — 29/10/2026

## Đã chạy và đạt

- TypeScript: `node frontend/node_modules/typescript/bin/tsc -b frontend/tsconfig.json`, exit 0.
- 18/18 unit tests: 12 kiểm thử chính sách điều hướng và 6 kiểm thử engine sa hình. Bảng quyền kiểm tra độc lập từng vai trò, hợp nhiều vai trò, khách/role lạ, alias, route không khai báo, active link và sa hình trong lối tắt.
- Production build trong Docker: `tsc -b && vite build`, thành công. Có cảnh báo bundle lớn hơn 500 kB, không có lỗi build.
- Chrome headless: 21/21 tổ hợp (7 vai trò × viewport 375, 768, 1440px), không page error, không tràn ngang. So sánh danh mục với policy, mở/đóng bằng Escape, đường dẫn sai quyền và lối tắt sa hình.
- Học viên ở ba viewport: tải danh mục từ backend thật, chọn B, lái bằng phím ↑ và nút giữ ga làm xe di chuyển; chọn B1 hiển thị chưa hỗ trợ, chọn lại B khôi phục sân.
- Khách trên điện thoại: vào sa hình chuyển đến login, danh mục có đăng nhập/đăng ký và không có module cần xác thực.
- Đã xem ảnh chụp 375px và 1440px, xác nhận sa hình hiện ở thanh lối tắt và không còn mất menu ở màn hình nhỏ.

## Cách tái hiện

```powershell
node --test frontend/src/features/navigation/navigation.test.mjs frontend/src/features/simulation/engine.test.mjs
node frontend/node_modules/typescript/bin/tsc -b frontend/tsconfig.json
docker compose build frontend
docker compose up -d --no-deps frontend
# PLAYWRIGHT_MODULE trỏ tới package Playwright có sẵn nếu chưa nằm trong node_modules
node scripts/navigation-smoke.mjs
```

Script cần Chrome cài sẵn; URL mặc định `http://localhost:3000`, thay bằng biến `GPLX_URL` khi cần. Không thêm dependency vào ứng dụng.

Ảnh: `artifacts/navigation/student-375.png`, `student-768.png`, `student-1440.png`.

## Phạm vi và giới hạn

Profile và API các module được giả lập để cô lập việc kiểm tra menu/route; API danh mục hạng xe dùng backend thật. Kết quả này không khẳng định đã kiểm thử backend RBAC, quyền sở hữu, CRM, thu học phí hoặc chấm điểm đầu-cuối. Không thay đổi backend trong đợt này. Chưa kiểm tra cảm ứng đa điểm trên điện thoại vật lý, chưa đánh giá mô hình lái với giáo viên. Lịch sử luyện sa hình vẫn chỉ ở bộ nhớ trang.
