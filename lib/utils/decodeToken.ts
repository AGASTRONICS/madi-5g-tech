import { jwtDecode } from "jwt-decode";
import type { TokenPayload } from "@/types/auth.types";

/**
 * Safely decodes a JWT access token and returns the payload.
 * Returns null on any decoding error (malformed token, wrong format, etc.).
 *
 * This is a client-side utility — never call it on the server with an
 * untrusted token as the source of truth; verify tokens server-side.
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
}

/**
 * Returns true if the token is present and not yet expired.
 */
export function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  const payload = decodeToken(token);
  if (!payload) return false;
  return payload.exp * 1000 > Date.now();
}
