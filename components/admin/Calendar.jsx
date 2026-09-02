"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { cn } from "@/lib/utils";
import { getWeekDates, getMonthMatrix, formatISO } from "@/lib/scheduling";

const VIEWS = ["Day", "Week", "Month"];

function shiftDate(iso, days) {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  return formatISO(d);
}

// Admin calendar: Day / Week / Month views, optional staff filter,
// colour-coded status chips. Clicking any booking chip opens the
// shared BookingDetailModal (handled by the parent via onSelectBooking).
export function Calendar({ bookings, staff, timeSlots, onSelectBooking }) {
  const [view, setView] = useState("Day");
  const [activeDate, setActiveDate] = useState(() => {
    const dates = [...new Set(bookings.map((b) => b.date))].sort();
    return dates[0] || formatISO(new Date());
  });
  const [staffFilter, setStaffFilter] = useState("all");

  const visibleStaff = staffFilter === "all" ? staff : staff.filter((s) => s.id === staffFilter);

  function goto(delta) {
    if (view === "Day") setActiveDate((d) => shiftDate(d, delta));
    if (view === "Week") setActiveDate((d) => shiftDate(d, delta * 7));
    if (view === "Month") {
      const d = new Date(activeDate + "T00:00:00");
      d.setMonth(d.getMonth() + delta);
      setActiveDate(formatISO(d));
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-[--radius-md] border border-border bg-surface p-1">
          {VIEWS.map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "rounded-[--radius-sm] px-3 py-1.5 text-sm font-medium transition-colors",
                view === v ? "bg-brand-600 text-white" : "text-ink-muted hover:text-ink"
              )}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => goto(-1)} className="flex size-8 items-center justify-center rounded-full border border-border hover:bg-canvas">
            <ChevronLeft className="size-4" />
          </button>
          <span className="min-w-[7rem] text-center text-sm font-medium text-ink">{activeDate}</span>
          <button onClick={() => goto(1)} className="flex size-8 items-center justify-center rounded-full border border-border hover:bg-canvas">
            <ChevronRight className="size-4" />
          </button>
        </div>

        <select
          value={staffFilter}
          onChange={(e) => setStaffFilter(e.target.value)}
          className="rounded-[--radius-md] border border-border-strong bg-surface px-3 py-1.5 text-sm"
        >
          <option value="all">All staff</option>
          {staff.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        {view === "Day" && (
          <DayView bookings={bookings} staff={visibleStaff} timeSlots={timeSlots} date={activeDate} onSelectBooking={onSelectBooking} />
        )}
        {view === "Week" && (
          <WeekView bookings={bookings} staff={visibleStaff} date={activeDate} onSelectBooking={onSelectBooking} />
        )}
        {view === "Month" && (
          <MonthView bookings={bookings} staff={visibleStaff} date={activeDate} onSelectBooking={onSelectBooking} />
        )}
      </div>
    </div>
  );
}

function DayView({ bookings, staff, timeSlots, date, onSelectBooking }) {
  return (
    <div className="overflow-x-auto rounded-[--radius-lg] border border-border bg-surface">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-32 border-b border-r border-border p-2 text-left text-xs font-semibold uppercase text-ink-faint">Staff</th>
            {timeSlots.map((slot) => (
              <th key={slot} className="border-b border-border p-2 text-center text-xs font-semibold text-ink-faint">{slot}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {staff.map((s) => (
            <tr key={s.id} className="border-b border-border last:border-0">
              <td className="border-r border-border p-2 align-top">
                <p className="text-sm font-semibold text-ink">{s.name}</p>
                <p className="text-xs text-ink-muted">{s.service}</p>
              </td>
              {timeSlots.map((slot) => {
                const booking = bookings.find(
                  (b) => b.staffIds?.includes(s.id) && b.date === date && b.time === slot
                );
                return (
                  <td key={slot} className="p-1.5 text-center align-top">
                    {booking ? (
                      <button
                        onClick={() => onSelectBooking(booking.id)}
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
  );
}

function WeekView({ bookings, staff, date, onSelectBooking }) {
  const weekDates = useMemo(() => getWeekDates(date), [date]);
  const staffIds = staff.map((s) => s.id);

  return (
    <div className="overflow-x-auto rounded-[--radius-lg] border border-border bg-surface">
      <table className="w-full min-w-[840px] border-collapse text-sm">
        <thead>
          <tr>
            {weekDates.map((d) => (
              <th key={d} className="border-b border-border p-2 text-center text-xs font-semibold text-ink-faint">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {weekDates.map((d) => {
              const dayBookings = bookings.filter(
                (b) => b.date === d && b.staffIds?.some((id) => staffIds.includes(id))
              );
              return (
                <td key={d} className="min-h-[7rem] border-r border-border p-1.5 align-top last:border-0">
                  <div className="flex flex-col gap-1">
                    {dayBookings.length === 0 && <div className="rounded-[--radius-sm] border border-dashed border-border p-2 text-center text-xs text-ink-faint">-</div>}
                    {dayBookings.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => onSelectBooking(b.id)}
                        className="rounded-[--radius-sm] bg-brand-50 p-1.5 text-left hover:bg-brand-100"
                      >
                        <p className="truncate text-[11px] font-semibold text-brand-700">{b.time} - {b.customer}</p>
                        <div className="mt-0.5"><StatusBadge status={b.status} /></div>
                      </button>
                    ))}
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function MonthView({ bookings, staff, date, onSelectBooking }) {
  const weeks = useMemo(() => getMonthMatrix(date), [date]);
  const staffIds = staff.map((s) => s.id);

  return (
    <div className="overflow-x-auto rounded-[--radius-lg] border border-border bg-surface">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map(({ iso, inMonth }) => {
                const dayBookings = bookings.filter(
                  (b) => b.date === iso && b.staffIds?.some((id) => staffIds.includes(id))
                );
                return (
                  <td
                    key={iso}
                    className={cn(
                      "h-24 w-[14.28%] border border-border align-top p-1.5",
                      !inMonth && "bg-canvas text-ink-faint"
                    )}
                  >
                    <p className="text-xs font-semibold">{Number(iso.slice(-2))}</p>
                    <div className="mt-1 flex flex-col gap-0.5">
                      {dayBookings.slice(0, 3).map((b) => (
                        <button
                          key={b.id}
                          onClick={() => onSelectBooking(b.id)}
                          className="truncate rounded-[--radius-sm] bg-brand-50 px-1 py-0.5 text-left text-[10px] font-medium text-brand-700 hover:bg-brand-100"
                        >
                          {b.time} {b.customer}
                        </button>
                      ))}
                      {dayBookings.length > 3 && (
                        <span className="text-[10px] text-ink-faint">+{dayBookings.length - 3} more</span>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}