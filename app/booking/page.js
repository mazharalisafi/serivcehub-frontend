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
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    serviceCategory: '',
    serviceSlug: '',
    serviceId: '',
    issueType: 'Deep Cleaning',
    urgency: 'Emergency (As soon as possible)',
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
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!mounted) return;

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
          return;
        }
      }
    }

    if (!serviceQuery && currentStep === 1 && !selectedService && SERVICES_DATA?.[0]) {
      setSelectedService(SERVICES_DATA[0]);
    }
  }, [searchParams, mounted]);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    scrollToTop();
    if (isEditing) {
      setIsEditing(false);
      setCurrentStep(6);
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 7));
    }
  };

  const prevStep = () => {
    scrollToTop();
    if (isEditing) {
      setIsEditing(false);
      setCurrentStep(6);
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const goToStep = (stepNumber) => {
    scrollToTop();
    setIsEditing(true);
    setCurrentStep(stepNumber);
  };

  const handleReset = () => {
    scrollToTop();
    setCurrentStep(1);
    setSelectedService(null);
    setIsEditing(false);
    setFormData({
      serviceCategory: '',
      serviceSlug: '',
      serviceId: '',
      issueType: 'Deep Cleaning',
      urgency: 'Emergency (As soon as possible)',
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
    router.push('/booking');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#030712] text-emerald-400 pt-32 text-center text-sm font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {currentStep <= 6 && (
          <BookingSteps currentStep={currentStep} />
        )}

        <div className="mt-4">
          {currentStep === 1 && (
            <ServiceStep
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
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
    <Suspense fallback={<div className="min-h-screen bg-[#030712] text-emerald-400 pt-32 text-center text-sm">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}