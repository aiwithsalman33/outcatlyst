import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { CheckList, PendingNote, SectionHeading } from "@/components/ui/Section";
import { Steps } from "@/components/sections/Steps";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { CtaBanner } from "@/components/ui/CtaBanner";

export const metadata = pageMetadata({
  title: "Experiential Learning Programs | OunCatalyst",
  description:
    "Learn by doing. Experiential programs like The Years Exchange aim to give students real industry exposure, guided reflection and professional confidence.",
  path: "/experiential-learning",
});

const INTEREST = "Experiential Programs (incl. The Years Exchange)";

export default function ExperientialLearningPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Programs", path: "/programs" }, { name: "Experiential Learning", path: "/experiential-learning" }]}
        eyebrow="Experiential learning"
        title="Some skills are only learned by doing."
        intro="Experiential programs connect students with real professional environments so they can observe, contribute, reflect and grow in confidence."
        image="experiential"
        actions={
          <>
            <ConsultationButton source="Experiential hero" interest={INTEREST}>Enquire About Experiential Programs</ConsultationButton>
            <a href="#years-exchange" className="btn-secondary">About The Years Exchange</a>
          </>
        }
      />

      <section className="section">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Why practical exposure matters" title="Experience turns knowledge into capability" />
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Working alongside professionals shows students how theory is applied under real constraints — deadlines,
              teams, clients and imperfect information. It builds the judgement and confidence that are hard to develop
              in a classroom alone.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] bg-soft p-7">
              <p className="text-sm font-semibold tracking-wider text-muted uppercase">In the classroom</p>
              <ul className="mt-4 space-y-2.5 text-[0.95rem] text-muted">
                <li>Concepts and frameworks</li>
                <li>Structured problems</li>
                <li>Individual assessment</li>
                <li>Feedback from educators</li>
              </ul>
            </div>
            <div className="rounded-[var(--radius-card)] border-2 border-brand p-7">
              <p className="text-sm font-semibold tracking-wider text-brand uppercase">Through experience</p>
              <ul className="mt-4 space-y-2.5 text-[0.95rem] text-ink">
                <li>Applying concepts in context</li>
                <li>Open-ended, real problems</li>
                <li>Working within teams</li>
                <li>Feedback from professionals</li>
              </ul>
            </div>
            <p className="text-sm text-muted sm:col-span-2">
              The two work best together: experience gives classroom learning a purpose, and classroom learning gives
              experience a foundation.
            </p>
          </div>
        </div>
      </section>

      <section id="years-exchange" className="section scroll-mt-20 bg-brand-deep text-white">
        <div className="container-site grid items-start gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow eyebrow-light">Featured initiative</p>
            <h2 className="h-section mt-4 text-white">The Years Exchange</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              The Years Exchange is an OunCatalyst experiential initiative intended to give students direct industry
              exposure and the opportunity to develop practical career skills in real professional settings.
            </p>
            <h3 className="mt-10 text-lg font-semibold text-white">Potential workplace-based learning activities</h3>
            <CheckList
              tone="light"
              className="mt-5"
              items={[
                "Observing how teams plan, decide and deliver work",
                "Contributing to real tasks or projects under guidance",
                "Conversations with professionals about their roles",
                "Structured reflection on what was learned and why it matters",
              ]}
            />
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-[var(--radius-card)] bg-white p-7 text-ink">
              <PendingNote title="Program details to be supplied">
                <p>The following will be published once confirmed by the OunCatalyst team:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Program structure and format</li>
                  <li>Duration and timing</li>
                  <li>Location(s)</li>
                  <li>Eligibility criteria</li>
                  <li>Participating organisations</li>
                </ul>
              </PendingNote>
              <ConsultationButton source="Years Exchange register interest" interest={INTEREST} className="btn-primary mt-6 w-full">
                Register Your Interest
              </ConsultationButton>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow="The learning cycle"
            title="Reflection is where experience becomes growth"
            intro="Experiential programs are designed around a simple cycle that helps students make sense of what they encounter."
          />
          <div className="mt-14">
            <Steps
              steps={[
                { title: "Prepare", body: "Set goals and understand the context before stepping into a professional environment.", icon: "target" },
                { title: "Experience", body: "Observe and contribute to real work alongside professionals.", icon: "briefcase" },
                { title: "Reflect", body: "Examine what happened, what worked, and what you would do differently.", icon: "reflect" },
                { title: "Grow", body: "Identify the skills and interests to build on next — and build confidence along the way.", icon: "growth" },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Photo image="liveClass" accents />
          <div>
            <SectionHeading
              eyebrow="College collaboration"
              title="Add experiential learning to your institution's offer"
              intro="We'd like to work with colleges to design experiential components that complement existing curricula and fit students' learning objectives."
            />
            <Link href="/for-colleges#partner-form" className="btn-primary mt-9">Discuss a College Partnership</Link>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Interested in learning by doing?"
        body="Tell us about your goals and we'll keep you informed as experiential opportunities are confirmed."
        primary={{ kind: "consult", label: "Enquire About Experiential Programs", source: "Experiential closing CTA", interest: INTEREST }}
        secondary={{ kind: "link", label: "View All Programs", href: "/programs" }}
      />
    </>
  );
}
