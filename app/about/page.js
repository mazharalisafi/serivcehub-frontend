'use client';

import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck, Users, Clock, Award, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Satisfied Customers", value: "10,000+" },
    { label: "Verified Professionals", value: "500+" },
    { label: "Services Completed", value: "25,000+" },
    { label: "Customer Rating", value: "4.9/5" },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: "100% Vetted & Licensed",
      description: "Every professional undergoes strict background checks, license verification, and skill assessments."
    },
    {
      icon: Clock,
      title: "Instant Online Booking",
      description: "Book home services in under 2 minutes with direct upfront pricing—no endless phone calls."
    },
    {
      icon: Award,
      title: "Satisfaction Guaranteed",
      description: "If you aren't completely happy with the service, we will work with you to make it right."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-8 pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* HERO SECTION */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-950/60 border border-teal-500/20 px-3.5 py-1.5 rounded-full inline-block">
            About Us
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Booking home services, <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">made simple</span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            ServiceHub connects you with trusted, vetted local professionals for plumbing, electrical, cleaning, and more. Book online in a few minutes—no hassle, no hidden charges.
          </p>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1 backdrop-blur-sm">
              <p className="text-2xl md:text-3xl font-extrabold text-teal-400">{stat.value}</p>
              <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3 hover:border-teal-500/30 transition-all">
                <div className="size-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-base font-bold text-white">{feature.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* CONTACT CARDS */}
        <div className="space-y-6 pt-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-white">Get in Touch</h2>
            <p className="text-xs text-slate-400">Have questions? We are always here to help you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Email */}
            <a 
              href="mailto:support@servicehub.com"
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col items-center text-center space-y-3 hover:border-teal-500/40 transition-all group"
            >
              <div className="size-12 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center group-hover:bg-teal-400 group-hover:text-slate-950 transition-all">
                <Mail className="size-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Email Us</h4>
                <p className="text-xs text-slate-400 mt-1">support@servicehub.com</p>
              </div>
            </a>

            {/* Phone */}
            <a 
              href="tel:+61280001234"
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col items-center text-center space-y-3 hover:border-teal-500/40 transition-all group"
            >
              <div className="size-12 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center group-hover:bg-teal-400 group-hover:text-slate-950 transition-all">
                <Phone className="size-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Call Us</h4>
                <p className="text-xs text-slate-400 mt-1">+61 2 8000 1234</p>
              </div>
            </a>

            {/* Location */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col items-center text-center space-y-3">
              <div className="size-12 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center">
                <MapPin className="size-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Coverage Area</h4>
                <p className="text-xs text-slate-400 mt-1">Serving major cities across Australia</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}