import type { NetworkName } from "./plan.types";

// ---- SIM record -----------------------------------------------------

export interface Sim {
  id: string;
  network_id: string;
  network_name?: NetworkName;
  number: string;
  is_active: boolean;
  is_connected: boolean;
  created_at: string;
}

// ---- Request payloads ------------------------------------------------

export interface RequestOtpPayload {
  network_id: string;
  number: string;
}

export interface ConnectSimPayload {
  network_id: string;
  number: string;
  otp_passcode: string;
}

// ---- Responses -------------------------------------------------------

export interface RequestOtpResponse {
  message: string;
  request_id?: string;
}

export interface ConnectSimResponse {
  message: string;
  sim: Sim;
}
