import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import login from "../../../services/login";
import getMe from "../../../services/me";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      // id: "local",
      // name: "Credentials",
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
    async session({ session, token, user }) {
      //   @ts-ignore
      session.jwt = token.jwt;
      //   @ts-ignore
      session.id = token.id;

      if (!user && token?.jwt) {
        // const fetcherUser = await getMe(token.jwt as string);
        session.user = Object.assign(session.user, {
          id: token.id,
          uid: token.uid,
        });
        // user = fetcherUser;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (!!user) {
        //   @ts-ignore
        token.id = user.id;
        //   @ts-ignore
        token.uid = user.uid;
        //   @ts-ignore
        token.jwt = user.jwt;
      }

      return token;
    },
  },
};

export default NextAuth(authOptions);
