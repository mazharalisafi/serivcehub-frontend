'use client';

import { SERVICES_DATA } from '@/lib/servicesData';
import { Card } from '@/components/ui/Card';
import { Check } from 'lucide-react';

export default function ServiceStep({ formData = {}, updateFormData, onNext }) {
  // Safe navigation taake runtime error na aaye
  const currentServiceId = formData?.serviceId || formData?.serviceSlug || '';

  const selectedService = SERVICES_DATA?.find(
    (s) => s.id === currentServiceId || s.slug === currentServiceId
  ) || SERVICES_DATA?.[0];

  const handleSelectService = (service) => {
    if (updateFormData) {
      updateFormData({ 
        serviceId: service.id,
        serviceCategory: service.title || service.name,
        serviceSlug: service.slug 
      });
    }
  };

  return (
    <Card className="bg-[#0b1329]/90 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl">
      <h2 className="text-xl font-bold text-white mb-6">Select a Service</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {SERVICES_DATA?.map((service) => {
          const isSelected = selectedService?.id === service.id;

          return (
            <div
              key={service.id}
              onClick={() => handleSelectService(service)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                isSelected
                  ? 'border-teal-400 bg-teal-950/30 shadow-lg shadow-teal-500/10'
                  : 'border-slate-800 bg-[#060b18] hover:border-slate-700'
              }`}
            >
              <div>
                <h3 className="font-bold text-white text-base">{service.title || service.name}</h3>
                <p className="text-slate-400 text-xs mt-1 line-clamp-2">{service.description}</p>
                {service.price && (
                  <p className="text-teal-400 font-bold text-sm mt-3">{service.price}</p>
                )}
              </div>
              <div
                className={`size-6 rounded-full border flex items-center justify-center shrink-0 ${
                  isSelected ? 'border-teal-400 bg-teal-400 text-slate-950' : 'border-slate-700'
                }`}
              >
                {isSelected && <Check className="size-4 stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm transition shadow-md"
        >
          Continue
        </button>
      </div>
    </Card>
  );
}