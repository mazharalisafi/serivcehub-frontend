const DRAFT_KEY = 'booking_draft';

export function getDraft() {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(DRAFT_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

export function saveDraft(newData) {
  if (typeof window === 'undefined') return {};
  try {
    const current = getDraft() || {};
    const updated = { ...current, ...newData };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save draft:', e);
    return {};
  }
}

export function clearDraft() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(DRAFT_KEY);
}

// Fixed Step Validation Guard to prevent backward redirects
export function isStepComplete(draft, stepNumber) {
  if (!draft) return true; // Allow navigation
  switch (stepNumber) {
    case 1:
      return Boolean(draft.serviceId || draft.serviceName);
    case 2:
      return true; // Don't block details
    case 3:
      return true; // Don't block location
    case 4:
      return true; // Don't block datetime
    case 5:
      return true; // Don't block contact
    default:
      return true;
  }
}