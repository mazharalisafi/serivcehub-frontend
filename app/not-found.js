import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageBackground } from "@/components/layout/PageBackground";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-6 py-16 bg-brand-50/50">
      <PageBackground />

      <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-[--radius-lg] border-2 border-brand-100 bg-surface p-10 text-center shadow-lg">
        <div className="flex size-14 items-center justify-center rounded-full bg-brand-50">
          <SearchX className="size-6 text-brand-600" />
        </div>
        <h1 className="font-display text-2xl font-bold text-ink">Page not found</h1>
        <p className="max-w-sm text-sm text-ink-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link href="/" className="mt-2">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </section>
  );
}