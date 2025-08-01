import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { User } from '../types/user';
import {
  getUserFromStorage,
  saveUserToStorage,
  removeUserFromStorage,
} from "../services/localStorageService";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = getUserFromStorage();
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    saveUserToStorage(userData);
  };

  const logout = () => {
    setUser(null);
    removeUserFromStorage();
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};