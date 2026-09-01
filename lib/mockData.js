export const STATUSES = ["Pending", "Needs Info", "Confirmed", "In Progress", "Completed", "Cancelled", "Declined", "No-show"];

export const STAFF = [
  { id: "staff-1", name: "Marcus Lee", service: "Plumbing" },
  { id: "staff-2", name: "Priya Nair", service: "Electrical" },
  { id: "staff-3", name: "Chloe Adams", service: "Cleaning" },
];

export const TIME_SLOTS = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

export const DECLINE_REASONS = ["Out of service area", "Fully booked for requested time", "Service not currently offered", "Other"];

export const BOOKINGS = [
  { id: "BK-1001", customer: "John Smith", email: "john.smith@example.com", phone: "+61 412 345 001", preferredContact: "phone", service: "Plumbing", notes: "Kitchen tap dripping constantly, worse at night.", address: "12 Example Street, Parramatta NSW 2150", staffId: "staff-1", date: "2026-08-31", time: "9:00 AM", status: "Confirmed", submittedAt: "2026-08-28T09:12:00", decidedAt: "2026-08-28T11:40:00", internalNotes: "Regular customer, has spare key arrangement." },
  { id: "BK-1002", customer: "Aisha Khan", email: "aisha.khan@example.com", phone: "+61 423 456 002", preferredContact: "email", service: "Electrical", notes: "Power keeps tripping in the garage circuit.", address: "4 Bay Road, St Kilda VIC 3182", staffId: "staff-2", date: "2026-08-31", time: "11:00 AM", status: "Pending", submittedAt: "2026-08-30T14:05:00", decidedAt: null, internalNotes: "" },
  { id: "BK-1003", customer: "Liam Brown", email: "liam.brown@example.com", phone: "+61 434 567 003", preferredContact: "phone", service: "Cleaning", notes: "Deep clean before move-out inspection.", address: "88 Coast Ave, Manly NSW 2095", staffId: "staff-3", date: "2026-08-31", time: "1:00 PM", status: "In Progress", submittedAt: "2026-08-27T08:30:00", decidedAt: "2026-08-27T09:00:00", internalNotes: "Access via lockbox, code sent to customer." },
  { id: "BK-1004", customer: "Sara Wilson", email: "sara.wilson@example.com", phone: "+61 445 678 004", preferredContact: "phone", service: "Plumbing", notes: "Blocked drain in ensuite bathroom.", address: "21 Hilltop Cres, Chatswood NSW 2067", staffId: "staff-1", date: "2026-08-31", time: "2:00 PM", status: "Needs Info", submittedAt: "2026-08-29T16:20:00", decidedAt: "2026-08-29T17:05:00", internalNotes: "Asked customer to confirm if drain is fully blocked or slow." },
  { id: "BK-1005", customer: "Omar Farooq", email: "omar.farooq@example.com", phone: "+61 456 789 005", preferredContact: "email", service: "Electrical", notes: "Switchboard upgrade quote requested.", address: "9 Riverside Dr, South Bank QLD 4101", staffId: "staff-2", date: "2026-08-31", time: "3:00 PM", status: "Completed", submittedAt: "2026-08-20T10:00:00", decidedAt: "2026-08-20T10:45:00", internalNotes: "Upgraded to 12-circuit board, invoiced separately." },
  { id: "BK-1006", customer: "Emma Davis", email: "emma.davis@example.com", phone: "+61 467 890 006", preferredContact: "phone", service: "Cleaning", notes: "Fortnightly regular clean.", address: "15 Fern St, Fremantle WA 6160", staffId: "staff-3", date: "2026-09-01", time: "10:00 AM", status: "Cancelled", submittedAt: "2026-08-25T12:00:00", decidedAt: "2026-08-26T09:00:00", internalNotes: "Customer cancelled - rescheduling for next fortnight." },
  { id: "BK-1007", customer: "Noah Clark", email: "noah.clark@example.com", phone: "+61 478 901 007", preferredContact: "phone", service: "Plumbing", notes: "New dishwasher installation.", address: "3 Ocean View Tce, Glenelg SA 5045", staffId: "staff-1", date: "2026-09-01", time: "12:00 PM", status: "Declined", submittedAt: "2026-08-29T09:15:00", decidedAt: "2026-08-29T10:00:00", internalNotes: "Address is outside current service radius.", declineReason: "Out of service area" },
  { id: "BK-1008", customer: "Zara Ahmed", email: "zara.ahmed@example.com", phone: "+61 489 012 008", preferredContact: "email", service: "Electrical", notes: "Outdoor lighting installation.", address: "60 Bridge Rd, Richmond VIC 3121", staffId: "staff-2", date: "2026-09-01", time: "4:00 PM", status: "No-show", submittedAt: "2026-08-26T11:00:00", decidedAt: "2026-08-26T13:30:00", internalNotes: "No one home at appointment time, tried calling twice." },
];

const FULLY_BOOKED_DATE = "2026-09-03";
TIME_SLOTS.forEach((slot, i) => {
  BOOKINGS.push({
    id: `BK-2${String(i + 1).padStart(3, "0")}`,
    customer: `Guest ${String.fromCharCode(65 + i)}`,
    email: `guest${i + 1}@example.com`,
    phone: `+61 400 000 0${i + 1}0`,
    preferredContact: "phone",
    service: "Cleaning",
    notes: "Demo booking to show a fully booked date.",
    address: "Demo address, Sydney NSW 2000",
    staffId: "staff-3",
    date: FULLY_BOOKED_DATE,
    time: slot,
    status: "Confirmed",
    submittedAt: "2026-08-15T09:00:00",
    decidedAt: "2026-08-15T09:30:00",
    internalNotes: "",
  });
});