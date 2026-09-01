"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutList, CalendarDays, LogOut, ShieldCheck, Gauge,
  Clock, XCircle, TrendingUp, Users,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { BookingDetailPanel } from "@/components/admin/BookingDetailPanel";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { BOOKINGS as INITIAL_BOOKINGS, STAFF, TIME_SLOTS } from "@/lib/mockData";

function staffNameFor(id) {
  return STAFF.find((s) => s.id === id)?.name || "Unassigned";
}

function minutesBetween(a, b) {
  if (!a || !b) return null;
  return Math.round((new Date(b) - new Date(a)) / 60000);
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState("overview");
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [selectedId, setSelectedId] = useState(null);
  const [staffFilter, setStaffFilter] = useState("all");
  const [calendarView, setCalendarView] = useState("day");

  const dates = useMemo(() => [...new Set(bookings.map((b) => b.date))].sort(), [bookings]);
  const [activeDate, setActiveDate] = useState(dates[0]);

  useEffect(() => {
    const isAuthed = window.localStorage.getItem("sh_admin_auth") === "true";
    if (!isAuthed) {
      router.replace("/admin-login");
    } else {
      setChecked(true);
    }
  }, [router]);

  function handleSignOut() {
    window.localStorage.removeItem("sh_admin_auth");
    router.push("/admin-login");
  }

  const selected = bookings.find((b) => b.id === selectedId) || null;

  const conflict = useMemo(() => {
    if (!selected) return false;
    return bookings.some(
      (b) =>
        b.id !== selected.id &&
        b.staffId === selected.staffId &&
        b.date === selected.date &&
        b.time === selected.time &&
        b.status === "Confirmed"
    );
  }, [selected, bookings]);

  function updateBooking(id, patch) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...patch, decidedAt: b.decidedAt || new Date().toISOString() } : b))
    );
  }

  function handleConfirm() {
    updateBooking(selected.id, { status: "Confirmed" });
    setSelectedId(null);
  }
  function handleRequestInfo(message) {
    updateBooking(selected.id, { status: "Needs Info", internalNotes: `Requested info: "${message}"` });
    setSelectedId(null);
  }
  function handleDecline(reason) {
    updateBooking(selected.id, { status: "Declined", declineReason: reason });
    setSelectedId(null);
  }

  if (!checked) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <p className="text-sm text-ink-muted">Checking session...</p>
      </div>
    );
  }

  const countsByStatus = {};
  for (const b of bookings) countsByStatus[b.status] = (countsByStatus[b.status] || 0) + 1;

  const todayStr = "2026-08-31";
  const upcomingToday = bookings.filter((b) => b.date === todayStr && b.status === "Confirmed").length;
  const upcomingWeek = bookings.filter((b) => b.status === "Confirmed").length;

  const decided = bookings.filter((b) => b.decidedAt);
  const avgResponseMins = decided.length
    ? Math.round(decided.reduce((sum, b) => sum + (minutesBetween(b.submittedAt, b.decidedAt) || 0), 0) / decided.length)
    : 0;

  const declinedOrCancelled = bookings.filter((b) => b.status === "Declined" || b.status === "Cancelled").length;
  const cancellationRate = bookings.length ? Math.round((declinedOrCancelled / bookings.length) * 100) : 0;

  const pendingQueue = bookings
    .filter((b) => b.status === "Pending" || b.status === "Needs Info")
    .sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));

  const filteredForCalendar = staffFilter === "all" ? STAFF : STAFF.filter((s) => s.id === staffFilter);
  const weekDates = dates.slice(0, 7);

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
        <Button variant="outline" onClick={handleSignOut}>
          <LogOut className="size-4" /> Sign out
        </Button>
      </div>

      <div className="mt-8 inline-flex flex-wrap rounded-[--radius-md] border border-border bg-surface p-1">
        {[
          { id: "overview", label: "Overview", icon: Gauge },
          { id: "bookings", label: "Bookings", icon: LayoutList },
          { id: "calendar", label: "Calendar", icon: CalendarDays },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "flex items-center gap-2 rounded-[--radius-sm] px-4 py-2 text-sm font-medium transition-colors",
              tab === id ? "bg-brand-600 text-white" : "text-ink-muted hover:text-ink"
            )}
          >
            <Icon className="size-4" /> {label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="mt-6 flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={Clock} label="Pending review" value={countsByStatus["Pending"] || 0} />
            <StatCard icon={CalendarDays} label="Confirmed (upcoming)" value={upcomingWeek} />
            <StatCard icon={Gauge} label="Avg. response time" value={`${avgResponseMins} min`} />
            <StatCard icon={XCircle} label="Cancellation/decline rate" value={`${cancellationRate}%`} />
          </div>

          <div className="rounded-[--radius-lg] border border-border bg-surface p-5">
            <h3 className="font-display text-sm font-semibold text-ink">Bookings by status</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {Object.entries(countsByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between rounded-[--radius-md] border border-border p-3">
                  <StatusBadge status={status} />
                  <span className="font-display text-lg font-bold text-ink">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[--radius-lg] border border-border bg-surface p-5">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-brand-600" />
              <h3 className="font-display text-sm font-semibold text-ink">Staff utilisation</h3>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {STAFF.map((s) => {
                const jobs = bookings.filter((b) => b.staffId === s.id && b.status !== "Declined" && b.status !== "Cancelled").length;
                return (
                  <div key={s.id} className="rounded-[--radius-md] border border-border p-3">
                    <p className="text-sm font-semibold text-ink">{s.name}</p>
                    <p className="text-xs text-ink-muted">{s.service}</p>
                    <p className="mt-1 text-xs text-brand-600">{jobs} jobs assigned</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {tab === "bookings" && (
        <div className="mt-6 flex flex-col gap-6">
          {pendingQueue.length > 0 && (
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-brand-600" />
                <h3 className="font-display text-sm font-semibold text-ink">
                  Review queue ({pendingQueue.length}) - oldest first
                </h3>
              </div>
              <div className="mt-3 overflow-x-auto rounded-[--radius-lg] border border-border bg-surface">
                <BookingsTable bookings={pendingQueue} onSelect={setSelectedId} />
              </div>
            </div>
          )}

          <div>
            <h3 className="font-display text-sm font-semibold text-ink">All bookings</h3>
            <div className="mt-3 overflow-x-auto rounded-[--radius-lg] border border-border bg-surface">
              <BookingsTable bookings={bookings} onSelect={setSelectedId} />
            </div>
          </div>
        </div>
      )}

      {tab === "calendar" && (
        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              {dates.map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveDate(d)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    activeDate === d ? "bg-brand-600 text-white" : "bg-surface text-ink-muted border border-border hover:text-ink"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <select
                value={staffFilter}
                onChange={(e) => setStaffFilter(e.target.value)}
                className="rounded-[--radius-md] border border-border-strong bg-surface px-3 py-1.5 text-sm"
              >
                <option value="all">All staff</option>
                {STAFF.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <div className="inline-flex rounded-[--radius-md] border border-border bg-surface p-1">
                {["day", "week"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setCalendarView(v)}
                    className={cn(
                      "rounded-[--radius-sm] px-3 py-1 text-xs font-semibold capitalize transition-colors",
                      calendarView === v ? "bg-brand-600 text-white" : "text-ink-muted"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {calendarView === "day" ? (
            <div className="mt-4 overflow-x-auto rounded-[--radius-lg] border border-border bg-surface">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="w-32 border-b border-r border-border p-2 text-left text-xs font-semibold uppercase text-ink-faint">Staff</th>
                    {TIME_SLOTS.map((slot) => (
                      <th key={slot} className="border-b border-border p-2 text-center text-xs font-semibold text-ink-faint">{slot}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredForCalendar.map((staff) => (
                    <tr key={staff.id} className="border-b border-border last:border-0">
                      <td className="border-r border-border p-2 align-top">
                        <p className="text-sm font-semibold text-ink">{staff.name}</p>
                        <p className="text-xs text-ink-muted">{staff.service}</p>
                      </td>
                      {TIME_SLOTS.map((slot) => {
                        const booking = bookings.find(
                          (b) => b.staffId === staff.id && b.date === activeDate && b.time === slot
                        );
                        return (
                          <td key={slot} className="p-1.5 text-center align-top">
                            {booking ? (
                              <button
                                onClick={() => setSelectedId(booking.id)}
                                className="w-full rounded-[--radius-sm] bg-brand-50 p-1.5 text-left hover:bg-brand-100"
                              >
                                <p className="truncate text-[11px] font-semibold text-brand-700">{booking.customer}</p>
                                <div className="mt-1"><StatusBadge status={booking.status} /></div>
                              </button>
                            ) : (
                              <div className="rounded-[--radius-sm] border border-dashed border-border p-3" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {weekDates.map((d) => {
                const dayBookings = bookings.filter(
                  (b) => b.date === d && (staffFilter === "all" || b.staffId === staffFilter)
                );
                return (
                  <div key={d} className="rounded-[--radius-lg] border border-border bg-surface p-4">
                    <p className="text-sm font-semibold text-ink">{d}</p>
                    <div className="mt-2 flex flex-col gap-1.5">
                      {dayBookings.length === 0 ? (
                        <p className="text-xs text-ink-faint">No bookings</p>
                      ) : (
                        dayBookings.map((b) => (
                          <button
                            key={b.id}
                            onClick={() => setSelectedId(b.id)}
                            className="flex items-center justify-between rounded-[--radius-sm] bg-brand-50 px-2 py-1 text-left hover:bg-brand-100"
                          >
                            <span className="text-xs font-medium text-brand-700">{b.time} - {b.customer}</span>
                            <StatusBadge status={b.status} />
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <p className="mt-3 text-xs text-ink-faint">
            Buffer time between jobs: 30 minutes (default, admin-configurable in a later phase).
          </p>
        </div>
      )}

      {selected && (
        <BookingDetailPanel
          booking={selected}
          staffName={staffNameFor(selected.staffId)}
          conflict={conflict}
          onClose={() => setSelectedId(null)}
          onConfirm={handleConfirm}
          onRequestInfo={handleRequestInfo}
          onDecline={handleDecline}
        />
      )}
    </section>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-[--radius-lg] border border-border bg-surface p-4">
      <div className="flex size-10 items-center justify-center rounded-full bg-brand-50">
        <Icon className="size-5 text-brand-600" />
      </div>
      <div>
        <p className="text-xs text-ink-muted">{label}</p>
        <p className="font-display text-lg font-bold text-ink">{value}</p>
      </div>
    </div>
  );
}

function BookingsTable({ bookings, onSelect }) {
  return (
    <table className="w-full min-w-[760px] text-left text-sm">
      <thead>
        <tr className="border-b border-border text-xs uppercase tracking-wide text-ink-faint">
          <th className="px-4 py-3 font-semibold">Booking ID</th>
          <th className="px-4 py-3 font-semibold">Customer</th>
          <th className="px-4 py-3 font-semibold">Service</th>
          <th className="px-4 py-3 font-semibold">Staff</th>
          <th className="px-4 py-3 font-semibold">Date & Time</th>
          <th className="px-4 py-3 font-semibold">Status</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((b) => (
          <tr
            key={b.id}
            onClick={() => onSelect(b.id)}
            className="cursor-pointer border-b border-border last:border-0 hover:bg-canvas"
          >
            <td className="px-4 py-3 font-medium text-ink">{b.id}</td>
            <td className="px-4 py-3 text-ink-muted">{b.customer}</td>
            <td className="px-4 py-3 text-ink-muted">{b.service}</td>
            <td className="px-4 py-3 text-ink-muted">{staffNameFor(b.staffId)}</td>
            <td className="px-4 py-3 text-ink-muted">{b.date} - {b.time}</td>
            <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}