export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { buildLoginUrl } from "@/lib/auth";

function getEnv(name, def = "") {
  const v = process.env[name];
  return v ?? def;
}

function sanitizeNext(nextRaw) {
  try {
    if (!nextRaw) return "/dashboard";
    let value = String(nextRaw);
    // If full URL, keep only path + search
    try {
      const url = new URL(value);
      value = url.pathname + (url.search || "");
    } catch {
      // not a full URL
    }
    if (!value.startsWith("/")) value = "/" + value;
    return value;
  } catch {
    return "/dashboard";
  }
}

function isAllowedHost(urlString, allowedHosts) {
  try {
    const u = new URL(urlString);
    return allowedHosts.includes(u.host);
  } catch {
    return false;
  }
}

function buildUrlFromTemplate(template, nextPath) {
  return template.replaceAll("${next}", encodeURIComponent(nextPath));
}

function composeLoginUrl(headerValue, nextPath) {
  if (!headerValue) return null;

  const trimmed = headerValue.trim();

  // JSON config: {"base":"https://portal…","path":"/login","param":"next"}
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    try {
      const cfg = JSON.parse(trimmed);
      const base = cfg.base || cfg.url || "";
      const path = cfg.path || "/login";
      const param = cfg.param || "next";
      const u = new URL(path, base);
      u.searchParams.set(param, nextPath);
      return u.toString();
    } catch {
      return null;
    }
  }

  // Template string with ${next}
  if (trimmed.includes("${next}")) {
    return buildUrlFromTemplate(trimmed, nextPath);
  }

  // Base URL string → append ?next=
  try {
    const u = new URL(trimmed);
    if (!u.pathname) u.pathname = "/login";
    u.searchParams.set("next", nextPath);
    return u.toString();
  } catch {
    return null;
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const nextParam = searchParams.get("next");
  const nextPath = sanitizeNext(nextParam);

  // Use the shared builder (resolves to Base44 portal login with from_url)
  const finalUrl = buildLoginUrl(nextPath);

  // 302 temporary redirect; avoid caching
  return NextResponse.redirect(finalUrl, { status: 302, headers: { "cache-control": "no-store" } });
}


