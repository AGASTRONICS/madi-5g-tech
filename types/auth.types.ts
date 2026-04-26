// ---- Request payloads ------------------------------------------------

export interface LoginPayload {
  username: string; // OAuth2 spec uses "username" field name
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  number: string;
  password: string;
}

// ---- API response ----------------------------------------------------

export interface AuthTokenResponse {
  access_token: string;
  token_type: string;
}

// ---- JWT claims (decoded from access_token) -------------------------
// `sub` holds the user's ID, `is_admin` is a custom claim.
export interface TokenPayload {
  sub: string;           // User ID
  email: string;
  name: string;
  is_admin: boolean;
  exp: number;           // Unix timestamp
  iat?: number;
}
