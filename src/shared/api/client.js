import { getStoredToken } from "../../features/auth/authService";

export function getApiBase() {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, "");
  }
  return "/api";
}

export async function apiRequest(path, options = {}) {
  const token = getStoredToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  let response;
  try {
    response = await fetch(`${getApiBase()}${path}`, { ...options, headers });
  } catch {
    throw new Error("Cannot reach the server.");
  }

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Server returned an invalid response. Is the backend running?");
  }

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
