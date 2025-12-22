import NextAuth from "next-auth";
import { authConfig } from "app/auth.config";

const { handlers } = NextAuth(authConfig);

export const { GET, POST } = handlers;
