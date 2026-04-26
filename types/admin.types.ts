import type { NetworkName, DataSize, Service } from "./plan.types";
import type { ServiceSummaryItem, Transaction } from "./transaction.types";

// ---- Admin overview -------------------------------------------------

export interface AdminOverview {
  total_users: number;
  active_users: number;
  total_revenue: number;
  monthly_revenue: number;
  total_transactions: number;
  monthly_transactions: number;
  revenue_by_service: { service: Service; amount: number }[];
}

// ---- Admin transaction summary --------------------------------------

export interface AdminSummary {
  overall: {
    total_amount: number;
    total_transactions: number;
    successful: number;
    failed: number;
    pending: number;
  };
  by_service: ServiceSummaryItem[];
  transactions: Transaction[];
}

// ---- User management ------------------------------------------------

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  number: string;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
  wallet_balance?: number;
}

export interface EditUserPayload {
  name?: string;
  email?: string;
  number?: string;
  is_active?: boolean;
  is_admin?: boolean;
}

// ---- Network management ---------------------------------------------

export interface Network {
  id: string;
  name: NetworkName;
  is_active: boolean;
  created_at?: string;
}

export interface AddNetworkPayload {
  name: NetworkName;
  is_active: boolean;
}

export interface UpdateNetworkPayload {
  name?: NetworkName;
  is_active?: boolean;
}

// ---- Airtime plan management ----------------------------------------

export interface AddAirtimePlanPayload {
  network_id: string;
  minimum_amount: number;
  maximum_amount: number;
  charges: number;
  discount: number;
  is_active: boolean;
}

export interface UpdateAirtimePlanPayload extends Partial<AddAirtimePlanPayload> {}

// ---- Data plan management -------------------------------------------

export interface AddDataPlanPayload {
  network_id: string;
  data_type_id: string;
  name: string;
  size?: number;
  size_unit?: DataSize;
  validity: string;
  description?: string;
  teleco_price?: number;
  wallet_price: number;
  charges: number;
  is_active: boolean;
  // Optional provider-specific plan ID mappings
  sim_id?: string;
  momo_id?: string;
  smartcash_id?: string;
  vtpass_id?: string;
}

export interface UpdateDataPlanPayload extends Partial<AddDataPlanPayload> {}
