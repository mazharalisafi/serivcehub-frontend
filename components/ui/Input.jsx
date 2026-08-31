"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

// useId() generates a unique id for each Input on the page — this links
// the <label> to the <input> properly (important for accessibility,
// and so clicking the label focuses the field).
export const Input = forwardRef(function Input(
  { className, label, hint, error, id, ...props },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
          {props.required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "h-10 w-full rounded-[--radius-md] border bg-surface px-3 text-sm text-ink placeholder:text-ink-faint transition-colors",
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