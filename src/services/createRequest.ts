import { z } from "zod";
import { RequestStatus } from "./types";

export const createRequestSchema = z.object({
  class: z.string(),
  subject: z.string(),
  institute: z.string(),
  message: z.string(),
  contact: z.string(),
  status: z.nativeEnum(RequestStatus),
});

export type CreateRequestParams = z.infer<typeof createRequestSchema>;

export default async function createRequest(params: CreateRequestParams) {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  if (!resp.ok) {
    throw resp.json();
  }
  return resp.json();
}
