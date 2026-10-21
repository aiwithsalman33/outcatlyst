import Link from "next/link";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  const muted = tone === "light" ? "text-white/70 hover:text-white" : "text-muted hover:text-brand";
  const current = tone === "light" ? "text-white" : "text-ink";
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={`font-medium ${current}`}>{c.name}</span>
                ) : (
                  <>
                    <Link href={c.path} className={`transition ${muted}`}>{c.name}</Link>
                    <span aria-hidden="true" className={tone === "light" ? "text-white/40" : "text-line"}>/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}
