import Link from "next/link";
import { Sparkles, ShieldCheck, Clock, Star, ArrowRight, MousePointerClick, CalendarCheck2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Reveal } from "@/components/animation/Reveal";

const HOW_IT_WORKS = [
  { icon: MousePointerClick, step: "01", title: "Choose a service", description: "Tell us what you need and answer a few quick questions about the job." },
  { icon: CalendarCheck2, step: "02", title: "Pick a time", description: "Choose a date and time that suits you - we check availability instantly." },
  { icon: CheckCircle2, step: "03", title: "We handle the rest", description: "A vetted professional shows up on time and gets the job done right." },
];

const SERVICES = [
  { id: "plumbing", title: "Plumbing", description: "Leaks, installs, and repairs handled by vetted, licensed plumbers.", image: "https://images.unsplash.com/photo-1676210134188-4c05dd172f89?auto=format&fit=crop&w=800&h=600&q=80" },
  { id: "electrical", title: "Electrical", description: "Safe, code-compliant electrical work for homes and small businesses.", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&h=600&q=80" },
  { id: "cleaning", title: "Cleaning", description: "Regular or one-off cleans, tailored to your space and schedule.", image: "https://images.unsplash.com/photo-1758273238415-01ec03d9ef27?auto=format&fit=crop&w=800&h=600&q=80" },
];

const TRUST_POINTS = [
  { icon: ShieldCheck, label: "Vetted, insured staff" },
  { icon: Clock, label: "On-time, every time" },
  { icon: Star, label: "4.9/5 average rating" },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1800&h=1000&q=75"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/40" />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20">
              <Sparkles className="size-3.5" />
              No more chasing tradies
            </span>

            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
              Get it fixed,
              <br />
              not stressed.
            </h1>

            <p className="mt-4 max-w-md text-base text-white/80">
              Plumbing, electrical, cleaning and more - book a vetted local pro
              online in minutes, no back-and-forth calls.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/booking">
                <Button size="lg">Book a Service <ArrowRight className="size-4" /></Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-white/50 bg-transparent text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {TRUST_POINTS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs font-medium text-white/80">
                  <Icon className="size-4 text-accent-400" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-border bg-brand-50/70">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal as="div" className="mx-auto max-w-xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">Our Services</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink">Whatever the job, we&apos;ve got you covered</h2>
            <p className="mt-3 text-sm text-ink-muted">
              Choose a service below and tell us what you need - pricing and availability shown before you confirm.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {SERVICES.map(({ id, title, description, image }, i) => (
              <Reveal key={title} delay={i * 120}>
                <Card className="group overflow-hidden text-left transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg">
                  <div className="overflow-hidden">
                    <img src={image} alt={title} className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <CardContent className="flex flex-col gap-2">
                    <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
                    <p className="text-sm text-ink-muted">{description}</p>
                    <Link href={`/booking?service=${id}`} className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
                      Book now <ArrowRight className="size-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal as="div" className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">How It Works</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink">Booking a pro is this simple</h2>
        </Reveal>

        <Reveal delay={100} className="relative mt-10 rounded-[--radius-lg] border border-border bg-surface p-8 shadow-[0_4px_20px_-4px_rgba(11,110,130,0.12)] sm:p-12">
          <div className="relative grid gap-10 sm:grid-cols-3 sm:gap-6">
            <div className="pointer-events-none absolute left-0 right-0 top-6 hidden border-t border-dashed border-brand-200 sm:block" />
            {HOW_IT_WORKS.map(({ icon: Icon, step, title, description }) => (
              <div key={step} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex size-12 items-center justify-center rounded-full bg-brand-600 shadow-[0_4px_20px_-4px_rgba(11,110,130,0.4)]">
                  <Icon className="size-5 text-white" />
                </div>
                <span className="mt-4 font-display text-xs font-bold text-brand-300">STEP {step}</span>
                <h3 className="mt-1 font-display text-base font-semibold text-ink">{title}</h3>
                <p className="mt-2 max-w-[220px] text-sm text-ink-muted">{description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <Reveal className="mx-auto max-w-6xl overflow-hidden px-6 py-16">
        <div className="relative overflow-hidden rounded-[--radius-lg] bg-gradient-to-br from-brand-700 via-brand-600 to-ink px-8 py-14 text-center">
          <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-accent-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-white/10 blur-3xl" />
          <div className="relative flex flex-col items-center gap-2">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Ready to get started?</h2>
            <p className="max-w-sm text-sm text-white/75">
              It only takes a couple of minutes - your pro could be booked before your kettle boils.
            </p>
          </div>
        </div>
      </Reveal>
    </>
  );
}