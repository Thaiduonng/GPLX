# Giai đoạn 1 — Danh mục biển báo chuẩn: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Một danh mục biển báo duy nhất (database + API + trang tra cứu + SVG các biển dùng trên sân sa hình), seed từ file QCVN 41 bản 2019 người dùng cung cấp, sẵn sàng cho giai đoạn mô phỏng sa hình và ngân hàng câu hỏi dùng chung.

**Architecture:** Script Python một lần (`tools/signs/`) đọc file .doc → JSON danh mục + ảnh raster + migration seed SQL. Backend module `learning` thêm bảng `traffic_signs`, entity/repository/service/controller theo pattern hiện có. Frontend thêm feature `traffic-signs` (service, types, trang tra cứu, trang quản trị nhỏ) và bộ component SVG cho ~11 biển dùng trên sân.

**Tech Stack:** Java 21, Spring Boot 4.1.1, JPA, Flyway (MySQL 8.4), H2 cho test; React 19 + TS strict + CSS Modules; Vitest + Testing Library (mới); Python 3.11 stdlib + `olefile`, `pymupdf` (đã có trên máy, chỉ dùng cho tooling).

**Spec:** `docs/superpowers/specs/2026-11-20-sa-hinh-simulator-and-sign-catalog-design.md` (mục 6, 9)

**Kế hoạch tổng:** spec được chia thành 6 kế hoạch, mỗi kế hoạch viết ngay trước khi làm: (1) danh mục biển báo — *tài liệu này*; (2) lõi mô phỏng + 2D hạng A1/A; (3) 2D hạng B; (4) bài tình huống giả định A1/A; (5) 3D; (6) lưu lượt lái, lịch sử, replay, quản trị bảng lỗi/bố cục.

## Global Constraints

