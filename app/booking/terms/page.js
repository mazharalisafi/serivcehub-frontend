'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, FileText, Lock, AlertCircle, Clock } from 'lucide-react';

export default function BookingTermsPage() {
  return React.createElement(
    'section',
    { className: 'relative overflow-hidden bg-slate-50 min-h-screen py-12 text-slate-800' },
    React.createElement(
      'div',
      { className: 'mx-auto max-w-4xl px-6' },
      
      /* Navigation / Back Button */
      React.createElement(
        'div',
        { className: 'mb-6' },
        React.createElement(
          Link,
          {
            href: '/booking/review',
            className: 'inline-flex items-center gap-2 text-sm font-semibold text-[#00667e] hover:underline'
          },
          React.createElement(ArrowLeft, { size: 16 }),
          ' Back to Booking Review'
        )
      ),

      /* Main Content Card */
      React.createElement(
        'div',
        { className: 'rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-8' },

        /* Header */
        React.createElement(
          'div',
          { className: 'border-b border-slate-100 pb-6 space-y-2' },
          React.createElement(
            'div',
            { className: 'flex items-center gap-3' },
            React.createElement(
              'div',
              { className: 'p-3 bg-teal-50 text-[#00667e] rounded-2xl border border-teal-100' },
              React.createElement(FileText, { size: 24 })
            ),
            React.createElement(
              'div',
              null,
              React.createElement(
                'h1',
                { className: 'text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight' },
                'Terms & Conditions'
              ),
              React.createElement(
                'p',
                { className: 'text-xs text-slate-400' },
                'Last updated: September 2026'
              )
            )
          ),
          React.createElement(
            'p',
            { className: 'mt-3 text-sm text-slate-500 leading-relaxed' },
            'Please read these terms and conditions carefully before confirming your booking. By completing your booking with us, you agree to be bound by the terms outlined below.'
          )
        ),

        /* Terms Content Sections */
        React.createElement(
          'div',
          { className: 'space-y-6 text-sm text-slate-600 leading-relaxed' },

          /* Section 1 */
          React.createElement(
            'section',
            { className: 'space-y-1' },
            React.createElement(
              'h2',
              { className: 'flex items-center gap-2 text-base font-bold text-slate-900' },
              React.createElement(Clock, { size: 16, className: 'text-[#00667e]' }),
              ' 1. Booking & Scheduling'
            ),
            React.createElement(
              'p',
              null,
              'All bookings are subject to availability and final confirmation. While we make every effort to arrive at the scheduled time, exact appointment times are estimates and may be subject to minor delays due to traffic or weather conditions.'
            )
          ),

          /* Section 2 */
          React.createElement(
            'section',
            { className: 'space-y-1' },
            React.createElement(
              'h2',
              { className: 'flex items-center gap-2 text-base font-bold text-slate-900' },
              React.createElement(ShieldCheck, { size: 16, className: 'text-[#00667e]' }),
              ' 2. Customer Responsibilities'
            ),
            React.createElement(
              'p',
              null,
              'The customer must ensure safe and unhindered access to the premises at the agreed appointment time and verify that all contact details provided during booking are correct.'
            )
          ),

          /* Section 3 */
          React.createElement(
            'section',
            { className: 'space-y-1' },
            React.createElement(
              'h2',
              { className: 'flex items-center gap-2 text-base font-bold text-slate-900' },
              React.createElement(AlertCircle, { size: 16, className: 'text-[#00667e]' }),
              ' 3. Cancellations & Rescheduling'
            ),
            React.createElement(
              'p',
              null,
              'You may cancel or reschedule your service free of charge up to 24 hours before the scheduled appointment time.'
            )
          ),

          /* Section 4 */
          React.createElement(
            'section',
            { className: 'space-y-1' },
            React.createElement(
              'h2',
              { className: 'flex items-center gap-2 text-base font-bold text-slate-900' },
              React.createElement(Lock, { size: 16, className: 'text-[#00667e]' }),
              ' 4. Privacy & Data Protection'
            ),
            React.createElement(
              'p',
              null,
              'Your personal details (name, phone, email, address) are strictly used for managing and delivering your booking requests and will never be shared with unauthorized third parties.'
            )
          )
        ),

        /* Footer Action */
        React.createElement(
          'div',
          { className: 'pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4' },
          React.createElement(
            'p',
            { className: 'text-xs text-slate-400 text-center sm:text-left' },
            'Questions regarding these terms? Contact our support team.'
          ),
          React.createElement(
            Link,
            {
              href: '/booking/review',
              className: 'px-5 py-2.5 rounded-xl bg-[#00667e] hover:bg-[#005266] text-white font-semibold text-xs transition-colors'
            },
            'Back to Review & Confirm'
          )
        )
      )
    )
  );
}