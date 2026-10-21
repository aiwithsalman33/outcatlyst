# OunCatalyst: Competitor & Reference Website Research (Phase 1)

Research date: 2026-10-21. Method: live `WebFetch` of official pages plus `WebSearch` where a fetch was blocked.
Everything under "Verified observations" comes from a page fetched on that date, or from search results where that is
stated. Everything under "Design recommendations" is our interpretation for OunCatalyst. No statistics here are invented.
Any number quoted is the competitor's own claim as shown on its page, not an independently verified fact.

## 1. Sources: what was actually fetched

| Company | URL | Result |
|---|---|---|
| Coursera | https://www.coursera.org/ | Fetched OK |
| Coursera for Campus | https://www.coursera.org/campus | Fetched OK |
| Udemy Business | https://business.udemy.com/ | **HTTP 403, not fetched** |
| Udemy Business | https://www.udemy.com/udemy-business/ | **HTTP 403, not fetched** |
| Udemy Business | https://business.udemy.com/request-demo/ | **HTTP 403, not fetched** |
| Forage | https://www.theforage.com/ | Fetched OK |
| Forage educators | https://www.theforage.com/educators | **Failed (parse error: header overflow)** |
| Springboard | https://www.springboard.com/ , /courses/ , /how-it-works | **HTTP 403, not fetched** |
| Handshake | https://joinhandshake.com/ | Fetched OK |
| Handshake career centers | https://joinhandshake.com/career-centers/ | Fetched OK |
| NACE | https://www.naceweb.org/career-readiness/competencies/career-readiness-defined | Fetched OK |
| EF | https://www.ef.com/ | Fetched OK (location selector only) |
| EF global English | https://www.ef.com/wwen/ | Fetched OK |

For Udemy Business, Springboard and Forage-for-educators, only search-result summaries were available. Those are marked
**(search only)** and should be treated as low-confidence. Verify them by hand in a browser before relying on them.

## 2. Summary table (verified observations)

| | Primary audience on homepage | Audience split method | Main CTA wording | Conversion pattern | Key trust elements |
|---|---|---|---|---|---|
| Coursera | Individual learners | Header tabs: For Individuals / Businesses / Universities / Governments | "Join for Free", "Explore AI courses", "Explore programs" | Self-serve signup; B2B goes to "Contact us" | Partner logo bar ("350+ leading universities and companies"), outcome stat with source footnote, named learner testimonials, FAQ |
| Coursera for Campus | Universities | Separate sub-site with its own logo and nav | "Contact us" (hero), "compare plans" | Link to contact/learn-more page; no inline form visible | 3 survey stats, ~30 partner logos, named faculty testimonials, downloadable reports |
| Forage | Students | Nav: For Enterprise / For Educators; footer columns per audience | "Get Started", "Enroll Now", "Find a Job Simulation" | Free student signup; enterprise "Request a Demo"; "Register as an Educator" | Employer logo ticker, featured employers, 3 student stories ("Landed a job at..."), numbered how-it-works steps |
| Handshake | Job seekers / students | Top nav: Employers / Job seekers / Career centers | "Sign up", "Get started", "Contact us" (career centers) | Students: sign up. Institutions: "Contact us" / "Request demo" | Career centers page: "1,500+ educational institutions", logo wall, 4 named staff testimonials, 3 case studies with outcomes |
| NACE | Career-services professionals | Not a sales site | "Download", "Assessment tool", "Become a member" | Free downloadable frameworks; paid assessment | Authority: published competency framework with history (2015-2020 revisions) |
| EF (wwen) | Students of all ages + companies | "Find your perfect program" by age band: Kids & teens / Adults / Companies & government | "Browse our programs", "Free brochure" | Brochure request plus phone number in the header | "60 years of experience", "students from over 100 countries", accreditation |
| Udemy Business | Companies (search only) | n/a | n/a | n/a | Could not verify |
| Springboard | Career changers (search only) | n/a | n/a | n/a | Could not verify |

## 3. Per-company verified observations

