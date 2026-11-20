# Giai đoạn 2 — Lõi mô phỏng sa hình + 2D hạng A1/A: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Học viên vào `/yard-sim`, chọn hạng A1 hoặc A và chế độ (Lái tự do / Luyện từng bài / Thi thử cả sân), tự lái mô tô trên sân 2D dựng đúng kích thước QCVN 15:2026 mục 2.1.13 (4 bài trong hình), được chấm lỗi theo thời gian thực và xem kết quả đạt/trượt.

**Architecture:** Lõi TypeScript thuần trong `frontend/src/features/yard-sim/core/` (hình học, sinh sân, động học mô tô, trọng tài từng bài, sổ điểm, vòng lặp bước cố định 60 Hz, replay) — không import React/Canvas, test bằng Vitest. Lớp hiển thị Canvas 2D + HUD React chỉ *đọc* trạng thái lõi. Backend module `learning` cung cấp cấu hình chỉ đọc (thông số xe + bảng lỗi) qua một endpoint; lưu lượt lái để dành giai đoạn 6. Sân A1/A sinh hoàn toàn bằng code từ bảng QCVN (không cần thứ tự cấu hình được), nên bảng `sim_course_layouts` của spec mục 5.6 để giai đoạn 3 (hạng B) mới tạo.

**Tech Stack:** React 19 + TS strict + CSS Modules + Canvas 2D API; Vitest + Testing Library; Spring Boot 4.1.1 / JPA / Flyway (MySQL 8.4), H2 cho test. **Không thêm thư viện mới.**

**Spec:** `docs/superpowers/specs/2026-11-20-sa-hinh-simulator-and-sign-catalog-design.md` (mục 5, 5.1–5.5, 9). Giai đoạn 1 đã có: `frontend/src/features/traffic-signs/svg/yardSigns.tsx` (chưa dùng ở GĐ2 — hạng A1/A trong hình không có biển).

## Global Constraints

