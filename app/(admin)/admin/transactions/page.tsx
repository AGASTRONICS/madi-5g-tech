import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Transactions" };

// TODO: Replace with AdminTransactionsTable component
export default function AdminTransactionsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">All Transactions</h1>
      {/* TODO: <AdminTransactionsTable /> */}
    </div>
  );
}
