import { Location, SingleResponse } from "./types";

export default async function getLocations(): Promise<
  SingleResponse<Location>
> {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/location?populate=locations`
  );
  if (!resp.ok) {
    throw resp.json();
  }
  return resp.json();
}
