import { pageMetadata, faqJsonLd } from "@/lib/seo";
import { collegeFaqs } from "@/lib/faqs";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/Section";
import { FeatureGrid, Steps } from "@/components/sections/Steps";
import { FaqList } from "@/components/sections/FaqList";
import { CollegePartnershipForm } from "@/components/forms/CollegePartnershipForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { Icon } from "@/components/ui/Icon";

export const metadata = pageMetadata({
  title: "College Partnerships | OunCatalyst",
  description:
    "Partner with OunCatalyst to bring practical learning, industry interactions, mentorship and experiential programs to your students. Request a partnership discussion.",
  path: "/for-colleges",
});

export default function ForCollegesPage() {
  return (
    <>
      <PageHero
        tone="deep"
        crumbs={[{ name: "For Colleges", path: "/for-colleges" }]}
        eyebrow="College partnerships"
        title="Let's Prepare Students for the Real World."
        intro="Collaborate with OunCatalyst to deliver practical learning programs, industry interactions, and career-development initiatives tailored to students' needs."
        actions={
          <>
            <a href="#partner-form" className="btn-light">Discuss a College Partnership</a>
            <a href="#process" className="btn-ghost-light">See the proposed process</a>
          </>
        }
        aside={
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: "classroom", t: "Practical learning" },
              { icon: "handshake", t: "Industry interaction" },
              { icon: "mentor", t: "Mentorship & expert sessions" },
              { icon: "spark", t: "Experiential initiatives" },
            ].map((x) => (
              <li key={x.t} className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
                <Icon name={x.icon} className="size-7 text-teal" />
                <p className="mt-4 font-semibold text-white">{x.t}</p>
              </li>
            ))}
          </ul>
        }
      />

      {/* Challenge */}
      <section className="section">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="The career-readiness challenge" title="Graduates need more than a degree to start well" />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                Colleges work hard to give students strong academic foundations. Yet many students still find the move
                into professional life difficult: they have limited exposure to how industries operate, few chances to
                apply learning to real problems, and little guidance on long-term career decisions.
              </p>
              <p>
                OunCatalyst aims to work alongside institutions to complement academic programs with practical,
                industry-connected learning that fits each institution&apos;s context.
              </p>
            </div>
          </div>
          <Photo image="colleges" accents />
        </div>
      </section>

      {/* Offer */}
      <section className="section bg-soft">
        <div className="container-site">
          <SectionHeading
            eyebrow="What we can bring to campus"
            title="Customisable engagement opportunities"
            intro="Select one area or combine several into an engagement shaped around your students."
          />
          <div className="mt-14">
            <FeatureGrid
              items={[
                { icon: "classroom", title: "Practical learning programs", body: "Live, scenario-based classes that connect curriculum concepts to real workplace challenges." },
                { icon: "handshake", title: "Industry interactions", body: "Sessions that bring professionals into conversation with students about their fields and roles." },
                { icon: "mentor", title: "Mentorship & expert sessions", body: "Guidance from experienced professionals on skills, decisions and career paths." },
                { icon: "spark", title: "Experiential learning initiatives", body: "Opportunities for direct industry exposure, including The Years Exchange." },
                { icon: "globe", title: "Global career coaching", body: "Support for students exploring careers in international markets." },
                { icon: "layers", title: "Tailored combinations", body: "Engagements designed around your cohort size, calendar and learning objectives." },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="section scroll-mt-20">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Proposed collaboration process" title="How a partnership could take shape" />
            <p className="max-w-sm text-sm text-muted">
              This is a proposed process to guide early conversations, not a fixed service package. Each step is adapted
              to your institution.
            </p>
          </div>
          <div className="mt-14">
            <Steps
              steps={[
                { title: "Understand your requirements", body: "We learn about your institution, your programs and what you hope to achieve.", icon: "building" },
                { title: "Discuss student needs", body: "Together we identify students' needs and the learning objectives that matter most.", icon: "users" },
                { title: "Design a proposal", body: "We prepare a suitable engagement proposal for your review and refinement.", icon: "layers" },
                { title: "Deliver & evaluate", body: "We coordinate delivery and gather feedback to evaluate and improve the engagement.", icon: "reflect" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="partner-form" className="section scroll-mt-20 bg-brand-deep">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="text-white lg:col-span-4">
            <p className="eyebrow eyebrow-light">Institutional consultation</p>
            <h2 className="h-section mt-4 text-white">Discuss a college partnership</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/75">
              Share a few details about your institution. Our team will review your enquiry and get in touch to arrange an
              initial discussion.
            </p>
            <ul className="mt-8 space-y-4 text-white/80">
              {["No obligation — an exploratory conversation", "Engagements tailored to your students", "Your details are used only to respond"].map((t) => (
                <li key={t} className="flex gap-3"><Icon name="check" className="mt-1 size-4 shrink-0 text-teal" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-2xl sm:p-10 lg:col-span-8">
            <CollegePartnershipForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQ" title="Questions from colleges" />
          </div>
          <div className="lg:col-span-8">
            <FaqList items={collegeFaqs} />
          </div>
        </div>
      </section>
      <JsonLd data={faqJsonLd(collegeFaqs.filter((f) => !f.pending))} />
    </>
  );
}
