"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef(function Textarea(
  { className, label, hint, error, id, rows = 4, ...props },
  ref
) {
  const autoId = useId();
  const areaId = id ?? autoId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={areaId} className="text-sm font-medium text-ink">
          {label}
          {props.required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={areaId}
        rows={rows}
        className={cn(
          "w-full rounded-[--radius-md] border bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-faint transition-colors resize-y",
          "border-border-strong focus:border-brand-500",
          error && "border-danger focus:border-danger",
          className
        )}
        {...props}
      />
      {error ? (
        <p className="text-xs text-danger-strong">{error}</p>
      ) : hint ? (
        <p className="text-xs text-ink-muted">{hint}</p>
      ) : null}
    </div>
  );
});