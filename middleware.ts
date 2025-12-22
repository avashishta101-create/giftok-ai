import NextAuth from "next-auth";
import { authConfig } from "app/auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const session = await auth(req);

  const isLoggedIn = !!session;

  const isPublicRoute =
    nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/register") ||
    nextUrl.pathname.startsWith("/api");

  const isProtectedRoute =
    nextUrl.pathname === "/" || nextUrl.pathname.startsWith("/create");

  // Not logged in and trying to access protected → go to login
  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Logged in and trying to access login/register → go to dashboard
  if (isLoggedIn && (nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/register"))) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
