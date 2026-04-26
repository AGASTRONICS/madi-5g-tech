import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { AuthRehydrator } from "@/components/shared/AuthRehydrator";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default: "Madi 5G Tech — VTU Platform",
    template: "%s | Madi 5G Tech",
  },
  description: "Buy airtime, data, cable subscriptions and pay bills instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        geist.variable,
        fontMono.variable,
        "font-sans",
      )}
    >
      <body suppressHydrationWarning>
        <ThemeProvider>
          <QueryProvider>
            {/*
              AuthRehydrator is a tiny client component that calls
              rehydrateAuthStore() inside a useEffect, which triggers
              Zustand's persist middleware to hydrate from localStorage
              AFTER the initial render. This prevents SSR hydration mismatches
              that would occur if we hydrated synchronously on mount.
            */}
            <AuthRehydrator />
            {children}
            <Toaster
              position="top-right"
              richColors
              closeButton
              duration={4000}
            />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
