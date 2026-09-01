import { Mail, Phone, MapPin } from "lucide-react";
import { InfoCard } from "@/components/ui/InfoCard";
import { PageBackground } from "@/components/layout/PageBackground";
import { Reveal } from "@/components/animation/Reveal";

export const metadata = { title: "About | ServiceHub" };

export default function AboutPage() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-brand-50/50">
      <PageBackground />

      <div className="mx-auto max-w-3xl px-6 py-20">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700">About Us</span>
          <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">Booking home services, made simple</h1>
          <p className="mt-3 text-sm text-ink-muted">
            ServiceHub connects you with trusted, vetted local professionals for
            plumbing, electrical, cleaning and more. Book online in a few
            minutes - no phone calls needed.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <Reveal delay={0}>
            <InfoCard icon={Mail} label="Email" value="support@servicehub.com" href="mailto:support@servicehub.com" />
          </Reveal>
          <Reveal delay={100}>
            <InfoCard icon={Phone} label="Phone" value="+61 2 8000 1234" href="tel:+61280001234" />
          </Reveal>
          <Reveal delay={200}>
            <InfoCard icon={MapPin} label="Coverage" value="Serving customers across Australia" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}