import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { CurrentYear } from "./CurrentYear";

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold tracking-wide text-ink">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[0.925rem] text-muted transition hover:text-brand">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { email, phone } = site.contact;
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo className="h-10 w-auto" />
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-muted">
            OunCatalyst helps students become independent, career-ready individuals through practical learning, industry
            exposure, mentorship and career-development programs.
          </p>
          <p className="mt-5 text-sm font-semibold text-navy">Don&apos;t just find a career. Build your own.</p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
          <Column title="Programs" links={footerNav.programs} />
          <Column title="Students" links={footerNav.students} />
          <Column title="Colleges" links={footerNav.colleges} />
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-ink">Contact</h2>
            <ul className="mt-4 space-y-3 text-[0.925rem] text-muted">
              {email ? (
                <li><a className="break-all transition hover:text-brand" href={`mailto:${email}`}>{email}</a></li>
              ) : null}
              {phone ? (
                <li><a className="transition hover:text-brand" href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a></li>
              ) : null}
              <li><Link className="transition hover:text-brand" href="/contact">Send us a message</Link></li>
              {site.social.map((s) => (
                <li key={s.label}>
                  <a className="transition hover:text-brand" href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-brand">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
