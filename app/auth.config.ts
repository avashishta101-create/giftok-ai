import { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // providers added later in auth.ts
  ],
 
  callbacks: {
  authorized(
    {
      auth,
      request,
    }: {
      auth: any;
      request: { nextUrl: URL };
    }
  ) {
    const { nextUrl } = request;

    const isLoggedIn = !!auth?.user;

    const isProtectedRoute =
      nextUrl.pathname === '/' ||
      nextUrl.pathname.startsWith('/create');

    if (isProtectedRoute && !isLoggedIn) {
      return false;
    }

    return true;
  },
},

} satisfies NextAuthConfig;
