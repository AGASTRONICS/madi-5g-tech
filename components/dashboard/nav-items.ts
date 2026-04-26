import {
  LayoutDashboard,
  Phone,
  Wifi,
  Tv,
  Receipt,
  History,
  CreditCard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface NavGroup {
  label: string | null;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: null,
    items: [{ href: "/dashboard", label: "Overview", icon: LayoutDashboard }],
  },
  {
    label: "Services",
    items: [
      { href: "/airtime", label: "Airtime", icon: Phone },
      { href: "/data", label: "Data Bundles", icon: Wifi },
      { href: "/cable", label: "Cable TV", icon: Tv },
      { href: "/bills", label: "Pay Bills", icon: Receipt },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/transactions", label: "Transactions", icon: History },
      { href: "/sim-management", label: "SIM Cards", icon: CreditCard },
    ],
  },
];

export const ALL_NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);
