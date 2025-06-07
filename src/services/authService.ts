import { apiClient, ApiError } from './api';
import { API_CONFIG } from '@/utils/constants';
import type { RegisterData, LoginData, User } from '@/types/auth';

export class AuthService {
  isTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  // Login: return data and tokens
  async login(data: LoginData) {
    const response = await apiClient.post<{ success: boolean; data: {
      access_token: string;
      refresh_token?: string;
      user: User;
    }}>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      email: data.email.trim().toLowerCase(),
      password: data.password,
    });

    const { access_token, refresh_token, user } = response.data;

    this.saveAuthData({ user, access_token, refresh_token });

    return { user, access_token, refresh_token };
  }

  async register(data: RegisterData): Promise<{ message: string }> {
    try {
      const response = await apiClient.post<{ message: string }>(
        API_CONFIG.ENDPOINTS.AUTH.REGISTER,
        {
          username: data.username.trim(),
          email: data.email.trim().toLowerCase(),
          password: data.password,
        }
      );
      return response.data;
    } catch (err: any) {
      if (err instanceof ApiError && err.status === 400) {
        throw new Error(err.data?.message || 'Datos de registro inválidos');
      }
      throw new Error('Error en el servidor durante el registro');
    }
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
  }

  getCurrentUser(): User | null {
    const json = localStorage.getItem('user_data');
    return json ? JSON.parse(json) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private saveAuthData(data: {
    user: User;
    access_token: string;
    refresh_token?: string;
  }) {
    localStorage.setItem('access_token', data.access_token);
    if (data.refresh_token) {
      localStorage.setItem('refresh_token', data.refresh_token);
    }
    localStorage.setItem('user_data', JSON.stringify(data.user));
  }

  async refreshToken(): Promise<string | null> {
    try {
      const refresh = localStorage.getItem('refresh_token');
      if (!refresh) return null;
      const resp = await apiClient.post<{ access_token: string }>(
        API_CONFIG.ENDPOINTS.AUTH.REFRESH,
        { refresh_token: refresh }
      );
      localStorage.setItem('access_token', resp.access_token);
      return resp.access_token;
    } catch {
      this.logout();
      return null;
    }
  }
}

export const authService = new AuthService();