- Stack giữ nguyên; strict TS, không `any`; CSS Modules; mọi chữ hiển thị tiếng Việt; không file nguồn nào > ~400 dòng (Rule 09).
- Đơn vị lõi: mét, giây, radian. Hệ trục: x hướng đông, y hướng bắc, `heading` đo từ +x ngược chiều kim đồng hồ. Canvas lật trục y khi vẽ.
- Vòng lặp mô phỏng bước cố định `DT = 1/60` s; mỗi khung hình tối đa `MAX_STEPS_PER_FRAME = 5` bước (phần dư bỏ). Renderer không bao giờ thay đổi trạng thái lõi.
- Mỗi con số pháp lý trong lõi có trạng thái Rule 08 ghi ngay cạnh (`VERIFIED` = bảng QCVN 15:2026; `INTERNAL_RULE` = Claude tự đặt; `NEEDS_VERIFICATION` = bảng lỗi). Thang 100 điểm, đạt ≥ 80 và không bị truất quyền (`INTERNAL_RULE`, khớp `ExaminationServiceImpl`).
- Giao diện luôn hiện nhãn: **"Mô phỏng luyện tập — điểm trừ tham khảo, không thay thế sát hạch chính thức"**.
- Migration mới bắt đầu từ `V16__`. API dưới `/api/v1/learning/yard-sim`, bọc `ApiResponse`, yêu cầu đăng nhập.
- Môi trường: chạy npm qua Docker `node:20-alpine` (máy không có Node) và Maven 3.9.9 trong `~/.m2/wrapper/dists` (worktree thiếu `maven-wrapper.jar`) — như giai đoạn 1.
- Commit Conventional Commits, kết thúc `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Hình học sân A1/A (dùng nguyên văn trong code và test)

| Bài (`ExerciseKey`) | A1 | A | Trạng thái |
|---|---|---|---|
| `FIGURE_EIGHT`: R1 / R0 / OO' / OO" | 3.0 / 2.3 / 5.7 / 5.3 | 3.4 / 2.5 / 6.3 / 5.9 | `VERIFIED` (Bảng 1) |
| `STRAIGHT_LINE`: Lt / Bt | 18 / 0.6 | 27 / 0.6 | `VERIFIED` (Bảng 2) |
| `SLALOM`: dài / khoảng cách vạch cản / rộng làn / vạch cản dài×rộng | 18 / 4.5 / 3.0 / 1.5×0.1 | 27 / 4.5 / 3.0 / 1.5×0.1 | `VERIFIED` (Bảng 3) |
| `BUMPS`: dài / dải dài / đế / đỉnh / cao / bước | 15 / 0.9 / 0.2 / 0.1 / 0.05 / 1.5 | 15 / 0.9 / 0.2 / 0.1 / 0.05 / 1.7 | `VERIFIED` (Bảng 4) |
| Vạch giới hạn rộng 0.1 m | | | `VERIFIED` (2.1.9) |

Phần tự đặt (`INTERNAL_RULE`, ghi trong `core/course/aClassGeometry.ts`):
- Hình số 8: tâm O" (điểm uốn) nằm trên trung trực OO', cách O và O' đúng OO" (= R1 + R0 → tiếp xúc ngoài với vòng ngoài). Biên ngoài = cung R1 quanh O + cung lõm R0 quanh O"₍dưới₎ + cung R1 quanh O' + cung lõm R0 quanh O"₍trên₎. Đảo trong: hai đường tròn R0 tâm O, O'. Cổng vào ở điểm trái nhất của vòng O, cổng ra ở điểm phải nhất của vòng O', mỗi cổng rộng 1.0 m (hở vạch biên).
- Hình số 8 hoàn thành khi tổng góc quét quanh O và quanh O' đều ≥ 1.75π và ngược dấu nhau, rồi xe qua cổng ra.
- Vạch cản: vạch đặt tại 4.5, 9.0, … < L (A1: 3 vạch, A: 5 vạch), lần lượt mọc từ mép phải rồi mép trái làn, vuông góc trục làn.
- Gồ ghề: làn rộng 1.0 m có 2 vạch biên; dải đặt tại 0, bước, 2·bước… ≤ 15 m (A1: 11 dải, A: 9 dải); dải chỉ hiển thị, không ảnh hưởng động học.
- Thứ tự bài thi thử: `FIGURE_EIGHT → STRAIGHT_LINE → SLALOM → BUMPS`, nối bằng đường nối rộng 3.5 m (2.1.7) dài 6 m, xếp dọc trục x; vạch xuất phát trước bài đầu 6 m, vạch kết thúc sau bài cuối 6 m.
- Mô tô (bảng `sim_vehicle_specs`): A1 dài 1.9, rộng 0.7, chiều dài cơ sở 1.25, bán kính quay nhỏ nhất 1.9; A dài 2.1, rộng 0.8, cơ sở 1.40, bán kính 2.3 (m). Vận tốc tối đa 25 km/h. Bánh xe coi là điểm tiếp đất có bán kính lốp 0.05 m.

## Review Focus

1. **Khung hình chậm / tab bị ẩn** — người dùng chuyển tab rồi quay lại: không được "nhảy cóc" hàng trăm bước làm xe bay khỏi sân và ăn lỗi oan. → test `advance caps catch-up steps` (Task 6) và page tạm dừng khi `document.hidden` (Task 9).
2. **Đè vạch liên tục** — giữ bánh trên vạch chỉ bị trừ 1 lần, rời vạch rồi đè lại mới trừ tiếp. → test `line contact is edge-triggered` (Task 5).
3. **Phím mũi tên / Space cuộn trang hoặc bấm nút** và **phím bị "kẹt"** khi cửa sổ mất focus → ga mãi. → test `prevents page scroll for driving keys` và `releases all controls on window blur` (Task 7).
4. **Làm lại giữa chừng** còn sót lỗi/đồng hồ của lượt trước. → test `restart clears faults, score and timer` (Task 6).
5. **Không tải được cấu hình** (mất mạng) hoặc **thiết bị cảm ứng không có bàn phím**. → test `shows error with retry when config fails` và `shows touch controls on coarse pointer` (Task 9).

---

### Task 1: Backend — cấu hình mô phỏng chỉ đọc (thông số xe + bảng lỗi)

**Files:**
- Create: `backend/src/main/resources/db/migration/V16__create_yard_sim_config_tables.sql`
- Create: `backend/src/main/java/vn/edu/gplx/modules/learning/domain/SimVehicleSpec.java`, `SimFaultRule.java`, `SimFaultRepeatMode.java`
- Create: `.../learning/infrastructure/SimVehicleSpecRepository.java`, `SimFaultRuleRepository.java`
- Create: `.../learning/application/YardSimConfigService.java`, `.../application/impl/YardSimConfigServiceImpl.java`
- Create: `.../learning/api/YardSimController.java`, `.../api/dto/YardSimConfigResponse.java`
- Test: `backend/src/test/java/vn/edu/gplx/modules/learning/application/YardSimConfigServiceTest.java`, `.../learning/api/YardSimControllerTest.java`

**Interfaces:**
- Produces REST `GET /api/v1/learning/yard-sim/config/{licenseClass}` → `ApiResponse<YardSimConfigResponse>`; lớp không có cấu hình → 404 (`ResourceNotFoundException`); chưa đăng nhập → 401.
- ```java
  record YardSimConfigResponse(String licenseClass, VehicleSpecDto vehicle, String faultRuleVersion,
                               int maxScore, int passScore, List<FaultRuleDto> faultRules) {
    record VehicleSpecDto(double lengthM, double widthM, double wheelbaseM, double minTurningRadiusM,
                          double maxSpeedKmh, String legalStatus, String legalReference) {}
    record FaultRuleDto(String code, String exercise, String name, int penaltyPoints, boolean disqualifies,
                        String repeatMode, Integer intervalSeconds, Integer limitSeconds, String legalStatus) {}
  }
  enum SimFaultRepeatMode { PER_OCCURRENCE, PER_INTERVAL }
  ```
- `maxScore = 100`, `passScore = 80` là hằng trong service (`INTERNAL_RULE`).

- [ ] **Step 1: Migration V16.** Bảng `sim_vehicle_specs` (`id`, `license_class VARCHAR(10) UNIQUE`, `length_m`, `width_m`, `wheelbase_m`, `min_turning_radius_m`, `max_speed_kmh` DECIMAL(5,2), `legal_status`, `legal_reference VARCHAR(255)`, `created_at`, `updated_at`) và `sim_fault_rules` (`id`, `code VARCHAR(40)`, `license_class VARCHAR(10)`, `exercise VARCHAR(30)` — `'*'` = toàn sân, `name VARCHAR(255)`, `penalty_points INT`, `disqualifies TINYINT(1)`, `repeat_mode VARCHAR(20)`, `interval_seconds INT NULL`, `limit_seconds INT NULL`, `rule_version VARCHAR(30)`, `legal_status`, timestamps, `UNIQUE(code, license_class, rule_version)`, `CHECK` legal_status 3 giá trị như V13). Seed xe A1/A theo bảng "Hình học" (`INTERNAL_RULE`, `legal_reference` = `'QCVN 15:2026/BCA mục 2.2.2–2.2.3 (chỉ quy định dung tích); kích thước theo xe phổ biến'`). Seed `rule_version = 'SIM-A-2026.1'`, `NEEDS_VERIFICATION`, cho **mỗi** hạng A1 và A (16 dòng):

  | code | name | penalty | disqualifies | repeat_mode | interval / limit |
  |---|---|---|---|---|---|
  | `SAI_TRINH_TU` | Đi không đúng trình tự bài thi | 5 | 0 | PER_OCCURRENCE | |
  | `DE_VACH` | Bánh xe đè vạch giới hạn hình | 5 | 0 | PER_OCCURRENCE | |
  | `CHONG_CHAN` | Chống chân trong khi thực hiện bài | 5 | 0 | PER_OCCURRENCE | |
  | `CHET_MAY` | Chết máy | 5 | 0 | PER_OCCURRENCE | |
  | `RA_NGOAI_HINH` | Hai bánh xe ra ngoài hình thi | 0 | 1 | PER_OCCURRENCE | |
  | `DO_XE` | Đổ xe | 0 | 1 | PER_OCCURRENCE | |
  | `KHONG_HOAN_THANH` | Không hoàn thành bài thi | 0 | 1 | PER_OCCURRENCE | |
  | `QUA_THOI_GIAN` | Quá thời gian thi | 5 | 0 | PER_INTERVAL | 60 / 600 |

- [ ] **Step 2: Test service** (`@SpringBootTest @ActiveProfiles("test") @Transactional`, seed bằng repository vì test dùng H2 không chạy Flyway): `configForA1ReturnsVehicleAndRules` (xe A1 `wheelbaseM == 1.25`, 8 luật, `passScore == 80`, `faultRuleVersion == "SIM-A-2026.1"`); `onlyLatestRuleVersionIsReturned` (seed thêm 1 luật `rule_version = 'SIM-A-2025.0'` → không xuất hiện); `unknownClassThrowsNotFound` (`"Z"` → `ResourceNotFoundException`); `licenseClassIsCaseInsensitive` (`"a1"` hoạt động).
- [ ] **Step 3:** Run `cd backend && mvn -q -o test -Dtest=YardSimConfigServiceTest` → FAIL (chưa có class).
- [ ] **Step 4: Implement.** "Phiên bản mới nhất" = `max(rule_version)` theo thứ tự chuỗi của các luật thuộc hạng đó (`INTERNAL_RULE`, phiên bản dạng `SIM-<nhóm>-<năm>.<số>`). Luật sắp theo `code`.
- [ ] **Step 5:** Run → PASS.
- [ ] **Step 6: Test controller** (MockMvc, đăng ký token như `TrafficSignControllerTest`): không token → 401; học viên `GET /config/A1` → 200, `$.data.vehicle.minTurningRadiusM == 1.9`, `$.data.faultRules.length() == 8`; `GET /config/Z` → 404. Implement controller (`@Tag(name = "Yard Simulation", description = "Mô phỏng sa hình luyện thi")`). Run `mvn -q -o test -Dtest='YardSim*'` → PASS.
- [ ] **Step 7: Commit** `feat(learning): add read-only yard simulation config (vehicle specs and fault rules)`

### Task 2: Lõi — hình học cơ bản

**Files:**
- Create: `frontend/src/features/yard-sim/core/geometry/vec.ts`, `frontend/src/features/yard-sim/core/geometry/shapes.ts`
- Test: `frontend/src/features/yard-sim/core/geometry/geometry.test.ts`

**Interfaces (Produces):**
```ts
export interface Vec2 { x: number; y: number }
export const vec: { add, sub, scale, len, dist, rotate(v: Vec2, angle: number): Vec2, fromAngle(angle: number): Vec2 };
export type PathPrimitive =
  | { kind: 'segment'; a: Vec2; b: Vec2 }
  | { kind: 'arc'; center: Vec2; radius: number; start: number; end: number }; // quét từ start → end (radian, có dấu)
