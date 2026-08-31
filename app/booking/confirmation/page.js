"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageBackground } from "@/components/layout/PageBackground";
import { SERVICES } from "@/lib/serviceQuestions";
import { getDraft, clearDraft } from "@/lib/bookingDraft";

export default function BookingConfirmationPage() {
  const router = useRouter();
  const [draft, setDraft] = useState(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const d = getDraft();
    if (!d.service || !d.date || !d.phone) {
      router.replace("/booking");
      return;
    }
    setDraft(d);
    clearDraft();
  }, [router]);

  if (!draft) return null;

  const service = SERVICES.find((s) => s.id === draft.service);

  return (
    <section className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-6 py-16 bg-brand-50/50">
      <PageBackground />

      <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-[--radius-lg] border border-brand-100 bg-brand-50 p-10 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-brand-600">
          <PartyPopper className="size-6 text-white" />
        </div>
        <h1 className="font-display text-xl font-bold text-ink">Booking request sent!</h1>
        <p className="max-w-sm text-sm text-ink-muted">
          We&apos;ve received your {service?.label.toLowerCase()} booking for {draft.date} at {draft.time}.
          A confirmation will be sent via SMS shortly.
        </p>
        <Link href="/" className="mt-2">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </section>
  );
}