"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  Wallet,
  TrendingDown,
  CalendarDays,
  ArrowRightLeft,
  Phone,
  Wifi,
  Tv,
  Receipt,
  ArrowRight,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getDashboard } from "@/lib/api/user";
import type { RecentTransaction } from "@/types/user.types";

// ── Helpers ──────────────────────────────────────────────────────────

function fmt(n: number): string {
  return `₦${n.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(dateStr).toLocaleDateString("en-NG", {
    month: "short",
    day: "numeric",
  });
}

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// ── Sub-components ───────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-xl bg-muted", className)} />
  );
}

function StatusBadge({ status }: { status: RecentTransaction["status"] }) {
  const map = {
    success: {
      icon: CheckCircle2,
      label: "Success",
      cls: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    pending: {
      icon: Clock,
      label: "Pending",
      cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    },
    failed: {
      icon: XCircle,
      label: "Failed",
      cls: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    },
  };
  const { icon: Icon, label, cls } = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        cls,
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

const SERVICE_META: Record<
  string,
  { icon: React.ElementType; color: string; bg: string }
> = {
  airtime: {
    icon: Phone,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
  },
  data: {
    icon: Wifi,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/40",
  },
  cable: {
    icon: Tv,
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/40",
  },
  bill: {
    icon: Receipt,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40",
  },
};

function ServiceIcon({ service }: { service: string }) {
  const meta = SERVICE_META[service] ?? SERVICE_META.bill;
  const Icon = meta.icon;
  return (
    <span
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
        meta.bg,
      )}
    >
      <Icon className={cn("h-4 w-4", meta.color)} />
    </span>
  );
}

// ── Loading skeleton ─────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-24 w-full" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────

export function DashboardOverview() {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
    staleTime: 60_000,
  });

  if (isLoading) return <DashboardSkeleton />;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/30">
          <XCircle className="h-7 w-7 text-red-500" />
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-foreground">Failed to load dashboard</p>
          <p className="text-sm text-muted-foreground">
            Check your connection and try again.
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <RefreshCcw className="h-4 w-4" />
          Retry
        </button>
      </div>
    );
  }

  const recent_transactions = data!.recent_txn ?? [];
  const email = data!.email;
  const firstName = email.split("@")[0] ?? "User";

  return (
    <div className="space-y-6 max-w-6xl">
      {/* ── Welcome banner ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 text-white shadow-lg shadow-blue-500/20">
        {/* Decorative blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/10 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 left-1/3 h-32 w-32 rounded-full bg-indigo-400/20 blur-2xl"
        />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <p className="text-blue-100 text-sm font-medium">
              {greeting()},
            </p>
            <h2 className="text-2xl font-bold tracking-tight">{firstName} 👋</h2>
            <p className="text-blue-100/80 text-sm">
              Your account is{" "}
              <span
                className={cn(
                  "font-semibold",
                  data?.is_active ? "text-green-300" : "text-red-300",
                )}
              >
                {data?.is_active ? "active" : "suspended"}
              </span>{" "}
              — all services available.
            </p>
          </div>

          {/* Wallet snapshot */}
          <div className="sm:text-right space-y-0.5">
            <p className="text-xs text-blue-200 font-medium uppercase tracking-wider">
              Wallet balance
            </p>
            <p className="text-3xl font-bold tabular-nums">
              {fmt(data!.balance)}
            </p>
            {isFetching && (
              <p className="text-xs text-blue-200">Refreshing…</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Stats cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Wallet Balance",
            value: fmt(data!.balance),
            sub: "Available funds",
            icon: Wallet,
            iconBg: "bg-blue-50 dark:bg-blue-950/40",
            iconColor: "text-blue-600 dark:text-blue-400",
          },
          {
            label: "Bonus",
            value: fmt(data!.bonus),
            sub: "Promotional credit",
            icon: TrendingDown,
            iconBg: "bg-red-50 dark:bg-red-950/40",
            iconColor: "text-red-500 dark:text-red-400",
          },
          {
            label: "Today's Success",
            value: data!.total_success_today.toLocaleString(),
            sub: "Successful transactions",
            icon: CalendarDays,
            iconBg: "bg-purple-50 dark:bg-purple-950/40",
            iconColor: "text-purple-600 dark:text-purple-400",
          },
          {
            label: "Today's Total",
            value: (data!.total_success_today + data!.total_failed_today + data!.total_pending_today).toLocaleString(),
            sub: "All transactions",
            icon: ArrowRightLeft,
            iconBg: "bg-green-50 dark:bg-green-950/40",
            iconColor: "text-green-600 dark:text-green-400",
          },
        ].map(({ label, value, sub, icon: Icon, iconBg, iconColor }) => (
          <div
            key={label}
            className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {label}
              </p>
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-xl",
                  iconBg,
                )}
              >
                <Icon className={cn("h-4 w-4", iconColor)} />
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground tabular-nums leading-none">
              {value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Quick Actions ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">
            Quick Actions
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              href: "/airtime",
              label: "Buy Airtime",
              desc: "All networks",
              icon: Phone,
              iconBg: "bg-blue-50 dark:bg-blue-950/40",
              iconColor: "text-blue-600 dark:text-blue-400",
              border: "hover:border-blue-200 dark:hover:border-blue-800",
            },
            {
              href: "/data",
              label: "Buy Data",
              desc: "All plans",
              icon: Wifi,
              iconBg: "bg-purple-50 dark:bg-purple-950/40",
              iconColor: "text-purple-600 dark:text-purple-400",
              border: "hover:border-purple-200 dark:hover:border-purple-800",
            },
            {
              href: "/cable",
              label: "Cable TV",
              desc: "DSTV, GOtv…",
              icon: Tv,
              iconBg: "bg-rose-50 dark:bg-rose-950/40",
              iconColor: "text-rose-600 dark:text-rose-400",
              border: "hover:border-rose-200 dark:hover:border-rose-800",
            },
            {
              href: "/bills",
              label: "Pay Bills",
              desc: "Electricity…",
              icon: Receipt,
              iconBg: "bg-amber-50 dark:bg-amber-950/40",
              iconColor: "text-amber-600 dark:text-amber-400",
              border: "hover:border-amber-200 dark:hover:border-amber-800",
            },
          ].map(({ href, label, desc, icon: Icon, iconBg, iconColor, border }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm",
                "hover:-translate-y-0.5 hover:shadow-md transition-all duration-200",
                border,
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  iconBg,
                )}
              >
                <Icon className={cn("h-5 w-5", iconColor)} />
              </span>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Recent Transactions ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">
            Recent Activity
          </h3>
          <Link
            href="/transactions"
            className="text-xs font-medium text-primary hover:underline underline-offset-4 transition-colors"
          >
            View all
          </Link>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          {recent_transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                <ArrowRightLeft className="h-6 w-6 text-muted-foreground/50" />
              </span>
              <p className="text-sm font-medium text-muted-foreground">
                No transactions yet
              </p>
              <p className="text-xs text-muted-foreground/70">
                Your recent activity will appear here.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {recent_transactions.map((tx) => (
                <li
                  key={tx.id}
                  className="flex items-center gap-3 px-4 py-3.5 sm:px-5 hover:bg-muted/40 transition-colors"
                >
                  <ServiceIcon service={tx.service} />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {tx.description}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize mt-0.5">
                      {tx.service} · {timeAgo(tx.created_at)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <p
                      className={cn(
                        "text-sm font-semibold tabular-nums",
                        tx.status === "failed"
                          ? "text-muted-foreground line-through"
                          : "text-foreground",
                      )}
                    >
                      {fmt(tx.amount)}
                    </p>
                    <StatusBadge status={tx.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
