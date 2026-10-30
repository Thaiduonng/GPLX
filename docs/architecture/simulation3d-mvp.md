# Kiến trúc MVP sa hình ô tô 3D

## Kết quả và phạm vi

MVP là tính năng frontend của hệ thống GPLX hiện có, React 19 + TypeScript strict + Vite, thêm Three.js 0.180.0 và @types/three cùng phiên bản. Backend Java 21/Spring Boot/MySQL không thay đổi. Không có API/Flyway mới; kết quả chỉ là bản ghi luyện tập trong IndexedDB, không tham gia xét điều kiện dự thi hoặc DAT.

Route chính `/student/driving-simulation` tải trang 3D bằng lazy/Suspense. Sân 2D cũ giữ tại `/student/driving-simulation/2d`, dùng cùng policy. Các vai trò STUDENT, INSTRUCTOR, MANAGER, ADMIN được truy cập; STAFF, COUNSELOR, EXAMINER không có quyền nếu không mang thêm vai trò tương ứng. Bản ZIP độc lập dùng tài khoản demo cục bộ 0, không có backend hay cơ chế xác thực.

## Cấu trúc

```text
frontend/src/features/simulation3d/
  types.ts                  # Hợp đồng thuần, không phụ thuộc Three/React
  config.ts                 # Xe minh họa, sân mẫu, tên bài và phím
  physics/vehicle.ts        # SI units, lực dọc, mô hình xe đạp, cảm biến thân/bánh
  lessons/
    departure.ts            # Bài xuất phát
    pedestrian.ts           # Bài nhường người đi bộ
    hill.ts                 # Bài ngang dốc
    types.ts, index.ts       # Hợp đồng evaluate/spawnFront và registry
  rules/
    configuration.ts        # Kiểm tra bundle luật, profile hạng và thời hạn
    scoring.ts              # Cạnh sự kiện, lặp theo chu kỳ, lỗi/đình chỉ
  runtime/
    controller.ts           # Máy trạng thái, bước thời gian, ghi/phát lại
    input.ts                # Binding phím, focus, remap và chống trùng
    layout.ts               # Xác thực sơ đồ sân nhập
  render/
    objects.ts              # Hình học xe và biển; không tải model ngoài
    yard.ts                 # Sân, cao độ, lề, vạch và cảnh trí mở rộng
    scene.ts                # WebGL, đèn, camera, vòng render, dọn tài nguyên
  persistence/history.ts    # IndexedDB, giới hạn lịch sử, import/export
  ui/                       # HUD, thiết lập, kết quả và giao diện tiếng Việt
  tests/engine.test.mjs     # Node 24 chạy TypeScript thuần
frontend/public/simulation3d/rules-2026-10.json
frontend/src/pages/DrivingSimulation3DPage.tsx
```

## Luồng chạy

1. Trang tải và xác thực JSON luật. HTTP/JSON lỗi có thông báo và Thử lại; không tự dùng bộ luật suy đoán.
2. Người dùng chọn xe/chế độ/bài. Controller tạo trạng thái ban đầu theo profile hạng và spawn của bài.
3. Render dùng requestAnimationFrame; controller tích lũy delta, mô phỏng cố định 1/60 s. Mỗi frame tiếp nhận tối đa 0,1 s để tab bị treo không tạo bước nhảy; không cộng thời gian tab nền. HUD cập nhật 10 Hz.
4. Input chỉ hoạt động khi sân được focus; bàn phím biểu mẫu không điều khiển xe. Mất focus cửa sổ/ẩn tab tự tạm dừng. Các toggle xử lý cạnh keydown, bỏ key repeat.
5. Physics sinh trạng thái xe; module bài nhận xe hiện tại/trước, sân, profile và progress. Sensor trả sự kiện, scoring áp dụng giá trị từ JSON và ghi nguồn.
6. Thi mô phỏng bị đình chỉ theo rule hoặc dưới ngưỡng; luyện tập tiếp tục sau lỗi nhưng lỗi nghiêm trọng vẫn được lưu, không báo đạt chỉ vì điểm còn cao. Chỉ báo kết quả đạt/chưa đạt phạm vi MVP.
7. Terminal state chụp bản ghi một lần, lưu 5 phiên gần nhất theo ownerId. Lỗi lưu vẫn cho tải JSON.
8. Replay dùng dữ liệu đã chụp, nội suy vị trí giữa các frame 10 Hz, seek nhị phân. Không chạy physics/chấm điểm lần nữa. Điểm, bài và lỗi hiển thị theo thời điểm; cảnh và quy tắc lấy từ snapshot.

