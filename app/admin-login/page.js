"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { validateEmail, validateRequired, validateMinLength } from "@/lib/validators";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {
      email: validateEmail(email),
      password: validateRequired(password, "Password") || validateMinLength(password, 6, "Password"),
    };
    setErrors(newErrors);
    if (newErrors.email || newErrors.password) return;

    setLoading(true);
    window.localStorage.setItem("sh_admin_auth", "true");
    router.push("/admin/dashboard");
  }

  return (
    <section className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-6 py-16 bg-ink">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-ink via-ink to-brand-900" />
      <div className="pointer-events-none absolute -left-20 top-16 -z-10 size-72 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 -z-10 size-64 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="animate-fade-up w-full max-w-md rounded-[--radius-lg] border-2 border-white/10 bg-surface p-8 text-center shadow-lg sm:p-10">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-ink">
          <ShieldCheck className="size-5 text-accent-400" />
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">Staff & Admin Login</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Sign in with your work email and password to manage bookings.
        </p>

        <div className="mt-4 rounded-[--radius-md] border border-accent-200 bg-accent-50 px-3 py-2 text-left text-xs text-ink-muted">
          <span className="font-semibold text-ink">Demo mode:</span> there&apos;s no backend yet,
          so any valid-looking email and any password (6+ characters) will sign you in.
          Real staff accounts will be added once the backend is built.
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 text-left">
          <Input
            label="Work email"
            type="email"
            placeholder="you@servicehub.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((p) => ({ ...p, email: "" }));
            }}
            error={errors.email}
            required
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((p) => ({ ...p, password: "" }));
              }}
              error={errors.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-[34px] text-ink-faint hover:text-ink-muted"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-ink-muted">
              <input type="checkbox" className="size-3.5 rounded border-border-strong accent-brand-600" />
              Keep me signed in
            </label>
            <a href="#" className="font-medium text-brand-600 hover:text-brand-700">
              Forgot password?
            </a>
          </div>

          <Button type="submit" size="lg" className="mt-2 w-full" loading={loading}>
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-xs text-ink-faint">
          This area is for ServiceHub staff only. Customers should use the{" "}
          <a href="/login" className="font-medium text-brand-600 hover:text-brand-700">
            customer login
          </a>
          .
        </p>
      </div>
    </section>
  );
}