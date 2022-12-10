import getUsers from "./users";

export default async function getUserById(uid: string) {
  const users = await getUsers({ uid });
  return users?.[0];
}
