// components/landing/Footer.tsx
// Server Component — 3-column footer with social icons
import Link from "next/link";
import { Zap, Globe, MessageCircle, Share2 } from "lucide-react";

const quickLinks = [
  { label: "Features", href: "/#features" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Sign In", href: "/login" },
  { label: "Register", href: "/register" },
];

const supportLinks = [
  { label: "Contact Us", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const socialLinks = [
  { label: "X (Twitter)", icon: Globe, href: "#" },
  { label: "Instagram", icon: MessageCircle, href: "#" },
  { label: "Facebook", icon: Share2, href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 py-14">
          {/* Column 1 — Brand */}
          <div>
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                <Zap className="h-4 w-4 text-white" />
              </span>
              <span className="text-lg font-bold text-foreground">
                Madi 5G Tech
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              Nigeria&apos;s fastest VTU platform. Airtime, data, cable TV, and
              electricity payments — instant, secure, transparent.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors hover:bg-blue-100 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-5">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border py-6 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Madi 5G Tech. All rights reserved.</p>
          <p className="text-xs">
            Built with care for Nigerian users everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
