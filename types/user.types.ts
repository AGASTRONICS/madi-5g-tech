// ---- Dashboard -------------------------------------------------------

export interface DashboardStats {
  total_spent: number;
  total_transactions: number;
  wallet_balance: number;
  monthly_spent: number;
}

export interface RecentTransaction {
  id: string;
  service: string;
  amount: number;
  status: "success" | "pending" | "failed";
  created_at: string;
  description: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recent_transactions: RecentTransaction[];
  user: {
    id: string;
    name: string;
    email: string;
    number: string;
    is_active: boolean;
    is_admin: boolean;
  };
}
