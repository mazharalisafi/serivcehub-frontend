import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines Tailwind classes safely — merges conditional classes (clsx)
// and resolves conflicting Tailwind utilities (tailwind-merge).
// Example: cn("px-2", condition && "px-4") => "px-4" (not both)
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}