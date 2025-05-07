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
        // password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Here you need to connect to your DB and validate user
        const { email, password } = credentials as { email: string; password: string };

        console.log("Credentials:", credentials);
        console.log("Email:", email);
        console.log("Password:", password);
        
        // -----------------------FOR API CALLS-----------------------
        // try {
        //   const response = await axios.post("https://yourapi.com/api/auth/login", {
        //     email,
        //     password,
        //   });
    
        //   if (response.data.success) {
        //     // Return user object to NextAuth
        //     return response.data.user; // should include at least { id, name, email }
        //   } else {
        //     return null; // Invalid credentials
        //   }
        // } catch (error) {
        //   console.error("Login API failed:", error);
        //   return null;
        // }
        // --------------------------------------------------------


        if (email === "test@example.com" && password === "password123") {
          // Example: allow login
          return {
            id: "1",
            email,
            name: "Test User",
            mfaToken: true,
            accessToken: "mocked-access-token-123",
            number: "1234567890"
          };
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
  callbacks: {
    async jwt({ token, user }:any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = user.accessToken;
        token.mfatoken = user.mfaToken;
        token.number = user.number;
      }
      return token;
    },
    async session({ session, token }:any) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.accessToken = token.accessToken;
        session.user.mfaToken = token.mfaToken;
        session.user.number = token.number;
      }
      return session;
    },
  }
});

export { handler as GET, handler as POST };
