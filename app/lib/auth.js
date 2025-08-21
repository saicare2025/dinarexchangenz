// app/lib/auth.js
"use client";

export function buildLoginUrl(targetPath) {
  const APP = process.env.NEXT_PUBLIC_BASE44_APP_URL;        // e.g. https://portal.dinarexchange.co.nz
  const LOGIN = process.env.NEXT_PUBLIC_BASE44_LOGIN_URL;    // e.g. https://app.base44.com/login

  if (!APP || !LOGIN) {
    console.error("Missing env vars: NEXT_PUBLIC_BASE44_APP_URL or NEXT_PUBLIC_BASE44_LOGIN_URL");
    // Dev fallback:
    return "https://app.base44.com/login?from_url=" + encodeURIComponent("https://portal.dinarexchange.co.nz/");
  }

  const normalized = targetPath?.startsWith("/") ? targetPath : `/${targetPath || ""}`;
  const from = `${APP}${normalized}`;

  if (!from.startsWith("https://portal.dinarexchange.co.nz")) {
    console.warn("from_url is not on portal.dinarexchange.co.nz:", from);
  }

  const url = `${LOGIN}?from_url=${encodeURIComponent(from)}`;
  return url;
}
