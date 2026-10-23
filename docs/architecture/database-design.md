# Thiết kế Cơ sở dữ liệu và Lược đồ Bảng

## 1. Chuẩn hóa thiết kế

- **Hệ quản trị CSDL:** MySQL 8.4 LTS
- **Charset & Collation:** `utf8mb4` / `utf8mb4_unicode_ci`
- **Múi giờ lưu trữ:** UTC
- **Quy tắc audit:** Mọi bảng đều có `created_at` (DATETIME) và `updated_at` (DATETIME ON UPDATE).

## 2. Lược đồ các bảng nền tảng (Foundation Tables - V1 Migration)

### Bảng `users` (Tài khoản người dùng)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Định danh duy nhất của tài khoản |
| `username` | VARCHAR(50) | UNIQUE, NOT NULL | Tên đăng nhập |
| `email` | VARCHAR(100) | UNIQUE, NOT NULL | Địa chỉ thư điện tử |
| `password_hash` | VARCHAR(255) | NOT NULL | Mật khẩu đã hash bằng BCrypt |
| `full_name` | VARCHAR(100) | NOT NULL | Họ và tên đầy đủ |
| `phone` | VARCHAR(20) | NULL | Số điện thoại liên hệ |
| `is_active` | TINYINT(1) | NOT NULL, DEFAULT 1 | Trạng thái hoạt động (1: Active, 0: Locked) |
| `created_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Thời điểm tạo tài khoản |
| `updated_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE | Thời điểm cập nhật cuối |

### Bảng `roles` (Vai trò)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính vai trò |
| `name` | VARCHAR(50) | UNIQUE, NOT NULL | Tên vai trò (ROLE_ADMIN, ROLE_STUDENT,...) |
| `description` | VARCHAR(255) | NULL | Mô tả quyền hạn của vai trò |
| `created_at` | DATETIME | NOT NULL | Thời điểm tạo |
| `updated_at` | DATETIME | NOT NULL | Thời điểm cập nhật |

### Bảng `permissions` (Quyền hạn chi tiết)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính quyền |
| `name` | VARCHAR(100) | UNIQUE, NOT NULL | Tên quyền (VD: `admission:review`, `exam:grade`) |
| `description` | VARCHAR(255) | NULL | Diễn giải quyền |
| `module` | VARCHAR(50) | NOT NULL | Module sở hữu quyền |
| `created_at` | DATETIME | NOT NULL | Thời điểm tạo |

### Bảng liên kết `user_roles` và `role_permissions`
- `user_roles`: Khóa chính kết hợp `(user_id, role_id)`, Foreign Key đến `users(id)` và `roles(id)` với hành vi `ON DELETE CASCADE`.
- `role_permissions`: Khóa chính kết hợp `(role_id, permission_id)`, Foreign Key đến `roles(id)` và `permissions(id)` với hành vi `ON DELETE CASCADE`.

---

## 3. Lược đồ các bảng Tuyển sinh & Hồ sơ điện tử (Admission Tables - V3 Migration)

### Bảng `license_categories` (Danh mục Hạng Giấy phép lái xe)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính hạng GPLX |
| `code` | VARCHAR(20) | UNIQUE, NOT NULL | Mã hạng GPLX (A1, A, B1, B, C1, C,...) |
| `name` | VARCHAR(100) | NOT NULL | Tên đầy đủ của hạng bằng lái xe |
| `description` | TEXT | NULL | Diễn giải quy chuẩn phương tiện được phép điều khiển |
| `min_age` | INT | NOT NULL, DEFAULT 18 | Độ tuổi tối thiểu theo quy định |
| `tuition_fee` | DECIMAL(15,2) | NOT NULL, DEFAULT 0.00 | Mức học phí đào tạo |
| `is_active` | TINYINT(1) | NOT NULL, DEFAULT 1 | Trạng thái mở tiếp nhận hồ sơ |
| `created_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Thời điểm tạo |
| `updated_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE | Thời điểm cập nhật |

