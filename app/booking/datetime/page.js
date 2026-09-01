"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PageBackground } from "@/components/layout/PageBackground";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { cn } from "@/lib/utils";
import { SERVICES, TIME_SLOTS } from "@/lib/serviceQuestions";
import { BOOKINGS } from "@/lib/mockData";
import { getDraft, saveDraft } from "@/lib/bookingDraft";
import { isValidCalendarDate } from "@/lib/validators";

export default function BookingDateTimePage() {
  const router = useRouter();
  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slotError, setSlotError] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const draft = getDraft();
    const found = SERVICES.find((s) => s.id === draft.service);
    if (!found || !draft.state) {
      router.replace("/booking");
      return;
    }
    setService(found);
    setDate(draft.date || "");
    setTime(draft.time || "");
  }, [router]);

  if (!service) return null;

  const todayStr = new Date().toISOString().split("T")[0];

  function isSlotTaken(slot) {
    if (!date) return false;
    return BOOKINGS.some((b) => b.service === service.label && b.date === date && b.time === slot);
  }

  const isDateFullyBooked = date && TIME_SLOTS.every((slot) => isSlotTaken(slot));

  function handleSlotClick(slot) {
    if (isSlotTaken(slot)) {
      setSlotError(`${slot} is not available for ${service.label} on this date. Please pick another time.`);
      return;
    }
    setTime(slot);
    setSlotError("");
    setError("");
  }

  function handleDateChange(e) {
    const value = e.target.value;
    if (value && !isValidCalendarDate(value)) {
      setError("That date doesn't exist - please pick a valid date.");
      setDate("");
      setTime("");
      return;
    }
    setDate(value);
    setTime("");
    setSlotError("");
    setError("");
  }

  function handleContinue() {
    if (!date || !isValidCalendarDate(date) || !time) {
      setError("Please choose a valid date and an available time slot.");
      return;
    }
    saveDraft({ date, time });
    router.push("/booking/contact");
  }

  return (
    <section className="relative overflow-hidden bg-brand-50/50">
      <PageBackground />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <BookingSteps current={4} />

        <div className="animate-fade-up rounded-[--radius-lg] border-2 border-brand-100 bg-surface p-6 shadow-sm transition-colors hover:border-brand-200 sm:p-8">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-brand-600" />
            <h2 className="font-display text-lg font-semibold text-ink">Pick a date & time</h2>
          </div>
          <p className="mt-1 text-sm text-ink-muted">
            We&apos;re available 9:00 AM - 5:00 PM. Availability is checked across all our staff.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <Input label="Preferred date" type="date" min={todayStr} value={date} onChange={handleDateChange} required />

            <div>
              <p className="text-sm font-medium text-ink">
                Preferred time <span className="text-danger ml-0.5">*</span>
              </p>
              {!date ? (
                <p className="mt-2 text-xs text-ink-faint">Choose a date first to see available times.</p>
              ) : isDateFullyBooked ? (
                <div className="mt-2 flex items-start gap-2 rounded-[--radius-sm] bg-danger/10 p-3 text-xs text-danger-strong">
                  <X className="mt-0.5 size-3.5 shrink-0" />
                  <span>
                    We&apos;re fully booked for {service.label} on this date. Please choose a
                    different date.
                  </span>
                </div>
              ) : (
                <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {TIME_SLOTS.map((slot) => {
                    const taken = isSlotTaken(slot);
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={taken}
                        onClick={() => handleSlotClick(slot)}
                        title={taken ? "Already booked" : undefined}
                        className={cn(
                          "rounded-[--radius-sm] border px-2 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed",
                          taken
                            ? "border-border bg-canvas text-ink-faint line-through opacity-60"
                            : time === slot
                            ? "border-brand-600 bg-brand-600 text-white"
                            : "border-border-strong bg-surface text-ink-muted hover:border-brand-300 hover:text-ink"
                        )}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {slotError && (
              <div className="flex items-start gap-2 rounded-[--radius-sm] bg-danger/10 p-3 text-xs text-danger-strong">
                <X className="mt-0.5 size-3.5 shrink-0" />
                <span>{slotError}</span>
              </div>
            )}
            {error && <p className="text-xs text-danger-strong">{error}</p>}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" onClick={() => router.push("/booking/location")}>
              <ArrowLeft className="size-4" /> Back
            </Button>
            <Button onClick={handleContinue}>
              Continue <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}