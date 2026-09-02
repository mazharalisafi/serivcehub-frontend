"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutList, CalendarDays, LogOut, ShieldCheck, ListChecks, Settings2, BarChart3,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { StatCard } from "@/components/admin/StatCard";
import { BookingDetailModal } from "@/components/admin/BookingDetailModal";
import { Calendar } from "@/components/admin/Calendar";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { BOOKINGS as INITIAL_BOOKINGS, STAFF, DEFAULT_BUFFER_MINUTES } from "@/lib/mockData";
import { TIME_SLOTS } from "@/lib/serviceQuestions";

const PENDING_STATUSES = ["Pending", "Needs Info"];
const TODAY = "2026-09-01"; // demo "today" - matches the seeded mock data
const NON_ACTIVE = ["Cancelled", "Declined", "Completed"];

function averageResponseMinutes(bookings) {
  const decided = bookings.filter((b) => b.submittedAt && b.decidedAt);
  if (decided.length === 0) return null;
  const total = decided.reduce((sum, b) => sum + (new Date(b.decidedAt) - new Date(b.submittedAt)) / 60000, 0);
  return Math.round(total / decided.length);
}

function formatMinutes(mins) {
  if (mins == null) return "-";
  return mins < 60 ? `${mins} min` : `${(mins / 60).toFixed(1)} hrs`;
}

