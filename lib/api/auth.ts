import apiClient from "./client";
import type { AuthTokenResponse, LoginPayload, RegisterPayload } from "@/types/auth.types";

// ---- Login ----------------------------------------------------------
// OAuth2 Password flow: MUST be sent as application/x-www-form-urlencoded.

export async function login(payload: LoginPayload): Promise<AuthTokenResponse> {
  // URLSearchParams serialises to the correct Content-Type automatically.
  const body = new URLSearchParams();
  body.append("username", payload.username);
  body.append("password", payload.password);

  const response = await apiClient.post<AuthTokenResponse>(
    "/api/v1/auth/login",
    body,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  );
  return response.data;
}

// ---- Register -------------------------------------------------------
// Standard JSON body.

export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  number: string;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
}

export async function register(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const response = await apiClient.post<RegisterResponse>(
    "/api/v1/auth/register",
    payload,
  );
  return response.data;
}
