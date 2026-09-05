'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookingSteps } from "@/components/booking/BookingSteps";
import { getDraft, saveDraft } from "@/lib/bookingDraft";
import { 
  Wrench, MapPin, Calendar, User, ArrowLeft, CheckCircle2, 
  CheckSquare, Square, X, ShieldCheck 
} from 'lucide-react';

export default function BookingReviewPage() {
  const router = useRouter();
  const [draft, setDraft] = useState(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const currentDraft = getDraft();
    if (!currentDraft || !currentDraft.serviceName) {
      router.replace('/booking');
      return;
    }
    setDraft(currentDraft);
  }, [router]);

  if (!draft) return null;

  const handleConfirmBooking = () => {
    if (!agreedToTerms) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const reference = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
      saveDraft({ reference });
      setIsSubmitting(false);
      router.push('/booking/confirmation');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-indigo-950 text-white py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <BookingSteps currentStep={6} />

        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-teal-300 uppercase tracking-widest px-3 py-1 bg-teal-900/60 rounded-full border border-teal-500/30">
            Step 6: Final Review
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">Review Your Booking</h1>
          <p className="text-sm text-slate-400">Please verify your details before final confirmation.</p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
          <ReviewSection icon={Wrench} title={draft.serviceName || "Service Details"} editHref="/booking/details?returnTo=review">
            <SummaryRow label="Service Type" value={draft.serviceName || '-'} />
            <SummaryRow label="Details" value={draft.details || '-'} />
          </ReviewSection>

          <ReviewSection icon={MapPin} title="Location Details" editHref="/booking/location?returnTo=review">
            <SummaryRow label="Address" value={draft.address || `${draft.streetAddress || ''}, ${draft.suburb || ''}` || '-'} />
          </ReviewSection>

          <ReviewSection icon={Calendar} title="Date & Time" editHref="/booking/datetime?returnTo=review">
            <SummaryRow label="Selected Date" value={draft.date || '-'} />
            <SummaryRow label="Time Slot" value={draft.timeSlot || '-'} />
          </ReviewSection>

          <ReviewSection icon={User} title="Contact Details" editHref="/booking/contact?returnTo=review">
            <SummaryRow label="Full Name" value={draft.fullName || '-'} />
            <SummaryRow label="Email Address" value={draft.email || '-'} />
            <SummaryRow label="Phone Number" value={draft.phone || '-'} />
          </ReviewSection>

          <div className="pt-4 border-t border-slate-800 flex items-start gap-3 select-none">
            <button 
              type="button"
              onClick={() => setAgreedToTerms(!agreedToTerms)} 
              className="mt-0.5 text-teal-400 focus:outline-none flex-shrink-0 cursor-pointer"
            >
              {agreedToTerms ? <CheckSquare size={22} /> : <Square size={22} />}
            </button>
            <div className="text-xs sm:text-sm text-slate-300">
              <span onClick={() => setAgreedToTerms(!agreedToTerms)} className="cursor-pointer">
                I agree to the{' '}
              </span>
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="text-teal-300 underline font-semibold hover:text-teal-200 cursor-pointer"
              >
                Terms & Conditions
              </button>
              <span onClick={() => setAgreedToTerms(!agreedToTerms)} className="cursor-pointer">
                {' '}and confirm all details are accurate.
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push('/booking/contact')}
              className="px-5 py-3 rounded-2xl border border-slate-700 text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft size={16} /> Back
            </button>

            <button
              type="button"
              disabled={!agreedToTerms || isSubmitting}
              onClick={handleConfirmBooking}
              className="px-7 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-teal-500/20 transition-all disabled:opacity-40 flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? "Confirming..." : "Confirm Booking"} <CheckCircle2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {showTermsModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-teal-300 font-bold">
                <ShieldCheck size={20} />
                <span>Service Terms & Conditions</span>
              </div>
              <button 
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-3 max-h-72 overflow-y-auto pr-2 leading-relaxed">
              <p><strong>1. Booking & Scheduling:</strong> Service bookings depend on expert availability. Final confirmation is sent via Email/SMS.</p>
              <p><strong>2. Pricing:</strong> Estimated total costs may be adjusted following initial onsite inspection.</p>
              <p><strong>3. Cancellations:</strong> Free cancellation up to 24 hours prior to appointment.</p>
            </div>

            <button
              type="button"
              onClick={() => { setAgreedToTerms(true); setShowTermsModal(false); }}
              className="w-full py-3 bg-teal-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-teal-400 transition-colors cursor-pointer"
            >
              Accept Terms & Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewSection({ icon: Icon, title, editHref, children }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2 text-teal-300 font-bold text-sm sm:text-base">
          <Icon size={18} className="text-teal-400" />
          <span>{title}</span>
        </div>
        <Link 
          href={editHref} 
          className="text-xs text-teal-400 font-bold hover:text-teal-300 hover:underline px-2.5 py-1 bg-teal-500/10 rounded-lg border border-teal-500/20"
        >
          Edit
        </Link>
      </div>
      <div className="divide-y divide-slate-800/50">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="py-2 flex items-center justify-between text-xs sm:text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold text-slate-100">{value}</span>
    </div>
  );
}