-- =====================================================
-- V6: Support Modules (Finance, Fleet, Notification, CRM)
-- Tables: fee_invoices, payment_receipts, vehicles, vehicle_maintenances, notifications, crm_leads
-- =====================================================

-- 1. Bảng Hóa đơn học phí (Finance)
CREATE TABLE fee_invoices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    invoice_code VARCHAR(50) NOT NULL,
    user_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    total_amount DECIMAL(15,2) NOT NULL,
    paid_amount DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    due_date DATE NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_fee_invoices_code UNIQUE (invoice_code),
    CONSTRAINT fk_fee_invoices_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_fee_invoices_category FOREIGN KEY (category_id) REFERENCES license_categories (id),

    INDEX idx_fee_invoices_user (user_id),
    INDEX idx_fee_invoices_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Bảng Biên lai nộp học phí (FIN-001: Idempotency, FIN-002: Bảo toàn vĩnh viễn)
CREATE TABLE payment_receipts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    receipt_code VARCHAR(50) NOT NULL,
    invoice_id BIGINT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    payment_method VARCHAR(30) NOT NULL,
    idempotency_key VARCHAR(100) NOT NULL,
    paid_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cashier_id BIGINT NULL,
    note VARCHAR(255) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_payment_receipts_code UNIQUE (receipt_code),
    CONSTRAINT uk_payment_receipts_idempotency UNIQUE (idempotency_key),
    CONSTRAINT fk_payment_receipts_invoice FOREIGN KEY (invoice_id) REFERENCES fee_invoices (id) ON DELETE CASCADE,
    CONSTRAINT fk_payment_receipts_cashier FOREIGN KEY (cashier_id) REFERENCES users (id) ON DELETE SET NULL,

    INDEX idx_payment_receipts_invoice (invoice_id),
    INDEX idx_payment_receipts_paid_at (paid_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Bảng Phương tiện tập lái (Fleet - FLT-001)
CREATE TABLE vehicles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    plate_number VARCHAR(20) NOT NULL,
    model VARCHAR(100) NOT NULL,
    category_id BIGINT NOT NULL,
    transmission VARCHAR(20) NOT NULL DEFAULT 'MANUAL',
    status VARCHAR(30) NOT NULL DEFAULT 'AVAILABLE',
    inspection_expiry_date DATE NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_vehicles_plate UNIQUE (plate_number),
    CONSTRAINT fk_vehicles_category FOREIGN KEY (category_id) REFERENCES license_categories (id),

    INDEX idx_vehicles_status (status),
    INDEX idx_vehicles_category (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Bảng Lịch sử bảo dưỡng phương tiện
CREATE TABLE vehicle_maintenances (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id BIGINT NOT NULL,
    maintenance_date DATE NOT NULL,
    description VARCHAR(255) NOT NULL,
    cost DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    performed_by VARCHAR(100) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_vehicle_maintenances_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles (id) ON DELETE CASCADE,
    INDEX idx_maintenances_vehicle (vehicle_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Bảng Thông báo (Notification - NTF-001)
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(30) NOT NULL DEFAULT 'INFO',
    is_read TINYINT(1) NOT NULL DEFAULT 0,
    deduplication_key VARCHAR(100) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uk_notifications_dedup UNIQUE (deduplication_key),
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,

    INDEX idx_notifications_user (user_id),
    INDEX idx_notifications_is_read (is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Bảng Khách hàng tiềm năng (CRM)
CREATE TABLE crm_leads (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NULL,
    interested_category_id BIGINT NULL,
    counselor_id BIGINT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'NEW',
    notes TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_crm_leads_category FOREIGN KEY (interested_category_id) REFERENCES license_categories (id) ON DELETE SET NULL,
    CONSTRAINT fk_crm_leads_counselor FOREIGN KEY (counselor_id) REFERENCES users (id) ON DELETE SET NULL,

    INDEX idx_crm_leads_counselor (counselor_id),
    INDEX idx_crm_leads_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed dữ liệu phương tiện mẫu & biểu phí
INSERT INTO vehicles (plate_number, model, category_id, transmission, status, inspection_expiry_date)
VALUES
    ('29A-888.12', 'Toyota Vios 1.5G 2023', (SELECT id FROM license_categories WHERE code = 'B1' LIMIT 1), 'AUTOMATIC', 'AVAILABLE', '2027-06-30'),
    ('29A-666.34', 'Hyundai Accent MT 2022', (SELECT id FROM license_categories WHERE code = 'B' LIMIT 1), 'MANUAL', 'AVAILABLE', '2027-05-15'),
    ('29A-999.56', 'Isuzu Forward 5 Tấn', (SELECT id FROM license_categories WHERE code = 'C' LIMIT 1), 'MANUAL', 'AVAILABLE', '2026-12-31'),
    ('29A-111.99', 'Honda Wave Alpha 110', (SELECT id FROM license_categories WHERE code = 'A1' LIMIT 1), 'MANUAL', 'AVAILABLE', '2028-01-01');
