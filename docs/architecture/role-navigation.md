# Điều hướng và quyền truy cập frontend theo vai trò

Ngày cập nhật: 29/10/2026.

## Nguồn cấu hình

`frontend/src/features/navigation/navigation.ts` khai báo các nhóm, nhãn, đường dẫn chuẩn, alias và danh sách ROLE_* được phép truy cập. MainLayout, NavigationDrawer, Navbar, Footer, UserAccountMenu và ProtectedRoute cùng sử dụng cấu hình này. Route chưa khai báo bị từ chối mặc định. Tài khoản nhiều vai trò nhận hợp quyền, không nhân đôi mục menu; vai trò không xác định chỉ thấy danh mục công khai.

Đây là chính sách điều hướng và truy cập trang phía frontend. Backend vẫn kiểm tra JWT, method security và quyền sở hữu dữ liệu theo từng API hiện có; không thay thế kiểm soát backend bằng việc ẩn menu. Đợt thay đổi này không sửa API, schema hoặc chính sách sở hữu của các module backend, không phải một cuộc kiểm toán bảo mật toàn bộ API.

## Bố trí

- Header giữ Trang chủ, Khóa đào tạo và lối vào sa hình khi có quyền. Nút Danh mục luôn có ở cả desktop, tablet, điện thoại và cả khách chưa đăng nhập.
- Thanh lối tắt dưới header hiển thị theo vai trò, tự xuống dòng. Sa hình nằm trong lối tắt của học viên, giáo viên, quản lý và quản trị viên.
- Danh mục đầy đủ chia Học tập & luyện lái, Hồ sơ của tôi, Tuyển sinh & tư vấn, Đào tạo & phương tiện, Tổ chức sát hạch, Học phí & tài chính, Quản trị & giám sát, Thông tin & đăng ký. Nhóm rỗng được ẩn.
- Danh mục dùng native dialog: focus trap, Escape, trả focus về nút mở; route change hoặc đổi tài khoản đóng danh mục. Nhãn vai trò lấy theo ROLE_* tường minh, không suy luận học viên bằng phép loại trừ.
- Truy cập trực tiếp trang sai quyền hiển thị thông báo từ chối; chưa đăng nhập chuyển đến đăng nhập và giữ đường dẫn quay lại. Các alias cũ dùng cùng quyền với đường dẫn chuẩn.

## Ma trận chức năng

| Vai trò | Chức năng hiển thị và truy cập trang |
| --- | --- |
| Học viên | Sa hình, lý thuyết, ôn tập, biển báo, hướng dẫn, làm quen xe; hồ sơ cá nhân; lịch học; kỳ sát hạch, điều kiện/kết quả cá nhân; học phí cá nhân. |
| Giáo viên | Nội dung học tập và sa hình phục vụ hướng dẫn; lịch học; giảng dạy/đánh giá xe thô; đội xe. Không có hồ sơ/học phí học viên hoặc CRM. |
| Giáo vụ / tuyển sinh | Tổng quan tuyển sinh, CRM, thẩm định hồ sơ; ngân hàng câu hỏi/cấu hình đề; lịch học, xếp lịch xe thô, đội xe; kỳ thi; hóa đơn/thu học phí. |
| Tư vấn viên | Tổng quan tuyển sinh và CRM. Không có thẩm định/xếp lớp, thu học phí hoặc chức năng học viên. |
| Sát hạch viên | Danh sách kỳ sát hạch và chấm điểm. Không có chức năng học viên, tài chính hoặc tuyển sinh. |
| Quản lý | Học tập/sa hình để theo dõi; tổng quan tuyển sinh, CRM, hồ sơ; lịch học, xe thô, đội xe; tổ chức kỳ thi; tài chính, báo cáo và audit. Không nhập điểm nếu không có thêm ROLE_EXAMINER; không sửa ngân hàng câu hỏi nếu không có thêm ROLE_STAFF. |
| Quản trị viên | Toàn bộ các trang hiện được triển khai. |
| Khách | Trang chủ, khóa đào tạo, đăng ký học, tra cứu hồ sơ, đăng nhập/đăng ký tài khoản. |

Các nút nghiệp vụ trong trang vẫn tuân theo API: tạo kỳ thi ADMIN/MANAGER; chấm điểm ADMIN/EXAMINER; quản trị lý thuyết ADMIN/STAFF; tự đăng ký dự thi chỉ hiện khi có STUDENT. Các thao tác đội xe tiếp tục theo quyền đã có trong trang và backend.

Menu tài khoản chỉ ADMIN thấy danh sách tài khoản minh họa (chức năng cũ chưa kết nối backend); audit chỉ ADMIN/MANAGER. Lối tắt tài khoản và footer lọc theo bảng quyền.

## Lỗi hiển thị sa hình đã xử lý

1. Dịch vụ frontend cũ không tự lấy mã nguồn mới: cần rebuild và recreate riêng frontend, không khởi động lại database/backend.
2. Navbar cũ ẩn dưới 1100px: bổ sung danh mục luôn truy cập được và thanh lối tắt tự xuống dòng.
3. DTO `LicenseCategoryResponse` trả `active`, frontend khai báo sai `isActive`: sửa kiểu và bộ lọc sa hình theo hợp đồng thật. Hạng B1 chưa có cấu hình vẫn thông báo chưa hỗ trợ.
4. Cho phép nút điều khiển bên cạnh sân nhận focus mà không tự dừng phiên; chỉ mất focus ra ngoài toàn bộ khu vực mô phỏng mới tạm dừng.

## Kiểm chứng

- Unit test: `node --test frontend/src/features/navigation/navigation.test.mjs frontend/src/features/simulation/engine.test.mjs`.
- TypeScript: `node frontend/node_modules/typescript/bin/tsc -b frontend/tsconfig.json`.
- Production build: `docker compose build frontend`.
- Browser smoke: `scripts/navigation-smoke.mjs`, cần Playwright và Chrome; module Playwright lấy từ `PLAYWRIGHT_MODULE` hoặc package cài sẵn, URL từ `GPLX_URL` (mặc định localhost:3000).
- Browser smoke cô lập profile/API module bằng mock, nhưng dùng danh mục hạng xe từ backend thật. Kiểm tra 7 vai trò × 375/768/1440px, danh mục/route, sa hình, bàn phím/nút giữ ga, hạng chưa hỗ trợ, menu khách và đăng nhập. Kết quả cuối ghi trong `docs/testing/role-navigation.md`.


## Sa hình 3D MVP

Mục Luyện sa hình mở `/student/driving-simulation` (3D); alias `/student/driving-simulation/2d` giữ bản cũ với cùng STUDENT/INSTRUCTOR/MANAGER/ADMIN. Không mở rộng quyền vai trò khác, không thêm backend API trong MVP; lịch sử 3D lưu cục bộ theo tài khoản.
