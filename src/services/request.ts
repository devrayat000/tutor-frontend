import qs from "qs";
import { Request, DataResponse } from "./types";

export default async function getRequests(
  token: string,
  params?: {
    class?: string;
    institute?: string;
    subject?: string;
  }
): Promise<DataResponse<Request>> {
  const p = qs.stringify(
    {
      filters: {
        class: {
          $eq: params?.class,
        },
        institute: {
          $eq: params?.institute,
        },
        subject: {
          $eq: params?.subject,
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/requests?${p}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!resp.ok) {
    throw resp.json();
  }
  return resp.json();
}
