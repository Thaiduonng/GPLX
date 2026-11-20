# Thiết kế: Mô phỏng sa hình 2D/3D để luyện thi (hạng A1, A, B) & Chuẩn hóa danh mục biển báo

- **Ngày:** 2026-11-20
- **Trạng thái:** Chờ người dùng duyệt (đã qua rà soát)
- **Module backend:** `learning` (luyện tập, không phải sát hạch chính thức)
- **Nguồn pháp lý đầu vào:** QCVN 15:2026/BCA (ban hành kèm Thông tư 107/2026/TT-BCA ngày 29/6/2026) và Phụ lục; file "tổng hợp tất cả biển báo giao thông" (.doc, nội dung QCVN 41 bản 2016/2019) do người dùng cung cấp.

## 1. Mục đích

Học viên **tự lái thử trên sân sa hình ảo để luyện thi**: quen trình tự các bài, quen các lỗi bị trừ điểm, tự đánh giá trước khi thi thật. Đây là công cụ luyện tập, kết quả **không** có giá trị pháp lý và không thay thế điểm sát hạch chính thức (`exam_results`).

Song song, hệ thống cần **một danh mục biển báo chuẩn duy nhất** để cả sân sa hình và ngân hàng câu hỏi lý thuyết (chương `CH6_SIGNS`) dùng chung, thay cho việc hiện nay câu hỏi ghi nguồn "QCVN 41:2019" rời rạc, không có ảnh.

## 2. Mục tiêu / Không làm / Thất bại nếu

**Mục tiêu**
- Sân sa hình hạng **A1, A** (mô tô) và **B** (ô tô) dựng đúng kích thước theo QCVN 15:2026 mục 2.1.13 và 2.1.15, tự tính theo thông số xe.
- Hai chế độ hiển thị **2D (nhìn từ trên)** và **3D (góc lái / sau xe)** dùng chung một lõi mô phỏng và chấm lỗi → kết quả hai chế độ giống hệt nhau.
- Chấm lỗi theo thời gian thực, hiển thị điểm còn lại, thông báo lỗi bằng tiếng Việt (bám tinh thần mục 2.3.2.1.6–2.3.2.1.7, 2.3.2.2.6).
- Lưu lịch sử lần lái thử, xem lại (replay) lần lái và danh sách lỗi.
- Danh mục biển báo chuẩn: mã, tên, nhóm, ý nghĩa, phiên bản quy chuẩn, trạng thái xác minh, ánh xạ mã cũ → mới, hình (SVG ưu tiên).
- Chạy được trên máy tính (bàn phím) và điện thoại/máy tính bảng (điều khiển cảm ứng) — Web responsive theo Rule 00.

**Không làm (lần này)**
- Hạng B1, C1, C, D1, D2, D, BE…DE (lõi đã tham số hóa theo xe để thêm sau).
- Sát hạch trên đường, mô phỏng tình huống giao thông (phần thi mô phỏng 120 tình huống).
- Kết nối API giám sát của Cục CSGT (Phụ lục QCVN 15) — đó là việc của trung tâm sát hạch thật.
- Hỗ trợ vô-lăng/bàn đạp USB (có thể thêm sau qua Gamepad API).
- Vật lý thực (lốp trượt, va chạm vật thể) — chỉ mô hình động học tốc độ thấp.

**Thất bại nếu (dù chạy được)**
- Kích thước sân sai so với QCVN hoặc chấm lỗi 2D và 3D cho kết quả khác nhau.
- Bảng điểm trừ hoặc trình tự bài bị **hard-code như luật** khi chưa có văn bản xác minh (vi phạm Rule 08 / AGENTS.md mục 3.6).
- Học viên hiểu nhầm điểm luyện tập là điểm thi chính thức.
- Biển báo trên sân vẽ sai hình dạng/màu, hoặc danh mục biển trộn lẫn mã cũ và mới mà không ghi rõ phiên bản.
- 3D giật đến mức không lái được trên laptop phổ thông (mục tiêu ≥ 30 fps ở laptop có GPU tích hợp).

## 3. Ràng buộc

