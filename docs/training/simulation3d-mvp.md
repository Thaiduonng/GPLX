# Chạy thử MVP sa hình 3D trong hệ thống GPLX

## Dùng bản đang chạy

Mở [Sa hình 3D](http://localhost:3000/student/driving-simulation), đăng nhập bằng học viên/giáo viên/quản lý/quản trị viên. Nếu đang giữ trang cũ, Ctrl+F5. Menu Luyện sa hình mở bản 3D; liên kết Mở sân luyện 2D giữ bản cũ.

## Từ mã nguồn dự án

Tại D:/GPLX, chuẩn bị .env theo hướng dẫn gốc của dự án và Docker Desktop:

```powershell
docker compose up -d --build
```

Nếu backend/MySQL đang chạy và chỉ cập nhật giao diện:

```powershell
docker compose build frontend
docker compose up -d --no-deps frontend
```

Frontend tại http://localhost:3000. Không cần migration mới cho MVP.

Phát triển frontend bằng Node.js 24+:

```powershell
cd D:/GPLX/frontend
npm ci
$env:VITE_API_BASE_URL='http://localhost:8088'
npm run dev
```

Địa chỉ backend trên là cổng của môi trường hiện tại; điều chỉnh nếu cấu hình cổng khác. Dừng frontend Docker hoặc đổi cổng Vite nếu 3000 đang được dùng. Không chỉnh Java/Spring Boot/MySQL cho module 3D này.

## Mã nguồn độc lập

[simulation3d-mvp-source.zip](../../artifacts/simulation3d-mvp-source.zip) chứa app có thể chạy riêng không cần đăng nhập/backend. Giải nén, chạy `npm ci`, `npm run dev`, mở http://localhost:5173. Hướng dẫn đầy đủ: [simulation3d-standalone.md](simulation3d-standalone.md), cũng nằm trong README của ZIP.

Tạo lại ZIP từ source hiện tại:

```powershell
python scripts/package-simulation3d.py
```

## Điều khiển và quy trình luyện

Xem hướng dẫn thao tác từng bước trong [hướng dẫn độc lập](simulation3d-standalone.md). Bắt đầu với luyện từng bài, bật camera trên cao để canh cản trước vào vùng xanh. Ở bài xuất phát hãy cài dây B, bật xi nhan Q, nhả phanh P và giữ W; tắt xi nhan sau vạch. X/Z thay số, Space phanh, A/D đánh lái, R/F đổi chiều khi dừng, C đổi camera. Các phím có thể đổi trong bảng bên dưới sân.

Mỗi hạng có model xe và cấu hình tham chiếu riêng; MVP thực thi ba bài đầu. Bản tích hợp lưu 5 phiên gần nhất theo tài khoản trên trình duyệt; chưa đồng bộ máy chủ. Tải JSON để giữ lịch sử, Xem lại để phát/seek. Mở bản ghi chỉ nhận tài khoản tương ứng và không chấm lại điểm.

## Kiểm tra

```powershell
cd frontend
npm run test:simulation
npm run build
```

Kiểm tra toàn bộ phần bị ảnh hưởng từ thư mục gốc bằng Node 24:

```powershell
node --test frontend/src/features/simulation3d/tests/engine.test.mjs frontend/src/features/simulation/engine.test.mjs frontend/src/features/navigation/navigation.test.mjs
```

Browser smoke cần Playwright/Chrome cài sẵn, không thêm vào dependency ứng dụng. `PLAYWRIGHT_MODULE` có thể trỏ đến package Playwright trong môi trường công cụ; `GPLX_3D_URL` mặc định http://localhost:3000:

```powershell
node scripts/simulation3d-smoke.mjs
```

Kết quả kiểm chứng, giới hạn và ảnh chụp: [simulation3d-mvp.md](../testing/simulation3d-mvp.md). Thiết kế: [kiến trúc](../architecture/simulation3d-mvp.md). Căn cứ/phạm vi pháp lý: [bộ quy tắc](../legal/simulation3d-rules.md).