- Không đổi stack: Java 21, Spring Boot 4.1.1, MySQL 8.4, React 19 + TypeScript `strict: true`, CSS Modules. Không dùng `any`.
- Migration mới bắt đầu từ `V13__`; không sửa migration cũ.
- Mọi bản ghi biển nhập từ file .doc: `standard_version = 'QCVN41:2019'`, `legal_status = 'NEEDS_VERIFICATION'`.
- Giá trị `legal_status` hợp lệ đúng 3 giá trị: `VERIFIED`, `NEEDS_VERIFICATION`, `INTERNAL_RULE` (Rule 08).
- Toàn bộ nhãn/thông báo UI bằng tiếng Việt; mỗi view tải dữ liệu có đủ loading / empty / error (nút "Thử lại") / success (Rule 09).
- API dưới `/api/v1/learning/traffic-signs`, bọc `ApiResponse` (Rule 05). Đọc: người đã đăng nhập. Ghi: `hasAnyRole('ADMIN','MANAGER')`.
- Không file nguồn nào vượt ~400 dòng.
- Thư viện frontend mới chỉ gồm: `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`; commit `package-lock.json`.
- Commit theo Conventional Commits, kết thúc bằng `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Ảnh không khớp biển** — số `[pic]` (202) ≠ số chú thích "Hình X.n" (171) ≠ số ảnh nhúng (205). Người dùng mong ảnh hiển thị đúng biển; ảnh nào không ghép được phải để `raster_asset = NULL`, không gán bừa. → test `test_unmatched_pictures_get_no_asset` (Task 2).
2. **Một chú thích chứa nhiều mã** (vd "P.103a, P.103b và P.103c", "R.301 (a,b,c…h)") — người dùng tìm "P.103b" phải ra kết quả. → test `test_expand_variant_codes` (Task 2) và test tìm kiếm theo mã con (Task 3).
3. **Tìm kiếm tiếng Việt có/không dấu, hoa/thường** — gõ "dung lai" hoặc "DỪNG LẠI" phải ra R.122. → test `searchMatchesWithoutDiacritics` (Task 3, tìm kiếm phía backend bằng cột `search_text` chuẩn hóa).
4. **Ký tự đặc biệt trong SQL seed** (dấu nháy kép “ ” và nháy đơn trong ý nghĩa biển) — migration không được vỡ. → test `test_sql_escapes_quotes` (Task 2).
5. **Danh sách rỗng khi lọc** — lọc nhóm không có biển phải hiện empty state tiếng Việt, không trang trắng. → test `shows empty state when no sign matches` (Task 6).

---

### Task 1: Đưa tài liệu pháp lý nguồn vào repo

**Files:**
- Create: `docs/legal/sources/QCVN-15-2026-BCA.pdf`, `docs/legal/sources/QCVN-15-2026-BCA-phu-luc.pdf`, `docs/legal/sources/tong-hop-bien-bao-QCVN41-2019.doc` (sao chép từ `D:\Downloads\1.-qcvn-15-2026.pdf`, `D:\Downloads\2.-phu-luc-quy-chuan.pdf`, `D:\Downloads\file-tong-hop-tat-ca-bien-bao-giao-thong.doc`)
- Create: `tools/legal/render_qcvn_figures.py`
- Create: `docs/legal/sources/qcvn15-2026-figures/page-05.png` … `page-17.png` (output script)
- Modify: `docs/legal/legal-source-catalog.md`, `docs/legal/legal-register.md`

- [ ] **Step 1:** Sao chép 3 file nguồn vào `docs/legal/sources/` với tên trên.
- [ ] **Step 2:** Viết `tools/legal/render_qcvn_figures.py <pdf> <out_dir> --pages 5-17 --dpi 150` dùng `pymupdf` render từng trang thành `page-NN.png` (các trang chứa Hình 1–20).
- [ ] **Step 3:** Chạy `python -I tools/legal/render_qcvn_figures.py docs/legal/sources/QCVN-15-2026-BCA.pdf docs/legal/sources/qcvn15-2026-figures --pages 5-17`. Expected: 13 file PNG, mỗi file > 20 KB.
- [ ] **Step 4:** Thêm vào `legal-source-catalog.md` 2 nguồn theo format bảng hiện có: QCVN 15:2026/BCA (Thông tư 107/2026/TT-BCA ngày 29/6/2026, trạng thái `VERIFIED` — văn bản gốc do người dùng cung cấp) và "Tổng hợp biển báo QCVN 41 (bản 2016/2019)" (trạng thái `NEEDS_VERIFICATION`, ghi chú: đã có QCVN 41:2024/BGTVT hiệu lực 01/01/2025, chưa có văn bản để đối chiếu). Ghi đường dẫn file trong `docs/legal/sources/`.
- [ ] **Step 5: Commit** `docs(legal): add QCVN 15:2026 and QCVN 41 sign compendium as legal sources`

### Task 2: Script trích danh mục biển + ảnh + seed SQL

**Files:**
- Create: `tools/signs/extract_signs.py`, `tools/signs/requirements.txt` (`olefile`), `tools/signs/README.md`
- Create: `tools/signs/test_extract_signs.py`, `tools/signs/fixtures/sample.txt`
- Output: `frontend/public/signs/raster/<figure-id>.png|jpg`, `docs/legal/sources/sign-catalog-qcvn41-2019.json`, `docs/legal/sources/sign-extraction-report.md`, `backend/src/main/resources/db/migration/V14__seed_traffic_signs_qcvn41_2019.sql`

**Interfaces:**
- Produces JSON record (một phần tử / mã biển):
  `{"code": "P.103b", "name": "Cấm xe ô tô rẽ phải", "group": "CAM", "meaning": "<đoạn mô tả, ≤ 2000 ký tự>", "figure_id": "B-3", "raster_asset": "/signs/raster/B-3.png" | null, "standard_version": "QCVN41:2019", "legal_status": "NEEDS_VERIFICATION"}`
- Nhóm theo tiền tố/phụ lục: `P`→`CAM`, `R`→`HIEU_LENH` (bao gồm R.122 theo đúng phụ lục D), `W`→`NGUY_HIEM`, `I`→`CHI_DAN`, `S`→`PHU`, `DP`→`CAM` (biển hết cấm).
- Hàm public: `parse_entries(text: str) -> list[SignEntry]`, `expand_codes(heading: str) -> list[tuple[str, str]]` (mã, tên), `pair_pictures(text: str, image_count: int) -> dict[str, int]` (figure_id → chỉ số ảnh), `to_sql(entries) -> str`.

- [ ] **Step 1: Viết test (unittest stdlib)** trong `test_extract_signs.py` dùng `fixtures/sample.txt` (cắt ~60 dòng thật từ output antiword: B.1, B.2, B.3, C.24, D.1):
  - `test_parse_simple_entry`: có phần tử `code == "P.101"`, `name == "Đường cấm"`, `group == "CAM"`.
  - `test_expand_variant_codes`: `expand_codes('B3  Biển số P.103a “Cấm xe ôtô”, Biển số P.103b và P.103c “Cấm xe ôtô rẽ phải” và “Cấm xe ôtô rẽ trái”')` chứa `("P.103a","Cấm xe ôtô")`, `("P.103b", ...)`, `("P.103c", ...)`; `expand_codes('D.1a  Biển số R.301 (a,b,c) "Hướng đi phải theo"')` trả 3 mã `R.301a`, `R.301b`, `R.301c`.
  - `test_group_from_prefix`: `W.224`→`NGUY_HIEM`, `R.122`→`HIEU_LENH`, `I.408`→`CHI_DAN`.
  - `test_unmatched_pictures_get_no_asset`: văn bản có 2 `[pic]` nhưng chỉ 1 chú thích "Hình B.1 - …" ngay sau `[pic]` (≤ 3 dòng) → chỉ `B-1` được ghép; phần tử còn lại `raster_asset is None`.
  - `test_sql_escapes_quotes`: `to_sql([entry có name 'Cấm "xe" O\'Brien'])` chứa `'Cấm "xe" O''Brien'` và bắt đầu bằng `INSERT INTO traffic_signs`.
- [ ] **Step 2:** Run `python -I -m unittest tools/signs/test_extract_signs.py -v` → FAIL (module chưa có).
- [ ] **Step 3: Implement `extract_signs.py`.** CLI: `python -I tools/signs/extract_signs.py <doc_path> --text <antiword_utf8_txt>`. Văn bản lấy bằng `antiword -m UTF-8.txt` (có sẵn trong Git Bash; README ghi lệnh). Ảnh: đọc stream `Data` bằng `olefile`, cắt tuần tự theo chữ ký PNG (`\x89PNG…IEND\xaeB\x60\x82`) và JPEG (`\xff\xd8 … \xff\xd9`) theo thứ tự xuất hiện; ghép ảnh thứ *i* với `[pic]` thứ *i* chỉ khi `[pic]` đó có chú thích "Hình X.n" trong ≤ 3 dòng sau; nếu số ảnh ≠ số `[pic]` thì ghi cảnh báo vào report và vẫn ghép theo thứ tự đến hết số nhỏ hơn. `meaning`: nối các dòng từ tiêu đề mục đến `[pic]` kế tiếp, gộp khoảng trắng. Trùng mã → giữ bản đầu, ghi vào report. SQL sinh ra có cột `search_text` = `lower(bỏ dấu(code + ' ' + name))` (bỏ dấu bằng `unicodedata.normalize('NFD')` + bỏ ký tự Mn, `đ→d`).
- [ ] **Step 4:** Run test → PASS.
- [ ] **Step 5:** Chạy thật trên `docs/legal/sources/tong-hop-bien-bao-QCVN41-2019.doc`. Expected: report ghi số mã (≈ 330 ± 15), số ảnh ghép được, danh sách mã không có ảnh; JSON hợp lệ; `V14__…sql` tồn tại. Mở 5 ảnh ngẫu nhiên đối chiếu với chú thích trong report (P.101, W.224, R.122, I.408, W.211) — nếu lệch, sửa thuật toán ghép, không sửa tay.
- [ ] **Step 6: Commit** `feat(tools): extract QCVN 41 sign catalog, images and seed migration from source document`

### Task 3: Backend — bảng, entity, API tra cứu và cập nhật biển báo

**Files:**
- Create: `backend/src/main/resources/db/migration/V13__create_traffic_signs_table.sql`
- Create: `backend/src/main/java/vn/edu/gplx/modules/learning/domain/TrafficSign.java`, `TrafficSignGroup.java`
- Create: `.../learning/infrastructure/TrafficSignRepository.java`
- Create: `.../learning/application/TrafficSignService.java`, `.../application/impl/TrafficSignServiceImpl.java`
- Create: `.../learning/api/TrafficSignController.java`, `.../api/dto/TrafficSignResponse.java`, `.../api/dto/TrafficSignUpdateRequest.java`
- Test: `backend/src/test/java/vn/edu/gplx/modules/learning/application/TrafficSignServiceTest.java`, `.../learning/api/TrafficSignControllerTest.java`

**Interfaces:**
- Produces REST:
  - `GET /api/v1/learning/traffic-signs?q=&group=&page=0&size=24` → `ApiResponse<Page<TrafficSignResponse>>` (sắp theo `code`)
  - `GET /api/v1/learning/traffic-signs/{code}` → `ApiResponse<TrafficSignResponse>`; 404 qua `ResourceNotFoundException` nếu không có
  - `PUT /api/v1/learning/traffic-signs/{code}` (ADMIN, MANAGER) body `TrafficSignUpdateRequest` → `ApiResponse<TrafficSignResponse>`
- `record TrafficSignResponse(String code, String name, String group, String meaning, String shape, String standardVersion, String legalStatus, String legacyCode, String replacedByCode, String svgAsset, String rasterAsset)`
- `record TrafficSignUpdateRequest(@NotBlank @Size(max=255) String name, @Size(max=4000) String meaning, @NotNull @Pattern(regexp="VERIFIED|NEEDS_VERIFICATION|INTERNAL_RULE") String legalStatus, @Size(max=20) String replacedByCode, @Size(max=255) String svgAsset)`
- `enum TrafficSignGroup { CAM, NGUY_HIEM, HIEU_LENH, CHI_DAN, PHU, VACH_KE }`

- [ ] **Step 1: Migration V13** — bảng `traffic_signs`: `id BIGINT AUTO_INCREMENT PK`, `code VARCHAR(20) NOT NULL`, `name VARCHAR(255) NOT NULL`, `sign_group VARCHAR(20) NOT NULL`, `meaning TEXT NULL`, `shape VARCHAR(30) NULL`, `standard_version VARCHAR(30) NOT NULL`, `legal_status VARCHAR(30) NOT NULL DEFAULT 'NEEDS_VERIFICATION'`, `legacy_code VARCHAR(20) NULL`, `replaced_by_code VARCHAR(20) NULL`, `svg_asset VARCHAR(255) NULL`, `raster_asset VARCHAR(255) NULL`, `search_text VARCHAR(400) NOT NULL`, `created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP`, `updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` (khớp `BaseEntity` và V10; dự án chưa có cột created_by), `UNIQUE KEY uk_traffic_signs_code_version (code, standard_version)`, `INDEX idx_traffic_signs_group (sign_group)`, `CHECK (legal_status IN ('VERIFIED','NEEDS_VERIFICATION','INTERNAL_RULE'))`.- [ ] **Step 2: Viết test service** (`@SpringBootTest @ActiveProfiles("test") @Transactional`, seed bằng repository):
  - `searchByCodeReturnsVariant`: seed `P.103b`; `search("p.103b", null, page0)` có 1 phần tử code `P.103b`.
  - `searchMatchesWithoutDiacritics`: seed R.122 "Dừng lại" (`search_text` do service tính); `search("dung lai", …)` và `search("DỪNG LẠI", …)` đều trả R.122.
  - `filterByGroup`: seed 1 `CAM` + 1 `NGUY_HIEM`; lọc `NGUY_HIEM` → 1 phần tử.
  - `updateRecomputesSearchTextAndRejectsUnknownCode`: update tên → `search_text` mới tìm được; update mã không tồn tại → `ResourceNotFoundException`.
- [ ] **Step 3:** Run `cd backend && ./mvnw -q test -Dtest=TrafficSignServiceTest` → FAIL.
- [ ] **Step 4: Implement** entity (extends `BaseEntity`, `@Enumerated(STRING)` cho group, `@Column(name="sign_group")`), repository (`Page<TrafficSign> search(String normalizedQ, TrafficSignGroup group, Pageable)` bằng `@Query` với `LIKE CONCAT('%', :q, '%')` trên `searchText` và điều kiện group nullable), service. Hàm chuẩn hóa đặt tại `TrafficSignServiceImpl.normalize(String): String` (`Normalizer.Form.NFD`, bỏ `\p{M}`, `đ/Đ→d`, lowercase, trim) — cùng quy tắc với script Python Task 2.
- [ ] **Step 5:** Run test → PASS.
- [ ] **Step 6: Viết test controller** (MockMvc, pattern `CourseAndTrainingIntegrationTest`): `GET` không token → 401; `GET` với STUDENT → 200 và `$.data.content[0].code`; `GET /{code}` không có → 404; `PUT` với STUDENT → 403; `PUT` với ADMIN body `legalStatus="SAI"` → 400; `PUT` hợp lệ → 200 và `$.data.legalStatus == "VERIFIED"`.
- [ ] **Step 7:** Implement controller (`@Tag(name = "Traffic Signs", description = "Danh mục biển báo hiệu đường bộ")`, `@SecurityRequirement(name = "bearerAuth")`). Run `./mvnw -q test -Dtest='TrafficSign*'` → PASS; chạy `./mvnw -q test` toàn bộ → không test cũ nào hỏng.
- [ ] **Step 8: Commit** `feat(learning): add traffic sign catalog table, search and admin update API`

### Task 4: Liên kết câu hỏi lý thuyết với biển báo

**Files:**
- Create: `backend/src/main/resources/db/migration/V15__link_theory_questions_to_traffic_signs.sql`
- Modify: `.../learning/domain/TheoryQuestion.java`, `.../api/dto/QuestionDetailResponse.java`, `.../api/dto/QuestionUpsertRequest.java`, service map DTO tương ứng (`QuestionAdminServiceImpl`)
- Modify: `frontend/src/types/learning.ts` (thêm `trafficSignCode?: string | null` vào `QuestionDetail` và `QuestionUpsertRequest`)
- Test: bổ sung vào `QuestionAdminServiceTest.java`

**Interfaces:**
- Consumes: `TrafficSignRepository.findByCodeAndStandardVersion(String, String)` (Task 3; thêm method nếu chưa có).
- Produces: `QuestionDetailResponse.trafficSignCode` (String, nullable).

- [ ] **Step 1:** V15: `ALTER TABLE theory_questions ADD COLUMN traffic_sign_code VARCHAR(20) NULL AFTER legal_reference, ADD INDEX idx_theory_questions_sign (traffic_sign_code);` (không FK vì khóa duy nhất là cặp code+version).
- [ ] **Step 2: Test** `upsertQuestionWithUnknownSignCodeIsRejected` (mã `X.999` → `BadRequestException` với thông báo "Mã biển báo không tồn tại trong danh mục") và `upsertQuestionWithSignCodeIsReturnedInDetail` (seed `P.102`, lưu câu hỏi với `trafficSignCode="P.102"` → detail trả `P.102`).
- [ ] **Step 3:** Run → FAIL; implement (kiểm tra tồn tại theo bất kỳ `standard_version` nào); run → PASS.
- [ ] **Step 4: Commit** `feat(learning): link theory questions to traffic sign catalog`

### Task 5: Frontend — Vitest + bộ SVG biển dùng trên sân sa hình

**Files:**
- Modify: `frontend/package.json` (devDeps: `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`; script `"test": "vitest run"`), `frontend/vite.config.ts` (khối `test: { environment: 'jsdom', setupFiles: './src/test/setup.ts' }`), `frontend/package-lock.json`
- Create: `frontend/src/test/setup.ts` (`import '@testing-library/jest-dom/vitest'`)
- Create: `frontend/src/features/traffic-signs/svg/primitives.tsx` (khung chung: `ProhibitoryFrame`, `WarningFrame`, `MandatoryFrame`, `InfoFrame`, `StopOctagon`)
- Create: `frontend/src/features/traffic-signs/svg/yardSigns.tsx`
- Test: `frontend/src/features/traffic-signs/svg/yardSigns.test.tsx`

**Interfaces:**
- Produces:
  ```ts
  export type YardSignKey =
    | 'STOP' | 'PEDESTRIAN_CROSSING' | 'STEEP_DESCENT' | 'STEEP_ASCENT'
    | 'MANDATORY_DIRECTION' | 'INTERSECTION' | 'TRAFFIC_SIGNALS'
    | 'PARKING' | 'RAILWAY_NO_BARRIER' | 'RAILWAY_CROSS_PERPENDICULAR'
    | 'GEAR_UP_START' | 'GEAR_DOWN_START' | 'GEAR_DOWN_END';
  export interface YardSignDef { key: YardSignKey; code: string | null; name: string; Component: (p: { size?: number }) => JSX.Element }
  export const YARD_SIGNS: Record<YardSignKey, YardSignDef>;
  ```
  Mã (bản 2019, theo file nguồn): STOP `R.122` "Dừng lại"; PEDESTRIAN_CROSSING `W.224` "Đường người đi bộ cắt ngang"; STEEP_DESCENT `W.219` "Dốc xuống nguy hiểm"; STEEP_ASCENT `W.220` "Dốc lên nguy hiểm"; MANDATORY_DIRECTION `R.301a` "Hướng đi phải theo"; INTERSECTION `W.205a` "Đường giao nhau"; TRAFFIC_SIGNALS `W.209` "Giao nhau có tín hiệu đèn"; PARKING `I.408` "Nơi đỗ xe"; RAILWAY_NO_BARRIER `W.211a` "Giao nhau với đường sắt không có rào chắn"; RAILWAY_CROSS_PERPENDICULAR `W.242a` "Nơi đường sắt giao vuông góc với đường bộ"; ba biển phụ của bài thay đổi số `code: null` với tên đúng câu chữ QCVN 15 mục 2.1.15.11: "Bắt đầu tăng số, tăng tốc độ", "Bắt đầu giảm số, giảm tốc độ", "Kết thúc giảm số, giảm tốc độ" (biển chữ nhật nền trắng viền đen, chữ đen — `INTERNAL_RULE`).
  Quy cách hình (QCVN 41): biển cấm/hiệu lệnh-tròn; nguy hiểm — tam giác đều viền đỏ nền vàng, hình vẽ đen; hiệu lệnh — tròn nền xanh lam, hình trắng; chỉ dẫn — vuông/chữ nhật nền xanh lam, ký hiệu trắng; "Dừng lại" — bát giác nền đỏ chữ "STOP" trắng. Đối chiếu ảnh raster tương ứng trong `frontend/public/signs/raster/` khi vẽ.
- Mỗi SVG có `role="img"` và `aria-label={name}`, `viewBox="0 0 100 100"`, không phụ thuộc font ngoài (chữ STOP/biển phụ dùng `font-family="Arial, sans-serif"`).

- [ ] **Step 1:** Cài devDeps, thêm cấu hình test. Run `cd frontend && npm test` → "No test files found" (exit ≠ 0 là chấp nhận ở bước này).
- [ ] **Step 2: Viết test** `yardSigns.test.tsx`:
  - `renders every yard sign with accessible name`: với mỗi entry của `YARD_SIGNS`, render → `getByRole('img', { name: def.name })` tồn tại.
  - `stop sign is a red octagon`: `container.querySelector('polygon')` có 8 điểm trong `points`, `fill` là `#d9232e` (hoặc token màu đỏ biển báo định nghĩa trong `primitives.tsx`, cùng một hằng `SIGN_RED`).
  - `warning signs use yellow triangle with red border`: với `W.224`, `W.219`, `W.220`, `W.205a`, `W.209`, `W.211a`, `W.242a` — có `polygon` 3 điểm, `fill === SIGN_YELLOW`, `stroke === SIGN_RED`.
  - `codes match catalog prefixes`: mọi `code` khác null khớp `/^(P|R|W|I|S)\.\d{3}[a-z]?$/`.
