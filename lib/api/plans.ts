import apiClient from "./client";
import type { AirtimePlan, DataPlan, CablePlan, BillPlan } from "@/types/plan.types";

// GET /api/v1/plans/airtime-plans
export async function getAirtimePlans(): Promise<AirtimePlan[]> {
  const response = await apiClient.get<AirtimePlan[]>(
    "/api/v1/plans/airtime-plans",
  );
  return response.data;
}

// GET /api/v1/plans/data-plans
export async function getDataPlans(): Promise<DataPlan[]> {
  const response = await apiClient.get<DataPlan[]>(
    "/api/v1/plans/data-plans",
  );
  return response.data;
}

// GET /api/v1/plans/cable-plans
export async function getCablePlans(): Promise<CablePlan[]> {
  const response = await apiClient.get<CablePlan[]>(
    "/api/v1/plans/cable-plans",
  );
  return response.data;
}

// GET /api/v1/plans/bills-plans
export async function getBillPlans(): Promise<BillPlan[]> {
  const response = await apiClient.get<BillPlan[]>(
    "/api/v1/plans/bills-plans",
  );
  return response.data;
}
