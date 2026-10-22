import axios, { AxiosInstance, AxiosError } from 'axios';

/**
 * Standard Axios Instance configured for GPLX Training System.
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn('Yêu cầu chưa được xác thực (401) — Cần đăng nhập');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
