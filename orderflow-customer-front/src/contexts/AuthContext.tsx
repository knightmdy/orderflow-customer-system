import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { toast } from 'sonner';
import * as api from '@/services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 当应用加载时，检查localStorage中是否有用户信息
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          
          // 验证token是否有效
          try {
            await api.getCurrentUser();
          } catch (error) {
            console.error('Token validation failed', error);
            // 如果token无效，清除用户信息
            localStorage.removeItem('user');
            setUser(null);
          }
        } catch (error) {
          console.error('Failed to parse stored user data', error);
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // 登录函数
  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const { user, token } = await api.login(email, password);
      
      // 将token添加到用户对象中
      const userWithToken = {
        ...user,
        token
      };
      
      setUser(userWithToken);
      localStorage.setItem('user', JSON.stringify(userWithToken));
      toast.success('登录成功！');
    } catch (error) {
      toast.error('登录失败。请检查您的凭据。');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 注册函数
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const { user, token } = await api.register(name, email, password);
      
      // 将token添加到用户对象中
      const userWithToken = {
        ...user,
        token
      };
      
      setUser(userWithToken);
      localStorage.setItem('user', JSON.stringify(userWithToken));
      toast.success('注册成功！');
    } catch (error) {
      toast.error('注册失败。请重试。');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('已成功登出');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
