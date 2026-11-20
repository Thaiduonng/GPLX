-- =============================================================================
-- Migration: V13__create_traffic_signs_table.sql
-- Description: Danh mục biển báo hiệu đường bộ dùng chung cho ngân hàng câu hỏi
--              lý thuyết và mô phỏng sa hình (quy tắc LRN-SIGN-001).
-- =============================================================================

CREATE TABLE traffic_signs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    sign_group VARCHAR(20) NOT NULL,
    meaning TEXT NULL,
    shape VARCHAR(30) NULL,
    standard_version VARCHAR(30) NOT NULL,
    legal_status VARCHAR(30) NOT NULL DEFAULT 'NEEDS_VERIFICATION',
    legacy_code VARCHAR(20) NULL,
    replaced_by_code VARCHAR(20) NULL,
    svg_asset VARCHAR(255) NULL,
    raster_asset VARCHAR(255) NULL,
    search_text VARCHAR(400) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_traffic_signs_code_version (code, standard_version),
    INDEX idx_traffic_signs_group (sign_group),
    CONSTRAINT chk_traffic_signs_legal_status
        CHECK (legal_status IN ('VERIFIED', 'NEEDS_VERIFICATION', 'INTERNAL_RULE'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
