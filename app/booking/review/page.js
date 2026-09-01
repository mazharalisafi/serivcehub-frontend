"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Wrench, MapPin, CalendarDays, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageBackground } from "@/components/layout/PageBackground";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { SERVICES, SERVICE_QUESTIONS } from "@/lib/serviceQuestions";
import { getDraft, saveDraft } from "@/lib/bookingDraft";

function generateReference() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `BK-${num}`;
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 text-sm">
      <span className="text-ink-muted">{label}</span>
      <span className="text-right font-medium text-ink">{value}</span>
    </div>
  );
}

export default function BookingReviewPage() {
  const router = useRouter();
  const [draft, setDraft] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const d = getDraft();
    if (!d.service || !d.date || !d.phone) {
      router.replace("/booking");
      return;
    }
    setDraft(d);
  }, [router]);

  if (!draft) return null;

  const service = SERVICES.find((s) => s.id === draft.service);
  const questions = SERVICE_QUESTIONS[service.id] || [];

  function handleConfirm() {
    if (!agreed) {
      setError("Please agree to the Terms & Conditions to continue.");
      return;
    }
    saveDraft({ reference: generateReference() });
    router.push("/booking/confirmation");
  }

  return (
    <section className="relative overflow-hidden bg-brand-50/50">
      <PageBackground />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <BookingSteps current={6} />

        <div className="animate-fade-up rounded-[--radius-lg] border-2 border-brand-100 bg-surface p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-lg font-semibold text-ink">Review your booking</h2>
          <p className="mt-1 text-sm text-ink-muted">
            Double-check everything below before you confirm.
          </p>

          <div className="mt-6 rounded-[--radius-md] border border-border p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-700">
              <Wrench className="size-4" /> {service.label}
            </div>
            <div className="mt-2 divide-y divide-border">
              {questions.map((q) => (
                <SummaryRow key={q.id} label={q.label} value={draft.answers?.[q.id] || "-"} />
              ))}
              {draft.jobDetails && <SummaryRow label="Notes" value={draft.jobDetails} />}
            </div>
          </div>

          <div className="mt-4 rounded-[--radius-md] border border-border p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-700">
              <MapPin className="size-4" /> Location
            </div>
            <div className="mt-2 divide-y divide-border">
              <SummaryRow label="State" value={draft.state} />
              <SummaryRow label="Address" value={draft.address} />
            </div>
          </div>

          <div className="mt-4 rounded-[--radius-md] border border-border p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-700">
              <CalendarDays className="size-4" /> Date & Time
            </div>
            <div className="mt-2 divide-y divide-border">
              <SummaryRow label="Date" value={draft.date} />
              <SummaryRow label="Time" value={draft.time} />
            </div>
          </div>

          <div className="mt-4 rounded-[--radius-md] border border-border p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-700">
              <User className="size-4" /> Contact
            </div>
            <div className="mt-2 divide-y divide-border">
              <SummaryRow label="Name" value={draft.name} />
              <SummaryRow label="Phone" value={draft.phone} />
            </div>
          </div>

          <label className="mt-5 flex items-start gap-2 text-sm text-ink-muted">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                if (error) setError("");
              }}
              className="mt-0.5 size-4 rounded border-border-strong accent-brand-600"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="font-medium text-brand-600 hover:text-brand-700">
                Terms & Conditions
              </a>{" "}
              and confirm the details above are correct.
            </span>
          </label>
          {error && <p className="mt-1 text-xs text-danger-strong">{error}</p>}

          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" onClick={() => router.push("/booking/contact")}>
              <ArrowLeft className="size-4" /> Back
            </Button>
            <Button onClick={handleConfirm}>
              <CheckCircle2 className="size-4" /> Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}