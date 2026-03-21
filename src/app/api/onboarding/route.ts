import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { persistSubmission } from "@/lib/onboarding/persist";
import { normalizeAnswers, validateAnswers } from "@/lib/onboarding/validate";
import type { OnboardingAnswers, OnboardingRole } from "@/lib/onboarding/types";

const ROLES: OnboardingRole[] = ["artist", "label", "platform"];

function isRole(value: unknown): value is OnboardingRole {
  return typeof value === "string" && (ROLES as string[]).includes(value);
}

function isAnswers(value: unknown): value is OnboardingAnswers {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  return true;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const { role, answers, website } = body as Record<string, unknown>;

  if (typeof website === "string" && website.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (!isRole(role)) {
    return NextResponse.json({ error: "Invalid role." }, { status: 400 });
  }

  if (!isAnswers(answers)) {
    return NextResponse.json({ error: "Invalid answers." }, { status: 400 });
  }

  const normalized = normalizeAnswers(role, answers);
  const validationError = validateAnswers(role, normalized);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const id = randomUUID();
  const createdAt = new Date().toISOString();
  const submission = { id, role, answers: normalized, createdAt };

  const result = await persistSubmission(submission);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    id: result.id,
    channel: result.channel,
  });
}