### Bảng `applications` (Hồ sơ đăng ký tuyển sinh)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính hồ sơ |
| `application_code`| VARCHAR(50) | UNIQUE, NOT NULL | Mã định danh hồ sơ (`APP-CATEGORY-YYYYMMDD-XXXX`) |
| `user_id` | BIGINT | FK → `users(id)`, NOT NULL | Tài khoản học viên nộp hồ sơ |
| `category_id` | BIGINT | FK → `license_categories(id)`, NOT NULL | Hạng bằng lái xe đăng ký |
| `full_name` | VARCHAR(100) | NOT NULL | Họ và tên học viên |
| `national_id` | VARCHAR(20) | NOT NULL, INDEX | Số thẻ CCCD / CMND |
| `date_of_birth` | DATE | NOT NULL | Ngày tháng năm sinh |
| `gender` | VARCHAR(10) | NOT NULL, DEFAULT 'MALE' | Giới tính (MALE, FEMALE, OTHER) |
| `phone` | VARCHAR(20) | NOT NULL | Số điện thoại liên hệ |
| `email` | VARCHAR(100) | NOT NULL | Địa chỉ thư điện tử |
| `address` | VARCHAR(255) | NOT NULL | Địa chỉ liên lạc thường trú/tạm trú |
| `status` | VARCHAR(30) | NOT NULL, INDEX | Trạng thái hồ sơ (`SUBMITTED`, `UNDER_REVIEW`, `APPROVED`, `REJECTED`, `SUPPLEMENT_REQUIRED`) |
| `rejection_reason`| TEXT | NULL | Lý do từ chối hoặc yêu cầu bổ sung hồ sơ (ADM-002) |
| `reviewed_by` | BIGINT | FK → `users(id)`, NULL | Cán bộ tuyển sinh thực hiện xét duyệt |
| `reviewed_at` | DATETIME | NULL | Thời điểm thẩm định |
| `version` | BIGINT | NOT NULL, DEFAULT 0 | Khóa phiên bản chống Lost Updates (Optimistic Lock) |
| `created_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Ngày nộp hồ sơ |
| `updated_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE | Ngày cập nhật |

### Bảng `application_documents` (Tài liệu số hóa đính kèm)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính tài liệu |
| `application_id` | BIGINT | FK → `applications(id)` ON DELETE CASCADE | Hồ sơ sở hữu tài liệu |
| `document_type` | VARCHAR(50) | NOT NULL | Phân loại (`NATIONAL_ID_FRONT`, `NATIONAL_ID_BACK`, `HEALTH_CERTIFICATE`, `PORTRAIT_PHOTO`, `OTHER`) |
| `file_name` | VARCHAR(255) | NOT NULL | Tên tệp gốc |
| `file_url` | VARCHAR(500) | NOT NULL | Đường dẫn lưu trữ tài liệu |
| `file_size` | BIGINT | NOT NULL | Dung lượng tệp tính bằng byte |
| `mime_type` | VARCHAR(100) | NOT NULL | Định dạng MIME của tệp (image/jpeg, application/pdf,...) |
| `created_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Thời điểm tải lên |

### Bảng `application_status_history` (Nhật ký trạng thái thẩm định)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính bản ghi lịch sử |
| `application_id` | BIGINT | FK → `applications(id)` ON DELETE CASCADE | Hồ sơ được ghi nhận |
| `from_status` | VARCHAR(30) | NULL | Trạng thái nguồn |
| `to_status` | VARCHAR(30) | NOT NULL | Trạng thái đích |
| `note` | TEXT | NULL | Diễn giải, lý do hoặc ghi chú của cán bộ duyệt |
| `changed_by` | BIGINT | FK → `users(id)`, NULL | Người thực hiện thay đổi trạng thái |
| `created_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Thời điểm ghi nhận |


---

## 4. Lược đồ các bảng Học trực tuyến & Đào tạo thực hành (Learning & Training - V4 Migration)

### Bảng `courses` (Khóa đào tạo theo hạng)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính khóa đào tạo |
| `category_id` | BIGINT | FK → `license_categories(id)`, NOT NULL | Hạng GPLX đào tạo |
| `code` | VARCHAR(50) | UNIQUE, NOT NULL | Mã khóa đào tạo |
| `title` | VARCHAR(150) | NOT NULL | Tên khóa học |
| `description` | TEXT | NULL | Mô tả chi tiết |
| `total_hours` | INT | NOT NULL, DEFAULT 40 | Tổng số giờ đào tạo |
| `is_active` | TINYINT(1) | NOT NULL, DEFAULT 1 | Trạng thái mở tuyển |

