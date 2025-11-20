export interface AuthUser {
  id: string;
  email: string;
  username: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  user?: T;
  error?: string;
}
