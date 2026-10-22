/**
 * Khung phản hồi API chuẩn khớp với backend ApiResponse<T>.
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

/**
 * Khung phản hồi lỗi chuẩn khớp với backend ErrorResponse.
 */
export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  details?: FieldErrorDetail[];
}

export interface FieldErrorDetail {
  field: string;
  message: string;
}
