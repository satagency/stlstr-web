-- Vercel’s native Neon integration sets DATABASE_URL for you. Run this once per database
-- (Neon SQL editor, or `npm run db:setup-onboarding` with env from `vercel pull`).

CREATE TABLE IF NOT EXISTS onboarding_submissions (
  id UUID PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('artist', 'label', 'platform')),
  answers JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS onboarding_submissions_created_at_idx
  ON onboarding_submissions (created_at DESC);
