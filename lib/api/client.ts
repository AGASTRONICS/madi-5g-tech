import axios, {
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import type { ApiError } from "@/types/api.types";

// ---- Axios instance -------------------------------------------------

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30_000,
});

// ---- Request interceptor: attach Bearer token ----------------------

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Dynamically import the store to avoid circular dep issues.
    // We use a lazy require-style pattern by reading from the module at
    // call time rather than at module initialisation.
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error),
);

// ---- Response interceptor: error normalisation ----------------------

apiClient.interceptors.response.use(
  // Pass successful responses straight through — callers receive response.data
  (response) => response,

  async (error: AxiosError<FastApiErrorShape>) => {
    const status = error.response?.status;
    const normalised = normaliseError(error);

    if (status === 401) {
      // Clear stored auth and redirect to login.
      // We import dynamically here to avoid a module initialisation cycle
      // (auth.store imports decodeToken which has no cycle, but if we
      // imported the store at the top of this file AND the store imported
      // client.ts, we'd have a cycle — this guard avoids that).
      try {
        const { useAuthStore } = await import("@/lib/store/auth.store");
        useAuthStore.getState().clearAuth();
      } catch {
        // Store may not be available in SSR contexts; that's fine.
      }
      // Only redirect if we are running in the browser.
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    if (status === 403) {
      // 403 handling is done in-component via the thrown error;
      // global toast is added in QueryProvider's onError callbacks.
    }

    return Promise.reject(normalised);
  },
);

// ---- FastAPI error shape (422 detail is an array) -------------------

interface FastApiErrorDetail {
  loc: (string | number)[];
  msg: string;
  type: string;
}

interface FastApiErrorShape {
  detail?: string | FastApiErrorDetail[] | undefined;
  message?: string;
}

// ---- Error normalisation helper -------------------------------------

function normaliseError(error: AxiosError<FastApiErrorShape>): ApiError {
  const status = error.response?.status ?? 0;
  const responseData = error.response?.data;

  // FastAPI 422: detail is an array of validation errors
  if (status === 422 && Array.isArray(responseData?.detail)) {
    const details = responseData.detail as FastApiErrorDetail[];
    const message = details
      .map((d) => {
        // loc looks like ["body", "email"] — take the last meaningful segment
        const field = d.loc.filter((l) => l !== "body").join(".");
        return field ? `${field}: ${d.msg}` : d.msg;
      })
      .join("; ");

    return {
      message: message || "Validation error.",
      status,
      details,
      raw: error.response?.data,
    };
  }

  // Generic error: prefer detail string, then message, then status text
  const message =
    (typeof responseData?.detail === "string" ? responseData.detail : undefined) ??
    responseData?.message ??
    error.message ??
    "An unexpected error occurred.";

  // 5xx — log to console for debugging in production traces
  if (status >= 500) {
    console.error("[API 5xx]", status, message, error.response?.data);
  }

  return {
    message,
    status,
    raw: error.response?.data,
  };
}

// ---- Token accessor -------------------------------------------------
// This reads from localStorage directly rather than importing the Zustand
// store synchronously, preventing circular dependency issues.

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("vtu_auth");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { state?: { token?: string } };
    return parsed?.state?.token ?? null;
  } catch {
    return null;
  }
}

export default apiClient;