- [ ] **Step 3:** Run `npm test` → FAIL. Implement `primitives.tsx` + `yardSigns.tsx` (mỗi biển là một component nhỏ dùng khung chung). Run → PASS. Run `npm run build` → thành công.
- [ ] **Step 4: Commit** `feat(frontend): add vitest and SVG yard signs following QCVN 41 shapes and colors`

### Task 6: Frontend — trang tra cứu biển báo

**Files:**
- Create: `frontend/src/types/trafficSign.ts`, `frontend/src/services/trafficSignService.ts`
- Create: `frontend/src/features/traffic-signs/TrafficSignCard.tsx` (+ `.module.css`), `frontend/src/pages/TrafficSignCatalogPage.tsx` (+ `.module.css`)
- Modify: `frontend/src/app/App.tsx` (route `/traffic-signs` trong `ProtectedRoute`), `frontend/src/layouts/MainLayout.tsx` (link "Biển báo" cạnh "Ôn lý thuyết" ở cả thanh điều hướng và drawer)
- Test: `frontend/src/pages/TrafficSignCatalogPage.test.tsx`

**Interfaces:**
- Consumes: REST Task 3; `YARD_SIGNS` Task 5.
- Produces:
  ```ts
  export type TrafficSignGroup = 'CAM' | 'NGUY_HIEM' | 'HIEU_LENH' | 'CHI_DAN' | 'PHU' | 'VACH_KE';
  export type LegalStatus = 'VERIFIED' | 'NEEDS_VERIFICATION' | 'INTERNAL_RULE';
  export interface TrafficSign { code: string; name: string; group: TrafficSignGroup; meaning: string | null; shape: string | null; standardVersion: string; legalStatus: LegalStatus; legacyCode: string | null; replacedByCode: string | null; svgAsset: string | null; rasterAsset: string | null }
  export interface PageResult<T> { content: T[]; totalElements: number; totalPages: number; number: number }
  trafficSignService.search(params: { q?: string; group?: TrafficSignGroup; page?: number; size?: number }): Promise<PageResult<TrafficSign>>
  trafficSignService.getByCode(code: string): Promise<TrafficSign>
  trafficSignService.update(code: string, body: TrafficSignUpdate): Promise<TrafficSign>
  ```
  (`src/types/api.ts` hiện chưa có kiểu trang → thêm `PageResult<T>` vào đó để các module sau dùng lại.)
