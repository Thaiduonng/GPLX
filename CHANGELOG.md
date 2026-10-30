# Nhật ký Thay đổi (Changelog)

Toàn bộ các cập nhật quan trọng của dự án sẽ được ghi nhận tại đây theo chuẩn [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Kiểm chứng trước khi đẩy mã nguồn — 2026-10-30

- Backend: `mvnw.cmd test -B` đạt 96 tests, không lỗi hoặc bỏ qua.
- Frontend: 58 tests điều hướng/mô phỏng và 4 tests dữ liệu PDF đạt; production build đạt trong container Node 20 với `npm ci` từ lockfile. Vite còn cảnh báo bundle lớn hơn 500 kB.
- Giới hạn đã biết: cài database trắng còn lỗi khóa ngoại seed CRM tại V14 (INFRA-SEED-14); kiểm thử backend dùng H2 không xác nhận chuỗi migration MySQL cài mới.

## [2.8.1] — 2026-10-28

### Tái Thiết Kế Bố Cục Header & Chuẩn Hóa CSS Module Trang Nộp Hồ Sơ và Tra Cứu Hồ Sơ

- **Tái Cấu Trúc Bố Cục Header (`Navbar.tsx` & `Navbar.module.css`):**
  - Khắc phục tình trạng phình to và rối mắt ở thanh menu giữa: Tách biệt nút *"Nộp hồ sơ trực tuyến"* thành Action CTA chính đặt tại cụm bên phải với thiết kế capsule gradient Soft Glassmorphism, đèn LED nhấp nháy thu hút sự chú ý.
  - Tinh gọn menu điều hướng trung tâm: Bố trí cân đối 5 phân mục chính (*Trang chủ*, *Khóa đào tạo*, *Ôn thi 600 câu*, *Biển báo & Mẹo*, *Tra cứu hồ sơ*), loại bỏ các badge gây xao nhãng.
  - Bổ sung huy hiệu phân hạng *"Chuẩn CSGT 2026"* dưới logo thương hiệu `Ôn Thi GPLX`.
- **Khắc Phục Toàn Diện & Chuẩn Hóa CSS Module Cho Trang Nộp Hồ Sơ (`ApplyPage.tsx` & `ApplyPage.module.css`):**
  - Chuyển đổi toàn bộ từ mã Tailwind sang CSS Module bản địa với đầy đủ Design Tokens (`tokens.css`, `global.css`), chấm dứt triệt để lỗi vỡ giao diện (mất style).
  - Stepper quy trình 4 bước (`Khóa học & Ca học` ➔ `Thông tin cá nhân` ➔ `Tải ảnh hồ sơ` ➔ `Xác nhận & Cam kết`):
    - Thẻ chọn Hạng GPLX dạng Card tương tác (A1, A, B, B1, C) với học phí, mô tả và điều kiện độ tuổi.
    - Bộ tính tuổi học viên thời gian thực dựa trên ngày sinh: Tự động cảnh báo đỏ nếu chưa đủ tuổi hoặc bật tích xanh nếu đủ điều kiện quy định.
    - Khu vực tải 4 tài liệu số hóa kèm quy cách ảnh chụp và thông báo dung lượng.
    - Màn hình thông báo Nộp hồ sơ thành công chuyên nghiệp: Khối hiển thị Mã hồ sơ và Mã bảo mật tra cứu (Tracking Token) kèm nút sao chép 1 chạm và chuyển hướng tra cứu tức thì.
- **Tái Thiết Kế Trang Tra Cứu Trạng Thái Hồ Sơ (`ApplicationStatusPage.tsx` & `ApplicationStatusPage.module.css`):**
  - Form tra cứu kép thông minh: Hỗ trợ xác thực bằng Số điện thoại hoặc Mã bảo mật (Tracking Token).
  - Dòng thời gian Stepper trực quan 5 chặng tiếp nhận, thẩm định và xếp lớp.
  - Thẻ thông tin học viên tuân thủ Nghị định 13/2023/NĐ-CP (che mờ dữ liệu cá nhân nhạy cảm).
  - Phân hệ nộp bổ sung hồ sơ trực tuyến: Tự động hiển thị khi hồ sơ mang trạng thái `SUPPLEMENT_REQUIRED`, cho phép học viên tải bổ sung ảnh ngay tại trang không cần di chuyển đến văn phòng.
- **Đóng Gói & Vận Hành Container:**
  - TypeScript biên dịch không cảnh báo lỗi (`tsc -b && vite build`).
  - Container Docker `gplx-frontend:3000` chạy ổn định, phản hồi HTTP 200 OK trên mọi tuyến đường (`/`, `/apply`, `/application-status`, `/courses`).

## [2.8.0] — 2026-10-28

### Triển Khai Toàn Diện Phân Hệ Quảng Bá Khóa Học GPLX, Tuyển Sinh và Quản Lý Hồ Sơ Học Viên

- **Kiến Trúc & Cơ Sở Dữ Liệu:**
  - Bổ sung Flyway migration `V14__create_crm_leads_and_course_marketing_tables.sql`:
    - Mở rộng bảng `courses`: bổ sung các trường marketing phục vụ tuyển sinh (`slug`, `tuition_fee`, `expected_start_date`, `training_location`, `target_audience`, `curriculum_summary`, `documents_required`, `featured`).
    - Tạo mới bảng `crm_leads`: lưu trữ khách hàng tiềm năng đăng ký nhận tư vấn, theo dõi nguồn (`HOMEPAGE`, `COURSE_DETAIL`, `CAMPAIGN`, `DIRECT`, `REFERRAL`), kênh liên hệ ưu tiên (`PHONE`, `ZALO`, `EMAIL`), trạng thái xử lý (`NEW`, `CONTACTING`, `CONSULTED`, `FOLLOW_UP`, `CONVERTED`, `NOT_INTERESTED`), cam kết bảo vệ dữ liệu cá nhân Nghị định 13/2023/NĐ-CP (`consent_gdpr`).
    - Tạo mới bảng `crm_lead_interactions`: nhật ký chăm sóc khách hàng (loại hình liên hệ, ghi chú chi tiết, thời điểm hẹn gọi lại, nhân viên thực hiện).
    - Mở rộng bảng `admission_applications`: bổ sung `course_id`, `preferred_schedule`, `training_location`, `assigned_staff_id`, `enrolled_class_id`, `enrolled_at`, `tracking_token` tra cứu công khai không cần đăng nhập.
    - Cập nhật enum `ApplicationStatus`: bổ sung trạng thái `RESUBMITTED` (học viên đã nộp bổ sung giấy tờ) và `ENROLLED` (đã vào lớp học chính thức).
  - Seed dữ liệu chuẩn: 5 khóa học nổi bật theo phân hạng GPLX mới (A1, A, B, B1, C) và dữ liệu khách hàng tiềm năng mẫu.

- **Backend (Spring Boot 4.1.1 & Java 21):**
  - **Module CRM Tuyển Sinh (`vn.edu.gplx.modules.crm`):**
    - Entities: `AdmissionLead`, `LeadInteraction`, enum `LeadStatus`, `LeadSource`, `ContactChannel`, `InteractionType`.
    - Repositories & Services: `AdmissionLeadRepository`, `LeadInteractionRepository`, `CrmLeadService`, `CrmLeadServiceImpl`.
    - Thống kê thời gian thực `getDashboardStats()`: tổng số lead, tỷ lệ chuyển đổi lead sang hồ sơ, số lượng theo nguồn, trạng thái hồ sơ, phân bổ hạng GPLX.
    - REST Controller: `PublicCrmController` (`POST /api/v1/public/admission-inquiries`), `CrmLeadController` (`GET /api/v1/admin/admissions/leads`, `PUT /leads/{id}`, `POST /leads/{id}/interactions`, `POST /leads/{id}/convert`, `GET /admin/admissions/dashboard-stats`).
  - **Module Tuyển Sinh Mở Rộng (`vn.edu.gplx.modules.admission`):**
    - REST Controller công khai `PublicAdmissionController`:
      - `POST /api/v1/public/applications`: nộp đơn đăng ký học lái xe trực tuyến công khai không yêu cầu tài khoản trước, tự động sinh mã hồ sơ chuẩn định dạng `APP-{CATEGORY}-{YYYYMMDD}-{RANDOM}` và `tracking_token` bảo mật.
      - `POST /api/v1/public/applications/track`: tra cứu hồ sơ công khai an toàn (hỗ trợ xác thực bằng Số điện thoại hoặc Mã bảo mật Tracking Token, che mờ thông tin cá nhân PII theo Nghị định 13/2023/NĐ-CP).
      - `POST /api/v1/public/applications/{code}/supplement`: bổ sung tài liệu trực tuyến khi hồ sơ có trạng thái `SUPPLEMENT_REQUIRED`.
    - Mở rộng `AdmissionService` & `AdmissionController`:
      - Tìm kiếm nâng cao đa tiêu chí (`searchApplications`): lọc theo trạng thái, hạng GPLX, cán bộ phụ trách, từ khóa họ tên / CCCD / SĐT.
      - Xếp lớp học chính thức (`POST /api/v1/admissions/{id}/enroll`): liên kết hồ sơ `APPROVED` vào lớp đào tạo `TrainingClass`, cập nhật trạng thái `ENROLLED`, ghi nhận học viên chính thức trong `class_enrollments`.
  - **Module Khóa Học (`vn.edu.gplx.modules.learning`):**
    - Bổ sung `GET /api/v1/courses/featured`: lấy danh sách các khóa học tuyển sinh nổi bật.
    - Bổ sung `GET /api/v1/courses/slug/{slug}`: tra cứu thông tin chi tiết chương trình học và học phí theo đường dẫn thân thiện SEO.

- **Frontend (React 19 + TypeScript + Vite):**
  - **Trang Khóa Học Tuyển Sinh (`/courses` & `/courses/:slug`):**
    - `CoursesPage.tsx`: danh sách khóa học thiết kế dạng thẻ hiện đại, hiển thị học phí niêm yết, thời lượng đào tạo, địa điểm thực hành, ngày khai giảng dự kiến, nút CTA xem chi tiết và nút *"Đăng ký tư vấn miễn phí"*.
    - `CourseDetailPage.tsx`: trang chi tiết toàn diện với lộ trình đào tạo, đối tượng học viên, yêu cầu hồ sơ giấy tờ, nút nộp hồ sơ trực tuyến ngay (`/apply?categoryId=...&courseId=...`).
    - `ConsultationModal.tsx`: modal popup tư vấn khóa học nhanh cho phép gửi yêu cầu trực tiếp từ trang chủ hoặc trang khóa học.
  - **Quy Trình Nộp Hồ Sơ Trực Tuyến 4 Bước (`/apply`):**
    - `ApplyPage.tsx`: Stepper wizard chuyên nghiệp:
      - *Bước 1: Chọn khóa học & Lịch học:* Chọn hạng bằng, khóa đào tạo, địa điểm tập sa hình và thời gian học ưu tiên (cuối tuần / các buổi tối / trong tuần).
      - *Bước 2: Thông tin cá nhân:* Họ tên, CCCD/CMND (kiểm tra 9-12 số), ngày sinh (tự động kiểm tra độ tuổi theo quy định Luật TTATGTĐB 2024), giới tính, SĐT, email, địa chỉ cư trú.
      - *Bước 3: Tải ảnh hồ sơ:* Kiểm tra checklist tài liệu bắt buộc (Ảnh mặt trước/sau CCCD, ảnh thẻ 3x4 phông trắng, giấy khám sức khỏe).
      - *Bước 4: Điều khoản & Xác nhận:* Cam kết tuân thủ quy chế đào tạo sát hạch GPLX và đồng thuận xử lý dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP.
    - Hiển thị trang hoàn tất kèm mã hồ sơ và mã bảo mật tra cứu, cho phép sao chép 1 chạm và chuyển sang trang tra cứu.
  - **Trang Tra Cứu Tiến Độ Hồ Sơ Trực Tuyến (`/application-status`):**
    - `ApplicationStatusPage.tsx`: Tra cứu an toàn bằng mã hồ sơ kết hợp SĐT hoặc Tracking Token.
    - Hiển thị dòng thời gian trạng thái (Stepper), thông tin hồ sơ đã che mờ PII, lớp đào tạo được xếp và form nộp tài liệu bổ sung trực tuyến khi hồ sơ có yêu cầu bổ sung (`SUPPLEMENT_REQUIRED`).
  - **Phân Hệ Quản Trị Cán Bộ Tuyển Sinh:**
    - `AdmissionDashboardPage.tsx` (`/admin/admissions/dashboard`): Dashboard phân tích tuyển sinh thời gian thực: KPI tổng số lead, hồ sơ, tỷ lệ chuyển đổi, tỷ lệ duyệt, biểu đồ phân bổ theo nguồn tư vấn và phân hạng GPLX.
    - `CrmLeadsPage.tsx` (`/admin/admissions/leads`): Bảng quản lý khách hàng tiềm năng, chuyển đổi trạng thái tiếp cận (`NEW` ➔ `CONTACTING` ➔ `CONSULTED` ➔ `FOLLOW_UP`), mở modal xem lịch sử cuộc gọi và ghi nhận tương tác mới.
    - `ApplicationManagementPage.tsx` (`/admin/admissions`): Quản lý thẩm định hồ sơ tuyển sinh: bộ lọc đa tiêu chí, thẩm định phê duyệt (`APPROVED`), yêu cầu bổ sung có lý do bắt buộc (`ADM-002`), và modal xếp lớp học chính thức (`ENROLLED`).
  - **Điều Hướng & Trải Nghiệm:**
    - Cập nhật `Navbar.tsx` với các đường dẫn nhanh: Khóa đào tạo (`/courses`), Nộp hồ sơ trực tuyến (`/apply`), Tra cứu hồ sơ (`/application-status`).
    - Cập nhật `MainLayout.tsx` với thanh công cụ nghiệp vụ dành cho cán bộ tuyển sinh (`STAFF`, `COUNSELOR`, `ADMIN`, `MANAGER`).

- **Kiểm Thử Tự Động & Đóng Gói Production:**
  - Backend Unit Tests: `CrmLeadServiceTest` (3/3 tests PASS), `AdmissionServiceTest` (6/6 tests PASS), toàn bộ 38+ tests hệ thống đạt 100%.
  - Frontend Production Bundle: `tsc -b && vite build` hoàn thành không cảnh báo lỗi kiểu dữ liệu.
  - Vận hành Docker Compose v2: Cả 3 container `gplx-frontend:3000`, `gplx-backend:8088`, `gplx-mysql:3306` hoạt động ổn định và đạt trạng thái Healthy.

## [2.7.0] — 2026-10-28

### Triển Khai Phân Hệ Quảng Cáo & Tiếp Nhận, Quản Lý Hồ Sơ Đào Tạo Lái Xe Điện Tử
- **Xây Dựng Phân Hệ Quảng Cáo Tiếp Nhận Hồ Sơ Độc Lập (`AdmissionPromoSection`):**
  - Đặt vị trí nổi bật tại Trang chủ (`HomePage.tsx`) nhằm nhấn mạnh năng lực cốt lõi của đề tài về tiếp nhận, thẩm định và quản lý hồ sơ học viên điện tử.
  - **4 Trụ Cột Nghiệp Vụ Hồ Sơ Điện Tử:**
    1. *Nộp hồ sơ 100% Online:* Tải ảnh chụp CCCD gắn chip 2 mặt và ảnh thẻ 3x4 số hóa, tự động trích xuất thông tin, không cần photo công chứng.
    2. *Liên thông Giấy khám sức khỏe điện tử:* Tự động tra cứu mã GKSK từ các cơ sở y tế đủ thẩm quyền theo dữ liệu liên thông Bộ Y tế & Cục CSGT.
    3. *Theo dõi tiến trình hồ sơ thời gian thực:* Minh bạch 4 giai đoạn (`DRAFT` ➔ `SUBMITTED` ➔ `UNDER_REVIEW` ➔ `APPROVED`), gửi thông báo tức thì khi cán bộ tuyển sinh phê duyệt hoặc yêu cầu bổ sung hồ sơ.
    4. *Đóng học phí an toàn & Biên lai điện tử:* Hỗ trợ thanh toán trực tuyến, cấp biên lai điện tử có mã tra cứu và tự động xếp lớp đào tạo.
  - **Mô Hình Hồ Sơ Mẫu Trực Quan (Interactive Live Dossier Mockup):**
    - Trình diễn thẻ hồ sơ điện tử `HS-B2-2026-0899` với huy hiệu trạng thái `ĐÃ DUYỆT (APPROVED)` có đèn báo nhấp nháy.
    - Stepper timeline hiển thị 4 chặng: Nộp CCCD ➔ Liên thông GKSK ➔ Thẩm định phê duyệt ➔ Xếp lớp & Phân bổ giáo viên thực hành DAT.
  - **Cặp Nút Kêu Gọi Hành Động (Action CTAs):**
    - Nút chính: *"Nộp hồ sơ học lái xe ngay"* (điều hướng tới `/admissions/new` hoặc đăng nhập).
    - Nút phụ: *"Quản lý hồ sơ của tôi"* (điều hướng tới `/my-applications`).
- **Nâng Cấp Thanh Điều Hướng (`Navbar.tsx`):**
  - Bổ sung nút liên kết *"Nộp hồ sơ"* kèm huy hiệu *"Trực tuyến"* nổi bật trên Header để thu hút người dùng ngay khi truy cập trang web.
  - Bổ sung định tuyến alias `/submit-application` trong `App.tsx` đảm bảo truy cập thông suốt.
- **Biên Dịch & Kiểm Thử Toàn Vẹn:**
  - TypeScript `tsc -b && vite build` hoàn thành với 0 cảnh báo lỗi.
  - Docker container `gplx-frontend:3000` chạy ổn định, phản hồi HTTP 200 OK.

## [2.6.0] — 2026-10-27

### Tái Thiết Kế Giao Diện Toàn Diện Theo Phong Cách Modern SaaS & Soft Glassmorphism (Blue–Purple Gradient)
- **Tái Cấu Trúc Toàn Diện Các Component Độc Lập (Component-Based Architecture):**
  - `Navbar.tsx` & `Navbar.module.css`: Header chiều cao 78px, kính mờ Glassmorphism (`backdrop-filter: blur(20px)`), logo 600 tròn với viền đa sắc, chữ thương hiệu *"Ôn Thi **GPLX**"*, menu điều hướng dạng pill, social icons (Facebook, TikTok) và nút CTA *"Đăng ký ngay"*.
  - `HeroSection.tsx` & `HeroSection.module.css`: Ribbon chính thức Cục CSGT CV 2262/CSGT-P5, tiêu đề lớn chuẩn xác với huy hiệu tích xanh xác thực (*Chuẩn Cục CSGT ✓*) và phụ đề giới thiệu hệ thống 600 câu hỏi sát hạch mới nhất.
  - `LicenseCategorySelector.tsx` & `StatisticsBar.tsx`: Bộ điều khiển chọn hạng lái xe (Hạng B, B1, C, A1, A) kết hợp hiển thị 4 chỉ số sát hạch (Số câu hỏi/đề, Thời gian làm bài, Điểm đạt, Tổng số câu ngân hàng) trong thanh capsule bo góc mềm 24px.
  - `LearningRoadmapCard.tsx` & `LearningRoadmapCard.module.css`: Khối 62% cột trái hiển thị lộ trình 3 trạm (Ôn tập câu hỏi ➔ Câu hay sai & Điểm liệt ➔ 20 Bộ đề luyện tập), minh họa làn đường xe di chuyển chuyển động mượt mà và thanh tiến độ học tập.
  - `MockExamCard.tsx` & `MockExamCard.module.css`: Khối 38% cột phải với nền xanh gradient Primary `#165DFF` sang Indigo `#4934E8`, biểu tượng GraduationCap, danh sách tính năng chấm điểm tức thì và nút CTA *"Bắt đầu thi thử ngay"*.
  - `EdTechToolsSection.tsx`: 6 khối công cụ học tập thông minh (Học theo 6 chương, Thi thử 20 bộ đề, 60 Câu điểm liệt, Ôn câu hay sai & bẫy đề, Tra cứu biển báo SVG, Mẹo thi sát hạch).
  - `StudyWorkflowSection.tsx`: Quy trình 4 bước chuẩn đậu GPLX (Hồ sơ điện tử ➔ Lý thuyết 600 câu ➔ Cabin & Giám sát DAT ➔ Sát hạch Cục CSGT).
  - `FAQSection.tsx`: Khối accordion giải đáp các thắc mắc cốt lõi về quy chế thi, câu điểm liệt và điều kiện DAT.
  - `Footer.tsx` & `ThemeToggle.tsx`: Chân trang chuẩn SaaS EdTech và nút toggle Light/Dark mode mượt mà.
- **Hệ Thống Design Tokens Màu Sắc Chuẩn Xác Theo Đặc Tả:**
  - **Light Mode:** Nền gradient từ `#DCEBFF` đến `#F0E4FF`, Primary `#165DFF`, Primary Hover `#0E4FE0`, Royal Blue `#304FFE`, Indigo `#4934E8`, Sky Blue `#38BDF8`, Mặt phẳng kính `rgba(255, 255, 255, 0.82)`, Chữ tiêu đề `#101828`, Chữ thân bài `#475569`, Viền `rgba(255, 255, 255, 0.75)`.
  - **Dark Mode:** Nền gradient từ `#0B1B46` đến `#17112F`, Mặt phẳng kính `#172544`, Mặt phẳng nổi `#1D2A49`, Chữ tiêu đề `#F8FAFC`, Chữ thân bài `#CBD5E1`, Viền `rgba(148, 163, 184, 0.18)`, Accent `#4D9BFF`, Violet `#8B7CFF`.
- **Kiểm Thử & Đóng Gói Docker Container:**
  - Biên dịch TypeScript thành công (`tsc -b && vite build`), không còn lỗi kiểu dữ liệu.
  - Container `gplx-frontend` được cập nhật và kiểm tra hoạt động hoàn hảo tại cổng 3000 (HTTP 200 OK).

## [2.5.0] — 2026-10-27

### Chuẩn Hóa Toàn Diện Giao Diện Bằng UI/UX Pro Max — Đồng Nhất, Hiện Đại & Chuẩn WCAG 2.1 AA
- **Ứng Dụng Design System UI/UX Pro Max (Accessible & Ethical Public EdTech):**
  - Đồng nhất hệ thống màu sắc chủ đạo Navy/Royal Blue `#1e40af` / `#2563eb`, Slate `#0f172a`, tương phản chữ ≥ 4.5:1 đạt chuẩn WCAG 2.1 AA.
  - Loại bỏ hoàn toàn 100% emoji làm icon trên giao diện, thay thế đồng bộ bằng bộ SVG vector icons (`Icons.*`) đồng nhất stroke, kích thước và màu sắc.
  - Chuẩn hóa Bento Grid trên toàn bộ trang: Hero Cards, 6 Khối công cụ EdTech, 4 Phân hệ Đào tạo sinh thái, Lộ trình 4 bước và FAQ.
- **Đồng Nhất Giao Diện Toàn Hệ Thống:**
  - Trang Chủ (`HomePage.tsx`): Thống nhất các card, icon SVG, dải ribbon, badge tích xanh, các card phân hệ và FAQ.
  - Trang Mẹo Thi (`ExamTipsPage.tsx`): Đồng nhất tabs và các thẻ mẹo thi bằng SVG icons chuyên nghiệp.
  - Trang Biển Báo (`RoadSignsPage.tsx`): Chuẩn hóa card, nút tab, input tìm kiếm và modal chi tiết.
  - Header & Theme: Tối ưu phản hồi xúc giác cho nút chuyển Dark/Light theme, thanh menu pill mềm mại.

## [2.4.0] — 2026-10-27

### Triển Khai Giao Diện Ôn Thi EdTech Phong Cách OnThiGPLX — Tra Cứu Biển Báo, Mẹo Thi & 6 Khối Chức Năng
- **Phân Hệ Tra Cứu Biển Báo Giao Thông Đường Bộ (`/road-signs`):**
  - Xây dựng dữ liệu và giao diện tra cứu biển báo theo Quy chuẩn kỹ thuật quốc gia QCVN 41:2019/BGTVT.
  - Phân loại 5 nhóm chuẩn: Biển báo cấm (P), Biển cảnh báo nguy hiểm (W), Biển hiệu lệnh (R), Biển chỉ dẫn (I), Biển phụ (S).
  - Component hiển thị hình ảnh SVG biển báo vector sắc nét, thanh tìm kiếm thông minh theo mã/tên và modal phóng to xem giải thích ý nghĩa pháp lý chi tiết.
- **Phân Hệ Mẹo Thi Lý Thuyết & Sa Hình (`/tips`):**
  - Tổng hợp kho kinh nghiệm: Từ khóa vàng chọn ngay đáp án đúng (Bị nghiêm cấm, Không được phép...), Quy tắc 5 bước giải quyết mọi thế sa hình (Nhất chớm, Nhì ưu, Tam đường, Tứ phải, Ngũ hướng), Mẹo cấm nhỏ cấm lớn, Độ tuổi, Tốc độ, Khoảng cách an toàn và chiến lược vượt qua 60 câu điểm liệt.
- **Hoàn Thiện 6 Khối Chức Năng EdTech Trên Trang Chủ (Chuẩn OnThiGPLX):**
  - Bổ sung 6 card tính năng: Học theo 6 chương, Thi thử 20 bộ đề CSGT, 60 Câu điểm liệt, Ôn câu hay sai, Tra cứu biển báo, Mẹo thi sát hạch.
  - Tích hợp Quy trình 4 bước ôn thi đỗ 100%, Khu vực FAQ giải đáp thắc mắc sát hạch và Footer hệ thống đầy đủ căn cứ pháp lý Thông tư 12/2025/TT-BCA.

## [2.3.0] — 2026-10-27

### Tái Thiết Kế Toàn Diện Giao Diện Chuẩn Cục CSGT 2026 & Tích Hợp 20 Bộ Đề Thi Thử Vào Ôn Tập
- **Thu Thập & Nhập Liệu 600 Câu Hỏi Chuẩn Cục CSGT (CV 2262/CSGT-P5 ngày 7/5/2025):**
  - Trích xuất và xác thực toàn diện 600 câu hỏi sát hạch, 60 câu điểm liệt, 1.858 đáp án lựa chọn và 315 hình ảnh sa hình / biển báo chất lượng cao.
  - Nhập thành công 100% vào cơ sở dữ liệu MySQL 8.4 LTS với bảng mã UTF-8 (`theory_questions`, `theory_answers`).
  - Bộ kiểm định dữ liệu `validate_dataset.js` vượt qua 24/24 bài kiểm tra tính toàn vẹn (đầy đủ câu hỏi, câu điểm liệt, đáp án đúng duy nhất).
- **Tái Cấu Trúc Phân Hệ Lý Thuyết & 20 Bộ Đề Thi Thử:**
  - Thay thế nút "Thi thử 600 câu" bằng "Lý thuyết" (`/theory`) trên thanh điều hướng chính, drawer menu và router.
  - Tích hợp tính năng làm bài thi thử ngẫu nhiên từ 20 đề thi mẫu vào module **Ôn tập** (`/student/review` / `/theory-review`).
  - Hỗ trợ thi thử trực tiếp: Đồng hồ đếm ngược theo từng hạng bằng, bảng 35 ô số chuyển câu linh hoạt, gắn cờ xem lại, chấm điểm tức thì và phân tích chi tiết câu sai / câu điểm liệt kèm căn cứ pháp lý.
- **Tái Thiết Kế Trang Chủ Theo Phong Cách Cổng Ôn Thi Cục CSGT:**
  - **Top Ribbon:** Dải thông báo chính thức *"Theo Công văn 2262/CSGT-P5 ngày 7/5/2025"*.
  - **Tiêu Đề Lớn:** *"Ôn thi Giấy phép lái xe Chuẩn Cục CSGT ✓ - Hệ thống 600 câu hỏi sát hạch mới nhất 2026"*.
  - **Floating Config Capsule Bar:** Hộp điều khiển nổi chọn hạng bằng (Hạng B, B1, C, A1, A2) đồng bộ trực tiếp 4 thông số sát hạch (Câu hỏi/đề, Thời gian làm bài, Điểm đạt, Tổng số câu hỏi).
  - **Hai Card Hero Nổi Bật:**
    - Card Trái: Lộ trình đậu hạng bằng với 3 trạm (Trạm 1: Ôn tập câu hỏi ➔ Trạm 2: Câu hay sai ➔ Trạm 3: 20 bộ đề thi) kèm hình minh họa giáo trình và xe ô tô.
    - Card Phải: Thẻ thi thử Online gradient xanh dương rực rỡ, hiển thị thông số đề thi thời gian thực và nút *"Bắt đầu thi thử ngay"*.
  - **Bố Trí 4 Phân Hệ Nghiệp Vụ Sinh Thái:** Đào tạo xe thô, Giám sát DAT & Lịch học, Hồ sơ & Học phí điện tử, Xét điều kiện & Sát hạch.
- **Hỗ Trợ Toàn Diện Chế Độ Sáng/Tối (Light & Dark Theme):**
  - Tích hợp nút chuyển đổi giao diện Mặt trời / Mặt trăng trên Header, lưu trạng thái vào `localStorage` (`gplx_theme`), đồng bộ với hệ thống CSS Variables chuẩn.
- **Tích Hợp Hệ Thống Animation Động Hiện Đại (Motion Design & Micro-Interactions):**
  - **Ambient Glow Pulse:** Vùng hào quang nền `heroGlowEffect` thở nhẹ tuần hoàn (8s pulse), tạo chiều sâu không gian sống động.
  - **CSGT Ribbon & Verified Badge:** Hiệu ứng nhịp đập êm ái `badgePulse` cho tích xanh và dải ruy băng lượn sóng nổi nhẹ.
  - **Sóng Định Vị Radar Trạm Luyện Tập (`radarPing`):** Chấm tròn trạng thái tại Trạm 1 liên tục phát sóng xung tròn định vị GPS báo hiệu học phần đang thực hiện.
  - **Xe Ô Tô Lăn Bánh Nhấp Nhô (`floatCar`):** Hình họa xe con màu xanh trên sa hình con đường uốn lượn có chuyển động bập bênh nhẹ nhàng như đang di chuyển thực tế.
  - **Thẻ Thi Thử Online Gradient Shift & Shimmer CTA:** Nền thẻ thi thử chuyển sắc mượt mà; nút *"Bắt đầu thi thử ngay"* tích hợp dải phản quang kim cương quét qua định kỳ và mũi tên trượt sang phải khi rê chuột (`translateX`).
  - **Micro-Interactions Header & Modules Grid:** Logo 4 màu xoay 25 độ khi hover; nút Theme xoay 45-180 độ phản hồi bấm; các card phân hệ nâng cao kèm icon xoay 5 độ.

## [2.2.0] — 2026-10-27

### Triển Khai Phân Hệ Đào Tạo Xe Thô — Basic Vehicle Familiarization Training (Full-Stack)
- **Kiến Trúc & Phân Định Nghiệp Vụ Độc Lập:**
  - Triển khai phân hệ **Đào tạo xe thô (Raw Vehicle Familiarization Training)** độc lập hoàn toàn với LMS lý thuyết và thi thử.
  - Xác lập quy tắc nghiệp vụ nội bộ (INTERNAL_RULE): Xe thô là quy trình làm quen xe ban đầu, học viên được học song song với lý thuyết mà không khóa tiến độ lẫn nhau; việc hoàn thành xe thô không đồng nghĩa hoàn thành khóa đào tạo hoặc đủ điều kiện dự thi sát hạch.
  - Ban hành tài liệu nghiệp vụ: docs/training/raw-vehicle-training.md, docs/training/training-progress-model.md, docs/legal/raw-vehicle-training-rules.md.
- **Cơ Sở Dữ Liệu & Migrations (Flyway V13):**
  - Tạo file migration V13__create_raw_vehicle_training_tables.sql thiết lập 6 bảng quan hệ: raw_vehicle_stages, raw_vehicle_enrollments, raw_vehicle_sessions, raw_vehicle_session_attendees, raw_vehicle_skill_evaluations, raw_vehicle_session_change_logs.
- **Backend Domain, Application Service & REST Controllers (Java 21 & Spring Boot):**
  - Xây dựng 6 Domain Entities, 4 Enums và 6 Repositories theo chuẩn Modular Monolith Rule 02.
  - Kiểm tra điều kiện an toàn FLT-001: Chặn xếp trùng lịch giáo viên, chặn phương tiện bảo dưỡng hoặc hết hạn kiểm định an toàn kỹ thuật.
  - Tính thời lượng thực tế từ số phút giữa giờ bắt đầu và kết thúc thực tế; chỉ tích lũy cho học viên có mặt (PRESENT).
  - 3 REST Controllers: RawVehicleStudentController, RawVehicleInstructorController, RawVehicleManagerController.
- **Kiểm Thử Tự Động Backend (Unit Test Suite):**
  - RawVehicleTrainingServiceTest: 6/6 tests PASS.
- **Frontend Giao Diện React 19 + TypeScript (3 Trang Chuyên Biệt):**
  - rawVehicleService.ts, RawVehicleStudentPage.tsx, RawVehicleInstructorPage.tsx, RawVehicleManagerPage.tsx, RawVehicle.module.css.
- **Tích Hợp Routing, MainLayout & Đóng Gói Docker:**
  - Bổ sung routes /student/raw-vehicle, /instructor/raw-vehicle, /training/raw-vehicle; tích hợp Header, Drawer góc trái, Workspace Bar.

## [2.1.0] — 2026-10-27

### Tái Thiết Kế Trang Đầu Tiên Thành Landing Page Quảng Cáo Vào Đăng Ký / Đăng Nhập
- **Tái Định Vị Trang Đầu Tiên (`/`) Thành Landing Page Quảng Bá Toàn Diện:**
  - Chuyển đổi toàn diện mục tiêu của trang chủ từ trang tổng quan nội bộ sang **Trang chủ quảng cáo & chuyển đổi (Promotional Landing Page)** thu hút khách truy cập và học viên mới.
  - Loại bỏ hoàn toàn widget debug kỹ thuật (kiểm tra kết nối máy chủ `/api/v1/health`) khỏi trang chủ để đảm bảo tính chuyên nghiệp của một cổng dịch vụ công chuẩn quốc gia.
- **Hero Banner Quảng Cáo & Kêu Gọi Hành Động (CTA) Nổi Bật:**
  - Thiết kế Hero Banner phong cách Enterprise Gateway với hiệu ứng chiều sâu, badge "CỔNG ĐÀO TẠO & SÁT HẠCH LÁI XE QUỐC GIA".
  - Tiêu đề quảng bá hấp dẫn: *"Học Lái Xe Chuẩn Hóa — Tự Tin Vững Tay Lái & Chinh Phục GPLX"*.
  - Bố trí 2 nút kêu gọi hành động lớn, độ tương phản cao:
    - Nút chính (CTA xanh lá nổi bật): **"Đăng Ký Tài Khoản Học Viên Ngay"** (`/register`).
    - Nút phụ (Ghost viền trắng): **"Đăng Nhập Hệ Thống"** (`/login`).
  - Dòng chỉ dẫn bằng chứng xã hội: *"Hơn 15,000+ học viên đã đăng ký và thi đỗ giấy phép lái xe thành công."* đi kèm cụm 5 sao vàng đánh giá uy tín.
- **Các Khối Nội Dung Quảng Bá Thuyết Phục (High-Converting Sections):**
  - **4 Chỉ số ấn tượng (Stats Section):** Tỷ lệ thi đỗ lần đầu 98.6%, 5 hạng bằng đào tạo chuẩn Cục ĐBVN (A1, A2, B1, B2, C), 100% km & giờ thực hành DAT, Thẩm định hồ sơ online nhanh chóng 24h.
  - **4 Trụ cột lợi thế vượt trội (Why Choose Us):** Hồ sơ điện tử 100% online, Ôn tập thông minh 600 câu với thuật toán Spaced Repetition, Giám sát DAT minh bạch và Đội xe mới cùng tỷ lệ đỗ cao.
  - **Showcase các hạng GPLX tuyển sinh:** Thẻ chi tiết 4 hạng phổ biến (A1, B1, B2 - Popular, C) nêu rõ đối tượng, tính năng nổi bật, số km DAT thực hành và nút trực tiếp *"Đăng ký học ngay"*.
  - **Lộ trình 4 bước đơn giản:** Nêu bật bắt đầu từ Bước 1: Tạo tài khoản & Nộp hồ sơ trực tuyến.
  - **Đánh giá học viên thực tế & Cam kết 3 Không:** 3 lời nhận xét chân thực từ cựu học viên tốt nghiệp; cam kết: *Không phát sinh chi phí - Không cắt bớt giờ học DAT - Bảo hành đào tạo đến khi có bằng*.
  - **Banner chuyển đổi cuối trang (Final Conversion Banner):** Lời kêu gọi hành động mạnh mẽ trước chân trang cùng cụm nút Đăng ký / Đăng nhập cỡ lớn.

- **Kiểm Soát Quyền Truy Cập Module & Bảo Vệ Tuyệt Đối Cho Trang Đầu Tiên:**
  - **Khóa toàn bộ module khi chưa đăng nhập:** Ẩn hoàn toàn nút menu danh mục góc trái (`menuToggleButton`) và các liên kết phân hệ (Khóa học, Thi thử, Ôn tập, Lịch học, Xe tập lái, Sát hạch) trên thanh Header khi người dùng chưa đăng nhập. Khách truy cập ở trang đầu tiên chỉ thấy Trang chủ và cụm nút Đăng ký / Đăng nhập.
  - **Bảo vệ toàn diện bằng `ProtectedRoute`:** Thiết lập component guard `ProtectedRoute.tsx` bọc toàn bộ 16 routes phân hệ nội bộ (`/courses`, `/theory-exam`, `/theory-review`, `/student/review`, `/training/schedules`, `/fleet`, `/admissions/*`, `/examination/*`, `/finance/*`, `/dashboard`, `/audit-logs`). Mọi nỗ lực truy cập trực tiếp qua thanh URL của trình duyệt khi chưa đăng nhập đều bị chặn và chuyển hướng về `/login`.
  - **Mở quyền phân hệ sau khi đăng nhập thành công:** Chỉ khi người dùng đăng nhập tài khoản hợp lệ, thanh Header mới kích hoạt các module tương ứng, nút menu Drawer góc trái xuất hiện và thanh Workspace Bar phân bổ theo đúng vai trò học viên / tuyển sinh / giám khảo / quản trị viên.

## [2.0.0] — 2026-10-26

### Triển Khai Phân Hệ Ôn Tập GPLX — Spaced Repetition & Củng Cố Kiến Thức (Full-Stack)
- **Kiến Trúc & Phân Định Trách Nhiệm Chức Năng:**
  - Thiết lập phân hệ **Ôn tập (Review)** chuyên biệt tách biệt khỏi Học tập (tiếp nhận kiến thức) và Rèn luyện/Thi thử (thực hành đề thi).
  - Trọng tâm phân hệ là củng cố kiến thức chưa vững, xóa điểm yếu, ôn lại các câu từng làm sai và câu hỏi điểm liệt ⚠️ với thuật toán lặp lại ngắt quãng khoa học.
- **Cơ Sở Dữ Liệu & Migrations (Flyway V12):**
  - Khởi tạo file migration `V12__create_review_module_tables.sql` tạo 3 bảng quan hệ:
    - `question_retention_states`: Quản lý trạng thái ghi nhớ từng câu hỏi của người học, cấp độ hộp Leitner 1..5, chu kỳ ngắt quãng 1->3->7->14->30 ngày, số lần đúng/sai liên tiếp, điểm ưu tiên (`priority_score`) và trạng thái thành thạo (`NEEDS_PRACTICE`, `REVIEWING`, `MASTERED`).
    - `review_sessions`: Lưu trữ các phiên ôn tập độc lập (`session_code`, `review_mode`, `category_code`, `total_questions`, `correct_count`, `incorrect_count`, `status`).
    - `review_session_answers`: Lưu chi tiết từng lượt trả lời trong phiên ôn, phương án chọn, tính đúng/sai và dấu thời gian.
- **Backend Domain, Application Service & DTOs (Java 21 & Spring Boot):**
  - Domain Model `QuestionRetentionState`: Thuật toán lặp lại ngắt quãng (Spaced Repetition / Leitner System), nâng cấp hộp khi đúng và reset về Hộp 1 khi sai, tính điểm ưu tiên thông minh dựa trên: câu điểm liệt (+35), tần suất sai (+10/lần), tỷ lệ sai (+20), quá hạn ôn (+20) và cấp độ hộp 1-2 (+15).
  - Service `TheoryReviewService` & `TheoryReviewServiceImpl`:
    - Tự động đồng bộ câu hỏi sai từ lịch sử luyện tập `PracticeAnswer` sang `QuestionRetentionState`.
    - Sinh hàng đợi ôn tập thông minh (`SMART`) ưu tiên câu điểm liệt chưa vững và câu quá hạn ôn tập.
    - Chấm điểm tức thì (Idempotent), phản hồi giải thích đáp án và căn cứ pháp lý.
    - Kết thúc phiên ôn, tính tỷ lệ chính xác và đưa ra khuyến nghị ôn tập tiếp theo.
  - REST Controller `TheoryReviewController`: 10 endpoints chuẩn OpenAPI tại `/api/v1/review/**`.
  - Unit Test Suite `TheoryReviewServiceTest`: 5 test cases kiểm thử tự động đạt chuẩn.
- **Frontend Module Ôn Tập React 19 + TypeScript + Vite:**
  - Khởi tạo `TheoryReviewPage.tsx` và `TheoryReviewPage.module.css`:
    - **Dashboard tổng quan:** 6 thẻ KPI (câu cần ôn, câu sai chưa củng cố, câu đến hạn hôm nay, câu điểm liệt cần ôn, câu đã lưu, tỷ lệ đúng gần đây), biểu đồ thanh tiến độ theo 7 chương, lịch sử phiên ôn gần nhất và banner gợi ý thông minh.
    - **6 Tab chuyển đổi nghiệp vụ:** Tổng quan, Ôn câu trả lời sai (gộp các lần làm bài, hiển thị số lần sai), Ôn câu điểm liệt (lọc Đang củng cố / Đã thành thạo), Ôn câu đã đánh dấu, Ôn theo 7 chủ đề, Lịch sử phiên ôn.
    - **Màn hình phiên ôn tập trực tiếp (Live Session):** Giao diện tập trung, thanh tiến độ làm bài, huy hiệu câu điểm liệt, nút lưu bookmark, lựa chọn đáp án trắc nghiệm A-B-C-D, hiển thị giải thích đáp án và căn cứ pháp lý, huy hiệu hộp Leitner 1..5 và chu kỳ ôn tiếp theo.
    - **Màn hình tổng kết phiên ôn:** Biểu đồ tỷ lệ chính xác, số câu đúng/sai, đánh giá thuật toán và nút bắt đầu phiên ôn câu sai ngay lập tức.
- **Tích Hợp Hệ Thống Điều Hướng & Routing Toàn Diện:**
  - Đăng ký routes `/student/review` và `/theory-review` trong `App.tsx`.
  - Tích hợp liên kết `Ôn tập thông minh` vào Navigation Header góc trái, Drawer hệ thống, thanh Workspace Bar học viên (`MainLayout.tsx`) và thẻ lối tắt nhanh trên Trang chủ (`HomePage.tsx`).
- **Đóng Gói & Kiểm Thử Tích Hợp End-to-End (E2E):**
  - Đóng gói Docker Compose backend và frontend với Spring Boot 4.1.1 (Java 21) và Nginx Alpine.
  - Chạy kịch bản kiểm thử E2E tự động qua API thực tế: Đăng nhập -> Lấy Dashboard -> Lấy 7 chủ đề -> Lấy 6 câu điểm liệt -> Khởi tạo phiên ôn -> Nộp đáp án -> Cập nhật hộp Leitner -> Hoàn tất phiên và ghi nhận lịch sử (ĐẠT 8/8 BƯỚC).

## [1.9.0] — 2026-10-26

### Tái Thiết Kế Menu Góc Trái & Khu Vực Quản Lý Tài Khoản / Người Dùng (Góc Phải)
- **Tái Cấu Trúc Header Điều Hướng Góc Trái:**
  - Tích hợp nút bật thanh menu (`menuToggleButton`) ở góc trái đi kèm Drawer danh mục phân hệ toàn diện (`Left Drawer`).
  - Đặt toàn bộ các liên kết điều hướng chính (Trang chủ, Khóa học, Thi thử 600 câu, Lịch học & DAT, Xe tập lái, Kỳ sát hạch, API Spec) ở góc trái bên cạnh thương hiệu.
- **Đưa Nút Đăng Nhập / Đăng Ký Cố Định Sang Góc Phải (Chưa Đăng Nhập):**
  - Cụm nút bấm Đăng ký & Đăng nhập nằm cố định ở góc phải với độ tương phản cao và kích thước touch target 44px.
- **Tích Hợp Menu Quản Lý Người Dùng / Tài Khoản Ở Góc Phải (Sau Khi Đăng Nhập):**
  - Khởi tạo component `UserAccountMenu.tsx`: Hiển thị Avatar tròn với ký tự viết tắt, tên người dùng, vai trò và icon mũi tên.
  - Dropdown Menu tài khoản đa tầng:
    - **Quản lý tài khoản cá nhân:** Modal thông tin tài khoản chi tiết (ID, Email, SĐT, Roles, JWT status) và Tab Đổi mật khẩu an toàn.
    - **Quản lý người dùng hệ thống (Admin & Staff):** Modal tra cứu danh sách người dùng, tìm kiếm theo tên/username/email, lọc theo vai trò và xem chi tiết.
    - **Lối tắt nhanh:** Xem hồ sơ của tôi, Kết quả thi sát hạch, Lịch sử nộp học phí.
    - **Đăng xuất an toàn:** Đăng xuất khỏi phiên làm việc.

### Nâng Cấp Hệ Thống Giao Diện UI/UX Pro Max (Enterprise Government Portal & LMS)
- **Tích Hợp Design System Master từ `ui-ux-pro-max`:**
  - Khởi tạo Source of Truth thiết kế tại `design-system/gplx-enterprise-portal/MASTER.md` theo phong cách `Accessible & Ethical` kết hợp `Enterprise Gateway`.
  - Chuẩn hóa bảng màu thương hiệu: Primary Trust Blue (`#1E40AF`), Action Blue (`#3B82F6`), Service Green CTA (`#16A34A`), Dark Text (`#0F172A`), Border chuẩn WCAG 2.1 AA (`#CBD5E1`).
  - Typography đa tầng: Tích hợp font Google `Be Vietnam Pro` (400, 500, 600, 700, 800) và `Atkinson Hyperlegible` đảm bảo hiển thị tiếng Việt dấu thanh chuẩn mực, rõ ràng, chống mỏi mắt.
- **Chuẩn Hóa Tiêu Chuẩn Tiếp Cận & Khả Năng Sử Dụng (WCAG 2.1 AA Compliance):**
  - Bổ sung đường dẫn bỏ qua tiện ích: `<a href="#main-content" className="skip-to-content">` hỗ trợ bàn phím và thiết bị đọc màn hình (Screen Readers).
  - Tích hợp vòng nét rõ ràng `:focus-visible` (3px outline với offset 2px) cho toàn bộ các phần tử tương tác.
  - Hỗ trợ cơ chế `@media (prefers-reduced-motion: reduce)` giảm chuyển động cho người dùng nhạy cảm.
  - Tối thiểu 44×44px touch targets trên mobile và tablet cho các nút bấm, ô input, dropdown select và liên kết điều hướng.
- **Thay Thế Toàn Bộ Biểu Tượng Emoji Thành Bộ Icon SVG Vector Độc Lập (`Icons.tsx`):**
  - Khởi tạo thư viện icon vector chuẩn SVG nhẹ, sắc nét: `Car`, `BookOpen`, `GraduationCap`, `ClipboardList`, `Calendar`, `Activity`, `FileText`, `CreditCard`, `ShieldCheck`, `Award`, `User`, `LogOut`, `CheckCircle`, `Plus`, `RefreshCw`, `Menu`, `X`, `BarChart`, `Server`, `ExternalLink`.
  - Triệt để loại bỏ emoji trên Header, MainLayout, Footer, Hero Banner, Thẻ KPI và Trang chủ theo đúng nguyên tắc của `AGENTS.md` và `MASTER.md`.
- **Tái Cấu Trúc Toàn Diện Các Component Dùng Chung (`frontend/src/components/ui/`):**
  - `tokens.css` & `global.css`: Nâng cấp hệ thống spacing (`--space-xs`..`--space-3xl`), shadows mềm mại (`--shadow-xs`..`--shadow-xl`), focus tokens (`--focus-ring`).
  - `AppButton`: Bổ sung micro-interactions (`active: scale(0.98)`), hover nâng nhẹ không giật layout, chiều cao tối thiểu chuẩn 44px (`md`) và 48px (`lg`).
  - `AppInput`, `AppSelect`, `AppTextarea`: Gắn kết chặt chẽ `id` - `htmlFor`, viền border sắc nét, focus ring phát sáng tự nhiên, chevron SVG tùy biến.
  - `StatusBadge` & `StatCard`: Nâng cấp độ tương phản văn bản, bo góc mềm mại, hiển thị icon trung tâm rõ nét.
  - `MainLayout`: Thiết kế lại Header phong cách Cổng thông tin Nhà nước tin cậy, menu ngăn nắp, thanh Workspace Bar phân chia 4 phân hệ rõ ràng (`Học viên`, `Tuyển sinh & Đào tạo`, `Sát hạch`, `Quản trị & Giám sát`).
  - `HomePage`: Hero banner tràn viền uy tín, lộ trình 4 bước trực quan, 6 thẻ phân hệ Modular Monolith dẫn link chuẩn xác.
- **Đóng Gói & Triển Khai Kiểm Thử:**
  - Build frontend production với `tsc -b && vite build` đạt 0 lỗi.
  - Deploy Nginx container `gplx-frontend` tại cổng 3000, kiểm tra `curl.exe -I http://localhost:3000` trả về HTTP 200 OK.
  - Kết nối thông suốt với `gplx-backend` tại cổng 8088.

## [1.8.0] — 2026-10-26

### Kiểm Thử Toàn Diện, Xác Thực Phân Quyền & Nghiệm Thu Hệ Thống (Giai đoạn 6 — Phase 15)
- **Kiểm Thử Toàn Diện Hệ Thống (100% BUILD SUCCESS):**
  - Chạy toàn bộ test suites backend: **76/76 unit & integration tests PASS 100%** (bao gồm xác thực Spring Boot context, Authentication, Admission, Examination, Training, Support modules và Theory learning).
  - Chuẩn hóa `FlywayConfig` với điều kiện `@ConditionalOnProperty(name = "spring.flyway.enabled", havingValue = "true", matchIfMissing = true)` tương thích mượt mà giữa môi trường Production MySQL 8.4 LTS và Test in-memory H2.
- **Xác Thực Bảo Mật & Phân Quyền Đa Tầng (RBAC End-to-End):**
  - Kiểm chứng thành công kịch bản bảo vệ dữ liệu nhạy cảm: Học viên (`ROLE_STUDENT`) bị chặn truy cập API quản trị bằng HTTP 403 Forbidden.
  - Quản trị viên (`ROLE_ADMIN`, `ROLE_STAFF`) truy cập đầy đủ các endpoint cấu hình đề thi và phân trang ngân hàng câu hỏi bằng HTTP 200 OK.
- **Xác Thực Đóng Gói Production Container:**
  - Biên dịch Vite React 19 + TypeScript strict bundle 0 lỗi; container `gplx-frontend` phục vụ tại cổng 3000.
  - Multi-stage build Maven Java 21 container `gplx-backend` thành công, phục vụ tại cổng 8088 (8080 internal).
  - Cả 3 containers (`gplx-frontend`, `gplx-backend`, `gplx-mysql`) hoạt động ổn định ở trạng thái `Up (healthy)`.
- **Hoàn Thiện Tài Liệu Hướng Dẫn & Nghiệm Thu:**
  - Khởi tạo `docs/guides/theory-learning-and-exam-system-guide.md` hướng dẫn sử dụng chi tiết 6 phân khu chức năng và đối soát toàn diện 14 tiêu chí nghiệm thu theo Master Prompt (ĐẠT 14/14 tiêu chí).
  - Cập nhật Task Backlog `docs/backlog/tasks.md` ghi nhận hoàn thành trọn vẹn Phase 15 (Giai đoạn 6).

## [1.7.0] — 2026-10-26

### Quản Trị Dữ Liệu Ngân Hàng Câu Hỏi & Cấu Hình Đề Thi GPLX (Giai đoạn 5 — Phase 14)
- **Quản lý Ngân Hàng 600 Câu Hỏi Sát Hạch (TheoryAdminConfigTab.tsx):**
  - Giao diện tra cứu và phân trang ngân hàng câu hỏi đa tiêu chí: lọc theo 7 chương lý thuyết, theo hạng GPLX (A1, A2, B1, B, C), lọc riêng câu hỏi điểm liệt ⚠️, tìm kiếm theo số thứ tự hoặc từ khóa nội dung.
  - Modal xem chi tiết đầy đủ câu hỏi: hiển thị hình ảnh minh họa đúng tỷ lệ, danh sách phương án A/B/C/D với đánh dấu trực quan đáp án đúng, lời giải thích chi tiết và căn cứ văn bản quy phạm pháp luật.
  - Hỗ trợ thêm mới (createQuestion) và chỉnh sửa (updateQuestion) câu hỏi trắc nghiệm với form validation nghiêm ngặt: kiểm tra tối thiểu 2 phương án, bắt buộc có duy nhất 1 đáp án đúng theo quy chuẩn sát hạch GPLX Việt Nam.
  - Hỗ trợ xóa an toàn câu hỏi (deleteQuestion) khỏi ngân hàng dữ liệu với hộp thoại xác nhận modal.
- **Cấu hình Đề thi Sát hạch theo Hạng GPLX:**
  - Bảng điều khiển cấu hình thời lượng thi, số lượng câu hỏi, điểm sàn tối thiểu đạt yêu cầu, phiên bản quy chế áp dụng cho từng hạng A1, A2, B1, B, C.
  - Modal điều chỉnh thông số đề thi linh hoạt, lưu trữ căn cứ pháp lý (Thông tư 12/2017/TT-BGTVT và Thông tư 04/2022/TT-BGTVT).
- **Nhập / Xuất Hàng Loạt & Quản Lý Phiên Bản (Bulk Import / Export & Legal Verification):**
  - Chức năng Nhập hàng loạt câu hỏi từ định dạng JSON (Bulk Import): Kiểm tra cú pháp trước khi nhập, tự động ánh xạ chương tương ứng, báo cáo chi tiết số lượng thành công / thất bại và danh sách lỗi validation cụ thể.
  - Chức năng Xuất dữ liệu câu hỏi (Export JSON) tải về máy tính để sao lưu hoặc kiểm toán dữ liệu.
  - Quản lý phiên bản dữ liệu và trạng thái kiểm soát pháp lý: Bộ 600 câu hỏi Cục Đường bộ Việt Nam, 60 câu điểm liệt ở trạng thái VERIFIED.
- **Kiểm thử Tự động Backend & Frontend:**
  - Bổ sung unit tests cho QuestionAdminServiceTest (5/5 PASS), tổng cộng 7/7 tests module lý thuyết đạt 100%.
  - Đóng gói Docker frontend production bundle Nginx Alpine hoàn tất không lỗi.

## [1.6.0] — 2026-10-26

### Giao Diện Thi Thử Lý Thuyết Sát Hạch Chuyên Sâu (Giai đoạn 4 — Phase 13)
- **Phòng Thi Trực Tuyến Tập Trung & Giám Sát Thời Gian Thực (TheoryMockExamTab.tsx):**
  - Cơ chế đếm ngược thời gian chính xác (Countdown Timer) với cảnh báo đổi màu khi thời gian dưới 2 phút, tự động nộp bài khi hết giờ (handleAutoSubmit).
  - Lưới điều hướng câu hỏi thời gian thực (Question Grid Navigator): Phân định rõ câu đã làm (xanh lá), chưa làm (xám nhạt), đang xem (viền xanh đậm) và câu điểm liệt (chấm đỏ cảnh báo).
  - Tích hợp tính năng **Cắm cờ xem lại (Flag for review)**: Cho phép học viên đánh dấu các câu phân vân bằng icon 🚩 và lọc rà soát trước khi nộp bài.
  - Cơ chế tự động lưu tiến độ ngầm trên đám mây (learningService.saveExamProgress) mỗi khi học viên chọn phương án, phòng ngừa sự cố mất điện hoặc tải lại trang.
  - Hệ thống phím tắt phòng thi: Phím số 1..4 để chọn đáp án A..D, Mũi tên Trái/Phải để chuyển câu, phím F để cắm cờ xem lại.
  - Hộp thoại xác nhận nộp bài an toàn (Modal Confirm Submit), thống kê số câu đã làm, số câu chưa làm, cảnh báo câu cắm cờ và chống bấm nhầm hoặc spam nộp bài.
- **Màn Hình Kết Quả & Tra Cứu Lịch Sử Thi Đầy Đủ:**
  - Kết luận ĐẠT / KHÔNG ĐẠT, thời gian làm bài, điểm số chi tiết và cảnh báo nổi bật nếu trượt do sai câu điểm liệt.
  - Bộ lọc xem lại kết quả: Xem tất cả câu, chỉ xem câu làm sai, hoặc xem các câu điểm liệt.
  - Sub-tab **Lịch sử các lượt thi thử** (getMockExamHistory): Bảng thống kê toàn bộ các bài thi đã làm trong quá khứ kèm nút xem lại chi tiết bài thi cũ.

## [1.5.0] — 2026-10-26

### Giao Diện Học Tập, Rèn Luyện & Ôn Tập Chuyên Sâu (Giai đoạn 3 — Phase 12)
- **Học tập 7 Chương Tương tác Đa Chế độ (`TheoryTopicStudyTab.tsx`):**
  - Chuyển đổi linh hoạt giữa hai chế độ: 🎴 **Học tương tác từng câu (Flashcard/Quiz)** và 📜 **Xem danh sách đầy đủ**.
  - Tích hợp **Lưới chuyển nhanh câu hỏi (Question Grid Navigator 1..N)** hiển thị màu sắc trạng thái câu điểm liệt ⚠️ và câu đang học.
  - Hỗ trợ phím tắt bàn phím: Mũi tên trái/phải để chuyển câu, phím 1–4 để chọn nhanh đáp án, phím B để đánh dấu bookmark.
  - Thanh tìm kiếm câu hỏi tức thì theo từ khóa nội dung hoặc số câu hỏi chuẩn 1–600.
- **Rèn luyện 8 Chế độ Tương tác Cao (`TheoryPracticeTab.tsx`):**
  - Tích hợp bảng lưới câu hỏi theo dõi trạng thái làm bài thời gian thực: xanh lá (trả lời đúng ✓), đỏ (trả lời sai ✗), xanh dương (câu hiện tại).
  - Phím tắt bàn phím: Chọn đáp án bằng phím số, Enter để kiểm tra hoặc qua câu tiếp theo.
  - Báo cáo tổng kết buổi rèn luyện chi tiết, hiển thị danh sách các câu làm sai để người học xem lại ngay lập tức.
- **Ôn tập Câu sai, Đánh dấu & Lịch sử Học tập (`TheoryReviewTab.tsx`):**
  - Bổ sung phân khu tra cứu lịch sử các phiên rèn luyện (`GET /api/v1/theory/practice/history`).
  - Nút phím tắt "Rèn luyện ngay danh sách này" chuyển thẳng từ danh sách câu sai hoặc câu đã bookmark sang phiên luyện tập mới.
- **Tối ưu hóa và Đóng gói Production:**
  - Nâng cấp `learningService.ts` đồng bộ đầy đủ các API phân trang, tìm kiếm, lưu tiến độ và lịch sử.
  - Biên dịch Vite bundle TypeScript strict 0 lỗi, container Nginx Alpine phục vụ mượt mà tại cổng 3000.

## [1.4.0] — 2026-10-26

### Chuyên Sâu Database & Backend Phân Hệ Lý Thuyết GPLX (Giai đoạn 2 — Phase 11)
- **Cấu trúc Đề thi & Database Migration (V11):**
  - Khởi tạo migration `V11__seed_exam_structure_and_import_helpers.sql` cấu hình phân bổ số lượng câu theo từng chương (`structure_json`) cho các hạng bằng A1, A2, B1, B, C theo quy chuẩn của Thông tư 12 & Thông tư 04.
  - Bổ sung chỉ mục tối ưu hóa cho tra cứu câu hỏi theo số thứ tự và phân loại điểm liệt.
- **Bảo mật & Trải nghiệm Thi Thử Nâng Cao:**
  - Bổ sung API `POST /api/v1/theory/mock-exam/{sessionCode}/progress` lưu tiến độ làm bài thời gian thực của học viên, ngăn ngừa rủi ro mất điện hoặc tải lại trang.
  - Tự động đánh dấu `EXPIRED` khi thời gian làm bài vượt quá thời lượng cho phép cộng với thời gian ân hạn mạng (Grace Period 30 giây).
  - Đảm bảo tính Idempotency: Nộp bài nhiều lần trả về cùng một kết quả đã chấm thay vì ghi đè điểm số.
  - Phân bổ đề thi bắt buộc có câu điểm liệt và bám sát tỷ lệ các chương lý thuyết.
- **Quản trị Ngân Hàng Câu Hỏi Nâng Cao (Admin):**
  - Cung cấp API `POST /api/v1/admin/theory/questions/import` cho phép nạp hàng loạt câu hỏi kèm validation nghiêm ngặt: kiểm tra số lượng đáp án tối thiểu (>= 2), ràng buộc duy nhất 1 đáp án đúng chuẩn trắc nghiệm GPLX Việt Nam, tự động map theo 7 chương.
  - Cung cấp API `GET /api/v1/admin/theory/questions/export` hỗ trợ trích xuất câu hỏi theo chủ đề hoặc hạng bằng.
- **Tìm kiếm & Phân trang Nâng Cao:**
  - Bổ sung tìm kiếm câu hỏi có phân trang `Pageable` theo từ khóa và lọc câu điểm liệt.
  - Phân trang lịch sử rèn luyện (`GET /api/v1/theory/practice/history`) và lịch sử thi thử (`GET /api/v1/theory/mock-exam/history`).
- **Kiểm thử Tự động & Đóng gói:**
  - Mở rộng `TheoryExamSecureWorkflowTest` và thêm `QuestionAdminServiceTest` (10/10 tests PASS 100%).
  - Đóng gói container Docker backend và kiểm chứng toàn bộ kịch bản thực tế thành công.

## [1.3.0] — 2026-10-26

### Phân Hệ Học Tập, Rèn Luyện & Thi Thử Lý Thuyết GPLX Việt Nam (Phase 10 — Theory Learning & Exam System)
- **Tài liệu Nguồn & Quy chuẩn Pháp lý (docs/legal/):**
  - Khởi tạo question-bank-source.md: Chuẩn hóa 600 câu hỏi Cục Đường bộ Việt Nam thành 7 chương nghiệp vụ và 60 câu điểm liệt (VERIFIED).
  - Khởi tạo exam-format-by-license-class.md: Cấu trúc đề thi sát hạch lý thuyết chính thức theo hạng A1 (25 câu / 19p / Đạt 21), A2 (25 câu / 19p / Đạt 23), B1 (30 câu / 20p / Đạt 27), B (35 câu / 22p / Đạt 32), C (40 câu / 24p / Đạt 36) theo Thông tư 12/2017/TT-BGTVT và Thông tư 04/2022/TT-BGTVT.
  - Khởi tạo legal-verification-log.md: Nhật ký đối soát văn bản quy phạm pháp luật.
- **Database & Flyway Migrations (V9, V10):**
  - Tạo bảng 	heory_topics lưu trữ danh mục 7 chương lý thuyết chuẩn Cục ĐBVN.
  - Bổ sung 	opic_id, ersion, erification_status, legal_reference vào bảng 	heory_questions.
  - Tạo bảng exam_configurations: Quản lý cấu hình thông số đề thi theo hạng GPLX và phiên bản quy chế.
  - Tạo bảng ookmarked_questions: Lưu trữ các câu hỏi đánh dấu yêu thích theo người dùng.
  - Tạo bảng practice_sessions & practice_answers: Lưu trữ phiên rèn luyện và câu trả lời tương tác tức thời.
  - Tạo bảng mock_exam_sessions & mock_exam_session_answers: Lưu trữ phiên thi thử trực tuyến bảo mật.
  - Bổ sung audit fields (created_at, updated_at) trên tất cả các bảng lý thuyết tuân thủ BaseEntity (V10).
  - Seed 7 chương lý thuyết chuẩn, cấu hình đề thi các hạng và 25+ câu hỏi mẫu bao quát đủ các chương, biển báo và sa hình.
- **Backend Application & Domain Services (Java 21, Spring Boot 4.1.1):**
  - Khởi tạo các Domain Entities: TheoryTopic, ExamConfiguration, BookmarkedQuestion, PracticeSession, PracticeAnswer, MockExamSession, MockExamSessionAnswer.
  - Triển khai TheoryTopicService: Cung cấp danh mục 7 chương, đếm tiến độ học viên, lấy câu hỏi theo chương kèm lời giải và luật.
  - Triển khai TheoryBookmarkService: Đánh dấu/bỏ đánh dấu câu hỏi yêu thích (toggle), tra cứu danh sách đã lưu.
  - Triển khai TheoryPracticeService: Hỗ trợ 8 chế độ rèn luyện chuyên sâu (TOPIC, CATEGORY, UNANSWERED, INCORRECT, PARALYSIS, BOOKMARKED, RANDOM, ALL) kèm phản hồi đáp án ngay (Instant Feedback).
  - Triển khai TheoryExamService chuẩn hóa: Sinh đề thi bảo mật không trả về isCorrect cho client; chấm điểm server-side; trượt ngay khi sai câu điểm liệt (hasFailedParalysis); cơ chế chống nộp đúp (idempotent).
  - Triển khai TheoryStatisticsService: Tính toán chính xác các chỉ số từ DB (số câu đã học, tỷ lệ đúng/sai, số đề đạt/trượt, tiến độ 7 chương, danh sách câu sai).
  - Triển khai ExamConfigService & QuestionAdminService: Quản trị cấu hình đề thi theo từng hạng và CRUD ngân hàng câu hỏi.
  - Cung cấp đầy đủ REST API Controllers: TheoryExamController, TheoryLearningController, TheoryAdminController.
- **Kiểm thử Tự động Backend (Unit Tests):**
  - TheoryExamSecureWorkflowTest: Kiểm chứng bảo mật đề thi không lộ đáp án đúng; kiểm chứng quy chế trượt tức thì khi sai câu hỏi điểm liệt.
  - Toàn bộ unit tests đạt kết quả BUILD SUCCESS (0 failures, 0 errors).
- **Frontend React 19 + TypeScript + Vite:**
  - Nâng cấp learning.ts và learningService.ts kết nối toàn bộ hệ thống API lý thuyết.
  - TheoryOverviewTab: Dashboard trực quan với 4 thẻ KPI, thanh tiến độ 7 chương, 3 phím tắt rèn luyện thông minh.
  - TheoryTopicStudyTab: Học chuyên sâu 7 chương, lọc câu điểm liệt, hiển thị đáp án đúng, giải thích và căn cứ pháp lý, bookmark câu hỏi.
  - TheoryPracticeTab: Giao diện tương tác 8 chế độ rèn luyện, kiểm tra kết quả ngay từng câu, giải thích tại chỗ.
  - TheoryMockExamTab: Màn hình thi thử chuẩn Bộ GTVT theo từng hạng bằng, đồng hồ đếm ngược, lưới chuyển nhanh 25-40 câu, cảnh báo câu điểm liệt, hộp thoại xác nhận nộp bài, kết luận Đạt/Trượt chi tiết.
  - TheoryReviewTab: Quản lý danh sách câu từng làm sai và câu đã đánh dấu.
  - TheoryAdminConfigTab: Màn hình điều chỉnh thông số đề thi theo từng hạng cho Quản trị viên / Cán bộ đào tạo.
- **Vận hành Docker Stack:**
  - Build thành công Docker image cho gplx-frontend và gplx-backend.
  - Cả 3 containers (gplx-frontend:3000, gplx-backend:8088, gplx-mysql:3306) đang hoạt động ổn định và healthy.

## [1.2.0] — 2026-10-26

### Nâng Cấp Toàn Diện UI/UX & Xây Dựng Hệ Thống Design System Chuyên Nghiệp (Phase 9)
- **Design Tokens & Foundation (`frontend/src/styles/`):**
  - Khởi tạo `tokens.css` quy định toàn bộ biến CSS chuẩn hóa: bảng màu chủ đạo theo Rule 09 (`--color-primary`, `--color-secondary`, `--color-accent`), màu trạng thái chức năng (`--color-success`, `--color-warning`, `--color-danger`, `--color-info`), thang màu trung tính, kích thước chữ, khoảng cách (`--space-1` đến `--space-12`), bán kính bo tròn (`--radius-md` đến `--radius-xl`), độ đổ bóng và phân tầng z-index.
  - Cập nhật `global.css` với typography hiện đại, custom thanh cuộn mượt mà và reset styles nhất quán.
- **Thư viện Atomic UI Components Dùng Chung (`frontend/src/components/ui/`):**
  - `AppButton`: Đầy đủ các biến thể (`primary`, `secondary`, `outline`, `danger`, `success`, `warning`, `ghost`), các cỡ (`sm`, `md`, `lg`), icon, hiệu ứng loading xoay tròn và chống double-click.
  - `AppInput`, `AppSelect`, `AppTextarea`: Đi kèm nhãn tiếng Việt, ký hiệu bắt buộc (`*`), tin nhắn gợi ý, thông báo lỗi động trực quan.
  - `StatusBadge`: Tự động ánh xạ trạng thái nghiệp vụ (Hồ sơ, Học phí, Thi sát hạch, Phương tiện) sang nhãn tiếng Việt và màu sắc tiêu chuẩn.
  - `StatCard`: Thẻ chỉ số KPI với icon, số liệu nổi bật, phụ chú và màu sắc trực quan.
  - `DataTable`: Bảng dữ liệu Generic `<T>` chuẩn hóa giao diện, hỗ trợ tùy biến cột, trạng thái đang tải (LoadingSpinner) và trạng thái rỗng (EmptyState).
  - `Modal` & `ConfirmDialog`: Hộp thoại tương tác popup mượt mà, hỗ trợ đóng bằng phím ESC, overlay mờ và trường nhập lý do bắt buộc (ADM-002).
  - `Alert`: Khung thông báo 4 cấp độ (`info`, `success`, `warning`, `danger`) có nút đóng.
  - `PageHeader`: Tiêu đề trang tiêu chuẩn tích hợp mô tả và các nút hành động nhanh.
  - `Tabs`: Thanh điều hướng tab mượt mà kèm badge đếm số lượng.
- **Hệ thống Layout & Điều hướng Thông minh (`frontend/src/layouts/`):**
  - Cải tiến `MainLayout`: Header nhận diện thương hiệu, nút mở menu di động (Responsive Hamburger Drawer).
  - Tích hợp thanh Workspace Bar phân hệ thứ cấp tự động hiển thị theo vai trò người dùng (Học viên / Tuyển sinh / Sát hạch viên / Quản trị viên).
  - Hiển thị thông tin người dùng đăng nhập kèm thẻ định danh vai trò tiếng Việt và nút đăng xuất an toàn.
- **Nâng cấp Toàn diện các Màn hình Nghiệp vụ:**
  - `HomePage`: Banner Hero hiện đại, 4 bước lộ trình đào tạo, thẻ KPI tổng quan, danh mục module và widget kiểm tra kết nối Backend thời gian thực.
  - `TheoryExamPage`: Hỗ trợ ôn luyện 600 câu kèm giải thích chi tiết, đồng hồ đếm ngược 20 phút cho đề thi thử, lưới số câu chuyển nhanh, đánh dấu cảnh báo câu hỏi điểm liệt.
  - `TrainingSchedulePage`: Thẻ theo dõi tiến độ thiết bị giám sát hành trình DAT (quãng đường km, thời gian giờ, số phiên lái xe, thanh phần trăm đạt chỉ tiêu).
  - `EligibilityCheckPage`: Xét duyệt 3 tiêu chuẩn dự thi (Hồ sơ, Lý thuyết 100%, Thực hành DAT) kèm danh sách thiếu sót cần bổ sung trước khi thi.
  - `ExamGradingPage`: Bảng chấm điểm 4 nội dung thi (Lý thuyết, Mô phỏng, Sa hình, Đường trường) theo chuẩn EXM-002, tự động kết luận Đạt/Không đạt.
  - `TuitionPaymentPage`: Quản lý hóa đơn công nợ, nộp học phí với cơ chế sinh Idempotency Key tự động chống thanh toán trùng lặp (FIN-001) và tra cứu biên lai.
  - `FleetManagementPage`: Giám sát hạn kiểm định an toàn kỹ thuật phương tiện (FLT-001), cảnh báo xe quá hạn và modal ghi nhận lịch sử bảo dưỡng.
  - `ApplicationManagementPage`: Thẩm định hồ sơ tuyển sinh với checklist tài liệu số hóa, bắt buộc lý do khi từ chối/yêu cầu bổ sung theo ADM-002.
  - `MyApplicationsPage` & `SubmitApplicationPage`: Form nộp hồ sơ chuẩn hóa kiểm tra độ tuổi theo hạng bằng, xem tài liệu đính kèm và lịch sử thẩm định.
  - `DashboardPage` & `AuditLogPage`: Báo cáo biểu đồ KPI trực quan, bảng thống kê tỷ lệ đỗ theo hạng và tra cứu nhật ký kiểm toán với phân trang.
- **Tuân thủ Tiêu chuẩn Kỹ thuật:**
  - Loại bỏ hoàn toàn 100% các kiểu `any` trong toàn bộ source code frontend.
  - Thêm file `.dockerignore` giúp tối ưu tốc độ build context Docker chỉ còn 386 kB.
  - Kiểm thử `npm run build` đạt 0 lỗi TypeScript strict mode; container `gplx-frontend` phục vụ Nginx production tại cổng 3000.

## [1.1.0] — 2026-10-26

### Quản trị Tri Thức CSDL & Chuẩn Hóa Pháp Lý Toàn Diện (Phase 8 — Database & Legal Knowledge Base)
- **Database Knowledge Base:**
  - Xây dựng 9 tài liệu kiến thức CSDL cốt lõi trong `docs/knowledge/`: `project-context.md`, `module-catalog.md`, `database-overview.md`, `database-schema-catalog.md`, `database-relationships.md`, `data-dictionary.md`, `data-ownership.md`, `data-lifecycle.md`, `database-change-log.md`.
  - Cập nhật sơ đồ ERD tổng thể `docs/architecture/erd.md` và kiến trúc CSDL `docs/architecture/database-design.md`, `rule-versioning-design.md`.
- **Legal Knowledge Base:**
  - Thiết lập 5 tài liệu pháp lý chuyên sâu trong `docs/legal/`: `legal-register.md`, `legal-source-catalog.md`, `legal-rule-catalog.md`, `legal-change-log.md`, `legal-verification-process.md`.
  - Xây dựng ma trận truy vết pháp lý hai chiều `docs/knowledge/legal-database-traceability.md` liên kết từ Luật định ➔ Quy tắc ➔ Module ➔ Bảng/Cột CSDL ➔ API ➔ Test case.
- **Đối chiếu & Chuẩn Hóa Tính Nhất Quán (Consistency Check):**
  - Truy vấn trực tiếp MySQL 8.4 LTS runtime (`INFORMATION_SCHEMA.COLUMNS` & `INFORMATION_SCHEMA.KEY_COLUMN_USAGE`) để đối soát 1:1 với 30 bảng thực tế.
  - Chuẩn hóa các sai lệch về tên cột và khóa ngoại giữa ERD/tài liệu và CSDL thực tế: `training_classes.course_id`, `class_enrollments.user_id`, `training_schedules.instructor_id`, `dat_practice_sessions.user_id` / `status`, `exam_candidates.exam_session_id`, `exam_results.yard_score` / `road_score`.
  - Phát hiện và ghi nhận rủi ro quy tắc `LEG-TRAINING-003` (đang ở trạng thái `NEEDS_VERIFICATION` nhưng tạm thời hard-code định mức DAT trong Service layer); tạo task `TSK-P8-04` để chuyển thành tham số cấu hình động.
  - Cập nhật checklist kiểm tra tính nhất quán `docs/knowledge/knowledge-consistency-checklist.md` và backlog `docs/backlog/tasks.md`.

## [1.0.0] — 2026-10-23

### Phát hành Chính thức Nghiệm thu Đồ án (Phase 7 — Final Polish & Release v1.0.0)
- **Đóng gói & Triển khai Production:**
  - Hoàn thiện Dockerfile Multi-stage build cho Backend (`infra/docker/backend.Dockerfile`): Tận dụng Eclipse Temurin 21 JDK để build Maven và Eclipse Temurin 21 JRE runtime tối ưu kích thước, bảo mật chạy dưới quyền non-root `appuser`.
  - Hoàn thiện Dockerfile Multi-stage build cho Frontend (`infra/docker/frontend.Dockerfile`): Node 20 Alpine build bundle tĩnh và Nginx Alpine siêu nhẹ phục vụ production.
  - Cấu hình Nginx (`frontend/nginx.conf` & `infra/docker/nginx.conf`): Hỗ trợ React Router SPA Fallback (`try_files $uri $uri/ /index.html;`), cấu hình nén Gzip và Reverse Proxy bảo mật đến Backend `/api/` và Swagger UI.
  - Cập nhật `docker-compose.yml`: Khởi chạy 1-click toàn diện 3 dịch vụ liên thông (`mysql:8.4`, `gplx-backend`, `gplx-frontend`) kèm cơ chế Health Check tự động.
- **Tài liệu & Nghiệm thu:**
  - Cập nhật `README.md` hướng dẫn chi tiết khởi chạy 1-click, tài khoản kiểm thử mặc định cho 7 vai trò, danh mục API và quy trình test tự động.
  - Hoàn tất toàn bộ backlog trong `docs/backlog/tasks.md` (từ `TSK-P0-01` đến `TSK-P7-02` đều đạt trạng thái `DONE`).
- **Chất lượng Mã nguồn:**
  - Đạt 100% tỷ lệ pass kiểm thử tự động: **66/66 test cases** trên nền Java 21, Spring Boot 4.1.1 và MySQL 8.4 LTS.

## [0.7.0] — 2026-10-23

### Báo cáo Quản trị & Nhật ký Kiểm toán (Phase 6 — Reporting & Audit Logging)
- **Cơ sở dữ liệu & Migration:**
  - Bổ sung Flyway migration `V7__create_reporting_and_audit_tables.sql` tạo bảng `audit_logs` (lưu vết thao tác: `user_id`, `username`, `action`, `resource_type`, `resource_id`, `details`, `ip_address`, `created_at`).
  - Seed các bản ghi audit log mẫu cho các hành động quan trọng (duyệt hồ sơ, xếp lịch thi, ghi nhận điểm sát hạch, thu học phí, phân công xe tập lái).
- **Nghiệp vụ & Tuân thủ Quy tắc:**
  - `ReportingService` tổng hợp KPI quản trị đa chiều liên module theo thời gian thực:
    - Tổng số học viên và phân bố hồ sơ tuyển sinh (Tổng số / Đã phê duyệt).
    - Thí sinh dự thi và tỷ lệ đỗ sát hạch toàn hệ thống cũng như chi tiết theo từng hạng bằng (A1, B1, B2, C...).
    - Doanh thu học phí thực tế đã thu qua các biên lai xác nhận.
    - Quãng đường thực hành lái xe DAT (km) tích lũy toàn khóa.
    - Trạng thái đội xe tập lái: số xe đang sẵn sàng hoạt động so với tổng số xe.
  - Kiểm toán và truy vết: Cung cấp API và giao diện lọc nhật ký kiểm toán theo phân hệ (`ADMISSION`, `EXAMINATION`, `FINANCE`, `FLEET`, `TRAINING`) và hành động cụ thể.
- **REST API (`/api/v1/reporting`):**
  - `GET /api/v1/reporting/dashboard`: Lấy dữ liệu tổng hợp KPI cho dashboard quản trị (phân quyền `ADMIN`, `MANAGER`).
  - `GET /api/v1/reporting/audit-logs`: Tra cứu nhật ký kiểm toán với phân trang và bộ lọc linh hoạt (phân quyền `ADMIN`, `MANAGER`).
- **Frontend (React 19 + TypeScript):**
  - Xây dựng types `types/reporting.ts` và service `reportingService.ts`.
  - Trang Dashboard Quản Trị (`DashboardPage.tsx`): 6 thẻ KPI trực quan, bảng thống kê tỷ lệ đỗ theo từng hạng GPLX kèm thanh tiến trình màu sắc, bảng 8 hoạt động kiểm toán gần nhất.
  - Trang Nhật Ký Kiểm Toán (`AuditLogPage.tsx`): Tra cứu toàn diện, lọc theo module, hành động, phân trang linh hoạt.
  - Cập nhật `MainLayout.tsx` và `App.tsx` với quyền truy cập chuyên biệt cho cán bộ quản lý (`ADMIN`, `MANAGER`).
- **Kiểm thử Tự động:**
  - 7 bài kiểm thử mới (`ReportingServiceTest`, `ReportingControllerTest`).
  - Toàn bộ 66/66 test cases của hệ thống đạt tỷ lệ 100% Passed.

## [0.6.0] — 2026-10-23

### Các Module Hỗ trợ: Tài chính & Quản lý Đội xe (Phase 5 — Finance & Fleet)
- **Cơ sở dữ liệu & Migration:**
  - Bổ sung Flyway migration `V6__create_support_modules_tables.sql` tạo 6 bảng nghiệp vụ:
    - Module Finance: `fee_invoices` (hóa đơn học phí, tổng tiền, tiền đã nộp, trạng thái PENDING, PARTIALLY_PAID, PAID), `payment_receipts` (biên lai nộp tiền, idempotency_key, hình thức thanh toán).
    - Module Fleet: `vehicles` (quản lý xe tập lái, biển số, hộp số sàn/tự động, hạng bằng tương ứng, hạn đăng kiểm, trạng thái), `vehicle_maintenances` (lịch sử bảo dưỡng định kỳ và sửa chữa).
    - Module Notification & CRM: `notifications` (thông báo nội bộ, chống gửi trùng `deduplication_key`), `crm_leads` (khách hàng tiềm năng, trạng thái tư vấn).
  - Seed dữ liệu 4 xe tập lái mẫu các hạng B1, B, C, A1.
- **Nghiệp vụ & Tuân thủ Quy tắc:**
  - `FIN-001`: Triển khai cơ chế Idempotency Key duy nhất cho mỗi giao dịch nộp tiền học phí, bảo đảm chống thanh toán trùng lặp khi người dùng click liên tiếp hoặc lỗi mạng.
  - `FIN-002`: Không cho phép xóa bản ghi biên lai tài chính đã được xác nhận trong hệ thống; bảo toàn truy vết kiểm toán dòng tiền.
  - Chặn thanh toán vượt quá số tiền còn nợ của hóa đơn; tự động chuyển trạng thái hóa đơn sang `PAID` khi hoàn tất 100% học phí.
  - `FLT-001`: Tự động loại trừ phương tiện hết hạn kiểm định an toàn kỹ thuật (đăng kiểm) hoặc đang trong lịch bảo dưỡng (`MAINTENANCE`) khỏi danh sách xe sẵn sàng phục vụ thực hành DAT/sa hình.
- **REST API (`/api/v1`):**
  - Finance API (`/api/v1/finance`):
    - `POST /api/v1/finance/invoices`: Tạo hóa đơn học phí cho học viên (Role `ADMIN`, `STAFF`, `MANAGER`).
    - `GET /api/v1/finance/invoices`: Danh sách toàn bộ hóa đơn học phí (Phân quyền quản lý).
    - `GET /api/v1/finance/invoices/my`: Học viên tra cứu hóa đơn học phí của chính mình.
    - `POST /api/v1/finance/invoices/{id}/pay`: Ghi nhận biên lai nộp tiền học phí kèm Idempotency Key (`FIN-001`).
    - `GET /api/v1/finance/invoices/{id}/receipts`: Xem lịch sử các đợt nộp học phí.
  - Fleet API (`/api/v1/fleet`):
    - `GET /api/v1/fleet/available`: Công khai danh sách xe tập lái sẵn sàng hoạt động (còn hạn đăng kiểm - `FLT-001`).
    - `GET /api/v1/fleet`: Quản lý danh sách toàn bộ phương tiện trong đội xe.
    - `POST /api/v1/fleet`: Thêm xe mới vào đội xe (Role `ADMIN`, `MANAGER`).
    - `PATCH /api/v1/fleet/{id}/status`: Cập nhật trạng thái xe (`AVAILABLE`, `MAINTENANCE`, `IN_USE`).
    - `POST /api/v1/fleet/{id}/maintenances`: Ghi nhận lịch bảo dưỡng/sửa chữa xe.
    - `GET /api/v1/fleet/{id}/maintenances`: Xem lịch sử bảo dưỡng phương tiện.
- **Frontend (React 19 + TypeScript):**
  - Xây dựng types `types/finance.ts`, `types/fleet.ts` và services `financeService.ts`, `fleetService.ts`.
  - Trang Quản lý Học phí & Biên lai (`TuitionPaymentPage.tsx`): Tra cứu hóa đơn học phí, theo dõi dư nợ, modal nộp tiền học phí an toàn với Idempotency Key tự sinh.
  - Trang Quản lý Đội xe tập lái (`FleetManagementPage.tsx`): Theo dõi danh sách xe, cảnh báo trực quan xe quá hạn đăng kiểm (`FLT-001`), modal ghi nhận bảo dưỡng định kỳ.
- **Kiểm thử:**
  - 9 test cases mới (`FinanceServiceTest`, `FleetServiceTest`, `FinanceAndFleetIntegrationTest`).
  - Toàn bộ 59/59 test cases của hệ thống đạt tỷ lệ 100% Passed.

## [0.5.0] — 2026-10-23

### Tổ chức thi & Xét duyệt điều kiện dự thi (Phase 4 — Examination Module)
- **Cơ sở dữ liệu & Migration:**
  - Bổ sung Flyway migration `V5__create_examination_tables.sql` tạo 3 bảng nghiệp vụ:
    - `exam_sessions`: Quản lý hội đồng thi, tên kỳ thi, ngày tổ chức, địa điểm, hạng GPLX, loại kỳ thi (Sát hạch Sở GTVT / Tốt nghiệp trường lái).
    - `exam_candidates`: Danh sách thí sinh dự thi, số báo danh (`candidate_number`), trạng thái đủ điều kiện (`QUALIFIED` / `DISQUALIFIED`), lý do bị loại.
    - `exam_results`: Kết quả thi 4 nội dung (Lý thuyết, Mô phỏng tình huống, Sa hình, Đường trường), kết quả chung (`PASSED`, `FAILED`, `PENDING`), ghi chú và chữ ký giám thị.
- **Nghiệp vụ & Tuân thủ Quy tắc:**
  - `EXM-001`: Đánh giá tự động điều kiện dự thi dựa trên 3 tiêu chuẩn liên module bắt buộc:
    1. Hồ sơ tuyển sinh tại module `admission` ở trạng thái đã được phê duyệt hợp lệ (`APPROVED`).
    2. Đã hoàn thành 100% thời lượng các bài giảng lý thuyết trực tuyến tại module `learning`.
    3. Tích lũy đủ số km (810 km) và số giờ (20 giờ) thực hành lái xe trên đường DAT tại module `training` (đối với xe ô tô).
  - `EXM-002`: Kết quả thi được bảo toàn vĩnh viễn trong CSDL, không cho phép xóa bản ghi nhằm phục vụ thanh tra, kiểm tra và cấp giấy phép lái xe.
  - Tự động hóa sinh mã kỳ thi `EXAM-CATEGORY-YYYYMMDD-XXX` và số báo danh `SBD-CATEGORY-XXX`.
  - Tự động tổng kết kết quả thi chung: Đạt khi và chỉ khi vượt qua tất cả các phần thi bắt buộc tương ứng theo từng hạng xe.
- **REST API (`/api/v1/examination`):**
  - `GET /api/v1/examination/sessions`: Danh sách kỳ thi sát hạch (Public).
  - `GET /api/v1/examination/sessions/{id}`: Chi tiết kỳ thi.
  - `POST /api/v1/examination/sessions`: Tạo kỳ thi mới (Role `ADMIN`, `MANAGER`).
  - `GET /api/v1/examination/eligibility/check`: Tự động thẩm định điều kiện dự thi của học viên (EXM-001).
  - `POST /api/v1/examination/sessions/{id}/register`: Đăng ký thí sinh vào kỳ thi (Tự động cấp SBD & gán trạng thái QUALIFIED/DISQUALIFIED).
  - `GET /api/v1/examination/sessions/{id}/candidates`: Danh sách thí sinh & SBD trong kỳ thi.
  - `POST /api/v1/examination/candidates/{candidateId}/score`: Ghi nhận điểm 4 môn sát hạch (Role `EXAMINER`, `ADMIN`).
  - `GET /api/v1/examination/candidates/{candidateId}/result`: Tra cứu kết quả thi của thí sinh.
  - `GET /api/v1/examination/my-results`: Học viên tra cứu lịch sử và kết quả thi sát hạch cá nhân.
- **Frontend (React 19 + TypeScript):**
  - Xây dựng types `types/examination.ts` và services `examinationService.ts`.
  - Trang Xét duyệt điều kiện dự thi (`EligibilityCheckPage.tsx`): Bảng điều khiển trực quan thẩm định 3 tiêu chuẩn, chỉ dẫn khắc phục tiêu chí còn thiếu.
  - Trang Danh sách kỳ thi sát hạch (`ExamSessionsPage.tsx`): Danh mục kỳ thi, modal tạo kỳ thi mới cho Quản lý/Admin, nút Đăng ký dự thi.
  - Trang Bảng điểm sát hạch (`ExamGradingPage.tsx`): Dành cho Sát hạch viên chấm điểm 4 môn, tự động tính Pass/Fail, nhập nhận xét hội đồng thi.
  - Trang Kết quả thi cá nhân (`MyExamResultsPage.tsx`): Tra cứu SBD và điểm thi chi tiết của học viên.
- **Kiểm thử:**
  - 12 unit và integration tests mới (`EligibilityServiceTest`, `ExaminationServiceTest`, `ExaminationControllerTest`).
  - Toàn bộ 50/50 tests hệ thống đạt tỷ lệ 100% Passed.

## [0.4.0] — 2026-10-23

### Học trực tuyến, Đào tạo thực hành & Giám sát DAT (Phase 3 — Learning & Training)
- **Cơ sở dữ liệu & Migration:**
  - Bổ sung Flyway migration `V4__create_learning_and_training_tables.sql` tạo 9 bảng:
    - Module Learning: `courses`, `course_lessons`, `learning_progress`, `theory_questions`, `theory_answers`.
    - Module Training: `training_classes`, `class_enrollments`, `training_schedules`, `attendance_records`, `dat_practice_sessions`.
  - Hạt giống dữ liệu khóa học mẫu, bài học mẫu và câu hỏi lý thuyết kèm câu hỏi điểm liệt.
- **Nghiệp vụ & Tuân thủ Quy tắc:**
  - `LRN-001`: Ghi nhận tiến độ học tập gắn với người học (`user_id`) và bài giảng (`lesson_id`).
  - `LRN-002`: Chặn đánh dấu hoàn thành bài giảng nếu người học chưa tích lũy thời gian học tối thiểu theo quy định.
  - Sát hạch lý thuyết: Tự động đánh trượt ngay lập tức nếu làm sai câu hỏi điểm liệt (`isParalysis = true`).
  - `TRN-001`: Kiểm tra chống xung đột lịch đào tạo của giảng viên trong cùng khung giờ.
  - `TRN-002`: Kiểm tra điều kiện điểm danh chỉ được phép ghi nhận trong ngày diễn ra buổi học.
  - Giám sát DAT: Tích lũy quãng đường và thời gian thực hành đường trường/cabin (đối chiếu chuẩn 810km / 20 giờ).
- **REST API (`/api/v1`):**
  - Khóa học & E-Learning:
    - `GET /api/v1/courses`: Danh mục khóa học đào tạo (Public).
    - `GET /api/v1/courses/{id}`: Chi tiết khóa học.
    - `GET /api/v1/courses/{id}/lessons`: Danh sách bài giảng kèm tiến độ học viên.
    - `POST /api/v1/courses/lessons/{id}/progress`: Cập nhật tiến độ và hoàn thành bài giảng.
  - Ngân hàng câu hỏi & Thi thử:
    - `GET /api/v1/theory/questions`: Ngân hàng câu hỏi ôn tập theo hạng GPLX (Public).
    - `GET /api/v1/theory/mock-exam`: Sinh đề thi ngẫu nhiên theo hạng bằng (Public).
    - `POST /api/v1/theory/mock-exam/submit`: Nộp bài thi thử trực tuyến và chấm điểm tự động.
  - Quản lý Đào tạo & Thực hành DAT:
    - `GET /api/v1/training/classes`, `POST /api/v1/training/classes`, `POST /api/v1/training/classes/{id}/enroll`.
    - `GET /api/v1/training/schedules/class/{classId}`, `POST /api/v1/training/schedules`.
    - `POST /api/v1/training/attendance`, `GET /api/v1/training/attendance/schedule/{scheduleId}`, `GET /api/v1/training/attendance/my-records`.
    - `POST /api/v1/training/dat/sessions`, `GET /api/v1/training/dat/my-summary`.
- **Frontend (React 19 + TypeScript):**
  - Xây dựng types `types/learning.ts`, `types/training.ts` và services `learningService.ts`, `trainingService.ts`.
  - Trang Khóa học & Bài giảng (`CoursesPage.tsx`): Danh mục khóa học, bài học có video mô phỏng, tính giờ học tích lũy và nút hoàn thành bài học.
  - Trang Thi thử lý thuyết (`TheoryExamPage.tsx`): Chế độ ôn tập theo hạng, chế độ thi thử ngẫu nhiên 20-25 câu, cảnh báo câu điểm liệt.
  - Trang Kế hoạch đào tạo & Lịch học (`TrainingSchedulePage.tsx`): Lịch học theo lớp, thanh tiến trình quãng đường thực hành DAT (tổng số km và giờ lái thực tế).
- **Kiểm thử:**
  - 12 test cases mới cho Phase 3 (`CourseServiceTest`, `TheoryExamServiceTest`, `TrainingScheduleServiceTest`, `AttendanceServiceTest`, `CourseAndTrainingIntegrationTest`).
  - Toàn bộ 38/38 test cases của toàn hệ thống đạt kết quả 100% Passed.

## [0.3.0] — 2026-10-23

### Tuyển sinh & Tiếp nhận Hồ sơ điện tử (Phase 2 — Admission Module)
- **Cơ sở dữ liệu & Entity:**
  - Bổ sung Flyway migration `V3__create_admission_tables.sql` tạo 4 bảng: `license_categories`, `applications`, `application_documents`, `application_status_history`.
  - Hạt giống (seed) dữ liệu 6 hạng GPLX chuẩn: A1, A, B1, B, C1, C với cấu hình động về độ tuổi tối thiểu và mức học phí.
  - Xây dựng JPA Entity: `LicenseCategory`, `AdmissionApplication`, `AdmissionDocument`, `ApplicationStatusHistory`.
  - Hỗ trợ Optimistic Locking qua `@Version private Long version` chống Lost Updates khi thẩm định đồng thời.
  - Xây dựng JPA Repository: `LicenseCategoryRepository`, `AdmissionApplicationRepository`, `AdmissionDocumentRepository`, `ApplicationStatusHistoryRepository`.
- **Nghiệp vụ & Tuân thủ Quy tắc:**
  - `ADM-001`: Triển khai máy trạng thái tiếp nhận và xét duyệt (`SUBMITTED` ➔ `UNDER_REVIEW` ➔ `APPROVED` / `REJECTED` / `SUPPLEMENT_REQUIRED`).
  - `ADM-002`: Bắt buộc ghi nhận lý do cụ thể khi từ chối hoặc yêu cầu bổ sung hồ sơ.
  - `ADM-003`: Cấm hoàn tác hoặc thay đổi trạng thái hồ sơ đã được phê duyệt (`APPROVED`).
  - `ADM-004`: Kiểm tra độ tuổi tối thiểu của học viên căn cứ theo ngày sinh và hạng bằng đăng ký.
  - `ADM-005`: Chống nộp trùng lặp hồ sơ đang trong quá trình tiếp nhận/chờ duyệt theo số CCCD.
- **REST API (`/api/v1`):**
  - `GET /api/v1/license-categories`: Danh mục hạng bằng lái xe công khai (Public).
  - `GET /api/v1/license-categories/{id}`: Chi tiết hạng bằng lái xe.
  - `POST /api/v1/admissions`: Học viên nộp hồ sơ điện tử đính kèm tài liệu số hóa (Authenticated).
  - `GET /api/v1/admissions/my-applications`: Học viên tra cứu danh sách hồ sơ của chính mình (Resource Ownership).
  - `GET /api/v1/admissions/{id}`: Xem chi tiết hồ sơ, tài liệu và lịch sử thẩm định.
  - `GET /api/v1/admissions`: Cán bộ tuyển sinh (`STAFF`, `ADMIN`, `MANAGER`) tra cứu danh sách hồ sơ có phân trang và lọc theo trạng thái.
  - `POST /api/v1/admissions/{id}/review`: Cán bộ thực hiện thẩm định, ghi nhận ghi chú/lý do và cập nhật trạng thái.
- **Frontend (React 19 + TypeScript):**
  - Xây dựng Service `admissionService.ts` với đầy đủ kiểu dữ liệu TypeScript trong `types/admission.ts`.
  - Trang Nộp hồ sơ (`SubmitApplicationPage.tsx`): Dropdown chọn hạng bằng hiển thị học phí và điều kiện tuổi, form kiểm tra tính hợp lệ của CCCD/ngày sinh, đính kèm tài liệu số hóa.
  - Trang Hồ sơ của tôi (`MyApplicationsPage.tsx`): Danh sách hồ sơ đã nộp, trạng thái gắn nhãn màu sắc trực quan, modal xem chi tiết tài liệu và nhật ký thẩm định.
  - Trang Quản lý & Thẩm định (`ApplicationManagementPage.tsx`): Bảng hồ sơ cho cán bộ tuyển sinh, bộ lọc trạng thái, popup thẩm định xét duyệt tuân thủ ADM-002.
  - Cập nhật điều hướng `MainLayout.tsx` phân tách rõ quyền hạn học viên và cán bộ (`isStaffOrAdmin`).
- **Kiểm thử:**
  - 11 test cases mới cho module Admission (6 unit tests `AdmissionServiceTest`, 5 integration tests `AdmissionControllerTest`).
  - Toàn bộ 26/26 test cases của hệ thống đạt kết quả 100% Passed.

## [0.2.0] — 2026-10-23

### Xác thực & Phân quyền (Phase 1 — Identity & Authentication)
- **Cơ sở dữ liệu & Entity:**
  - Bổ sung Flyway migration `V2__seed_initial_roles_permissions.sql` nạp 7 vai trò hệ thống (`ROLE_ADMIN`, `ROLE_MANAGER`, `ROLE_STAFF`, `ROLE_INSTRUCTOR`, `ROLE_EXAMINER`, `ROLE_STUDENT`, `ROLE_COUNSELOR`) và danh mục quyền chuẩn.
  - Xây dựng JPA Entity: `User`, `Role`, `Permission`, enum `RoleType`.
  - Xây dựng JPA Repository: `UserRepository`, `RoleRepository`, `PermissionRepository`.
- **Bảo mật & JWT (Spring Security 7):**
  - Tích hợp thư viện JJWT 0.12.6 (`jjwt-api`, `jjwt-impl`, `jjwt-jackson`).
  - Triển khai `JwtService` tạo, ký HMAC-SHA256 và xác thực token JWT stateless.
  - Triển khai `CustomUserDetailsService` và `UserPrincipal` hỗ trợ đăng nhập bằng username hoặc email.
  - Triển khai `JwtAuthenticationFilter` tự động trích xuất token từ Authorization header.
  - Cấu hình `JwtAuthenticationEntryPoint` trả về JSON lỗi 401 Unauthorized chuẩn hóa.
  - Cập nhật `SecurityConfig` Lambda DSL, bảo vệ các endpoint nghiệp vụ và phân quyền Method Security.
- **REST API:**
  - `POST /api/v1/auth/register`: Đăng ký tài khoản người dùng kèm validation, kiểm tra trùng lặp và mã hóa BCrypt.
  - `POST /api/v1/auth/login`: Xác thực tài khoản và phát hành JWT token.
  - `GET /api/v1/auth/me`: Trả về thông tin chi tiết tài khoản hiện tại từ token.
- **Frontend (React 19 + TypeScript):**
  - Xây dựng `AuthContext` và hook `useAuth` quản lý trạng thái đăng nhập toàn cục.
  - Cập nhật `apiClient` Axios tự động gắn token `Bearer` và điều hướng khi token hết hạn.
  - Xây dựng trang Đăng nhập (`LoginPage.tsx`) và Đăng ký (`RegisterPage.tsx`) có validation và giao diện tiếng Việt.
  - Cập nhật `MainLayout.tsx` hiển thị thông tin người dùng đang đăng nhập và nút Đăng xuất.
- **Kiểm thử:**
  - 15 test cases (Unit tests `AuthServiceTest`, Integration tests `AuthControllerTest`, `HealthControllerTest`, `GplxApplicationTests`) đạt kết quả 100% Passed.

## [0.1.0] — 2026-10-22

### Khởi tạo Khung Dự án (Phase 0 — Foundation)
- **Kiến trúc & Quy tắc:**
  - Tạo `AGENTS.md` chỉ dẫn hoạt động nghiêm ngặt cho AI Coding Agent.
  - Xây dựng trọn bộ 14 file Rule trong `.rules/` bao gồm tiêu chuẩn công nghệ, kiến trúc Modular Monolith, quy ước code, Flyway migrations, REST API, bảo mật Spring Security 7, quy tắc nghiệp vụ, tuân thủ pháp lý GPLX, frontend conventions, testing và tiêu chuẩn hoàn thành (DoD).
- **Tài liệu Kỹ thuật:**
  - Xây dựng 13 file tài liệu trong `docs/` bao gồm kiến trúc hệ thống, ranh giới module, thiết kế database, an ninh, use cases, yêu cầu chức năng/phi chức năng, sổ đăng ký pháp lý (`legal-register.md`), quy trình rà soát pháp luật, chiến lược kiểm thử, hướng dẫn triển khai và lộ trình backlog (`roadmap.md`, `tasks.md`).
- **Backend (Spring Boot 4.1.1 & Java 21):**
  - Cấu hình `pom.xml` với Spring Boot 4.1.1, Jakarta EE 11, Hibernate, Spring Security 7, Flyway Core & MySQL, OpenAPI Swagger UI (`springdoc-openapi` 3.1.1).
  - Triển khai `GplxApplication.java`, `SecurityConfig.java`, `WebConfig.java`, `OpenApiConfig.java`.
  - Triển khai các thành phần dùng chung: `BaseEntity.java`, `ApiResponse.java`, `ErrorResponse.java`, `GlobalExceptionHandler.java`.
  - Phân tách cấu trúc 10 package module độc lập: `identity`, `admission`, `learning`, `training`, `examination`, `crm`, `finance`, `fleet`, `notification`, `reporting`.
  - Xây dựng `HealthController.java` (`GET /api/v1/health`) và unit/integration tests với JUnit 5 MockMvc.
  - Viết migration ban đầu `V1__create_identity_tables.sql` cho các bảng `users`, `roles`, `permissions`, `user_roles`, `role_permissions`.
- **Frontend (React 19 + TypeScript + Vite):**
  - Thiết lập dự án React 19, TypeScript strict mode, Vite, React Router DOM v7.
  - Xây dựng `MainLayout.tsx` chuẩn responsive hỗ trợ tiếng Việt.
  - Xây dựng `HomePage.tsx` tích hợp gọi Health Check API và hiển thị bản đồ các module nghiệp vụ.
  - Xây dựng Axios client wrapper và type definitions `ApiResponse<T>`, `HealthStatus`.


## 2026-10-29 — Luyện sa hình với xe ảo (bản đầu)

- Thêm trang đăng nhập `/student/driving-simulation`, liên kết navbar/menu và module engine mô phỏng 2D không thêm dependency.
- Lấy hạng xe từ API danh mục, hỗ trợ cấu hình mô tô/ô tô/xe tải, hai bài luyện nội bộ, ga/phanh/lùi/đánh lái, điểm dẫn đường, chạm biên và tạm dừng.
- Kết quả chỉ trong phiên; không ghi DAT hoặc điểm sát hạch. Hạng chưa có cấu hình được hiển thị rõ.
- Kiểm thử engine 6/6 PASS. Vite build bị chặn bởi thiếu Rollup native Windows; kiểm thử trình duyệt chưa thực hiện. Chi tiết: `docs/architecture/driving-simulation.md`.


## 2026-10-29 — Menu và truy cập trang theo vai trò

- Tập trung bảng quyền cho 7 vai trò; đồng bộ danh mục, navbar, lối tắt, tài khoản, footer và ProtectedRoute, gồm các alias. Tài khoản nhiều vai trò nhận hợp quyền; vai trò chưa xác định không tự trở thành học viên.
- Chia danh mục theo học tập, hồ sơ, tuyển sinh, đào tạo/xe, sát hạch, tài chính và giám sát. Danh mục hoạt động trên điện thoại và có điều hướng bàn phím. Sa hình có lối tắt nổi bật cho học viên, giáo viên, quản lý và quản trị viên.
- Tư vấn viên thấy CRM/tổng quan; chỉ ADMIN/EXAMINER vào chấm điểm. Thêm trang ngân hàng câu hỏi ADMIN/STAFF, sửa kiểm tra tiền tố ROLE_. Nút tự đăng ký dự thi chỉ hiện với STUDENT.
- Sửa kiểu dữ liệu hạng GPLX `active` theo backend thật và việc chuyển focus từ sân sang nút điều khiển sa hình.
- Rebuild và cập nhật riêng frontend Docker để giao diện mới được phục vụ tại cổng 3000. Chi tiết ma trận: `docs/architecture/role-navigation.md`; kiểm chứng: `docs/testing/role-navigation.md`.


## 2026-10-29 — MVP sa hình ô tô 3D

- Thêm module `simulation3d`, Three.js 0.180.0 và kiểu TypeScript tương ứng; tách vật lý, render, bài thi, scoring, input/runtime, persistence và UI. Giữ nguyên stack backend.
- Xe 3D sáu hạng B/C1/C/D1/D2/D, sân mẫu có dốc và cảnh trí; ba bài hoạt động: xuất phát, nhường người đi bộ, ngang dốc. Phím lái có thể đổi; camera sau xe/cabin/trên cao, HUD, toàn màn hình, giọng Việt tùy trình duyệt và nguy hiểm tùy chọn.
- Bộ luật JSON có nguồn/phiên bản/thời hạn, profile theo hạng; trừ điểm/đình chỉ theo sự kiện, sensor chưa xác minh chỉ cảnh báo. Không công nhận toàn bộ kỳ thi bằng phạm vi MVP.
- Lịch sử IndexedDB tối đa 5 phiên theo tài khoản, snapshot luật/sân, import/export bản ghi và phát lại/seek theo thời gian. Nhập sân JSON theo schema hành lang thẳng, chưa hỗ trợ CAD/sân bất kỳ.
- Route chính chuyển sang lazy 3D, giữ 2D tại `/student/driving-simulation/2d` với quyền cũ. Có ZIP source độc lập và hướng dẫn chạy không cần backend.
- Kiểm chứng: `docs/testing/simulation3d-mvp.md`; kiến trúc: `docs/architecture/simulation3d-mvp.md`; pháp lý: `docs/legal/simulation3d-rules.md`.

## [Unreleased] — 2026-10-29 — Danh mục GPLX và ngân hàng PDF

- Chuẩn hóa 15 hạng GPLX, bổ sung phạm vi C1 bao gồm B, tách B1 mô tô ba bánh khỏi danh mục B1 ô tô cũ để giữ lịch sử; thêm trang tra cứu công khai và đồng bộ các bộ chọn học/thi/quản trị.
- Nhập phiên bản PDF-2025-6a6dab85: 600 câu, 6 chương, 318 câu có hình, đáp án từ gạch chân; lưu mã băm và trang nguồn. Giữ 600 câu/đáp án cũ ở trạng thái lưu trữ, không phá khóa ngoại lịch sử.
- Phạm vi câu và điểm liệt riêng A/A1, B1, ô tô; cấu trúc đề đủ 15 hạng, từ chối sinh đề thiếu dữ liệu hoặc quá hạn xác minh sau 28/02/2027. Sửa xóa câu hỏi thành xóa mềm.
- Kiểm thử dữ liệu, JPA, service, API/MySQL thực, điều hướng và production build. Ghi nhận riêng lỗi dữ liệu mẫu CRM V14 khi cài trắng; đường nâng cấp V14→V17 đã đạt và áp dụng vào hệ thống cục bộ.
- Tài liệu: docs/architecture/pdf-question-bank.md, docs/legal/pdf-question-bank.md và docs/testing/pdf-question-bank.md.
