export default function TicketingPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 uppercase tracking-[0.05em]">
      <h1 className="text-3xl font-semibold tracking-tight">Ticketing</h1>
      <div className="mt-8 space-y-6 text-zinc-700">
        <p>
          setlister.ai works alongside ticketing operations so artists, labels, and
          teams can align setlists with inventory, holds, and on-sale timing.
        </p>
        <p>
          For ticketing partnerships or integrations, reach us at{" "}
          <a
            href="mailto:contact@setlister.ai"
            className="text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900"
          >
            contact@setlister.ai
          </a>
          .
        </p>
      </div>
    </main>
  );
}
