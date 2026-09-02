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

// Which statuses an admin is allowed to move a booking into from its
// current status. Used by the admin dashboard to decide which action
// buttons to show (Requirements doc Sec 2.2 - exactly three review
// outcomes: Confirm / Request more info / Decline).
export const STATUS_TRANSITIONS = {
  "Pending": ["Confirmed", "Needs Info", "Declined"],
  "Needs Info": ["Confirmed", "Declined"],
  "Confirmed": ["In Progress", "Cancelled"],
  "In Progress": ["Completed", "No-show"],
  "Completed": [],
  "Cancelled": [],
  "Declined": [],
  "No-show": [],
};

// Reasons an admin can pick when declining or cancelling - used to
// power the "top reasons" stat in Sec 2.6.
export const DECLINE_REASONS = [
  "Outside serviceable area",
  "Fully booked that day",
  "Incomplete/unclear details",
  "Duplicate booking",
  "Other",
];

export const STAFF = [
  { id: "staff-1", name: "Marcus Lee", service: "Plumbing", capacityPerDay: 4 },
  { id: "staff-2", name: "Priya Nair", service: "Electrical", capacityPerDay: 4 },
  { id: "staff-3", name: "Chloe Adams", service: "Cleaning", capacityPerDay: 5 },
];

// Admin-configurable buffer time between jobs, per service (Answer #9:
// admin can set/change this dynamically; it can vary by service).
export const DEFAULT_BUFFER_MINUTES = {
  Plumbing: 30,
  Electrical: 30,
  Cleaning: 15,
};

