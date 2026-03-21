import { stepsForRole } from "./steps";
import type { OnboardingAnswers, OnboardingRole } from "./types";

function isNonEmpty(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidUrl(value: string): boolean {
  try {
    const u = new URL(value.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateAnswers(role: OnboardingRole, answers: OnboardingAnswers): string | null {
  const steps = stepsForRole(role);
  for (const step of steps) {
    const raw = answers[step.id];
    if (step.optional) continue;
    if (!isNonEmpty(raw)) {
      return `Missing: ${step.label}`;
    }
    if (step.kind === "email" && raw && !isValidEmail(raw)) {
      return "Please enter a valid email address.";
    }
    if (step.kind === "url" && raw && !isValidUrl(raw)) {
      return "Please enter a valid URL (https://…).";
    }
  }
  return null;
}

export function normalizeAnswers(role: OnboardingRole, answers: OnboardingAnswers): OnboardingAnswers {
  const steps = stepsForRole(role);
  const next: OnboardingAnswers = {};
  for (const step of steps) {
    const v = answers[step.id];
    if (typeof v === "string") {
      const t = v.trim();
      if (t.length > 0) next[step.id] = t;
    }
  }
  return next;
}
