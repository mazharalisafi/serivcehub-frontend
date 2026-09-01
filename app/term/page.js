import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageBackground } from "@/components/layout/PageBackground";
import { Reveal } from "@/components/animation/Reveal";

export const metadata = { title: "Terms & Conditions | ServiceHub" };

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By booking a service through ServiceHub, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our booking platform.`,
  },
  {
    title: "2. Bookings & Scheduling",
    body: `All bookings are requests for service and are confirmed once a professional accepts the job. ServiceHub will notify you via SMS or email once your booking is confirmed. Time slots are subject to availability and may occasionally require rescheduling.`,
  },
  {
    title: "3. Pricing",
    body: `Prices shown at booking are estimates based on the information you provide. Final pricing may vary depending on the actual scope of work assessed by the professional on-site. Any changes to pricing will be communicated to you before work begins.`,
  },
  {
    title: "4. Cancellations & Rescheduling",
    body: `You may cancel or reschedule a booking free of charge up to 24 hours before the scheduled appointment. Cancellations made within 24 hours of the appointment may incur a fee.`,
  },
  {
    title: "5. Service Professionals",
    body: `All professionals booked through ServiceHub are independently vetted and, where applicable, licensed and insured. ServiceHub acts as a platform connecting customers with service providers and is not itself the employer of these professionals.`,
  },
  {
    title: "6. Customer Responsibilities",
    body: `You agree to provide accurate information about the service required, safe access to the property, and a point of contact who will be present during the appointment.`,
  },
  {
    title: "7. Liability",
    body: `ServiceHub facilitates bookings between customers and independent professionals. While we vet all professionals on our platform, ServiceHub's liability for any loss or damage arising from services performed is limited to the extent permitted by law.`,
  },
  {
    title: "8. Privacy",
    body: `Information you provide during booking (name, phone number, address) is used solely to facilitate your service request and communicate with you about your booking. We do not sell your personal information to third parties.`,
  },
  {
    title: "9. Changes to These Terms",
    body: `ServiceHub may update these Terms & Conditions from time to time. Continued use of the platform after changes are posted constitutes acceptance of the revised terms.`,
  },
  {
    title: "10. Contact Us",
    body: `If you have any questions about these Terms & Conditions, please reach out to us at support@servicehub.com.`,
  },
];

export default function TermsPage() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-brand-50/50">
      <PageBackground />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <Reveal>
          <Link
            href="/booking/contact"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="size-4" /> Back to booking
          </Link>

          <div className="mt-6 text-center sm:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700">
              Legal
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
              Terms &amp; Conditions
            </h1>
            <p className="mt-3 text-sm text-ink-muted">Last updated: September 2026</p>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col gap-8 rounded-[--radius-lg] border border-border bg-surface p-6 shadow-sm sm:p-8">
          {SECTIONS.map((section, i) => (
            <Reveal key={section.title} delay={Math.min(i * 60, 300)}>
              <h2 className="font-display text-base font-semibold text-ink">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{section.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
} 