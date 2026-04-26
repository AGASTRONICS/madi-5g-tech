import apiClient from "./client";
import type {
  BuyAirtimePayload,
  BuyDataPayload,
  CableSubPayload,
  PayBillPayload,
  PurchaseResult,
} from "@/types/purchase.types";

// POST /api/v1/user/buy-airtime
export async function buyAirtime(
  payload: BuyAirtimePayload,
): Promise<PurchaseResult> {
  const response = await apiClient.post<PurchaseResult>(
    "/api/v1/user/buy-airtime",
    payload,
  );
  return response.data;
}

// POST /api/v1/user/buy-data
export async function buyData(
  payload: BuyDataPayload,
): Promise<PurchaseResult> {
  const response = await apiClient.post<PurchaseResult>(
    "/api/v1/user/buy-data",
    payload,
  );
  return response.data;
}

// POST /api/v1/user/cable-sub
export async function cableSub(
  payload: CableSubPayload,
): Promise<PurchaseResult> {
  const response = await apiClient.post<PurchaseResult>(
    "/api/v1/user/cable-sub",
    payload,
  );
  return response.data;
}

// POST /api/v1/user/pay-bill
export async function payBill(
  payload: PayBillPayload,
): Promise<PurchaseResult> {
  const response = await apiClient.post<PurchaseResult>(
    "/api/v1/user/pay-bill",
    payload,
  );
  return response.data;
}
