import type { OnboardingRole, StepDefinition } from "./types";

const artistSteps: StepDefinition[] = [
  {
    id: "artistOrProjectName",
    kind: "text",
    label: "Artist or project name",
    placeholder: "As fans know you",
  },
  {
    id: "contactName",
    kind: "text",
    label: "Your name",
    placeholder: "Primary contact",
  },
  {
    id: "email",
    kind: "email",
    label: "Work email",
    placeholder: "you@example.com",
  },
  {
    id: "musicLink",
    kind: "url",
    label: "Link to your music or site",
    description: "Spotify, Instagram, or website — optional but helpful.",
    placeholder: "https://",
    optional: true,
  },
  {
    id: "goals",
    kind: "textarea",
    label: "What do you want Setlister to help with?",
    placeholder: "Setlists, fan engagement, data, something else…",
  },
];

const labelSteps: StepDefinition[] = [
  {
    id: "labelName",
    kind: "text",
    label: "Label name",
    placeholder: "Imprint or company",
  },
  {
    id: "contactName",
    kind: "text",
    label: "Your name",
    placeholder: "Primary contact",
  },
  {
    id: "email",
    kind: "email",
    label: "Work email",
    placeholder: "you@label.com",
  },
  {
    id: "rosterSize",
    kind: "choice",
    label: "Approximate roster size",
    options: [
      { value: "1-10", label: "1–10 artists" },
      { value: "11-50", label: "11–50" },
      { value: "51-200", label: "51–200" },
      { value: "200+", label: "200+" },
    ],
  },
  {
    id: "goals",
    kind: "textarea",
    label: "What would success look like for your roster?",
    placeholder: "Reporting, campaigns, integrations, priorities…",
  },
];

const platformSteps: StepDefinition[] = [
  {
    id: "orgName",
    kind: "text",
    label: "Organization name",
    placeholder: "Venue, promoter, platform…",
  },
  {
    id: "contactName",
    kind: "text",
    label: "Your name",
    placeholder: "Primary contact",
  },
  {
    id: "email",
    kind: "email",
    label: "Work email",
    placeholder: "you@company.com",
  },
  {
    id: "useCase",
    kind: "textarea",
    label: "What integration or use case are you exploring?",
    placeholder: "APIs, partnerships, pilots, timelines…",
  },
];

const byRole: Record<OnboardingRole, StepDefinition[]> = {
  artist: artistSteps,
  label: labelSteps,
  platform: platformSteps,
};

export function stepsForRole(role: OnboardingRole): StepDefinition[] {
  return byRole[role];
}

export const roleChoices: { value: OnboardingRole; label: string; hint: string }[] = [
  { value: "artist", label: "Artist", hint: "Solo act, band, or project" },
  { value: "label", label: "Label", hint: "Imprint, management, or catalog" },
  { value: "platform", label: "Platform", hint: "Venue, promoter, or tech partner" },
];
