"use client";

import { useEffect } from "react";
import { rehydrateAuthStore } from "@/lib/store/auth.store";

/**
 * Invisible component rendered once at the root layout.
 * Triggers Zustand persist rehydration from localStorage after the first
 * client render, keeping SSR output consistent (no token on server).
 */
export function AuthRehydrator() {
  useEffect(() => {
    rehydrateAuthStore();
  }, []);

  return null;
}
