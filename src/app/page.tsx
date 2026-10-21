import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { programs } from "@/lib/programs";
import { site } from "@/lib/site";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { ProgramCard } from "@/components/sections/ProgramCard";
import { Photo } from "@/components/ui/Photo";
import { CheckList, SectionHeading } from "@/components/ui/Section";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Icon } from "@/components/ui/Icon";

export const metadata = pageMetadata({
  title: "OunCatalyst | Career-Ready Learning for Students & Colleges",
  description:
    "Practical live classes, industry mentorship and global career coaching that help students become independent, career-ready individuals.",
  path: "/",
});

const pillars = ["Practical learning", "Industry exposure", "Mentorship", "Global career coaching"];

const contrast = [
  { from: "Preparing for a single placement", to: "Building a career you can steer over time" },
  { from: "Theory first, application later", to: "Real scenarios from the very first session" },
  { from: "Advice from a distance", to: "Direct conversations with working professionals" },
  { from: "One path, one market", to: "Guidance shaped by your goals and destination" },
  { from: "Learning stops at graduation", to: "A habit of continuous development" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-soft-grid [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" />
        <div className="container-site grid items-center gap-14 pt-12 pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-28">
          <div className="animate-fade-up lg:col-span-6">
            <p className="eyebrow">Career development for students &amp; colleges</p>
            <h1 className="h-display mt-6">
              Don&apos;t Just Find a Career.{" "}
              <span className="relative inline-block whitespace-nowrap text-brand">
                Build Your Own.
                <svg aria-hidden="true" viewBox="0 0 300 18" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full sm:h-4">
                  <path d="M3 13 C 80 3, 200 3, 297 10" fill="none" stroke="url(#hero-underline)" strokeWidth="6" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="hero-underline" x1="0" x2="1">
                      <stop offset="0" stopColor="#00D9B0" />
                      <stop offset="0.6" stopColor="#2563EB" />
                      <stop offset="1" stopColor="#F42B88" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            <p className="lead mt-8 max-w-xl">
              OunCatalyst bridges the gap between academic learning and real-world experience, empowering students to
              develop practical skills, gain industry exposure, and shape their own career journeys.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/programs" className="btn-primary">
                Explore Our Programs <Icon name="arrow" className="size-4" />
              </Link>
              <ConsultationButton source="Home hero" className="btn-secondary">Book a Consultation</ConsultationButton>
            </div>
            <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-ink" aria-label="What we focus on">
              {pillars.map((p, i) => (
                <li key={p} className="flex items-center gap-2">
                  <span aria-hidden="true" className={`size-2 rounded-full ${["bg-teal", "bg-bright", "bg-magenta", "bg-sun"][i]}`} />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:col-span-6 lg:pl-8">
            <Photo image="hero" priority accents aspect="aspect-[5/4]" sizes="(min-width: 1024px) 48vw, 100vw" />
            <div className="card relative z-10 mx-4 -mt-10 max-w-[17rem] p-5 sm:absolute sm:-bottom-8 sm:-left-6 sm:mx-0 sm:mt-0 lg:-left-10">
              <p className="text-xs font-semibold tracking-wider text-muted uppercase">Your roadmap</p>
              <ol className="mt-3 space-y-2 text-sm font-medium">
                {["Explore directions", "Build practical skills", "Connect with industry", "Own your growth"].map((s, i) => (
                  <li key={s} className="flex items-center gap-3">
                    <span className="grid size-6 place-items-center rounded-full bg-brand text-[0.7rem] font-bold text-white">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── About intro ── */}
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">About OunCatalyst</p>
            <h2 className="h-section mt-4">An EdTech startup built around one idea: careers are made, not found.</h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
            <p>
              OunCatalyst is an emerging EdTech startup focused on transforming students into independent, career-ready
              individuals. We bring practical learning, industry voices and personal guidance into one journey.
            </p>
            <p>
              Instead of treating a first job as the finish line, we help students understand how work really happens,
              build skills that transfer, and make confident decisions about the careers they want.
            </p>
            <Link href="/about" className="link-arrow">
              More about our approach <Icon name="arrow" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Vision & mission ── */}
      <section className="pb-20 sm:pb-24">
        <div className="container-site grid gap-6 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-brand-deep p-9 text-white sm:p-12">
            <p className="eyebrow eyebrow-light">Our vision</p>
            <p className="mt-6 text-2xl leading-snug font-semibold sm:text-[1.75rem]">
              To go beyond job placement and empower students to build, shape, and grow their own careers.
            </p>
          </div>
          <div className="card p-9 sm:p-12">
            <p className="eyebrow">Our mission</p>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              We pursue that vision through practical learning grounded in real scenarios, meaningful engagement with
              industry, mentorship from experienced professionals, and a commitment to continuous professional
              development.
            </p>
            <Link href="/about#mission" className="link-arrow mt-6">
              How we approach it <Icon name="arrow" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Programs overview ── */}
      <section className="section bg-soft">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Core programs"
              title="Five ways to build a career with intent"
              intro="Each program focuses on a different part of becoming career-ready — from practical skills to global perspective."
            />
            <Link href="/programs" className="btn-secondary self-start lg:self-auto">View all programs</Link>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {programs.map((p, i) => (
              <div key={p.id} className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}>
                <ProgramCard program={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why OunCatalyst ── */}
      <section className="section">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Why OunCatalyst"
              title="Beyond employability training"
              intro="Short-term job preparation has its place. We focus on what lasts: the skills, perspective and confidence to keep growing after the first offer."
            />
          </div>
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-line">
              <div className="grid grid-cols-2 bg-soft text-xs font-semibold tracking-wider uppercase">
                <p className="px-5 py-4 text-muted sm:px-7">Typical approach</p>
                <p className="border-l border-line px-5 py-4 text-brand sm:px-7">The OunCatalyst approach</p>
              </div>
              <ul>
                {contrast.map((row) => (
                  <li key={row.from} className="grid grid-cols-2 border-t border-line text-[0.95rem]">
                    <p className="px-5 py-5 text-muted sm:px-7">{row.from}</p>
                    <p className="flex gap-3 border-l border-line px-5 py-5 font-medium text-ink sm:px-7">
                      <Icon name="check" className="mt-1 size-4 shrink-0 text-[#067a64]" />
                      {row.to}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Industry learning & mentorship ── */}
      <section className="section bg-soft">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Photo image="mentorship" accents />
          <div>
            <SectionHeading
              eyebrow="Industry learning & mentorship"
              title="Learn how work really works — from people who do it"
              intro="Industry Expert Connect brings experienced professionals into the conversation so students can understand workplace expectations first-hand."
            />
            <CheckList
              className="mt-8"
              items={[
                "Expert-led sessions on real industry challenges",
                "Open conversations about roles, skills and career paths",
                "Practical guidance students can apply to their own plans",
              ]}
            />
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/industry-connect" className="btn-primary">Explore Industry Connect</Link>
              <Link href="/global-career-coaching" className="btn-secondary">Global Career Coaching</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experiential highlight ── */}
      <section className="section bg-brand-deep text-white">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow eyebrow-light">Experiential learning</p>
            <h2 className="h-section mt-4 text-white">The Years Exchange: learning by doing</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              Some lessons only come from real work. Through experiential initiatives like The Years Exchange, OunCatalyst
              aims to give students direct industry exposure — the chance to observe, contribute and reflect in real
              professional settings.
            </p>
            <ul className="mt-9 grid gap-4 sm:grid-cols-3">
              {[
                { icon: "briefcase", label: "Real work exposure" },
                { icon: "reflect", label: "Guided reflection" },
                { icon: "growth", label: "Professional confidence" },
              ].map((x) => (
                <li key={x.label} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                  <Icon name={x.icon} className="size-6 text-teal" />
                  <p className="mt-3 text-sm font-semibold text-white">{x.label}</p>
                </li>
              ))}
            </ul>
            <Link href="/experiential-learning" className="btn-light mt-10">Discover Experiential Learning</Link>
          </div>
          <div className="lg:col-span-6 lg:pl-8">
            <Photo image="experiential" aspect="aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* ── College partnership ── */}
      <section className="section">
        <div className="container-site">
          <div className="grid overflow-hidden rounded-[2rem] border border-line bg-white shadow-[var(--shadow-card)] lg:grid-cols-2">
            <div className="p-9 sm:p-14">
              <p className="eyebrow">For colleges &amp; institutions</p>
              <h2 className="h-section mt-4">Let&apos;s prepare students for the real world.</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Collaborate with OunCatalyst to deliver practical learning programs, industry interactions and
                career-development initiatives tailored to your students&apos; needs.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/for-colleges#partner-form" className="btn-primary">Discuss a College Partnership</Link>
                <Link href="/for-colleges" className="btn-secondary">How it could work</Link>
              </div>
            </div>
            <Photo image="colleges" className="h-full min-h-72" aspect="h-full min-h-72 rounded-none! shadow-none!" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>
      </section>

      {/* ── Brand statement ── */}
      <section className="section-tight">
        <div className="container-site">
          <figure className="mx-auto max-w-4xl text-center">
            <svg aria-hidden="true" viewBox="0 0 48 48" className="mx-auto size-12 text-teal">
              <path fill="currentColor" d="M20 10C11 13 6 20 6 29v9h14V24h-8c0-6 3-9 9-11zM42 10c-9 3-14 10-14 19v9h14V24h-8c0-6 3-9 9-11z" />
            </svg>
            <blockquote className="mt-6 text-2xl leading-snug font-semibold text-navy sm:text-[2.1rem]">
              {site.brandMessage}
            </blockquote>
          </figure>
        </div>
      </section>

      <CtaBanner
        eyebrow="Start the conversation"
        title="Not sure where to begin? Let's map it out together."
        body="Share your goals and our team can suggest the learning or career-development opportunities that fit where you are today."
        primary={{ kind: "consult", label: "Book a Consultation", source: "Home closing CTA" }}
        secondary={{ kind: "link", label: "For Students", href: "/for-students" }}
      />
    </>
  );
}
