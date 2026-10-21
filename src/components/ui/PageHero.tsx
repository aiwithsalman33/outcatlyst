import type { ReactNode } from "react";
import type { ImageKey } from "@/lib/images";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Photo } from "./Photo";

type Props = {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  actions?: ReactNode;
  image?: ImageKey;
  /** "soft" = light editorial header; "deep" = navy band for high-intent pages. */
  tone?: "soft" | "deep";
  aside?: ReactNode;
};

/** Page title section shared by all inner pages. */
export function PageHero({ crumbs, eyebrow, title, intro, actions, image, tone = "soft", aside }: Props) {
  const deep = tone === "deep";
  return (
    <section className={`relative overflow-hidden ${deep ? "bg-brand-deep text-white" : "bg-soft-grid"}`}>
      {!deep ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
      ) : null}
      <div className={`container-site relative grid items-center gap-12 pt-10 pb-16 sm:pt-12 lg:gap-16 lg:pb-24 ${image || aside ? "lg:grid-cols-12" : ""}`}>
        <div className={image || aside ? "lg:col-span-6" : "max-w-4xl"}>
          <Breadcrumbs items={crumbs} tone={deep ? "light" : "dark"} />
          <p className={`eyebrow mt-10 ${deep ? "eyebrow-light" : ""}`}>{eyebrow}</p>
          <h1 className={`h-page mt-4 ${deep ? "text-white" : ""}`}>{title}</h1>
          <div className={`lead mt-6 max-w-2xl ${deep ? "text-white/80" : ""}`}>{intro}</div>
          {actions ? <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div> : null}
        </div>
        {image ? (
          <div className="lg:col-span-6 lg:pl-6">
            <Photo image={image} priority accents sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        ) : null}
        {aside && !image ? <div className="lg:col-span-6 lg:pl-6">{aside}</div> : null}
      </div>
    </section>
  );
}
