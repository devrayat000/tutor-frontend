import { z } from "zod";

export const createFeedbackSchema = z.object({
  by: z.string(),
  comment: z.string(),
  rating: z.number().min(0).max(10),
});

export type CreateFeedbackParams = z.infer<typeof createFeedbackSchema>;

export default async function createFeedback(params: CreateFeedbackParams) {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/feedbacks`, {
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
