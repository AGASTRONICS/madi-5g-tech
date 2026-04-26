// components/landing/ServicesSection.tsx
// Server Component
import { Phone, Wifi, Tv, Zap } from "lucide-react";

interface ServiceCard {
  icon: React.ElementType;
  title: string;
  description: string;
  badges: string[];
  gradient: string;
  iconBg: string;
  iconColor: string;
}

const services: ServiceCard[] = [
  {
    icon: Phone,
    title: "Airtime",
    description: "All networks. Instant delivery. Top up any Nigerian number in seconds with zero fees.",
    badges: ["MTN", "Airtel", "Glo", "9mobile"],
    gradient: "from-blue-500/10 to-blue-600/5",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Wifi,
    title: "Data Bundles",
    description: "Cheapest data bundles guaranteed. All sizes, all networks, instant activation.",
    badges: ["1GB", "2GB", "5GB", "10GB"],
    gradient: "from-indigo-500/10 to-indigo-600/5",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: Tv,
    title: "Cable TV",
    description: "DSTV, GOtv, StarTimes subscriptions. Monthly, quarterly & annual packages.",
    badges: ["DSTV", "GOtv", "StarTimes"],
    gradient: "from-purple-500/10 to-purple-600/5",
    iconBg: "bg-purple-100 dark:bg-purple-900/50",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: Zap,
    title: "Electricity Bills",
    description: "Electricity tokens instantly to your meter. Prepaid meters across all DISCOs.",
    badges: ["Prepaid", "All DISCOs", "Instant"],
    gradient: "from-amber-500/10 to-amber-600/5",
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
            Our Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything you need, in one place
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground text-lg">
            Four essential services. One platform. Powered by 5G speed so you
            never miss a beat.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group relative rounded-2xl border border-border bg-gradient-to-br ${service.gradient} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md cursor-default overflow-hidden`}
              >
                {/* Subtle corner accent */}
                <div
                  aria-hidden="true"
                  className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white/30 dark:bg-white/5 blur-2xl"
                />

                {/* Icon */}
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${service.iconBg} ${service.iconColor} mb-5`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Network/provider badges */}
                <div className="flex flex-wrap gap-1.5">
                  {service.badges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center rounded-full border border-border bg-background/80 px-2.5 py-0.5 text-xs font-medium text-foreground"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
