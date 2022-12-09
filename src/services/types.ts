export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export enum TutionMethod {
  ONLINE = "online",
  OFFLINE = "offline",
}

export enum RequestStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface SingleEntry {
  entry: string;
}

export interface Subject {
  subjects: SingleEntry[];
}

export interface Location {
  locations: SingleEntry[];
}

export interface User {
  id: string;
  username: string;
  uid: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  address: string;
  location: SingleEntry[];
  subjects: SingleEntry[];
  institute: string;
  gender: Gender;
  point: number;
  designation: string;
  method: TutionMethod;
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

export interface SingleResponse<T> {
  data: {
    id: number;
    attributes: T;
  };

  meta: {};
}

export interface DataResponse<T> {
  data: {
    id: number;
    attributes: T;
  }[];

  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Feedback {
  by: string;
  comment: string;
  rating: number;
}

export interface Request {
  class: number;
  subject: JSON;
  institute: string;
  message: string;
  contact: string;
  status: RequestStatus;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  address: string;
  subjects: SingleEntry[];
  institute: string;
  gender: Gender;
  method: TutionMethod;
  phone: string;
  facebookUrl: string;
  location: SingleEntry[];
}
