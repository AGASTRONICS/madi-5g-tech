import type { Service } from "./plan.types";

// ---- Single transaction record ---------------------------------------

export interface Transaction {
  id: string;
  user_id: string;
  service: Service;
  amount: number;
  status: "success" | "pending" | "failed";
  reference: string;
  description: string;
  provider?: string;
  created_at: string;
  updated_at?: string;
  // Service-specific metadata fields
  number?: string;
  plan_id?: string;
  iuc_number?: string;
  meter_number?: string;
  network_id?: string;
}

// ---- Summary response -----------------------------------------------
// GET /api/v1/user/summary  (and /admin/summary)

export interface ServiceSummaryItem {
  service: Service;
  total_amount: number;
  total_transactions: number;
  successful: number;
  failed: number;
  pending: number;
}

export interface TransactionSummary {
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
