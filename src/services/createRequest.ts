import { z } from "zod";
import { Request, RequestStatus, SingleResponse } from "./types";

export const createRequestSchema = z.object({
  class: z.string().min(1, "Required!"),
  subject: z.string().min(1, "Required!"),
  institute: z.string().min(1, "Required!"),
  message: z.string().min(1, "Required!"),
  contact: z.string().min(1, "Required!"),
  status: z.nativeEnum(RequestStatus),
  user: z.string().or(z.number()),
});

export type CreateRequestParams = z.infer<typeof createRequestSchema>;

export default async function createRequest(
  data: CreateRequestParams
): Promise<SingleResponse<Request>> {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });
  if (!resp.ok) {
    throw resp.json();
  }
  return resp.json();
}
