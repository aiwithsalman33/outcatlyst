import { pageMetadata, faqJsonLd } from "@/lib/seo";
import { faqGroups } from "@/lib/faqs";
import { PageHero } from "@/components/ui/PageHero";
import { FaqList } from "@/components/sections/FaqList";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions | OunCatalyst",
  description:
    "Answers about OunCatalyst programs, practical learning, industry expert sessions, global career coaching, college partnerships and how your information is handled.",
  path: "/faq",
});

export default function FaqPage() {
  const confirmed = faqGroups.flatMap((g) => g.items).filter((f) => !f.pending);
  return (
    <>
      <PageHero
        crumbs={[{ name: "FAQ", path: "/faq" }]}
        eyebrow="FAQ"
        title="Frequently asked questions"
        intro="Straightforward answers about what we do, who we work with, and what to expect."
      />
      <section className="pb-20">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <nav aria-label="FAQ topics" className="lg:col-span-3">
            <ul className="space-y-1 lg:sticky lg:top-28">
              {faqGroups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="block rounded-lg px-3 py-2 text-[0.95rem] font-medium text-muted transition hover:bg-soft hover:text-brand">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-14 lg:col-span-9">
            {faqGroups.map((g) => (
              <section key={g.id} id={g.id} className="scroll-mt-28" aria-labelledby={`${g.id}-h`}>
                <h2 id={`${g.id}-h`} className="mb-6 text-2xl font-bold">{g.title}</h2>
                <FaqList items={g.items} />
              </section>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner
        title="Still have a question?"
        body="Send it to us and our team will get back to you."
        primary={{ kind: "consult", label: "Book a Consultation", source: "FAQ closing CTA" }}
        secondary={{ kind: "link", label: "Contact Us", href: "/contact" }}
      />
      <JsonLd data={faqJsonLd(confirmed)} />
    </>
  );
}
