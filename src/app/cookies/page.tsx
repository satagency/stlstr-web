export default function CookiesPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 text-[16px] leading-normal uppercase">
      <h1 className="text-[16px] font-medium">Cookie Notice</h1>
      <p className="mt-2 text-zinc-500">Last updated: March 20, 2026</p>

      <div className="mt-8 space-y-6 text-zinc-700">
        <p>
          We use cookies and similar technologies where needed to operate the site,
          remember preferences, measure performance, and improve your experience.
        </p>
        <p>
          You can control cookies through your browser settings. Blocking some cookies
          may affect how certain features work.
        </p>
        <p>
          Questions?{" "}
          <a
            href="mailto:contact@setlister.ai"
            className="text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900"
          >
            contact@setlister.ai
          </a>
        </p>
      </div>
    </main>
  );
}
