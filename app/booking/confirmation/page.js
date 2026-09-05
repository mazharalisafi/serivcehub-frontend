"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PartyPopper, Home } from "lucide-react";
import { SERVICES_DATA } from "@/lib/serviceQuestions";
import { getDraft, clearDraft } from "@/lib/bookingDraft";

export default function BookingConfirmationPage() {
  const router = useRouter();
  const [draft, setDraft] = useState(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const d = getDraft();
    if (!d || !d.serviceName || !d.date || !d.phone || !d.email) {
      router.replace("/booking");
      return;
    }
    setDraft(d);
    clearDraft();
  }, [router]);

  if (!draft) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-indigo-950 text-white flex items-center justify-center px-4 py-16">
      <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-3xl border border-slate-800 bg-slate-900/90 p-8 text-center shadow-2xl backdrop-blur-xl">
        <div className="flex size-16 items-center justify-center rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400">
          <PartyPopper className="size-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-white">Booking Request Sent!</h1>

        {draft.reference && (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-5 py-2.5 w-full">
            <p className="text-xs text-slate-400">Booking Reference</p>
            <p className="text-lg font-extrabold text-teal-400">{draft.reference}</p>
          </div>
        )}

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          We&apos;ve received your request for <span className="text-teal-300 font-bold">{draft.serviceName}</span> on <span className="text-white font-semibold">{draft.date}</span> ({draft.timeSlot}). A confirmation update will be sent to your email/SMS shortly.
        </p>

        <Link href="/" className="mt-4 w-full">
          <button className="w-full py-3.5 px-6 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2">
            <Home size={16} /> Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}