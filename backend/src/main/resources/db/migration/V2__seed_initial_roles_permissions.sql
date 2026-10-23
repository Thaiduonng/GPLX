-- =============================================================================
-- Migration V2: Seed initial roles and standard permissions
-- =============================================================================

INSERT INTO roles (name, description, created_at, updated_at) VALUES
('ROLE_ADMIN', 'Quản trị viên hệ thống toàn quyền', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ROLE_MANAGER', 'Quản lý cơ sở đào tạo', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ROLE_STAFF', 'Nhân viên giáo vụ và tuyển sinh', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ROLE_INSTRUCTOR', 'Giáo viên đào tạo lý thuyết và thực hành', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ROLE_EXAMINER', 'Sát hạch viên kỳ thi', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ROLE_STUDENT', 'Học viên tham gia đào tạo', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ROLE_COUNSELOR', 'Tư vấn viên khóa học', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO permissions (name, description, module, created_at) VALUES
('identity:user:read', 'Xem danh sách và chi tiết người dùng', 'identity', CURRENT_TIMESTAMP),
('identity:user:create', 'Tạo tài khoản người dùng mới', 'identity', CURRENT_TIMESTAMP),
('identity:user:update', 'Cập nhật thông tin tài khoản người dùng', 'identity', CURRENT_TIMESTAMP),
('identity:user:delete', 'Vô hiệu hóa hoặc xóa tài khoản', 'identity', CURRENT_TIMESTAMP),
('admission:application:read', 'Xem danh sách hồ sơ tuyển sinh', 'admission', CURRENT_TIMESTAMP),
('admission:application:submit', 'Nộp hồ sơ tuyển sinh điện tử', 'admission', CURRENT_TIMESTAMP),
('admission:application:review', 'Thẩm định và phê duyệt hồ sơ', 'admission', CURRENT_TIMESTAMP),
('training:schedule:read', 'Xem lịch học lý thuyết và thực hành', 'training', CURRENT_TIMESTAMP),
('training:schedule:manage', 'Quản lý phân công lịch học và giáo viên', 'training', CURRENT_TIMESTAMP),
('examination:exam:read', 'Xem kỳ thi và điều kiện dự thi', 'examination', CURRENT_TIMESTAMP),
('examination:exam:manage', 'Quản lý kỳ thi và nhập kết quả sát hạch', 'examination', CURRENT_TIMESTAMP);

-- Gán toàn bộ quyền cho ROLE_ADMIN
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r CROSS JOIN permissions p WHERE r.name = 'ROLE_ADMIN';

-- Gán quyền cơ bản cho ROLE_STUDENT
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'ROLE_STUDENT' AND p.name IN (
    'admission:application:submit',
    'training:schedule:read',
    'examination:exam:read'
);
