// src/context/AuthProvider.js
import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import authProvider from '../providers/authProvider';
import axiosConfig from '../providers/axiosConfig';

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('auth'));
  const [user, setUserState] = useState(() => {
    const auth = localStorage.getItem('auth');
    return auth ? JSON.parse(auth).user : null;
  });
  const [expiresAt, setExpiresAt] = useState(() => {
    const auth = localStorage.getItem('auth');
    return auth ? new Date(JSON.parse(auth).expires_at) : null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [socialLoginsEnabled, setSocialLoginsEnabled] = useState(false);
  const [usabilityTestingEnabled, setUsabilityTestingEnabled] = useState(false);

  const clearSession = () => {
    setIsAuthenticated(false);
    setUserState(null);
    setExpiresAt(null);
    localStorage.removeItem('auth');
  };

  const setUser = (updatedUser) => {
    setUserState(updatedUser);
    const authData = JSON.parse(localStorage.getItem('auth'));
    if (authData) {
      const updatedAuthData = { ...authData, user: updatedUser };
      localStorage.setItem('auth', JSON.stringify(updatedAuthData));
    }
  };

  // Wrap authProvider methods to update state
  const login = async ({ email, password }) => {
    try {
      setIsLoading(true);
      await authProvider.login({ email, password });

      const auth = localStorage.getItem('auth');
      if (auth) {
        const parsedAuth = JSON.parse(auth);
        setUserState(parsedAuth.user);
        setExpiresAt(new Date(parsedAuth.expires_at));
        setIsAuthenticated(true);

        const timeout = new Date(parsedAuth.expires_at).getTime() - new Date().getTime();
        if (timeout > 0) {
          setTimeout(() => {
            logout();
            alert('Session has expired. Please log in again.');
          }, timeout);
        }
      }
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return { success: false, error };
    }
  };

  const guestLogin = async ({ agree }) => {
    try {
      setIsLoading(true);
      await authProvider.guestLogin({ agree });

      const auth = localStorage.getItem('auth');
      if (auth) {
        const parsedAuth = JSON.parse(auth);
        setUserState(parsedAuth.user);
        setExpiresAt(new Date(parsedAuth.expires_at));
        setIsAuthenticated(true);

        const timeout = new Date(parsedAuth.expires_at).getTime() - new Date().getTime();
        if (timeout > 0) {
          setTimeout(() => {
            logout();
            alert('Session has expired. Please log in again.');
          }, timeout);
        }
      }
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return { success: false, error };
    }
  };

  const logout = async () => {
    await authProvider.logout();
    clearSession();
  };

  useEffect(() => {
    const handleAuthChange = () => {
      const auth = localStorage.getItem('auth');
      setIsAuthenticated(!!auth);
      if (auth) {
        const parsedAuth = JSON.parse(auth);
        setUser(parsedAuth.user);
      } else {
        clearSession();
      }
    };

    window.addEventListener('storage', handleAuthChange);

    window.addEventListener('logout', () => {
      logout();
    });

    if (expiresAt) {
      const timeout = expiresAt.getTime() - new Date().getTime();
      if (timeout > 0) {
        const timer = setTimeout(() => {
          logout();
          alert('Session has expired. Please log in again.');
        }, timeout);
        return () => clearTimeout(timer);
      }
    }


    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('logout', () => {
        logout();
      });
    };
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/maintenance") return;
    const fetchConfig = async () => {
      try {
        setIsLoading(true);
        const response = await axiosConfig.get("/front/config/params");
        setSocialLoginsEnabled(response.data.social_logins);
        setUsabilityTestingEnabled(response.data.usability_testing);
      } catch (error) {
        console.error("Failed to fetch config:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      socialLoginsEnabled, 
      usabilityTestingEnabled, 
      isAuthenticated, 
      user, 
      setUser, 
      isLoading, 
      login, 
      guestLogin, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
