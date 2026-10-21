import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  id,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  id?: string;
  as?: "h1" | "h2";
}) {
  const center = align === "center" ? "mx-auto text-center items-center" : "";
  return (
    <div className={`flex max-w-3xl flex-col ${center}`}>
      {eyebrow ? <p className={`eyebrow ${tone === "light" ? "eyebrow-light" : ""}`}>{eyebrow}</p> : null}
      <As id={id} className={`h-section mt-4 ${tone === "light" ? "text-white" : ""}`}>{title}</As>
      {intro ? <div className={`lead mt-5 ${tone === "light" ? "text-white/75" : ""}`}>{intro}</div> : null}
    </div>
  );
}

/** Highlighted notice for details the OunCatalyst team still needs to supply. */
export function PendingNote({ children, title = "To be confirmed by OunCatalyst" }: { children: ReactNode; title?: string }) {
  return (
    <aside className="rounded-2xl border border-dashed border-sun bg-sun/10 p-5 text-sm leading-relaxed text-[#5c3f00]">
      <p className="flex items-center gap-2 font-semibold">
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="size-4"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.25v3.25c0 .41.34.75.75.75h.5a.75.75 0 000-1.5h-.25V9.75A.75.75 0 0010 9H9z" clipRule="evenodd" /></svg>
        {title}
      </p>
      <div className="mt-1.5">{children}</div>
    </aside>
  );
}

export function CheckList({ items, tone = "dark", className = "" }: { items: string[]; tone?: "dark" | "light"; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className={`mt-1 grid size-5 shrink-0 place-items-center rounded-full ${tone === "light" ? "bg-teal/20 text-teal" : "bg-teal/15 text-[#067a64]"}`}>
            <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          </span>
          <span className={tone === "light" ? "text-white/85" : "text-muted"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
