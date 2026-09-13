'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [direction, setDirection] = useState(1); // 1 = slide right, -1 = slide left
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

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    scrollToTop();
    setDirection(1);
    if (isEditing) {
      setIsEditing(false);
      setCurrentStep(6);
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 7));
    }
  };

  const prevStep = () => {
    scrollToTop();
    setDirection(-1);
    if (isEditing) {
      setIsEditing(false);
      setCurrentStep(6);
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const goToStep = (stepNumber) => {
    scrollToTop();
    setDirection(stepNumber > currentStep ? 1 : -1);
    setIsEditing(true);
    setCurrentStep(stepNumber);
  };

  const handleReset = () => {
    scrollToTop();
    router.push('/');
  };

  // Framer Motion Sliding Transition Variants
  const slideVariants = {
    initial: (dir) => ({
      x: dir > 0 ? '60%' : '-60%',
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: (dir) => ({
      x: dir > 0 ? '-60%' : '60%',
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeIn' },
    }),
  };

  if (!mounted || isInitializing) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-emerald-400 text-sm font-medium">
        Loading ServiceHub...
      </div>
    );
  }

  return (
    <div className="min-h-screen relative z-0 flex flex-col pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background Overlays */}
      <div className="absolute inset-0 z-[-2] bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat bg-fixed opacity-[0.15] mix-blend-screen"></div>
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-[#0b1329]/95 via-[#030712]/95 to-[#030712]"></div>

      <div className="max-w-3xl mx-auto w-full">
        {currentStep <= 6 && (
          <BookingSteps currentStep={currentStep} />
        )}

        {/* Sliding Step Content Container */}
        <div className="relative overflow-hidden mt-4">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              {currentStep === 1 && (
                <ServiceStep
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={nextStep}
                  selectedService={selectedService}
                  setSelectedService={setSelectedService}
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#030712] flex items-center justify-center text-emerald-400 text-sm">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}