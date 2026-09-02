// Shared date/scheduling helpers used by the admin Calendar (Requirements
// doc Sec 2.5: Day/Week/Month views, conflict detection, buffer time).

export function toDateOnly(d) {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function formatISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Returns an array of 7 ISO date strings (Mon-Sun) for the week
// containing `isoDate`.
export function getWeekDates(isoDate) {
  const d = new Date(isoDate + "T00:00:00");
  const dayOfWeek = (d.getDay() + 6) % 7; // 0 = Monday
  const monday = new Date(d);
  monday.setDate(d.getDate() - dayOfWeek);
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    return formatISO(day);
  });
}

// Returns a 6x7 matrix of ISO date strings covering the full calendar
// grid for the month containing `isoDate` (including leading/trailing
// days from adjacent months so every week row is complete).
export function getMonthMatrix(isoDate) {
  const d = new Date(isoDate + "T00:00:00");
  const firstOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7; // Monday-first
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(firstOfMonth.getDate() - startOffset);

  const weeks = [];
  let cursor = new Date(gridStart);
  for (let w = 0; w < 6; w++) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push({
        iso: formatISO(cursor),
        inMonth: cursor.getMonth() === d.getMonth(),
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

// True if `staffId` already has a different booking at date/time.
export function hasConflict(bookings, staffId, date, time, excludeBookingId) {
  return bookings.some(
    (b) =>
      b.id !== excludeBookingId &&
      b.date === date &&
      b.time === time &&
      b.staffIds?.includes(staffId) &&
      !["Cancelled", "Declined"].includes(b.status)
  );
}

// True if placing `staffId` at `time` would leave less than the
// required buffer before/after their adjacent job that day. Since our
// slots are fixed hourly steps, we treat any directly-adjacent slot
// (one hour before/after) as violating a nonzero buffer requirement.
export function hasBufferViolation(bookings, staffId, date, time, bufferMinutes, timeSlots, excludeBookingId) {
  if (!bufferMinutes || bufferMinutes <= 0) return false;
  const idx = timeSlots.indexOf(time);
  if (idx === -1) return false;

  const neighbourSlots = [timeSlots[idx - 1], timeSlots[idx + 1]].filter(Boolean);
  return bookings.some(
    (b) =>
      b.id !== excludeBookingId &&
      b.date === date &&
      b.staffIds?.includes(staffId) &&
      neighbourSlots.includes(b.time) &&
      !["Cancelled", "Declined"].includes(b.status)
  );
}