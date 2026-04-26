import type { Metadata } from "next";

export const metadata: Metadata = { title: "Buy Airtime" };

// TODO: Replace with BuyAirtimeForm component
export default function AirtimePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Buy Airtime</h1>
      {/* TODO: <BuyAirtimeForm /> */}
    </div>
  );
}
