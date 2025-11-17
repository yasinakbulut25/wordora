import { fetchClient } from "@/lib/fetchClient";
import { endpoints } from "@/lib/endpoints";
import type {
  RegisterPayload,
  LoginPayload,
  ApiResponse,
  AuthUser,
} from "@/types/auth";

export async function registerUser(payload: RegisterPayload) {
  return fetchClient<ApiResponse<AuthUser>>(endpoints.auth.register, {
    method: "POST",
    body: payload,
  });
}

export async function loginUser(payload: LoginPayload) {
  return fetchClient<ApiResponse<AuthUser>>(endpoints.auth.login, {
    method: "POST",
    body: payload,
  });
}
