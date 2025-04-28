// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"; // Add more providers if needed
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Here you need to connect to your DB and validate user
        const { email, password } = credentials as { email: string; password: string };

        if (email === "test@example.com" && password === "password123") {
          // Example: allow login
          return { id: "1", name: "Test User", email };
        }

        // Else fail login
        return null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID!,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      }),
  ],
  pages: {
    signIn: "/auth/signin", // Optional: custom login page
  },
});

export { handler as GET, handler as POST };
