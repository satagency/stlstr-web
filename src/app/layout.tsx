import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "setlister.ai",
  description: "Setlist support for artists and labels.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        {children}
        <footer className="mt-auto border-t border-zinc-200">
          <div className="flex w-full flex-col items-center gap-4 px-4 py-5 text-[13px] uppercase text-zinc-600 sm:flex-row sm:justify-between sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-start sm:gap-6">
              <Link href="mailto:contact@setlister.ai" className="hover:text-zinc-900">
                Contact
              </Link>
              <Link href="/about" className="hover:text-zinc-900">
                About
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-zinc-900">
                Terms
              </Link>
              <Link href="/privacy-notice" className="hover:text-zinc-900">
                Privacy
              </Link>
              <Link href="/ticketing" className="hover:text-zinc-900">
                Tickets
              </Link>
              <Link href="/cookies" className="hover:text-zinc-900">
                Cookies
              </Link>
            </div>
            <p className="text-center text-[11px] uppercase text-zinc-500 sm:text-right">
              © 2026 SETLISTER HOLDINGS INC.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
