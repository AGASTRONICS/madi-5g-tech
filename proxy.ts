import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import type { TokenPayload } from "@/types/auth.types";

// ---- Route configuration --------------------------------------------

const PUBLIC_PATHS = ["/login", "/register"];
const ADMIN_PATH_PREFIX = "/admin";
const SESSION_COOKIE = "vtu_session";

// ---- Helpers --------------------------------------------------------

function getTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get(SESSION_COOKIE)?.value ?? null;
}

function decodeTokenSafe(token: string): TokenPayload | null {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
}

function isTokenExpired(payload: TokenPayload): boolean {
  return payload.exp * 1000 < Date.now();
}

// ---- Proxy ----------------------------------------------------------

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = getTokenFromRequest(request);
  const payload = token ? decodeTokenSafe(token) : null;
  const isAuthenticated = payload !== null && !isTokenExpired(payload);

  // 1. Authenticated users visiting login/register → send to dashboard.
  if (isAuthenticated && PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 2. Unauthenticated users on protected routes → send to login.
  if (
    !isAuthenticated &&
    !PUBLIC_PATHS.some((p) => pathname.startsWith(p)) &&
    pathname !== "/"
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Non-admin users on admin routes → redirect to user dashboard.
  if (
    isAuthenticated &&
    pathname.startsWith(ADMIN_PATH_PREFIX) &&
    !payload?.is_admin
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// ---- Matcher --------------------------------------------------------

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/|api/).*)",
  ],
};
