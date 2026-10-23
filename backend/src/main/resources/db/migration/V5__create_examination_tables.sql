-- =============================================================================
-- Migration V5: Examination module tables
-- DBMS: MySQL 8.4 LTS (utf8mb4 / utf8mb4_unicode_ci)
-- =============================================================================

CREATE TABLE exam_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    exam_code VARCHAR(50) NOT NULL,
    name VARCHAR(150) NOT NULL,
    category_id BIGINT NOT NULL,
    exam_date DATE NOT NULL,
    location VARCHAR(200) NOT NULL,
    exam_type VARCHAR(30) NOT NULL DEFAULT 'GRADUATION',
    status VARCHAR(30) NOT NULL DEFAULT 'PLANNED',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_exam_sessions_code UNIQUE (exam_code),
    CONSTRAINT fk_exam_sessions_category FOREIGN KEY (category_id) REFERENCES license_categories (id) ON DELETE RESTRICT,
    INDEX idx_exam_sessions_date (exam_date),
    INDEX idx_exam_sessions_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE exam_candidates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    exam_session_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    candidate_number VARCHAR(20) NOT NULL,
    eligibility_status VARCHAR(30) NOT NULL DEFAULT 'QUALIFIED',
    disqualification_reason VARCHAR(255) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_exam_candidate_user UNIQUE (exam_session_id, user_id),
    CONSTRAINT uk_exam_candidate_sbd UNIQUE (exam_session_id, candidate_number),
    CONSTRAINT fk_candidates_session FOREIGN KEY (exam_session_id) REFERENCES exam_sessions (id) ON DELETE CASCADE,
    CONSTRAINT fk_candidates_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT,
    INDEX idx_candidates_session (exam_session_id),
    INDEX idx_candidates_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE exam_results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    candidate_id BIGINT NOT NULL,
    theory_score INT NULL,
    theory_passed TINYINT(1) NULL,
    simulation_score INT NULL,
    simulation_passed TINYINT(1) NULL,
    yard_score INT NULL,
    yard_passed TINYINT(1) NULL,
    road_score INT NULL,
    road_passed TINYINT(1) NULL,
    final_result VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    examiner_id BIGINT NULL,
    examiner_note TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_exam_results_candidate UNIQUE (candidate_id),
    CONSTRAINT fk_results_candidate FOREIGN KEY (candidate_id) REFERENCES exam_candidates (id) ON DELETE RESTRICT,
    CONSTRAINT fk_results_examiner FOREIGN KEY (examiner_id) REFERENCES users (id) ON DELETE SET NULL,
    INDEX idx_results_final (final_result)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- Seed Sample Exam Session
-- =============================================================================
INSERT INTO exam_sessions (exam_code, name, category_id, exam_date, location, exam_type, status)
SELECT 'EXAM-B1-2026-01', 'Kỳ thi sát hạch cấp GPLX Hạng B1 Khóa 2026-01', id, DATE_ADD(CURRENT_DATE, INTERVAL 15 DAY), 'Trung tâm Sát hạch Lái xe TP Hà Nội', 'CERTIFICATION', 'PLANNED'
FROM license_categories WHERE code = 'B1' LIMIT 1;
