// src/lib/auth.ts - Optimized version
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        // 🚀 Optimize user query - chỉ select cần thiết
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
          },
        });

        if (!user || !user.password) {
          throw new Error("No user found");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // 🚀 Return minimal user data
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  
  // 🚀 Use JWT instead of database sessions for better performance
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  
  // 🚀 Optimize JWT settings
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  
  callbacks: {
    // 🚀 Optimize JWT callback - minimal data
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    
    // 🚀 Optimize session callback - no additional DB queries
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    
    // 🚀 Optimize redirect callback
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  
  // 🚀 Events for debugging (development only)
  events: {
    async signIn(message) {
      if (process.env.NODE_ENV === "development") {
        console.log("User signed in:", message.user.email);
      }
    },
    async session(message) {
      if (process.env.NODE_ENV === "development") {
        console.log("Session accessed:", message.session.user?.email);
      }
    },
  },
  
  // 🚀 Debug only in development
  debug: process.env.NODE_ENV === "development",
  
  // 🚀 Security settings
  useSecureCookies: process.env.NODE_ENV === "production",
  
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 // 7 days
      }
    },
  },
};