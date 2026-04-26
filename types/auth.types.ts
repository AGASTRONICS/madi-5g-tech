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
// Backend may not include email/name in the JWT; they're optional.
export interface TokenPayload {
  sub: string;                // User ID (required)
  is_admin: boolean;          // Custom claim (required, but may default to false)
  exp: number;                // Unix timestamp (required)
  email?: string;             // Optional
  name?: string;              // Optional
  iat?: number;               // Optional
}
