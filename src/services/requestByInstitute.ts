import {RequestResponse} from './types'


export default async function getRequestByInstitute(
    token: string,
    ins: string
): Promise<RequestResponse> {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/requests?filters[institute][$eq]=${ins}`,
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
  