- Stack giữ nguyên: Java 21 / Spring Boot 4.1.1 / MySQL 8.4 / Flyway; React 19 + TS strict + Vite; CSS Modules (Rule 01, 09).
- Thư viện mới phía frontend (cần ghi vào `.rules/01` và commit `package-lock.json`): `three`, `@react-three/fiber`, `@react-three/drei`. Không thêm thư viện vật lý.
- Rule 09: không file nghìn dòng; mỗi view có đủ 4 trạng thái loading/empty/error/success; tiếng Việt toàn bộ.
- Rule 08: mọi con số luật được gắn một trong `VERIFIED` / `NEEDS_VERIFICATION` / `INTERNAL_RULE`.
- Migration mới bắt đầu từ `V13__`.

## 4. Các cách đã cân nhắc

| Cách | Mô tả | Đánh đổi | Quyết định |
|---|---|---|---|
| **1. Lõi TS + 2 renderer** | Lõi mô phỏng thuần TypeScript (sinh sân, động học xe, chấm lỗi) không phụ thuộc UI; 2D Canvas, 3D three.js/react-three-fiber; backend lưu cấu hình và kết quả | Nằm gọn trong stack, chấm điểm thống nhất, unit test được; 3D chỉ ở mức "đẹp vừa" | **Được chọn** |
| 2. Unity WebGL nhúng | Toàn bộ mô phỏng bằng Unity | Đồ họa thật hơn nhưng thêm toolchain, build nặng hàng chục MB, 2D phải làm riêng, khó test, lệch Rule 01 | Loại |
| 3. Mô phỏng phía server | Client chỉ gửi thao tác | Chống gian lận nhưng có độ trễ khi lái, phức tạp; không cần cho luyện tập | Loại |

Người dùng chọn **Cách 1** và phạm vi **cả hạng B và A1/A**.

## 5. Kiến trúc

```
frontend/src/features/yard-sim/
├── core/                 # THUẦN TS, không import React/three → unit test bằng Vitest
│   ├── geometry/         # vector, polyline, polygon, cung tròn, kiểm tra điểm/vạch
│   ├── vehicles/         # VehicleSpec (a, b, B1, wheelbase, Rqv…) + mô hình động học
│   ├── course/           # sinh hình từng bài từ VehicleSpec + ghép thành sân
│   ├── exercises/        # mỗi bài = 1 state machine chấm lỗi
│   ├── scoring/          # bảng lỗi (nạp từ API), sổ điểm, kết luận đạt/trượt
│   ├── simulation.ts     # vòng lặp bước cố định 60 Hz: input → xe → bài → sự kiện
│   └── replay.ts         # ghi/đọc chuỗi input theo tick
├── input/                # bàn phím, cảm ứng → ControlInput chuẩn
├── render2d/             # Canvas 2D
├── render3d/             # react-three-fiber scene
├── signs/                # component SVG biển báo dùng trên sân
├── components/           # HUD, bảng lỗi, chọn hạng, kết quả
└── pages/                # YardSimPage, YardSimHistoryPage, YardSimReplayPage
```

**Nguyên tắc then chốt:** renderer chỉ *đọc* trạng thái mô phỏng; mọi quyết định chấm lỗi nằm trong `core`. Vòng lặp mô phỏng chạy bước cố định (fixed timestep 1/60 s) tách khỏi tốc độ khung hình → replay tái tạo chính xác, 2D và 3D cho cùng kết quả.

### 5.1 Thông số xe (VehicleSpec)

Lưu ở backend (bảng `sim_vehicle_specs`), có giá trị mặc định theo ngưỡng tối thiểu QCVN 15 mục 2.2 (`VERIFIED` từ nguồn người dùng cung cấp):

| Hạng | Loại | Thông số mặc định |
|---|---|---|
| A1 | Mô tô 2 bánh 70–125 cm³ | dài ~1,9 m, rộng ~0,7 m (xe phổ biến, `INTERNAL_RULE`) |
| A | Mô tô 2 bánh > 200 cm³ | dài ~2,1 m, rộng ~0,8 m (`INTERNAL_RULE`) |
| B | Ô tô con | a ≥ 4,2 m; b ≥ 1,6 m; chiều dài cơ sở ≥ 2,4 m; Rqv ≥ 4,9 m (QCVN 2.2.5). Mặc định dùng đúng giá trị tối thiểu; B1 (vệt bánh sau) mặc định 1,4 m (`INTERNAL_RULE`) |

