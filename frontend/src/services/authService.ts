import axios from '../api/axios';

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export interface User {
  id: number;
  username: string;
  email: string;
  profile_image_url?: string;
  created_at?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

// Save token & user to localStorage
const saveAuthData = (data: AuthResponse) => {
  localStorage.setItem('token', data.access_token);
  localStorage.setItem('user', JSON.stringify(data.user));
};

// Login
export const login = async (
  credentials: { email: string; password: string }
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/login`, credentials);
  const data = response.data;
  saveAuthData(data);
  return data;
};

// Register
export const register = async (
  userData: { username: string; email: string; password: string }
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/register`, userData);
  const data = response.data;
  saveAuthData(data);
  return data;
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get current user
export const getCurrentUser = (): User | null => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

// Get auth token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};