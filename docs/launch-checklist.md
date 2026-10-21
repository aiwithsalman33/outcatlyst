# Launch checklist — information still needed from OunCatalyst

The site has been built so that **nothing is invented**. Wherever a business fact wasn't supplied, the page either leaves it out or shows a visible yellow "To be confirmed" marker. Everything below has to be supplied or confirmed before launch.

## Credentials and configuration

- [ ] **Production domain.** Needed for `NEXT_PUBLIC_SITE_URL`: canonical URLs, sitemap, Open Graph tags and the form origin check.
- [ ] **Google Sheets.** A spreadsheet ID, plus a service-account email and private key, set up as described in `docs/google-sheets-setup.md`. Alternatively, the Apps Script URL and its shared secret.
- [ ] **Public contact email and phone.** The footer and contact page currently show "Contact details coming soon" until these are set.
- [ ] **Social profile URLs.** LinkedIn, Instagram, YouTube and X. Each one is hidden until it is set.
- [ ] **Hosting provider.** Choose one and add it to the Privacy Policy's service-provider list.

## Legal (Privacy Policy and Terms of Use are drafts)

- [ ] Registered legal entity name and registered address.
- [ ] Data-protection contact email.
- [ ] Governing law and jurisdiction.
- [ ] Data retention period for enquiry records.
- [ ] Legal basis for processing, and which data-protection law(s) apply.
- [ ] Data storage location and safeguards for transfers across borders.
- [ ] Minimum age policy, and how enquiries from under-18s are handled.
- [ ] Whether there will be a newsletter or any marketing use of the data. If so, add a separate opt-in.
- [ ] Analytics or cookies. None are installed now; add a cookie notice if analytics are added.
- [ ] **Have a qualified legal professional review both documents.** Then remove the "Draft" banners in `src/components/sections/LegalLayout.tsx` and set the "Last updated" date.

## Program and operational details

- [ ] Program formats, durations, delivery mode (online, on campus or hybrid) and fees, if any are to be published.
- [ ] Whether the consultation is free. The site doesn't currently say it is.
- [ ] **The Years Exchange:** its structure, duration, locations, eligibility and participating organisations. These are marked as pending on `/experiential-learning`.
- [ ] Industry Expert Connect: named experts and partner organisations, published only once agreed with them.
- [ ] Minimum or typical cohort sizes for college engagements (marked pending in the college FAQ).
- [ ] Confirm the wording of the mission statement on `/about`. It is written as an explanation of the vision, not a formally approved mission.
- [ ] Who on the team monitors the spreadsheet, and the expected response time. This could then be shown on the form success messages.

## Trust content (add only when verified)

- [ ] Testimonials and student stories, with written permission.
- [ ] Partner college or employer logos, with written permission.
- [ ] Outcome statistics, each with its source and date.
- [ ] Founder and team bios and photos for the About page.

## Brand assets

- [ ] Optional: a **transparent-background** version of the horizontal logo (SVG preferred). The supplied PNGs have a white background, so the logo is currently only placed on white surfaces.
- [ ] Optional: OunCatalyst's own photography to replace the stock images, which are listed in `public/images/CREDITS.md`.

## Pre-launch QA

- [ ] Run through the post-deploy checks in `README.md`.
- [ ] Test on real iOS Safari and Android Chrome devices.
- [ ] Run Lighthouse on Home, For Colleges and Programs.
- [ ] Submit `sitemap.xml` in Google Search Console.
