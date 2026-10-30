-- =============================================================================
-- Migration V14: Quảng Bá Khóa Học, Tuyển Sinh & CRM Quản Lý Hồ Sơ Học Viên
-- Mô tả: Mở rộng các trường khóa học công khai, bảng khách hàng tiềm năng (Leads),
--        lịch sử tương tác CRM, và liên kết hồ sơ tuyển sinh với lớp đào tạo chính thức
-- DBMS: MySQL 8.4 LTS (utf8mb4 / utf8mb4_unicode_ci)
-- =============================================================================

-- =============================================================================
-- 1. Mở Rộng Bảng `courses` Cho Quảng Bá & Tuyển Sinh
-- =============================================================================
ALTER TABLE courses
    ADD COLUMN slug VARCHAR(120) NULL AFTER code,
    ADD COLUMN tuition_fee DECIMAL(15, 2) NULL AFTER total_hours,
    ADD COLUMN expected_start_date DATE NULL AFTER tuition_fee,
    ADD COLUMN training_location VARCHAR(150) NULL AFTER expected_start_date,
    ADD COLUMN target_audience TEXT NULL AFTER training_location,
    ADD COLUMN curriculum_summary TEXT NULL AFTER target_audience,
    ADD COLUMN documents_required TEXT NULL AFTER curriculum_summary,
    ADD COLUMN banner_image_url VARCHAR(500) NULL AFTER documents_required,
    ADD COLUMN featured TINYINT(1) NOT NULL DEFAULT 0 AFTER banner_image_url;

ALTER TABLE courses
    ADD CONSTRAINT uk_courses_slug UNIQUE (slug),
    ADD INDEX idx_courses_featured (featured);

-- Cập nhật dữ liệu cho khóa học B1 hiện có
UPDATE courses
SET slug = 'khoa-hoc-lai-xe-o-to-b1-tu-dong',
    tuition_fee = 14500000.00,
    expected_start_date = '2026-11-15',
    training_location = 'Sân tập lái xe trung tâm - 136 Xuân Thủy, Cầu Giấy, Hà Nội',
    target_audience = 'Dành cho người lái xe ô tô số tự động đến 8 chỗ ngồi, không hành nghề kinh doanh vận tải.',
    curriculum_summary = 'Lý thuyết 6 chương CSGT (168 giờ) • Sa hình 11 bài chuẩn • Thực hành DAT đường trường 710km • Thực hành cabin điện tử 3 giờ.',
    documents_required = '02 bản photo CCCD gắn chip • 04 ảnh 3x4 phông nền trắng • Giấy khám sức khỏe lái xe đủ điều kiện hạng B1.',
    featured = 1
WHERE code = 'COURSE-B1-BASIC';

