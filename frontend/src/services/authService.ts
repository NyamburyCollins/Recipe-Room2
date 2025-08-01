export type User = {
  username: string;
  email: string;
  password: string;
};

const USER_KEY = "recipe-room-user";

export const register = (user: User): boolean => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const exists = users.some((u: User) => u.email === user.email);
  if (exists) return false;

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  return true;
};

export const login = (email: string, password: string): boolean => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u: User) => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(USER_KEY);
};