import {UserResponse} from './types'


export default async function getUsersByInstitute(
    ins: string
): Promise<UserResponse> {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users?filters[institute][$eq]=${ins}`
    );
    if (!resp.ok) {
      throw resp.json();
    }
    return resp.json();
}
  