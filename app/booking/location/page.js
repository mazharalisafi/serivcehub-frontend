"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { PageBackground } from "@/components/layout/PageBackground";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { Reveal } from "@/components/animation/Reveal";
import { AU_STATES } from "@/lib/serviceQuestions";
import { getDraft, saveDraft } from "@/lib/bookingDraft";

export default function BookingLocationPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const draft = getDraft();
    if (!draft.service) {
      router.replace("/booking");
      return;
    }
    setState(draft.state || "");
    setAddress(draft.address || "");
    setReady(true);
  }, [router]);

  if (!ready) return null;

  function handleContinue() {
    if (!state || address.trim().length < 5) {
      setError("Please select a state and enter your full address.");
      return;
    }
    saveDraft({ state, address });
    router.push("/booking/datetime");
  }

  return (
    <section className="relative overflow-hidden bg-brand-50/50">
      <PageBackground />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <BookingSteps current={3} />

        <Reveal className="rounded-[--radius-lg] border border-border bg-surface p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-brand-600" />
            <h2 className="font-display text-lg font-semibold text-ink">Where do you need us?</h2>
          </div>
          <p className="mt-1 text-sm text-ink-muted">
            We currently service all of Australia. Select your state, then write your full address.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <Select
              label="State"
              placeholder="Select your state"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                if (error) setError("");
              }}
              options={AU_STATES.map((s) => ({ value: s, label: s }))}
              required
            />
            <Textarea
              label="Full address"
              placeholder="e.g. Unit 4, 12 Example Street, Parramatta NSW 2150"
              hint={error ? undefined : "Include unit/house number, street, suburb and postcode"}
              error={error}
              rows={3}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (error) setError("");
              }}
              required
            />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" onClick={() => router.push("/booking/details")}>
              <ArrowLeft className="size-4" /> Back
            </Button>
            <Button onClick={handleContinue}>
              Continue <ArrowRight className="size-4" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}