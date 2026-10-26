/**
 * Utility functions for formatting values in Vietnamese standard format.
 */

export function formatCurrency(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(Number(amount))) {
    return '0 ₫';
  }
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

export function formatDateTime(dateInput: string | number | Date | null | undefined): string {
  if (!dateInput) return '—';
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return '—';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch {
    return '—';
  }
}

export function formatDate(dateInput: string | number | Date | null | undefined): string {
  if (!dateInput) return '—';
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return '—';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return '—';
  }
}

export function formatDistanceKm(km: number | null | undefined): string {
  if (km === null || km === undefined || isNaN(km)) return '0 km';
  return `${Number(km).toLocaleString('vi-VN', { maximumFractionDigits: 1 })} km`;
}

export function formatDurationHours(hours: number | null | undefined): string {
  if (hours === null || hours === undefined || isNaN(hours)) return '0 giờ';
  return `${Number(hours).toLocaleString('vi-VN', { maximumFractionDigits: 1 })} giờ`;
}

export interface StatusMeta {
  label: string;
  variant: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export function getApplicationStatusMeta(status: string | null | undefined): StatusMeta {
  switch (status?.toUpperCase()) {
    case 'DRAFT':
      return { label: 'Bản nháp', variant: 'default' };
    case 'SUBMITTED':
      return { label: 'Đã nộp hồ sơ', variant: 'info' };
    case 'UNDER_REVIEW':
    case 'IN_PROGRESS':
      return { label: 'Đang thẩm định', variant: 'warning' };
    case 'APPROVED':
      return { label: 'Đã phê duyệt', variant: 'success' };
    case 'REJECTED':
      return { label: 'Từ chối / Cần bổ sung', variant: 'danger' };
    case 'CANCELLED':
      return { label: 'Đã hủy', variant: 'default' };
    default:
      return { label: status || 'Chưa xác định', variant: 'default' };
  }
}

export function getPaymentStatusMeta(status: string | null | undefined): StatusMeta {
  switch (status?.toUpperCase()) {
    case 'PAID':
      return { label: 'Đã thanh toán', variant: 'success' };
    case 'PENDING':
      return { label: 'Chờ nộp tiền', variant: 'warning' };
    case 'PARTIALLY_PAID':
      return { label: 'Đã thanh toán 1 phần', variant: 'info' };
    case 'CANCELLED':
    case 'REFUNDED':
      return { label: 'Đã hoàn tiền', variant: 'danger' };
    default:
      return { label: status || 'Chưa thanh toán', variant: 'default' };
  }
}

export function getExamStatusMeta(status: string | null | undefined): StatusMeta {
  switch (status?.toUpperCase()) {
    case 'SCHEDULED':
      return { label: 'Đã lên lịch', variant: 'info' };
    case 'IN_PROGRESS':
      return { label: 'Đang diễn ra', variant: 'warning' };
    case 'COMPLETED':
      return { label: 'Đã hoàn thành', variant: 'success' };
    case 'CANCELLED':
      return { label: 'Đã hủy', variant: 'danger' };
    case 'PASSED':
    case 'QUALIFIED':
      return { label: 'Đạt yêu cầu', variant: 'success' };
    case 'FAILED':
    case 'DISQUALIFIED':
      return { label: 'Không đạt', variant: 'danger' };
    default:
      return { label: status || 'Chưa thi', variant: 'default' };
  }
}

export function getVehicleStatusMeta(status: string | null | undefined): StatusMeta {
  switch (status?.toUpperCase()) {
    case 'ACTIVE':
    case 'AVAILABLE':
      return { label: 'Sẵn sàng hoạt động', variant: 'success' };
    case 'IN_USE':
      return { label: 'Đang học thực hành', variant: 'info' };
    case 'MAINTENANCE':
    case 'INSPECTION_OVERDUE':
      return { label: 'Bảo dưỡng / Quá hạn kiểm định', variant: 'danger' };
    case 'RETIRED':
      return { label: 'Đã thanh lý', variant: 'default' };
    default:
      return { label: status || 'Không rõ', variant: 'default' };
  }
}
