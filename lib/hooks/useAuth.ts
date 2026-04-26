"use client";

// lib/hooks/useAuth.ts
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { login, register } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/auth.store";
import { decodeToken } from "@/lib/utils/decodeToken";
import type { ApiError } from "@/types/api.types";
import type { LoginPayload, RegisterPayload } from "@/types/auth.types";

// ---- Cookie helpers -------------------------------------------------
// The middleware reads `vtu_session` to determine auth state and admin role.
// We only store `is_admin` in the cookie (not the full JWT) since the full
// token lives in localStorage via the Zustand persist middleware.

function writeSessionCookie(isAdmin: boolean): void {
  document.cookie = `vtu_session=${JSON.stringify({ is_admin: isAdmin })}; path=/; max-age=${60 * 60 * 24 * 7}`;
}

function clearSessionCookie(): void {
  document.cookie = "vtu_session=; path=/; max-age=0";
}

// ---- Hook -----------------------------------------------------------

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Pull store selectors and actions individually to avoid stale closures
  const setToken = useAuthStore((s) => s.setToken);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const user = useAuthStore((s) => s.user);

  // ---- Login mutation -----------------------------------------------

  const loginMutation = useMutation<
    Awaited<ReturnType<typeof login>>,
    ApiError,
    LoginPayload
  >({
    mutationFn: login,
    onSuccess: (data) => {
      const { access_token } = data;

      // Decode the JWT to extract role and user info before persisting
      const decoded = decodeToken(access_token);
      if (!decoded) {
        toast.error("Invalid token received. Please try again.");
        return;
      }

      // Persist token + user in Zustand (localStorage via persist middleware)
      setToken(access_token);

      // Write a non-HttpOnly cookie so Next.js middleware can read the session
      // on every request without re-parsing the JWT from localStorage.
      writeSessionCookie(decoded.is_admin);

      toast.success("Welcome back!");

      // Redirect based on role
      const destination = decoded.is_admin ? "/admin/dashboard" : "/dashboard";
      router.push(destination);
    },
    onError: (error: ApiError) => {
      toast.error(error.message ?? "Login failed. Please try again.");
    },
  });

  // ---- Register mutation --------------------------------------------

  const registerMutation = useMutation<
    Awaited<ReturnType<typeof register>>,
    ApiError,
    RegisterPayload
  >({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Account created successfully!");
      router.push("/login");
    },
    onError: (error: ApiError) => {
      toast.error(error.message ?? "Registration failed. Please try again.");
    },
  });

  // ---- Logout -------------------------------------------------------

  function logout(): void {
    // Clear Zustand store (also clears localStorage via persist)
    clearAuth();
    // Clear the session cookie so the middleware sees unauthenticated state
    clearSessionCookie();
    // Invalidate and clear all React Query caches
    queryClient.clear();
    // Navigate to login
    router.push("/login");
  }

  // ---- Expose -------------------------------------------------------

  return {
    loginMutation,
    registerMutation,
    logout,
    // Convenience re-exports from the store
    isAuthenticated,
    isAdmin,
    user,
  };
}
