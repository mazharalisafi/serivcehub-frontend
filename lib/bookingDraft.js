const KEY = "sh_booking_draft";

export function getDraft() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.sessionStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function saveDraft(partial) {
  const next = { ...getDraft(), ...partial };
  window.sessionStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function clearDraft() {
  window.sessionStorage.removeItem(KEY);
}