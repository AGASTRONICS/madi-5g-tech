"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { decodeToken } from "@/lib/utils/decodeToken";
import type { TokenPayload } from "@/types/auth.types";

// ---- State shape ----------------------------------------------------

interface AuthState {
  token: string | null;
  user: TokenPayload | null;

  // Actions
  setToken: (token: string) => void;
  clearAuth: () => void;

  // Derived selectors (stable function references — safe to use as deps)
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
}

// ---- Store ----------------------------------------------------------

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      setToken: (token: string) => {
        const user = decodeToken(token);
        set({ token, user });
      },

      clearAuth: () => {
        set({ token: null, user: null });
      },

      // Selectors read from current state via get()
      isAuthenticated: () => {
        const { token, user } = get();
        if (!token || !user) return false;
        // Check JWT expiry (exp is in seconds, Date.now() is in ms)
        return user.exp * 1000 > Date.now();
      },

      isAdmin: () => {
        const { user } = get();
        return user?.is_admin === true;
      },
    }),
    {
      name: "vtu_auth",
      storage: createJSONStorage(() => {
        // Guard against SSR where localStorage is not available
        if (typeof window !== "undefined") return localStorage;
        // Return a no-op storage for server-side rendering
        return {
          getItem: () => null,
          setItem: () => undefined,
          removeItem: () => undefined,
        };
      }),
      // Only persist the raw token and user; selectors are reconstructed.
      partialize: (state) => ({ token: state.token, user: state.user }),
      // skipHydration: true prevents the store from auto-hydrating on mount,
      // allowing us to call rehydrate() explicitly inside a client useEffect
      // after the component tree has rendered. This avoids hydration mismatches.
      skipHydration: true,
    },
  ),
);

// Named export for the persisted store's rehydration method so the root
// layout can call it inside a useEffect without importing the full store API.
export const rehydrateAuthStore = () =>
  useAuthStore.persist.rehydrate();
