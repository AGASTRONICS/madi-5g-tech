import type { Metadata } from "next";

export const metadata: Metadata = { title: "Vending Routes" };

// TODO: Replace with RoutesManager component
export default function RoutesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Vending Routes</h1>
      {/* TODO: <RoutesManager /> */}
    </div>
  );
}