export interface StrokedPath { id: string; primitives: PathPrimitive[]; width: number } // vạch sơn
export function distanceToPrimitive(p: Vec2, prim: PathPrimitive): number;
export function distanceToPath(p: Vec2, path: StrokedPath): number;   // khoảng cách tới đường tâm vạch
export function touchesPath(p: Vec2, radius: number, path: StrokedPath): boolean; // dist <= width/2 + radius
export function pointInPolygon(p: Vec2, polygon: Vec2[]): boolean;
export function sampleArc(arc: Extract<PathPrimitive, { kind: 'arc' }>, maxStep: number): Vec2[];
export function signedAngleDelta(from: number, to: number): number; // kết quả trong (-π, π]
```

- [ ] **Step 1: Viết test:** `distanceToPrimitive segment` (điểm (1,1) tới đoạn (0,0)-(2,0) = 1; điểm (3,0) = 1 — ngoài đầu mút); `distanceToPrimitive arc only counts swept part` (cung tâm (0,0) r=2 quét 0→π/2: điểm (0,3) = 1, điểm (0,-3) = khoảng cách tới đầu mút gần nhất (2,0) = √13); `touchesPath respects stroke width and tire radius` (vạch rộng 0.1, lốp bán kính 0.05 → ngưỡng 0.10: điểm cách tâm vạch 0.09 → true, 0.11 → false); `pointInPolygon` (hình vuông); `signedAngleDelta wraps` (từ 3.1 tới −3.1 ≈ +0.083).
- [ ] **Step 2:** Run `npx vitest run src/features/yard-sim/core/geometry` → FAIL.
- [ ] **Step 3:** Implement. Khoảng cách tới cung: nếu góc của điểm nằm trong khoảng quét thì `|dist(p, center) − r|`, ngược lại khoảng cách tới đầu mút gần hơn.
- [ ] **Step 4:** Run → PASS. **Step 5: Commit** `feat(yard-sim): add core geometry primitives`

### Task 3: Lõi — động học mô tô

**Files:**
- Create: `frontend/src/features/yard-sim/core/vehicles/types.ts`, `frontend/src/features/yard-sim/core/vehicles/motorbike.ts`
- Test: `frontend/src/features/yard-sim/core/vehicles/motorbike.test.ts`

**Interfaces (Produces):**
```ts
export interface VehicleSpec { lengthM: number; widthM: number; wheelbaseM: number; minTurningRadiusM: number; maxSpeedKmh: number }
export interface ControlInput { throttle: number; brake: number; steer: number; footDown: boolean } // throttle/brake 0..1, steer −1 (trái)..1 (phải)
export const NEUTRAL_INPUT: ControlInput;
export interface MotorbikeState {
  position: Vec2;      // điểm giữa trục sau
  heading: number;
  speed: number;       // m/s, ≥ 0 (mô tô không lùi)
  steerAngle: number;  // rad, bánh trước
  footDown: boolean;
  fallen: boolean;
  lowSpeedSharpSteerTime: number;
}
export function createMotorbikeState(position: Vec2, heading: number): MotorbikeState;
export function maxSteerAngle(spec: VehicleSpec): number;            // atan(wheelbase / minTurningRadius)
export function wheelPoints(state: MotorbikeState, spec: VehicleSpec): { rear: Vec2; front: Vec2 };
export function stepMotorbike(state: MotorbikeState, input: ControlInput, spec: VehicleSpec, dt: number): MotorbikeState; // thuần, không đột biến
export const MOTORBIKE_TUNING: { accel: 2.0; brakeDecel: 6.0; drag: 0.6; steerRate: 2.5; fallSpeed: 0.5; fallSteer: 0.6; fallTime: 0.5; tireRadius: 0.05 }; // INTERNAL_RULE
```
Quy tắc: tốc độ tăng `accel·throttle`, giảm `brakeDecel·brake + drag`, kẹp `[0, maxSpeedKmh/3.6]`; khi `footDown` thì tốc độ không tăng (ga bị bỏ qua). Góc lái tiến dần tới `steer·maxSteerAngle` với tốc độ `steerRate` rad/s. Mô hình xe đạp động học: `heading += speed / wheelbase · tan(steerAngle) · dt` (dấu: steer dương = rẽ phải = heading giảm). **Đổ xe:** nếu `speed < fallSpeed` và `|steer| > fallSteer` và không `footDown` liên tục ≥ `fallTime` → `fallen = true`, `speed = 0`; xe đã đổ thì bỏ qua mọi input.

- [ ] **Step 1: Viết test:** `drives straight` (throttle 1 trong 2 s từ đứng yên, heading 0 → y không đổi, x ≈ ½·2.0·2² trừ drag, dung sai 0.2); `respects max speed` (throttle 1 trong 30 s → speed ≤ 25/3.6 + 1e-9); `full steer turns at min radius` (A1, giữ tốc độ 2 m/s, steer 1, chờ góc lái bão hòa rồi chạy thêm 1 vòng: tâm đường tròn quỹ đạo của bánh trước có bán kính 1.9 ± 0.05 m); `foot down blocks throttle`; `falls when sharp steering at walking speed without foot` (speed 0.3, steer 1, 0.6 s → fallen); `does not fall with foot down`; `wheel points are wheelbase apart`; `step is pure` (state đầu vào không đổi sau khi gọi).
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement. **Step 4:** Run → PASS. **Step 5: Commit** `feat(yard-sim): add motorbike kinematic model`

### Task 4: Lõi — sinh sân hạng A1/A

**Files:**
- Create: `frontend/src/features/yard-sim/core/course/types.ts`, `core/course/aClassGeometry.ts`, `core/course/figureEight.ts`, `core/course/laneExercises.ts`, `core/course/aClassCourse.ts`
- Test: `frontend/src/features/yard-sim/core/course/aClassCourse.test.ts`

**Interfaces (Produces):**
```ts
export type LicenseClassA = 'A1' | 'A';
export type ExerciseKey = 'FIGURE_EIGHT' | 'STRAIGHT_LINE' | 'SLALOM' | 'BUMPS';
export interface Gate { id: string; a: Vec2; b: Vec2 }                       // đoạn thẳng xe phải đi qua
export interface ExerciseLayout {
  key: ExerciseKey;
  name: string;                         // tiếng Việt: 'Hình số 8', 'Vạch đường thẳng', 'Đường có vạch cản', 'Đường gồ ghề'
  zone: Vec2[];                         // đa giác "trong hình" (để xét ra ngoài hình / vào nhầm bài)
  lines: StrokedPath[];                 // vạch giới hạn + vạch cản (đè = DE_VACH)
  entry: Gate; exit: Gate;
  decorations: { bumps?: Array<{ center: Vec2; length: number; width: number }> };
  hintPath: PathPrimitive[];            // đường gợi ý cho chế độ luyện từng bài
  figureEight?: { o: Vec2; oPrime: Vec2; r0: number; r1: number };
}
export interface CourseLayout {
  licenseClass: LicenseClassA;
  exercises: ExerciseLayout[];          // theo thứ tự thi
  roads: Vec2[][];                      // đa giác đường nối (chỉ để vẽ)
  start: { position: Vec2; heading: number; line: Gate };
  finish: Gate;
  bounds: { min: Vec2; max: Vec2 };     // tường sân: xe chạm thì dừng
}
export const A_CLASS_GEOMETRY: Record<LicenseClassA, { figureEight: {...}; straightLine: {...}; slalom: {...}; bumps: {...} }>; // số trong bảng "Hình học"
export function buildFigureEight(cls: LicenseClassA, origin: Vec2): ExerciseLayout;   // origin = điểm cổng vào
export function buildStraightLine(cls: LicenseClassA, origin: Vec2): ExerciseLayout;
export function buildSlalom(cls: LicenseClassA, origin: Vec2): ExerciseLayout;
export function buildBumps(cls: LicenseClassA, origin: Vec2): ExerciseLayout;
export function buildAClassCourse(cls: LicenseClassA, only?: ExerciseKey): CourseLayout; // only = luyện từng bài
```

- [ ] **Step 1: Viết test:** `geometry constants match QCVN tables` (so từng số A1/A với bảng "Hình học", ví dụ `A_CLASS_GEOMETRY.A.figureEight.oPrimeDistance === 6.3`); `figure eight inflection circles are tangent to outer circles` (với cả A1 và A: `dist(O, O") === R1 + R0` ± 1e-9 và O" nằm trên trung trực OO'); `figure eight outer boundary has gates` (biên ngoài không có điểm nào trong phạm vi 0.5 m quanh tâm cổng vào/ra; độ rộng cổng 1.0); `straight line lane is 0.6 wide and Lt long`; `slalom places 3 obstacles for A1 and 5 for A, alternating sides` (vạch thứ i có một đầu nằm trên mép phải nếu i chẵn, mép trái nếu i lẻ; mỗi vạch dài 1.5); `bumps count 11 for A1 and 9 for A`; `full course keeps exam order and connects exit to next entry` (thứ tự key; khoảng cách tâm cổng ra bài k tới tâm cổng vào bài k+1 = 6 m); `single exercise course` (`only: 'SLALOM'` → 1 bài, start trước cổng vào 6 m, finish sau cổng ra 6 m).
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement (hằng số + ghi chú trạng thái Rule 08 trong `aClassGeometry.ts`; hình số 8 dựng theo mô tả ở mục "Hình học", gợi ý đường đi = hai đường tròn bán kính (R0+R1)/2). **Step 4:** Run → PASS. **Step 5: Commit** `feat(yard-sim): generate A1/A course layouts from QCVN 15:2026 dimensions`

### Task 5: Lõi — trọng tài các bài

**Files:**
- Create: `frontend/src/features/yard-sim/core/exercises/types.ts`, `core/exercises/lineContact.ts`, `core/exercises/figureEightJudge.ts`, `core/exercises/laneJudge.ts`
- Test: `frontend/src/features/yard-sim/core/exercises/judges.test.ts`

**Interfaces:**
- Consumes: `ExerciseLayout` (Task 4), `wheelPoints`, `MOTORBIKE_TUNING.tireRadius` (Task 3), `touchesPath`, `pointInPolygon`, `signedAngleDelta` (Task 2).
- Produces:
```ts
export type FaultCode = 'SAI_TRINH_TU' | 'DE_VACH' | 'CHONG_CHAN' | 'CHET_MAY' | 'RA_NGOAI_HINH' | 'DO_XE' | 'KHONG_HOAN_THANH' | 'QUA_THOI_GIAN';
export interface FaultEvent { code: FaultCode; exercise: ExerciseKey | '*'; tick: number; detail?: string }
export interface JudgeFrame { tick: number; wheels: { rear: Vec2; front: Vec2 }; position: Vec2; speed: number; footDown: boolean }
export type JudgeStatus = 'WAITING' | 'ACTIVE' | 'COMPLETED' | 'FAILED';
export interface ExerciseJudge {
  readonly key: ExerciseKey;
  readonly status: JudgeStatus;
  update(frame: JudgeFrame): FaultEvent[];   // gọi mỗi tick khi bài là bài hiện tại
}
export function createJudge(layout: ExerciseLayout): ExerciseJudge;
export class LineContactTracker { constructor(lines: StrokedPath[], tireRadius: number); update(wheels: Vec2[]): string[] } // trả id vạch MỚI bị chạm (edge-trigger, theo từng bánh)
```
Quy tắc chung (mọi bài): `WAITING` → `ACTIVE` khi trục xe cắt cổng vào. Khi `ACTIVE`: chạm vạch mới → `DE_VACH`; `footDown` chuyển false→true → `CHONG_CHAN`; **cả hai** bánh ra ngoài `zone` → `RA_NGOAI_HINH` và `FAILED`; cắt cổng ra → `COMPLETED` nếu đạt điều kiện bài, ngược lại `KHONG_HOAN_THANH` và `FAILED`. Bài làn (`STRAIGHT_LINE`, `SLALOM`, `BUMPS`): điều kiện = đi hết từ cổng vào tới cổng ra. Hình số 8: góc quét quanh O (khi x < trung điểm OO') và quanh O' (khi x ≥ trung điểm) đều ≥ 1.75π, ngược dấu.

- [ ] **Step 1: Viết test** (dựng `JudgeFrame` tay, không qua động học): `line contact is edge-triggered` (bánh đè vạch 30 tick liên tiếp → 1 sự kiện; rời 1 tick rồi đè lại → thêm 1); `straight line completes when driven through` (đi dọc tâm làn → COMPLETED, 0 lỗi); `straight line wheel on boundary gives DE_VACH`; `both wheels outside zone disqualifies` (1 bánh ra → không; 2 bánh → `RA_NGOAI_HINH`, status FAILED); `foot down counts once per touch-down`; `slalom touching obstacle line gives DE_VACH`; `figure eight completes after two opposite loops` (quỹ đạo theo `hintPath`: vòng quanh O ngược chiều kim đồng hồ rồi quanh O' cùng chiều kim đồng hồ, ra cổng ra → COMPLETED, 0 lỗi); `figure eight exit without loops is KHONG_HOAN_THANH`.
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement. **Step 4:** Run → PASS. **Step 5: Commit** `feat(yard-sim): add exercise judges with edge-triggered line contact`

### Task 6: Lõi — sổ điểm, vòng lặp mô phỏng, replay

**Files:**
- Create: `frontend/src/features/yard-sim/core/scoring/scoreBook.ts`, `core/simulation.ts`, `core/replay.ts`
- Test: `frontend/src/features/yard-sim/core/scoring/scoreBook.test.ts`, `frontend/src/features/yard-sim/core/simulation.test.ts`

**Interfaces:**
- Consumes: Tasks 3–5; `FaultRule` khớp `FaultRuleDto` của Task 1.
- Produces:
```ts
export interface FaultRule { code: FaultCode; exercise: ExerciseKey | '*'; name: string; penaltyPoints: number; disqualifies: boolean; repeatMode: 'PER_OCCURRENCE' | 'PER_INTERVAL'; intervalSeconds: number | null; limitSeconds: number | null; legalStatus: string }
export interface ScoredFault extends FaultEvent { name: string; points: number; disqualifies: boolean }
export class ScoreBook {
  constructor(rules: FaultRule[], maxScore: number, passScore: number);
  record(event: FaultEvent): ScoredFault | null;   // null nếu không có luật cho mã đó (bỏ qua, không trừ)
  get score(): number; get disqualified(): boolean; get faults(): readonly ScoredFault[];
  get passed(): boolean;                             // score >= passScore && !disqualified
}
export type SimMode = 'FREE' | 'EXERCISE' | 'MOCK_EXAM';
export type SimPhase = 'READY' | 'RUNNING' | 'FINISHED';
export interface SimConfig { course: CourseLayout; vehicle: VehicleSpec; rules: FaultRule[]; maxScore: number; passScore: number; mode: SimMode }
export interface SimSnapshot { tick: number; elapsed: number; phase: SimPhase; bike: MotorbikeState; currentExercise: ExerciseKey | null; judges: Array<{ key: ExerciseKey; status: JudgeStatus }>; score: number; faults: readonly ScoredFault[]; passed: boolean | null; trail: Vec2[] }
export interface Simulation {
  step(input: ControlInput): FaultEvent[];          // một tick DT
  advance(elapsedSeconds: number, input: ControlInput): FaultEvent[]; // tích lũy, tối đa MAX_STEPS_PER_FRAME bước
  snapshot(): SimSnapshot;
  restart(): void;
}
export function createSimulation(config: SimConfig): Simulation;
export const DT = 1 / 60; export const MAX_STEPS_PER_FRAME = 5;
export interface ReplayLog { version: 1; licenseClass: LicenseClassA; mode: SimMode; inputs: Array<[tick: number, input: ControlInput]> } // chỉ ghi khi input đổi
export class ReplayRecorder { record(tick: number, input: ControlInput): void; toLog(meta: Omit<ReplayLog, 'version' | 'inputs'>): ReplayLog }
export function replay(config: SimConfig, log: ReplayLog, totalTicks: number): SimSnapshot;
```
Quy tắc vòng lặp: `READY` → `RUNNING` khi xe cắt vạch xuất phát (đồng hồ bắt đầu); `MOCK_EXAM`/`EXERCISE`: bài hiện tại = bài đầu tiên chưa xong; xe vào `zone` của bài khác bài hiện tại → `SAI_TRINH_TU` (một lần mỗi bài bị vào nhầm); `fallen` → `DO_XE`; mỗi khi `elapsed` vượt `limitSeconds` thêm một `intervalSeconds` → `QUA_THOI_GIAN`; cắt vạch kết thúc khi mọi bài `COMPLETED`, hoặc bị truất quyền → `FINISHED`. Bài chưa xong lúc qua vạch kết thúc → `KHONG_HOAN_THANH`. `FREE`: không trọng tài, không lỗi, không kết thúc (chỉ đồng hồ). Xe chạm `bounds` → dừng (speed 0), không lỗi. `trail` giữ tối đa 600 điểm gần nhất (vệt bánh sau, lấy mẫu mỗi 6 tick).

- [ ] **Step 1: Test ScoreBook:** `per occurrence deducts each time` (2 × DE_VACH → 90); `disqualifying fault fails regardless of score`; `unknown code is ignored`; `score never below zero`; `passes at exactly 80`.
- [ ] **Step 2: Test simulation:** `starts timer when crossing start line`; `advance caps catch-up steps` (`advance(10, …)` chạy đúng 5 bước, `tick === 5`); `restart clears faults, score and timer`; `entering a later exercise zone gives SAI_TRINH_TU once`; `time over limit deducts per interval` (giả lập `elapsed` 601 s và 661 s → 2 sự kiện QUA_THOI_GIAN; dùng luật có `limitSeconds: 600, intervalSeconds: 60`, chạy bằng `step` với xe đứng yên sau vạch xuất phát); `free mode never produces faults`; `replay reproduces the same snapshot` (ghi 900 tick input lái theo kịch bản cố định → `replay(...)` cho `score`, `faults`, `bike.position` giống hệt).
- [ ] **Step 3:** Run → FAIL. **Step 4:** Implement. **Step 5:** Run → PASS. **Step 6: Commit** `feat(yard-sim): add score book, fixed-step simulation loop and replay`

### Task 7: Dịch vụ cấu hình + điều khiển bàn phím/cảm ứng

**Files:**
- Create: `frontend/src/types/yardSim.ts`, `frontend/src/services/yardSimService.ts`
- Create: `frontend/src/features/yard-sim/input/useDrivingControls.ts`, `frontend/src/features/yard-sim/components/TouchControls.tsx` (+ `.module.css`)
- Test: `frontend/src/features/yard-sim/input/useDrivingControls.test.tsx`

**Interfaces:**
- Consumes: REST Task 1; `ControlInput`, `NEUTRAL_INPUT` (Task 3).
- Produces:
```ts
// types/yardSim.ts — khớp YardSimConfigResponse
export interface YardSimConfig { licenseClass: string; vehicle: VehicleSpecDto; faultRuleVersion: string; maxScore: number; passScore: number; faultRules: FaultRule[] }
yardSimService.getConfig(licenseClass: 'A1' | 'A'): Promise<YardSimConfig>
export interface DrivingControls { input: React.MutableRefObject<ControlInput>; setTouch(partial: Partial<ControlInput>): void; onCommand: (cmd: 'RESTART' | 'TOGGLE_CAMERA') => void }
export function useDrivingControls(target: React.RefObject<HTMLElement>, onCommand: (cmd: 'RESTART' | 'TOGGLE_CAMERA') => void): DrivingControls;
```
Phím: `ArrowUp`/`W` ga, `ArrowDown`/`S` và `Space` phanh, `ArrowLeft`/`A` trái, `ArrowRight`/`D` phải, `F` giữ để chống chân, `C` đổi camera, `R` làm lại. Chỉ lắng nghe khi `target` có focus; `preventDefault` cho phím lái. `TouchControls`: nút Trái/Phải/Ga/Phanh/Chống chân dạng giữ (pointerdown/pointerup/pointercancel/pointerleave), nhãn tiếng Việt, `aria-label` đầy đủ.

- [ ] **Step 1: Viết test:** `maps keys to input` (keydown ArrowUp → throttle 1; keyup → 0; `A`+`D` cùng lúc → steer 0); `prevents page scroll for driving keys` (`fireEvent.keyDown(target, { key: 'ArrowDown' })` trả về `false` = defaultPrevented; phím `Tab` không bị chặn); `releases all controls on window blur` (giữ ArrowUp, `fireEvent.blur(window)` → input bằng `NEUTRAL_INPUT`); `commands fire once per press` (`R` giữ lặp phím `repeat: true` → `onCommand('RESTART')` gọi 1 lần).
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement (service theo mẫu `trafficSignService.ts`). **Step 4:** Run → PASS. **Step 5: Commit** `feat(yard-sim): add config service and keyboard/touch driving controls`

### Task 8: Hiển thị 2D + HUD

**Files:**
- Create: `frontend/src/features/yard-sim/render2d/camera.ts`, `render2d/drawScene.ts`, `render2d/YardCanvas2D.tsx` (+ `.module.css`)
- Create: `frontend/src/features/yard-sim/components/Hud.tsx`, `components/FaultFeed.tsx`, `components/ResultPanel.tsx`, `components/ControlsHelp.tsx` (+ `.module.css` từng file)
- Test: `frontend/src/features/yard-sim/render2d/camera.test.ts`, `frontend/src/features/yard-sim/components/hud.test.tsx`

**Interfaces:**
- Consumes: `CourseLayout`, `SimSnapshot`, `VehicleSpec`.
- Produces:
```ts
export type CameraMode = 'FOLLOW' | 'OVERVIEW';
export interface ViewTransform { scale: number; offsetX: number; offsetY: number } // px/m, lật y
export function computeView(mode: CameraMode, course: CourseLayout, focus: Vec2, canvas: { width: number; height: number }): ViewTransform;
export function worldToScreen(p: Vec2, view: ViewTransform): Vec2;
export function drawScene(ctx: CanvasRenderingContext2D, args: { course: CourseLayout; snapshot: SimSnapshot; vehicle: VehicleSpec; view: ViewTransform; showHint: boolean }): void;
export function YardCanvas2D(props: { course: CourseLayout; vehicle: VehicleSpec; getSnapshot: () => SimSnapshot; camera: CameraMode; showHint: boolean }): JSX.Element; // tự vẽ bằng requestAnimationFrame, canvas tự co theo khung (ResizeObserver), devicePixelRatio
export function Hud(props: { snapshot: SimSnapshot; mode: SimMode; maxSpeedKmh: number }): JSX.Element;
export function FaultFeed(props: { faults: readonly ScoredFault[] }): JSX.Element;       // 5 lỗi mới nhất, mới nhất trên cùng
export function ResultPanel(props: { snapshot: SimSnapshot; passScore: number; onRetry(): void; onExit(): void }): JSX.Element;
```
Vẽ: nền cỏ `#7cb342`, mặt đường/hình `#4a4f55`, vạch trắng đúng độ rộng thực (tối thiểu 1 px), vạch cản trắng, dải gồ ghề trắng sọc, cổng vào/ra nét đứt vàng, vạch xuất phát/kết thúc trắng có chữ "XUẤT PHÁT"/"KẾT THÚC", vệt bánh xám mờ, mô tô là thân chữ nhật theo `lengthM × widthM` + 2 bánh, gợi ý đường đi nét đứt xanh khi `showHint`. HUD: tên bài hiện tại, điểm còn lại (đổi màu đỏ khi < 80), đồng hồ `mm:ss`, tốc độ km/h, trạng thái chống chân; nhãn cố định "Mô phỏng luyện tập — điểm trừ tham khảo, không thay thế sát hạch chính thức". ResultPanel: "ĐẠT"/"KHÔNG ĐẠT", điểm/100, lý do truất quyền nếu có, bảng lỗi (tên, bài, điểm trừ), nút "Làm lại" và "Chọn bài khác".

- [ ] **Step 1: Viết test:** `overview fits whole course with margin` (mọi đỉnh `bounds` nằm trong canvas sau `worldToScreen`); `follow keeps focus at canvas center`; `y axis is flipped` (điểm y lớn hơn → screenY nhỏ hơn); `hud shows score in red below pass score`; `hud always shows practice disclaimer`; `fault feed lists newest first, max 5`; `result panel shows disqualification reason` (lỗi `RA_NGOAI_HINH` → "KHÔNG ĐẠT" và tên lỗi).
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement (`drawScene` không có test pixel; kiểm bằng mắt ở Task 10). **Step 4:** Run → PASS. **Step 5: Commit** `feat(yard-sim): add 2D canvas renderer and HUD components`

### Task 9: Trang `/yard-sim` — chọn hạng, chế độ, bài; vòng đời lượt lái

**Files:**
- Create: `frontend/src/pages/YardSimPage.tsx` (+ `.module.css`), `frontend/src/features/yard-sim/components/SimSetup.tsx` (+ `.module.css`), `frontend/src/features/yard-sim/useSimulationRunner.ts`
- Modify: `frontend/src/app/App.tsx` (route `/yard-sim` trong `ProtectedRoute`), `frontend/src/layouts/MainLayout.tsx` (link "Sa hình" — dùng drawer trái và thanh workspace học viên, **không** thêm vào header chính vì header đã tràn ở ~800 px)
- Test: `frontend/src/pages/YardSimPage.test.tsx`

**Interfaces:**
- Consumes: Tasks 4, 6, 7, 8.
- Produces: `useSimulationRunner(config: SimConfig | null, controls: DrivingControls): { getSnapshot(): SimSnapshot; phase: SimPhase; restart(): void; paused: boolean }` — chạy `requestAnimationFrame`, gọi `simulation.advance(dt, input.current)`, tạm dừng khi `document.hidden`, cập nhật state React tối đa 10 lần/giây cho HUD (canvas đọc `getSnapshot` trực tiếp).
- Màn hình chọn (`SimSetup`): Hạng `A1` / `A` / `B` (B disabled, nhãn "Sắp có"), Chế độ "Lái tự do" / "Luyện từng bài" / "Thi thử cả sân"; nếu "Luyện từng bài" thì chọn 1 trong 4 bài; nút "Bắt đầu lái". Màn hình lái: canvas + HUD + FaultFeed + nút "Đổi góc nhìn" / "Làm lại" / "Thoát" + `ControlsHelp` (gập được) + `TouchControls` khi `matchMedia('(pointer: coarse)')`. Khi `FINISHED` hiện `ResultPanel`. Khung canvas `tabIndex=0`, tự focus khi bắt đầu.

- [ ] **Step 1: Viết test** (mock `yardSimService`, mock `HTMLCanvasElement.prototype.getContext` trả object rỗng có các hàm vẽ là `vi.fn()`, mock `requestAnimationFrame` bằng fake timers): `loads config for chosen class and starts` (chọn A, "Thi thử cả sân", bấm "Bắt đầu lái" → `getConfig('A')` được gọi, thấy "Hình số 8" trong HUD); `exercise mode requires choosing an exercise` (nút "Bắt đầu lái" disabled đến khi chọn bài); `class B is disabled`; `shows error with retry when config fails` (reject lần 1 → "Không tải được cấu hình mô phỏng" + nút "Thử lại" → lần 2 thành công); `shows touch controls on coarse pointer` (mock `matchMedia` trả `matches: true` → thấy nút `aria-label="Ga"`); `exit returns to setup`.
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement. **Step 4:** Run toàn bộ `npx vitest run` và `npm run build` → PASS. **Step 5: Commit** `feat(frontend): add yard simulator page for classes A1 and A`

### Task 10: Tài liệu, kiểm tra thủ công, hoàn tất

**Files:**
- Modify: `docs/backlog/tasks.md` (TSK-P18-08 → `DONE`, thêm các task con GĐ2 và `TSK-P18-09` GĐ3 `TODO`), `CHANGELOG.md` (Unreleased), `.rules/07-business-rules.md` (thêm `LRN-SIM-001` [`NEEDS_VERIFICATION`]: bảng lỗi mô phỏng là tham khảo, chỉnh qua `sim_fault_rules`; `LRN-SIM-002` [`INTERNAL_RULE`]: kết quả mô phỏng không có giá trị sát hạch), `docs/knowledge/database-change-log.md`, `docs/knowledge/database-schema-catalog.md` (V16), `docs/legal/legal-register.md` (`LEG-SIM-01` ghi rõ phần `INTERNAL_RULE` của hình số 8, vạch cản, gồ ghề), `docs/guides/` thêm `yard-simulator-guide.md` (phím điều khiển, chế độ, cách chấm, giới hạn mô phỏng).

- [ ] **Step 1:** Cập nhật tài liệu.
- [ ] **Step 2:** Run backend `mvn -o test` (ghi rõ 2 lỗi có sẵn `TheoryReviewServiceTest`, `AttendanceServiceTest` nếu còn), frontend `npx vitest run && npm run build`.
- [ ] **Step 3: Kiểm tra thủ công** trên MySQL 8.4 tạm + jar + Vite (như GĐ1, `APP_CORS_ALLOWED_ORIGINS`): V16 áp dụng; đăng nhập học viên thử; `/yard-sim` → A1 "Thi thử cả sân": lái hết 4 bài bằng bàn phím, cố tình đè vạch 1 lần (−5) và chống chân 1 lần (−5) → kết quả "ĐẠT 90/100"; A "Luyện từng bài" → Hình số 8 có gợi ý đường đi; chuyển tab 10 s rồi quay lại → xe không nhảy; thu hẹp cửa sổ 375 px → hiện nút cảm ứng, không cuộn ngang. Chụp màn hình gửi người dùng; ghi kết quả thực tế.
- [ ] **Step 4: Commit** `docs: document yard simulator phase 2 (A1/A 2D)`
