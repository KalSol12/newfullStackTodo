import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import {
  clearAuthStorage,
  fetchCurrentUser,
  getStoredToken,
  getStoredUser,
  loginUser,
  registerUser,
  setAuthStorage,
} from "./authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(getStoredToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restore() {
      const saved = getStoredToken();
      if (!saved) {
        setLoading(false);
        return;
      }
      try {
        setUser(await fetchCurrentUser(saved));
        setToken(saved);
      } catch {
        clearAuthStorage();
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    }
    restore();
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await loginUser({ email, password });
    const userData = { _id: data._id, name: data.name, email: data.email };
    setAuthStorage(userData, data.token);
    setUser(userData);
    setToken(data.token);
    return data;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const data = await registerUser({ name, email, password });
    const userData = { _id: data._id, name: data.name, email: data.email };
    setAuthStorage(userData, data.token);
    setUser(userData);
    setToken(data.token);
    return data;
  }, []);

  const logout = useCallback(() => {
    clearAuthStorage();
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout,
    }),
    [user, token, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth requires AuthProvider");
  return ctx;
}
