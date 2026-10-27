import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { programs, accentStyles, publishedSessionPrograms, formatPrice } from "@/lib/programs";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { ProgramDetail } from "@/components/sections/ProgramDetail";
import { FeaturedProgram, ProgramTopics } from "@/components/sections/FeaturedProgram";
import { Steps } from "@/components/sections/Steps";
import { SectionHeading } from "@/components/ui/Section";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { JsonLd } from "@/components/ui/JsonLd";
import { Icon } from "@/components/ui/Icon";

export const metadata = pageMetadata({
  title: "Programs & Career Consultation Bootcamp | OunCatalyst",
  description:
    "Join OunCatalyst's weekly Career Consultation Bootcamp or explore our career-development programs: live scenario-based classes, industry expert connect, global career coaching, beyond employability and experiential learning.",
  path: "/programs",
});

const featured = publishedSessionPrograms[0];

const howItWorks = [
  { title: "Register Your Interest", body: "Submit your contact details and explain your goals.", icon: "chat" },
  {
    title: "Confirm Your Session",
    body: "The OunCatalyst team confirms availability, session details, delivery mode, and payment instructions.",
    icon: "calendar",
  },
  { title: "Attend Your Session", body: "Participate in the consultation and work toward your career action plan.", icon: "target" },
];

const sessionItems = publishedSessionPrograms.map((p) => ({
  "@type": "Service",
  name: p.title,
  description: p.description,
  url: `${site.url}/programs#${p.id}`,
  provider: { "@type": "Organization", name: site.name, url: site.url },
  offers: { "@type": "Offer", price: p.price.amount, priceCurrency: p.price.currency },
}));

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "OunCatalyst career development programs",
  itemListElement: [
    ...sessionItems,
    ...programs.map((p) => ({
      "@type": "Service",
      name: p.title,
      description: p.summary,
      url: `${site.url}/programs#${p.id}`,
      provider: { "@type": "Organization", name: site.name, url: site.url },
    })),
  ].map((item, i) => ({ "@type": "ListItem", position: i + 1, item })),
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Programs", path: "/programs" }]}
        eyebrow="OunCatalyst Programs"
        title="Build Your Career With Clarity."
        intro="Join practical career consultation and guided bootcamp sessions designed to help students and early-career professionals understand their options and take their next steps with confidence."
        actions={
          <>
            <a href={featured ? `#${featured.id}` : "#program-details"} className="btn-primary">
              {featured ? "Explore the Bootcamp" : "See program details"}
            </a>
            <ConsultationButton source="Programs hero" className="btn-secondary">Request a Consultation</ConsultationButton>
          </>
        }
        aside={
          <nav aria-label="Programs on this page" className="card p-3">
            <ul>
              {publishedSessionPrograms.map((p) => (
                <li key={p.id}>
                  <a href={`#${p.id}`} className="group flex items-center gap-4 rounded-xl bg-soft px-4 py-3.5 transition hover:bg-bright/10">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-white">
                      <Icon name="calendar" className="size-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold text-ink group-hover:text-brand">{p.title}</span>
                      <span className="block text-sm text-muted">{formatPrice(p.price)} / {p.price.unit} · {p.frequency}</span>
                    </span>
                    <Icon name="arrow" className="size-4 text-muted transition group-hover:translate-x-1 group-hover:text-brand" />
                  </a>
                </li>
              ))}
              {programs.map((p) => (
                <li key={p.id}>
                  <a href={`#${p.id}`} className="group flex items-center gap-4 rounded-xl px-4 py-3.5 transition hover:bg-soft">
                    <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${accentStyles[p.accent].chip}`}>
                      <Icon name={p.icon} className="size-5" />
                    </span>
                    <span className="flex-1 font-semibold text-ink group-hover:text-brand">{p.title}</span>
                    <Icon name="arrow" className="size-4 text-muted transition group-hover:translate-x-1 group-hover:text-brand" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {featured ? (
        <>
          <section className="pt-12 pb-16 sm:pb-20">
            <div className="container-site">
              <SectionHeading
                eyebrow="Featured program"
                title="Start with a guided career consultation"
                intro="Weekly sessions for students, freshers and early-career professionals who want a clearer view of their options."
              />
              <div className="mt-10">
                <FeaturedProgram program={featured} />
              </div>
            </div>
          </section>

          <section className="section-tight bg-soft">
            <div className="container-site">
              <SectionHeading
                eyebrow={featured.title}
                title="What You'll Work On"
                intro="The planned focus of each session. What you cover depends on your goals and where you are today."
              />
              <div className="mt-10">
                <ProgramTopics program={featured} />
              </div>
            </div>
          </section>

          <section className="section-tight">
            <div className="container-site">
              <SectionHeading eyebrow="How it works" title="From enquiry to session in three steps" />
              <div className="mt-10">
                <Steps steps={howItWorks} />
              </div>
            </div>
          </section>
        </>
      ) : null}

      <section id="program-details" className={`scroll-mt-24 pb-10 ${featured ? "border-t border-line pt-16 sm:pt-20" : "pt-12"}`}>
        <div className="container-site">
          <SectionHeading
            eyebrow="Career development programs"
            title="What each program involves"
            intro="Every program is shaped around practical application. Specific formats, schedules and fees are discussed with you during a consultation, based on your needs."
          />
          <div className="mt-6">
            {programs.map((p) => (
              <ProgramDetail key={p.id} program={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight bg-soft">
        <div className="container-site grid gap-8 md:grid-cols-2">
          <div className="card p-8 sm:p-10">
            <Icon name="users" className="size-8 text-bright" />
            <h2 className="mt-5 text-2xl font-bold">For students</h2>
            <p className="mt-3 text-muted">Find the right starting point for where you are in your studies and what you want next.</p>
            <Link href="/for-students" className="link-arrow mt-6">Student guide <Icon name="arrow" className="size-4" /></Link>
          </div>
          <div className="card p-8 sm:p-10">
            <Icon name="building" className="size-8 text-bright" />
            <h2 className="mt-5 text-2xl font-bold">For colleges</h2>
            <p className="mt-3 text-muted">Bring one or more programs to your institution through a tailored collaboration.</p>
            <Link href="/for-colleges" className="link-arrow mt-6">College partnerships <Icon name="arrow" className="size-4" /></Link>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Not sure which program fits?"
        body="Tell us about your goals and we'll help you identify a sensible starting point."
        primary={{ kind: "consult", label: "Book a Consultation", source: "Programs closing CTA", interest: "Not sure yet — I'd like guidance" }}
        secondary={{ kind: "link", label: "Read the FAQ", href: "/faq" }}
      />
      <JsonLd data={itemList} />
    </>
  );
}
