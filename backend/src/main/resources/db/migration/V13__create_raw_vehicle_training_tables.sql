-- =============================================================================
-- Migration V13: Phân Hệ Đào Tạo Xe Thô (Raw Vehicle Training Module)
-- Mô tả: Quản lý tiến độ làm quen xe ban đầu độc lập với lý thuyết và thi thử
-- Quy chuẩn: MySQL 8.4 LTS, UTF8MB4, đầy đủ Foreign Keys, Indexes & Audit Fields
-- =============================================================================

-- 1. Bảng Cấu hình các giai đoạn kỹ năng xe thô
CREATE TABLE raw_vehicle_stages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    stage_code VARCHAR(50) NOT NULL,
    stage_name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    step_order INT NOT NULL,
    prerequisite_stage_code VARCHAR(50) NULL,
    expected_duration_minutes INT NOT NULL DEFAULT 60,
    evaluation_criteria TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    compliance_status VARCHAR(30) NOT NULL DEFAULT 'INTERNAL_RULE',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_rvt_stage_code UNIQUE (stage_code),
    INDEX idx_rvt_stages_order (step_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Bảng Đăng ký chương trình đào tạo xe thô của học viên
CREATE TABLE raw_vehicle_enrollments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    instructor_id BIGINT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ENROLLED',
    enrolled_date DATE NOT NULL,
    completed_date DATE NULL,
    total_completed_stages INT NOT NULL DEFAULT 0,
    total_confirmed_minutes INT NOT NULL DEFAULT 0,
    total_sessions_count INT NOT NULL DEFAULT 0,
    notes TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_rvt_student_category UNIQUE (student_id, category_id),
    CONSTRAINT fk_rvt_enroll_student FOREIGN KEY (student_id) REFERENCES users (id),
    CONSTRAINT fk_rvt_enroll_category FOREIGN KEY (category_id) REFERENCES license_categories (id),
    CONSTRAINT fk_rvt_enroll_instructor FOREIGN KEY (instructor_id) REFERENCES users (id),

    INDEX idx_rvt_enroll_student (student_id),
    INDEX idx_rvt_enroll_instructor (instructor_id),
    INDEX idx_rvt_enroll_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Bảng Lịch các buổi thực hành xe thô
CREATE TABLE raw_vehicle_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_code VARCHAR(50) NOT NULL,
    instructor_id BIGINT NOT NULL,
    vehicle_id BIGINT NOT NULL,
    stage_id BIGINT NULL,
    practice_location VARCHAR(255) NOT NULL,
    scheduled_start_time DATETIME NOT NULL,
    scheduled_end_time DATETIME NOT NULL,
    actual_start_time DATETIME NULL,
    actual_end_time DATETIME NULL,
    actual_duration_minutes INT NOT NULL DEFAULT 0,
    max_students INT NOT NULL DEFAULT 2,
    status VARCHAR(30) NOT NULL DEFAULT 'SCHEDULED',
    safety_checklist_passed BOOLEAN NOT NULL DEFAULT FALSE,
    instructor_notes TEXT NULL,
    cancel_reason VARCHAR(255) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_rvt_session_code UNIQUE (session_code),
    CONSTRAINT fk_rvt_session_instructor FOREIGN KEY (instructor_id) REFERENCES users (id),
    CONSTRAINT fk_rvt_session_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles (id),
    CONSTRAINT fk_rvt_session_stage FOREIGN KEY (stage_id) REFERENCES raw_vehicle_stages (id),

    INDEX idx_rvt_sessions_instructor (instructor_id),
    INDEX idx_rvt_sessions_vehicle (vehicle_id),
    INDEX idx_rvt_sessions_scheduled_time (scheduled_start_time, scheduled_end_time),
    INDEX idx_rvt_sessions_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Bảng Học viên tham gia & Điểm danh buổi thực hành xe thô
CREATE TABLE raw_vehicle_session_attendees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id BIGINT NOT NULL,
    enrollment_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    attendance_status VARCHAR(30) NOT NULL DEFAULT 'NOT_YET',
    attended_at DATETIME NULL,
    instructor_feedback TEXT NULL,
    skills_to_improve TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_rvt_session_student UNIQUE (session_id, student_id),
    CONSTRAINT fk_rvt_att_session FOREIGN KEY (session_id) REFERENCES raw_vehicle_sessions (id) ON DELETE CASCADE,
    CONSTRAINT fk_rvt_att_enrollment FOREIGN KEY (enrollment_id) REFERENCES raw_vehicle_enrollments (id),
    CONSTRAINT fk_rvt_att_student FOREIGN KEY (student_id) REFERENCES users (id),

    INDEX idx_rvt_att_session (session_id),
    INDEX idx_rvt_att_student (student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Bảng Kết quả Đánh giá kỹ năng học viên theo tiêu chí
CREATE TABLE raw_vehicle_skill_evaluations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    enrollment_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    stage_id BIGINT NOT NULL,
    criterion_code VARCHAR(50) NOT NULL,
    skill_name VARCHAR(150) NOT NULL,
    rating_level INT NOT NULL DEFAULT 0,
    evaluation_status VARCHAR(30) NOT NULL DEFAULT 'NOT_EVALUATED',
    comments TEXT NULL,
    evaluated_by_id BIGINT NOT NULL,
    evaluated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_rvt_eval_enrollment FOREIGN KEY (enrollment_id) REFERENCES raw_vehicle_enrollments (id),
    CONSTRAINT fk_rvt_eval_student FOREIGN KEY (student_id) REFERENCES users (id),
    CONSTRAINT fk_rvt_eval_stage FOREIGN KEY (stage_id) REFERENCES raw_vehicle_stages (id),
    CONSTRAINT fk_rvt_eval_instructor FOREIGN KEY (evaluated_by_id) REFERENCES users (id),

    INDEX idx_rvt_eval_enrollment (enrollment_id),
    INDEX idx_rvt_eval_student_stage (student_id, stage_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Bảng Nhật ký thay đổi lịch / điều chỉnh buổi học (Audit Trail)
CREATE TABLE raw_vehicle_session_change_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id BIGINT NOT NULL,
    changed_by_id BIGINT NOT NULL,
    change_type VARCHAR(50) NOT NULL,
    old_value TEXT NULL,
    new_value TEXT NULL,
    reason VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_rvt_log_session FOREIGN KEY (session_id) REFERENCES raw_vehicle_sessions (id) ON DELETE CASCADE,
    CONSTRAINT fk_rvt_log_user FOREIGN KEY (changed_by_id) REFERENCES users (id),

    INDEX idx_rvt_log_session (session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Seed dữ liệu 8 giai đoạn kỹ năng chuẩn làm quen xe ban đầu
INSERT INTO raw_vehicle_stages (stage_code, stage_name, description, step_order, prerequisite_stage_code, expected_duration_minutes, evaluation_criteria, compliance_status)
VALUES
('RVT_STAGE_01', 'Nhận biết cấu tạo và bộ phận điều khiển', 'Khảo sát khoang động cơ cơ bản, vị trí ắc quy, nước làm mát, bảng taplo, đèn cảnh báo nguy hiểm, công tắc đèn, còi và gạt mưa.', 1, NULL, 60, 'Nhận diện đúng 100% đèn báo và công tắc điều khiển cơ bản trên taplo.', 'INTERNAL_RULE'),
('RVT_STAGE_02', 'Điều chỉnh ghế, gương và tư thế ngồi', 'Thao tác điều chỉnh cự ly và độ ngả ghế lái, chỉnh 3 gương chiếu hậu triệt tiêu điểm mù, thắt dây an toàn đúng kỹ thuật.', 2, 'RVT_STAGE_01', 60, 'Tư thế ngồi thoải mái, góc nhìn quan sát gương rõ nét, hai tay đặt chuẩn vị trí 9h-3h hoặc 10h-2h.', 'INTERNAL_RULE'),
('RVT_STAGE_03', 'Làm quen vô lăng, bàn đạp và cần số', 'Luyện tập cảm giác chân côn, chân phanh, chân ga bằng mũi chân; thao tác gạt các cấp số theo sơ đồ chữ H; kéo hạ phanh tay an toàn.', 3, 'RVT_STAGE_02', 90, 'Thao tác côn - số nhịp nhàng, mắt nhìn thẳng phía trước không nhìn xuống cần số khi chuyển số.', 'INTERNAL_RULE'),
('RVT_STAGE_04', 'Kiểm tra an toàn xe trước khi bắt đầu', 'Quy trình kiểm tra an toàn quanh xe (lốp, chướng ngại vật, cửa đóng chặt, mức nhiên liệu, xác nhận phanh tay đã kéo và số ở N/P).', 4, 'RVT_STAGE_03', 45, 'Thực hiện đầy đủ 5 bước checklist an toàn trước khi bước vào vị trí lái xe.', 'INTERNAL_RULE'),
('RVT_STAGE_05', 'Khởi động máy, xuất phát và dừng xe êm', 'Thao tác đạp hết côn, bật chìa khóa/bấm nút khởi động, vào số 1, hạ phanh tay, bật xi-nhan trái, nhả nhẹ côn tìm điểm tiếp giáp để xe lăn bánh êm ái và phanh dừng an toàn.', 5, 'RVT_STAGE_04', 90, 'Xe xuất phát êm không bị giật, không chết máy; dừng xe đúng vạch và khoảng cách an toàn quy định.', 'INTERNAL_RULE'),
('RVT_STAGE_06', 'Điều khiển xe ở khu vực thực hành tốc độ chậm', 'Tập kỹ thuật quay vô lăng chéo tay (hand-over-hand), giữ đúng tâm đường, căn khoảng cách hai bên thành xe, trả lái mượt mà sau khi vào cua.', 6, 'RVT_STAGE_05', 90, 'Quỹ đạo xe ổn định, không chém cua, tốc độ duy trì đều dưới 15 km/h trong sân tập khép kín.', 'INTERNAL_RULE'),
('RVT_STAGE_07', 'Thực hành các thao tác cơ bản có giám sát', 'Phối hợp nhịp nhàng chân ga - chân phanh trong không gian hẹp, lùi xe thẳng lái khoảng cách 20m, căn dừng xe theo hiệu lệnh giáo viên.', 7, 'RVT_STAGE_06', 90, 'Thực hiện chuẩn xác bài lùi xe thẳng và căn dừng khoảng cách xe an toàn dưới sự giám sát trực tiếp.', 'INTERNAL_RULE'),
('RVT_STAGE_08', 'Đánh giá kỹ năng và đề xuất buổi tiếp theo', 'Bài kiểm tra thực hành tổng hợp các thao tác từ chuẩn bị -> khởi hành -> cua rẽ -> lùi xe -> dừng xe tắt máy rời xe an toàn.', 8, 'RVT_STAGE_07', 60, 'Đạt tối thiểu mức 3/5 trên toàn bộ tiêu chí kỹ năng; giáo viên xác nhận đủ tự tin chuyển sang bài sa hình chính quy.', 'INTERNAL_RULE');
