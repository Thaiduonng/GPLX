-- =============================================================================
-- Migration V3: Admission module tables (License Categories, Applications, Documents, Status History)
-- DBMS: MySQL 8.4 LTS (utf8mb4 / utf8mb4_unicode_ci)
-- =============================================================================

CREATE TABLE license_categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NULL,
    min_age INT NOT NULL DEFAULT 18,
    tuition_fee DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_license_categories_code UNIQUE (code),
    INDEX idx_license_categories_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_code VARCHAR(50) NOT NULL,
    user_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    national_id VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL DEFAULT 'MALE',
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'SUBMITTED',
    rejection_reason TEXT NULL,
    reviewed_by BIGINT NULL,
    reviewed_at DATETIME NULL,
    version BIGINT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_applications_code UNIQUE (application_code),
    CONSTRAINT fk_applications_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT,
    CONSTRAINT fk_applications_category FOREIGN KEY (category_id) REFERENCES license_categories (id) ON DELETE RESTRICT,
    CONSTRAINT fk_applications_reviewer FOREIGN KEY (reviewed_by) REFERENCES users (id) ON DELETE SET NULL,

    INDEX idx_applications_user (user_id),
    INDEX idx_applications_category (category_id),
    INDEX idx_applications_status (status),
    INDEX idx_applications_national_id (national_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE application_documents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_documents_application FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE CASCADE,
    INDEX idx_documents_app_type (application_id, document_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE application_status_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    from_status VARCHAR(30) NULL,
    to_status VARCHAR(30) NOT NULL,
    note TEXT NULL,
    changed_by BIGINT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_history_application FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE CASCADE,
    CONSTRAINT fk_history_changed_by FOREIGN KEY (changed_by) REFERENCES users (id) ON DELETE SET NULL,
    INDEX idx_history_application (application_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- Seed Initial Standard License Categories
-- =============================================================================
INSERT INTO license_categories (code, name, description, min_age, tuition_fee, is_active, created_at, updated_at) VALUES
('A1', 'Hạng A1 - Xe mô tô hai bánh dung tích đến 125cc', 'Cấp cho người lái xe mô tô hai bánh có dung tích xi-lanh đến 125 cm3 hoặc có công suất động cơ điện đến 11 kW.', 18, 1200000.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('A', 'Hạng A - Xe mô tô hai bánh dung tích trên 125cc', 'Cấp cho người lái xe mô tô hai bánh có dung tích xi-lanh trên 125 cm3 hoặc có công suất động cơ điện trên 11 kW.', 18, 2500000.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('B1', 'Hạng B1 - Xe ô tô số tự động chở người đến 8 chỗ', 'Cấp cho người không hành nghề lái xe điều khiển ô tô số tự động chở người đến 8 chỗ ngồi, ô tô tải dưới 3.500 kg.', 18, 14500000.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('B', 'Hạng B - Xe ô tô số sàn và số tự động chở người đến 8 chỗ', 'Cấp cho người lái xe ô tô chở người đến 8 chỗ ngồi, xe ô tô tải có trọng tải thiết kế dưới 3.500 kg.', 18, 16000000.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('C1', 'Hạng C1 - Xe ô tô tải có trọng tải từ 3.500 kg đến 7.500 kg', 'Cấp cho người lái xe ô tô tải, ô tô chuyên dùng có khối lượng toàn bộ từ 3.500 kg đến 7.500 kg.', 18, 18500000.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('C', 'Hạng C - Xe ô tô tải có trọng tải trên 7.500 kg', 'Cấp cho người lái xe ô tô tải, ô tô chuyên dùng có khối lượng toàn bộ trên 7.500 kg.', 21, 21000000.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