### 5.2 Hình các bài thi (sinh tự động)

**Hạng A1, A — mục 2.1.13 (số liệu `VERIFIED` theo bảng QCVN):**

| Bài | Thông số A1 / A |
|---|---|
| Hình số 8 | R1 3,0/3,4; R0 2,3/2,5; OO' 5,7/6,3; OO" 5,3/5,9 |
| Vạch đường thẳng | Lt 18/27 m; Bt 0,6 m |
| Đường có vạch cản | dài 18/27 m; cách 4,5 m; rộng làn 3,0 m; vạch 1,5 × 0,1 m |
| Đường gồ ghề | dài 15 m; dải 0,9 m; đế 0,2, đỉnh 0,1, cao 0,05 m; cách 1,5/1,7 m |
| Xử lý tình huống giả định (2.1.13.5) | Thành phần có trong văn bản: vạch xuất phát/kết thúc/dừng 0,2 m; vạch người đi bộ 0,5×0,2 m cách 0,4 m; đèn chỉ hướng LED; đèn xanh-đỏ; đèn phản xạ; chướng ngại vật 1×1×0,9 m; ray + tà vẹt. **Bố trí hình học chỉ có trong Hình 5 (bản vẽ) → `NEEDS_VERIFICATION`**, dựng theo bản vẽ, ghi chú rõ |

**Hạng B — mục 2.1.15 (công thức `VERIFIED`):**

| Bài | Công thức |
|---|---|
| Xuất phát / Kết thúc | Vạch dừng xe + chữ "XUẤT PHÁT"/"KẾT THÚC" |
| Dừng nhường người đi bộ | Vạch dừng, vạch đi bộ, biển "Dừng lại", "Đường người đi bộ cắt ngang" |
| Dừng & khởi hành trên dốc | Dốc 15 m, 10 %; vạch dừng cách chân dốc ≥ 6 m; biển "Dừng lại", "Dốc lên/xuống nguy hiểm" |
| Vệt bánh xe + vuông góc | Bvb = B1 + 0,2; Lvb = a; Sv = 1,5a; Lv = 2,0a; Bv = 2,2b |
| Qua ngã tư | Đèn tín hiệu, vạch dừng, vạch đi bộ; biển "Hướng đi phải theo", "Đường giao nhau", "Giao nhau có tín hiệu đèn" |
| Đường vòng quanh co (chữ S) | Bqc = 2,2b; Rn = Rqv + 1,2; Rtr = Rn − Bqc; Sqc = Rn + Rtr |
| Ghép xe dọc (B) | Ld = a + 1,0; Rd = b + 0,6; Ed = 1,2a; biển "Nơi đỗ xe" |
| Ghép xe ngang (B) | Lg = 3a/2; Rg = 5b/4; biển "Nơi đỗ xe" |
| Đường sắt | 2 ray; vạch dừng cách ray ngoài ≥ 5,0 m; biển "Giao nhau với đường sắt không có rào chắn", "Nơi đường sắt giao vuông góc với đường bộ", "Dừng lại" |
| Thay đổi số trên đường bằng (xe số sàn) | Đoạn thẳng ≥ 100 m; biển phụ 1 cách đầu ≥ 20 m; biển 2 cách 25 m; biển kết thúc cách 25 m |
| Tình huống nguy hiểm | Kích hoạt ngẫu nhiên tại các vị trí trên sân (trung tâm loại 1: 5 vị trí, loại 2: 3 vị trí); yêu cầu phanh dừng, bật rồi tắt đèn khẩn cấp trước khi đi tiếp trong thời gian quy định |

Chung: làn ≥ 3,5 m; vạch giới hạn trắng 0,1 m; cọc chuẩn sọc đỏ-trắng 0,15 m, cao 1,6 m (dùng cho 3D).

**Bố trí tổng thể sân & trình tự bài:** QCVN 15 không quy định thứ tự bài. Sân được mô tả bằng **bố cục dữ liệu** (danh sách bài theo thứ tự + đoạn nối) lưu ở backend, mặc định theo trình tự thực tế phổ biến của sân hạng B, gắn `NEEDS_VERIFICATION`. Ràng buộc 2.1.3 (chỉ đi tiến theo làn thuận chiều, không cắt ngang trừ ngã tư có đèn, không lặp quãng đường) được kiểm tra khi sinh sân.

