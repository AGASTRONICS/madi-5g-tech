import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pay Bills" };

// TODO: Replace with PayBillForm component
export default function BillsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Pay Bills</h1>
      {/* TODO: <PayBillForm /> */}
    </div>
  );
}
