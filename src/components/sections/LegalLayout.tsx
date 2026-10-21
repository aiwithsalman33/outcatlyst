import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

/** Shared layout for draft legal pages, with a prominent "draft — needs legal review" banner. */
export function LegalLayout({ title, path, children, toc }: { title: string; path: string; children: ReactNode; toc: { id: string; label: string }[] }) {
  return (
    <>
      <section className="bg-soft-grid">
        <div className="container-site pt-10 pb-14">
          <Breadcrumbs items={[{ name: title, path }]} />
          <h1 className="h-page mt-10">{title}</h1>
          <p className="mt-4 text-muted">Draft version · Last updated: <span className="tbc">Date to be set on publication</span></p>
        </div>
      </section>
      <section className="pb-24">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
            <ul className="sticky top-28 space-y-1 text-sm">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="block rounded-lg px-3 py-1.5 text-muted transition hover:bg-soft hover:text-brand">{t.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-9">
            <div role="note" className="mb-10 max-w-3xl rounded-2xl border border-dashed border-sun bg-sun/10 p-5 text-sm leading-relaxed text-[#5c3f00]">
              <strong className="font-semibold">Draft for review.</strong> This document has been prepared as a starting
              point and has not been reviewed by a legal professional. Items marked{" "}
              <span className="tbc">To be confirmed</span> must be completed, and the full text should be reviewed for
              compliance with the laws that apply to OunCatalyst before it is relied upon.
            </div>
            <article className="prose-legal">{children}</article>
          </div>
        </div>
      </section>
    </>
  );
}

export const TBC = ({ children = "To be confirmed" }: { children?: ReactNode }) => <span className="tbc">{children}</span>;
