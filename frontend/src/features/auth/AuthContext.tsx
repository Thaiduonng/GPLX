import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import type { UserProfile, LoginCredentials, RegisterCredentials } from '../../types/auth';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(authService.getStoredUser());
  const [token, setToken] = useState<string | null>(authService.getStoredToken());
  const [loading, setLoading] = useState<boolean>(true);

  const refreshProfile = async () => {
    if (!authService.getStoredToken()) {
      setUser(null);
      setToken(null);
      setLoading(false);
      return;
    }
    try {
      const profile = await authService.getCurrentProfile();
      setUser(profile);
      localStorage.setItem('gplx_user', JSON.stringify(profile));
    } catch {
      authService.logout();
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const authData = await authService.login(credentials);
    setToken(authData.accessToken);
    setUser({
      id: authData.userId,
      username: authData.username,
      email: authData.email,
      fullName: authData.fullName,
      active: true,
      roles: authData.roles,
    });
  };

  const register = async (credentials: RegisterCredentials) => {
    const authData = await authService.register(credentials);
    setToken(authData.accessToken);
    setUser({
      id: authData.userId,
      username: authData.username,
      email: authData.email,
      fullName: authData.fullName,
      active: true,
      roles: authData.roles,
    });
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        loading,
        login,
        register,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