### Coursera (https://www.coursera.org/)
- **Header:** audience tabs "For Individuals", "For Businesses", "For Universities", "For Governments", plus Explore, Degrees, Log In, and "Join for Free".
- **Hero:** "Learn without limits" with CTA "Explore AI courses". A promo banner follows ("Get started"), then a carousel "Start, switch, or advance your career" with "Join for Free".
- **Trust bar:** "Learn from 350+ leading universities and companies" with partner logos.
- **Self-segmentation block:** "What brings you to Coursera today?" with options Start my career / Change my career / Grow in my current role / Explore topics outside of work. This is a goal-based selector, not an audience-type selector.
- **Outcome claim with a source:** "91% of learners achieved a positive career outcome", with a footnote naming its data source and a "Learn more" link.
- **Ending:** testimonials (4 named learners, carousel), then an FAQ covering accreditation, certificate value, pricing, and outcomes.
- **Footer:** large SEO-oriented link columns: Skills, Professional Certificates, Courses, Career Resources, Coursera (incl. For Enterprise / Government / Campus), Community, More.
- **SEO organisation:** category hubs, a skills taxonomy in the footer, a "Career Resources" article hub, and an FAQ on the homepage.

### Coursera for Campus (https://www.coursera.org/campus)
- A separate B2B sub-site: its own logo, and nav items "Why Coursera", "Solutions", "Resources", "Compare Plans", "Contact Us".
- **Hero:** "Empower employability with online learning for universities". Primary CTA "Contact us", secondary "compare plans".
- **Stats row** of three survey-derived percentages (students/employers views on micro-credentials and certificates).
- **Section order:** catalog claim + logo grid → Career Academy → research report ("Get report") → 4 platform features (including LMS Integration) → university logos + faculty testimonial → "Get in touch with our sales team" → second testimonial → resource cards (reports/playbooks).
- **No inline form.** Every CTA links to a contact page.

### Forage (https://www.theforage.com/)
- **Nav:** Job Simulations, Jobs, Blog, For Enterprise, For Educators, Sign Up, Sign In.
- **Hero:** "Build confidence. Get the job." with the subhead about free job simulations "designed by the world's top employers", CTA "Get Started→".
- **Sections:** employer logo ticker → simulation cards showing title, category, difficulty, duration → "Forage is the bridge between education and career success" with 4 numbered steps and stats ("3.3x more likely", "250 job simulations and 90+ employers", "9M+ students", all as stated) → featured employers → testimonials headed "Too good to be true? Hear from real students." (each says "Landed a job at …") → mission statement → "Enroll Now".
- **Footer:** columns For Students / For Enterprise ("Request a Demo") / For Educators ("Register as an Educator") / About Us (incl. Editorial Guidelines, FAQs) / Support. It has a separate "Privacy Notice - Minors".
- **Audience split** appears only in the nav and footer. The homepage is student-first.
- **(search only)** Educator offering: per search results, Forage pitches free integration of job simulations into curriculum, LMS link-pasting, and institution-branded landing pages (e.g. theforage.com/landing/...). Sources: https://employers.theforage.com/post/forage-for-education , https://careerservices.pace.edu/resources/integrate-project-based-virtual-work-experiences-using-forage/ . The educators page itself could not be fetched.

### Handshake (https://joinhandshake.com/ and /career-centers/)
- **Homepage nav:** Employers, Job seekers, Career centers, AI skills, Handshake AI, Enterprise AI, Research; "Log in" / "Sign up".
- **Homepage** is job-seeker-first (job search filters, opportunity cards with pay). It shows no testimonials or logos.
- **Footer** columns are per audience: Students, Handshake AI, Employers ("Pricing", "Request demo"), Career centers ("Marketing toolkit", "Security", "Request demo"), Company, Support.
- **Career centers page** is a strong B2B template. Order: hero "Get your students hired" + "Contact us" → "By the numbers" ("trusted partner of 1,500+ educational institutions", as stated) → institution logo wall → 4 value blocks (stay relevant, grow employer network, create career experiences, data/reporting) → 4 testimonials from named staff with institution → 3 case-study cards with outcome numbers → closing CTA "Contact us".
- No embedded form. Conversion routes to a contact page. "Security" is surfaced for institutions.

### NACE (https://www.naceweb.org/career-readiness/competencies/career-readiness-defined)
- Defines career readiness as "a foundation from which to demonstrate requisite core competencies" that prepare college-educated people for workplace success and lifelong career management.
- **Eight competencies:** Career & Self-Development; Communication; Critical Thinking; Equity & Inclusion (marked "under review" on the page); Leadership; Professionalism; Teamwork; Technology.
- **Structure:** breadcrumb → definition → downloadable assets (PDF, icon set, poster, presentation) → a panel per competency with sample behaviours → paid assessment tool → related articles → initiative history.
- Usage terms are stated for noncommercial use, with reprint guidance. **Implication:** OunCatalyst may reference the framework, but should not reproduce NACE's assets or icons, or imply endorsement, without permission.

