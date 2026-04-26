// components/landing/StatsBar.tsx
// Server Component — full-width dark/primary stat band
const stats = [
  { value: "10,000+", label: "Active Users" },
  { value: "₦50M+", label: "Processed" },
  { value: "99.9%", label: "Uptime" },
  { value: "4", label: "Networks" },
];

export function StatsBar() {
  return (
    <section
      aria-label="Platform statistics"
      className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y divide-blue-500/40 lg:divide-y-0 lg:divide-x lg:divide-blue-500/40">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center py-8 px-6 text-center ${
                // On mobile: add top border for rows 3 and 4 (index 2, 3) for the 2×2 layout
                index < 2 ? "lg:border-t-0" : ""
              }`}
            >
              <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-blue-200 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
