'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { saveDraft } from '@/lib/bookingDraft';
import { SERVICES_DATA } from '@/lib/servicesData';

export default function ServicesGrid() {
  const router = useRouter();

  const handleSelectService = (service) => {
    saveDraft({
      serviceId: service.id,
      serviceName: service.name,
    });
    router.push('/booking/details');
  };

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Our Cleaning & Maintenance Services
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-xs sm:text-base">
          Select a service below to book verified professionals instantly.
        </p>
      </div>

      {/* Reference Image jaisa 5-Column Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {SERVICES_DATA.map((service) => (
          <div
            key={service.id}
            onClick={() => handleSelectService(service)}
            className="group cursor-pointer flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5"
          >
            <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800 bg-slate-100">
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <h3 className="mt-3 text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-teal-400 transition-colors">
              {service.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}