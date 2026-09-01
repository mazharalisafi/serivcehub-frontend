"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { PageBackground } from "@/components/layout/PageBackground";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { Reveal } from "@/components/animation/Reveal";
import { SERVICES, SERVICE_QUESTIONS } from "@/lib/serviceQuestions";
import { getDraft, saveDraft } from "@/lib/bookingDraft";

// Suffix used to store the free-text answer for a question when "Other" is picked.
const OTHER_SUFFIX = "Other";

export default function BookingDetailsPage() {
  const router = useRouter();
  const [service, setService] = useState(null);
  const [answers, setAnswers] = useState({});
  const [jobDetails, setJobDetails] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const draft = getDraft();
    const found = SERVICES.find((s) => s.id === draft.service);
    if (!found) {
      router.replace("/booking");
      return;
    }
    setService(found);
    setAnswers(draft.answers || {});
    setJobDetails(draft.jobDetails || "");
  }, [router]);

  if (!service) return null;

  const questions = SERVICE_QUESTIONS[service.id] || [];

  function isOtherSelected(questionId) {
    return answers[questionId] === "Other";
  }

  function handleContinue() {
    if (questions.some((q) => !answers[q.id])) {
      setError("Please answer all questions above before continuing.");
      return;
    }
    const missingOtherDetail = questions.some(
      (q) => isOtherSelected(q.id) && !answers[`${q.id}${OTHER_SUFFIX}`]?.trim()
    );
    if (missingOtherDetail) {
      setError('Please describe your issue in the field below "Other".');
      return;
    }
    if (jobDetails.trim().length > 0 && jobDetails.trim().length < 10) {
      setError("Notes should be at least 10 characters, or left empty.");
      return;
    }
    saveDraft({ answers, jobDetails });
    router.push("/booking/location");
  }

  return (
    <section className="relative overflow-hidden bg-brand-50/50">
      <PageBackground />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <BookingSteps current={2} />

        <Reveal className="rounded-[--radius-lg] border border-border bg-surface p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-lg font-semibold text-ink">
            Tell us about the {service.label.toLowerCase()} service you need
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            A few details help us match you with the right professional and time slot.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            {questions.map((q) => (
              <div key={q.id} className="flex flex-col gap-4">
                <Select
                  label={q.label}
                  placeholder="Select an option"
                  value={answers[q.id] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setAnswers((prev) => {
                      const next = { ...prev, [q.id]: value };
                      // Clear any leftover "Other" description if the user
                      // switches away from the "Other" option.
                      if (value !== "Other") delete next[`${q.id}${OTHER_SUFFIX}`];
                      return next;
                    });
                    if (error) setError("");
                  }}
                  options={q.options.map((opt) => ({ value: opt, label: opt }))}
                  required
                />

                {isOtherSelected(q.id) && (
                  <Textarea
                    label={`Please describe your ${q.label
                      .toLowerCase()
                      .replace(/^what type of |what /i, "")
                      .replace(/\?$/, "")}`}
                    placeholder="Tell us more about the issue so we can match you with the right professional."
                    value={answers[`${q.id}${OTHER_SUFFIX}`] || ""}
                    onChange={(e) => {
                      setAnswers((prev) => ({
                        ...prev,
                        [`${q.id}${OTHER_SUFFIX}`]: e.target.value,
                      }));
                      if (error) setError("");
                    }}
                    required
                  />
                )}
              </div>
            ))}
            <Textarea
              label="Anything else we should know? (optional)"
              placeholder="Example: Kitchen tap is leaking, needs a look this week."
              hint={error ? undefined : "Min 10 characters if you add a note"}
              error={error}
              value={jobDetails}
              onChange={(e) => {
                setJobDetails(e.target.value);
                if (error) setError("");
              }}
            />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" onClick={() => router.push("/booking")}>
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