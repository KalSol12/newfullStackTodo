import { apiRequest } from "../../shared/api/client";
import { STORAGE_KEYS } from "../../shared/constants";

export function getStoredToken() {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
}

export function getStoredUser() {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
}

export function setAuthStorage(user, token) {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function clearAuthStorage() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
}

export function registerUser(payload) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchCurrentUser(token) {
  return apiRequest("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
