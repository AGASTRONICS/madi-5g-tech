// Generic wrapper that the API returns for all responses.
// The backend may return data directly or nested under a `data` key —
// the Axios interceptor normalises this before callers see it.
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
}

// Shape of a FastAPI validation error item.
interface ApiErrorDetail {
  loc: (string | number)[];
  msg: string;
  type: string;
}

// The error shape thrown by the Axios interceptor after normalisation.
export interface ApiError {
  message: string;         // Human-readable, single string
  status: number;
  details?: ApiErrorDetail[];
  raw?: unknown;
}
