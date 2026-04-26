import apiClient from "./client";
import type { Service } from "@/types/plan.types";
import type {
  AdminOverview,
  AdminSummary,
  AdminUser,
  EditUserPayload,
  Network,
  AddNetworkPayload,
  UpdateNetworkPayload,
  AddAirtimePlanPayload,
  UpdateAirtimePlanPayload,
  AddDataPlanPayload,
  UpdateDataPlanPayload,
} from "@/types/admin.types";
import type { AirtimePlan, DataPlan } from "@/types/plan.types";

// ---- Overview / Summary ---------------------------------------------

// GET /api/v1/admin/overview
export async function getAdminOverview(): Promise<AdminOverview> {
  const response = await apiClient.get<AdminOverview>("/api/v1/admin/overview");
  return response.data;
}

// GET /api/v1/admin/summary
export async function getAdminSummary(): Promise<AdminSummary> {
  const response = await apiClient.get<AdminSummary>("/api/v1/admin/summary");
  return response.data;
}

// GET /api/v1/admin/summary/{service}
export async function getAdminSummaryByService(
  service: Service,
): Promise<AdminSummary> {
  const response = await apiClient.get<AdminSummary>(
    `/api/v1/admin/summary/${service}`,
  );
  return response.data;
}

// ---- User management ------------------------------------------------

// GET /api/v1/admin/users/all
export async function getAllUsers(): Promise<AdminUser[]> {
  const response = await apiClient.get<AdminUser[]>("/api/v1/admin/users/all");
  return response.data;
}

// PUT /api/v1/admin/users/edit/{id}
export async function editUser(
  id: string,
  payload: EditUserPayload,
): Promise<AdminUser> {
  const response = await apiClient.put<AdminUser>(
    `/api/v1/admin/users/edit/${id}`,
    payload,
  );
  return response.data;
}

// DELETE /api/v1/admin/users/delete/{id}
export async function deleteUser(id: string): Promise<{ message: string }> {
  const response = await apiClient.delete<{ message: string }>(
    `/api/v1/admin/users/delete/${id}`,
  );
  return response.data;
}

// ---- Network management ---------------------------------------------

// GET /api/v1/admin/plans/networks
export async function getNetworks(): Promise<Network[]> {
  const response = await apiClient.get<Network[]>(
    "/api/v1/admin/plans/networks",
  );
  return response.data;
}

// POST /api/v1/admin/plans/networks/add
export async function addNetwork(
  payload: AddNetworkPayload,
): Promise<Network> {
  const response = await apiClient.post<Network>(
    "/api/v1/admin/plans/networks/add",
    payload,
  );
  return response.data;
}

// PUT /api/v1/admin/plans/networks/update/{id}
export async function updateNetwork(
  id: string,
  payload: UpdateNetworkPayload,
): Promise<Network> {
  const response = await apiClient.put<Network>(
    `/api/v1/admin/plans/networks/update/${id}`,
    payload,
  );
  return response.data;
}

// DELETE /api/v1/admin/plans/networks/delete/{id}
export async function deleteNetwork(id: string): Promise<{ message: string }> {
  const response = await apiClient.delete<{ message: string }>(
    `/api/v1/admin/plans/networks/delete/${id}`,
  );
  return response.data;
}

// ---- Airtime plan management ----------------------------------------

// GET /api/v1/admin/plans/airtime-plans
export async function getAdminAirtimePlans(): Promise<AirtimePlan[]> {
  const response = await apiClient.get<AirtimePlan[]>(
    "/api/v1/admin/plans/airtime-plans",
  );
  return response.data;
}

// POST /api/v1/admin/plans/airtime-plans/add
export async function addAirtimePlan(
  payload: AddAirtimePlanPayload,
): Promise<AirtimePlan> {
  const response = await apiClient.post<AirtimePlan>(
    "/api/v1/admin/plans/airtime-plans/add",
    payload,
  );
  return response.data;
}

// PUT /api/v1/admin/plans/airtime-plans/update/{id}
export async function updateAirtimePlan(
  id: string,
  payload: UpdateAirtimePlanPayload,
): Promise<AirtimePlan> {
  const response = await apiClient.put<AirtimePlan>(
    `/api/v1/admin/plans/airtime-plans/update/${id}`,
    payload,
  );
  return response.data;
}

// DELETE /api/v1/admin/plans/airtime-plan/delete/{plan_id}
// NOTE: singular "airtime-plan" (no "s") — upstream API inconsistency preserved.
export async function deleteAirtimePlan(
  planId: string,
): Promise<{ message: string }> {
  const response = await apiClient.delete<{ message: string }>(
    `/api/v1/admin/plans/airtime-plan/delete/${planId}`,
  );
  return response.data;
}

// ---- Data plan management -------------------------------------------

// GET /api/v1/admin/plans/data-plans
export async function getAdminDataPlans(): Promise<DataPlan[]> {
  const response = await apiClient.get<DataPlan[]>(
    "/api/v1/admin/plans/data-plans",
  );
  return response.data;
}

// POST /api/v1/admin/plans/data-plans/add
export async function addDataPlan(
  payload: AddDataPlanPayload,
): Promise<DataPlan> {
  const response = await apiClient.post<DataPlan>(
    "/api/v1/admin/plans/data-plans/add",
    payload,
  );
  return response.data;
}

// PUT /api/v1/admin/plans/data-plans/update/{id}
export async function updateDataPlan(
  id: string,
  payload: UpdateDataPlanPayload,
): Promise<DataPlan> {
  const response = await apiClient.put<DataPlan>(
    `/api/v1/admin/plans/data-plans/update/${id}`,
    payload,
  );
  return response.data;
}

// DELETE /api/v1/admin/plans/data-plans/delete/{id}
export async function deleteDataPlan(id: string): Promise<{ message: string }> {
  const response = await apiClient.delete<{ message: string }>(
    `/api/v1/admin/plans/data-plans/delete/${id}`,
  );
  return response.data;
}
