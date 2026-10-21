import Link from "next/link";
import { accentStyles, type Program } from "@/lib/programs";
import { Icon } from "@/components/ui/Icon";

/** Compact card linking to the program's detail (dedicated page or its section on /programs). */
export function ProgramCard({ program, headingLevel = 3 }: { program: Program; headingLevel?: 2 | 3 }) {
  const a = accentStyles[program.accent];
  const href = program.learnMoreHref ?? `/programs#${program.id}`;
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="card group relative flex h-full flex-col overflow-hidden p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${a.bar}`} />
      <div className="flex items-center justify-between">
        <span className={`grid size-12 place-items-center rounded-2xl ${a.chip}`}>
          <Icon name={program.icon} />
        </span>
        <span className="font-mono text-sm text-muted/70">{program.number}</span>
      </div>
      <H className="h-card mt-6">
        <Link href={href} className="after:absolute after:inset-0">
          {program.title}
        </Link>
      </H>
      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{program.summary}</p>
      <span className="link-arrow mt-6 text-sm" aria-hidden="true">
        Learn more <Icon name="arrow" className="size-4 transition group-hover:translate-x-1" />
      </span>
    </article>
  );
}
