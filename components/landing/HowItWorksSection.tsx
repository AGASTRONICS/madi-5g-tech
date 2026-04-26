// components/landing/HowItWorksSection.tsx
// Server Component
import { UserPlus, Wallet, CheckCircle } from "lucide-react";

interface Step {
  step: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    step: 1,
    icon: UserPlus,
    title: "Create Account",
    description:
      "Sign up in under 60 seconds. No paperwork, no ID upload — just your email and a password.",
  },
  {
    step: 2,
    icon: Wallet,
    title: "Fund Your Wallet",
    description:
      "Add money to your wallet via bank transfer or card. Funds reflect instantly.",
  },
  {
    step: 3,
    icon: CheckCircle,
    title: "Buy & Pay Instantly",
    description:
      "Select a service, enter the details, and confirm. Your transaction completes in under 3 seconds.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
            Getting started
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Get started in 3 simple steps
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground text-lg">
            From zero to buying airtime in under two minutes.
          </p>
        </div>

        {/* Steps — horizontal on desktop with connector lines, stacked on mobile */}
        <div className="relative">
          {/* Desktop connector line — hidden on mobile */}
          <div
            aria-hidden="true"
            className="absolute top-10 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] hidden lg:block"
          >
            <div className="h-0.5 w-full bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200 dark:from-blue-900 dark:via-indigo-800 dark:to-purple-900" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 relative">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="flex flex-col items-center text-center px-4"
                >
                  {/* Step number + icon circle */}
                  <div className="relative mb-6">
                    {/* Outer ring */}
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    {/* Step number badge */}
                    <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white border-2 border-blue-600 text-xs font-bold text-blue-600 dark:bg-background">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
