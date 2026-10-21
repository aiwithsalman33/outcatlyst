import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { CheckList, PendingNote, SectionHeading } from "@/components/ui/Section";
import { FeatureGrid, Steps } from "@/components/sections/Steps";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { Icon } from "@/components/ui/Icon";

export const metadata = pageMetadata({
  title: "Industry Expert Connect | OunCatalyst",
  description:
    "Industry mentorship for students: expert-led sessions, real-world problem discussions and career guidance from experienced professionals.",
  path: "/industry-connect",
});

const INTEREST = "Industry Expert Connect";

export default function IndustryConnectPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Programs", path: "/programs" }, { name: "Industry Connect", path: "/industry-connect" }]}
        eyebrow="Industry Expert Connect"
        title="Learn from the people doing the work."
        intro="Direct interaction with experienced professionals helps students understand workplace expectations, industry realities and the decisions that shape real careers."
        image="mentorship"
        actions={
          <>
            <ConsultationButton source="Industry Connect hero" interest={INTEREST}>Enquire as a Student</ConsultationButton>
            <Link href="/for-colleges#partner-form" className="btn-secondary">Bring This to Your College</Link>
          </>
        }
      />

      <section className="section">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Why it matters" title="What the classroom can't always show you" />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-7">
            <p>
              Textbooks explain how things should work. Professionals can explain how they actually do — the trade-offs,
              the constraints, the unwritten expectations and the skills that matter most on the job.
            </p>
            <p>
              Hearing this early helps students choose directions more deliberately, prepare more realistically and walk
              into their first roles with a clearer picture of what&apos;s ahead.
            </p>
            <CheckList
              items={[
                "Understand what different roles involve day to day",
                "See how professionals approach problems and decisions",
                "Learn which skills and behaviours workplaces value",
                "Ask the questions that rarely get answered in class",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container-site">
          <SectionHeading
            eyebrow="Proposed session formats"
            title="Ways students can engage with industry"
            intro="These are the formats we are designing Industry Expert Connect around. The exact mix can be tailored to a student group or institution."
          />
          <div className="mt-14">
            <FeatureGrid
              columns={2}
              items={[
                { icon: "mentor", title: "Expert-led sessions", body: "Professionals share how their industry works, how it is changing, and what that means for people starting out." },
                { icon: "lightbulb", title: "Real-world problem discussions", body: "Students work through challenges drawn from real professional contexts and hear how experts would approach them." },
                { icon: "chat", title: "Career insights & guidance", body: "Open conversations about career paths, skill development and practical next steps." },
                { icon: "briefcase", title: "Practical learning opportunities", body: "Activities that let students apply what they hear — from short tasks to discussions of their own work." },
              ]}
            />
          </div>
          <div className="mt-8 max-w-3xl">
            <PendingNote>
              Named experts, participating organisations and session schedules will be published here once confirmed. We
              don&apos;t list mentors or partner companies until those relationships are in place.
            </PendingNote>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <SectionHeading eyebrow="How a session could flow" title="From preparation to reflection" align="center" />
          <div className="mt-14">
            <Steps
              steps={[
                { title: "Prepare", body: "Students receive context on the topic or industry so they can arrive with informed questions.", icon: "target" },
                { title: "Engage", body: "An experienced professional leads a discussion built around real situations.", icon: "mentor" },
                { title: "Explore", body: "Open Q&A and problem discussion, where students test their thinking.", icon: "chat" },
                { title: "Reflect", body: "Students capture takeaways and consider how they apply to their own plans.", icon: "reflect" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Dual CTA */}
      <section className="section-tight pb-24">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-deep p-9 text-white sm:p-12">
            <Icon name="users" className="size-9 text-teal" />
            <h2 className="mt-6 text-3xl font-bold text-white">Are you a student?</h2>
            <p className="mt-4 text-lg text-white/75">
              Tell us which industries you&apos;re curious about and what you&apos;d like to learn. We&apos;ll explore how
              Industry Expert Connect could fit your goals.
            </p>
            <ConsultationButton source="Industry Connect student CTA" interest={INTEREST} className="btn-light mt-8">
              Send a Student Enquiry
            </ConsultationButton>
          </div>
          <div className="grid overflow-hidden rounded-[2rem] border border-line bg-white sm:grid-cols-5">
            <div className="p-9 sm:col-span-3 sm:p-12">
              <Icon name="building" className="size-9 text-bright" />
              <h2 className="mt-6 text-3xl font-bold">Represent a college?</h2>
              <p className="mt-4 text-lg text-muted">
                Bring structured industry interaction to your campus, designed around your students&apos; programs.
              </p>
              <Link href="/for-colleges#partner-form" className="btn-primary mt-8">Discuss a College Partnership</Link>
            </div>
            <Photo image="colleges" className="hidden sm:col-span-2 sm:block" aspect="h-full rounded-none! shadow-none!" sizes="20vw" />
          </div>
        </div>
      </section>
    </>
  );
}
