export const STATUSES = [
  "Pending",
  "Needs Info",
  "Confirmed",
  "In Progress",
  "Completed",
  "Cancelled",
  "Declined",
  "No-show",
];

export const STAFF = [
  { id: "staff-1", name: "Marcus Lee", service: "Plumbing" },
  { id: "staff-2", name: "Priya Nair", service: "Electrical" },
  { id: "staff-3", name: "Chloe Adams", service: "Cleaning" },
];

export const TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

export const BOOKINGS = [
  { id: "BK-1001", customer: "John Smith", service: "Plumbing", staffId: "staff-1", date: "2026-08-31", time: "9:00 AM", status: "Confirmed" },
  { id: "BK-1002", customer: "Aisha Khan", service: "Electrical", staffId: "staff-2", date: "2026-08-31", time: "11:00 AM", status: "Pending" },
  { id: "BK-1003", customer: "Liam Brown", service: "Cleaning", staffId: "staff-3", date: "2026-08-31", time: "1:00 PM", status: "In Progress" },
  { id: "BK-1004", customer: "Sara Wilson", service: "Plumbing", staffId: "staff-1", date: "2026-08-31", time: "2:00 PM", status: "Needs Info" },
  { id: "BK-1005", customer: "Omar Farooq", service: "Electrical", staffId: "staff-2", date: "2026-08-31", time: "3:00 PM", status: "Completed" },
  { id: "BK-1006", customer: "Emma Davis", service: "Cleaning", staffId: "staff-3", date: "2026-09-01", time: "10:00 AM", status: "Cancelled" },
  { id: "BK-1007", customer: "Noah Clark", service: "Plumbing", staffId: "staff-1", date: "2026-09-01", time: "12:00 PM", status: "Declined" },
  { id: "BK-1008", customer: "Zara Ahmed", service: "Electrical", staffId: "staff-2", date: "2026-09-01", time: "4:00 PM", status: "No-show" },
  { id: "BK-1009", customer: "Guest A", service: "Cleaning", staffId: "staff-3", date: "2026-09-03", time: "9:00 AM", status: "Confirmed" },
  { id: "BK-1010", customer: "Guest B", service: "Cleaning", staffId: "staff-3", date: "2026-09-03", time: "10:00 AM", status: "Confirmed" },
  { id: "BK-1011", customer: "Guest C", service: "Cleaning", staffId: "staff-3", date: "2026-09-03", time: "11:00 AM", status: "Confirmed" },
  { id: "BK-1012", customer: "Guest D", service: "Cleaning", staffId: "staff-3", date: "2026-09-03", time: "12:00 PM", status: "Confirmed" },
  { id: "BK-1013", customer: "Guest E", service: "Cleaning", staffId: "staff-3", date: "2026-09-03", time: "1:00 PM", status: "Confirmed" },
  { id: "BK-1014", customer: "Guest F", service: "Cleaning", staffId: "staff-3", date: "2026-09-03", time: "2:00 PM", status: "Confirmed" },
  { id: "BK-1015", customer: "Guest G", service: "Cleaning", staffId: "staff-3", date: "2026-09-03", time: "3:00 PM", status: "Confirmed" },
  { id: "BK-1016", customer: "Guest H", service: "Cleaning", staffId: "staff-3", date: "2026-09-03", time: "4:00 PM", status: "Confirmed" },
  { id: "BK-1017", customer: "Guest I", service: "Cleaning", staffId: "staff-3", date: "2026-09-03", time: "5:00 PM", status: "Confirmed" },
];