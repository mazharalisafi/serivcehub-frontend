'use client';

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { 
  ArrowRight, 
  Sparkles, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Hash,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { SERVICES_DATA } from "@/lib/servicesData";
import { saveDraft } from "@/lib/bookingDraft";

function ExternalBookingContent() {
  const searchParams = useSearchParams();

  const serviceQuery = searchParams.get("service") || "house-cleaning";
  const sourceQuery = searchParams.get("source") || "External Partner";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
    date: "",
    time: "09:00 AM",
    notes: "",
  });

  const [selectedService, setSelectedService] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const matched = SERVICES_DATA.find(
      (s) => s.id.toLowerCase() === serviceQuery.toLowerCase()
    ) || SERVICES_DATA[0];
    
    setSelectedService(matched);
  }, [serviceQuery]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "postcode") {
      const numeric = value.replace(/\D/g, "").slice(0, 4);
      setFormData((prev) => ({ ...prev, postcode: numeric }));
      return;
    }

    if (name === "phone") {
      const cleanPhone = value.replace(/[^0-9+\s-]/g, "");
      setFormData((prev) => ({ ...prev, phone: cleanPhone }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (formData.postcode.length < 4) {
      setErrorMessage("Please enter a valid 4-digit Postcode.");
      // Error hone par bhi top par scroll karein
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (formData.phone.replace(/\D/g, "").length < 8) {
      setErrorMessage("Please enter a valid Phone Number (at least 8 digits).");
      // Error hone par bhi top par scroll karein
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Save local booking draft
    saveDraft({
      serviceId: selectedService?.id,
      serviceName: selectedService?.title || selectedService?.name,
      contactDetails: formData,
      source: sourceQuery,
    });

    // Show Success View
    setIsSubmitted(true);

    // AUTO SCROLL TO TOP (Smoothly)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!selectedService) return null;

  // SUCCESS CONFIRMATION SCREEN
  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] bg-slate-950 text-white flex items-center justify-center p-4 py-16">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl space-y-6">
          <div className="size-16 bg-teal-500/20 border border-teal-500/40 rounded-full flex items-center justify-center mx-auto text-teal-400">
            <CheckCircle2 className="size-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Booking Confirmed</span>
            <h2 className="text-2xl font-extrabold text-white mt-1">Thank You, {formData.fullName}!</h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Your service request for <span className="text-teal-300 font-semibold">{selectedService.title || selectedService.name}</span> has been received successfully.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-left space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Service:</span>
              <span className="text-white font-medium">{selectedService.title || selectedService.name}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Date & Time:</span>
              <span className="text-white font-medium">{formData.date} at {formData.time}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Contact Email:</span>
              <span className="text-white font-medium">{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Address:</span>
              <span className="text-white font-medium text-right max-w-[180px] truncate">{formData.address} ({formData.postcode})</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                fullName: "",
                email: "",
                phone: "",
                address: "",
                postcode: "",
                date: "",
                time: "09:00 AM",
                notes: "",
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Book Another Service
          </button>
        </div>
      </div>
    );
  }

  // FORM SCREEN
  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Sparkles className="size-3.5" />
            Quick Service Booking
          </span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl tracking-tight">
            Book {selectedService.title || selectedService.name}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Please fill in your details below to schedule your service.
          </p>
        </div>

        {/* Selected Service Card Preview */}
        <div className="mb-8 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
          <img
            src={selectedService.image}
            alt={selectedService.name}
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div>
            <span className="text-xs text-teal-400 font-medium uppercase tracking-wider">
              Selected Service
            </span>
            <h3 className="text-lg font-bold text-white">
              {selectedService.title || selectedService.name}
            </h3>
            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
              {selectedService.description}
            </p>
          </div>
        </div>

        {/* Validation Error Message Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-xs sm:text-sm">
            <AlertCircle className="size-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* User Information Form */}
        <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 size-4 text-slate-500" />
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 size-4 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address."
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 size-4 text-slate-500" />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+61 400 000 000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Postcode */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Postcode / Zip Code *
              </label>
              <div className="relative">
                <Hash className="absolute left-3.5 top-3 size-4 text-slate-500" />
                <input
                  type="text"
                  name="postcode"
                  required
                  maxLength={4}
                  value={formData.postcode}
                  onChange={handleChange}
                  placeholder="3000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Preferred Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Preferred Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3 size-4 text-slate-500" />
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Preferred Time */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Preferred Time Slot *
              </label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-3 size-4 text-slate-500" />
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500 cursor-pointer"
                >
                  <option value="08:00 AM">08:00 AM - 10:00 AM</option>
                  <option value="10:00 AM">10:00 AM - 12:00 PM</option>
                  <option value="12:00 PM">12:00 PM - 02:00 PM</option>
                  <option value="04:00 PM">04:00 PM - 06:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Service Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Full Street Address *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3 size-4 text-slate-500" />
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address & suburb"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Additional Notes / Instructions (Optional)
            </label>
            <textarea
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any specific requests or access instructions..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-lg shadow-teal-500/20 cursor-pointer"
          >
            Confirm & Complete Booking <ArrowRight className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ExternalBookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading booking form...</div>}>
      <ExternalBookingContent />
    </Suspense>
  );
}