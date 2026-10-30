# Kiểm chứng MVP sa hình 3D — 29/10/2026

## Đã chạy và đạt

1. TypeScript strict: `node frontend/node_modules/typescript/bin/tsc -b frontend/tsconfig.json`, exit 0.
2. 58/58 kiểm thử Node: 40 mới cho 3D + 6 engine 2D + 12 policy/menu. Kiểm tra sáu loại xe (tiến/lùi/phanh), dốc/phanh tay/tụt dốc, trục cơ sở, cảm biến thân/bánh, từng bài/chuỗi bài, trừ điểm/lặp/đình chỉ, luật hết hạn, cấu hình hạng, phím, sơ đồ, replay và chống sai dữ liệu.
3. Kiểm thử tích hợp physics-controller-lessons cho cả sáu hạng: điều khiển bằng input từng bước từ spawn tới hết ba bài với điểm 100, không dịch chuyển/teleport trạng thái xe trong test này.
4. Docker production frontend `tsc -b && vite build`: PASS. Three.js tải trong chunk lazy của trang 3D; bundle 3D khoảng 531 KB trước gzip / 140 KB gzip. Cảnh báo chunk >500 KB vẫn có.
5. Gói `artifacts/simulation3d-mvp-source.zip`: giải nén vào container sạch, `npm ci` và `npm run build`: PASS (61 module, không cần backend hoặc tài nguyên ngoài).
6. Chrome headless trên bản production cổng 3000, viewport 1560×1050, WebGL 2 với `--enable-unsafe-swiftshader`: PASS các ca trong `scripts/simulation3d-smoke.mjs`:
   - Render sân/xe thật, sáu hạng và ba góc camera; chỉ có một canvas sau đổi xe.
   - Cài dây, nhả phanh tay, bật/tắt xi nhan và lái bằng phím hoàn thành bài xuất phát.
   - Terminal save IndexedDB, phát lại/seek, reload vẫn còn lịch sử.
   - Đổi phím ga, phát hiện trùng phím.
   - Nhập sơ đồ không hợp lệ bị từ chối mà sân vẫn hoạt động.
   - Thi mô phỏng phát hiện thiếu dây/xi nhan, giảm điểm theo cấu hình; kết thúc thủ công không báo đạt.
   - Không có page exception trong các ca này.
7. Đã xem ảnh sân, cabin và replay. Ảnh nằm trong `docs/testing/artifacts/simulation3d/`.

## Cách chạy lại

```powershell
node --test frontend/src/features/simulation3d/tests/engine.test.mjs frontend/src/features/simulation/engine.test.mjs frontend/src/features/navigation/navigation.test.mjs
node frontend/node_modules/typescript/bin/tsc -b frontend/tsconfig.json
docker compose build frontend
node scripts/simulation3d-smoke.mjs
```

Cần Node 24 cho kiểm thử TypeScript không biên dịch, Playwright/Chrome có sẵn cho smoke. Đặt PLAYWRIGHT_MODULE nếu package nằm trong môi trường công cụ, GPLX_3D_URL để chọn máy chủ khác. Không cần cài Playwright vào app.

## Giới hạn bằng chứng

- Browser smoke giả lập duy nhất profile xác thực của học viên để không dùng tài khoản/mật khẩu thật; luật, render, physics, input, scoring, file validation và IndexedDB đều chạy code thật. Không phải kiểm thử end-to-end login/backend RBAC.
- Các bài 2–3 có test logic cảm biến và chạy physics liên hoàn cho mọi xe; chưa có kịch bản lái thủ công qua cả ba bài trên GPU/xe/vô lăng thực tế.
- SwiftShader xác nhận rendering/chức năng, không chứng minh FPS trên GPU máy người dùng. Chưa benchmark hiệu năng/hệ treo/mô hình lốp thực nghiệm.
- Chưa nghe/đánh giá chất lượng giọng Việt trên từng hệ điều hành; Speech Synthesis phụ thuộc giọng được cài. Chưa kiểm tra cảm ứng/vô lăng gamepad vì MVP nhắm bàn phím desktop.
- Chưa có backend lưu/chống sửa, các bài còn lại hoặc kiểm định/chứng nhận. Các điều kiện kỹ thuật của sân mẫu khác quy chuẩn sân sát hạch thật.

MVP frontend có thể dùng thử; chưa đạt DoD cho toàn bộ ứng dụng sát hạch 11/10 bài, cũng không phải hệ thống chấm thi chính thức.
