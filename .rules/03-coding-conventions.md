# Rule 03 — Quy ước viết mã nguồn (Coding Conventions)

## 1. Quy ước đặt tên (Naming Conventions)

- **Java Package:** Toàn bộ chữ thường, không có dấu gạch dưới (VD: `vn.edu.gplx.modules.admission.api`).
- **Class / Interface / Enum:** `PascalCase` (VD: `AdmissionController`, `UserRole`, `ExamStatus`).
- **Method / Variable:** `camelCase` (VD: `findActiveUsersByRole()`, `isSubmissionValid`).
- **Constant / Enum Values:** `UPPER_SNAKE_CASE` (VD: `MAX_UPLOAD_SIZE`, `APPLICATION_APPROVED`).
- **DTO Naming:**
  - Request: `<Action><Entity>Request` (VD: `RegisterCourseRequest`, `UpdateProfileRequest`).
  - Response: `<Entity>Response` (VD: `UserResponse`, `CourseDetailResponse`).

## 2. Dependency Injection & Clean Code

- **Bắt buộc dùng Constructor Injection:**
  - Tuyệt đối không dùng field injection `@Autowired` trên thuộc tính.
  - Khuyến khích sử dụng constructor tường minh hoặc kết hợp Lombok / Java Records khi phù hợp.
- **Không nuốt ngoại lệ (Do Not Swallow Exceptions):**
  - Nghiêm cấm khối lệnh `catch (Exception e) {}` rỗng hoặc chỉ in ra console.
  - Mọi exception phải được log rõ ràng qua Logger và chuyển đổi thành business exception phù hợp.
- **Logging chuẩn hóa:**
  - Sử dụng SLF4J: `private static final Logger log = LoggerFactory.getLogger(YourClass.class);`.
  - Tuyệt đối không dùng `System.out.println()` hoặc `System.err.println()`.
  - Log ở level thích hợp: `DEBUG` cho trace luồng, `INFO` cho thao tác nghiệp vụ quan trọng, `WARN` cho cảnh báo, `ERROR` kèm exception stack trace cho sự cố.
- **Quản lý kích thước mã nguồn:**
  - Hàm không nên vượt quá 50-60 dòng lệnh.
  - Class không nên vượt quá 400-500 dòng lệnh. Tách thành các helper/service chuyên biệt nếu class quá phình to.
