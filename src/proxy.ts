import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Block automated access to partner decks from Ticketmaster / Live Nation–identified clients. */
const TICKETMASTER_FAMILY_UA = /ticketmaster|live\s*nation|livenation/i;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/decks")) {
    const ua = request.headers.get("user-agent") ?? "";
    if (TICKETMASTER_FAMILY_UA.test(ua)) {
      return new NextResponse(null, { status: 403 });
    }
  }

  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
