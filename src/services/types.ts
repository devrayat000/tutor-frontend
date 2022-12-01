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

export interface FeedbackResponse {
  data: {
    id: number;
    attributes: {
      by: string;
      comment: string;
      rating: number;
    };
  }[];

  meta: {
    pagination : {
      page: number,
      pageSize: number,
      pageCount: number,
      total: number
    }
  }
}

export interface RequestResponse {
  data: {
    id: number;
    attributes: {
      class: number,
      subject: JSON,
      institute: string,
      message: string,
      contact: string
    };
  }[];

  meta: {
    pagination : {
      page: number,
      pageSize: number,
      pageCount: number,
      total: number
    }
  }
}

export interface UserResponse {
  id: number,
  username: string,
  email: string,
  address: string,
  subjects: string[],
  institute: string,
  gender: string,
  method: string,
  phone: string,
  facebookUrl: string,
  location: string[]
}

