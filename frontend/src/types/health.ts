/**
 * Dữ liệu phản hồi từ Health Check API.
 */
export interface HealthStatus {
  status: string;
  application: string;
  version: string;
  timestamp: string;
  framework?: string;
}
