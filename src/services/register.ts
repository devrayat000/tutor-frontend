import { AuthResponse, Gender, TutionMethod } from "./types";
import { z } from "zod";

export type RegisterParams = z.infer<typeof registerSchema>;

export const singleEntrySchema = z.object({
  entry: z.string().min(1, "Required!"),
});

export const registerSchema = z.object({
  username: z.string().min(1, "Required!"),
  email: z.string().email(),
  password: z.string().min(8).max(32),
  phone: z.string().min(1, "Required!"),
  gender: z.nativeEnum(Gender).default(Gender.MALE),
  institute: z.string().min(1, "Required!"),
  designation: z.string().min(1, "Required!"),
  method: z.nativeEnum(TutionMethod).default(TutionMethod.OFFLINE),
  address: z.string().min(1, "Required!"),
  facebookUrl: z.string().optional(),
  subjects: z.array(singleEntrySchema).optional(),
  locations: z.array(singleEntrySchema).optional(),
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
