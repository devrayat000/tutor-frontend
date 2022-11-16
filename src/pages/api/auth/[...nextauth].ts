import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "local",
      name: "Credentials",
      credentials: {
        identifier: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );

        const { user, jwt } = await resp.json();
        return { ...user, name: user.username, jwt };
      },
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }) {
      //   @ts-ignore
      session.jwt = token.jwt;
      //   @ts-ignore
      session.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        //   @ts-ignore
        token.id = user.id;
        //   @ts-ignore
        token.jwt = user.jwt;
      }

      return token;
    },
  },
};

export default NextAuth(authOptions);