### 5.3 Mô hình chuyển động

- **Ô tô:** mô hình xe đạp động học (kinematic bicycle) với chiều dài cơ sở và góc lái tối đa suy ra từ Rqv; tốc độ ≤ ~30 km/h. Có số: P/R/N/D (tự động) hoặc 1–5 + côn đơn giản hóa (số sàn, phục vụ bài thay đổi số); phanh tay (bài dốc); chết máy khi nhả côn sai trên số sàn; trôi dốc theo trọng lực đơn giản hóa khi trên dốc.
- **Mô tô:** mô hình xe đạp động học với góc lái giới hạn; có trạng thái **chống chân** (tốc độ ≈ 0 hoặc người dùng nhấn phím chống chân) — chống chân trong hình bị chấm lỗi; không mô phỏng cân bằng/ngã thật, coi "đổ xe" khi tốc độ quá thấp trong lúc đánh lái gắt (`INTERNAL_RULE`).
- **Đè vạch:** kiểm tra giao giữa đa giác vệt bánh xe (4 bánh ô tô / 2 bánh mô tô) và đa giác vạch giới hạn mỗi tick.

### 5.4 Chấm lỗi

- Mỗi bài là một **state machine** (ví dụ dốc: `CHUA_VAO → DANG_LEN → DA_DUNG → DA_QUA`), phát sự kiện lỗi có mã.
- **Bảng lỗi** (mã, tên tiếng Việt, điểm trừ, có truất quyền không, áp dụng cho hạng/bài nào, trạng thái pháp lý) lưu ở backend bảng `sim_fault_rules`, nạp khi bắt đầu lượt lái. **Điểm trừ cụ thể chưa có văn bản xác minh → toàn bộ `NEEDS_VERIFICATION`**, quản trị viên chỉnh được, giao diện luôn hiện nhãn "Mô phỏng luyện tập — điểm trừ tham khảo".
- Mặc định tổng điểm 100, đạt ≥ 80 (khớp `ExaminationServiceImpl` hiện tại, `INTERNAL_RULE`).
- Loại lỗi tối thiểu: đè vạch giới hạn; không dừng đúng vạch / dừng quá xa; quá thời gian bài; sai trình tự bài; chết máy; trôi dốc; vượt đèn đỏ; không bật/tắt đèn khẩn cấp đúng lúc ở tình huống nguy hiểm; không đạt số/tốc độ yêu cầu; chống chân / 2 bánh ra ngoài hình (mô tô); không hoàn thành bài; đi ra ngoài sân (truất quyền).

### 5.5 Hiển thị & điều khiển

- **2D:** Canvas 2D, camera bám xe có thể chuyển sang toàn sân, vẽ vạch đúng tỷ lệ, biển báo dạng SVG nhỏ, vệt bánh xe để học viên tự soi lỗi.
- **3D:** react-three-fiber; biển báo là mặt phẳng dán texture SVG; đèn tín hiệu có trạng thái.
  - **Phong cách đồ họa (người dùng chọn theo ảnh tham khảo một sản phẩm ôn sa hình 3D hiện có):** low-poly sáng sủa, nhiều màu; camera mặc định **bám sau xe** (chase cam), có góc trong xe và từ trên; nền cỏ xanh, mặt đường nhựa xám đậm, **bó vỉa sơn sọc đỏ–trắng**, vạch trắng và chữ sơn trên mặt đường ("XUẤT PHÁT", mũi tên chỉ hướng); cột đèn tín hiệu, cột đèn chiếu sáng, cây low-poly (thông, cây tán tròn, dừa), tường rào bao quanh sân, bầu trời chuyển màu; đổ bóng mềm từ một nguồn sáng mặt trời.
  - **Mô hình xe:** ô tô con (SUV/sedan) và mô tô dạng glTF low-poly **giấy phép CC0** (vd bộ Kenney Car Kit hoặc tương đương), có đèn hậu/xi nhan nhấp nháy theo trạng thái; cây, cột đèn cũng dùng asset CC0 hoặc dựng bằng primitive. **Không** sao chép logo, chữ thương hiệu, mô hình hay hình ảnh của sản phẩm tham khảo; chữ trên sân/xe chỉ dùng tên hệ thống GPLX của dự án.
  - Chất lượng đồ họa có mức Thấp/Cao trong "Cài đặt" (tắt bóng, giảm cây) để giữ ≥ 30 fps trên máy yếu.
