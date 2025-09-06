// auth.ts
import NextAuth from "next-auth";
import { prisma } from "./prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

async function authenticateUser(email: string, password: string) {
  const user = await prisma.assignee.findUnique({ where: { email } });
  if (!user) return null;

  if (!user.password) return null;
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;

}

async function registerUser(name:string, email:string, password:string){
  const hashedPassword = await bcrypt.hash(password,10);
  const user = await prisma.assignee.create({
    data:{
      name,
      email,
      password:hashedPassword
    }
  })
  return user;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        action: {type: "text"},
        name: { label: "Name", type: "text", placeholder: "John Doe" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        // Find user by email
        const user = await prisma.assignee.findUnique({
          where: { email: typeof credentials.email === "string" ? credentials.email : undefined },
        });

        if (credentials.action === "login") {
          const email = typeof credentials.email === "string" ? credentials.email : "";
          const password = typeof credentials.password === "string" ? credentials.password : "";
          const dbUser = await authenticateUser(email, password);
          if (!dbUser) return null;
          return {
            id: dbUser.id.toString(),
            name: dbUser.name,
            email: dbUser.email,
          };
        }
        // Register new user (signup)
        else if (credentials.action === "signup") {
          if (user) {
            // User already exists
            return null;
          }
          const name = typeof credentials.name === "string" ? credentials.name : "";
          const email = typeof credentials.email === "string" ? credentials.email : "";
          const password = typeof credentials.password === "string" ? credentials.password : "";
          const newUser = await registerUser(name, email, password);
          return {
            id: newUser.id.toString(),
            name: newUser.name,
            email: newUser.email,
          };
        }
        return null;
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
      if (token && typeof token.id === "string" && session.user) {
        (session.user as { id?: string }).id = token.id;
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
