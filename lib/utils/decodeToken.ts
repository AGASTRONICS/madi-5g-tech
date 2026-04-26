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
    const decoded = jwtDecode<Partial<TokenPayload>>(token);

    // Require sub and exp; is_admin defaults to false if missing
    if (!decoded.sub || decoded.exp === undefined) {
      return null;
    }

    return {
      sub: decoded.sub,
      exp: decoded.exp,
      is_admin: decoded.is_admin ?? false,
    };
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