export const BOOKINGS = [
  {
    id: "BK-1001", customer: "John Smith", email: "john.smith@example.com", phone: "0412 345 001",
    service: "Plumbing", staffIds: ["staff-1"], date: "2026-08-31", time: "9:00 AM", status: "Confirmed",
    state: "New South Wales", address: "12 Example Street, Parramatta NSW 2150",
    notes: "Kitchen tap leaking, needs a look this week.", adminNotes: "", price: "From $85/hr",
    paymentMethod: "Stripe", paymentStatus: "Paid",
    submittedAt: "2026-08-29T09:12:00", decidedAt: "2026-08-29T10:40:00", history: [],
  },
  {
    id: "BK-1002", customer: "Aisha Khan", email: "aisha.khan@example.com", phone: "0412 345 002",
    service: "Electrical", staffIds: ["staff-2"], date: "2026-08-31", time: "11:00 AM", status: "Pending",
    state: "Victoria", address: "44 Bourke Street, Melbourne VIC 3000",
    notes: "Switchboard keeps tripping.", adminNotes: "", price: "From $95/hr",
    paymentMethod: null, paymentStatus: "Unpaid",
    submittedAt: "2026-08-30T14:02:00", decidedAt: null, history: [],
  },
  {
    id: "BK-1003", customer: "Liam Brown", email: "liam.brown@example.com", phone: "0412 345 003",
    service: "Cleaning", staffIds: ["staff-3"], date: "2026-08-31", time: "1:00 PM", status: "In Progress",
    state: "Queensland", address: "7 River Road, Brisbane QLD 4000",
    notes: "Move-out clean, keys with agent.", adminNotes: "Spoke to agent, keys under mat.", price: "From $120 fixed",
    paymentMethod: "Cash", paymentStatus: "Unpaid",
    submittedAt: "2026-08-28T08:30:00", decidedAt: "2026-08-28T09:00:00", history: [],
  },
  {
    id: "BK-1004", customer: "Sara Wilson", email: "sara.wilson@example.com", phone: "0412 345 004",
    service: "Plumbing", staffIds: ["staff-1"], date: "2026-08-31", time: "2:00 PM", status: "Needs Info",
    state: "New South Wales", address: "3 Ocean Ave, Bondi NSW 2026",
    notes: "Not sure if it's a blocked drain or the hot water system.", adminNotes: "", price: "From $85/hr",
    paymentMethod: null, paymentStatus: "Unpaid",
    submittedAt: "2026-08-30T16:20:00", decidedAt: "2026-08-30T17:05:00", history: [],
  },
  {
    id: "BK-1005", customer: "Omar Farooq", email: "omar.farooq@example.com", phone: "0412 345 005",
    service: "Electrical", staffIds: ["staff-2"], date: "2026-08-31", time: "3:00 PM", status: "Completed",
    state: "Western Australia", address: "9 Hay Street, Perth WA 6000",
    notes: "New power point installation.", adminNotes: "", price: "From $95/hr",
    paymentMethod: "Stripe", paymentStatus: "Paid",
    submittedAt: "2026-08-27T11:00:00", decidedAt: "2026-08-27T11:45:00", history: [],
  },
  {
    id: "BK-1006", customer: "Emma Davis", email: "emma.davis@example.com", phone: "0412 345 006",
    service: "Cleaning", staffIds: ["staff-3"], date: "2026-09-01", time: "10:00 AM", status: "Cancelled",
    state: "South Australia", address: "21 Rundle Street, Adelaide SA 5000",
    notes: "", adminNotes: "Customer cancelled by phone.", price: "From $120 fixed",
    paymentMethod: null, paymentStatus: "Unpaid",
    submittedAt: "2026-08-29T10:00:00", decidedAt: "2026-08-29T10:15:00", history: [],
  },
  {
    id: "BK-1007", customer: "Noah Clark", email: "noah.clark@example.com", phone: "0412 345 007",
    service: "Plumbing", staffIds: ["staff-1"], date: "2026-09-01", time: "12:00 PM", status: "Declined",
    state: "Tasmania", address: "5 Elizabeth Street, Hobart TAS 7000",
    notes: "Outside serviceable area.", adminNotes: "", price: "From $85/hr",
    paymentMethod: null, paymentStatus: "Unpaid", declineReason: "Outside serviceable area",
    submittedAt: "2026-08-29T13:00:00", decidedAt: "2026-08-29T13:30:00", history: [],
  },
  {
    id: "BK-1008", customer: "Zara Ahmed", email: "zara.ahmed@example.com", phone: "0412 345 008",
    service: "Electrical", staffIds: ["staff-2"], date: "2026-09-01", time: "4:00 PM", status: "No-show",
    state: "Australian Capital Territory", address: "1 Commonwealth Ave, Canberra ACT 2600",
    notes: "", adminNotes: "No answer at the door, called twice.", price: "From $95/hr",
    paymentMethod: null, paymentStatus: "Unpaid",
    submittedAt: "2026-08-28T09:00:00", decidedAt: "2026-08-28T09:20:00", history: [],
  },
  {
    id: "BK-1009", customer: "Grace Kim", email: "grace.kim@example.com", phone: "0412 345 009",
    service: "Cleaning", staffIds: ["staff-3"], date: "2026-09-02", time: "9:00 AM", status: "Pending",
    state: "New South Wales", address: "18 King Street, Sydney NSW 2000",
    notes: "Two bedroom apartment, standard clean.", adminNotes: "", price: "From $120 fixed",
    paymentMethod: null, paymentStatus: "Unpaid",
    submittedAt: "2026-08-31T09:00:00", decidedAt: null, history: [],
  },
  {
    id: "BK-1010", customer: "Ryan Cole", email: "ryan.cole@example.com", phone: "0412 345 010",
    service: "Plumbing", staffIds: ["staff-1"], date: "2026-09-02", time: "10:00 AM", status: "Declined",
    state: "Northern Territory", address: "2 Mitchell Street, Darwin NT 0800",
    notes: "", adminNotes: "", price: "From $85/hr",
    paymentMethod: null, paymentStatus: "Unpaid", declineReason: "Outside serviceable area",
    submittedAt: "2026-08-30T09:00:00", decidedAt: "2026-08-30T09:30:00", history: [],
  },
  ...["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((letter, i) => ({
    id: `BK-102${i}`,
    customer: `Guest ${letter}`,
    email: `guest${letter.toLowerCase()}@example.com`,
    phone: `0412 345 0${20 + i}`,
    service: "Cleaning",
    staffIds: ["staff-3"],
    date: "2026-09-03",
    time: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"][i],
    status: "Confirmed",
    state: "New South Wales",
    address: `${9 + i} Test Street, Sydney NSW 2000`,
    notes: "",
    adminNotes: "",
    price: "From $120 fixed",
    paymentMethod: "Cash",
    paymentStatus: "Unpaid",
    submittedAt: "2026-08-30T09:00:00",
    decidedAt: "2026-08-30T09:30:00",
    history: [],
  })),
];