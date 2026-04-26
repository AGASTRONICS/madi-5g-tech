import type { Provider, Service } from "./plan.types";

// ---- Vending route record -------------------------------------------

export interface VendingRoute {
  id: string;
  service: Service;
  plan_id: string;
  provider: Provider;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

// ---- Request payloads -----------------------------------------------

export interface SetRoutePayload {
  service: Service;
  plan_id: string;
  provider: Provider;
}

export interface UpdateRoutePayload {
  provider: Provider;
}
