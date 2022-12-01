import {UserResponse} from './types'


export default async function getUsersByMethod(
    method: string
): Promise<UserResponse> {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users?filters[method][$eq]=${method}`
    );
    if (!resp.ok) {
      throw resp.json();
    }
    return resp.json();
}
  