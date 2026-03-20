export default function TermsAndConditionsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 uppercase tracking-[0.05em]">
      <h1 className="text-3xl font-semibold tracking-tight">Terms and Conditions</h1>
      <p className="mt-2 text-sm text-zinc-500">Last updated: March 20, 2026</p>

      <div className="mt-8 space-y-8 text-zinc-700">
        <section>
          <h2 className="text-xl font-semibold text-zinc-900">1. Acceptance of Terms</h2>
          <p className="mt-2">
            By accessing or using setlister.ai, you agree to these Terms and Conditions.
            If you do not agree, do not use the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">2. Services</h2>
          <p className="mt-2">
            setlister.ai provides tools and workflows for artists, labels, and related
            teams. Features may change over time as we improve the platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">3. Accounts and Responsibilities</h2>
          <p className="mt-2">
            You are responsible for maintaining the confidentiality of account credentials
            and for all activities performed through your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">4. Acceptable Use</h2>
          <p className="mt-2">
            You agree not to misuse the service, attempt unauthorized access, interfere
            with operations, or violate any applicable laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">5. Intellectual Property</h2>
          <p className="mt-2">
            The platform and associated content, trademarks, and software are owned by or
            licensed to setlister.ai. Except where permitted, you may not copy or
            redistribute service materials without permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">6. Disclaimers</h2>
          <p className="mt-2">
            The service is provided &quot;as is&quot; and &quot;as available&quot; without
            warranties of any kind, to the maximum extent permitted by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">7. Limitation of Liability</h2>
          <p className="mt-2">
            To the fullest extent permitted by law, setlister.ai is not liable for
            indirect, incidental, special, consequential, or punitive damages arising from
            your use of the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">8. Contact</h2>
          <p className="mt-2">
            Questions regarding these terms can be sent to{" "}
            <a className="text-zinc-900 underline" href="mailto:legal@setlister.ai">
              legal@setlister.ai
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
