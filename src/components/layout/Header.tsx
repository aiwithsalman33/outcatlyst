"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { primaryNav, programNav } from "@/lib/site";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { Logo } from "./Logo";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
const programPaths = programNav.map((l) => l.href);

export function Header() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const dropdownId = useId();
  const mobileId = useId();
  const mobileProgramsId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus after navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
    setDropdownOpen(false);
  }

  useEffect(() => {
    document.body.classList.toggle("menu-locked", mobileOpen);
    return () => document.body.classList.remove("menu-locked");
  }, [mobileOpen]);

  // Dropdown: close on outside click and Escape.
  useEffect(() => {
    if (!dropdownOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setDropdownOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        dropdownButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropdownOpen]);

  // Mobile menu: Escape closes and returns focus to the toggle.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const onDropdownKeyDown = (e: React.KeyboardEvent) => {
    if (!["ArrowDown", "ArrowUp"].includes(e.key)) return;
    e.preventDefault();
    const links = Array.from(dropdownRef.current?.querySelectorAll<HTMLAnchorElement>("[data-dropdown-link]") ?? []);
    if (!dropdownOpen) setDropdownOpen(true);
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    const next = e.key === "ArrowDown" ? (i + 1) % links.length : (i - 1 + links.length) % links.length;
    requestAnimationFrame(() => {
      const fresh = dropdownRef.current?.querySelectorAll<HTMLAnchorElement>("[data-dropdown-link]");
      fresh?.[i === -1 && e.key === "ArrowUp" ? links.length - 1 : next]?.focus();
    });
  };

  return (
    <>
    <header
      className={`sticky top-0 z-40 border-b bg-white transition-[border-color,box-shadow] ${
        scrolled ? "border-line shadow-[0_6px_24px_-18px_rgb(20_42_120/0.35)]" : "border-transparent"
      }`}
    >
      <a href="#main" className="sr-only z-50 rounded-md bg-brand px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3">
        Skip to content
      </a>
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Logo priority className="h-8 w-auto sm:h-9 xl:h-10" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {primaryNav.map((item) =>
              item.children ? (
                <li
                  key={item.href}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => {
                    window.clearTimeout(hoverTimer.current);
                    setDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    hoverTimer.current = window.setTimeout(() => setDropdownOpen(false), 160);
                  }}
                  onKeyDown={onDropdownKeyDown}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setDropdownOpen(false);
                  }}
                >
                  <button
                    ref={dropdownButtonRef}
                    type="button"
                    aria-expanded={dropdownOpen}
                    aria-controls={dropdownId}
                    onClick={() => setDropdownOpen((o) => !o)}
                    className={`flex cursor-pointer items-center gap-1 rounded-full px-3 py-2 text-[0.9rem] font-medium transition hover:text-brand xl:px-4 ${
                      programPaths.some((p) => isActive(pathname, p)) ? "text-brand" : "text-ink"
                    }`}
                  >
                    {item.label}
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className={`size-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}>
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div
                    id={dropdownId}
                    hidden={!dropdownOpen}
                    className="absolute top-full left-1/2 w-[25rem] -translate-x-1/2 pt-3"
                  >
                    <ul className="card animate-fade-up overflow-hidden p-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            data-dropdown-link
                            aria-current={pathname === child.href ? "page" : undefined}
                            className="group flex items-start gap-3 rounded-xl px-4 py-3 transition hover:bg-soft focus-visible:bg-soft"
                          >
                            <span className="mt-2 size-2 shrink-0 rounded-full bg-line transition group-hover:bg-teal" aria-hidden="true" />
                            <span>
                              <span className="block text-[0.95rem] font-semibold text-ink group-hover:text-brand">{child.label}</span>
                              <span className="block text-sm leading-snug text-muted">{child.description}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="relative rounded-full px-3 py-2 text-[0.9rem] font-medium text-ink transition hover:text-brand aria-[current=page]:text-brand xl:px-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ConsultationButton source="Header CTA" className="btn-primary hidden min-h-11 px-5 py-2.5 text-sm sm:inline-flex" />
          <button
            ref={menuButtonRef}
            type="button"
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-line text-navy lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
            </svg>
          </button>
        </div>
      </div>

    </header>

      {/* Mobile navigation — a sibling of <header>: its backdrop-filter would otherwise trap position:fixed */}
      <div
        id={mobileId}
        hidden={!mobileOpen}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="container-site py-6">
          <ul className="divide-y divide-line">
            {primaryNav.map((item) =>
              item.children ? (
                <li key={item.href}>
                  <button
                    type="button"
                    aria-expanded={mobileProgramsOpen}
                    aria-controls={mobileProgramsId}
                    onClick={() => setMobileProgramsOpen((o) => !o)}
                    className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-lg font-semibold text-ink"
                  >
                    {item.label}
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className={`size-5 text-muted transition-transform ${mobileProgramsOpen ? "rotate-180" : ""}`}>
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <ul id={mobileProgramsId} hidden={!mobileProgramsOpen} className="mb-4 space-y-1 border-l-2 border-teal/60 pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={pathname === child.href ? "page" : undefined}
                          className="block py-2 text-base text-muted aria-[current=page]:font-semibold aria-[current=page]:text-brand"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="block py-4 text-lg font-semibold text-ink aria-[current=page]:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
            <li>
              <Link href="/faq" className="block py-4 text-lg font-semibold text-ink">FAQ</Link>
            </li>
          </ul>
          <ConsultationButton source="Mobile menu CTA" className="btn-primary mt-6 w-full" onBeforeOpen={() => setMobileOpen(false)} />
        </nav>
      </div>
    </>
  );
}
