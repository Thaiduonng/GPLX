# Rule 09 — Quy ước Lập trình Frontend (React + TypeScript)

## 1. Kiến trúc thư mục Frontend chuẩn

```text
frontend/src/
├── app/             # Khởi tạo App, Provider, Router configuration
├── components/      # Component dùng chung UI (Button, Input, Modal, Table, Alert)
├── layouts/         # Layout khung (MainLayout, AuthLayout, DashboardLayout)
├── pages/           # Page cấp route (HomePage, LoginPage, AdmissionPage)
├── features/        # Các module chức năng chuyên biệt (auth, admission, training)
├── hooks/           # Custom React hooks (useAuth, usePagination, useDebounce)
├── services/        # Tầng gọi API qua Axios có kiểu dữ liệu tường minh
├── types/           # Định nghĩa TypeScript Interface / Type
├── utils/           # Helper functions (format tiền tệ, định dạng ngày tiếng Việt)
└── styles/          # File CSS toàn cục, CSS Modules hoặc Variables
```

## 2. Tiêu chuẩn TypeScript & React

- **Strict Type Safety:** Bật `strict: true` trong `tsconfig.json`. Tuyệt đối tránh sử dụng kiểu `any`. Mọi response từ API và state đều phải có interface tương ứng.
- **Component Design:**
  - Tách nhỏ component theo Single Responsibility Principle. Không viết các file page/component dài hàng ngàn dòng.
  - Sử dụng Function Component kết hợp chuẩn React Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`).
  - Sử dụng CSS Modules (`*.module.css`) để đóng gói phạm vi style, tránh xung đột CSS toàn cục.

## 3. Trải nghiệm người dùng (UX) và Hỗ trợ Tiếng Việt

- **Quản lý trạng thái tương tác đầy đủ:** Bất kỳ view tải dữ liệu nào cũng phải xử lý 4 trạng thái rõ ràng:
  1. `Loading State`: Skeleton hoặc Spinner hiển thị trong khi chờ phản hồi.
  2. `Empty State`: Thông báo thân thiện khi danh sách rỗng ("Chưa có hồ sơ nào được ghi nhận").
  3. `Error State`: Thông báo lỗi cụ thể, có nút "Thử lại" khi gọi API thất bại.
  4. `Success State`: Hiển thị dữ liệu chính xác.
- **Hỗ trợ Tiếng Việt hoàn chỉnh:**
  - Toàn bộ nhãn, thông báo, nút bấm, tiêu đề đều hiển thị bằng Tiếng Việt chuẩn.
  - Định dạng ngày tháng theo phong cách Việt Nam (`DD/MM/YYYY HH:mm`).
  - Định dạng tiền tệ theo VND (VD: `12.500.000 ₫`).
- **Phòng chống double submit:** Khi người dùng click nút nộp hồ sơ/thanh toán, bắt buộc disable nút và hiển thị loading để ngăn việc gửi nhiều request liên tiếp.
