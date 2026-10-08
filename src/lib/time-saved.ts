import type { AiTool } from "./prompts";

// Estimated minutes saved per completed AI task (estimates only).
export const MINUTES_SAVED: Record<AiTool, number> = {
  email: 10,
  schedule: 30,
  meeting: 20,
  research: 25,
  chat: 5,
};

const KEY = "sparklecore-time-saved";
// Demo baseline so the dashboard is meaningful on first visit.
export const BASELINE_MINUTES = 275;

export function getTimeSaved(): { minutes: number; counts: Record<string, number> } {
  if (typeof window === "undefined") return { minutes: BASELINE_MINUTES, counts: {} };
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || "{}");
    return { minutes: BASELINE_MINUTES + (data.minutes || 0), counts: data.counts || {} };
  } catch {
    return { minutes: BASELINE_MINUTES, counts: {} };
  }
}

export function recordTimeSaved(tool: AiTool) {
  if (typeof window === "undefined") return;
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || "{}");
    data.minutes = (data.minutes || 0) + MINUTES_SAVED[tool];
    data.counts = { ...(data.counts || {}), [tool]: ((data.counts || {})[tool] || 0) + 1 };
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function formatMinutes(m: number) {
  const h = Math.floor(m / 60);
  const r = m % 60;
  return h ? `${h} hour${h === 1 ? "" : "s"} ${r} minutes` : `${r} minutes`;
}
