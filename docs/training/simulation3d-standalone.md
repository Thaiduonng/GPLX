# Sa hình ô tô 3D — MVP độc lập

Bản này chạy độc lập bằng React 19, TypeScript, Vite và Three.js. Không cần backend, database, tài khoản hoặc tài nguyên 3D bên ngoài. Kết quả được lưu trong IndexedDB của trình duyệt (tài khoản demo cục bộ), không phải kết quả sát hạch chính thức.

## Cài đặt và chạy

Cần Node.js 24+, npm, Chrome/Edge có WebGL 2 và tăng tốc đồ họa. Docker là lựa chọn khác nếu máy chưa có Node.

Giải nén ZIP, mở terminal tại thư mục có package.json:

```powershell
npm ci
npm run dev
```

Mở http://localhost:5173. Các lệnh khác:

```powershell
npm run test:simulation
npm run build
npm run preview
```

Preview ở http://localhost:4173. Không mở trực tiếp index.html bằng file://.

Docker (không cần Node trên máy):

```powershell
docker run --rm -it -p 5173:5173 --mount "type=bind,source=$($PWD.Path),target=/app" --workdir /app node:24-alpine sh -c "npm ci && npm run dev"
```

Đặt thư mục giải nén ở vị trí Docker được phép đọc/ghi. npm ci có thể cần mạng lần đầu; mã dựng hình không dùng CDN hoặc model tải bên ngoài.

## Lái thử

1. Chọn hạng B, Luyện tập, Xuất phát hoặc Liên hoàn 3 bài.
2. Bấm dây an toàn để cài (B), nhả phanh tay (P). Bấm Bắt đầu, bật xi nhan trái (Q).
3. Giữ W để tăng ga, S giảm ga/phanh nhẹ, Space phanh. A/D đánh lái.
4. Sau vạch xuất phát, tắt xi nhan trái trước khoảng kiểm tra. Nhả W hoặc lên số X để tránh vòng tua quá cao.
5. Ở bài nhường người đi bộ, giảm tốc sớm; đưa cản trước vào vùng xanh sát vạch, khoảng cách hiển thị 0–0,50 m rồi phanh dừng hẳn, sau đó đi tiếp.
6. Trên dốc làm tương tự, kéo phanh tay khi dừng; giữ ga vừa đủ và nhả phanh tay để khởi hành, tránh tụt dốc.
7. Qua hết dốc, nếu luyện liên hoàn thì tiếp tục đến cổng hoàn thành MVP. Chế độ thi mô phỏng dừng khi mắc lỗi đình chỉ; luyện tập vẫn tiếp tục để sửa kỹ năng.

Phím R/F chọn lùi/tiến khi xe đã dừng; X/Z tăng/giảm số, Q/E xi nhan trái/phải, I tắt/khởi động máy, B dây an toàn, H cảnh báo nguy hiểm, C đổi camera. P là phanh tay. Có bảng tùy chỉnh phím; thay đổi phím áp dụng trong phiên mở trang. Chỉ nhận phím lái khi vùng sân có focus, không bắt phím khi bạn nhập biểu mẫu; chuyển tab tự tạm dừng.

## Phạm vi có thật

- Sáu mô hình xe B/C1/C/D1/D2/D, chiều dài/rộng/trục cơ sở/khối lượng/lực kéo riêng.
- Sân mẫu có dốc thật theo trục cao độ, vạch dừng, vạch dẫn đường, lề, biển tên, vật cản. Đèn tín hiệu/đường sắt/bãi đỗ trong khu mở rộng chỉ là cảnh trí, chưa chấm thành các bài riêng.
- Ba mô-đun: xuất phát, nhường người đi bộ, ngang dốc; có vùng kích hoạt và điều kiện hoàn thành.
- Các lỗi đã nhận diện: xuất phát thiếu dây/xi nhan, chậm xuất phát, dừng không đúng vùng, tụt dốc/chậm khởi hành, lên lề, va vật cản, tắt máy, vòng tua/tốc độ cao; cảnh báo chạm vạch và ngược hướng. Tình huống nguy hiểm tùy chọn.
- Camera cabin/sau xe/trên cao, HUD, giọng Việt qua Speech Synthesis nếu máy có giọng phù hợp, chế độ toàn màn hình.
- Lưu 5 phiên gần nhất trong trình duyệt; tải/mở JSON; phát lại có thanh thời gian, điểm và lỗi theo mốc thời gian. Bản ghi chứa bản sao sân và bộ quy tắc, không tính lại điểm khi phát.
- Nhập sơ đồ JSON hành lang thẳng theo schema sân mẫu, có kiểm tra dữ liệu. Chưa nhập CAD, ảnh, nhiều nhánh hoặc sân 3D bất kỳ.

## Chấm điểm và giới hạn

Bộ quy tắc nằm tại public/simulation3d/rules-2026-10.json, có phiên bản, trạng thái, nguồn điều khoản và thời hạn. Cấu hình riêng của từng hạng nằm trong profiles (tốc độ, thứ tự, số bài đầy đủ, loại ghép xe, thời gian đầy đủ); chỉ mvpSequence ba bài được thực thi.

Thông số tham chiếu được đối chiếu Phụ lục IV mục C Thông tư 12/2025/TT-BCA và điều khoản chuyển tiếp tại Điều 41 Thông tư 108/2026/TT-BCA. Tài liệu gốc được liên kết trong giao diện và JSON. Quá ngày áp dụng cuối, thi mô phỏng và khấu trừ tự khóa đến khi có bộ quy tắc mới đã kiểm chứng. Các cảm biến chưa xác minh chỉ cảnh báo, không suy đoán mức phạt.

Mô hình vật lý là xe đạp động học có lực dọc, trọng lực trên dốc, lực cản, giới hạn bám lốp và hỗ trợ côn; không phải mô phỏng động lực học xe đầy đủ. Kích thước xe/sân minh họa, chưa hiệu chuẩn với xe thật. Chưa có hệ treo, lật xe, biến dạng va chạm, côn/số sàn hoàn chỉnh hoặc bằng chứng chống gian lận. Điểm được tính phía client và có thể chỉnh sửa, chỉ dùng luyện tập. Kết quả Đạt/Chưa đạt chỉ cho phạm vi MVP, không xác nhận đủ toàn bộ kỳ thi.

## Cấu trúc mã nguồn

- src/features/simulation3d/physics: vật lý và cảm biến hình học.
- src/features/simulation3d/render: cảnh, xe và camera Three.js.
- src/features/simulation3d/lessons: mỗi bài là một module.
- src/features/simulation3d/rules: kiểm tra cấu hình, sự kiện lỗi, chấm điểm.
- src/features/simulation3d/runtime: vòng lặp cố định, input và phát lại.
- src/features/simulation3d/persistence: lịch sử IndexedDB, kiểm tra/tải bản ghi.
- src/features/simulation3d/ui: giao diện tiếng Việt, HUD và tùy chỉnh phím.
- src/features/simulation3d/tests: các kiểm thử vật lý, bài thi, chấm điểm, cấu hình và phát lại.

Thêm bài mới: khai báo LessonId, tạo mô-đun evaluate/spawnFront, bổ sung registry, sơ đồ/hình học/cảm biến và mvpSequence với phiên bản cấu hình mới. Để dùng kết quả đào tạo trên máy chủ cần backend riêng, sở hữu tài nguyên theo tài khoản, audit và kiểm chứng lại dữ liệu; bản demo này không cung cấp phần đó.
