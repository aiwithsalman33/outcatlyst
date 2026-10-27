import { formatPrice, frequencyLabels, type SessionProgram } from "@/lib/programs";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { Icon } from "@/components/ui/Icon";

const TBA = "To be announced";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

/**
 * Featured card for a bookable session program. Everything comes from `sessionPrograms` in
 * src/lib/programs.ts; unconfirmed details render as "To be announced".
 */
export function FeaturedProgram({ program }: { program: SessionProgram }) {
  const price = formatPrice(program.price);
  const details = [
    { label: "Frequency", value: frequencyLabels[program.frequency] },
    { label: "Format", value: program.format },
    { label: "Session duration", value: program.duration ?? TBA },
    { label: "Delivery mode", value: program.deliveryMode ?? TBA },
    { label: "Next session", value: program.nextSessionDate ? formatDate(program.nextSessionDate) : TBA },
    { label: "Registration", value: "Through the consultation form" },
  ];
  const source = `Programs page — ${program.title}`;

  return (
    <article id={program.id} aria-labelledby={`${program.id}-title`} className="card scroll-mt-28 overflow-hidden lg:grid lg:grid-cols-12">
      <div className="p-7 sm:p-10 lg:col-span-7">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-bright/10 px-3 py-1 text-xs font-semibold tracking-wide text-bright uppercase">
            <Icon name="spark" className="size-3.5" /> Featured program
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/15 px-3 py-1 text-xs font-semibold text-[#067a64]">
            <Icon name="calendar" className="size-3.5" /> {frequencyLabels[program.frequency]}
          </span>
        </div>
        <h3 id={`${program.id}-title`} className="mt-6 text-3xl font-bold sm:text-[2.1rem]">{program.title}</h3>
        <p className="mt-4 text-lg leading-relaxed text-muted">{program.description}</p>

        <div className="mt-7 flex items-start gap-3 rounded-2xl border border-line bg-soft p-5">
          <Icon name="users" className="mt-0.5 size-6 shrink-0 text-bright" />
          <div>
            <p className="text-sm font-semibold text-ink">Who it&apos;s for</p>
            <p className="mt-0.5 text-[0.95rem] text-muted">{program.audience}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ConsultationButton source={source} interest={program.registrationInterest} program={program.title}>
            Register Interest
          </ConsultationButton>
          <ConsultationButton source={`${source} (consultation)`} className="btn-secondary">
            Request Consultation
          </ConsultationButton>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          Registering interest is an enquiry, not a confirmed booking. Our team confirms availability, session details
          and payment instructions with you directly.
        </p>
      </div>

      <div className="border-t border-line bg-soft/60 p-7 sm:p-10 lg:col-span-5 lg:border-t-0 lg:border-l">
        <p className="text-sm font-medium text-muted">Fee</p>
        <p className="mt-1 flex items-baseline gap-1.5">
          <span className="text-4xl font-extrabold tracking-tight text-navy">{price}</span>
          <span className="text-base font-medium text-muted">/ {program.price.unit}</span>
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Charged per session you attend — not a recurring subscription.
        </p>
        <dl className="mt-7 divide-y divide-line border-t border-line">
          {details.map((d) => (
            <div key={d.label} className="grid grid-cols-[minmax(0,9rem)_1fr] gap-4 py-3.5 text-[0.925rem]">
              <dt className="text-muted">{d.label}</dt>
              <dd className={`font-medium ${d.value === TBA ? "text-muted italic" : "text-ink"}`}>{d.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

/** Planned session focus areas for a session program. */
export function ProgramTopics({ program }: { program: SessionProgram }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2">
      {program.topics.map((t, i) => (
        <li key={t.title} className="card flex gap-5 p-7 transition duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-bright/10 text-bright">
            <Icon name={t.icon} />
          </span>
          <div>
            <p className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="h-card mt-1">{t.title}</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{t.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
