import {RequestResponse} from './types'


export default async function getRequestByClass(
    token: string,
    cl: number
): Promise<RequestResponse> {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/requests?filters[class][$eq]=${cl}`,
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
  