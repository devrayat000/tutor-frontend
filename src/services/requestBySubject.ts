import {RequestResponse} from './types'


export default async function getRequestBySubject(
    token: string,
    subject: string
): Promise<RequestResponse> {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/requests?filters[subject][$eq]=${subject}`,
      {
        headers: {
          "Authorization":`Bearer ${token}`,
        },
      }
    );
    if (!resp.ok) {
      throw resp.json();
    }
    return resp.json();
  }
  