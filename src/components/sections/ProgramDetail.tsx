import Link from "next/link";
import { accentStyles, type Program } from "@/lib/programs";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { Icon } from "@/components/ui/Icon";

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold tracking-wide text-ink uppercase">{title}</h4>
      <ul className="mt-3 space-y-2.5">
        {items.map((i) => (
          <li key={i} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-muted">
            <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-bright" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Reusable program-detail template. Add a program to `src/lib/programs.ts` and it renders
 * with the same structure: overview, audience, objectives, expectations, activities, outcomes, CTA.
 */
export function ProgramDetail({ program }: { program: Program }) {
  const a = accentStyles[program.accent];
  return (
    <article id={program.id} className="scroll-mt-28 border-t border-line py-16 first:border-t-0 lg:py-20" aria-labelledby={`${program.id}-title`}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-4">
              <span className={`grid size-14 place-items-center rounded-2xl ${a.chip}`}>
                <Icon name={program.icon} className="size-7" />
              </span>
              <span className="font-mono text-sm text-muted">Program {program.number}</span>
            </div>
            <h3 id={`${program.id}-title`} className="mt-6 text-3xl font-bold sm:text-[2.1rem]">{program.title}</h3>
            <p className="mt-5 text-lg leading-relaxed text-muted">{program.overview}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ConsultationButton source={`Programs page — ${program.shortTitle}`} interest={program.interest}>
                Enquire About This Program
              </ConsultationButton>
              {program.learnMoreHref ? (
                <Link href={program.learnMoreHref} className="btn-secondary">
                  Explore {program.shortTitle}
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className={`rounded-[var(--radius-card)] ${a.soft} border border-line p-7 sm:p-9`}>
            <div className="grid gap-9 sm:grid-cols-2">
              <Block title="Who it's for" items={program.audience} />
              <Block title="Learning objectives" items={program.objectives} />
              <Block title="What to expect" items={program.expect} />
              <div>
                <h4 className="text-sm font-semibold tracking-wide text-ink uppercase">Possible activities</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {program.activities.map((act) => (
                    <li key={act} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm text-ink">{act}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-9 border-t border-line pt-8">
              <Block title="What participants can work towards" items={program.outcomes} />
              <p className="mt-5 text-xs text-muted">
                Outcomes depend on each participant&apos;s effort, goals and circumstances. Format, duration and any fees are
                discussed during a consultation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
