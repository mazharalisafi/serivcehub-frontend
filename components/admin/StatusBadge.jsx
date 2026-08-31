import { cn } from "@/lib/utils";

const STYLES = {
  "Pending": "bg-accent-100 text-accent-600",
  "Needs Info": "bg-accent-200 text-ink",
  "Confirmed": "bg-brand-100 text-brand-700",
  "In Progress": "bg-brand-500/15 text-brand-600",
  "Completed": "bg-success/15 text-success",
  "Cancelled": "bg-border text-ink-muted",
  "Declined": "bg-danger/15 text-danger-strong",
  "No-show": "bg-ink text-white",
};

export function StatusBadge({ status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
        STYLES[status] || "bg-border text-ink-muted"
      )}
    >
      {status}
    </span>
  );
}