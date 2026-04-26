import apiClient from "./client";
import type { Service } from "@/types/plan.types";
import type { TransactionSummary } from "@/types/transaction.types";

// GET /api/v1/user/summary
export async function getTransactionSummary(): Promise<TransactionSummary> {
  const response = await apiClient.get<TransactionSummary>(
    "/api/v1/user/summary",
  );
  return response.data;
}

// GET /api/v1/user/summary/{service}
export async function getTransactionSummaryByService(
  service: Service,
): Promise<TransactionSummary> {
  const response = await apiClient.get<TransactionSummary>(
    `/api/v1/user/summary/${service}`,
  );
  return response.data;
}
