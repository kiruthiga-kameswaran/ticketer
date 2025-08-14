// auth.ts
import NextAuth from "next-auth";
import { prisma } from "./prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        name: { label: "Name", type: "text", placeholder: "John Doe" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        // Find user by email
        const user = await prisma.assignee.findUnique({
          where: { email: credentials.email },
        });

        if (user) {
          // Compare entered password with stored hash
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (isValid) {
            return { id: user.id, email: user.email, name: user.name };
          }
          return null;
        }

        // Register new user (signup)
        try {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const newUser = await prisma.assignee.create({
            data: {
              name: credentials.name,
              email: credentials.email,
              password: hashedPassword,
            },
          });
          return { id: newUser.id, name: newUser.name, email: newUser.email };
        } catch (error) {
          console.error("Error creating user:", error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },

  secret: process.env.AUTH_SECRET,

  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : process.env.AUTH_URL || baseUrl;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
});
