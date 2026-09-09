'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Star, 
  ArrowRight, 
  MousePointerClick, 
  CalendarCheck2, 
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Reveal } from "@/components/animation/Reveal";
import { saveDraft } from "@/lib/bookingDraft";
import { SERVICES_DATA } from "@/lib/servicesData";

const HOW_IT_WORKS = [
  { icon: MousePointerClick, step: "01", title: "Choose a service", description: "Tell us what you need and answer a few quick questions about the job." },
  { icon: CalendarCheck2, step: "02", title: "Pick a time", description: "Choose a date and time that suits you - we check availability instantly." },
  { icon: CheckCircle2, step: "03", title: "We handle the rest", description: "A vetted professional shows up on time and gets the job done right." },
];

const TRUST_POINTS = [
  { icon: ShieldCheck, label: "Vetted, insured staff" },
  { icon: Clock, label: "On-time, every time" },
  { icon: Star, label: "4.9/5 average rating" },
];

export default function Home() {
  const router = useRouter();
  const [showAllServices, setShowAllServices] = useState(false);

  const ALL_SERVICES = SERVICES_DATA;

  const displayedServices = showAllServices 
    ? ALL_SERVICES 
    : ALL_SERVICES.filter(s => s.featured);

  const handleBookNow = (service) => {
    saveDraft({
      serviceId: service.id,
      serviceName: service.title || service.name,
    });
    router.push(`/booking/details?service=${service.id}`);
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Modern Clean Home Interior"
            className="h-full w-full object-cover object-center scale-105 transform transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-950/50" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-teal-300 ring-1 ring-teal-400/40 shadow-lg">
              <Sparkles className="size-4 text-teal-400" />
              Trusted Local Professionals
            </span>

            <h1 className="mt-6 font-display text-4xl sm:text-6xl font-extrabold leading-[1.1] text-white tracking-tight">
              Get it fixed, <br />
              <span className="bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                not stressed.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base sm:text-lg text-slate-200/90 font-normal leading-relaxed">
              Plumbing, electrical, residential cleaning, decor & styling — book vetted local experts online in under 2 minutes.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/booking">
                <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold px-8 shadow-lg shadow-teal-500/25 transition-all duration-300 hover:scale-[1.02]">
                  Book a Service <ArrowRight className="size-4 ml-1" />
                </Button>
              </Link>
              <Link href="#services">
                <Button size="lg" variant="outline" className="border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 font-semibold px-6">
                  Explore Services
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6">
              {TRUST_POINTS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
                  <Icon className="size-4 text-teal-400" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="relative border-y border-slate-800 bg-slate-950 py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal as="div" className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-950/60 border border-teal-500/20 px-3.5 py-1 rounded-full">
              Our Expertise
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Professional Services Offered
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400">
              Select any service below to view detailed options and book instant availability.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-500">
            {displayedServices.map((service, i) => (
              <Reveal key={service.id} delay={i * 80}>
                <Card className="group relative overflow-hidden bg-slate-900/90 border-slate-800 hover:border-teal-500/50 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-950/50 flex flex-col h-full justify-between">
                  <div>
                    <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                      <img 
                        src={service.image} 
                        alt={service.title || service.name} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                    </div>
                    <CardContent className="p-5 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                          {service.title || service.name}
                        </h3>
                        <span className="text-[10px] font-semibold text-teal-400 bg-teal-950/80 border border-teal-500/30 px-2 py-0.5 rounded-md">
                          {service.badgeText}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
                        {service.description}
                      </p>
                    </CardContent>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => handleBookNow(service)}
                      className="mt-2 w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
                    >
                      Book Now <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              onClick={() => setShowAllServices(!showAllServices)}
              variant="outline"
              size="lg"
              className="border-teal-500/40 text-teal-300 hover:bg-teal-500/10 hover:text-teal-200 font-bold rounded-2xl px-8 transition-all cursor-pointer"
            >
              {showAllServices ? (
                <>
                  Show Less <ChevronUp className="size-4 ml-2" />
                </>
              ) : (
                <>
                  See All Services ({ALL_SERVICES.length}) <ChevronDown className="size-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-950 mx-auto max-w-7xl px-6 py-24">
        <Reveal as="div" className="mx-auto max-w-xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Easy Process</span>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
            Booking a pro is this simple
          </h2>
        </Reveal>

        <Reveal delay={100} className="relative mt-12 rounded-3xl border border-slate-800 bg-slate-900/60 p-8 sm:p-12 backdrop-blur-xl">
          <div className="relative grid gap-10 sm:grid-cols-3 sm:gap-6">
            {HOW_IT_WORKS.map(({ icon: Icon, step, title, description }) => (
              <div key={step} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 text-slate-950 shadow-lg shadow-teal-500/20">
                  <Icon className="size-6 stroke-[2.5]" />
                </div>
                <span className="mt-4 font-display text-xs font-extrabold text-teal-400">STEP {step}</span>
                <h3 className="mt-1 font-display text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 max-w-[240px] text-xs sm:text-sm text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}