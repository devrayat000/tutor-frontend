import { AuthResponse, Gender } from "./types";
import { z } from "zod";

export type RegisterParams = z.infer<typeof registerSchema>;

export const registerSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8).max(32),
  phone: z.string(),
  gender: z.nativeEnum(Gender).default(Gender.MALE),
  institute: z.string(),
  designation: z.string(),
  method: z.string(),
  address: z.string(),
  facebookUrl: z.string().optional(),
  subjects: z.array(z.string()),
  location: z.array(z.string()),
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
