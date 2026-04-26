// ---- Request payloads ------------------------------------------------

export interface BuyAirtimePayload {
  network_id: string;
  amount: number;
  number: string;
}

export interface BuyDataPayload {
  plan_id: string;
  number: string;
}

export interface CableSubPayload {
  plan_id: string;
  iuc_number: string;
}

export interface PayBillPayload {
  plan_id: string;
  meter_number: string;
  amount: number;
}

// ---- Purchase result -------------------------------------------------

export interface PurchaseResult {
  transaction_id: string;
  status: "success" | "pending" | "failed";
  message: string;
  amount: number;
  reference: string;
  created_at: string;
}
