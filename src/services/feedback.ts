import {FeedbackResponse} from './types'


export default async function getAllFeedback(
    token: string
): Promise<FeedbackResponse> {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/feedback`,
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
  