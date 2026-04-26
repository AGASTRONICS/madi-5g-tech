"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Menu,
  Sun,
  Moon,
  Bell,
  LogOut,
  ChevronDown,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/useAuth";
import { ALL_NAV_ITEMS } from "./nav-items";

interface TopbarProps {
  onMenuToggle: () => void;
}

function getInitials(sub: string): string {
  const local = sub.split("@")[0] ?? sub;
  return local.slice(0, 2).toUpperCase();
}

function getPageTitle(pathname: string): string {
  const item = ALL_NAV_ITEMS.find((n) => n.href === pathname);
  return item?.label ?? "Dashboard";
}

export function Topbar({ onMenuToggle }: TopbarProps) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Close dropdown on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const title = getPageTitle(pathname);
  const initials = user ? getInitials(user.sub) : "??";
  const isAdmin = user?.is_admin ?? false;

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border bg-card/95 backdrop-blur-sm px-4 sm:px-6">
      {/* ── Left side ── */}
      <div className="flex items-center gap-4">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Page title */}
        <div>
          <h1 className="text-[15px] font-semibold text-foreground leading-none">
            {title}
          </h1>
        </div>
      </div>

      {/* ── Right side ── */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Theme toggle */}
        {mounted && (
          <button
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        )}

        {/* Notifications */}
        <button
          className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span
            aria-hidden
            className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500"
          />
        </button>

        {/* Divider */}
        <div className="mx-1 h-5 w-px bg-border hidden sm:block" />

        {/* User dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-muted transition-colors"
            aria-haspopup="true"
            aria-expanded={menuOpen}
          >
            {/* Avatar */}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-[11px] font-bold text-white">
              {initials}
            </span>
            {/* Email — hidden on small screens */}
            <span className="hidden sm:block text-sm font-medium text-foreground max-w-[140px] truncate">
              {user?.sub ?? "…"}
            </span>
            <ChevronDown
              className={cn(
                "hidden sm:block h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
                menuOpen && "rotate-180",
              )}
            />
          </button>

          {/* Dropdown panel */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-card shadow-lg shadow-black/5 ring-1 ring-border/50">
              {/* User info */}
              <div className="border-b border-border px-4 py-3">
                <p className="text-sm font-semibold text-foreground truncate">
                  {user?.sub ?? "User"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isAdmin ? "Administrator" : "Standard account"}
                </p>
              </div>

              {/* Actions */}
              <div className="p-1.5 space-y-0.5">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  Account settings
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
