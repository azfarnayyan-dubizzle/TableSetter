import axios, { AxiosError } from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export type Role = "owner" | "customer";

const TOKEN_KEYS: Record<Role, string> = {
  owner: "tablesetter.owner.token",
  customer: "tablesetter.customer.token",
};

export function getToken(role: Role): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEYS[role]);
}

export function setToken(role: Role, token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEYS[role], token);
  window.dispatchEvent(new Event("tablesetter-auth"));
}

export function clearToken(role: Role): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEYS[role]);
  window.dispatchEvent(new Event("tablesetter-auth"));
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

// Auto-attaches the correct token (owner or customer) based on which
// prefix the request URL starts with, so callers never manually set
// the Authorization header themselves.
api.interceptors.request.use((config) => {
  const url = config.url ?? "";
  const role: Role | null = url.startsWith("/owner")
    ? "owner"
    : url.startsWith("/customer")
      ? "customer"
      : null;
  if (role) {
    const token = getToken(role);
    if (token) {
      config.headers.set?.("Authorization", `Bearer ${token}`);
    }
  }
  return config;
});

type ApiErrorBody = {
  message?: string;
  errors?: Record<string, string[]>;
};

export function extractErrorMessage(error: unknown, fallback = "Something went wrong"): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorBody | undefined;
    if (data?.errors) {
      const first = Object.values(data.errors)[0];
      if (first && first.length > 0 && first[0]) return first[0];
    }
    if (data?.message) return data.message;
    if (error.message) return error.message;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
