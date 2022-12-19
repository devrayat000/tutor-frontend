import { User } from "./types";

export default async function getMe(token: string): Promise<User | undefined> {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    // throw resp.json();
    return undefined;
  }
  return resp.json();
}
