"use client";

import { useState } from "react";
import { Mail, MailCheck } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PageBackground } from "@/components/layout/PageBackground";
import { validateEmail } from "@/lib/validators";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 600);
  }

  return (
    <section className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-6 py-16 bg-brand-50/50">
      <PageBackground />

      <div className="animate-fade-up w-full max-w-md rounded-[--radius-lg] border-2 border-brand-100 bg-surface p-8 text-center shadow-lg sm:p-10">
        {!sent ? (
          <>
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-50">
              <Mail className="size-5 text-brand-600" />
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold text-ink">Log in to ServiceHub</h1>
            <p className="mt-2 text-sm text-ink-muted">
              Enter your email and we&apos;ll send you a magic link - no password needed.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 text-left">
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                error={error}
                required
              />
              <Button type="submit" size="lg" className="mt-4 w-full" loading={loading}>
                Send magic link
              </Button>
            </form>
          </>
        ) : (
          <>
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-600">
              <MailCheck className="size-5 text-white" />
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold text-ink">Check your email</h1>
            <p className="mt-2 text-sm text-ink-muted">
              We&apos;ve sent a magic link to <span className="font-semibold text-ink">{email}</span>.
              Click the link in that email to log in.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Use a different email
            </button>
          </>
        )}
      </div>
    </section>
  );
}