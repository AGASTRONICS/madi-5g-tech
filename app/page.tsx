// app/page.tsx
// Public landing/home page — Server Component.
// Accessible to all visitors; auth'd users who want the dashboard navigate
// there via the nav after login. Middleware only redirects on /dashboard.
import type { Metadata } from "next";

import { LandingNav } from "@/components/layout/LandingNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { StatsBar } from "@/components/landing/StatsBar";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Nigeria's Fastest VTU Platform | Madi 5G Tech",
  description:
    "Buy airtime, data bundles, cable TV subscriptions, and pay electricity bills instantly. Powered by 5G speed. Join 10,000+ Nigerians.",
  openGraph: {
    title: "Madi 5G Tech — Nigeria's Fastest VTU Platform",
    description:
      "Instant airtime, data, cable TV & electricity payments — powered by 5G speed.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Sticky navigation — client component for scroll/mobile interactivity */}
      <LandingNav />

      <main>
        {/* 1. Hero — headline, CTA, trust badges */}
        <HeroSection />

        {/* 2. Services — airtime, data, cable, bills */}
        <ServicesSection />

        {/* 3. Features — why choose us, 6-grid */}
        <FeaturesSection />

        {/* 4. How it works — 3-step flow */}
        <HowItWorksSection />

        {/* 5. Pricing — sample data plan cards */}
        <PricingSection />

        {/* 6. Social proof stats bar */}
        <StatsBar />

        {/* 7. Final CTA banner */}
        <CtaBanner />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
