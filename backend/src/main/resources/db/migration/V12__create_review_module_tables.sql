-- =============================================================================
-- Migration: V12__create_review_module_tables.sql
-- Description: Phân hệ Ôn tập thông minh & Lặp lại ngắt quãng (Spaced Repetition Review Module)
-- =============================================================================

-- 1. Bảng lưu trạng thái ghi nhớ và độ thành thạo của từng câu hỏi đối với từng học viên
CREATE TABLE question_retention_states (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    box_level INT NOT NULL DEFAULT 1,
    consecutive_correct INT NOT NULL DEFAULT 0,
    total_attempts INT NOT NULL DEFAULT 0,
    correct_attempts INT NOT NULL DEFAULT 0,
    incorrect_attempts INT NOT NULL DEFAULT 0,
    last_reviewed_at DATETIME NULL,
    next_review_at DATETIME NULL,
    interval_days INT NOT NULL DEFAULT 1,
    ease_factor DOUBLE NOT NULL DEFAULT 2.5,
    mastery_status VARCHAR(30) NOT NULL DEFAULT 'NEEDS_PRACTICE',
    priority_score DOUBLE NOT NULL DEFAULT 0.0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_retention_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_retention_question FOREIGN KEY (question_id) REFERENCES theory_questions (id) ON DELETE CASCADE,
    UNIQUE INDEX idx_retention_user_question (user_id, question_id),
    INDEX idx_retention_next_review (user_id, next_review_at),
    INDEX idx_retention_priority (user_id, priority_score),
    INDEX idx_retention_status (user_id, mastery_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Bảng phiên ôn tập (Review Sessions)
CREATE TABLE review_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_code VARCHAR(64) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    review_mode VARCHAR(50) NOT NULL, -- SMART, WRONG_ANSWERS, CRITICAL_PARALYSIS, BOOKMARKED, TOPIC, CATEGORY
    category_code VARCHAR(20) NULL,
    topic_id BIGINT NULL,
    total_questions INT NOT NULL DEFAULT 0,
    answered_questions INT NOT NULL DEFAULT 0,
    correct_answers INT NOT NULL DEFAULT 0,
    incorrect_answers INT NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'IN_PROGRESS', -- IN_PROGRESS, COMPLETED
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at DATETIME NULL,
    CONSTRAINT fk_review_sessions_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_review_sessions_topic FOREIGN KEY (topic_id) REFERENCES theory_topics (id) ON DELETE SET NULL,
    INDEX idx_review_sessions_user (user_id),
    INDEX idx_review_sessions_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Bảng chi tiết câu trả lời trong phiên ôn tập
CREATE TABLE review_session_answers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    selected_answer_id BIGINT NULL,
    is_correct TINYINT(1) NOT NULL DEFAULT 0,
    order_index INT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_review_answers_session FOREIGN KEY (session_id) REFERENCES review_sessions (id) ON DELETE CASCADE,
    CONSTRAINT fk_review_answers_question FOREIGN KEY (question_id) REFERENCES theory_questions (id) ON DELETE CASCADE,
    CONSTRAINT fk_review_answers_selected FOREIGN KEY (selected_answer_id) REFERENCES theory_answers (id) ON DELETE SET NULL,
    INDEX idx_review_answers_session (session_id),
    INDEX idx_review_answers_question (question_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
