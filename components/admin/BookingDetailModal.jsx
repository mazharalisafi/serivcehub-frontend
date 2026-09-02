"use client";

import { useState } from "react";
import {
  X, MapPin, Phone, Mail, CalendarDays, StickyNote, CheckCircle2, HelpCircle, XCircle,
  CreditCard, NotebookPen, CalendarClock, AlertTriangle,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { STATUS_TRANSITIONS, DECLINE_REASONS } from "@/lib/mockData";
import { TIME_SLOTS } from "@/lib/serviceQuestions";
import { hasConflict, hasBufferViolation } from "@/lib/scheduling";

function DetailRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-2">
      <Icon className="mt-0.5 size-4 shrink-0 text-ink-faint" />
      <div>
        <p className="text-xs text-ink-faint">{label}</p>
        <p className="text-sm font-medium text-ink">{value}</p>
      </div>
    </div>
  );
}

// The three review outcomes per Requirements doc Sec 2.2 (Confirm /
// Request more info / Decline), plus internal admin notes, payment
// status, and manual reschedule with conflict + buffer-time checks
// (Sec 2.4, 2.5).
export function BookingDetailModal({ booking, staffNames, staffList, allBookings, bufferMinutes, onClose, onUpdateStatus, onUpdateBooking }) {
  const [declineReason, setDeclineReason] = useState("");
  const [showDeclineBox, setShowDeclineBox] = useState(false);
  const [adminNotes, setAdminNotes] = useState(booking?.adminNotes || "");
  const [showReschedule, setShowReschedule] = useState(false);
  const [newDate, setNewDate] = useState(booking?.date || "");
  const [newTime, setNewTime] = useState(booking?.time || "");

  if (!booking) return null;

  const allowedNext = STATUS_TRANSITIONS[booking.status] || [];
  const primaryStaffId = booking.staffIds?.[0];

  function handleDecline() {
    const reason = declineReason.trim();
    if (!reason) return;
    onUpdateStatus(booking.id, "Declined", reason);
    setShowDeclineBox(false);
    setDeclineReason("");
  }

  function handleSaveNotes() {
    onUpdateBooking(booking.id, { adminNotes });
  }

  function handleTogglePaid() {
    onUpdateBooking(booking.id, {
      paymentStatus: booking.paymentStatus === "Paid" ? "Unpaid" : "Paid",
    });
  }

  const conflict = primaryStaffId && showReschedule
    ? hasConflict(allBookings, primaryStaffId, newDate, newTime, booking.id)
    : false;
  const bufferIssue = primaryStaffId && showReschedule && !conflict
    ? hasBufferViolation(allBookings, primaryStaffId, newDate, newTime, bufferMinutes, TIME_SLOTS, booking.id)
    : false;

  function handleReschedule() {
    if (conflict) return;
    onUpdateBooking(booking.id, {
      date: newDate,
      time: newTime,
      history: [
        ...(booking.history || []),
        `${new Date().toLocaleString()}: Rescheduled from ${booking.date} ${booking.time} to ${newDate} ${newTime}`,
      ],
    });
    setShowReschedule(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-[--radius-lg] border border-border bg-surface p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-ink-faint">Booking</p>
            <h3 className="font-display text-lg font-bold text-ink">{booking.id}</h3>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={booking.status} />
            <button onClick={onClose} className="text-ink-faint hover:text-ink">
              <X className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-4 divide-y divide-border rounded-[--radius-md] border border-border px-3">
          <DetailRow icon={CalendarDays} label="Service & Slot" value={`${booking.service} - ${booking.date} at ${booking.time}`} />
          <DetailRow icon={MapPin} label="Address" value={`${booking.address} (${booking.state})`} />
          <DetailRow icon={Phone} label="Customer" value={`${booking.customer} - ${booking.phone}`} />
          <DetailRow icon={Mail} label="Email" value={booking.email} />
          <DetailRow icon={StickyNote} label="Job notes" value={booking.notes || "No notes provided."} />
          <DetailRow icon={CalendarDays} label="Assigned staff" value={staffNames} />
          <DetailRow icon={CalendarDays} label="Price" value={booking.price} />
          <DetailRow icon={CalendarDays} label="Submitted" value={booking.submittedAt?.replace("T", " ")} />
        </div>

        {/* Payment status - Requirements doc Sec 2.4 / Answer #7 */}
        <div className="mt-4 flex items-center justify-between rounded-[--radius-md] border border-border p-3">
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="size-4 text-ink-faint" />
            <span className="text-ink-muted">Payment ({booking.paymentMethod || "not set"}):</span>
            <StatusBadge status={booking.paymentStatus === "Paid" ? "Completed" : "Pending"} />
          </div>
          <Button size="sm" variant="outline" onClick={handleTogglePaid}>
            Mark as {booking.paymentStatus === "Paid" ? "Unpaid" : "Paid"}
          </Button>
        </div>

        {/* Internal admin notes - never shown to the customer */}
        <div className="mt-4">
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">
            <NotebookPen className="size-3.5" /> Internal admin notes (not visible to customer)
          </div>
          <Textarea rows={2} value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} />
          {adminNotes !== (booking.adminNotes || "") && (
            <Button size="sm" className="mt-2" onClick={handleSaveNotes}>Save notes</Button>
          )}
        </div>

        {/* Manual reschedule with conflict + buffer-time detection - Sec 2.5 */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowReschedule((v) => !v)}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-faint hover:text-ink"
          >
            <CalendarClock className="size-3.5" /> Reschedule
          </button>
          {showReschedule && (
            <div className="mt-2 space-y-2 rounded-[--radius-md] border border-border p-3">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="rounded-[--radius-md] border border-border-strong px-3 py-2 text-sm"
                />
                <Select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  options={TIME_SLOTS.map((t) => ({ value: t, label: t }))}
                />
              </div>
              {conflict && (
                <p className="flex items-center gap-1.5 text-xs text-danger-strong">
                  <AlertTriangle className="size-3.5" /> Assigned staff already has a booking at this slot.
                </p>
              )}
              {!conflict && bufferIssue && (
                <p className="flex items-center gap-1.5 text-xs text-accent-600">
                  <AlertTriangle className="size-3.5" /> Less than {bufferMinutes} min buffer before/after another job for this staff member.
                </p>
              )}
              <Button size="sm" onClick={handleReschedule} disabled={conflict}>
                Confirm new time
              </Button>
            </div>
          )}
        </div>

        {allowedNext.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">Admin action</p>
            <div className="flex flex-wrap gap-2">
              {allowedNext.includes("Confirmed") && (
                <Button size="sm" onClick={() => onUpdateStatus(booking.id, "Confirmed")}>
                  <CheckCircle2 className="size-4" /> Confirm
                </Button>
              )}
              {allowedNext.includes("Needs Info") && (
                <Button size="sm" variant="outline" onClick={() => onUpdateStatus(booking.id, "Needs Info")}>
                  <HelpCircle className="size-4" /> Request more info
                </Button>
              )}
              {allowedNext.includes("In Progress") && (
                <Button size="sm" onClick={() => onUpdateStatus(booking.id, "In Progress")}>Mark In Progress</Button>
              )}
              {allowedNext.includes("Completed") && (
                <Button size="sm" onClick={() => onUpdateStatus(booking.id, "Completed")}>Mark Completed</Button>
              )}
              {allowedNext.includes("No-show") && (
                <Button size="sm" variant="outline" onClick={() => onUpdateStatus(booking.id, "No-show")}>Mark No-show</Button>
              )}
              {allowedNext.includes("Cancelled") && (
                <Button size="sm" variant="outline" onClick={() => onUpdateStatus(booking.id, "Cancelled")}>Cancel booking</Button>
              )}
              {allowedNext.includes("Declined") && !showDeclineBox && (
                <Button size="sm" variant="outline" onClick={() => setShowDeclineBox(true)}>
                  <XCircle className="size-4" /> Decline
                </Button>
              )}
            </div>

            {showDeclineBox && (
              <div className="mt-3 space-y-2">
                <Select
                  label="Reason for declining"
                  placeholder="Select a reason"
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  options={DECLINE_REASONS.map((r) => ({ value: r, label: r }))}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleDecline} disabled={!declineReason.trim()}>Confirm decline</Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowDeclineBox(false)}>Cancel</Button>
                </div>
              </div>
            )}
          </div>
        )}

        {booking.history?.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">Edit history</p>
            <ul className="space-y-1 text-xs text-ink-muted">
              {booking.history.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}