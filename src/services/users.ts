import qs from "qs";
import { Gender, TutionMethod, UserResponse } from "./types";

export default async function getUsers(params?: {
  method?: TutionMethod;
  gender?: Gender;
  institute?: string;
}): Promise<UserResponse> {
  const p = qs.stringify(
    {
      filters: {
        method: {
          $eq: params?.method,
        },
        gender: {
          $eq: params?.gender,
        },
        institute: {
          $eq: params?.institute,
        },
      },
    },
    { encodeValuesOnly: true }
  );
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?${p}`);
  if (!resp.ok) {
    throw resp.json();
  }
  return resp.json();
}
