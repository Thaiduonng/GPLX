export const roleLabels: Record<string, string> = {
  ROLE_ADMIN: 'Quản trị viên', ROLE_MANAGER: 'Quản lý', ROLE_STAFF: 'Giáo vụ / tuyển sinh',
  ROLE_INSTRUCTOR: 'Giáo viên', ROLE_EXAMINER: 'Sát hạch viên', ROLE_COUNSELOR: 'Tư vấn viên', ROLE_STUDENT: 'Học viên',
};
export interface NavigationItem { path: string; label: string; roles?: string[]; aliases?: string[]; staffLabel?: string }
export interface NavigationGroup { id: string; label: string; items: NavigationItem[] }
const study = ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_INSTRUCTOR', 'ROLE_STUDENT'];
const student = ['ROLE_ADMIN', 'ROLE_STUDENT'];
const office = ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_STAFF'];
const crm = [...office, 'ROLE_COUNSELOR'];
const training = [...office, 'ROLE_INSTRUCTOR', 'ROLE_STUDENT'];
export const navigationGroups: NavigationGroup[] = [
  { id: 'learning', label: 'Học tập & luyện lái', items: [
    { path: '/student/driving-simulation', label: 'Luyện sa hình với xe ảo', roles: study, aliases: ['/student/driving-simulation/2d'] },
    { path: '/theory', label: 'Học lý thuyết', roles: study, aliases: ['/theory-exam'] },
    { path: '/student/review', label: 'Ôn tập & thi thử', roles: study, aliases: ['/theory-review'] },
    { path: '/road-signs', label: 'Biển báo giao thông', roles: study },
    { path: '/tips', label: 'Hướng dẫn ôn tập', roles: study },
    { path: '/student/raw-vehicle', label: 'Làm quen xe ban đầu', roles: [...student, 'ROLE_MANAGER'], aliases: ['/student/raw_vehicle', '/student/raw vehicle'] },
  ] },
  { id: 'personal', label: 'Hồ sơ của tôi', items: [
    { path: '/my-applications', label: 'Hồ sơ của tôi', roles: student },
    { path: '/admissions/new', label: 'Nộp hồ sơ mới', roles: student, aliases: ['/submit-application'] },
    { path: '/examination/eligibility', label: 'Điều kiện dự thi của tôi', roles: student },
    { path: '/examination/my-results', label: 'Kết quả sát hạch của tôi', roles: student },
  ] },
  { id: 'admission', label: 'Tuyển sinh & tư vấn', items: [
    { path: '/admin/admissions/dashboard', label: 'Tổng quan tuyển sinh', roles: crm },
    { path: '/admin/admissions/leads', label: 'Khách hàng & tư vấn (CRM)', roles: crm },
    { path: '/admin/admissions', label: 'Tiếp nhận & thẩm định hồ sơ', roles: office, aliases: ['/admin/admissions/applications'] },
  ] },
  { id: 'training', label: 'Đào tạo & phương tiện', items: [
    { path: '/admin/theory', label: 'Ngân hàng câu hỏi & cấu hình đề', roles: ['ROLE_ADMIN', 'ROLE_STAFF'] },
    { path: '/training/schedules', label: 'Lịch học & thực hành', roles: training },
    { path: '/instructor/raw-vehicle', label: 'Giảng dạy & đánh giá xe thô', roles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_INSTRUCTOR'] },
    { path: '/training/raw-vehicle', label: 'Xếp lịch & quản lý xe thô', roles: office },
    { path: '/fleet', label: 'Đội xe & bảo dưỡng', roles: [...office, 'ROLE_INSTRUCTOR'] },
  ] },
  { id: 'examination', label: 'Tổ chức sát hạch', items: [
    { path: '/examination/sessions', label: 'Các kỳ sát hạch', roles: [...office, 'ROLE_EXAMINER', 'ROLE_STUDENT'] },
    { path: '/examination/grading', label: 'Chấm điểm sát hạch', roles: ['ROLE_ADMIN', 'ROLE_EXAMINER'] },
  ] },
  { id: 'finance', label: 'Học phí & tài chính', items: [
    { path: '/finance/tuition', label: 'Học phí của tôi', staffLabel: 'Hóa đơn & thu học phí', roles: [...office, 'ROLE_STUDENT'] },
  ] },
  { id: 'reporting', label: 'Quản trị & giám sát', items: [
    { path: '/dashboard', label: 'Báo cáo tổng quan', roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
    { path: '/audit-logs', label: 'Nhật ký kiểm toán', roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
  ] },
  { id: 'public', label: 'Thông tin & đăng ký', items: [
    { path: '/', label: 'Trang chủ' }, { path: '/license-categories', label: '15 hạng GPLX' }, { path: '/courses', label: 'Khóa đào tạo' },
    { path: '/apply', label: 'Đăng ký học trực tuyến' },
    { path: '/application-status', label: 'Tra cứu hồ sơ', aliases: ['/apply/track'] },
  ] },
];
export const normalizePath = (path: string) => decodeURI(path).replace(/\/+$/, '') || '/';
export function findNavigationItem(path: string): NavigationItem | undefined {
  const normalized = normalizePath(path);
  return navigationGroups.flatMap(group => group.items).find(item => item.path === normalized || item.aliases?.includes(normalized));
}
export function canAccessItem(item: NavigationItem, roles: readonly string[]): boolean {
  return !item.roles || item.roles.some(role => roles.includes(role));
}
export function canAccessPath(path: string, roles: readonly string[]): boolean {
  const item = findNavigationItem(path);
  return !!item && canAccessItem(item, roles);
}
export function getNavigationGroups(roles: readonly string[]): NavigationGroup[] {
  return navigationGroups.map(group => ({ ...group, items: group.items.filter(item => canAccessItem(item, roles)).map(item => ({
    ...item, label: item.staffLabel && roles.some(role => office.includes(role)) ? item.staffLabel : item.label,
  })) })).filter(group => group.items.length > 0);
}
export function isNavigationActive(path: string, item: NavigationItem): boolean {
  return findNavigationItem(path)?.path === item.path || (item.path === '/courses' && normalizePath(path).startsWith('/courses/'));
}
export function getRoleLabel(roles: readonly string[]): string {
  return Object.keys(roleLabels).filter(role => roles.includes(role)).map(role => roleLabels[role]).join(' · ') || 'Chưa có vai trò';
}
export function getQuickLinks(roles: readonly string[]): NavigationItem[] {
  const items = getNavigationGroups(roles).filter(group => group.id !== 'public').flatMap(group => group.items);
  const priorities = roles.includes('ROLE_ADMIN') || roles.includes('ROLE_MANAGER')
    ? ['/dashboard', '/student/driving-simulation', '/admin/admissions/dashboard', '/training/schedules', '/finance/tuition', '/audit-logs']
    : roles.includes('ROLE_STUDENT')
    ? ['/student/driving-simulation', '/theory', '/training/schedules', '/my-applications', '/finance/tuition', '/examination/my-results']
    : roles.includes('ROLE_INSTRUCTOR')
    ? ['/instructor/raw-vehicle', '/training/schedules', '/student/driving-simulation', '/fleet']
    : roles.includes('ROLE_EXAMINER')
    ? ['/examination/grading', '/examination/sessions']
    : ['/admin/admissions/dashboard', '/admin/admissions/leads', '/admin/admissions', '/training/schedules', '/finance/tuition'];
  return [...items].sort((a, b) => {
    const rank = (item: NavigationItem) => priorities.includes(item.path) ? priorities.indexOf(item.path) : priorities.length;
    return rank(a) - rank(b);
  }).slice(0, 6);
}
