import {RequestResponse} from './types'


export default async function getAllRequests(
    token: string
): Promise<RequestResponse> {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/requests`,
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
  