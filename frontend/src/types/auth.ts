export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone?: string;
  roles: string[];
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  userId: number;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
}

export interface LoginCredentials {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role?: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone?: string;
  active: boolean;
  roles: string[];
}
