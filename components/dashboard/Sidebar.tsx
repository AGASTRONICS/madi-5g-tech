"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_GROUPS } from "./nav-items";

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onToggleCollapse: () => void;
  onClose: () => void;
}

export function Sidebar({
  isCollapsed,
  isMobileOpen,
  onToggleCollapse,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          // Base
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-card border-r border-border",
          "transition-all duration-300 ease-in-out",
          // Mobile: slide in/out
          "lg:relative lg:translate-x-0 lg:z-auto",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop width: expanded vs collapsed
          isCollapsed ? "lg:w-[72px]" : "lg:w-64",
          // Mobile is always full-width drawer
          "w-72",
        )}
      >
        {/* ── Header ── */}
        <div
          className={cn(
            "flex h-16 shrink-0 items-center border-b border-border px-4",
            isCollapsed ? "lg:justify-center lg:px-0" : "justify-between",
          )}
        >
          {/* Logo */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 min-w-0"
            onClick={onClose}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-sm shadow-blue-500/20">
              <Zap className="h-4 w-4 text-white" />
            </span>
            <span
              className={cn(
                "text-[15px] font-bold tracking-tight truncate transition-all duration-300",
                isCollapsed && "lg:hidden",
              )}
            >
              Madi 5G Tech
            </span>
          </Link>

          {/* Mobile close */}
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Nav ── */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {NAV_GROUPS.map((group, gi) => (
            <div key={gi} className="space-y-0.5">
              {/* Group label */}
              {group.label && !isCollapsed && (
                <p className="px-3 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                  {group.label}
                </p>
              )}
              {/* Group label separator when collapsed */}
              {group.label && isCollapsed && (
                <div className="hidden lg:block my-2 mx-3 h-px bg-border" />
              )}

              {group.items.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    title={isCollapsed ? label : undefined}
                    onClick={onClose}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-colors",
                      isCollapsed
                        ? "lg:justify-center lg:px-0 lg:w-10 lg:mx-auto px-3"
                        : "px-3",
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {/* Active left bar */}
                    {isActive && !isCollapsed && (
                      <span className="absolute left-0 inset-y-1.5 w-[3px] rounded-full bg-blue-600 dark:bg-blue-400" />
                    )}

                    <Icon
                      className={cn(
                        "shrink-0",
                        isCollapsed ? "h-[18px] w-[18px]" : "h-4 w-4",
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                    />

                    <span
                      className={cn(
                        "truncate transition-all duration-300",
                        isCollapsed && "lg:hidden",
                      )}
                    >
                      {label}
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* ── Collapse toggle (desktop only) ── */}
        <div className="shrink-0 border-t border-border p-3">
          <button
            onClick={onToggleCollapse}
            className={cn(
              "hidden lg:flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
              isCollapsed && "lg:justify-center lg:px-0 lg:w-10 lg:mx-auto",
            )}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 shrink-0" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 shrink-0" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
