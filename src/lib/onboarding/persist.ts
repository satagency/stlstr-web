import { appendFile, mkdir } from "fs/promises";
import path from "path";

import { neon } from "@neondatabase/serverless";

import type { OnboardingSubmission } from "./types";

export type PersistResult =
  | { ok: true; id: string; channel: "neon" | "file" | "log" }
  | { ok: false; error: string };

function neonDatabaseUrl(): string | undefined {
  return process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
}

async function persistToNeon(submission: OnboardingSubmission): Promise<PersistResult> {
  const url = neonDatabaseUrl();
  if (!url) return { ok: false, error: "DATABASE_URL not configured" };

  const sql = neon(url);
  await sql`
    INSERT INTO onboarding_submissions (id, role, answers)
    VALUES (${submission.id}, ${submission.role}, ${submission.answers})
  `;
  return { ok: true, id: submission.id, channel: "neon" };
}

async function persistToLocalFile(submission: OnboardingSubmission): Promise<PersistResult> {
  const root = process.cwd();
  const dir = path.join(root, ".data");
  const file = path.join(dir, "onboarding-submissions.jsonl");
  await mkdir(dir, { recursive: true });
  const line = `${JSON.stringify(submission)}\n`;
  await appendFile(file, line, "utf8");
  return { ok: true, id: submission.id, channel: "file" };
}

function persistToLog(submission: OnboardingSubmission): PersistResult {
  // Vercel captures stdout; single-line JSON is easy to search and export.
  console.log(
    JSON.stringify({
      event: "onboarding_submission",
      ...submission,
    }),
  );
  return { ok: true, id: submission.id, channel: "log" };
}

export async function persistSubmission(submission: OnboardingSubmission): Promise<PersistResult> {
  if (neonDatabaseUrl()) {
    try {
      return await persistToNeon(submission);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Database write failed";
      console.error("onboarding neon error:", message);
      return { ok: false, error: message };
    }
  }

  if (process.env.NODE_ENV === "development") {
    try {
      return await persistToLocalFile(submission);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Local file write failed";
      console.error("onboarding file error:", message);
      return persistToLog(submission);
    }
  }

  return persistToLog(submission);
}
