import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ---- Route configuration --------------------------------------------

const PUBLIC_PATHS = ["/login", "/register"];
const ADMIN_PATH_PREFIX = "/admin";
const SESSION_COOKIE = "vtu_session";

interface SessionData {
  is_admin: boolean;
}

// ---- Helpers --------------------------------------------------------

function getSessionFromRequest(request: NextRequest): SessionData | null {
  try {
    const cookieValue = request.cookies.get(SESSION_COOKIE)?.value;
    if (!cookieValue) return null;
    const parsed = JSON.parse(cookieValue) as SessionData;
    return parsed.is_admin !== undefined ? parsed : null;
  } catch {
    return null;
  }
}

// ---- Proxy ----------------------------------------------------------

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = getSessionFromRequest(request);
  const isAuthenticated = session !== null;

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
    !session?.is_admin
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
