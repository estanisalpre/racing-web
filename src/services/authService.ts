import { apiClient } from './api';
import { API_CONFIG, STORAGE_KEYS } from '@/utils/constants';
import type { RegisterData, LoginData, AuthResponse, User } from '@/types/auth';

export class AuthService {
  /**
   * Registra un nuevo usuario
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.AUTH.REGISTER,
      {
        username: data.username.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
        confirmPassword: data.confirmPassword,
      }
    );

    // Guardar tokens y datos del usuario
    if (response.success && response.data) {
      this.saveAuthData(response.data);
    }

    return response;
  }

  /**
   * Inicia sesión de usuario
   */
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      {
        email: data.email.trim().toLowerCase(),
        password: data.password,
      }
    );

    // Guardar tokens y datos del usuario
    if (response.success && response.data) {
      this.saveAuthData(response.data);
    }

    return response;
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  }

  /**
   * Obtiene el usuario actual desde localStorage
   */
  getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  /**
   * Obtiene el token de acceso
   */
  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  /**
   * Verifica si el token ha expirado (básico)
   */
  isTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;

    try {
      // Decodificar JWT básico (sin verificar firma)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  }

  /**
   * Guarda los datos de autenticación en localStorage
   */
  private saveAuthData(authData: AuthResponse['data']): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, authData.access_token);
    
    if (authData.refresh_token) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, authData.refresh_token);
    }
    
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(authData.user));
  }

  /**
   * Refresca el token de acceso (si tienes refresh token implementado)
   */
  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (!refreshToken) return null;

      // Implementar según tu API
      const response = await apiClient.post<{ access_token: string }>('/auth/refresh', {
        refresh_token: refreshToken
      });

      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.access_token);
      return response.access_token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      this.logout();
      return null;
    }
  }
}

export const authService = new AuthService();