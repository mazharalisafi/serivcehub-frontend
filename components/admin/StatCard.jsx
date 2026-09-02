export function StatCard({ label, value, hint, tone = "default" }) {
  const toneStyles = {
    default: "border-border bg-surface",
    brand: "border-brand-200 bg-brand-50",
    warn: "border-accent-200 bg-accent-50",
    danger: "border-danger/30 bg-danger/5",
  };

  return (
    <div className={`rounded-[--radius-lg] border p-4 ${toneStyles[tone] || toneStyles.default}`}>
      <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-ink">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-ink-faint">{hint}</p>}
    </div>
  );
}