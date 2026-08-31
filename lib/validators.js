const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(\+?61|0)[2-478]\d{8}$/;

export function validateEmail(value) {
  if (!value?.trim()) return "Email is required.";
  if (!EMAIL_RE.test(value.trim())) return "Enter a valid email address.";
  return "";
}

export function validatePhone(value) {
  const cleaned = value?.trim().replace(/[\s()-]/g, "");
  if (!cleaned) return "Phone number is required.";
  if (!PHONE_RE.test(cleaned)) return "Enter a valid Australian phone number.";
  return "";
}

export function validateRequired(value, label = "This field") {
  if (!value?.trim()) return `${label} is required.`;
  return "";
}

export function validateMinLength(value, min, label = "This field") {
  if (value && value.trim().length < min) return `${label} must be at least ${min} characters.`;
  return "";
}

export function isValidCalendarDate(value) {
  if (!value) return false;
  const [year, month, day] = value.split("-").map(Number);
  const d = new Date(value + "T00:00:00");
  return d.getFullYear() === year && d.getMonth() + 1 === month && d.getDate() === day;
}