- **HUD chung (theo bố cục ảnh tham khảo, phủ lên khung 3D/2D):**
  - Góc trên trái: nhãn chế độ + đồng hồ thời gian; cụm tốc độ (km/h), vòng tua (RPM), trạng thái động cơ; nút "Thoát".
  - Góc trên phải: nút "Cài đặt & góc nhìn" (góc camera, chất lượng đồ họa, âm thanh, bảng phím tắt).
  - Dưới giữa: cụm điều khiển — nút xi nhan trái/phải và đèn khẩn cấp, **vô-lăng ảo** (kéo để đánh lái, hiện góc lái), cần số (P/R/N/D hoặc 1–5); bàn đạp **PHANH** (Space) và **GA** dạng thanh trượt; nút đổi camera.
  - Thêm cho chế độ chấm điểm: bài đang làm, điểm còn lại, thông báo lỗi bật lên kèm âm thanh.
- **Điều khiển:** bàn phím (mũi tên/WASD, Space phanh, Q/E xi nhan, H đèn khẩn cấp, phanh tay, sang số, C đổi camera); chuột/cảm ứng dùng chính các nút HUD trên.
- **Chế độ lái:** "Lái tự do" (đi quanh sân không chấm điểm, có đồng hồ), "Luyện từng bài" (chọn một bài, có gợi ý đường đi) và "Thi thử cả sân" (đủ trình tự, không gợi ý, cuối có kết luận đạt/trượt).

### 5.6 Backend (module `learning`)

Bảng mới (Flyway `V13__create_yard_simulation_tables.sql`, `V14__create_traffic_sign_catalog.sql`, `V15__seed_…`):

- `sim_vehicle_specs` — thông số xe theo hạng, kèm `legal_status`, `legal_reference`.
- `sim_course_layouts` — bố cục sân theo hạng (JSON danh sách bài + đoạn nối), `version`, `is_active`, `legal_status`.
- `sim_fault_rules` — bảng lỗi (5.4).
- `sim_attempts` — lượt lái: user, hạng, chế độ, layout version, fault-rule version, điểm, đạt/trượt, thời lượng, `replay_blob` (input nén, giới hạn kích thước), audit fields.
- `sim_attempt_faults` — lỗi từng lượt (mã, bài, thời điểm tick, điểm trừ).
- `traffic_signs` — xem mục 6.

API (`/api/v1/learning/yard-sim/...`, theo Rule 05): lấy cấu hình theo hạng; nộp lượt lái (server **chấm lại** bằng cách kiểm tra tính hợp lệ cơ bản: tổng điểm = 100 − Σ điểm trừ theo bảng lỗi của đúng phiên bản, không tin điểm client gửi); lịch sử phân trang; chi tiết + replay; quản trị CRUD bảng lỗi/bố cục/xe (ROLE_ADMIN, ROLE_MANAGER). Học viên chỉ xem lượt của mình (kiểm tra sở hữu, Rule 06).

## 6. Danh mục biển báo chuẩn

**Nguồn:** file .doc người dùng cung cấp là QCVN 41 bản 2016/2019 (Phụ lục B–F, ~330 mã: P 68, W 83, R 63, I 93, S 21, DP 4; 202 hình raster). Quy chuẩn hiện hành là **QCVN 41:2024/BGTVT** (hiệu lực 01/01/2025). Chuẩn hóa theo 41:2024; dữ liệu file .doc là đầu vào, mỗi biển gắn phiên bản nguồn.

Bảng `traffic_signs`:
- `code` (vd `P.102`), `name`, `group` (CAM, NGUY_HIEM, HIEU_LENH, CHI_DAN, PHU, VACH_KE…), `meaning` (tóm tắt ý nghĩa/sử dụng), `shape`, `standard_version` (`QCVN41:2019`, `QCVN41:2024`), `legal_status`, `replaced_by_code` / `legacy_code`, `svg_asset` (đường dẫn SVG nếu đã vẽ), `raster_asset` (ảnh trích từ .doc nếu chưa có SVG), audit fields.
- Ràng buộc: `UNIQUE(code, standard_version)`.

