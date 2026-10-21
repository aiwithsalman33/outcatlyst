import { Icon } from "@/components/ui/Icon";

export type Step = { title: string; body: string; icon?: string };

/** Numbered horizontal (desktop) / vertical (mobile) process steps. */
export function Steps({ steps, tone = "dark" }: { steps: Step[]; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <ol className={`grid gap-6 sm:grid-cols-2 ${steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {steps.map((s, i) => (
        <li key={s.title} className={`relative rounded-[var(--radius-card)] p-7 ${light ? "border border-white/15 bg-white/5" : "card"}`}>
          <div className="flex items-center justify-between">
            <span className={`grid size-11 place-items-center rounded-full text-sm font-bold ${light ? "bg-teal text-navy" : "bg-brand text-white"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {s.icon ? <Icon name={s.icon} className={`size-6 ${light ? "text-white/60" : "text-muted/60"}`} /> : null}
          </div>
          <h3 className={`mt-6 text-lg font-semibold ${light ? "text-white" : ""}`}>{s.title}</h3>
          <p className={`mt-2 text-[0.95rem] leading-relaxed ${light ? "text-white/70" : "text-muted"}`}>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function FeatureGrid({ items, columns = 3 }: { items: { icon: string; title: string; body: string }[]; columns?: 2 | 3 | 4 }) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <ul className={`grid gap-6 ${cols}`}>
      {items.map((f) => (
        <li key={f.title} className="card p-7 transition duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
          <span className="grid size-12 place-items-center rounded-2xl bg-bright/10 text-bright">
            <Icon name={f.icon} />
          </span>
          <h3 className="h-card mt-5">{f.title}</h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{f.body}</p>
        </li>
      ))}
    </ul>
  );
}
