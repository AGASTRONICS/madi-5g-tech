import type { Metadata } from "next";

export const metadata: Metadata = { title: "Buy Data" };

// TODO: Replace with BuyDataForm component
export default function DataPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Buy Data</h1>
      {/* TODO: <BuyDataForm /> */}
    </div>
  );
}
