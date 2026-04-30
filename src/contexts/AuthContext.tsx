// src/contexts/AuthContext.tsx
'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

interface DecodedToken {
  userId: string;
  email: string;
  name: string;
  avatarUrl?: string;
  exp: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string) => boolean;
  logout: () => void;
  loginWithGoogle: () => void;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// DEV BYPASS: backend not implemented yet — start with a mock signed-in user
// so the app is browseable without an OAuth flow. Remove once the backend is wired up.
const DEV_BYPASS_AUTH = true;
const MOCK_USER: User = {
  id: 'dev-user',
  email: 'dev@agentsdiscover.local',
  name: 'Dev User',
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(DEV_BYPASS_AUTH ? MOCK_USER : null);
  const [isAuthenticated, setIsAuthenticated] = useState(DEV_BYPASS_AUTH);
  const [loading, setLoading] = useState(!DEV_BYPASS_AUTH);

  const TOKEN_KEY = 'app:jwt';

  const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  };

  const saveToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  };

  const removeToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
  };

  const validateToken = (token: string): DecodedToken | null => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        return null;
      }

      return decoded;
    } catch (error) {
      console.error('Token validation failed:', error);
      return null;
    }
  };

  const login = (token: string): boolean => {
    const decoded = validateToken(token);
    if (decoded) {
      saveToken(token);
      const userData: User = {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name,
        avatarUrl: decoded.avatarUrl,
      };

      setUser(userData);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = (): void => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  const loginWithGoogle = (): void => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const loginUrl = `${baseUrl}/api/auth/google/login`;

    try {
      window.location.href = loginUrl;
    } catch (error) {
      console.error('Failed to redirect to Google OAuth:', error);
    }
  };

  useEffect(() => {
    if (DEV_BYPASS_AUTH) return;

    const handleOAuthCallback = (): boolean => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const error = urlParams.get('error');

      if (error) {
        console.error('OAuth callback error:', error);
        return false;
      }

      if (token) {
        const decoded = validateToken(token);
        if (decoded) {
          saveToken(token);
          const userData: User = {
            id: decoded.userId,
            email: decoded.email,
            name: decoded.name,
            avatarUrl: decoded.avatarUrl,
          };

          setUser(userData);
          setIsAuthenticated(true);
          window.history.replaceState({}, document.title, window.location.pathname);
          return true;
        }
      }
      return false;
    };

    const initAuth = async () => {
      try {
        const callbackSuccess = handleOAuthCallback();

        if (!callbackSuccess) {
          const token = getToken();

          if (token) {
            const decoded = validateToken(token);
            if (decoded) {
              const userData: User = {
                id: decoded.userId,
                email: decoded.email,
                name: decoded.name,
                avatarUrl: decoded.avatarUrl,
              };

              setUser(userData);
              setIsAuthenticated(true);
            } else {
              removeToken();
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        removeToken();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    loginWithGoogle,
    getToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
