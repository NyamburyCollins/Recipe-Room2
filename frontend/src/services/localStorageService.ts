import type { User } from "../types/user";

const USER_KEY = "recipe-room-user";

export const getUserFromStorage = (): User | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const saveUserToStorage = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeUserFromStorage = (): void => {
  localStorage.removeItem(USER_KEY);
};