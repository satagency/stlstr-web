export default function PrivacyNoticePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 uppercase tracking-[0.05em]">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy Notice</h1>
      <p className="mt-2 text-sm text-zinc-500">Last updated: March 20, 2026</p>

      <div className="mt-8 space-y-8 text-zinc-700">
        <section>
          <h2 className="text-xl font-semibold text-zinc-900">1. Introduction</h2>
          <p className="mt-2">
            This Privacy Notice explains how setlister.ai collects, uses, shares, and
            protects personal information when you use our website and services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">2. Information We Collect</h2>
          <p className="mt-2">
            We may collect contact details, account information, usage and device data,
            and communications you send to us. We only collect information reasonably
            necessary to provide and improve our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">3. How We Use Information</h2>
          <p className="mt-2">
            We use collected information to operate the service, respond to inquiries,
            support artists and labels, improve product experience, maintain security,
            and comply with legal obligations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">4. Sharing of Information</h2>
          <p className="mt-2">
            We may share information with vendors that help us run our service, with
            affiliated entities, or when required by law. We do not sell personal
            information for monetary compensation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">5. Data Retention</h2>
          <p className="mt-2">
            We retain personal information only as long as needed for the purposes
            described in this notice, unless a longer period is required by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">6. Your Choices and Rights</h2>
          <p className="mt-2">
            Depending on your location, you may have rights to access, correct, delete,
            or restrict processing of your personal information. Contact us to submit a
            request and we will respond in accordance with applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">7. Security</h2>
          <p className="mt-2">
            We implement administrative, technical, and organizational safeguards to
            protect personal information. No internet transmission is fully secure, so we
            cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">8. Contact</h2>
          <p className="mt-2">
            For privacy-related questions, contact{" "}
            <a className="text-zinc-900 underline" href="mailto:privacy@setlister.ai">
              privacy@setlister.ai
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