-- Seed thêm các khóa đào tạo chuẩn theo các hạng GPLX tuyển sinh
INSERT INTO courses (category_id, code, slug, title, description, total_hours, tuition_fee, expected_start_date, training_location, target_audience, curriculum_summary, documents_required, is_active, featured, created_at, updated_at) VALUES
(1, 'COURSE-A1-STD', 'khoa-hoc-lai-xe-may-a1', 'Khóa Đào Tạo Lái Xe Mô Tô Hạng A1', 'Chương trình đào tạo mô tô hai bánh dung tích dưới 125cm3 theo quy định Luật Trật tự an toàn giao thông đường bộ 2024.', 32, 1200000.00, '2026-11-10', 'Sân sát hạch số 1 - Khu liên hợp đào tạo GPLX', 'Người đủ 18 tuổi trở lên có nhu cầu điều khiển xe máy phổ thông, xe máy điện.', 'Lý thuyết 200 câu hỏi chuẩn • Thực hành chạy vòng số 8, đường thẳng, quanh co và gồ ghề.', '01 bản photo CCCD gắn chip • 02 ảnh 3x4 phông trắng • Giấy khám sức khỏe lái xe.', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'COURSE-A-PRO', 'khoa-hoc-mo-to-phan-khoi-lon-a', 'Khóa Đào Tạo Mô Tô Phân Khối Lớn Hạng A', 'Đào tạo người lái xe mô tô hai bánh dung tích xi-lanh trên 125cm3 hoặc công suất động cơ trên 11kW (hạng A2 cũ).', 48, 2500000.00, '2026-11-12', 'Sân tập sa hình xe phân khối lớn - Trung tâm GPLX', 'Người đam mê mô tô phân khối lớn, xe côn tay, xe touring, adventure.', 'Lý thuyết 450 câu hỏi • Thực hành xe phân khối lớn 250cc - 400cc sa hình số 8 và kỹ năng cua phanh khẩn cấp.', '01 bản photo CCCD gắn chip • 04 ảnh 3x4 • Giấy khám sức khỏe lái xe đủ điều kiện hạng A.', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'COURSE-B-PRO', 'khoa-hoc-lai-xe-o-to-hang-b', 'Khóa Đào Tạo Lái Xe Ô Tô Hạng B Chuyên Nghiệp', 'Chương trình học toàn diện cấp bằng lái xe ô tô số sàn & số tự động chở người đến 8 chỗ ngồi, xe tải dưới 3.500kg.', 252, 16000000.00, '2026-11-15', 'Cơ sở chính 136 Xuân Thủy & Sân tập xe thô Thượng Cát', 'Người đủ 18 tuổi trở lên, người lái xe gia đình, kinh doanh dịch vụ vận tải.', 'Lý thuyết 600 câu chuẩn CSGT • 810km thực hành lái xe trên đường có thiết bị DAT • 11 bài thi sa hình • Tập cabin mô phỏng 3D.', '02 bản photo CCCD gắn chip • 06 ảnh 3x4 phông trắng • Giấy khám sức khỏe lái xe liên thông.', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'COURSE-C-TRUCK', 'khoa-hoc-lai-xe-tai-hang-c', 'Khóa Đào Tạo Lái Xe Tải Hạng C Hạng Nặng', 'Đào tạo cấp giấy phép lái xe ô tô tải có trọng tải thiết kế trên 7.500kg và các loại xe quy định cho hạng B.', 312, 21000000.00, '2026-11-20', 'Sân đào tạo thực hành tải nặng - Bến Bạc, Tây Hồ', 'Nam/Nữ đủ 21 tuổi trở lên có sức khỏe tốt, mong muốn theo nghề vận tải đường dài chuyên nghiệp.', 'Lý thuyết nghiệp vụ vận tải & cấu tạo sửa chữa • 825km thực hành DAT xe tải 8 tấn • Sa hình xe tải và đường trường.', '02 bản photo CCCD • 06 ảnh 3x4 • Giấy khám sức khỏe hạng C (đủ 21 tuổi).', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- =============================================================================
-- 2. Mở Rộng Bảng `applications` (Hồ Sơ Đăng Ký) Cho Tuyển Sinh & Khách Vãng Lai
-- =============================================================================
ALTER TABLE applications
    DROP FOREIGN KEY fk_applications_user;

ALTER TABLE applications
    MODIFY user_id BIGINT NULL;

ALTER TABLE applications
    ADD CONSTRAINT fk_applications_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL;

ALTER TABLE applications
    ADD COLUMN course_id BIGINT NULL AFTER category_id,
    ADD COLUMN tracking_token VARCHAR(100) NULL AFTER application_code,
    ADD COLUMN assigned_staff_id BIGINT NULL AFTER reviewed_by,
    ADD COLUMN preferred_schedule VARCHAR(50) NULL AFTER address,
    ADD COLUMN training_location VARCHAR(150) NULL AFTER preferred_schedule,
    ADD COLUMN consent_data_processing TINYINT(1) NOT NULL DEFAULT 1 AFTER rejection_reason,
    ADD COLUMN enrolled_class_id BIGINT NULL AFTER consent_data_processing,
    ADD COLUMN enrolled_at DATETIME NULL AFTER enrolled_class_id;

ALTER TABLE applications
    ADD CONSTRAINT fk_applications_course FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE SET NULL,
    ADD CONSTRAINT fk_applications_assigned_staff FOREIGN KEY (assigned_staff_id) REFERENCES users (id) ON DELETE SET NULL,
    ADD CONSTRAINT fk_applications_enrolled_class FOREIGN KEY (enrolled_class_id) REFERENCES training_classes (id) ON DELETE SET NULL,
    ADD INDEX idx_applications_tracking (application_code, tracking_token),
    ADD INDEX idx_applications_assigned (assigned_staff_id),
    ADD INDEX idx_applications_course (course_id);

-- =============================================================================
-- 3. Bảng `admission_leads` (Khách Hàng Tiềm Năng & Yêu Cầu Tư Vấn)
-- =============================================================================
CREATE TABLE admission_leads (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lead_code VARCHAR(50) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NULL,
    category_id BIGINT NULL,
    course_id BIGINT NULL,
    preferred_contact_channel VARCHAR(30) NOT NULL DEFAULT 'PHONE',
    preferred_contact_time VARCHAR(50) NULL,
    training_location VARCHAR(150) NULL,
    preferred_start_date DATE NULL,
    source VARCHAR(50) NOT NULL DEFAULT 'HOMEPAGE',
    status VARCHAR(30) NOT NULL DEFAULT 'NEW',
    notes TEXT NULL,
    assigned_to BIGINT NULL,
    follow_up_at DATETIME NULL,
    converted_application_id BIGINT NULL,
    consent_gdpr TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_admission_leads_code UNIQUE (lead_code),
    CONSTRAINT fk_leads_category FOREIGN KEY (category_id) REFERENCES license_categories (id) ON DELETE SET NULL,
    CONSTRAINT fk_leads_course FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE SET NULL,
    CONSTRAINT fk_leads_assigned FOREIGN KEY (assigned_to) REFERENCES users (id) ON DELETE SET NULL,
    CONSTRAINT fk_leads_application FOREIGN KEY (converted_application_id) REFERENCES applications (id) ON DELETE SET NULL,

    INDEX idx_leads_phone (phone),
    INDEX idx_leads_status (status),
    INDEX idx_leads_source (source),
    INDEX idx_leads_category (category_id),
    INDEX idx_leads_assigned (assigned_to),
    INDEX idx_leads_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- 4. Bảng `lead_interactions` (Nhật Ký Tương Tác & Chăm Sóc Khách Hàng)
-- =============================================================================
CREATE TABLE lead_interactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lead_id BIGINT NOT NULL,
    staff_id BIGINT NOT NULL,
    interaction_type VARCHAR(30) NOT NULL DEFAULT 'CALL',
    content TEXT NOT NULL,
    result VARCHAR(50) NULL,
    next_action VARCHAR(150) NULL,
    next_action_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_interactions_lead FOREIGN KEY (lead_id) REFERENCES admission_leads (id) ON DELETE CASCADE,
    CONSTRAINT fk_interactions_staff FOREIGN KEY (staff_id) REFERENCES users (id) ON DELETE RESTRICT,

    INDEX idx_interactions_lead (lead_id),
    INDEX idx_interactions_staff (staff_id),
    INDEX idx_interactions_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- 5. Seed Dữ Liệu Mẫu Cho Leads Tuyển Sinh
-- =============================================================================
INSERT INTO admission_leads (lead_code, full_name, phone, email, category_id, course_id, preferred_contact_channel, preferred_contact_time, training_location, source, status, notes, assigned_to, follow_up_at, created_at, updated_at) VALUES
('LEAD-20261028-1001', 'Hoàng Minh Tuấn', '0912345678', 'tuan.hoang@gmail.com', 4, 3, 'PHONE', 'Buổi chiều (14:00 - 17:00)', 'Sân tập Cầu Giấy', 'HOMEPAGE', 'NEW', 'Học viên muốn học B2 số sàn thi sát hạch trước tết.', 7, DATE_ADD(NOW(), INTERVAL 1 DAY), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('LEAD-20261028-1002', 'Lê Thị Thu Thảo', '0988776655', 'thao.le@yahoo.com', 3, 1, 'ZALO', 'Buổi tối (19:00 - 21:00)', 'Sân tập Cầu Giấy', 'COURSE_DETAIL', 'CONTACTING', 'Cần tư vấn thời gian học xe tự động B1 vào cuối tuần.', 7, DATE_ADD(NOW(), INTERVAL 2 DAY), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('LEAD-20261028-1003', 'Trần Văn Nam', '0933221100', 'nam.tran@company.vn', 6, 4, 'PHONE', 'Giờ hành chính', 'Sân Bến Bạc Tây Hồ', 'CAMPAIGN', 'CONSULTED', 'Đã tư vấn khóa học xe tải hạng C, hẹn nộp hồ sơ vào tuần sau.', 3, DATE_ADD(NOW(), INTERVAL 3 DAY), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
