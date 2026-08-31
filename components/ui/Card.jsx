import { cn } from "@/lib/utils";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-[--radius-lg] border-2 border-brand-100 bg-surface shadow-[0_4px_20px_-4px_rgba(11,110,130,0.12)]",
        "transition-all duration-200 hover:border-brand-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-5", className)} {...props} />;
}