export default function PrivacyNoticePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 text-[16px] leading-normal uppercase">
      <h1 className="text-[16px] font-medium">Privacy Policy</h1>
      <p className="mt-2 text-zinc-600">Setlister Holdings Inc.</p>
      <p className="mt-2 text-zinc-500">Last updated: March 20, 2026</p>

      <div className="mt-8 space-y-8 text-zinc-700">
        <section>
          <h2 className="text-[16px] font-medium text-zinc-900">Introduction</h2>
          <p className="mt-2">
            This Privacy Policy describes how Setlister Holdings Inc. (&quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;) collects, uses, and shares information when
            you use the Setlister website, applications, and services (the
            &quot;Service&quot;), including fan-facing setlist experiences (e.g., voting,
            song requests) and business intelligence tools.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-zinc-900">Information we collect</h2>
          <p className="mt-2">
            We collect information you provide directly (e.g., account details, email,
            votes, song requests, and any stated willingness to pay in request flows). We
            also collect information automatically when you use the Service (e.g., device
            and log data, IP address). Where you use setlist experiences on third-party
            or artist sites, we may receive information from those contexts in accordance
            with their and our agreements.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-zinc-900">How we use information</h2>
          <p className="mt-2">
            We use the information to operate and improve the Service, to share votes and
            song requests with artists and their teams as described in the Service, to
            communicate with you, to comply with legal obligations, and to protect the
            security and integrity of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-zinc-900">Sharing of information</h2>
          <p className="mt-2">
            Your votes and song requests (including song selections and any stated amounts)
            are shared with the artist and the team responsible for the performance, as
            described in the Service. We may share information with service providers who
            assist us in operating the Service, and where required by law or to protect
            our rights.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-zinc-900">Your choices</h2>
          <p className="mt-2">
            You can manage your account and preferences through the Service. You may have
            rights to access, correct, or delete your personal data depending on your
            jurisdiction. To exercise those rights or ask questions about our privacy
            practices, contact us using the details below.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-zinc-900">
            Data retention and security
          </h2>
          <p className="mt-2">
            We retain information for as long as needed to provide the Service and to
            comply with legal and contractual obligations. We implement appropriate
            technical and organizational measures to protect your information against
            unauthorized access, loss, or misuse.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-zinc-900">Changes to this policy</h2>
          <p className="mt-2">
            We may update this Privacy Policy from time to time. The updated version will
            be posted on this page with a revised effective date. Your continued use of the
            Service after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-zinc-900">Contact</h2>
          <p className="mt-2">
            For questions or comments about this Privacy Policy and our privacy
            practices, contact us by email at{" "}
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
