import { cn } from "@/lib/utils";

export function InfoCard({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <div className="flex size-12 items-center justify-center rounded-full bg-brand-50 transition-colors group-hover:bg-brand-600">
        <Icon className="size-5 text-brand-600 transition-colors group-hover:text-white" />
      </div>
      <p className="font-display text-sm font-semibold text-ink">{label}</p>
      <p className="text-sm text-ink-muted">{value}</p>
    </>
  );

  const classes = cn(
    "group flex flex-col items-center gap-2 rounded-[--radius-lg]",
    "border border-border bg-surface p-6 text-center transition-all duration-200"
  );

  if (href) {
    return (
      <a href={href} className={cn(classes, "hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg")}>
        {content}
      </a>
    );
  }

  return <div className={classes}>{content}</div>;
}