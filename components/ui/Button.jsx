"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border font-medium transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100 whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "border-brand-700 bg-brand-600 text-white hover:bg-brand-700",
        accent: "border-accent-600 bg-accent-500 text-ink hover:bg-accent-600",
        outline: "border-border-strong bg-surface text-ink hover:bg-canvas",
        ghost: "border-transparent text-ink-muted hover:border-border hover:bg-canvas hover:text-ink",
      },
      size: {
        sm: "h-8 px-4 text-sm",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export const Button = forwardRef(function Button(
  { className, variant, size, loading, disabled, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(buttonStyles({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </button>
  );
});