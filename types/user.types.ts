// ---- Dashboard -------------------------------------------------------

export interface DashboardData {
  email: string;
  balance: number;
  is_active: boolean;
  bonus: number;
  total_success_today: number;
  total_failed_today: number;
  total_pending_today: number;
  recent_txn: RecentTransaction[];
}

export interface RecentTransaction {
  id: string;
  service: string;
  amount: number;
  status: "success" | "pending" | "failed";
  created_at: string;
  description: string;
}

