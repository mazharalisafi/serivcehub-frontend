"use client";

import { X, MapPin, Phone, Mail, Clock, User, FileText, AlertTriangle } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/Button";
import { DECLINE_REASONS } from "@/lib/mockData";
import { useState } from "react";

export function BookingDetailPanel({ booking, staffName, conflict, onClose, onConfirm, onRequestInfo, onDecline }) {
  const [mode, setMode] = useState(null);
  const [message, setMessage] = useState("");
  const [reason, setReason] = useState(DECLINE_REASONS[0]);

  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/40" onClick={onClose}>
      <div className="flex h-full w-full max-w-md flex-col overflow-y-auto bg-surface p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-ink-faint">{booking.id}</p>
            <h2 className="font-display text-lg font-bold text-ink">{booking.customer}</h2>
          </div>
          <button onClick={onClose} className="rounded-full border border-border p-1.5 text-ink-muted hover:text-ink">
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-3"><StatusBadge status={booking.status} /></div>

        {conflict && (
          <div className="mt-4 flex items-start gap-2 rounded-[--radius-md] border border-danger/30 bg-danger/10 p-3 text-xs text-danger-strong">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <span>{staffName} already has a Confirmed booking at this exact date & time.</span>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-4 text-sm">
          <div className="flex items-center gap-2 text-ink-muted">
            <Phone className="size-4 text-brand-600" /> {booking.phone}
            <span className="ml-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
              {booking.preferredContact === "phone" ? "Preferred" : ""}
            </span>
          </div>
          <div className="flex items-center gap-2 text-ink-muted">
            <Mail className="size-4 text-brand-600" /> {booking.email}
            <span className="ml-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
              {booking.preferredContact === "email" ? "Preferred" : ""}
            </span>
          </div>
          <div className="flex items-start gap-2 text-ink-muted">
            <MapPin className="mt-0.5 size-4 shrink-0 text-brand-600" /> {booking.address}
          </div>
          <div className="flex items-center gap-2 text-ink-muted">
            <Clock className="size-4 text-brand-600" /> {booking.date} at {booking.time}
          </div>
          <div className="flex items-center gap-2 text-ink-muted">
            <User className="size-4 text-brand-600" /> {staffName} ({booking.service})
          </div>
          <div className="flex items-start gap-2 text-ink-muted">
            <FileText className="mt-0.5 size-4 shrink-0 text-brand-600" />
            <span>{booking.notes || "No notes provided."}</span>
          </div>
        </div>

        <div className="mt-5 rounded-[--radius-md] border border-border bg-canvas p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Internal notes</p>
          <p className="mt-1 text-sm text-ink-muted">{booking.internalNotes || "None yet."}</p>
        </div>

        {booking.declineReason && (
          <p className="mt-2 text-xs text-danger-strong">Decline reason: {booking.declineReason}</p>
        )}

        {booking.status === "Pending" && !mode && (
          <div className="mt-6 flex flex-col gap-2">
            <Button onClick={onConfirm}>Confirm booking</Button>
            <Button variant="outline" onClick={() => setMode("info")}>Request more info</Button>
            <Button variant="outline" className="border-danger/40 text-danger-strong hover:bg-danger/10" onClick={() => setMode("decline")}>
              Decline
            </Button>
          </div>
        )}

        {mode === "info" && (
          <div className="mt-6 flex flex-col gap-2">
            <label className="text-sm font-medium text-ink">Message to customer</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="rounded-[--radius-md] border border-border-strong p-2 text-sm"
              placeholder="e.g. Could you confirm if the leak is active or just a slow drip?"
            />
            <div className="mt-1 flex gap-2">
              <Button variant="outline" onClick={() => setMode(null)}>Cancel</Button>
              <Button onClick={() => onRequestInfo(message)} disabled={!message.trim()}>Send request</Button>
            </div>
          </div>
        )}

        {mode === "decline" && (
          <div className="mt-6 flex flex-col gap-2">
            <label className="text-sm font-medium text-ink">Reason for declining</label>
            <select value={reason} onChange={(e) => setReason(e.target.value)} className="rounded-[--radius-md] border border-border-strong p-2 text-sm">
              {DECLINE_REASONS.map((r) => (<option key={r} value={r}>{r}</option>))}
            </select>
            <div className="mt-1 flex gap-2">
              <Button variant="outline" onClick={() => setMode(null)}>Cancel</Button>
              <Button className="border-danger/40 bg-danger text-white hover:bg-danger-strong" onClick={() => onDecline(reason)}>
                Confirm decline
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}