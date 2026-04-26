// ---- Shared enums ----------------------------------------------------

export type NetworkName = "mtn" | "airtel" | "glo" | "t2";
export type DataSize = "MB" | "GB" | "TB";
export type Service = "airtime" | "data" | "cable" | "bill";
export type Provider = "sim" | "smartcash" | "momo" | "vtpass";

// ---- Network (used by airtime + data plans) -------------------------

export interface Network {
  id: string;
  name: NetworkName;
  is_active: boolean;
}

// ---- Airtime plans --------------------------------------------------

export interface AirtimePlan {
  id: string;
  network_id: string;
  network?: Network;
  minimum_amount: number;
  maximum_amount: number;
  charges: number;      // percentage or flat fee applied on purchase
  discount: number;
  is_active: boolean;
}

// ---- Data plans -----------------------------------------------------

export interface DataPlan {
  id: string;
  network_id: string;
  network?: Network;
  data_type_id: string;
  name: string;
  size?: number;
  size_unit?: DataSize;
  validity: string;     // e.g. "30 days"
  description?: string;
  teleco_price?: number;
  wallet_price: number;
  charges: number;
  is_active: boolean;
  // Provider-specific plan IDs used at routing time
  sim_id?: string;
  momo_id?: string;
  smartcash_id?: string;
  vtpass_id?: string;
}

// ---- Cable plans ----------------------------------------------------

export interface CablePlan {
  id: string;
  name: string;
  provider: string;     // e.g. "DSTV", "GOtv", "Startimes"
  amount: number;
  validity?: string;
  is_active: boolean;
}

// ---- Bills plans ----------------------------------------------------

export interface BillPlan {
  id: string;
  name: string;
  category: string;     // e.g. "electricity", "water"
  provider: string;
  minimum_amount?: number;
  maximum_amount?: number;
  charges: number;
  is_active: boolean;
}
