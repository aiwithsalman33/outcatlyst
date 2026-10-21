import type { Faq } from "@/lib/faqs";
import { Accordion } from "@/components/ui/Accordion";

/** Renders FAQ items in the accordion, flagging answers awaiting team confirmation. */
export function FaqList({ items, headingLevel = 3 }: { items: Faq[]; headingLevel?: 2 | 3 }) {
  return (
    <Accordion
      headingLevel={headingLevel}
      items={items.map((f) => ({
        q: f.q,
        a: (
          <>
            <p>{f.a}</p>
            {f.pending ? <p><span className="tbc">Operational details to be confirmed by OunCatalyst</span></p> : null}
          </>
        ),
      }))}
    />
  );
}