- Nhãn nhóm: `CAM` "Biển báo cấm", `NGUY_HIEM` "Biển báo nguy hiểm và cảnh báo", `HIEU_LENH` "Biển hiệu lệnh", `CHI_DAN` "Biển chỉ dẫn", `PHU` "Biển phụ", `VACH_KE` "Vạch kẻ đường".
- Ảnh hiển thị ưu tiên: SVG trong `YARD_SIGNS` khớp `code` → `svgAsset` → `rasterAsset` → ô "Chưa có hình".

- [ ] **Step 1: Viết test** (mock `trafficSignService` bằng `vi.mock`):
  - `shows loading then signs`: hiện spinner, sau đó thẻ "R.122" và "Dừng lại".
  - `shows empty state when no sign matches`: service trả `content: []` → text "Không tìm thấy biển báo phù hợp".
  - `shows error with retry`: service reject lần 1, resolve lần 2 → có nút "Thử lại", bấm → hiện dữ liệu.
  - `debounces search input`: gõ "dung lai" → service được gọi với `q: 'dung lai'` sau 300 ms (fake timers), không gọi cho từng ký tự.
  - `marks unverified signs`: biển có `legalStatus: 'NEEDS_VERIFICATION'` hiện nhãn "Chờ xác minh" và dòng "QCVN 41:2019".
