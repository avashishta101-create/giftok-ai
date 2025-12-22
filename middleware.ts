import NextAuth from 'next-auth';
import { authConfig } from 'app/auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    '/((?!api|login|register|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};
