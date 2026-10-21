import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/Section";
import { FeatureGrid } from "@/components/sections/Steps";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { Icon } from "@/components/ui/Icon";

export const metadata = pageMetadata({
  title: "Global Career Coaching | OunCatalyst",
  description:
    "Country-specific career coaching for students exploring international careers: job-market awareness, workplace expectations and realistic career planning.",
  path: "/global-career-coaching",
});

const INTEREST = "Global Career Coaching";

export default function GlobalCareerCoachingPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Programs", path: "/programs" }, { name: "Global Career Coaching", path: "/global-career-coaching" }]}
        eyebrow="Global Career Coaching"
        title="Explore international careers with clarity, not guesswork."
        intro="Country-specific career guidance and job-market awareness for students considering opportunities beyond their home country — shaped around your goals and destination."
        image="global"
        actions={<a href="#enquire" className="btn-primary">Request a Coaching Consultation</a>}
      />

      <section className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow="What coaching covers"
            title="Five areas we help you think through"
            intro="Every student's situation is different, so coaching focuses on the questions that matter most for your goals."
          />
          <div className="mt-14">
            <FeatureGrid
              items={[
                { icon: "growth", title: "International job markets", body: "How hiring works in different markets, which sectors are active, and how competition and expectations can differ." },
                { icon: "globe", title: "Country-specific exploration", body: "Comparing destinations based on your field, goals and circumstances — with attention to each country's norms." },
                { icon: "briefcase", title: "Professional skills & workplace expectations", body: "Communication styles, workplace culture and the professional skills employers in your target market tend to value." },
                { icon: "route", title: "Career planning & decisions", body: "Turning broad ambitions into a structured plan, with options, trade-offs and next steps you control." },
                { icon: "compass", title: "Exploring relevant pathways", body: "Understanding the general routes students take towards international careers, and which may suit you." },
                { icon: "chat", title: "Honest, tailored conversations", body: "Guidance that reflects your situation — including when a path may not be the right fit right now." },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <div className="rounded-[var(--radius-card)] bg-soft p-8 sm:p-10">
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <Icon name="target" className="size-7 text-bright" /> Guidance depends on you
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              The right advice depends on your field of study, experience, goals and the countries you&apos;re
              considering. That&apos;s why coaching starts with understanding your situation rather than a fixed script.
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-line p-8 sm:p-10">
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <Icon name="shield" className="size-7 text-[#067a64]" /> What we don&apos;t promise
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Career coaching is guidance, not a guarantee. OunCatalyst does not promise overseas jobs, job offers, work
              visas, immigration outcomes or placements. Immigration and visa matters should always be confirmed with
              official government sources or a licensed adviser.
            </p>
          </div>
        </div>
      </section>

      <section id="enquire" className="section scroll-mt-20 bg-soft">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Consultation & enquiry"
              title="Tell us where you'd like to go"
              intro="Share your goals and the countries you're considering. Our team can follow up to discuss whether coaching is a good fit."
            />
            <ul className="mt-8 space-y-3 text-[0.95rem] text-muted">
              <li className="flex gap-3"><Icon name="check" className="mt-1 size-4 shrink-0 text-[#067a64]" />Mention target countries in your message</li>
              <li className="flex gap-3"><Icon name="check" className="mt-1 size-4 shrink-0 text-[#067a64]" />Include your field of study or work</li>
              <li className="flex gap-3"><Icon name="check" className="mt-1 size-4 shrink-0 text-[#067a64]" />Share any timelines you&apos;re working towards</li>
            </ul>
          </div>
          <div className="card p-6 sm:p-10 lg:col-span-8">
            <ConsultationForm leadSource="Global Coaching page form" presetInterest={INTEREST} />
          </div>
        </div>
      </section>
    </>
  );
}
