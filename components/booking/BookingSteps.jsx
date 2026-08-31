import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Service", "Details", "Location", "Date & Time", "Contact"];

export function BookingSteps({ current }) {
  return (
    <div className="mx-auto mb-10 flex max-w-2xl items-center">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const done = stepNum < current;
        const active = stepNum === current;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors",
                  done && "border-brand-600 bg-brand-600 text-white",
                  active && "border-brand-600 bg-surface text-brand-600",
                  !done && !active && "border-border-strong bg-surface text-ink-faint"
                )}
              >
                {done ? <Check className="size-4" /> : stepNum}
              </div>
              <span
                className={cn(
                  "hidden text-[11px] font-medium sm:block",
                  active ? "text-brand-700" : "text-ink-faint"
                )}
              >
                {label}
              </span>
            </div>
            {stepNum < STEPS.length && (
              <div className={cn("mx-2 h-0.5 flex-1", done ? "bg-brand-600" : "bg-border")} />
            )}
          </div>
        );
      })}
    </div>
  );
}