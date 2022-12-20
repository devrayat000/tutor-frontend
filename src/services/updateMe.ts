import { z } from "zod";
import { TutionMethod, User } from "./types";

export const singleEntrySchema = z.object({
  entry: z.string().min(1, "Required!"),
});

export const updateMeSchema = z.object({
  username: z.string().min(1, "Required!"),
  phone: z.string().min(1, "Required!"),
  institute: z.string().min(1, "Required!"),
  designation: z.string().min(1, "Required!"),
  method: z.nativeEnum(TutionMethod).default(TutionMethod.OFFLINE),
  address: z.string().min(1, "Required!"),
  facebookUrl: z.string().optional(),
  subjects: z.array(singleEntrySchema).optional(),
  locations: z.array(singleEntrySchema).optional(),
});

export type UpdateMeParams = z.infer<typeof updateMeSchema>;

export default async function updateMe(
  id: string,
  data: UpdateMeParams,
  token: string
): Promise<User> {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    }
  );
  if (!resp.ok) {
    throw resp.json();
  }
  return resp.json();
}
