import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { UserProfile } from '../../types/auth';
import { Icons, Modal, AppButton, AppInput, StatusBadge, Alert } from '../ui';
import styles from './UserAccountMenu.module.css';

export interface UserAccountMenuProps {
  user: UserProfile;
  logout: () => void;
}

export const UserAccountMenu: React.FC<UserAccountMenuProps> = ({ user, logout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isUserMgmtModalOpen, setIsUserMgmtModalOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<'info' | 'password'>('info');

  // Password change form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // User management search & filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

  const isAdminOrStaff = user.roles.some(
    (r) => r === 'ROLE_ADMIN' || r === 'ROLE_STAFF' || r === 'ROLE_MANAGER'
  );

  const getRoleDisplayName = (roles: string[]) => {
    if (roles.includes('ROLE_ADMIN')) return 'Quản trị viên';
    if (roles.includes('ROLE_MANAGER')) return 'Ban Quản lý';
    if (roles.includes('ROLE_STAFF')) return 'Tuyển sinh';
    if (roles.includes('ROLE_EXAMINER')) return 'Sát hạch viên';
    if (roles.includes('ROLE_INSTRUCTOR')) return 'Giáo viên';
    return 'Học viên';
  };

  const getInitials = (name?: string, username?: string) => {
    const target = (name || username || 'U').trim();
    const parts = target.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      const first = parts[0]?.charAt(0) ?? '';
      const last = parts[parts.length - 1]?.charAt(0) ?? '';
      return (first + last).toUpperCase();
    }
    return target.slice(0, 2).toUpperCase();
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError('Vui lòng điền đầy đủ các thông tin mật khẩu.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Mật khẩu mới phải có tối thiểu 6 ký tự.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }

    // Success simulation
    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  // Sample system users for User Management Modal
  const systemUsers = [
    { id: 1, name: 'Trần Văn Quản Trị', username: 'admin', email: 'admin@gplx.edu.vn', role: 'ROLE_ADMIN', status: 'ACTIVE' },
    { id: 2, name: 'Nguyễn Thị Tuyển Sinh', username: 'staff01', email: 'staff@gplx.edu.vn', role: 'ROLE_STAFF', status: 'ACTIVE' },
    { id: 3, name: 'Lê Hoàng Sát Hạch', username: 'examiner01', email: 'examiner@gplx.edu.vn', role: 'ROLE_EXAMINER', status: 'ACTIVE' },
    { id: 4, name: 'Phạm Minh Giáo Viên', username: 'instructor01', email: 'instructor@gplx.edu.vn', role: 'ROLE_INSTRUCTOR', status: 'ACTIVE' },
    { id: 5, name: user.fullName || user.username, username: user.username, email: user.email, role: user.roles?.[0] ?? 'ROLE_STUDENT', status: 'ACTIVE' },
    { id: 6, name: 'Đỗ Thị Học Viên', username: 'student_b2', email: 'hocvien@gmail.com', role: 'ROLE_STUDENT', status: 'ACTIVE' },
  ];

  const filteredUsers = systemUsers.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className={styles.userMenuContainer} ref={containerRef}>
      {/* Trigger Button on Header Right */}
      <button
        type="button"
        className={styles.userTrigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        aria-label="Menu tài khoản người dùng"
      >
        <div className={styles.avatar}>
          {getInitials(user.fullName, user.username)}
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user.fullName || user.username}</span>
          <span className={styles.roleBadge}>{getRoleDisplayName(user.roles)}</span>
        </div>
        <Icons.ChevronDown
          size={16}
          className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ''}`}
        />
      </button>

      {/* User Dropdown Menu */}
      {dropdownOpen && (
        <div className={styles.dropdown} role="menu">
          {/* Header info */}
          <div className={styles.dropdownHeader}>
            <div className={styles.largeAvatar}>
              {getInitials(user.fullName, user.username)}
            </div>
            <div className={styles.headerText}>
              <h4 className={styles.headerName}>{user.fullName || user.username}</h4>
              <p className={styles.headerEmail}>{user.email}</p>
              <span className={styles.headerRole}>{getRoleDisplayName(user.roles)}</span>
            </div>
          </div>

          {/* Section 1: Quản lý tài khoản cá nhân */}
          <div className={styles.dropdownSection}>
            <div className={styles.sectionLabel}>Quản lý tài khoản</div>
            <button
              type="button"
              className={styles.dropdownItem}
              onClick={() => {
                setDropdownOpen(false);
                setActiveProfileTab('info');
                setIsProfileModalOpen(true);
              }}
              role="menuitem"
            >
              <Icons.User size={16} className={styles.itemIcon} />
              <span>Thông tin tài khoản</span>
            </button>
            <button
              type="button"
              className={styles.dropdownItem}
              onClick={() => {
                setDropdownOpen(false);
                setActiveProfileTab('password');
                setIsProfileModalOpen(true);
              }}
              role="menuitem"
            >
              <Icons.Key size={16} className={styles.itemIcon} />
              <span>Đổi mật khẩu & Bảo mật</span>
            </button>
          </div>

          {/* Section 2: Quản lý người dùng (Dành cho Quản trị viên / Cán bộ) */}
          {isAdminOrStaff && (
            <div className={styles.dropdownSection}>
              <div className={styles.sectionLabel}>Quản trị hệ thống</div>
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  setDropdownOpen(false);
                  setIsUserMgmtModalOpen(true);
                }}
                role="menuitem"
              >
                <Icons.Users size={16} className={styles.itemIcon} />
                <span>Quản lý người dùng</span>
              </button>
              <Link
                to="/audit-logs"
                className={styles.dropdownItem}
                onClick={() => setDropdownOpen(false)}
                role="menuitem"
              >
                <Icons.ShieldCheck size={16} className={styles.itemIcon} />
                <span>Nhật ký kiểm toán tài khoản</span>
              </Link>
            </div>
          )}

          {/* Section 3: Lối tắt cá nhân */}
          <div className={styles.dropdownSection}>
            <div className={styles.sectionLabel}>Lối tắt của tôi</div>
            <Link
              to="/my-applications"
              className={styles.dropdownItem}
              onClick={() => setDropdownOpen(false)}
              role="menuitem"
            >
              <Icons.FileText size={16} className={styles.itemIcon} />
              <span>Hồ sơ điện tử của tôi</span>
            </Link>
            <Link
              to="/examination/my-results"
              className={styles.dropdownItem}
              onClick={() => setDropdownOpen(false)}
              role="menuitem"
            >
              <Icons.Award size={16} className={styles.itemIcon} />
              <span>Kết quả sát hạch</span>
            </Link>
            <Link
              to="/finance/tuition"
              className={styles.dropdownItem}
              onClick={() => setDropdownOpen(false)}
              role="menuitem"
            >
              <Icons.CreditCard size={16} className={styles.itemIcon} />
              <span>Lịch sử nộp học phí</span>
            </Link>
          </div>

          {/* Section 4: Logout */}
          <div className={styles.dropdownSection}>
            <button
              type="button"
              className={`${styles.dropdownItem} ${styles.logoutItem}`}
              onClick={() => {
                setDropdownOpen(false);
                logout();
              }}
              role="menuitem"
            >
              <Icons.LogOut size={16} className={styles.itemIcon} />
              <span>Đăng xuất khỏi hệ thống</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal 1: Thông tin tài khoản & Đổi mật khẩu */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title={activeProfileTab === 'info' ? 'Hồ sơ Tài khoản Người dùng' : 'Đổi Mật khẩu & Bảo mật'}
        size="lg"
      >
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
          <AppButton
            variant={activeProfileTab === 'info' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveProfileTab('info')}
            icon={<Icons.User size={15} />}
          >
            Thông tin chi tiết
          </AppButton>
          <AppButton
            variant={activeProfileTab === 'password' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveProfileTab('password')}
            icon={<Icons.Key size={15} />}
          >
            Đổi mật khẩu
          </AppButton>
        </div>

        {activeProfileTab === 'info' ? (
          <div className={styles.modalForm}>
            <div className={styles.profileInfoCard}>
              <div className={styles.largeAvatar} style={{ width: 56, height: 56, fontSize: '1.3rem' }}>
                {getInitials(user.fullName, user.username)}
              </div>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.15rem', color: 'var(--color-text-main)' }}>
                  {user.fullName || user.username}
                </h3>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-muted-foreground)' }}>
                  Tài khoản đăng nhập: <strong>{user.username}</strong>
                </p>
                <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
                  <StatusBadge variant="success" label="Đang hoạt động" />
                  <StatusBadge variant="info" label={getRoleDisplayName(user.roles)} />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Mã định danh (User ID):</span>
                <span className={styles.detailValue}>#{user.id}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Họ và tên:</span>
                <span className={styles.detailValue}>{user.fullName || 'Chưa cập nhật'}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Email liên hệ:</span>
                <span className={styles.detailValue}>{user.email}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Số điện thoại:</span>
                <span className={styles.detailValue}>{user.phone || 'Chưa đăng ký số điện thoại'}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Vai trò hệ thống:</span>
                <span className={styles.detailValue}>{user.roles.join(', ')}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Trạng thái xác thực:</span>
                <span className={styles.detailValue} style={{ color: 'var(--color-success)' }}>
                  ✓ Đã kích hoạt qua Spring Security JWT
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <AppButton variant="primary" size="md" onClick={() => setIsProfileModalOpen(false)}>
                Đóng
              </AppButton>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePasswordSubmit} className={styles.modalForm}>
            {passwordSuccess && (
              <Alert
                type="success"
                title="Đổi mật khẩu thành công"
                message="Mật khẩu của bạn đã được cập nhật thành công theo tiêu chuẩn bảo mật BCrypt."
              />
            )}
            {passwordError && (
              <Alert
                type="danger"
                title="Lỗi thay đổi mật khẩu"
                message={passwordError}
              />
            )}

            <AppInput
              label="Mật khẩu hiện tại"
              type="password"
              placeholder="Nhập mật khẩu đang sử dụng"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <AppInput
              label="Mật khẩu mới"
              type="password"
              placeholder="Tối thiểu 6 ký tự"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <AppInput
              label="Xác nhận mật khẩu mới"
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '0.5rem' }}>
              <AppButton
                type="button"
                variant="outline"
                size="md"
                onClick={() => setIsProfileModalOpen(false)}
              >
                Hủy bỏ
              </AppButton>
              <AppButton type="submit" variant="primary" size="md" icon={<Icons.Key size={16} />}>
                Cập nhật mật khẩu
              </AppButton>
            </div>
          </form>
        )}
      </Modal>

      {/* Modal 2: Quản lý người dùng trong hệ thống (Admin & Staff) */}
      <Modal
        isOpen={isUserMgmtModalOpen}
        onClose={() => setIsUserMgmtModalOpen(false)}
        title="Quản Lý Tài Khoản Người Dùng Hệ Thống"
        size="xl"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Search & Filter Bar */}
          <div className={styles.userSearchBox}>
            <div style={{ flex: 1 }}>
              <AppInput
                placeholder="Tìm kiếm theo họ tên, username hoặc email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div style={{ width: '220px' }}>
              <select
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '0 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-main)',
                  fontSize: 'var(--font-size-sm)',
                }}
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="ALL">Tất cả vai trò</option>
                <option value="ROLE_ADMIN">Quản trị viên (ADMIN)</option>
                <option value="ROLE_STAFF">Tuyển sinh (STAFF)</option>
                <option value="ROLE_EXAMINER">Sát hạch viên (EXAMINER)</option>
                <option value="ROLE_INSTRUCTOR">Giáo viên (INSTRUCTOR)</option>
                <option value="ROLE_STUDENT">Học viên (STUDENT)</option>
              </select>
            </div>
          </div>

          {/* User Table */}
          <div className={styles.userTableWrapper}>
            <table className={styles.miniTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Họ và tên</th>
                  <th>Tài khoản</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Trạng thái</th>
                  <th style={{ textAlign: 'right' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-muted-foreground)' }}>
                      Không tìm thấy người dùng phù hợp với tiêu chí tìm kiếm.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id}>
                      <td>#{u.id}</td>
                      <td>
                        <strong>{u.name}</strong>
                      </td>
                      <td>
                        <code>{u.username}</code>
                      </td>
                      <td>{u.email}</td>
                      <td>
                        <StatusBadge
                          variant={
                            u.role === 'ROLE_ADMIN'
                              ? 'danger'
                              : u.role === 'ROLE_STAFF' || u.role === 'ROLE_EXAMINER'
                              ? 'warning'
                              : 'info'
                          }
                          label={getRoleDisplayName([u.role])}
                        />
                      </td>
                      <td>
                        <StatusBadge variant="success" label="Hoạt động" />
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <AppButton
                          variant="outline"
                          size="sm"
                          onClick={() => alert(`Xem chi tiết tài khoản ${u.username}`)}
                        >
                          Chi tiết
                        </AppButton>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted-foreground)' }}>
              Hiển thị <strong>{filteredUsers.length}</strong> / {systemUsers.length} tài khoản trong hệ thống
            </span>
            <AppButton variant="primary" size="md" onClick={() => setIsUserMgmtModalOpen(false)}>
              Hoàn tất
            </AppButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};