### EF Education First (https://www.ef.com/ and https://www.ef.com/wwen/)
- ef.com root is a location/language selector (59 locale links across 6 regions). It has no marketing content.
- **wwen hero:** "hello!" with the line "We open the world through language learning, cultural exchange, academic achievement and educational travel." CTA "Browse our programs".
- **"Find your perfect program":** Kids & teens (age filters 12-16, 16-18), Adults (18-25, 25+, 50+), Companies & government ("View programs").
- **Program type cards (7)**, then resources (tests, app, Teacher Zone, an English Proficiency Index), then "Why travel with EF?" ("60 years of experience", "Students from over 100 countries", method, accreditation, "All schools and programs run by EF").
- **Lead capture:** "Free brochure" (destination guides, prices, start dates), plus a phone number in the header and footer, and "View all worldwide offices". No consultation form was visible.
- **Footer:** Programs by age, Popular programs, Discover (blog, guides, accreditations), About EF, HQ address, region selector.

### Udemy Business (search only, not fetched)
- Pages returned HTTP 403. A search surfaced https://business.udemy.com/about/ , which describes cohort-based and on-demand learning for companies with localized content in many languages. Third-party review sites (Gartner, Software Advice) list ratings. **No homepage structure, CTA or form observations could be verified.** Commonly known patterns such as "Request a demo" were **not** confirmed in this research.

### Springboard (search only, not fetched)
- All pages returned HTTP 403. Search results point to https://www.springboard.com/how-it-works , which is summarised as describing a career coach, mentor support, and a conditional job guarantee "subject to terms". A third-party review (https://mentorcruise.com/blog/springboard-review-2026-the-job-guarantee-fine-print-cost-and-who-qualifies/) says the guarantee is heavily conditional and reports reviewer complaints about uneven mentor quality.
- **Lesson (from third-party coverage, not verified on the site):** outcome guarantees and hiring percentages draw scrutiny. Avoid them unless they are fully substantiated.

## 4. Cross-site patterns (verified across the fetched pages)

