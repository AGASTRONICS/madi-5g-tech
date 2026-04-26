import apiClient from "./client";
import type { DashboardData } from "@/types/user.types";

// GET /api/v1/user/dashboard
export async function getDashboard(): Promise<DashboardData> {
  const response = await apiClient.get<DashboardData>("/api/v1/user/dashboard");
  return response.data;
}
