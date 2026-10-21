import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { programs, accentStyles } from "@/lib/programs";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/Section";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Icon } from "@/components/ui/Icon";

export const metadata = pageMetadata({
  title: "Career Development for Students | OunCatalyst",
  description:
    "Explore career directions, build practical skills, connect with professionals and plan long-term growth with OunCatalyst's student programs.",
  path: "/for-students",
});

const helps = [
  { icon: "compass", title: "Explore career directions", body: "Understand the roles and industries open to you, and which ones genuinely interest you." },
  { icon: "classroom", title: "Develop practical skills", body: "Practise with realistic scenarios so you can apply what you know, not just recall it." },
  { icon: "briefcase", title: "Understand workplace expectations", body: "Learn how professionals work, communicate and make decisions." },
  { icon: "mentor", title: "Connect with experienced professionals", body: "Hear first-hand perspectives and ask the questions that matter to you." },
  { icon: "target", title: "Evaluate opportunities", body: "Weigh options thoughtfully — locally or internationally — with a clear framework." },
  { icon: "growth", title: "Plan for long-term growth", body: "Build habits of continuous learning so your career keeps moving forward." },
];

const fit = [
  { q: "I don't know which career suits me yet.", programId: "industry-expert-connect" },
  { q: "I want practical skills, not more theory.", programId: "live-classes" },
  { q: "I'm thinking about working abroad.", programId: "global-career-coaching" },
  { q: "I want to plan beyond my first job.", programId: "beyond-employability" },
  { q: "I want real-world experience.", programId: "experiential-programs" },
];

export default function ForStudentsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "For Students", path: "/for-students" }]}
        eyebrow="For students"
        title="Your career is yours to build. Let's start building."
        intro="OunCatalyst helps you move from 'What should I do?' to a plan you understand and own — with practical skills, industry perspective and guidance along the way."
        image="students"
        actions={
          <>
            <ConsultationButton source="Students hero">Book a Student Consultation</ConsultationButton>
            <a href="#programs" className="btn-secondary">Find your starting point</a>
          </>
        }
      />

      <section className="section">
        <div className="container-site">
          <SectionHeading eyebrow="How we can help" title="Six things we focus on with students" />
          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {helps.map((h) => (
              <li key={h.title} className="border-t-2 border-line pt-7">
                <Icon name={h.icon} className="size-8 text-bright" />
                <h3 className="h-card mt-5">{h.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{h.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="programs" className="section scroll-mt-20 bg-soft">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Find your starting point"
              title="Which sounds most like you?"
              intro="Pick the statement that fits best. Each one points to the program most likely to help first."
            />
          </div>
          <ul className="space-y-4 lg:col-span-8">
            {fit.map((f) => {
              const p = programs.find((x) => x.id === f.programId)!;
              const a = accentStyles[p.accent];
              return (
                <li key={f.q} className="card group relative flex flex-col gap-4 p-6 transition hover:shadow-[var(--shadow-lift)] sm:flex-row sm:items-center sm:p-7">
                  <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${a.chip}`}><Icon name={p.icon} /></span>
                  <div className="flex-1">
                    <p className="text-lg font-semibold">&ldquo;{f.q}&rdquo;</p>
                    <p className="mt-1 text-[0.95rem] text-muted">
                      Start with{" "}
                      <Link href={p.learnMoreHref ?? `/programs#${p.id}`} className="font-semibold text-brand after:absolute after:inset-0">
                        {p.title}
                      </Link>{" "}
                      — {p.summary.charAt(0).toLowerCase() + p.summary.slice(1)}
                    </p>
                  </div>
                  <Icon name="arrow" className="hidden size-5 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-brand sm:block" />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Photo image="about" accents />
          <div>
            <SectionHeading eyebrow="An honest promise" title="We focus on growth you can carry with you" />
            <p className="mt-6 text-lg leading-relaxed text-muted">
              We don&apos;t promise jobs, salaries or placements — nobody honestly can. What we focus on is helping you build
              the skills, understanding and confidence to create opportunities and make good decisions throughout your
              career.
            </p>
            <Link href="/faq" className="link-arrow mt-6">Read student FAQs <Icon name="arrow" className="size-4" /></Link>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Student consultation"
        title="Talk to us about where you want to go."
        body="Share your goals and questions. Our team can help you understand which opportunities could suit you."
        primary={{ kind: "consult", label: "Book a Student Consultation", source: "Students closing CTA" }}
        secondary={{ kind: "link", label: "Explore All Programs", href: "/programs" }}
      />
    </>
  );
}
