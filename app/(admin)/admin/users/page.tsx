import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Users" };

// TODO: Replace with AdminUsersTable component
export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Manage Users</h1>
      {/* TODO: <AdminUsersTable /> */}
    </div>
  );
}