## Vật lý và hình học

- Hệ tọa độ: x ngang sân, s dọc tuyến (m), y cao độ (m); hướng hiển thị Three.js z = -s.
- Mô hình xe đạp động học: yaw từ tốc độ, trục cơ sở và góc lái; giới hạn gia tốc ngang theo bám lốp. Lực kéo phụ thuộc số và ga; lực cản lăn/khí động, trọng lực theo dốc và lực phanh tạo gia tốc dọc.
- Phanh tay giữ xe trên dốc; nhả phanh có thể tụt dốc. Đổi chiều số khi tốc độ gần 0. Có hỗ trợ côn; tải cao ở số cao trên dốc có thể làm tắt máy.
- Kiểm tra vùng dừng dựa hình chiếu cản trước; vạch dựa tọa độ bốn bánh; va vật cản dùng thân xe chữ nhật quay so với hình tròn. Không coi chỉ tâm xe chạm biên là đủ.
- Xe/sân minh họa, chưa hiệu chuẩn thực nghiệm; không có suspension/rollover/deformation, mô phỏng côn thủ công hoặc lái xe đạt chuẩn thương mại.

## Quy tắc và cấu hình theo hạng

Toàn bộ mức điểm, giới hạn tốc độ, chu kỳ trừ, ngưỡng thời gian xuất phát/khởi hành, khoảng dừng/tụt dốc, thứ tự và số bài tham chiếu theo hạng nằm trong JSON có phiên bản. `profiles` có B/C1/C/D1/D2/D riêng; fullSequence là lộ trình, mvpSequence là phần đã thực thi. B/C1 khác các hạng còn lại ở bài ghép xe tham chiếu; không dựng các module giả để báo đã hoàn thành.

Chi tiết kiểm chứng pháp lý: `docs/legal/simulation3d-rules.md`. Bundle tự vô hiệu khấu trừ và khóa thi mô phỏng khi chưa VERIFIED hoặc hết thời hạn. Line/route advisory không có mức phạt tự suy đoán. Sân mẫu chưa phải sân chứng nhận; detector cần hiệu chuẩn với thiết bị/xe thật trước mọi sử dụng chính thức.

## Nhập sân và dữ liệu

MVP nhận JSON Layout version 1 cho hành lang thẳng với vùng xuất phát, pedestrianLine và hình học dốc, finish, laneWidth, vật cản. Kiểm tra giá trị hữu hạn, giới hạn kích thước/độ dốc, thứ tự khoảng cách, số vật cản và dung lượng tệp. Không nhận JavaScript, HTML hoặc tải URL từ file.

Replay schema 1 kiểm tra owner, phiên bản, class, số frame, tính hữu hạn/thứ tự thời gian, snapshot luật/sân. Dữ liệu hoàn toàn phía client nên có thể sửa, không dùng làm bằng chứng thi hoặc xác thực backend. Import không thay bộ luật dùng cho phiên mới. Giới hạn 30 phút là INTERNAL_RULE bảo vệ tài nguyên, kết thúc phiên chứ không tự tạo mức phạt pháp lý.

## Tối ưu và giới hạn

Three.js tách trong chunk lazy của route; không tải ở trang không dùng. Pixel ratio tối đa 1,5, mesh/model cục bộ, HUD 10 Hz, ghi 10 Hz, vật lý 60 Hz. ResizeObserver và xử lý mất WebGL context; unmount hủy animation, input listener, observer và tài nguyên GPU. Cảnh báo bundle >500 KB vẫn còn, không coi là lỗi build.

Chưa đo FPS trên máy GPU thực tế; kiểm tra Chrome headless có SwiftShader không đại diện hiệu năng sản phẩm. Chưa có các bài còn lại, red-light/railway/parking detector, server sync, phản biện giáo viên hoặc chứng nhận sân/xe. Giọng Việt phụ thuộc giọng hệ điều hành/trình duyệt.

## Đóng gói

`scripts/package-simulation3d.py` tạo `artifacts/simulation3d-mvp-source.zip` từ chính module đang duy trì, thêm entrypoint độc lập, package-lock, TypeScript/Vite và README. Không chép .env, token, node_modules, dist hoặc dữ liệu tài khoản. Không duy trì hai bản source thủ công.