1. **Student-first homepage, B2B routed via nav.** Coursera, Forage and Handshake all lead with the individual learner and send institutions to a dedicated page or sub-site through header tabs.
2. **B2B pages convert with "Contact us", not inline forms.** Coursera Campus and Handshake Career Centers both repeat "Contact us" in the hero and the closing section.
3. **Trust is layered:** logos → stats (with a source where possible) → named testimonials (name + institution/employer) → case studies with a specific outcome.
4. **"How it works" numbered steps** (Forage's 4 steps) make an abstract offer concrete.
5. **Footers double as SEO sitemaps,** with per-audience columns (Forage, Handshake) or taxonomy columns (Coursera, EF).
6. **Goal-based or age-based self-selection** (Coursera's "What brings you here today?", EF's age bands) helps visitors self-route.
7. **Authority content** (NACE frameworks, Coursera reports, EF's proficiency index) is used as a lead magnet and an SEO asset.

## 5. Design recommendations for OunCatalyst (interpretation, not observation)

**Navigation**
- Header: Programs, Industry Connect, Global Career Coaching, Experiential Learning, About, plus two audience entry points "For Students" and "For Colleges". Primary button: "Book a Free Consultation". Secondary: "Partner With Us" (colleges).
- Footer columns: For Students | For Colleges | Programs | Company (About, FAQ, Contact) | Legal (Privacy, Terms, plus a minors' privacy notice if under-18s are served, following Forage's pattern).

**Homepage section order**
1. Hero: the value proposition ("become independent and career-ready"), a primary CTA for students and a text link for colleges.
2. Audience split cards: "I'm a student" / "I represent a college or institution".
3. Four pillars: Practical Live Classes, Industry Connect, Global Career Coaching, Experiential Learning. Each card links to its page.
4. "How it works" in 3-4 numbered steps.
5. "Beyond employability" / career-ownership statement (the differentiator).
6. Featured experience: The Years Exchange.
7. Trust area: partner logos, testimonials and outcomes **only once verified** (see the SEO doc's content gaps). Until then, show approach and mentor-profile placeholders hidden behind a feature flag. Do not show fake content.
8. FAQ preview (5 questions), then a final CTA band.

**Conversion**
- Students: a short form (name, email, phone, current stage, area of interest, message), CTA "Book a Free Consultation".
- Colleges: a separate form (name, role, institution, city/country, student count range, interest, message), CTA "Request a Partnership Call". Mirror Handshake by repeating it in the hero and the closing band of /for-colleges.
- Inline forms are a reasonable choice for a new brand without a sales funnel. They differ from Coursera and Handshake, which link out to contact pages.

**Trust without fabrication**
- Use process transparency (curriculum outline, session format, mentor vetting criteria) and alignment with recognised frameworks (e.g. "mapped to widely used career-readiness competencies such as communication, critical thinking, teamwork and professionalism") instead of unverified numbers.
- Every stat shown must carry a source line, as Coursera does with its outcome stat.

## 6. Differentiation opportunities

- **Live, scenario-based classes vs self-paced catalogs.** Coursera and Forage are self-paced or asynchronous. "Practical live classes with real scenarios" is a clear contrast.
- **Career ownership over job placement.** Handshake and Forage frame success as "get the job". OunCatalyst's "beyond employability" message (independence, self-direction, long-term career ownership) is a distinct position. NACE's "Career & Self-Development" competency supports it as a credible frame.
- **Human mentorship as a core offer, honestly described.** Third-party criticism of Springboard (random mentor matching, conditional guarantees) suggests stating mentor selection criteria and avoiding guarantees.
- **Experiential and global in one place.** EF owns travel and exchange, and Forage owns virtual simulations. The Years Exchange plus global career coaching can bridge both for students who want international career exposure.
- **Institution partnership as co-creation.** Coursera Campus sells a catalog licence. OunCatalyst can pitch co-designed programs, industry sessions on campus, and reporting for the college.

## 7. Target audiences and journeys

### Student journey
1. **Awareness:** searches like "industry mentorship for students" or "practical learning programs", social media, or a college referral. Lands on a pillar page or /for-students.
2. **Consideration:** reads /programs (format, duration, outcomes in skill terms), /industry-connect (who the mentors are, how matching works), and /faq (fees, schedule, eligibility).
3. **Reassurance:** sees verified testimonials, mentor profiles, a sample class outline, and parent-relevant information (safety and contact policy for minors on experiential programs).
4. **Action:** "Book a Free Consultation" form, then a confirmation page with next steps.
5. **Post-conversion (outside site scope):** counselling call, program enrolment.

### College / institution journey
1. **Awareness:** a career-services or placement officer searches "college industry collaboration" or "career readiness programs", or arrives via outreach. Lands on /for-colleges.
2. **Evaluation:** partnership models (on-campus workshops, industry-connect series, credit or co-curricular integration, experiential cohorts), competency alignment, and reporting offered to the college.
3. **Proof:** institution logos and named staff testimonials once available, a pilot case study, a downloadable partnership brochure (EF and Coursera both use downloadable assets).
4. **Action:** "Request a Partnership Call" form, with role and institution fields.
5. **Decision support:** data handling/privacy page link, FAQ section for institutions.

## 8. Design decisions this research supports

| Decision | Supported by |
|---|---|
| Separate /for-students and /for-colleges pages, with an audience switch in the header | Coursera tabs, Handshake nav, Forage nav/footer |
| Student-first homepage with a clear secondary route for institutions | Coursera, Forage, Handshake homepages |
| Repeated single CTA on B2B page (hero + closing band) | Coursera Campus, Handshake Career Centers |
| Numbered "How it works" section | Forage 4-step section |
| Named testimonials with affiliation, only when verified | Coursera, Forage, Handshake |
| Source line under any statistic | Coursera outcome stat footnote |
| FAQ on homepage plus a dedicated /faq | Coursera homepage FAQ |
| Per-audience footer columns that double as an internal-link map | Forage, Handshake, Coursera |
| Downloadable brochure as a secondary lead magnet (later phase) | EF "Free brochure", Coursera Campus reports |
| Reference career-readiness competencies without copying NACE assets | NACE usage/reprint terms |
| No job or placement guarantees | Third-party scrutiny of Springboard (search only) |
