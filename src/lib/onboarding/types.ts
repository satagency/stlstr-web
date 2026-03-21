export type OnboardingRole = "artist" | "label" | "platform";

export type StepKind = "text" | "email" | "url" | "textarea" | "choice";

export type StepOption = { value: string; label: string };

export type StepDefinition = {
  id: string;
  kind: StepKind;
  label: string;
  description?: string;
  placeholder?: string;
  optional?: boolean;
  options?: StepOption[];
};

export type OnboardingAnswers = Record<string, string>;

export type OnboardingSubmission = {
  id: string;
  role: OnboardingRole;
  answers: OnboardingAnswers;
  createdAt: string;
};
