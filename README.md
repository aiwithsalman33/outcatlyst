# OunCatalyst — Website

This is the multi-page marketing and lead-capture website for **OunCatalyst**, an EdTech startup helping students become independent, career-ready individuals.

> *"Don't just find a career. Build your own."*

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Google Sheets API (server-side) · Poppins via `next/font`.

---

## Quick start

```bash
npm install
cp .env.example .env.local      # then fill in values (see below)
npm run dev                     # http://localhost:3000
```

To try the forms without Google credentials, set `LEADS_BACKEND=local-file` in `.env.local`. Submissions are then written to `.data/leads.jsonl`. This backend works in development only.

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Unit tests for the Google Sheets client (mocked Google API, real RSA signing) |
| `npm run optimize:brand` | Regenerate the web logo, favicon and OG image from the supplied PNGs in the project root |

## Project structure

```
src/
  app/                       Routes (one folder per page) + API, sitemap, robots, 404, error boundary
    api/leads/route.ts       Lead endpoint: origin check, spam checks, rate limit, validation, Sheets write
  components/
    layout/                  Header (dropdown + mobile menu), Footer, Logo
    consultation/            Global consultation modal (provider) + button that opens it
    forms/                   ConsultationForm, CollegePartnershipForm, GeneralEnquiryForm, field components
    sections/                ProgramCard, ProgramDetail (reusable template), Steps, FAQ list, legal layout
    ui/                      PageHero, Breadcrumbs, Photo, Accordion, CTA banner, icons, JSON-LD
  lib/
    site.ts                  Brand info, navigation, public contact config
    programs.ts              Program catalogue — add a program here and it renders everywhere
    faqs.ts                  FAQ content
    leads/                   Shared validation schema, Sheets client, storage backends, abuse guards
public/brand/                Optimised logo files (generated from the originals)
public/images/               Photography (Unsplash License) — see CREDITS.md
docs/                        Research, SEO strategy, Sheets setup, sitemap & journeys
tests/                       Node test runner tests
```

## Environment variables

All variables are listed in [`.env.example`](./.env.example).

| Variable | Scope | Required | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public, **build-time** | yes (prod) | Canonical URLs, sitemap, OG tags, form origin check. **Set it before `npm run build`.** |
| `NEXT_PUBLIC_CONTACT_EMAIL` / `_PHONE` | public, build-time | no | Shown in the footer and on the contact page. Hidden while empty. |
| `NEXT_PUBLIC_SOCIAL_*` | public, build-time | no | LinkedIn, Instagram, YouTube and X links. Only `https://` URLs are shown. |
| `LEADS_BACKEND` | server | yes | `sheets-api` (recommended), `apps-script`, or `local-file` (dev only) |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | server, secret | for `sheets-api` | Target spreadsheet |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | server, secret | for `sheets-api` | Service-account email |
| `GOOGLE_PRIVATE_KEY` | server, secret | for `sheets-api` | Service-account private key (keep the `\n` sequences) |
| `SHEET_TAB_CONSULTATION` / `_COLLEGE` / `_GENERAL` | server | no | Override tab names |
| `APPS_SCRIPT_URL` / `APPS_SCRIPT_SHARED_SECRET` | server, secret | for `apps-script` | Apps Script alternative |
| `RATE_LIMIT_MAX` / `RATE_LIMIT_WINDOW_SECONDS` | server | no | Default: 5 submissions per 10 minutes per IP |

Setting up the spreadsheet, the service account and testing is covered step by step in **[docs/google-sheets-setup.md](./docs/google-sheets-setup.md)**.

## Deployment

**Vercel (simplest)**
1. Push the repository to GitHub, GitLab or Bitbucket and import it into Vercel. The framework is detected automatically.
2. Add all environment variables under **Settings → Environment Variables**, marking the Google values as sensitive.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain, then deploy. Redeploy whenever a `NEXT_PUBLIC_*` value changes, because these are built into the pages.
4. Add your custom domain and confirm `https://<domain>/sitemap.xml` lists your domain.
5. Submit the sitemap in Google Search Console.

**Any Node host** (Render, Railway, a VPS, Docker):
```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com npm run build
npm start               # listens on $PORT or 3000
```
Put it behind HTTPS. If you use a reverse proxy, make sure it forwards `Host` (or `X-Forwarded-Host`) and `X-Forwarded-For`, because the origin check and rate limiting rely on them.

> On serverless or multi-instance hosting, the in-memory rate limit and duplicate guard apply to each instance separately. For stronger protection, back `src/lib/leads/guards.ts` with Redis/KV (details in the Sheets guide).

### Post-deploy checks
- [ ] Submit each of the three forms and confirm the rows arrive in the correct tabs.
- [ ] Temporarily break the spreadsheet ID and confirm the form shows an error with no success message.
- [ ] `view-source:` any page and check the `<link rel="canonical">` uses the production domain.
- [ ] Search the built JavaScript for `PRIVATE KEY` (`grep -r "PRIVATE KEY" .next/static` should find nothing).

## Editing content

- **Programs:** edit or add objects in [`src/lib/programs.ts`](./src/lib/programs.ts). The Programs page, home cards, student page and modal interest options all read from this list. If you add a program, also add its name to `INTEREST_AREAS` in [`src/lib/leads/schema.ts`](./src/lib/leads/schema.ts).
- **FAQs:** edit [`src/lib/faqs.ts`](./src/lib/faqs.ts). Set `pending: true` to show a "to be confirmed" marker and keep that answer out of the FAQ structured data.
- **Navigation and footer:** [`src/lib/site.ts`](./src/lib/site.ts).
- **Logos:** replace the PNGs in the project root and run `npm run optimize:brand`.
- **Testimonials, partner logos and statistics:** there are deliberately none on the site. Once you have verified, permissioned evidence, add a section component for it in `src/components/sections/`.

## Accessibility and quality

- Semantic landmarks, a skip link, a single H1 per page, breadcrumbs (with BreadcrumbList structured data), and labelled form fields with `aria-invalid` and `aria-describedby` errors.
- The consultation modal uses the native `<dialog>`. It makes the background inert, closes with Escape and on backdrop click, locks page scroll, moves focus into the first field, and returns focus to the button that opened it.
- The dropdown, mobile menu and accordions follow the WAI-ARIA disclosure pattern. Animations are disabled when the visitor prefers reduced motion.
- Images are served responsively (AVIF/WebP) with blur placeholders, and those below the fold load lazily. Fonts are self-hosted through `next/font`.

## Documentation

| Document | Contents |
|---|---|
| [docs/competitor-research.md](./docs/competitor-research.md) | Competitor review with source URLs; verified observations kept separate from recommendations |
| [docs/seo-content-strategy.md](./docs/seo-content-strategy.md) | Search intent, keyword themes, titles and descriptions, internal links |
| [docs/sitemap-and-journeys.md](./docs/sitemap-and-journeys.md) | Sitemap, navigation, student and college conversion paths, lead-source values |
| [docs/google-sheets-setup.md](./docs/google-sheets-setup.md) | Spreadsheet, service account, env vars, testing, Apps Script alternative, security |
| [docs/launch-checklist.md](./docs/launch-checklist.md) | Business details, credentials and confirmations still needed from OunCatalyst |
| [public/images/CREDITS.md](./public/images/CREDITS.md) | Photo credits and licences |
