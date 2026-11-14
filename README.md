# HostShield 2026

A Next.js App Router application with TypeScript, Tailwind CSS, a responsive hospitality interface, OpenAI-backed compliance reviews and claim drafting, signed browser credits, and Payhip license verification.

## Run

Requires Node.js 20.9+ and npm.

```sh
npm ci
cp .env.example .env.local
# Fill in .env.local using your own service credentials.
npm run dev
```

Open http://localhost:3000. For a production Node deployment:

```sh
npm run build
npm start
```

Deploy to a Node-compatible host such as Vercel. This app uses real server routes, so a static export does not support its functionality. `NEXT_PUBLIC_CHECKOUT_URL` must be supplied at build time as well as runtime. Set the other secrets only on the server. Set a long random `TRIAL_SIGNING_SECRET` before production; production fails closed without one. To generate a secret: `openssl rand -hex 32`. Changing that secret invalidates all outstanding signed credit cookies.

## Environment

- `OPENAI_API_KEY`: OpenAI API credential with access to `gpt-4o-mini`.
- `TRIAL_SIGNING_SECRET`: HMAC key. The requested default is used in development only; production requires a configured secret.
- `NEXT_PUBLIC_CHECKOUT_URL`: actual Payhip `/b/PRODUCT` checkout URL. Defaults to https://payhip.com for the purchase link only; license activation requires a product URL.
- `PAYHIP_PRODUCT_KEY`: legacy Payhip API key used in the `payhip-api-key` header.

No credentials are included. AI generation fails clearly without configuration and does not deduct credits. There are no fake live reports or simulated purchases.

## Features

- Property-specific rules review with source-quote validation, risk assessment, draft house rules, checkout message, and housekeeping checklist.
- Five claim categories with factual notes, USD estimates, incident-specific evidence requirements, guest message and adjuster narrative.
- Calendar-day deadline arithmetic in UTC, leap-year and year-boundary support, live minute refresh, and overdue states. The host should confirm Airbnb's applicable cutoffs and timezone and file early.
- Clipboard controls, printable reports, mobile layout, reduced-motion support, labeled inputs, keyboard-accessible upgrade dialog, and visible errors.
- HMAC-signed HTTP-only, SameSite=Lax cookies; Secure in production. Two free generations, 100 Pro generations on activation; credits deducted only after a structurally valid successful report.
- Zod input/output schemas, exact substring verification of quoted rules, origin checking, third-party timeouts, and no rendering of AI HTML.

## Important production limits

The prompt requests anonymous **cookie-only** credits. Cookies authenticate balances but cannot provide authoritative financial accounting. Visitors can clear cookies, restore a previously signed cookie, use another browser, or make concurrent requests against the same balance. Reusing a key is blocked only within the current signed browser state. Pro credits are not synchronized between devices, and activation of a different valid key replaces the balance with 100 rather than adding to it. A 5-year browser-cookie lifetime is used, not a contractual credit expiration.

Before selling passes at scale, replace browser-only accounting with a transactional shared database keyed to an authenticated user and unique license redemption, and add durable request idempotency and rate limits. Keep the signed cookie as the session credential. The present implementation intentionally preserves the cookie-based product specification; it must not be represented as tamper-proof monetization or cross-device entitlement storage.

OpenAI structured responses are validated, but model output is not a legal determination. Never promise 100% compliance, certain listing penalties, or reimbursement. Hosts must review the factual claims, pre-booking fields, applicable law and current Airbnb terms. The app does not submit claims or store uploaded evidence.

## Corrections to the supplied brief

1. Payhip's supplied `https://payhip.com{slug}&license_key=...` URL is not a working verification endpoint. The implementation uses the documented legacy URL `https://payhip.com/api/v1/license/verify?product_link=SLUG&license_key=KEY` with the requested `payhip-api-key` header. A Payhip v2 product secret uses a different header/API and requires an explicit integration change.
2. Airbnb's Host Damage Protection terms require true, accurate, legitimate and verifiable evidence, prohibit doctoring/falsification including AI, and permit further evidence requests or denial. They do not establish the brief's universal automatic-rejection rule for every phone enhancement. The app recommends preserving unedited camera originals, including metadata, and avoiding enhancements and AI edits.
3. The 14-day step includes both pursuing guest reimbursement and notifying Airbnb; the 30-day step includes a completed request with supporting evidence. Deadlines alone do not establish eligibility. Hotels and certain locations are excluded or subject to other programs.
4. The Nov 20 policy applies to reservations booked on or after that date; consequences are possible, not guaranteed for every finding. Rewrites are labeled drafts rather than “100% compliant.”

Sources checked November 14, 2026:

- https://www.airbnb.com/help/article/4168
- https://www.airbnb.com/resources/hosting-homes/a/important-changes-to-house-rules-21
- https://www.airbnb.com/help/article/2869 (Host Damage Protection Terms, updated February 5, 2026)
- https://help.payhip.com/article/114-software-license-keys

## Verification

```sh
npm test
npm run typecheck
npm run build
npm audit --omit=dev
```

Tests cover cookie signatures and tampering, invalid signed credit values, leap days, daylight-saving boundaries, year rollover, expired deadlines, date/cost/input validation, cross-origin rejection, required AI model and JSON format, response validation, service failures, and missing credentials. OpenAI tests mock network requests; paid generation and real Payhip activation need your service credentials.

Browser visual QA and live deployment were unavailable in the supplied managed environment: no Sites helper installation or supported browser QA bridge was present. No deployed URL is claimed.
