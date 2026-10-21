import Link from "next/link";
import type { ReactNode } from "react";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";

type Action =
  | { kind: "consult"; label: string; source: string; interest?: string }
  | { kind: "link"; label: string; href: string };

function ActionButton({ action, primary }: { action: Action; primary: boolean }) {
  const cls = primary ? "btn-light" : "btn-ghost-light";
  if (action.kind === "consult") {
    return <ConsultationButton source={action.source} interest={action.interest} className={cls}>{action.label}</ConsultationButton>;
  }
  return <Link href={action.href} className={cls}>{action.label}</Link>;
}

/** Closing call-to-action band used across pages. */
export function CtaBanner({ eyebrow, title, body, primary, secondary }: { eyebrow?: string; title: ReactNode; body?: ReactNode; primary: Action; secondary?: Action }) {
  return (
    <section className="section-tight">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-deep px-7 py-14 sm:px-14 sm:py-16 lg:px-20">
          <svg aria-hidden="true" className="pointer-events-none absolute -right-10 -bottom-16 h-72 w-72 opacity-80 lg:right-10" viewBox="0 0 200 200">
            <path d="M120 20 C150 8 175 18 178 48 L182 92 L118 44 Z" fill="#F42B88" opacity="0.7" />
            <path d="M48 98 C30 112 22 132 40 146 L82 168 L70 100 Z" fill="#00D9B0" opacity="0.7" />
            <path d="M180 112 L184 160 C186 182 168 194 146 188 L104 176 Z" fill="#FFC747" opacity="0.75" />
          </svg>
          <div className="relative max-w-2xl">
            {eyebrow ? <p className="eyebrow eyebrow-light">{eyebrow}</p> : null}
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{title}</h2>
            {body ? <p className="mt-5 text-lg leading-relaxed text-white/75">{body}</p> : null}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ActionButton action={primary} primary />
              {secondary ? <ActionButton action={secondary} primary={false} /> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
