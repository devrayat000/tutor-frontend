import NextAuth from "next-auth";
import { User } from "../services/types";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & { name: string };
  }
}
