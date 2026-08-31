import { Wrench, Zap, SprayCan } from "lucide-react";

export const SERVICES = [
  {
    id: "plumbing",
    label: "Plumbing",
    price: "From $85/hr",
    description: "Leaks, installs, and repairs handled by vetted, licensed plumbers.",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1676210134188-4c05dd172f89?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    id: "electrical",
    label: "Electrical",
    price: "From $95/hr",
    description: "Safe, code-compliant electrical work for homes and small businesses.",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    id: "cleaning",
    label: "Cleaning",
    price: "From $120 fixed",
    description: "Regular or one-off cleans, tailored to your space and schedule.",
    icon: SprayCan,
    image: "https://images.unsplash.com/photo-1758273238415-01ec03d9ef27?auto=format&fit=crop&w=800&h=600&q=80",
  },
];

export const SERVICE_IMAGES = {
  plumbing: "https://images.unsplash.com/photo-1676210134188-4c05dd172f89?auto=format&fit=crop&w=400&h=300&q=75",
  electrical: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&h=300&q=75",
  cleaning: "https://images.unsplash.com/photo-1758273238415-01ec03d9ef27?auto=format&fit=crop&w=400&h=300&q=75",
};

export const SERVICE_QUESTIONS = {
  plumbing: [
    {
      id: "issueType",
      label: "What type of plumbing issue is it?",
      type: "select",
      options: ["Leak", "Blocked drain", "Installation", "Hot water system", "Other"],
    },
    {
      id: "urgency",
      label: "How urgent is it?",
      type: "select",
      options: ["Just a routine fix", "Needs attention this week", "Urgent - active leak/damage"],
    },
  ],
  electrical: [
    {
      id: "issueType",
      label: "What type of electrical issue is it?",
      type: "select",
      options: ["Power outage", "Faulty wiring", "New installation", "Switchboard upgrade", "Other"],
    },
    {
      id: "propertyType",
      label: "Property type",
      type: "select",
      options: ["House", "Apartment", "Small business"],
    },
  ],
  cleaning: [
    {
      id: "cleanType",
      label: "What type of clean do you need?",
      type: "select",
      options: ["Regular clean", "Deep clean", "Move-in / move-out clean"],
    },
    {
      id: "rooms",
      label: "Number of rooms",
      type: "select",
      options: ["1-2 rooms", "3-4 rooms", "5+ rooms"],
    },
  ],
};

export const AU_STATES = [
  "New South Wales",
  "Victoria",
  "Queensland",
  "Western Australia",
  "South Australia",
  "Tasmania",
  "Australian Capital Territory",
  "Northern Territory",
];

export const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];