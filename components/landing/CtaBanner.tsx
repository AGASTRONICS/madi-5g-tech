// components/landing/CtaBanner.tsx
// Server Component — full-width gradient CTA section
import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-8 py-16 md:py-20 text-center shadow-2xl shadow-blue-500/20">
          {/* Decorative blobs inside banner */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl"
          />

          <div className="relative">
            {/* Eyebrow */}
            <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white mb-6">
              No credit card required
            </span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Ready to get started?
            </h2>

            {/* Sub-text */}
            <p className="mx-auto max-w-xl text-lg text-blue-100 mb-10">
              Join thousands of Nigerians who trust Madi 5G Tech for their
              daily airtime, data, cable TV and electricity payments.
            </p>

            {/* CTA button */}
            <Link
              href="/register"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-white px-10 text-base font-bold text-blue-700 shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-50 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 active:translate-y-0"
            >
              Create free account &rarr;
            </Link>

            {/* Reassurance note */}
            <p className="mt-5 text-sm text-blue-200">
              Free to join. Transactions charged at best market rates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
