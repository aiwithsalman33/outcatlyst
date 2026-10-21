# Sitemap, navigation and conversion paths

## Sitemap

| Route | Page | Primary audience | Primary conversion |
|---|---|---|---|
| `/` | Home | Students and colleges | Explore Programs, Book a Consultation |
| `/about` | About Us — vision, mission, values | Both | Explore Programs, College Partnership |
| `/programs` | Programs & Services — all five programs in detail | Students | Enquire About This Program (modal, interest pre-selected) |
| `/industry-connect` | Industry Expert Connect | Students and colleges | Student enquiry (modal), College Partnership |
| `/global-career-coaching` | Global Career Coaching | Students | Inline consultation form |
| `/experiential-learning` | Experiential Learning and The Years Exchange | Students and colleges | Register interest (modal), College Partnership |
| `/for-colleges` | College Partnerships (B2B) | Institutions | Institutional form (`#partner-form`) |
| `/for-students` | Students | Students | Student consultation (modal) |
| `/contact` | Contact | Everyone | General enquiry form, with routes to student and college paths |
| `/faq` | FAQ | Everyone | Consultation, Contact |
| `/privacy-policy` | Privacy Policy (draft) | — | — |
| `/terms` | Terms of Use (draft) | — | — |
| `/sitemap.xml`, `/robots.txt` | Generated | Search engines | — |
| any other path | 404 page | — | Home, Programs |

## Navigation

**Header (all pages):**
- Links: Home · About Us · **Programs ▾** · For Colleges · For Students · Contact.
- The **Book a Consultation** button stays visible at all times.
- The Programs dropdown contains All Programs, Industry Connect, Global Career Coaching and Experiential Learning. It works with mouse hover, click, and the keyboard (Enter/Space, ↑/↓, Escape).
- On mobile, a full-screen menu has an expandable Programs group, an FAQ link and the consultation button.

**Footer:**
- The logo and a short brand description.
- Link columns for Programs, Students, Colleges and Contact. Social links appear once configured.
- Privacy and Terms links, and a copyright year set automatically.

## Conversion paths

### Student journey
1. They arrive on Home, a program page or For Students, usually from search or social.
2. **Orientation:** the hero message and the five program cards. For Students offers a "Which sounds most like you?" self-selection.
3. **Detail:** `/programs` has full program details. Industry Connect, Global Coaching and Experiential Learning each have a dedicated page.
4. **Conversion:**
   - Any "Book a Consultation" or "Enquire About This Program" button opens the same modal. The Area of Interest is pre-filled from the button that opened it, and the Lead Source is recorded.
   - Global Coaching has the form inline on the page.
   - The modal also opens automatically once per browser session after about 1.8 seconds. It doesn't do this on `/contact`, `/for-colleges` or the legal pages, or while the visitor is typing.
5. **Reassurance:** FAQ, the "What we don't promise" box, the privacy note in every form, and the drafts of the Privacy Policy and Terms.

### College journey
1. They arrive on For Colleges, from the header, the Home partnership band, or the college buttons on program pages.
2. **Problem framing:** the career-readiness challenge, followed by the services that can be brought to campus.
3. **Process:** a 4-step collaboration process, clearly labelled as proposed.
4. **Conversion:** the institutional form at `#partner-form` writes to the **College Partnerships** tab.
5. **Objections:** the college FAQ on the same page, with a link to the full FAQ.

## Lead-source values (for CRM reporting)

`Auto popup`, `Header CTA`, `Mobile menu CTA`, `Home hero`, `Home closing CTA`, `Programs hero`, `Programs page — <program>`, `Programs closing CTA`, `Industry Connect hero`, `Industry Connect student CTA`, `Global Coaching page form`, `Experiential hero`, `Years Exchange register interest`, `Experiential closing CTA`, `Students hero`, `Students closing CTA`, `FAQ closing CTA`, `Contact page student card`, `For Colleges form`, `Contact page form`.
