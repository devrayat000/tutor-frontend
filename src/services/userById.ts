import qs from "qs";
import { User } from "./types";

export default async function getUserById(
  uid: string,
  isMe?: boolean
): Promise<User> {
  const p = qs.stringify(
    {
      filters: {
        uid: {
          $eq: uid,
        },
      },
      populate: ["subjects", "locations", isMe ? "requests" : undefined],
    },
    { encodeValuesOnly: true }
  );
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?${p}`);
  if (!resp.ok) {
    throw resp.json();
  }
  const users = await resp.json();
  return users?.[0];
}
