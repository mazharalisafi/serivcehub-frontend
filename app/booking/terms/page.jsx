'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, FileText, Lock, AlertCircle, Clock } from 'lucide-react';
import { PageBackground } from "@/components/layout/PageBackground";

export default function BookingTermsPage() {
  return (
    <section className="relative overflow-hidden bg-brand-50/50 min-h-screen py-12">
      <PageBackground />

      <div className="mx-auto max-w-4xl px-6">
        {/* Navigation / Back Button */}
        <div className="mb-6">
          <Link
            href="/booking/review"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to Booking Review
          </Link>
        </div>

        {/* Main Content Card */}
        <div className="rounded-[--radius-lg] border-2 border-brand-100 bg-surface p-6 shadow-sm sm:p-10 space-y-8 text-ink">
          
          {/* Header */}
          <div className="border-b border-border pb-6 space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-brand-50 rounded-xl text-brand-700 border border-brand-100">
                <FileText className="size-6" />
              </div>
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                  Terms & Conditions
                </h1>
                <p className="text-xs text-ink-muted">Last updated: September 2026</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed">
              Please read these terms and conditions carefully before confirming your booking. By completing your booking with us, you agree to be bound by the terms outlined below.
            </p>
          </div>

          {/* Terms Content Sections */}
          <div className="space-y-6 text-sm text-ink-muted leading-relaxed">
            
            <section className="space-y-2">
              <h2 className="flex items-center gap-2 text-base font-bold text-ink font-display">
                <Clock className="size-4 text-brand-700" /> 1. Booking & Scheduling
              </h2>
              <p>
                All bookings are subject to availability and final confirmation. While we make every effort to arrive at the scheduled time, exact appointment times are estimates and may be subject to minor delays due to traffic or weather conditions.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="flex items-center gap-2 text-base font-bold text-ink font-display">
                <ShieldCheck className="size-4 text-brand-700" /> 2. Customer Responsibilities
              </h2>
              <p>
                The customer must ensure safe and unhindered access to the premises at the agreed appointment time and verify that all contact details provided during booking are correct.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="flex items-center gap-2 text-base font-bold text-ink font-display">
                <AlertCircle className="size-4 text-brand-700" /> 3. Cancellations & Rescheduling
              </h2>
              <p>
                You may cancel or reschedule your service free of charge up to 24 hours before the scheduled appointment time.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="flex items-center gap-2 text-base font-bold text-ink font-display">
                <Lock className="size-4 text-brand-700" /> 4. Privacy & Data Protection
              </h2>
              <p>
                Your personal details (name, phone, email, address) are strictly used for managing and delivering your booking requests and will never be shared with unauthorized third parties.
              </p>
            </section>

          </div>

          {/* Footer Action */}
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-ink-muted text-center sm:text-left">
              Questions regarding these terms? Contact our support team.
            </p>
            <Link
              href="/booking/review"
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-xs transition-colors"
            >
              Back to Review & Confirm
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}