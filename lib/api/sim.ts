import apiClient from "./client";
import type {
  Sim,
  RequestOtpPayload,
  RequestOtpResponse,
  ConnectSimPayload,
  ConnectSimResponse,
} from "@/types/sim.types";

// GET /api/v1/user/provider/sims
export async function getSims(): Promise<Sim[]> {
  const response = await apiClient.get<Sim[]>(
    "/api/v1/user/provider/sims",
  );
  return response.data;
}

// POST /api/v1/user/provider/sim/request-otp
export async function requestOtp(
  payload: RequestOtpPayload,
): Promise<RequestOtpResponse> {
  const response = await apiClient.post<RequestOtpResponse>(
    "/api/v1/user/provider/sim/request-otp",
    payload,
  );
  return response.data;
}

// POST /api/v1/user/provider/sim/connect-sim
export async function connectSim(
  payload: ConnectSimPayload,
): Promise<ConnectSimResponse> {
  const response = await apiClient.post<ConnectSimResponse>(
    "/api/v1/user/provider/sim/connect-sim",
    payload,
  );
  return response.data;
}

// DELETE /api/v1/user/provider/sim/delete{sim_id}
// NOTE: The API path has NO slash before the dynamic segment — this is an
// upstream API inconsistency that must be preserved exactly as-is.
export async function deleteSim(simId: string): Promise<{ message: string }> {
  const response = await apiClient.delete<{ message: string }>(
    `/api/v1/user/provider/sim/delete${simId}`,
  );
  return response.data;
}
