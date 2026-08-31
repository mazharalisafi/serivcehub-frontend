import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const linkClass =
    "text-sm text-white/70 transition-all duration-200 hover:text-white hover:font-semibold hover:translate-x-1";
  const contactClass =
    "flex items-center gap-2 text-sm text-white/70 transition-all duration-200 hover:text-white hover:font-semibold hover:translate-x-1";

  return (
    <footer className="border-t border-border bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="inline-block rounded-[--radius-md] border border-white/15 bg-white/5 px-3 py-1.5 font-display text-lg font-semibold text-white">
              Service<span className="text-accent-400">Hub</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-white/60">
              ServiceHub connects you with trusted, vetted local professionals -
              plumbing, electrical, cleaning and more. Book online in minutes,
              no phone calls needed.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
              Quick Links
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <Link href="/" className={linkClass}>Home</Link>
              <Link href="/booking" className={linkClass}>Book a Service</Link>
              <Link href="/about" className={linkClass}>About / Contact</Link>
              <Link href="/login" className={linkClass}>Log in</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
              Contact
            </p>
            <div className="mt-3 flex flex-col gap-2.5">
              <a href="mailto:support@servicehub.com" className={contactClass}>
                <Mail className="size-4 text-accent-400" />
                support@servicehub.com
              </a>
              <a href="tel:+61280001234" className={contactClass}>
                <Phone className="size-4 text-accent-400" />
                +61 2 8000 1234
              </a>
              <p className="flex items-center gap-2 text-sm text-white/70">
                <MapPin className="size-4 text-accent-400" />
                Serving customers across Australia
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          Copyright {new Date().getFullYear()} ServiceHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}