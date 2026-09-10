'use client';

import { CheckCircle2, Calendar, Clock, MapPin, Wrench, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ConfirmationStep({ formData, selectedService, onReset }) {
  const bookingRef = `SH-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
      <Card className="bg-[#0b1329]/90 border border-teal-500/30 p-8 sm:p-10 rounded-3xl max-w-xl w-full text-center space-y-6 shadow-2xl shadow-teal-950/40 relative overflow-hidden backdrop-blur-md">
        
        {/* Background glow effect */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Check Badge Icon */}
        <div className="size-20 bg-teal-500/10 border-2 border-teal-400/40 text-teal-400 rounded-full flex items-center justify-center mx-auto shadow-inner shadow-teal-400/20">
          <CheckCircle2 className="size-11 stroke-[2.2]" />
        </div>

        <div>
          <span className="inline-block text-xs font-bold tracking-widest text-teal-400 uppercase bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800/50 mb-3">
            Booking Confirmed
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Thank You, {formData?.fullName || 'Customer'}!</h2>
          <p className="text-slate-400 text-sm mt-1">
            Your booking request has been successfully recorded. Reference ID: <span className="text-teal-300 font-mono font-bold">{bookingRef}</span>
          </p>
        </div>

        {/* Booking Details Summary Box */}
        <div className="bg-[#060b18]/80 rounded-2xl p-5 text-left border border-slate-800/80 space-y-3">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <Wrench className="size-5 text-teal-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Service Required</p>
              <p className="font-bold text-white text-sm">{selectedService?.title || selectedService?.name || 'House Cleaning'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-1">
            <div className="flex items-center gap-2.5">
              <Calendar className="size-4 text-teal-400 shrink-0" />
              <div>
                <p className="text-[11px] text-slate-400">Date</p>
                <p className="font-medium text-slate-200 text-xs">{formData?.date || '2026-09-10'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="size-4 text-teal-400 shrink-0" />
              <div>
                <p className="text-[11px] text-slate-400">Time Slot</p>
                <p className="font-medium text-slate-200 text-xs">{formData?.timeSlot || '11:00 AM'}</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 pt-2 border-t border-slate-800">
            <MapPin className="size-4 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] text-slate-400">Location</p>
              <p className="font-medium text-slate-200 text-xs">{formData?.address || 'Service Location'}, {formData?.state} {formData?.postcode}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button 
            onClick={onReset}
            className="flex-1 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold rounded-xl py-3 text-sm transition-all shadow-lg shadow-teal-500/20"
          >
            Return to Home <ArrowRight className="size-4 ml-1" />
          </Button>
          <Button 
            onClick={() => window.print()}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl px-4 text-sm"
          >
            <Download className="size-4 mr-1.5" /> Save Receipt
          </Button>
        </div>
      </Card>
    </div>
  );
}