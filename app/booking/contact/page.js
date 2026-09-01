"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PageBackground } from "@/components/layout/PageBackground";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { cn } from "@/lib/utils";
import { getDraft, saveDraft } from "@/lib/bookingDraft";
import { validateEmail, validatePhone, validateRequired } from "@/lib/validators";

export default function BookingContactPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredContact, setPreferredContact] = useState("phone");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const draft = getDraft();
    if (!draft.service || !draft.date) {
      router.replace("/booking");
      return;
    }
    setName(draft.name || "");
    setPhone(draft.phone || "");
    setEmail(draft.email || "");
    setPreferredContact(draft.preferredContact || "phone");
    setReady(true);
  }, [router]);

  if (!ready) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {
      name: validateRequired(name, "Full name"),
      phone: validatePhone(phone),
      email: validateEmail(email),
    };
    setErrors(newErrors);
    if (newErrors.name || newErrors.phone || newErrors.email) return;

    saveDraft({ name, phone, email, preferredContact });
    router.push("/booking/review");
  }

  return (
    <section className="relative overflow-hidden bg-brand-50/50">
      <PageBackground />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <BookingSteps current={5} />

        <div className="animate-fade-up rounded-[--radius-lg] border-2 border-brand-100 bg-surface p-6 shadow-sm transition-colors hover:border-brand-200 sm:p-8">
          <h3 className="font-display text-lg font-semibold text-ink">Your contact details</h3>
          <p className="mt-1 text-sm text-ink-muted">
            We&apos;ll use these to keep you updated on your booking.
          </p>

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
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                setErrors((prev) => ({
                  ...prev,
                  email: value.trim() ? "" : prev.email && "Email is required.",
                }));
              }}
              error={errors.email}
              required
            />

            <div>
              <p className="text-sm font-medium text-ink">Preferred contact method</p>
              <div className="mt-2 flex gap-2">
                {["phone", "email"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPreferredContact(method)}
                    className={cn(
                      "flex-1 rounded-[--radius-md] border px-4 py-2 text-sm font-semibold capitalize transition-colors",
                      preferredContact === method
                        ? "border-brand-600 bg-brand-50 text-brand-700"
                        : "border-border-strong text-ink-muted hover:text-ink"
                    )}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <Button type="button" variant="outline" onClick={() => router.push("/booking/datetime")}>
                <ArrowLeft className="size-4" /> Back
              </Button>
              <Button type="submit">
                Continue to Review <ArrowRight className="size-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}