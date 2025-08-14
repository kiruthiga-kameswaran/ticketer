// auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  providers: [], // required even if empty for middleware
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized: ({ auth }) => !!auth, // true if logged in
  },
};
