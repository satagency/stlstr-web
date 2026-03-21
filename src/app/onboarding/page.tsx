import type { Metadata } from "next";
import { Suspense } from "react";

import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";

export const metadata: Metadata = {
  title: "Sign up — setlister.ai",
  description: "Tell us about you or your label in a few quick steps.",
};

function OnboardingFallback() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-white px-4 text-[13px] uppercase text-zinc-500">
      Loading…
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<OnboardingFallback />}>
      <OnboardingFlow />
    </Suspense>
  );
}
