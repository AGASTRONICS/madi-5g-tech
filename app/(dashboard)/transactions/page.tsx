import type { Metadata } from "next";

export const metadata: Metadata = { title: "Transactions" };

// TODO: Replace with TransactionsTable component
export default function TransactionsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
      {/* TODO: <TransactionsTable /> */}
    </div>
  );
}
