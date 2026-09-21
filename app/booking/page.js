'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SERVICES_DATA } from '@/lib/servicesData';

import { BookingSteps } from '@/components/booking/BookingSteps';
import ServiceStep from '@/components/booking/ServiceStep';
import ServiceDetailsStep from '@/components/booking/ServiceDetailsStep';
import LocationStep from '@/components/booking/LocationStep';
import DateTimeStep from '@/components/booking/DateTimeStep';
import ContactStep from '@/components/booking/ContactStep';
import ReviewStep from '@/components/booking/ReviewStep';
import ConfirmationStep from '@/components/booking/ConfirmationStep';

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    serviceCategory: '',
    serviceSlug: '',
    serviceId: '',
    issueType: '',
    urgency: '',
    requirements: '',
    address: '',
    city: '',
    state: '',
    postcode: '',
    date: '',
    timeSlot: '',
    fullName: '',
    email: '',
    phone: '',
    preferredContact: 'Phone',
    notes: '',
  });

  useEffect(() => {
    setMounted(true);
    const serviceQuery = searchParams.get('service');

    if (SERVICES_DATA && SERVICES_DATA.length > 0) {
      if (serviceQuery) {
        const found = SERVICES_DATA.find((s) => s.slug === serviceQuery || s.id === serviceQuery);
        if (found) {
          setSelectedService(found);
          setFormData((prev) => ({
            ...prev,
            serviceCategory: found.title || found.name,
            serviceSlug: found.slug,
            serviceId: found.id,
          }));
          setCurrentStep(2);
        }
      }
    }
    
    setIsInitializing(false);
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (isEditing) {
      setIsEditing(false);
      setCurrentStep(6);
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 7));
    }
  };

  const prevStep = () => {
    if (isEditing) {
      setIsEditing(false);
      setCurrentStep(6);
      return;
    }

    if (currentStep === 2) {
      router.push('/');
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const goToStep = (stepNumber) => {
    setIsEditing(true);
    setCurrentStep(stepNumber);
  };

  const handleReset = () => {
    router.push('/');
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    updateFormData({
      serviceCategory: service.title || service.name,
      serviceSlug: service.slug,
      serviceId: service.id,
    });
    nextStep();
  };

  if (!mounted || isInitializing) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-teal-400 text-sm font-medium">
        Loading ServiceHub...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 relative z-0 flex flex-col items-center justify-start py-6 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      {/* Background Overlays */}
      <div className="fixed inset-0 z-[-2] bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-[0.10] mix-blend-screen pointer-events-none" />
      <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-[#0b1329]/95 via-[#030712]/95 to-[#030712] pointer-events-none" />

      <div className="max-w-3xl w-full flex flex-col gap-5 my-auto pb-12">
        {/* Stepper Header */}
        {currentStep <= 6 && (
          <div className="shrink-0 w-full">
            <BookingSteps currentStep={currentStep} />
          </div>
        )}

        {/* Dynamic Step Component */}
        <div className="w-full bg-[#0b1329]/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
          {currentStep === 1 && (
            <ServiceStep
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              selectedService={selectedService}
              setSelectedService={handleServiceSelect}
            />
          )}

          {currentStep === 2 && (
            <ServiceDetailsStep
              formData={formData}
              updateFormData={updateFormData}
              selectedService={selectedService}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {currentStep === 3 && (
            <LocationStep
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {currentStep === 4 && (
            <DateTimeStep
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {currentStep === 5 && (
            <ContactStep
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {currentStep === 6 && (
            <ReviewStep
              formData={formData}
              selectedService={selectedService}
              onConfirm={nextStep}
              onBack={prevStep}
              goToStep={goToStep}
            />
          )}

          {currentStep === 7 && (
            <ConfirmationStep
              formData={formData}
              selectedService={selectedService}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#030712] flex items-center justify-center text-teal-400 text-sm">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}