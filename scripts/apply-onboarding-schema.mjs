import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
if (!url) {
  console.error(
    "Missing DATABASE_URL or POSTGRES_URL.\n" +
      "On Vercel, native Neon sets these automatically; locally run: npm run vercel:pull\n" +
      "Then: npm run db:setup-onboarding",
  );
  process.exit(1);
}

const sql = neon(url);

await sql`
  CREATE TABLE IF NOT EXISTS onboarding_submissions (
    id UUID PRIMARY KEY,
    role TEXT NOT NULL CHECK (role IN ('artist', 'label', 'platform')),
    answers JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

await sql`
  CREATE INDEX IF NOT EXISTS onboarding_submissions_created_at_idx
    ON onboarding_submissions (created_at DESC)
`;

console.log("OK: onboarding_submissions is ready in your Neon database.");
