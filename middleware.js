import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const path = url.pathname;

  if (path.startsWith("/dashboard")) {
    // Simple auth check placeholder: rely on Supabase auth cookies or your session logic.
    // If not authenticated, redirect to /login?next=...
    const hasSession = Boolean(req.cookies.get("sb-access-token") || req.cookies.get("session") );
    if (!hasSession) {
      const next = path + (url.search || "");
      const loginUrl = new URL(`/login`, url.origin);
      loginUrl.searchParams.set("next", next);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};


