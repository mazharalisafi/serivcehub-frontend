"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PageBackground } from "@/components/layout/PageBackground";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { Reveal } from "@/components/animation/Reveal";
import { getDraft, saveDraft } from "@/lib/bookingDraft";
import { validatePhone, validateRequired } from "@/lib/validators";

export default function BookingContactPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const draft = getDraft();
    if (!draft.service || !draft.date) {
      router.replace("/booking");
      return;
    }
    setName(draft.name || "");
    setPhone(draft.phone || "");
    setReady(true);
  }, [router]);

  if (!ready) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {
      name: validateRequired(name, "Full name"),
      phone: validatePhone(phone),
    };
    setErrors(newErrors);
    if (newErrors.name || newErrors.phone) return;

    saveDraft({ name, contactMethod: "phone", phone });
    router.push("/booking/confirmation");
  }

  return (
    <section className="relative overflow-hidden bg-brand-50/50">
      <PageBackground />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <BookingSteps current={5} />

        <Reveal className="rounded-[--radius-lg] border border-border bg-surface p-6 shadow-sm sm:p-8">
          <h3 className="font-display text-lg font-semibold text-ink">Your contact details</h3>
          <p className="mt-1 text-sm text-ink-muted">We&apos;ll call or text this number to confirm your booking.</p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <Input
              label="Full name"
              placeholder="John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              required
            />
            <Input
              label="Phone number"
              type="tel"
              placeholder="04XX XXX XXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
              required
            />

            <div className="mt-2 flex items-center justify-between">
              <Button type="button" variant="outline" onClick={() => router.push("/booking/datetime")}>
                <ArrowLeft className="size-4" /> Back
              </Button>
              <Button type="submit">
                Confirm Booking <ArrowRight className="size-4" />
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}