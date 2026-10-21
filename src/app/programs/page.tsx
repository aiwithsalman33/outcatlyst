import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { programs, accentStyles } from "@/lib/programs";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { ProgramDetail } from "@/components/sections/ProgramDetail";
import { SectionHeading } from "@/components/ui/Section";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { JsonLd } from "@/components/ui/JsonLd";
import { Icon } from "@/components/ui/Icon";

export const metadata = pageMetadata({
  title: "Career Development Programs | OunCatalyst",
  description:
    "Explore OunCatalyst's five career-development programs: live scenario-based classes, industry expert connect, global career coaching, beyond employability and experiential learning.",
  path: "/programs",
});

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "OunCatalyst career development programs",
  itemListElement: programs.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: p.title,
      description: p.summary,
      url: `${site.url}/programs#${p.id}`,
      provider: { "@type": "Organization", name: site.name, url: site.url },
    },
  })),
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Programs", path: "/programs" }]}
        eyebrow="Programs & services"
        title="Career development programs designed for the real world"
        intro="Five complementary programs that help students build practical skills, understand industry, and take ownership of their career growth."
        actions={
          <>
            <a href="#program-details" className="btn-primary">See program details</a>
            <ConsultationButton source="Programs hero" className="btn-secondary">Book a Consultation</ConsultationButton>
          </>
        }
        aside={
          <nav aria-label="Programs on this page" className="card p-3">
            <ul>
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

      <section id="program-details" className="scroll-mt-24 pt-12 pb-10">
        <div className="container-site">
          <SectionHeading
            eyebrow="Program details"
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
