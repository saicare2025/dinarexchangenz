export function buildLoginUrl(targetPath) {
  const normalized = targetPath?.startsWith("/") ? targetPath : `/${targetPath || ""}`;

  // Prefer simple fallback login URL for local/dev, e.g. http://localhost:3000/login
  const fallbackLogin = process.env.LOGIN_FALLBACK_URL;
  if (fallbackLogin) {
    try {
      const u = new URL(fallbackLogin);
      u.searchParams.set("next", normalized);
      return u.toString();
    } catch {
      return `${fallbackLogin}?next=${encodeURIComponent(normalized)}`;
    }
  }

  // Otherwise, compose Base44 portal login with from_url on the portal app
  const APP = process.env.NEXT_PUBLIC_BASE44_APP_URL;        // e.g. https://portal.dinarexchange.co.nz
  const LOGIN = process.env.NEXT_PUBLIC_BASE44_LOGIN_URL;    // e.g. https://portal.dinarexchange.co.nz/login
  if (APP && LOGIN) {
    const from = `${APP}${normalized}`;
    return `${LOGIN}?from_url=${encodeURIComponent(from)}`;
  }

  // Last resort
  return `https://portal.dinarexchange.co.nz/login?from_url=${encodeURIComponent("https://portal.dinarexchange.co.nz/")}`;
}


