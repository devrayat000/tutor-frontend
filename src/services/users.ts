import qs from "qs";
import { z } from "zod";
import { Gender, TutionMethod, User } from "./types";

export const filterSchema = z.object({
  page: z.number().int().positive().optional(),
  method: z.enum([TutionMethod.OFFLINE, TutionMethod.ONLINE]).optional(),
  gender: z.enum([Gender.MALE, Gender.FEMALE]).optional(),
  institute: z.string().optional(),
  subjects: z.array(z.string()).or(z.string()).optional(),
  locations: z.array(z.string()).or(z.string()).optional(),
});

type FilterParams = z.infer<typeof filterSchema>;

export default async function getUsers(
  params?: {
    uid?: string;
  } & FilterParams
): Promise<User[]> {
  const p = qs.stringify(
    {
      filters: {
        method: { $eq: params?.method },
        gender: { $eq: params?.gender },
        institute: { $contains: params?.institute },
        uid: {
          $notNull: true,
          $eq: params?.uid,
        },
        subjects: {
          entry: {
            $in:
              typeof params?.subjects === "string"
                ? [params?.subjects]
                : params?.subjects,
          },
        },
        locations: {
          entry: {
            $in:
              typeof params?.locations === "string"
                ? [params?.locations]
                : params?.locations,
          },
        },
      },
      pagination: { page: params?.page },
    },
    { encodeValuesOnly: true }
  );
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?${p}`);
  if (!resp.ok) {
    throw resp.json();
  }
  return resp.json();
}
