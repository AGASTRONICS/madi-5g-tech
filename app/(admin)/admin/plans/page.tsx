import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Plans" };

// TODO: Replace with AdminPlansManager component (networks, airtime, data tabs)
export default function AdminPlansPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Manage Plans</h1>
      {/* TODO: <AdminPlansManager /> */}
    </div>
  );
}
