'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookingSteps } from "@/components/booking/BookingSteps";
import { saveDraft } from "@/lib/bookingDraft";
import { SERVICES_DATA } from "@/lib/serviceQuestions";
import { ArrowRight } from 'lucide-react';

export default function BookingServicePage() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleServiceSelect = (service) => {
    saveDraft({
      serviceId: service.id,
      serviceName: service.name,
    });
    router.push('/booking/details');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-indigo-950 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <BookingSteps currentStep={1} />

        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-teal-300 uppercase tracking-widest px-3.5 py-1 bg-teal-900/60 rounded-full border border-teal-500/30">
            Step 1: Choose Service
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Our Services
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Select a service below to continue with your booking request.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(SERVICES_DATA || []).map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceSelect(service)}
              className="group cursor-pointer bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-3 hover:border-teal-400/50 transition-all duration-300 shadow-xl flex flex-col items-center text-center hover:-translate-y-1.5"
            >
              <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="py-4 px-2 space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  {service.name}
                </h3>
                <div className="text-xs text-teal-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                  Select <ArrowRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}