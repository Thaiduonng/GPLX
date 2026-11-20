-- =============================================================================
-- Migration: V15__link_theory_questions_to_traffic_signs.sql
-- Description: Liên kết câu hỏi lý thuyết (chương biển báo) với danh mục traffic_signs.
--              Không dùng FK vì khóa duy nhất của traffic_signs là cặp (code, standard_version);
--              tính hợp lệ của mã được kiểm tra ở tầng ứng dụng.
-- =============================================================================

ALTER TABLE theory_questions
    ADD COLUMN traffic_sign_code VARCHAR(20) NULL AFTER legal_reference,
    ADD INDEX idx_theory_questions_sign (traffic_sign_code);
