import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('cms_auth_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      const { token: newToken, user: loggedInUser } = response.data;

      localStorage.setItem('cms_auth_token', newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      setUser({ authenticated: true, ...loggedInUser });
      setToken(newToken);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.error || 'Login failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('cms_auth_token');
    setToken(null);
  };

  const forgotPassword = async (email) => {
    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        message: error.response?.data?.error || 'Failed to process request.'
      };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const response = await axios.post('/api/auth/reset-password', { token, newPassword });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        message: error.response?.data?.error || 'Failed to reset password.'
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, forgotPassword, resetPassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
