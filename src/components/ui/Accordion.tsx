"use client";

import { useId, useState, type ReactNode } from "react";

export type AccordionItem = { q: string; a: ReactNode };

/** Accessible disclosure accordion (WAI-ARIA pattern): buttons inside headings control regions. */
export function Accordion({ items, headingLevel = 3 }: { items: AccordionItem[]; headingLevel?: 2 | 3 }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className="divide-y divide-line rounded-[var(--radius-card)] border border-line bg-white">
      {items.map((item, i) => {
        const expanded = open === i;
        const btnId = `${baseId}-b${i}`;
        const panelId = `${baseId}-p${i}`;
        return (
          <div key={item.q}>
            <Heading className="text-base font-semibold sm:text-lg">
              <button
                id={btnId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex w-full cursor-pointer items-start justify-between gap-6 px-6 py-5 text-left transition hover:text-brand sm:px-8"
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition ${
                    expanded ? "rotate-45 border-brand bg-brand text-white" : "border-line text-navy"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!expanded} className="px-6 pb-6 text-muted sm:px-8">
              <div className="max-w-3xl space-y-3 leading-relaxed">{item.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
