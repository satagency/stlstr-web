export default function TermsAndConditionsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 text-[16px] leading-normal uppercase">
      <h1 className="text-[16px] font-medium">Terms of Service</h1>
      <p className="mt-2 text-zinc-600">Setlister Holdings Inc.</p>
      <p className="mt-2 text-zinc-500">Last updated: March 20, 2026</p>

      <div className="mt-8 space-y-8 text-zinc-700">
        <section>
          <h2 className="text-[16px] font-medium text-zinc-900">Acceptance of terms</h2>
          <p className="mt-2">
            By accessing or using the Setlister website, applications, and services (the
            &quot;Service&quot;), you agree to be bound by these Terms of Service. If you
            do not agree to these terms, do not use the Service. The Service enables fans
            to interact with setlist experiences (including voting and song requests) and
            provides business intelligence and related tools to artists and their teams.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-zinc-900">Use of the service</h2>
          <p className="mt-2">
            You may use the Service only in compliance with these terms and applicable
            law. You are responsible for maintaining the confidentiality of your account
            and for all activity under your account. You may not use the Service to
            transmit harmful, unlawful, or abusive content or to interfere with the
            operation of the Service or others&apos; use of it.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-zinc-900">
            Voting and song requests
          </h2>
          <p className="mt-2">
            Where the Service allows voting on setlist songs or requesting songs, your
            votes and requests (including any stated willingness to pay) are collected and
            shared with the artist and their team. Participation does not create any
            obligation on the part of the artist or Setlister to change a setlist or add
            any song. Any actual charge or payment for a requested song, if applicable,
            would be subject to separate terms and consent at the time of such transaction.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-zinc-900">Intellectual property</h2>
          <p className="mt-2">
            The Service and its content, including but not limited to designs, logos,
            text, and software, are owned by Setlister Holdings Inc. or its licensors. You
            may not copy, modify, distribute, or create derivative works without prior
            written permission. Artist names, likenesses, and musical works are the
            property of the respective rights holders.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-zinc-900">Limitation of liability</h2>
          <p className="mt-2">
            To the fullest extent permitted by law, Setlister Holdings Inc. and its
            affiliates shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from your use of or inability to use
            the Service, including any reliance on content or data provided through the
            Service.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-zinc-900">Changes to terms</h2>
          <p className="mt-2">
            We may update these terms at any time. The updated version will be posted on
            this page with a revised effective date. Your continued use of the Service
            after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-zinc-900">Governing law</h2>
          <p className="mt-2">
            These terms are governed by the laws of Norway. Any dispute arising in
            connection with these terms or the Service shall be subject to the exclusive
            jurisdiction of the courts of Norway, unless otherwise required by mandatory
            law.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-zinc-900">Contact</h2>
          <p className="mt-2">
            For questions about these Terms of Service, contact us at{" "}
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
