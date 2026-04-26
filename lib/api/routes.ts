import apiClient from "./client";
import type { VendingRoute, SetRoutePayload, UpdateRoutePayload } from "@/types/route.types";

// GET /api/v1/user/provider/routes
export async function getRoutes(): Promise<VendingRoute[]> {
  const response = await apiClient.get<VendingRoute[]>(
    "/api/v1/user/provider/routes",
  );
  return response.data;
}

// POST /api/v1/user/provider/routes/add
export async function addRoute(
  payload: SetRoutePayload,
): Promise<VendingRoute> {
  const response = await apiClient.post<VendingRoute>(
    "/api/v1/user/provider/routes/add",
    payload,
  );
  return response.data;
}

// PUT /api/v1/user/provider/routes/update/{id}
export async function updateRoute(
  id: string,
  payload: UpdateRoutePayload,
): Promise<VendingRoute> {
  const response = await apiClient.put<VendingRoute>(
    `/api/v1/user/provider/routes/update/${id}`,
    payload,
  );
  return response.data;
}

// DELETE /api/v1/user/provider/routes/delete/{id}
export async function deleteRoute(id: string): Promise<{ message: string }> {
  const response = await apiClient.delete<{ message: string }>(
    `/api/v1/user/provider/routes/delete/${id}`,
  );
  return response.data;
}