### Bảng `course_lessons` (Bài giảng trực tuyến)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính bài giảng |
| `course_id` | BIGINT | FK → `courses(id)` ON DELETE CASCADE | Khóa học sở hữu |
| `title` | VARCHAR(200) | NOT NULL | Tiêu đề bài học |
| `content` | MEDIUMTEXT | NULL | Nội dung chi tiết bài giảng |
| `video_url` | VARCHAR(500) | NULL | Đường dẫn video bài học |
| `duration_minutes`| INT | NOT NULL, DEFAULT 45 | Thời lượng chuẩn của bài |
| `order_index` | INT | NOT NULL, DEFAULT 1 | Thứ tự bài học trong khóa |

### Bảng `learning_progress` (Tiến độ học tập của học viên)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính tiến độ |
| `user_id` | BIGINT | FK → `users(id)`, NOT NULL | Học viên |
| `lesson_id` | BIGINT | FK → `course_lessons(id)`, NOT NULL | Bài giảng |
| `completed` | TINYINT(1) | NOT NULL, DEFAULT 0 | Trạng thái hoàn thành (LRN-001, LRN-002) |
| `time_spent_seconds`| INT | NOT NULL, DEFAULT 0 | Thời lượng đã học (giây) |
| `completed_at` | DATETIME | NULL | Thời điểm hoàn thành bài học |

### Bảng `theory_questions` và `theory_answers` (Ngân hàng 600 câu hỏi lý thuyết)
- `theory_questions`: `category_code` (VARCHAR), `question_number` (INT), `content` (TEXT), `image_url` (VARCHAR), `explanation` (TEXT), `is_paralysis` (TINYINT(1) - Câu hỏi điểm liệt).
- `theory_answers`: `question_id` (FK), `answer_text` (TEXT), `is_correct` (TINYINT(1)), `order_index` (INT).

### Bảng `training_classes` (Lớp đào tạo thực tế)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính lớp học |
| `course_id` | BIGINT | FK → `courses(id)`, NOT NULL | Khóa đào tạo |
| `class_code` | VARCHAR(50) | UNIQUE, NOT NULL | Mã định danh lớp |
| `name` | VARCHAR(150) | NOT NULL | Tên lớp học |
| `instructor_id` | BIGINT | FK → `users(id)`, NOT NULL | Giảng viên chủ nhiệm |
| `start_date` | DATE | NOT NULL | Ngày khai giảng |
| `end_date` | DATE | NOT NULL | Ngày bế giảng dự kiến |
| `max_students` | INT | NOT NULL, DEFAULT 30 | Sĩ số tối đa |
| `status` | VARCHAR(30) | NOT NULL, DEFAULT 'PLANNED' | Trạng thái lớp (`PLANNED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`) |

### Bảng `training_schedules` (Lịch đào tạo chi tiết)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính lịch học |
| `class_id` | BIGINT | FK → `training_classes(id)` ON DELETE CASCADE | Lớp học |
| `title` | VARCHAR(150) | NOT NULL | Nội dung buổi đào tạo |
| `schedule_type` | VARCHAR(30) | NOT NULL | Phân loại (`THEORY`, `PRACTICE_YARD`, `PRACTICE_ROAD`, `CABIN_SIMULATION`) |
| `start_time` | DATETIME | NOT NULL | Thời điểm bắt đầu |
| `end_time` | DATETIME | NOT NULL | Thời điểm kết thúc |
| `location` | VARCHAR(200) | NOT NULL | Địa điểm (Phòng học, Sân tập, Đường trường) |
| `instructor_id` | BIGINT | FK → `users(id)`, NOT NULL | Giảng viên phụ trách (kiểm tra chống xung đột TRN-001) |
| `status` | VARCHAR(30) | NOT NULL, DEFAULT 'SCHEDULED' | Trạng thái buổi học |

### Bảng `attendance_records` (Điểm danh buổi học)
- Lưu `schedule_id`, `user_id`, `status` (`PRESENT`, `ABSENT`, `EXCUSED`), `checked_in_at` (DATETIME). Tuân thủ quy tắc điểm danh trong ngày diễn ra buổi học `TRN-002`.

