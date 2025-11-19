import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


console.log("🔄 NextAuth route handler initialized");

const url = process.env.NEXT_PUBLIC_URL;
const social_login_endpoint = process.env.NEXT_PUBLIC_SOCIAL_LOGIN_ENDPOINT;

if (!url || !social_login_endpoint) {
  console.error("❌ Missing required environment variables:");
  console.error("NEXT_PUBLIC_URL:", url);
  console.error("NEXT_PUBLIC_SOCIAL_LOGIN_ENDPOINT:", social_login_endpoint);
  throw new Error("Missing required environment variables");
}

const handler = NextAuth({
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    // Don't need to post to your backend here anymore
    async signIn({ user }) {
      console.log("Google user:", user);
      return true; // allow sign-in so session is created
    },

    async jwt({ token, user }) {
      console.log("🔐 JWT callback");
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      console.log("💼 Session callback");
      if (token.user) {
        session.user = token.user;
      }
      return session;
    }
  },
});

export { handler as GET, handler as POST };