- [ ] **Step 2:** Run → FAIL. Implement page (ô tìm kiếm, chip lọc nhóm, lưới thẻ responsive, phân trang, modal chi tiết dùng `Modal` có sẵn hiển thị `meaning`, phiên bản, trạng thái). Dùng các component `components/ui` hiện có (`PageHeader`, `EmptyState`, `LoadingSpinner`, `Alert`, `StatusBadge`, `Modal`). Run → PASS; `npm run build` → thành công.
- [ ] **Step 3: Commit** `feat(frontend): add traffic sign catalog lookup page`

### Task 7: Frontend — chỉnh sửa biển báo cho quản trị

**Files:**
- Create: `frontend/src/features/traffic-signs/TrafficSignEditForm.tsx` (+ `.module.css`)
- Modify: `frontend/src/pages/TrafficSignCatalogPage.tsx` (nút "Chỉnh sửa" trong modal chi tiết chỉ hiện khi user có role `ROLE_ADMIN` hoặc `ROLE_MANAGER` — lấy từ `AuthContext` hiện có)
- Test: `frontend/src/features/traffic-signs/TrafficSignEditForm.test.tsx`

- [ ] **Step 1: Viết test:** `requires name` (để trống tên, bấm "Lưu" → "Vui lòng nhập tên biển báo", service không được gọi); `disables submit while saving` (nút "Lưu" `disabled` trong lúc promise chưa xong — chống double submit Rule 09); `saves and reports success` (gọi `update('R.122', {...legalStatus:'VERIFIED'})`, hiện "Đã cập nhật biển báo").
- [ ] **Step 2:** Run → FAIL; implement form (tên, ý nghĩa, trạng thái pháp lý dạng select 3 giá trị tiếng Việt, mã thay thế, đường dẫn SVG); run → PASS.
- [ ] **Step 3: Commit** `feat(frontend): allow admins to edit traffic sign catalog entries`

