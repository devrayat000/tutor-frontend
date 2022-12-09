import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import login from "../../../services/login";

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
      async authorize(credentials) {
        const { user, jwt } = await login(credentials!);
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
      if (!!user) {
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
