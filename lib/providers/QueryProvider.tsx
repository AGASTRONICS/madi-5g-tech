"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a stable QueryClient with sensible defaults for a fintech app:
// - plans/static data: 5 min stale time
// - everything else: 30 sec stale time (use queryOptions to override per-query)
function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,            // 30 seconds default
        gcTime: 5 * 60 * 1000,          // 5 minutes cache retention
        retry: 1,                        // one retry on failure
        refetchOnWindowFocus: false,     // avoid re-fetching when user tabs back in
      },
      mutations: {
        retry: 0,                        // never retry mutations automatically
      },
    },
  });
}

// Singleton on the server so that multiple React renders share the same cache.
// On the client we use useState to ensure the same QueryClient instance
// is used for the lifetime of the app without leaking between users on SSR.
let browserQueryClient: QueryClient | undefined;

function getQueryClient(): QueryClient {
  if (typeof window === "undefined") {
    // Server: always create a new client to avoid cross-request state pollution.
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // useState ensures the QueryClient is not re-created on every render.
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