### Task 8: Cập nhật tài liệu và kiểm tra toàn bộ

**Files:**
- Modify: `docs/backlog/tasks.md`, `CHANGELOG.md` (mục Unreleased), `.rules/01-technology-stack.md` (Vitest + Testing Library cho frontend), `.rules/07-business-rules.md` (thêm `LRN-SIGN-001` [`NEEDS_VERIFICATION`]: danh mục biển báo nhập từ QCVN 41 bản 2019, chờ đối chiếu QCVN 41:2024), `docs/knowledge/database-schema-catalog.md`, `docs/knowledge/data-dictionary.md`, `docs/knowledge/database-change-log.md` (V13–V15), `docs/knowledge/legal-database-traceability.md`

- [ ] **Step 1:** Cập nhật các tài liệu trên theo format sẵn có của từng file.
- [ ] **Step 2:** Run `cd backend && ./mvnw -q test` → BUILD SUCCESS. Run `cd frontend && npm test && npm run build` → tất cả pass. Nếu không chạy được lệnh nào do môi trường, ghi rõ nguyên nhân vào tin nhắn bàn giao (AGENTS.md mục 3.5).
- [ ] **Step 3:** Khởi động bằng Docker Compose (theo `docs/deployment/local-development.md`), đăng nhập học viên, mở `/traffic-signs`: tìm "dung lai" ra R.122 với hình SVG; lọc "Biển báo nguy hiểm" có ≈ 80 biển; mở một biển có ảnh raster. Ghi kết quả thực tế.
- [ ] **Step 4: Commit** `docs: update backlog, changelog and knowledge base for traffic sign catalog`
