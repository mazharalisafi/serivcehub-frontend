"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageBackground } from "@/components/layout/PageBackground";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/serviceQuestions";
import { saveDraft } from "@/lib/bookingDraft";

export default function BookingPage() {
  return (
    <Suspense fallback={null}>
      <BookingPageInner />
    </Suspense>
  );
}

function BookingPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fromUrl = searchParams.get("service");
    if (fromUrl && SERVICES.some((s) => s.id === fromUrl)) setSelected(fromUrl);
  }, [searchParams]);

  function handleContinue() {
    saveDraft({ service: selected, answers: {}, jobDetails: "" });
    router.push("/booking/details");
  }

  return (
    <section className="relative overflow-hidden bg-brand-50/50">
      <PageBackground />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <BookingSteps current={1} />

        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700">
            Book a Service
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            What do you need help with?
          </h1>
          <p className="mt-3 text-sm text-ink-muted">
            Pick a service to get started - pricing shown up front.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {SERVICES.map((s, i) => {
            const isSelected = selected === s.id;
            return (
              <div key={s.id} className="animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <button
                  type="button"
                  onClick={() => setSelected(s.id)}
                  className={cn(
                    "group relative w-full overflow-hidden rounded-[--radius-lg] border-2 bg-surface text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
                    isSelected ? "border-brand-600 shadow-md" : "border-brand-100 hover:border-brand-300"
                  )}
                >
                  {isSelected && (
                    <span className="absolute right-3 top-3 z-10 flex size-5 items-center justify-center rounded-full bg-brand-600">
                      <Check className="size-3 text-white" />
                    </span>
                  )}
                  <img
                    src={s.image}
                    alt={s.label}
                    className="h-28 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="p-4 text-center">
                    <p className="font-display text-base font-semibold text-ink">{s.label}</p>
                    <p className="text-xs text-ink-muted">{s.price}</p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Button size="lg" disabled={!selected} onClick={handleContinue}>
            Continue <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}