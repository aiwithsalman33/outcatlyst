import type { Metadata } from "next";
import { site } from "./site";

type PageMeta = { title: string; description: string; path: string; absoluteTitle?: boolean };

/** Builds consistent per-page metadata: title, description, canonical, Open Graph and Twitter. */
export function pageMetadata({ title, description, path, absoluteTitle = true }: PageMeta): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}` || site.url;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url, siteName: site.name, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
