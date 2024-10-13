// src/context/AuthProvider.js
import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import authProvider from '../providers/authProvider';

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('auth'));
  const [user, setUserState] = useState(() => {
    const auth = localStorage.getItem('auth');
    return auth ? JSON.parse(auth).user : null;
  });

  const [isLoading, setIsLoading] = useState(false);

  const setUser = (updatedUser) => {
    console.log(updatedUser);
    setUserState(updatedUser);
    const authData = JSON.parse(localStorage.getItem('auth'));
    if (authData) {
      const updatedAuthData = { ...authData, user: updatedUser };
      localStorage.setItem('auth', JSON.stringify(updatedAuthData));
    }
  };

  useEffect(() => {
    const handleAuthChange = () => {
      const auth = localStorage.getItem('auth');

      setIsAuthenticated(!!auth);
      setUserState(auth ? JSON.parse(auth).user : null);
    };

    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  // Wrap authProvider methods to update state
  const login = async ({ email, password }) => {
    try {
      await authProvider.login({ email, password });

      const auth = localStorage.getItem('auth');
      if (auth) {
        setUserState(JSON.parse(auth).user);
      }
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = async () => {
    await authProvider.logout();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const handleAuthChange = () => {
      const auth = localStorage.getItem('auth');
      setIsAuthenticated(!!auth);
      if (auth) {
        const parsedAuth = JSON.parse(auth);
        setUser(parsedAuth.user);
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
