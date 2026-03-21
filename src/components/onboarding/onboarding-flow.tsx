"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { roleChoices, stepsForRole } from "@/lib/onboarding/steps";
import type { OnboardingRole, StepDefinition } from "@/lib/onboarding/types";

type Phase = "role" | "questions" | "done";

function parseRoleParam(value: string | null): OnboardingRole | null {
  if (value === "artist" || value === "label" || value === "platform") return value;
  return null;
}

function stepValueValid(step: StepDefinition, value: string): boolean {
  const t = value.trim();
  if (step.optional && t.length === 0) return true;
  if (!step.optional && t.length === 0) return false;
  if (step.kind === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
  if (step.kind === "url") {
    try {
      const u = new URL(t);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }
  return true;
}

export function OnboardingFlow() {
  const searchParams = useSearchParams();
  const initialFromUrl = useMemo(
    () => parseRoleParam(searchParams.get("role")),
    [searchParams],
  );

  const [phase, setPhase] = useState<Phase>(() => (initialFromUrl ? "questions" : "role"));
  const [role, setRole] = useState<OnboardingRole | null>(initialFromUrl);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [draft, setDraft] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = role ? stepsForRole(role) : [];
  const step = steps[stepIndex];
  const progress = role && steps.length > 0 ? (stepIndex + 1) / steps.length : 0;

  const roleParam = searchParams.get("role");
  useEffect(() => {
    const r = parseRoleParam(roleParam);
    if (!r) return;
    setRole(r);
    setPhase("questions");
    setStepIndex(0);
    setAnswers({});
    setDraft("");
    setSubmitError(null);
  }, [roleParam]);

  useEffect(() => {
    if (!step) return;
    setDraft(answers[step.id] ?? "");
  }, [step, answers]);

  const submitAnswers = useCallback(
    async (payload: Record<string, string>) => {
      if (!role) return;
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const res = await fetch("/api/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role,
            answers: payload,
            website: honeypot,
          }),
        });
        const data = (await res.json()) as { error?: string };
        if (!res.ok) {
          setSubmitError(data.error ?? "Something went wrong. Please try again.");
          return;
        }
        setPhase("done");
      } catch {
        setSubmitError("Network error. Check your connection and try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [role, honeypot],
  );

  const goBack = useCallback(() => {
    setSubmitError(null);
    if (phase === "questions") {
      if (stepIndex > 0) {
        setStepIndex((i) => i - 1);
        return;
      }
      setPhase("role");
      setRole(null);
    }
  }, [phase, stepIndex]);

  const goNext = useCallback(() => {
    if (!role || !step) return;
    if (!stepValueValid(step, draft)) return;
    const nextAnswers = { ...answers, [step.id]: draft.trim() };
    setAnswers(nextAnswers);
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
      return;
    }
    void submitAnswers(nextAnswers);
  }, [role, step, draft, stepIndex, steps.length, answers, submitAnswers]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        goBack();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goBack]);

  const selectRole = (r: OnboardingRole) => {
    setRole(r);
    setStepIndex(0);
    setAnswers({});
    setDraft("");
    setPhase("questions");
  };

  const onChoice = (value: string) => {
    if (!step || step.kind !== "choice") return;
    const nextAnswers = { ...answers, [step.id]: value };
    setAnswers(nextAnswers);
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
      return;
    }
    setDraft("");
    void submitAnswers(nextAnswers);
  };

  const canGoBack = phase === "questions";

  return (
    <div className="relative flex min-h-[calc(100vh-5rem)] flex-col bg-white text-zinc-900">
      <div
        className="pointer-events-none absolute left-[-9999px] top-0 opacity-0"
        aria-hidden
      >
        <label htmlFor="onboarding-website">Website</label>
        <input
          id="onboarding-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <header className="flex items-center justify-between gap-4 border-b border-zinc-200 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {canGoBack ? (
            <button
              type="button"
              onClick={goBack}
              className="shrink-0 text-[12px] font-medium uppercase tracking-wide text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline"
            >
              Back
            </button>
          ) : (
            <span className="w-10 shrink-0" />
          )}
          <div className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-zinc-100">
            <motion.div
              className="h-full rounded-full bg-zinc-900"
              initial={false}
              animate={{ width: `${Math.round(progress * 100)}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 24 }}
            />
          </div>
        </div>
        <Link
          href="/"
          className="shrink-0 text-[12px] font-medium uppercase tracking-wide text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline"
        >
          Home
        </Link>
      </header>

      <main className="onboarding-form-inter flex flex-1 flex-col justify-center px-4 py-10 sm:px-6 antialiased">
        <div className="mx-auto w-full max-w-xl">
          <AnimatePresence mode="wait">
            {phase === "role" && (
              <motion.div
                key="role"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-8"
              >
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                    Setlister
                  </p>
                  <h1 className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl">
                    Who are you signing up as?
                  </h1>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    A few quick questions — nothing long. You can leave anytime with Esc.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  {roleChoices.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => selectRole(c.value)}
                      className="group flex w-full flex-col items-start gap-1 rounded-md border border-zinc-200 bg-white px-4 py-4 text-left transition hover:border-zinc-900 hover:bg-zinc-50"
                    >
                      <span className="text-[15px] font-medium uppercase tracking-wide">
                        {c.label}
                      </span>
                      <span className="text-[13px] text-zinc-600">{c.hint}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === "questions" && role && step && (
              <motion.div
                key={`${role}-${step.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-8"
              >
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                    {role === "artist" ? "Artist" : role === "label" ? "Label" : "Platform"}
                  </p>
                  <h1 className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl">
                    {step.label}
                    {step.optional ? (
                      <span className="text-base font-normal text-zinc-500"> (optional)</span>
                    ) : null}
                  </h1>
                  {step.description ? (
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                      {step.description}
                    </p>
                  ) : null}
                </div>

                {step.kind === "choice" && step.options ? (
                  <div className="flex flex-col gap-3">
                    {step.options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => onChoice(opt.value)}
                        className="w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-left text-[13px] font-medium uppercase tracking-wide transition hover:border-zinc-900 hover:bg-zinc-50 disabled:opacity-50"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {step.kind === "textarea" ? (
                      <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder={step.placeholder}
                        rows={5}
                        className="w-full resize-y rounded-md border border-zinc-300 bg-white px-3 py-3 text-[15px] text-zinc-900 outline-none ring-zinc-900/10 placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                            e.preventDefault();
                            goNext();
                          }
                        }}
                      />
                    ) : (
                      <input
                        type={step.kind === "email" ? "email" : "text"}
                        inputMode={step.kind === "email" ? "email" : undefined}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder={step.placeholder}
                        className="w-full rounded-md border border-zinc-300 bg-white px-3 py-3 text-[15px] text-zinc-900 outline-none ring-zinc-900/10 placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            goNext();
                          }
                        }}
                        autoComplete={
                          step.kind === "email"
                            ? "email"
                            : step.id === "contactName"
                              ? "name"
                              : "organization"
                        }
                      />
                    )}

                    {submitError ? (
                      <p className="text-sm text-red-700" role="alert">
                        {submitError}
                      </p>
                    ) : null}

                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        disabled={isSubmitting || !stepValueValid(step, draft)}
                        onClick={goNext}
                        className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-5 py-3 text-[12px] font-medium uppercase tracking-wide text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {stepIndex === steps.length - 1
                          ? isSubmitting
                            ? "Sending…"
                            : "Submit"
                          : "Continue"}
                      </button>
                      {step.kind === "textarea" ? (
                        <span className="text-[11px] uppercase text-zinc-500">
                          ⌘/Ctrl + Enter to submit
                        </span>
                      ) : (
                        <span className="text-[11px] uppercase text-zinc-500">
                          Enter to continue
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {phase === "done" && role && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                    Thank you
                  </p>
                  <h1 className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl">
                    We received your details.
                  </h1>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    The team will follow up by email. If it is urgent, you can still reach us
                    directly.
                  </p>
                </div>
                <div className="flex flex-col gap-2 text-[13px] uppercase">
                  {role === "artist" ? (
                    <a
                      className="w-fit underline-offset-4 hover:underline"
                      href="mailto:artists@setlister.ai"
                    >
                      artists@setlister.ai
                    </a>
                  ) : null}
                  {role === "label" ? (
                    <a
                      className="w-fit underline-offset-4 hover:underline"
                      href="mailto:labels@setlister.ai"
                    >
                      labels@setlister.ai
                    </a>
                  ) : null}
                  {role === "platform" ? (
                    <a
                      className="w-fit underline-offset-4 hover:underline"
                      href="mailto:ticketing@setlister.ai"
                    >
                      ticketing@setlister.ai
                    </a>
                  ) : null}
                  <Link
                    href="/"
                    className="mt-4 w-fit text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline"
                  >
                    Back to home
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
