import type { NextConfig } from "next";

/**
 * Turbopack must use the process working directory (where you run `next dev` / `next build`),
 * not `import.meta.url` — the latter can resolve to a compiled path and break `@import "tailwindcss"`.
 */
const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return [
      {
        source: "/decks/ticketmaster-exec",
        destination: "/decks/SetLister_x_Ticketmaster_Exec_Deck.html",
      },
      {
        source: "/decks/story",
        destination: "/decks/SetLister_Disney_Story_Deck.html",
      },
    ];
  },
};

export default nextConfig;
