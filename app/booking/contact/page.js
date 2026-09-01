"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PageBackground } from "@/components/layout/PageBackground";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { getDraft, saveDraft } from "@/lib/bookingDraft";
import { validatePhone, validateRequired } from "@/lib/validators";

export default function BookingContactPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
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
      agreed: agreed ? "" : "Please agree to the Terms & Conditions to continue.",
    };
    setErrors(newErrors);
    if (newErrors.name || newErrors.phone || newErrors.agreed) return;

    saveDraft({ name, contactMethod: "phone", phone });
    router.push("/booking/review");
  }

  return (
    <section className="relative overflow-hidden bg-brand-50/50">
      <PageBackground />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <BookingSteps current={5} />

        <div className="animate-fade-up rounded-[--radius-lg] border-2 border-brand-100 bg-surface p-6 shadow-sm transition-colors hover:border-brand-200 sm:p-8">
          <h3 className="font-display text-lg font-semibold text-ink">Your contact details</h3>
          <p className="mt-1 text-sm text-ink-muted">We&apos;ll call or text this number to confirm your booking.</p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <Input
              label="Full name"
              placeholder="John Smith"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
              }}
              error={errors.name}
              required
            />
            <Input
              label="Phone number"
              type="tel"
              placeholder="04XX XXX XXX"
              value={phone}
              onChange={(e) => {
                const value = e.target.value;
                setPhone(value);
                setErrors((prev) => ({
                  ...prev,
                  phone: value.trim() ? "" : prev.phone && "Phone number is required.",
                }));
              }}
              error={errors.phone}
              required
            />

            <div>
              <label className="flex cursor-pointer items-start gap-2.5 text-sm text-ink-muted">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    if (errors.agreed) setErrors((prev) => ({ ...prev, agreed: "" }));
                  }}
                  className="mt-0.5 size-4 shrink-0 rounded border-border-strong text-brand-600 focus:ring-brand-500"
                />
                <span>
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-700 underline hover:text-brand-800"
                  >
                    Terms &amp; Conditions
                  </Link>{" "}
                  and confirm the details above are correct.
                </span>
              </label>
              {errors.agreed && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{errors.agreed}</p>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <Button type="button" variant="outline" onClick={() => router.push("/booking/datetime")}>
                <ArrowLeft className="size-4" /> Back
              </Button>
              <Button type="submit" disabled={!agreed}>
                Confirm Booking <ArrowRight className="size-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}