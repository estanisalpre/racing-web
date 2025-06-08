// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode
} from 'react';
import { authService } from '@/services/authService';
//import { ApiError } from '@/services/api';
import type { AuthContextType, User, LoginData, RegisterData } from '@/types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
        error: null,
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false, isLoading: false, error: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });

    const token = authService.getAccessToken();
    const user  = authService.getCurrentUser();

    if (token && user) {
      dispatch({ type: 'SET_USER', payload: user });
    } else {
      dispatch({ type: 'SET_USER', payload: null });
    }

    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  const login = async (data: LoginData): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      const authData = await authService.login(data);
      dispatch({ type: 'SET_USER', payload: authData.user });
    } catch (err: any) {
      const msg = err instanceof Error ? err.message : 'Error al iniciar sesión';
      dispatch({ type: 'SET_ERROR', payload: msg });
      throw err;
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      await authService.register(data);

      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (err: any) {
      const msg = err instanceof Error ? err.message : 'Error al registrar usuario';
      dispatch({ type: 'SET_ERROR', payload: msg });
      throw err;
    }
  };

  const logout = (): void => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const updateUser = async (user: User) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        error: state.error,
        login,
        register,
        logout,
        clearError,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
