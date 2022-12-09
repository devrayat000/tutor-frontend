import { SingleResponse, Subject } from "./types";

export default async function getSubjects(): Promise<SingleResponse<Subject>> {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/subject?populate=subjects`
  );
  if (!resp.ok) {
    throw resp.json();
  }
  return resp.json();
}
