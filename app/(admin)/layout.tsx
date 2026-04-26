// TODO: Add AdminSidebar + AdminNavbar layout components
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh bg-background">
      {/* TODO: <AdminSidebar /> */}
      <div className="flex flex-1 flex-col">
        {/* TODO: <AdminNavbar /> */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