### Bảng `dat_practice_sessions` (Giám sát thực hành DAT đường trường & Cabin mô phỏng)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính phiên thực hành |
| `user_id` | BIGINT | FK → `users(id)`, NOT NULL | Học viên lái xe |
| `instructor_id` | BIGINT | FK → `users(id)`, NOT NULL | Giáo viên bảo trợ lái |
| `session_type` | VARCHAR(30) | NOT NULL | Phân loại (`DAT_ROAD`, `CABIN_SIMULATOR`) |
| `start_time` | DATETIME | NOT NULL | Bắt đầu phiên lái xe |
| `end_time` | DATETIME | NOT NULL | Kết thúc phiên lái xe |
| `distance_km` | DECIMAL(6,2) | NOT NULL, DEFAULT 0.00 | Quãng đường thực tế đã chạy |
| `duration_minutes`| INT | NOT NULL, DEFAULT 0 | Số phút thực hành lái |
| `status` | VARCHAR(30) | NOT NULL, DEFAULT 'VERIFIED' | Trạng thái xác thực dữ liệu từ thiết bị DAT |
| `device_id` | VARCHAR(50) | NULL | Mã thiết bị giám sát hành trình DAT trên xe |


---

## Phase 4 — Examination Tables (Kỳ thi & Kết quả sát hạch - V5)

### Bảng `exam_sessions` (Kỳ thi sát hạch / Tốt nghiệp)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính kỳ thi |
| `exam_code` | VARCHAR(50) | UNIQUE, NOT NULL | Mã kỳ thi (`EXAM-B1-20261101-001`) |
| `name` | VARCHAR(150) | NOT NULL | Tên kỳ thi sát hạch |
| `category_id` | BIGINT | FK → `license_categories(id)`, NOT NULL | Hạng GPLX tổ chức thi |
| `exam_date` | DATE | NOT NULL | Ngày tổ chức sát hạch |
| `location` | VARCHAR(200) | NOT NULL | Địa điểm / Trung tâm sát hạch |
| `exam_type` | VARCHAR(30) | NOT NULL, DEFAULT 'CERTIFICATION' | `CERTIFICATION` (Sở GTVT) hoặc `GRADUATION` (Trường) |
| `status` | VARCHAR(30) | NOT NULL, DEFAULT 'PLANNED' | `PLANNED`, `REGISTRATION_OPEN`, `COMPLETED` |

### Bảng `exam_candidates` (Danh sách thí sinh & Số báo danh)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính thí sinh |
| `exam_session_id`| BIGINT | FK → `exam_sessions(id)`, NOT NULL | Kỳ thi tham dự |
| `user_id` | BIGINT | FK → `users(id)`, NOT NULL | Tài khoản học viên |
| `candidate_number`| VARCHAR(20) | NOT NULL | Số báo danh (SBD-B1-001) |
| `eligibility_status`| VARCHAR(30)| NOT NULL, DEFAULT 'QUALIFIED' | `QUALIFIED`, `DISQUALIFIED` (Thẩm định tự động EXM-001) |
| `disqualification_reason`| TEXT | NULL | Lý do không đủ điều kiện (nếu có) |

### Bảng `exam_results` (Bảng điểm 4 môn sát hạch & Bảo toàn vĩnh viễn EXM-002)
| Tên cột | Kiểu dữ liệu | Khóa/Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Khóa chính kết quả |
| `candidate_id` | BIGINT | FK → `exam_candidates(id)`, UNIQUE, NOT NULL | Thí sinh tương ứng |
| `theory_score` | INT | NULL | Điểm thi lý thuyết |
| `theory_passed` | BOOLEAN | NULL | Kết quả đạt lý thuyết (>= 27 hoặc theo hạng) |
| `simulation_score`| INT | NULL | Điểm mô phỏng tình huống (thang 50) |
| `simulation_passed`| BOOLEAN | NULL | Kết quả đạt mô phỏng (>= 35) |
| `yard_score` | INT | NULL | Điểm thực hành sa hình (thang 100) |
| `yard_passed` | BOOLEAN | NULL | Kết quả đạt sa hình (>= 80) |
| `road_score` | INT | NULL | Điểm thực hành đường trường (thang 100) |
| `road_passed` | BOOLEAN | NULL | Kết quả đạt đường trường (>= 80) |
| `finalResult` | VARCHAR(30) | NOT NULL, DEFAULT 'PENDING' | `PENDING`, `PASSED`, `FAILED` |
| `examiner_id` | BIGINT | FK → `users(id)`, NULL | Sát hạch viên ký biên bản chấm điểm |
| `examiner_note` | TEXT | NULL | Nhận xét của hội đồng sát hạch |
