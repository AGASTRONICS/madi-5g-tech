import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Dashboard" };

// TODO: Replace with AdminOverview component
export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
      {/* TODO: <AdminOverview /> */}
    </div>
  );
}
