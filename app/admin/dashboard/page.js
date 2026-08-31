"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LayoutList, CalendarDays, LogOut, ShieldCheck } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { BOOKINGS, STAFF, TIME_SLOTS } from "@/lib/mockData";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState("bookings");
  const dates = [...new Set(BOOKINGS.map((b) => b.date))];
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

  if (!checked) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <p className="text-sm text-ink-muted">Checking session...</p>
      </div>
    );
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
            <p className="text-sm text-ink-muted">{BOOKINGS.length} total bookings</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleSignOut}>
          <LogOut className="size-4" /> Sign out
        </Button>
      </div>

      <div className="mt-8 inline-flex rounded-[--radius-md] border border-border bg-surface p-1">
        <button
          onClick={() => setTab("bookings")}
          className={cn(
            "flex items-center gap-2 rounded-[--radius-sm] px-4 py-2 text-sm font-medium transition-colors",
            tab === "bookings" ? "bg-brand-600 text-white" : "text-ink-muted hover:text-ink"
          )}
        >
          <LayoutList className="size-4" /> Bookings
        </button>
        <button
          onClick={() => setTab("calendar")}
          className={cn(
            "flex items-center gap-2 rounded-[--radius-sm] px-4 py-2 text-sm font-medium transition-colors",
            tab === "calendar" ? "bg-brand-600 text-white" : "text-ink-muted hover:text-ink"
          )}
        >
          <CalendarDays className="size-4" /> Calendar
        </button>
      </div>

      {tab === "bookings" ? (
        <div className="mt-6 overflow-x-auto rounded-[--radius-lg] border border-border bg-surface">
          <table className="w-full min-w-[720px] text-left text-sm">
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
              {BOOKINGS.map((b) => {
                const staff = STAFF.find((s) => s.id === b.staffId);
                return (
                  <tr key={b.id} className="border-b border-border last:border-0 hover:bg-canvas">
                    <td className="px-4 py-3 font-medium text-ink">{b.id}</td>
                    <td className="px-4 py-3 text-ink-muted">{b.customer}</td>
                    <td className="px-4 py-3 text-ink-muted">{b.service}</td>
                    <td className="px-4 py-3 text-ink-muted">{staff?.name}</td>
                    <td className="px-4 py-3 text-ink-muted">{b.date} · {b.time}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={b.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6">
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

          <div className="mt-4 overflow-x-auto rounded-[--radius-lg] border border-border bg-surface">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-32 border-b border-r border-border p-2 text-left text-xs font-semibold uppercase text-ink-faint">
                    Staff
                  </th>
                  {TIME_SLOTS.map((slot) => (
                    <th key={slot} className="border-b border-border p-2 text-center text-xs font-semibold text-ink-faint">
                      {slot}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STAFF.map((staff) => (
                  <tr key={staff.id} className="border-b border-border last:border-0">
                    <td className="border-r border-border p-2 align-top">
                      <p className="text-sm font-semibold text-ink">{staff.name}</p>
                      <p className="text-xs text-ink-muted">{staff.service}</p>
                    </td>
                    {TIME_SLOTS.map((slot) => {
                      const booking = BOOKINGS.find(
                        (b) => b.staffId === staff.id && b.date === activeDate && b.time === slot
                      );
                      return (
                        <td key={slot} className="p-1.5 text-center align-top">
                          {booking ? (
                            <div className="rounded-[--radius-sm] bg-brand-50 p-1.5">
                              <p className="truncate text-[11px] font-semibold text-brand-700">{booking.customer}</p>
                              <div className="mt-1">
                                <StatusBadge status={booking.status} />
                              </div>
                            </div>
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
        </div>
      )}
    </section>
  );
}