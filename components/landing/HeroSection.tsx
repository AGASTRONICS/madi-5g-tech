// components/landing/HeroSection.tsx
// Server Component — no client interactivity needed here.
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Clock,
  Users,
} from "lucide-react";

const trustBadges = [
  { icon: Users, label: "10,000+ users" },
  { icon: Zap, label: "99.9% uptime" },
  { icon: Clock, label: "24/7 support" },
  { icon: ShieldCheck, label: "Instant delivery" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
      {/* Background gradient layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-purple-950/30"
      />

      {/* Decorative circles — pure Tailwind, no images */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl dark:from-blue-500/10 dark:to-purple-500/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 blur-3xl dark:from-indigo-500/10 dark:to-blue-500/10"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Announcement pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 mb-8 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
          </span>
          Now supporting all 4 major Nigerian networks
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
          Nigeria&apos;s{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Fastest VTU
          </span>
          <br />
          Platform
        </h1>

        {/* Sub-headline */}
        <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10">
          Instant airtime, data, cable TV &amp; electricity payments &mdash;
          powered by 5G speed. Transactions complete in under 3 seconds.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/register"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/40 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:translate-y-0 w-full sm:w-auto"
          >
            Start for free
          </Link>
          <Link
            href="/login"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-8 text-base font-semibold text-foreground shadow-sm transition-all hover:bg-muted hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-0 w-full sm:w-auto"
          >
            Sign in
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                <Icon className="h-3.5 w-3.5" />
              </span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
