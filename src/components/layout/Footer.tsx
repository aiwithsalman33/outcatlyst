import Link from "next/link";
import { footerNav, site, telHref } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
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
  const { email, phone, location } = site.contact;
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-3">
          <Logo className="h-10 w-auto" />
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-muted">
            OunCatalyst helps students become independent, career-ready individuals through practical learning, industry
            exposure, mentorship and career-development programs.
          </p>
          <p className="mt-5 text-sm font-semibold text-navy">Don&apos;t just find a career. Build your own.</p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-[1fr_1fr_1fr_1.35fr] lg:gap-8">
          <Column title="Programs" links={footerNav.programs} />
          <Column title="Students" links={footerNav.students} />
          <Column title="Colleges" links={footerNav.colleges} />
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <h2 className="text-sm font-semibold tracking-wide text-ink">Contact</h2>
            <ul className="mt-4 space-y-3 text-[0.925rem] text-muted">
              <li>
                <a className="flex items-start gap-2.5 transition hover:text-brand" href={telHref(phone)}>
                  <Icon name="phone" className="mt-1 size-4 shrink-0" />
                  {phone}
                </a>
              </li>
              <li>
                <a className="flex items-start gap-2.5 break-all transition hover:text-brand" href={`mailto:${email}`}>
                  <Icon name="mail" className="mt-1 size-4 shrink-0" />
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="pin" className="mt-1 size-4 shrink-0" />
                {location}
              </li>
              <li><Link className="transition hover:text-brand" href="/contact">Send us a message</Link></li>
            </ul>
            {site.social.length ? (
              <ul className="mt-5 flex gap-2.5" aria-label="OunCatalyst on social media">
                {site.social.map((s) => {
                  const BrandIcon = s.label === "Instagram" ? InstagramIcon : s.label === "LinkedIn" ? LinkedInIcon : null;
                  return (
                    <li key={s.label}>
                      <a
                        className="grid size-10 place-items-center rounded-full border border-line text-navy transition hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${s.handle} (opens in a new tab)`}
                      >
                        {BrandIcon ? <BrandIcon className="size-[1.125rem]" /> : <span className="text-xs font-semibold">{s.label}</span>}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
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
