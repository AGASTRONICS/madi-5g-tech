// components/landing/FeaturesSection.tsx
// Server Component
import {
  Zap,
  ShieldCheck,
  Activity,
  BadgePercent,
  HeadphonesIcon,
  Network,
} from "lucide-react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  accent: string;
  iconBg: string;
}

const features: Feature[] = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Transactions complete in under 3 seconds — faster than any other VTU provider in Nigeria.",
    accent: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Security",
    description: "256-bit SSL encryption on every transaction. Your funds and data are always protected.",
    accent: "text-indigo-600 dark:text-indigo-400",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
  },
  {
    icon: Activity,
    title: "99.9% Uptime",
    description: "Our infrastructure runs on a redundant multi-cloud stack with a verified 99.9% uptime SLA.",
    accent: "text-green-600 dark:text-green-400",
    iconBg: "bg-green-100 dark:bg-green-900/50",
  },
  {
    icon: BadgePercent,
    title: "Best Rates Guaranteed",
    description: "We source plans directly from providers. No hidden fees, no surcharges — ever.",
    accent: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-100 dark:bg-purple-900/50",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Real humans available round the clock via chat and email. Average response: under 5 minutes.",
    accent: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
  },
  {
    icon: Network,
    title: "All Major Networks",
    description: "MTN, Airtel, Glo, 9mobile — all four major Nigerian networks supported on one platform.",
    accent: "text-rose-600 dark:text-rose-400",
    iconBg: "bg-rose-100 dark:bg-rose-900/50",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
            Why us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why thousands choose Madi 5G Tech
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground text-lg">
            We built the platform we wished existed — fast, reliable, and
            completely transparent.
          </p>
        </div>

        {/* Features grid — 3 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                {/* Icon column */}
                <div className="shrink-0">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${feature.iconBg} ${feature.accent}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Text column */}
                <div>
                  <h3 className="text-base font-bold text-foreground mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