**Hình biển:**
- Các biển dùng trên sân (khoảng 15: Dừng lại, Đường người đi bộ cắt ngang, Dốc lên/xuống nguy hiểm, Hướng đi phải theo, Đường giao nhau, Giao nhau có tín hiệu đèn, Nơi đỗ xe, Giao nhau với đường sắt không rào chắn, Nơi đường sắt giao vuông góc, các biển phụ tăng/giảm số…) → **vẽ SVG** đúng hình dạng, màu, viền theo quy chuẩn.
- Biển còn lại → trích ảnh từ .doc làm ảnh tạm, thay dần bằng SVG.
- Ngân hàng câu hỏi: thêm cột liên kết `traffic_sign_code` (nullable) cho câu hỏi chương biển báo; cập nhật `legal_reference` từ "QCVN 41:2019" sang phiên bản đã xác minh khi có đối chiếu.

**Giao diện:** trang tra cứu biển báo cho học viên (tìm theo mã/tên, lọc theo nhóm, xem ý nghĩa, nhãn phiên bản); trang quản trị danh mục.

**Đối chiếu 2019 → 2024:** cần văn bản QCVN 41:2024 để đối chiếu từng mã. Đến khi có, biển nhập từ .doc giữ `standard_version = QCVN41:2019`, `legal_status = NEEDS_VERIFICATION`.

## 7. Thứ tự triển khai (mỗi giai đoạn demo được)

1. **Danh mục biển báo:** migration + seed từ .doc + SVG các biển trên sân + trang tra cứu.
2. **Lõi mô phỏng + 2D, hạng A1/A:** sinh sân 4 bài trong hình, động học mô tô, chấm lỗi, HUD.
3. **Hạng B trong 2D:** 11 bài + tình huống nguy hiểm, động học ô tô, số/côn/phanh tay.
4. **Bài xử lý tình huống giả định A1/A** (phụ thuộc bản vẽ Hình 5).
5. **3D** cho cả A1/A và B.
6. **Lưu lượt lái, lịch sử, replay**, trang quản trị bảng lỗi/bố cục.
7. Cập nhật tài liệu: `docs/backlog/tasks.md`, `CHANGELOG.md`, `docs/legal/legal-source-catalog.md` (thêm QCVN 15:2026), `.rules/07` (mã quy tắc mới `LRN-SIM-*`), `.rules/01` (thư viện mới).

## 8. Kiểm thử

- Unit test lõi (Vitest — **thêm mới**, frontend hiện chưa có test runner): công thức hình từng bài so với bảng QCVN; đè vạch; state machine từng bài với chuỗi input dựng sẵn; replay cho cùng kết quả.
- Backend: unit test dịch vụ chấm lại lượt lái; integration test API + quyền sở hữu (Rule 10).
- Kiểm tra thủ công: lái hết sân A1, A, B ở 2D và 3D, desktop và mobile; đo fps.

## 9. Quyết định bổ sung sau rà soát (đánh dấu là quyết định của Claude, người dùng có thể sửa)

- **Tài liệu nguồn vào repo:** sao chép QCVN 15:2026 + Phụ lục (PDF) và file biển báo (.doc) vào `docs/legal/sources/`, ghi vào `docs/legal/legal-source-catalog.md`. Trích bản vẽ Hình 1–20 từ PDF thành ảnh trong cùng thư mục để đối chiếu khi dựng hình (đặc biệt Hình 5 cho bài tình huống giả định A1/A). Trích 202 ảnh biển từ .doc làm `raster_asset`.
- **Server chỉ kiểm tra số học**, không chạy lại replay: điểm = 100 − Σ điểm trừ theo đúng phiên bản bảng lỗi; mã lỗi tồn tại và áp dụng cho hạng; thời lượng hợp lý. Không dùng GraalJS/Node sidecar. Lý do: đây là luyện tập, đã loại cách chống gian lận phía server.
- **Hạng A1 và A dùng cùng bộ bài:** 4 bài trong hình (số 8, vạch thẳng, vạch cản, gồ ghề) + bài tình huống giả định 2.1.13.5, chỉ khác kích thước theo bảng QCVN.
- **Biển trên sân tham chiếu theo tên trong QCVN 15** (vd "Dừng lại", "Nơi đỗ xe"), ánh xạ sang mã trong danh mục; tạm dùng mã/hình theo bản 2019 từ file .doc, gắn `NEEDS_VERIFICATION` cho đến khi có văn bản QCVN 41:2024 để đối chiếu. Đổi phiên bản chỉ cần cập nhật ánh xạ, không sửa code sân.

