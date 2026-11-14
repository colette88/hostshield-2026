# HostShield 2026

Next.js 16 App Router, strict TypeScript, Tailwind CSS, OpenAI JSON generation, HMAC-signed browser credits, and Payhip license verification.

## Run and deploy

Node 20.9+ required.

```sh
npm ci
cp .env.example .env.local
# Supply real service credentials in .env.local
npm run dev
npm test
npm run lint
npm run typecheck
npm run build
npm start
```

Deploy to a Node-compatible host (for example Vercel) or build the included Dockerfile. This application needs server routes; it cannot be deployed as a static export. `NEXT_PUBLIC_CHECKOUT_URL` must be present at build time. The remaining environment variables are server secrets. Generate `TRIAL_SIGNING_SECRET` with `openssl rand -hex 32`. Production fails closed without a secret of at least 32 characters; the requested default is development-only.

- `OPENAI_API_KEY`: access to gpt-4o-mini.
- `TRIAL_SIGNING_SECRET`: HMAC signing key.
- `NEXT_PUBLIC_CHECKOUT_URL`: real Payhip /b/PRODUCT URL.
- `PAYHIP_PRODUCT_KEY`: Payhip legacy API credential for the payhip-api-key header.

## Implemented

- Rules audit: exact quote validation, score and potential-risk label, violations/fixes, rewritten standard/additional rules, checkout message and cleaner checklist.
- Claim drafts: incident-specific evidence checklist, neutral guest message, adjuster narrative, and UTC calendar-day 14/30-day planning dates with overdue states.
- Responsive workspace, sample inputs, accessible labeled controls and native upgrade dialog, copy controls, print stylesheet, reduced-motion support and explicit failures.
- Two free generations and 100 Pro generations in HTTP-only signed cookies. Only successful schema-validated reports deduct a credit. JSON schemas constrain input/output; prompts treat input as untrusted data.
- Payhip validation, server-only secrets, same-origin write checks, service timeouts and security headers.

## Policy and integration decisions

The pasted brief asserts future Airbnb policy details. These have not been independently verified during this task. The UI and AI prompts identify the supplied framework as assumptions, avoid guaranteed compliance/penalties/reimbursement, and point to Airbnb's current terms. Review the substantive framework against official current terms before commercial launch. The evidence checklist recommends preserving raw originals and metadata, without asserting that every phone enhancement universally invalidates a claim. Filing dates are planning aids; confirm applicable terms and timezones.

The supplied Payhip URL `https://payhip.com{slug}&license_key=...` is malformed. Activation instead uses `https://payhip.com/api/v1/license/verify?product_link=SLUG&license_key=KEY` and the requested `payhip-api-key` header. Live verification must be checked with your product credential and license before selling passes.

## Accounting limits before commercial launch

Cookie-only balances follow the requested architecture but are not authoritative financial accounting. Clearing cookies creates another free trial; replaying an old signed cookie or concurrent requests can restore/spend the same balance. Reuse is blocked only in the current browser state. License credits do not synchronize across devices. A five-year browser retention period is used; browsers can still delete cookies. Activating a different valid key replaces the balance with 100.

Before selling at scale, implement authenticated accounts, a transactional shared credit ledger, unique license redemption, request idempotency and durable rate limiting. This project must not be represented as tamper-proof monetization. It does not upload evidence or submit claims. Input is sent to OpenAI when generating; avoid sensitive guest identity information.

## Verification and limits

`npm run build` and strict TypeScript checking passed. Automated tests cover cookie tampering and invalid balances, calendar boundary calculations, input validation, missing credentials, model/JSON settings and AI output validation. Production dependency audit reports zero known vulnerabilities at the time checked.

Browser QA could not complete: the managed preview relay timed out. OpenAI and Payhip live integration tests require your credentials. Sites deployment helpers are not installed and native Next.js server output is not a supported Sites Worker artifact, so this delivery is deployable source, not a claimed live deployment.
