import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { SectionHeading } from "@/components/ui/Section";

const brands: Record<string, { icon: typeof InstagramIcon; tile: string; action: string }> = {
  Instagram: {
    icon: InstagramIcon,
    tile: "bg-[linear-gradient(45deg,#f9a825_0%,#e1306c_50%,#833ab4_100%)]",
    action: "Follow updates and sessions",
  },
  LinkedIn: { icon: LinkedInIcon, tile: "bg-[#0a66c2]", action: "Connect with our page" },
};

/** "Connect With OunCatalyst" — cards for the platforms with official brand marks. */
export function SocialConnect() {
  const links = site.social.filter((s) => s.label in brands);
  if (!links.length) return null;
  return (
    <section className="section-tight bg-soft" aria-labelledby="connect-title">
      <div className="container-site grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="connect-title"
            eyebrow="Social"
            title="Connect With OunCatalyst"
            intro="Stay connected with our programs, career guidance, and upcoming sessions."
          />
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {links.map((s) => {
            const b = brands[s.label];
            const BrandIcon = b.icon;
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card group flex h-full items-center gap-4 p-6 transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className={`grid size-14 shrink-0 place-items-center rounded-2xl text-white ${b.tile}`}>
                    <BrandIcon className="size-7" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink group-hover:text-brand">{s.handle}</span>
                    <span className="mt-0.5 block text-sm text-muted">{b.action}</span>
                  </span>
                  <Icon name="arrow" className="size-5 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-brand" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
