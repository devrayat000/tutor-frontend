import { AuthResponse } from "./types";
import { z } from "zod";

export type LoginParams = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export default async function login(
  params: LoginParams
): Promise<AuthResponse> {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  );
  if (!resp.ok) {
    throw resp.json();
  }
  return resp.json();
}
