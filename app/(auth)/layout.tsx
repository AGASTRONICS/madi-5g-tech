// app/(auth)/layout.tsx — Server Component
import type { Metadata } from "next";
import { Zap, ShieldCheck, Clock, Smartphone, Bolt } from "lucide-react";

export const metadata: Metadata = {
  title: {
    default: "Madi 5G Tech",
    template: "%s | Madi 5G Tech",
  },
};

const features = [
  { icon: Bolt, text: "Instant airtime & data top-ups" },
  { icon: ShieldCheck, text: "Bank-grade secure transactions" },
  { icon: Clock, text: "24/7 support — always available" },
  { icon: Smartphone, text: "All 4 major Nigerian networks" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh">
      {/* ── Branded left panel (desktop only) ── */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative overflow-hidden flex-col justify-between bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 p-12 text-white">
        {/* Decorative blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-48 -left-32 h-[420px] w-[420px] rounded-full bg-indigo-400/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-2xl"
        />

        {/* Dot-grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Madi 5G Tech</span>
        </div>

        {/* Main copy */}
        <div className="relative space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-medium text-blue-100 ring-1 ring-white/20 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
              </span>
              Live — All systems operational
            </div>

            <h2 className="text-3xl xl:text-[2.6rem] font-bold leading-tight tracking-tight">
              Nigeria&apos;s fastest<br />VTU platform
            </h2>
            <p className="text-blue-100/90 text-base leading-relaxed max-w-sm">
              Top up airtime, buy data, pay cable TV and electricity bills — powered by 5G speed. Every transaction under 3&nbsp;seconds.
            </p>
          </div>

          <ul className="space-y-3.5">
            {features.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-3 text-sm text-blue-50/90"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/10">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Stats footer */}
        <div className="relative grid grid-cols-3 gap-4 border-t border-white/20 pt-8">
          {[
            { value: "10K+", label: "Active users" },
            { value: "99.9%", label: "Uptime" },
            { value: "<3s", label: "Per transaction" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-blue-200/80 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Form panel ── */}
      <div className="flex w-full lg:w-[48%] xl:w-[45%] flex-col items-center justify-center min-h-svh px-6 py-12 sm:px-10 bg-background">
        {children}
      </div>
    </div>
  );
}
