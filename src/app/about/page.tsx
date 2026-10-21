import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/Section";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Icon } from "@/components/ui/Icon";

export const metadata = pageMetadata({
  title: "About OunCatalyst | Our Vision and Mission",
  description:
    "OunCatalyst helps students own their careers through practical learning, industry engagement, mentorship and continuous development — beyond employability.",
  path: "/about",
});

const mission = [
  { icon: "classroom", title: "Practical learning", body: "Learning anchored in real scenarios, so students practise the thinking work actually demands." },
  { icon: "handshake", title: "Industry engagement", body: "Bringing professionals and workplace realities into students' learning, not just their job search." },
  { icon: "mentor", title: "Mentorship", body: "Guidance from experienced people who can share perspective, context and honest advice." },
  { icon: "growth", title: "Continuous development", body: "Building the habit of reviewing, learning and adapting long after a course ends." },
];

const values = [
  { name: "Practical learning", body: "We value what students can do with knowledge, not only what they can recall.", color: "bg-bright" },
  { name: "Industry connection", body: "Learning stays relevant when it stays close to how industries work.", color: "bg-teal" },
  { name: "Independent thinking", body: "We encourage students to question, evaluate and decide for themselves.", color: "bg-magenta" },
  { name: "Career adaptability", body: "Careers change. We help students prepare to change with them.", color: "bg-sun" },
  { name: "Continuous development", body: "Growth is a practice, not a phase that ends with a qualification.", color: "bg-navy" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About Us", path: "/about" }]}
        eyebrow="About OunCatalyst"
        title="Helping students become independent, career-ready individuals."
        intro="OunCatalyst is an emerging EdTech startup focused on transforming students into independent, career-ready individuals."
        image="about"
      />

      {/* Who we are */}
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Who we are" title="A bridge between the classroom and the working world" />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
            <p>
              Students often leave education with qualifications but limited exposure to how work is actually done — how
              decisions are made, what professionals expect, and how careers develop over time.
            </p>
            <p>
              OunCatalyst exists to close that gap. We combine practical, scenario-based learning with direct access to
              industry perspectives and personalised guidance, so students can make informed choices and take ownership
              of where their careers go next.
            </p>
          </div>
        </div>
      </section>

      {/* Vision + mission */}
      <section id="mission" className="section scroll-mt-24 bg-soft">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-deep px-8 py-14 text-white sm:px-14 sm:py-16">
            <p className="eyebrow eyebrow-light">Our vision</p>
            <p className="mt-6 max-w-4xl text-3xl leading-tight font-bold sm:text-4xl lg:text-[2.75rem]">
              To go beyond job placement and empower students to build, shape, and grow their own careers.
            </p>
          </div>

          <div className="mt-20 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Our mission"
                title="How we pursue that vision"
                intro="Our approach rests on four connected commitments that together support long-term career growth."
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
              {mission.map((m) => (
                <div key={m.title} className="card p-7">
                  <span className="grid size-12 place-items-center rounded-2xl bg-bright/10 text-bright">
                    <Icon name={m.icon} />
                  </span>
                  <h3 className="h-card mt-5">{m.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Our philosophy" title="A qualification opens the door. It doesn't plan the journey." />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                Academic qualifications matter, but on their own they rarely prepare students for the realities of
                professional life: ambiguous problems, workplace expectations, and decisions with long-term consequences.
              </p>
              <p>
                Preparing for a first job is also only part of the picture. Industries shift, roles evolve and new
                opportunities appear. Career development has to extend beyond that first step — towards the skills,
                judgement and confidence to keep growing.
              </p>
            </div>
          </div>
          <Photo image="liveClass" accents />
        </div>
      </section>

      {/* Values */}
      <section className="section bg-soft">
        <div className="container-site">
          <SectionHeading eyebrow="Our values" title="What guides our work" align="center" />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v, i) => (
              <li key={v.name} className="card relative overflow-hidden p-7">
                <span aria-hidden="true" className={`absolute top-0 left-0 h-1 w-full ${v.color}`} />
                <span className="font-mono text-sm text-muted">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold">{v.name}</h3>
                <p className="mt-2 text-[0.925rem] leading-relaxed text-muted">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Difference */}
      <section className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow="Our difference"
            title="Short-term employability vs. sustained career growth"
            intro="Both have value. We believe students deserve more than the first."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[var(--radius-card)] border border-line bg-soft p-8 sm:p-10">
              <h3 className="text-xl font-semibold text-muted">Short-term employability training</h3>
              <ul className="mt-6 space-y-4 text-muted">
                {[
                  "Focuses on getting through the next interview",
                  "Teaches a fixed set of skills for a specific role",
                  "Ends when a job offer arrives",
                  "Measures success by placement alone",
                ].map((x) => (
                  <li key={x} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 h-0.5 w-3 shrink-0 bg-muted/50" />{x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-card)] border-2 border-brand bg-white p-8 shadow-[var(--shadow-lift)] sm:p-10">
              <h3 className="text-xl font-semibold text-brand">Sustained career growth</h3>
              <ul className="mt-6 space-y-4 text-ink">
                {[
                  "Builds understanding of how industries and workplaces operate",
                  "Develops transferable skills and independent judgement",
                  "Encourages continuous learning throughout a career",
                  "Helps students evaluate and create their own opportunities",
                ].map((x) => (
                  <li key={x} className="flex gap-3"><Icon name="check" className="mt-1 size-4 shrink-0 text-[#067a64]" />{x}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-10 text-center">
            <Link href="/programs" className="link-arrow">See how our programs put this into practice <Icon name="arrow" className="size-4" /></Link>
          </p>
        </div>
      </section>

      <CtaBanner
        eyebrow="Work with us"
        title="Explore our programs or talk to us about a partnership."
        body="Whether you're a student planning your next step or an institution supporting many, we'd like to hear from you."
        primary={{ kind: "link", label: "Explore Our Programs", href: "/programs" }}
        secondary={{ kind: "link", label: "Discuss a College Partnership", href: "/for-colleges#partner-form" }}
      />
    </>
  );
}
