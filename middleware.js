// middleware.js
import { NextResponse } from "next/server";

const redirects = {
  "/buydinar": "/buy-iraqi-dinar",
  "/buyzimdoller": "/buy-zimbabwe-dollar",
};

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const target = redirects[pathname.toLowerCase()];
  if (target) {
    const url = req.nextUrl.clone();
    url.pathname = target; // query string is preserved
    return NextResponse.redirect(url, 308); // permanent
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/buydinar/:path*", "/buyzimdoller/:path*"],
};
