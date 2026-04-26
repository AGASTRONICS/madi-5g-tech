// components/landing/PricingSection.tsx
// Server Component
import Link from "next/link";
import { Check } from "lucide-react";

interface PricingPlan {
  size: string;
  price: string;
  validity: string;
  popular: boolean;
  features: string[];
}

const plans: PricingPlan[] = [
  {
    size: "500MB",
    price: "₦150",
    validity: "Valid 1 day",
    popular: false,
    features: ["All networks", "Instant activation", "No expiry extension"],
  },
  {
    size: "1GB",
    price: "₦300",
    validity: "Valid 30 days",
    popular: true,
    features: ["All networks", "Instant activation", "30-day validity"],
  },
  {
    size: "10GB",
    price: "₦2,500",
    validity: "Valid 30 days",
    popular: false,
    features: ["All networks", "Instant activation", "30-day validity"],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Transparent pricing, always
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground text-lg">
            Sample data bundle prices. We guarantee the best rates with no hidden fees.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {plans.map((plan) => (
            <div
              key={plan.size}
              className={`relative rounded-2xl border p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col ${
                plan.popular
                  ? "border-blue-500 bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-blue-500/30"
                  : "border-border bg-card"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-amber-400 px-4 py-1 text-xs font-bold text-amber-900 shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan size */}
              <div className="mb-2">
                <span
                  className={`text-4xl font-extrabold ${
                    plan.popular ? "text-white" : "text-foreground"
                  }`}
                >
                  {plan.size}
                </span>
              </div>

              {/* Price */}
              <div className="mb-1">
                <span
                  className={`text-3xl font-bold ${
                    plan.popular ? "text-white" : "text-foreground"
                  }`}
                >
                  {plan.price}
                </span>
              </div>

              {/* Validity */}
              <p
                className={`text-sm mb-6 ${
                  plan.popular ? "text-blue-100" : "text-muted-foreground"
                }`}
              >
                {plan.validity}
              </p>

              {/* Feature list */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        plan.popular
                          ? "bg-white/20"
                          : "bg-blue-100 dark:bg-blue-900/50"
                      }`}
                    >
                      <Check
                        className={`h-3 w-3 ${
                          plan.popular
                            ? "text-white"
                            : "text-blue-600 dark:text-blue-400"
                        }`}
                      />
                    </span>
                    <span
                      className={`text-sm ${
                        plan.popular ? "text-blue-50" : "text-muted-foreground"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/register"
                className={`inline-flex h-10 w-full items-center justify-center rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  plan.popular
                    ? "bg-white text-blue-700 hover:bg-blue-50 focus-visible:ring-white"
                    : "border border-border bg-background hover:bg-muted focus-visible:ring-ring"
                }`}
              >
                Get started
              </Link>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Airtime top-ups: <span className="font-semibold text-foreground">0% surcharge</span>. Cable subscriptions: at{" "}
            <span className="font-semibold text-foreground">official rates</span>.
          </p>
          <p className="text-sm text-muted-foreground">
            Prices shown are sample rates.{" "}
            <Link
              href="/register"
              className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              See all plans after signing up &rarr;
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
