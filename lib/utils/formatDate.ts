/**
 * Formats an ISO date string to a localised Nigerian date/time.
 *
 * @param iso - ISO 8601 date string, e.g. "2024-06-15T10:30:00Z"
 * @returns e.g. "Jun 15, 2024, 11:30 AM"
 */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(iso));
}

/**
 * Short date only — used in table cells.
 * e.g. "15 Jun 2024"
 */
export function formatDateShort(iso: string): string {
  return new Intl.DateTimeFormat("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

/**
 * Returns a relative time string using Intl.RelativeTimeFormat.
 * e.g. "3 days ago", "in 2 hours"
 */
export function formatRelativeTime(iso: string): string {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const diffMs = new Date(iso).getTime() - Date.now();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHrs = Math.round(diffMin / 60);
  const diffDays = Math.round(diffHrs / 24);

  if (Math.abs(diffSec) < 60) return rtf.format(diffSec, "second");
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, "minute");
  if (Math.abs(diffHrs) < 24) return rtf.format(diffHrs, "hour");
  return rtf.format(diffDays, "day");
}
