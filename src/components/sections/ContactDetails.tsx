import { site, telHref } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

/** Phone, email and location cards. The location is city-level only by design — no street address. */
export function ContactDetails() {
  const { phone, email, location } = site.contact;
  const items = [
    { icon: "phone", label: "Phone", value: phone, href: telHref(phone) },
    { icon: "mail", label: "Email", value: email, href: `mailto:${email}` },
    { icon: "pin", label: "Location", value: location },
  ];
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {items.map((item) => {
        const body = (
          <>
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-bright/10 text-bright">
              <Icon name={item.icon} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-muted">{item.label}</span>
              <span className={`mt-0.5 block font-semibold break-words text-ink ${item.href ? "group-hover:text-brand" : ""}`}>
                {item.value}
              </span>
            </span>
          </>
        );
        return (
          <li key={item.label}>
            {item.href ? (
              <a href={item.href} className="card group flex h-full items-center gap-4 p-6 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[var(--shadow-lift)]">
                {body}
              </a>
            ) : (
              <div className="card flex h-full items-center gap-4 p-6">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
