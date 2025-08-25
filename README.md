This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Header-driven login and allowlist

- Server route: `/login` reads the `BASE44_BUILDURL_HEADER` header (default `x-base44-buildurl`) to build the portal login URL at request time.
- Supported header formats:
  - Template: `https://portal…/login?next=${next}`
  - Base URL: `https://portal…/login` (we append `?next=`)
  - JSON: `{ "base": "https://portal…", "path": "/login", "param": "next" }`
- The computed host must be in `ALLOWED_LOGIN_HOSTS` (comma-separated). If missing/invalid, falls back to `NEXT_PUBLIC_BASE44_LOGIN_URL`.
- `next` is sanitized to path+query only (prevents open redirects). Final redirect is 302.

All CTAs in emails and SMS point to `${APP_URL}/login?next=/dashboard/orders/:id`.

### Required env vars (server)

```env
APP_URL=https://www.dinarexchange.co.nz
BASE44_BUILDURL_HEADER=x-base44-buildurl
ALLOWED_LOGIN_HOSTS=portal.dinarexchange.co.nz
NEXT_PUBLIC_BASE44_LOGIN_URL=https://portal.dinarexchange.co.nz/login
NEXT_PUBLIC_BASE44_APP_URL=https://portal.dinarexchange.co.nz

# Worker
CRON_SECRET=...

# Twilio
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+64XXXXXXXX
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
