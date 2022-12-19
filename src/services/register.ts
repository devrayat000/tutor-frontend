import { AuthResponse, Gender } from "./types";
import { z } from "zod";
import { updateMeSchema } from "./updateMe";

export type RegisterParams = z.infer<typeof registerSchema>;

export const registerSchema = updateMeSchema.extend({
  email: z.string().email(),
  password: z.string().min(8).max(32),
  gender: z.nativeEnum(Gender).default(Gender.MALE),
});

export default async function register(
  params: RegisterParams
): Promise<AuthResponse> {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
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