function endOfWeek(iso) {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + 6);
  return d.toISOString().slice(0, 10);
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState("queue");
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [selectedId, setSelectedId] = useState(null);
  const [rangeStart, setRangeStart] = useState("2026-08-01");
  const [rangeEnd, setRangeEnd] = useState("2026-09-30");
  const [bufferByService, setBufferByService] = useState(DEFAULT_BUFFER_MINUTES);

  useEffect(() => {
    const isAuthed = window.localStorage.getItem("sh_admin_auth") === "true";
    if (!isAuthed) router.replace("/admin-login");
    else setChecked(true);
  }, [router]);

  function handleSignOut() {
    window.localStorage.removeItem("sh_admin_auth");
    router.push("/admin-login");
  }

  // Applies an admin decision to a booking - stamps decidedAt the first
  // time a decision is made and appends a line to its edit history
  // (Answer #6: reschedules/status changes are tracked as history, not
  // as separate statuses).
  function handleUpdateStatus(id, newStatus, reason) {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const line = reason
          ? `${new Date().toLocaleString()}: ${b.status} -> ${newStatus} (${reason})`
          : `${new Date().toLocaleString()}: ${b.status} -> ${newStatus}`;
        return {
          ...b,
          status: newStatus,
          declineReason: newStatus === "Declined" ? reason : b.declineReason,
          decidedAt: b.decidedAt || new Date().toISOString(),
          history: [...(b.history || []), line],
        };
      })
    );
  }

  // Generic patch used for admin notes, payment status, and reschedule.
  function handleUpdateBooking(id, patch) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  }

  const rangedBookings = useMemo(
    () => bookings.filter((b) => b.date >= rangeStart && b.date <= rangeEnd),
    [bookings, rangeStart, rangeEnd]
  );

  const stats = useMemo(() => {
    const counts = {};
    rangedBookings.forEach((b) => { counts[b.status] = (counts[b.status] || 0) + 1; });

    const todayCount = bookings.filter((b) => b.date === TODAY && !NON_ACTIVE.includes(b.status)).length;
    const weekEnd = endOfWeek(TODAY);
    const weekCount = bookings.filter((b) => b.date >= TODAY && b.date <= weekEnd && !NON_ACTIVE.includes(b.status)).length;

    const declinedOrCancelled = rangedBookings.filter((b) => ["Declined", "Cancelled"].includes(b.status));
    const declineRate = rangedBookings.length ? Math.round((declinedOrCancelled.length / rangedBookings.length) * 100) : 0;

    const reasonCounts = {};
    declinedOrCancelled.forEach((b) => {
      const reason = b.declineReason || "No reason given";
      reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
    });
    const topReasons = Object.entries(reasonCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

    const utilisation = STAFF.map((s) => {
      const assigned = rangedBookings.filter((b) => b.staffIds?.includes(s.id) && !NON_ACTIVE.includes(b.status)).length;
      const days = Math.max(1, Math.round((new Date(rangeEnd) - new Date(rangeStart)) / 86400000) + 1);
      const capacity = s.capacityPerDay * days;
      return { ...s, assigned, capacity, pct: capacity ? Math.round((assigned / capacity) * 100) : 0 };
    });

    return {
      counts,
      pendingCount: (counts["Pending"] || 0) + (counts["Needs Info"] || 0),
      todayCount,
      weekCount,
      avgResponse: averageResponseMinutes(rangedBookings),
      declineRate,
      topReasons,
      utilisation,
    };
  }, [rangedBookings, bookings, rangeStart, rangeEnd]);

  const queue = useMemo(
    () => bookings.filter((b) => PENDING_STATUSES.includes(b.status)).sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt)),
    [bookings]
  );

  const selectedBooking = bookings.find((b) => b.id === selectedId) || null;
  const selectedStaffNames = selectedBooking?.staffIds?.map((id) => STAFF.find((s) => s.id === id)?.name).filter(Boolean).join(", ");
  const selectedBuffer = selectedBooking ? bufferByService[selectedBooking.service] ?? 0 : 0;

  if (!checked) {
    return <div className="flex min-h-[calc(100vh-64px)] items-center justify-center"><p className="text-sm text-ink-muted">Checking session...</p></div>;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-brand-50">
            <ShieldCheck className="size-5 text-brand-600" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-ink">Admin Dashboard</h1>
            <p className="text-sm text-ink-muted">{bookings.length} total bookings</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleSignOut}><LogOut className="size-4" /> Sign out</Button>
      </div>

      {/* Date range filter for the stats below - Requirements doc Sec 2.6 */}
      <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
        <BarChart3 className="size-4 text-ink-faint" />
        <span className="text-ink-muted">Stats for</span>
        <input type="date" value={rangeStart} onChange={(e) => setRangeStart(e.target.value)} className="rounded-[--radius-md] border border-border-strong px-2 py-1" />
        <span className="text-ink-muted">to</span>
        <input type="date" value={rangeEnd} onChange={(e) => setRangeEnd(e.target.value)} className="rounded-[--radius-md] border border-border-strong px-2 py-1" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Awaiting review" value={stats.pendingCount} hint="Pending + Needs Info (all time)" tone="warn" />
        <StatCard label="Jobs today" value={stats.todayCount} hint={`Jobs this week: ${stats.weekCount}`} tone="brand" />
        <StatCard label="Avg. response time" value={formatMinutes(stats.avgResponse)} hint="Submission to decision, in range" />
        <StatCard label="Decline / cancel rate" value={`${stats.declineRate}%`} hint="Of bookings in range" tone={stats.declineRate > 20 ? "danger" : "default"} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {Object.entries(stats.counts).map(([status, count]) => (
          <span key={status} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1">
            <StatusBadge status={status} /> <span className="font-semibold text-ink">{count}</span>
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[--radius-lg] border border-border bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Top decline/cancel reasons</p>
          {stats.topReasons.length === 0 ? (
            <p className="mt-2 text-sm text-ink-muted">None in this range.</p>
          ) : (
            <ul className="mt-2 space-y-1 text-sm">
              {stats.topReasons.map(([reason, count]) => (
                <li key={reason} className="flex justify-between"><span className="text-ink-muted">{reason}</span><span className="font-semibold text-ink">{count}</span></li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-[--radius-lg] border border-border bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Staff utilisation (in range)</p>
          <ul className="mt-2 space-y-2 text-sm">
            {stats.utilisation.map((s) => (
              <li key={s.id}>
                <div className="flex justify-between"><span className="text-ink-muted">{s.name}</span><span className="font-semibold text-ink">{s.assigned}/{s.capacity} ({s.pct}%)</span></div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full bg-brand-500" style={{ width: `${Math.min(100, s.pct)}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 inline-flex rounded-[--radius-md] border border-border bg-surface p-1">
        <button onClick={() => setTab("queue")} className={cn("flex items-center gap-2 rounded-[--radius-sm] px-4 py-2 text-sm font-medium transition-colors", tab === "queue" ? "bg-brand-600 text-white" : "text-ink-muted hover:text-ink")}>
          <ListChecks className="size-4" /> Review Queue
          {stats.pendingCount > 0 && <span className="ml-1 rounded-full bg-white/20 px-1.5 text-xs">{stats.pendingCount}</span>}
        </button>
        <button onClick={() => setTab("bookings")} className={cn("flex items-center gap-2 rounded-[--radius-sm] px-4 py-2 text-sm font-medium transition-colors", tab === "bookings" ? "bg-brand-600 text-white" : "text-ink-muted hover:text-ink")}>
          <LayoutList className="size-4" /> All Bookings
        </button>
        <button onClick={() => setTab("calendar")} className={cn("flex items-center gap-2 rounded-[--radius-sm] px-4 py-2 text-sm font-medium transition-colors", tab === "calendar" ? "bg-brand-600 text-white" : "text-ink-muted hover:text-ink")}>
          <CalendarDays className="size-4" /> Calendar
        </button>
        <button onClick={() => setTab("settings")} className={cn("flex items-center gap-2 rounded-[--radius-sm] px-4 py-2 text-sm font-medium transition-colors", tab === "settings" ? "bg-brand-600 text-white" : "text-ink-muted hover:text-ink")}>
          <Settings2 className="size-4" /> Settings
        </button>
      </div>

      {tab === "queue" && (
        <div className="mt-6 space-y-3">
          {queue.length === 0 ? (
            <p className="rounded-[--radius-lg] border border-dashed border-border p-8 text-center text-sm text-ink-muted">Nothing waiting on review right now.</p>
          ) : (
            queue.map((b) => (
              <button key={b.id} onClick={() => setSelectedId(b.id)} className="flex w-full items-center justify-between gap-4 rounded-[--radius-lg] border border-border bg-surface p-4 text-left transition-colors hover:border-brand-300">
                <div>
                  <div className="flex items-center gap-2"><p className="font-semibold text-ink">{b.id}</p><StatusBadge status={b.status} /></div>
                  <p className="mt-0.5 text-sm text-ink-muted">{b.customer} - {b.service} - {b.date} at {b.time}</p>
                </div>
                <span className="text-xs text-ink-faint">Submitted {new Date(b.submittedAt).toLocaleString()}</span>
              </button>
            ))
          )}
        </div>
      )}

      {tab === "bookings" && (
        <div className="mt-6 overflow-x-auto rounded-[--radius-lg] border border-border bg-surface">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-ink-faint">
                <th className="px-4 py-3 font-semibold">Booking ID</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Staff</th>
                <th className="px-4 py-3 font-semibold">Date & Time</th>
                <th className="px-4 py-3 font-semibold">Payment</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const names = b.staffIds?.map((id) => STAFF.find((s) => s.id === id)?.name).filter(Boolean).join(", ");
                return (
                  <tr key={b.id} onClick={() => setSelectedId(b.id)} className="cursor-pointer border-b border-border last:border-0 hover:bg-canvas">
                    <td className="px-4 py-3 font-medium text-ink">{b.id}</td>
                    <td className="px-4 py-3 text-ink-muted">{b.customer}</td>
                    <td className="px-4 py-3 text-ink-muted">{b.service}</td>
                    <td className="px-4 py-3 text-ink-muted">{names}</td>
                    <td className="px-4 py-3 text-ink-muted">{b.date} · {b.time}</td>
                    <td className="px-4 py-3"><StatusBadge status={b.paymentStatus === "Paid" ? "Completed" : "Pending"} /></td>
                    <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === "calendar" && (
        <div className="mt-6">
          <Calendar bookings={bookings} staff={STAFF} timeSlots={TIME_SLOTS} onSelectBooking={setSelectedId} />
        </div>
      )}

      {tab === "settings" && (
        <div className="mt-6 max-w-md rounded-[--radius-lg] border border-border bg-surface p-4">
          <p className="text-sm font-semibold text-ink">Buffer time between jobs (minutes)</p>
          <p className="mt-0.5 text-xs text-ink-muted">Answer #9: buffer can be set per service and changed anytime.</p>
          <div className="mt-3 space-y-2">
            {Object.keys(bufferByService).map((service) => (
              <div key={service} className="flex items-center justify-between gap-3">
                <span className="text-sm text-ink-muted">{service}</span>
                <input
                  type="number"
                  min={0}
                  step={5}
                  value={bufferByService[service]}
                  onChange={(e) => setBufferByService((prev) => ({ ...prev, [service]: Number(e.target.value) }))}
                  className="w-20 rounded-[--radius-md] border border-border-strong px-2 py-1 text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          staffNames={selectedStaffNames}
          staffList={STAFF}
          allBookings={bookings}
          bufferMinutes={selectedBuffer}
          onClose={() => setSelectedId(null)}
          onUpdateStatus={(id, status, reason) => { handleUpdateStatus(id, status, reason); setSelectedId(null); }}
          onUpdateBooking={handleUpdateBooking}
        />
      )}
    </section>
  );
}