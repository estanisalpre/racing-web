export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
}

export interface AuthUserData extends User {
  access_token: string;
  refresh_token?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    data: User;
    access_token: string;
    refresh_token?: string | undefined;
  };
  access_token: string; 
  refresh_token?: string | undefined; 
}

export class ApiError extends Error {
  public status: number;
  public data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export interface ErrorAuthResponse {
  success: false;
  message: string;
  data: null;
  access_token: null;
  refresh_token: null;
}

export interface AuthError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<AuthResponse>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}