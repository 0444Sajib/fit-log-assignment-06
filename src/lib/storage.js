const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

export function getPlan() {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(PLAN_KEY)) || [];
  } catch {
    return [];
  }
}

export function getSaved() {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY)) || [];
  } catch {
    return [];
  }
}

export function savePlan(plan) {
  localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  window.dispatchEvent(new Event("fitlog-storage-update"));
}

export function saveSaved(saved) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  window.dispatchEvent(new Event("fitlog-storage-update"));
}