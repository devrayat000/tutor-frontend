export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  address: string;
  location: string[];
  subjects: string[];
  institute: string;
  gender: string;
  point: number;
  designation: string;
  method: string;
  phone: string;
  facebookUrl: string;
  enabled: boolean;
}

export interface ErrorResponse {
  data: null;
  error: ErrorResponseError;
}

export interface ErrorResponseError {
  status: number;
  name: string;
  message: string;
  details: Details;
}

export interface Details {
  errors: ErrorElement[];
}

export interface ErrorElement {
  path: string[];
  message: string;
  name: string;
}
