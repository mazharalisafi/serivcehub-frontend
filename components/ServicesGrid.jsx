'use client';

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SERVICES_DATA } from "@/lib/servicesData";

export default function ServiceGrid() {
  return (
    <section className="py-12 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Sparkles className="size-3.5" />
            Our Services
          </span>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Professional Cleaning Solutions
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Choose a service below to start your booking instantly.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                {/* Service Image */}
                {service.image && (
                  <div className="overflow-hidden rounded-2xl mb-4 h-44 w-full">
                    <img
                      src={service.image}
                      alt={service.title || service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Service Info */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {service.title || service.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Action Button - Points to /booking?service=... */}
              <Link
                href={`/booking?service=${service.id}`}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-teal-400 hover:text-slate-950 text-teal-400 font-bold py-3 px-4 rounded-xl text-xs transition-all duration-200"
              >
                Book Now <ArrowRight className="size-4" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}