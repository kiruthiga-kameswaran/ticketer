// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Use NextAuth in middleware with our lightweight config
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/dashboard/:path*"], // protect /dashboard routes
};
