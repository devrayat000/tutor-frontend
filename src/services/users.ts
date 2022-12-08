import {UserResponse} from './types'


export default async function getAllUsers(): Promise<UserResponse> {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users`
    );
    if (!resp.ok) {
      throw resp.json();
    }
    return resp.json();
}
  