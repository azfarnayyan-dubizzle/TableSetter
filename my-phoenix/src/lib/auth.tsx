"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import { api, clearToken, getToken, setToken, type Role } from "./api";
import type { AuthResponse } from "./types";

export type AuthState = {
  ready: boolean;
  token: string | null;
};

export function useAuthToken(role: Role): AuthState {
  const [state, setState] = useState<AuthState>({ ready: false, token: null });

  useEffect(() => {
    const sync = () => setState({ ready: true, token: getToken(role) });
    sync();
    window.addEventListener("tablesetter-auth", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("tablesetter-auth", sync);
      window.removeEventListener("storage", sync);
    };
  }, [role]);

  return state;
}

export async function authenticate(
  role: Role,
  mode: "login" | "register",
  body: Record<string, string>,
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>(`/${role}/${mode}`, body);
  const payload = (data as unknown as { data?: AuthResponse }).data ?? data;
  if (payload?.token) setToken(role, payload.token);
  return payload;
}

export function useLogout(role: Role) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useCallback(async () => {
    try {
      await api.post(`/${role}/logout`);
    } catch {
      // Even if the API call fails we still clear local state.
    }
    clearToken(role);
    queryClient.clear();
    void router.push(role === "owner" ? "/owner/login" : "/customer/login");
  }, [router, queryClient, role]);
}

/** Client-side route guard: redirects to the role's login page when unauthenticated. */
export function useRequireAuth(role: Role): boolean {
  const { ready, token } = useAuthToken(role);
  const router = useRouter();

  useEffect(() => {
    if (ready && !token) {
      void router.push(role === "owner" ? "/owner/login" : "/customer/login");
    }
  }, [router, ready, role, token]);

  return ready && Boolean(token);
}
