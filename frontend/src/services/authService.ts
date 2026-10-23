import apiClient from './apiClient';
import type { ApiResponse } from '../types/api';
import type { AuthResponse, LoginCredentials, RegisterCredentials, UserProfile } from '../types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    const data = response.data.data;
    localStorage.setItem('gplx_token', data.accessToken);
    localStorage.setItem('gplx_user', JSON.stringify({
      id: data.userId,
      username: data.username,
      email: data.email,
      fullName: data.fullName,
      roles: data.roles,
    }));
    return data;
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', credentials);
    const data = response.data.data;
    localStorage.setItem('gplx_token', data.accessToken);
    localStorage.setItem('gplx_user', JSON.stringify({
      id: data.userId,
      username: data.username,
      email: data.email,
      fullName: data.fullName,
      roles: data.roles,
    }));
    return data;
  },

  async getCurrentProfile(): Promise<UserProfile> {
    const response = await apiClient.get<ApiResponse<UserProfile>>('/auth/me');
    return response.data.data;
  },

  logout(): void {
    localStorage.removeItem('gplx_token');
    localStorage.removeItem('gplx_user');
  },

  getStoredToken(): string | null {
    return localStorage.getItem('gplx_token');
  },

  getStoredUser(): UserProfile | null {
    const userStr = localStorage.getItem('gplx_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
};
