-- =============================================================================
-- Migration V4: Learning and Training module tables
-- DBMS: MySQL 8.4 LTS (utf8mb4 / utf8mb4_unicode_ci)
-- =============================================================================

-- =============================================================================
-- Module: Learning (Khóa học, Bài giảng, Tiến độ, Ngân hàng câu hỏi lý thuyết)
-- =============================================================================

CREATE TABLE courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    code VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NULL,
    total_hours INT NOT NULL DEFAULT 40,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_courses_code UNIQUE (code),
    CONSTRAINT fk_courses_category FOREIGN KEY (category_id) REFERENCES license_categories (id) ON DELETE RESTRICT,
    INDEX idx_courses_category (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE course_lessons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content MEDIUMTEXT NULL,
    video_url VARCHAR(500) NULL,
    duration_minutes INT NOT NULL DEFAULT 45,
    order_index INT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_lessons_course FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE,
    INDEX idx_lessons_course_order (course_id, order_index)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE learning_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    lesson_id BIGINT NOT NULL,
    completed TINYINT(1) NOT NULL DEFAULT 0,
    time_spent_seconds INT NOT NULL DEFAULT 0,
    completed_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_learning_progress_user_lesson UNIQUE (user_id, lesson_id),
    CONSTRAINT fk_progress_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_progress_lesson FOREIGN KEY (lesson_id) REFERENCES course_lessons (id) ON DELETE CASCADE,
    INDEX idx_progress_user (user_id),
    INDEX idx_progress_lesson (lesson_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE theory_questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_code VARCHAR(20) NOT NULL,
    question_number INT NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(500) NULL,
    explanation TEXT NULL,
    is_paralysis TINYINT(1) NOT NULL DEFAULT 0, -- Câu hỏi điểm liệt
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_questions_category (category_code),
    INDEX idx_questions_paralysis (is_paralysis)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE theory_answers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    question_id BIGINT NOT NULL,
    answer_text TEXT NOT NULL,
    is_correct TINYINT(1) NOT NULL DEFAULT 0,
    order_index INT NOT NULL DEFAULT 1,

    CONSTRAINT fk_answers_question FOREIGN KEY (question_id) REFERENCES theory_questions (id) ON DELETE CASCADE,
    INDEX idx_answers_question (question_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- Module: Training (Lớp học, Lịch học, Điểm danh, Nhật ký DAT/Cabin)
-- =============================================================================

CREATE TABLE training_classes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    class_code VARCHAR(50) NOT NULL,
    name VARCHAR(150) NOT NULL,
    instructor_id BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    max_students INT NOT NULL DEFAULT 30,
    status VARCHAR(30) NOT NULL DEFAULT 'PLANNED',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_training_classes_code UNIQUE (class_code),
    CONSTRAINT fk_classes_course FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE RESTRICT,
    CONSTRAINT fk_classes_instructor FOREIGN KEY (instructor_id) REFERENCES users (id) ON DELETE RESTRICT,
    INDEX idx_classes_course (course_id),
    INDEX idx_classes_instructor (instructor_id),
    INDEX idx_classes_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE class_enrollments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    class_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ENROLLED',
    enrolled_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uk_enrollment_class_user UNIQUE (class_id, user_id),
    CONSTRAINT fk_enrollments_class FOREIGN KEY (class_id) REFERENCES training_classes (id) ON DELETE CASCADE,
    CONSTRAINT fk_enrollments_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    INDEX idx_enrollments_class (class_id),
    INDEX idx_enrollments_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE training_schedules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    class_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    schedule_type VARCHAR(30) NOT NULL DEFAULT 'THEORY',
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    location VARCHAR(200) NOT NULL,
    instructor_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'SCHEDULED',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_schedules_class FOREIGN KEY (class_id) REFERENCES training_classes (id) ON DELETE CASCADE,
    CONSTRAINT fk_schedules_instructor FOREIGN KEY (instructor_id) REFERENCES users (id) ON DELETE RESTRICT,
    INDEX idx_schedules_class (class_id),
    INDEX idx_schedules_instructor (instructor_id),
    INDEX idx_schedules_time (start_time, end_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE attendance_records (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    schedule_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PRESENT',
    checked_in_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    note VARCHAR(255) NULL,

    CONSTRAINT uk_attendance_schedule_user UNIQUE (schedule_id, user_id),
    CONSTRAINT fk_attendance_schedule FOREIGN KEY (schedule_id) REFERENCES training_schedules (id) ON DELETE CASCADE,
    CONSTRAINT fk_attendance_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    INDEX idx_attendance_schedule (schedule_id),
    INDEX idx_attendance_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE dat_practice_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    instructor_id BIGINT NOT NULL,
    session_type VARCHAR(30) NOT NULL DEFAULT 'DAT_ROAD',
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    distance_km DECIMAL(6, 2) NOT NULL DEFAULT 0.00,
    duration_minutes INT NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'VERIFIED',
    device_id VARCHAR(50) NULL,
    note TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_dat_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_dat_instructor FOREIGN KEY (instructor_id) REFERENCES users (id) ON DELETE RESTRICT,
    INDEX idx_dat_user (user_id),
    INDEX idx_dat_instructor (instructor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- Seed Initial Sample Theory Questions and Courses
-- =============================================================================

INSERT INTO courses (category_id, code, title, description, total_hours, is_active)
SELECT id, 'COURSE-B1-BASIC', 'Khóa đào tạo lái xe ô tô hạng B1 tự động', 'Chương trình đào tạo lái xe hạng B1 bao gồm lý thuyết Luật GTĐB, Kỹ thuật lái xe và thực hành trên sân/đường trường', 120, 1
FROM license_categories WHERE code = 'B1' LIMIT 1;

INSERT INTO course_lessons (course_id, title, content, video_url, duration_minutes, order_index)
SELECT id, 'Bài 1: Pháp luật giao thông đường bộ và Văn hóa giao thông', 'Tổng quan hệ thống biển báo, quy tắc nhường đường, tốc độ tối đa cho phép và đạo đức người lái xe.', 'https://video.gplx.edu.vn/bai1.mp4', 60, 1
FROM courses WHERE code = 'COURSE-B1-BASIC' LIMIT 1;

INSERT INTO course_lessons (course_id, title, content, video_url, duration_minutes, order_index)
SELECT id, 'Bài 2: Kỹ thuật lái xe ô tô cơ bản và Cấu tạo xe', 'Các bộ phận điều khiển, thao tác đánh lái, đạp phanh, giữ khoảng cách an toàn và xử lý tình huống khẩn cấp.', 'https://video.gplx.edu.vn/bai2.mp4', 90, 2
FROM courses WHERE code = 'COURSE-B1-BASIC' LIMIT 1;

-- Seed câu hỏi điểm liệt mẫu
INSERT INTO theory_questions (category_code, question_number, content, image_url, explanation, is_paralysis) VALUES
('B1', 1, 'Hành vi điều khiển xe cơ giới chạy quá tốc độ quy định, giành đường, vượt ẩu có bị nghiêm cấm hay không?', NULL, 'Hành vi chạy quá tốc độ, giành đường, vượt ẩu gây nguy hiểm trực tiếp đến an toàn giao thông và bị nghiêm cấm tuyệt đối theo Luật GTĐB.', 1),
('B1', 2, 'Khi lái xe trong khu đô thị từ 22 giờ đến 5 giờ sáng hôm sau, người lái xe phải báo hiệu bằng cách nào để xin vượt xe phía trước?', NULL, 'Từ 22h đến 5h sáng trong khu đô thị chỉ được báo hiệu xin vượt bằng đèn, không được dùng còi để tránh ô nhiễm tiếng ồn.', 0),
('B1', 3, 'Người điều khiển xe mô tô, ô tô sau khi sử dụng rượu bia (nồng độ cồn trong máu hoặc hơi thở) có được phép lái xe không?', NULL, 'Cấm tuyệt đối điều khiển phương tiện tham gia giao thông khi trong máu hoặc hơi thở có nồng độ cồn.', 1);

-- Seed đáp án cho câu hỏi 1
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES
(1, 'Bị nghiêm cấm tùy từng trường hợp.', 0, 1),
(1, 'Bị nghiêm cấm.', 1, 2),
(1, 'Không bị nghiêm cấm nếu vội.', 0, 3);

-- Seed đáp án cho câu hỏi 2
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES
(2, 'Phải báo hiệu bằng cả còi và đèn.', 0, 1),
(2, 'Chỉ được báo hiệu bằng đèn.', 1, 2),
(2, 'Chỉ được dùng còi thật to.', 0, 3);

-- Seed đáp án cho câu hỏi 3
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES
(3, 'Được lái xe nếu cảm thấy hoàn toàn tỉnh táo.', 0, 1),
(3, 'Nghiêm cấm tuyệt đối hành vi điều khiển phương tiện khi có nồng độ cồn.', 1, 2),
(3, 'Được lái xe nếu nồng độ cồn ở mức thấp dưới quy định.', 0, 3);
