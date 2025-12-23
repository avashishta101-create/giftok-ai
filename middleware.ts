import NextAuth from "next-auth";
import { authConfig } from "app/auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

const ADMIN_EMAIL = "a.vashishta101@gmail.com";

export default auth((req: NextRequest & { auth?: any }) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isProtectedRoute =
    nextUrl.pathname === "/" || nextUrl.pathname.startsWith("/create");

  const isAuthRoute =
    nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/register");

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");

  // 🔐 Admin-only protection
  if (isAdminRoute) {
    if (!isLoggedIn || req.auth?.user?.email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  // 🔒 Require login for protected pages
  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 🚫 Prevent logged-in users from auth pages
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/:path*"],
};
