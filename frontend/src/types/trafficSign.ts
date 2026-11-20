export type TrafficSignGroup = 'CAM' | 'NGUY_HIEM' | 'HIEU_LENH' | 'CHI_DAN' | 'PHU' | 'VACH_KE';

export type LegalStatus = 'VERIFIED' | 'NEEDS_VERIFICATION' | 'INTERNAL_RULE';

export interface TrafficSign {
  code: string;
  name: string;
  group: TrafficSignGroup;
  meaning: string | null;
  shape: string | null;
  standardVersion: string;
  legalStatus: LegalStatus;
  legacyCode: string | null;
  replacedByCode: string | null;
  svgAsset: string | null;
  rasterAsset: string | null;
}

export interface TrafficSignUpdate {
  name: string;
  meaning: string | null;
  legalStatus: LegalStatus;
  replacedByCode: string | null;
  svgAsset: string | null;
}

export interface TrafficSignSearchParams {
  q?: string;
  group?: TrafficSignGroup;
  page?: number;
  size?: number;
}

export const TRAFFIC_SIGN_GROUP_LABELS: Record<TrafficSignGroup, string> = {
  CAM: 'Biển báo cấm',
  NGUY_HIEM: 'Biển báo nguy hiểm và cảnh báo',
  HIEU_LENH: 'Biển hiệu lệnh',
  CHI_DAN: 'Biển chỉ dẫn',
  PHU: 'Biển phụ',
  VACH_KE: 'Vạch kẻ đường',
};

export const LEGAL_STATUS_LABELS: Record<LegalStatus, string> = {
  VERIFIED: 'Đã xác minh',
  NEEDS_VERIFICATION: 'Chờ xác minh',
  INTERNAL_RULE: 'Quy tắc nội bộ',
};

/** "QCVN41:2019" → "QCVN 41:2019" */
export function formatStandardVersion(version: string): string {
  return version.replace(/^QCVN(\d+)/, 'QCVN $1');
}