- **Bảng lỗi seed (người dùng đồng ý dùng mức phổ biến tại sân thật, toàn bộ `NEEDS_VERIFICATION`, quản trị viên sửa được):**

  | Hạng | Lỗi | Xử lý mặc định |
  |---|---|---|
  | B | Đè vạch giới hạn hình / vạch vuông góc | −5 mỗi lần |
  | B | Chết máy | −5 mỗi lần |
  | B | Vòng tua > 4.000 RPM | −5 mỗi lần |
  | B | Không bật xi nhan trái khi xuất phát / không bật xi nhan khi rẽ ở ngã tư | −5 |
  | B | Dừng chưa đến vạch hoặc cách vạch quá 0,5 m; dừng quá vạch | −5 |
  | B | Quá thời gian quy định của một bài (dốc 30 s khởi hành, ghép xe 2 phút…) | −5 |
  | B | Dốc: không dừng; xe trôi lùi quá 0,5 m; quá 30 s chưa khởi hành được | Truất quyền |
  | B | Vệt bánh xe: bánh xe không qua vệt | Truất quyền |
  | B | Ngã tư: vượt đèn đỏ | −10 |
  | B | Ghép xe: không vào được nơi ghép trong thời gian | Truất quyền |
  | B | Tăng/giảm số: không đạt số hoặc tốc độ yêu cầu | −5 |
  | B | Tình huống nguy hiểm: không bật đèn khẩn cấp hoặc không dừng trong 3 s; không tắt đèn khẩn cấp trước khi đi tiếp | −10 |
  | B | Đi sai trình tự bài, bỏ bài, xe ra khỏi sân | Truất quyền |
  | B | Tổng thời gian vượt quy định | −1 mỗi khoảng 3 s vượt (`NEEDS_VERIFICATION`) |
  | A1/A | Đi không đúng trình tự bài | −5 |
  | A1/A | Bánh xe đè vạch giới hạn | −5 mỗi lần |
  | A1/A | Chống chân | −5 mỗi lần |
  | A1/A | Chết máy | −5 mỗi lần |
  | A1/A | Hai bánh xe ra ngoài hình; đổ xe; không hoàn thành bài | Truất quyền |
  | A1/A | Quá thời gian thi | −5 mỗi khoảng vượt |

  Thang 100 điểm, đạt ≥ 80, truất quyền = trượt ngay (`INTERNAL_RULE`, khớp code hiện tại).
- **Bố cục sân (người dùng đồng ý để Claude tự thiết kế):** một sân gọn đáp ứng 2.1.3. Thứ tự hạng B: xuất phát → dừng nhường người đi bộ → dừng và khởi hành trên dốc → vệt bánh xe và đường vuông góc → qua ngã tư có đèn → đường vòng quanh co → ghép xe dọc → ghép xe ngang → tạm dừng ở chỗ có đường sắt → thay đổi số trên đường bằng → kết thúc; tình huống nguy hiểm xuất hiện ngẫu nhiên ở 3 vị trí. Hạng A1/A: số 8 → vạch thẳng → vạch cản → gồ ghề, bài tình huống giả định là một bài riêng. Toàn bộ thứ tự/bố cục gắn `NEEDS_VERIFICATION`.

## 10. Phần để người triển khai tự quyết

- Chi tiết phím tắt, giao diện HUD, phong cách đồ họa 3D (trong giới hạn low-poly tự dựng).
- Tham số động học cụ thể (gia tốc, tốc độ đánh lái) miễn là cảm giác lái hợp lý ở tốc độ thấp.
- Định dạng nén replay và giới hạn kích thước.
- Cách tách component để không file nào vượt ~400 dòng.
