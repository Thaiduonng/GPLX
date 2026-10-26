-- =====================================================
-- V7: Reporting & Audit Logging Module
-- Creates: audit_logs table and seed sample audit records
-- =====================================================

CREATE TABLE audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NULL,
    username VARCHAR(50) NULL,
    action VARCHAR(50) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(50) NULL,
    details TEXT NULL,
    ip_address VARCHAR(50) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_audit_logs_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL,

    INDEX idx_audit_logs_resource (resource_type, resource_id),
    INDEX idx_audit_logs_action (action),
    INDEX idx_audit_logs_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed dữ liệu kiểm toán mẫu
INSERT INTO audit_logs (user_id, username, action, resource_type, resource_id, details, ip_address)
VALUES
    (NULL, 'admin', 'SYSTEM_INITIALIZE', 'SYSTEM', '0', 'Khởi tạo hệ thống đào tạo GPLX Modular Monolith', '127.0.0.1'),
    (NULL, 'admin', 'APPROVE_APPLICATION', 'ADMISSION', 'HS-B1-202610-0001', 'Phê duyệt hồ sơ điện tử đủ điều kiện sức khỏe', '192.168.1.10'),
    (NULL, 'admin', 'PUBLISH_EXAM', 'EXAMINATION', 'EXAM-B1-20261101-001', 'Mở kỳ sát hạch chính thức Sở GTVT', '192.168.1.10');
