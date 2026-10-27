"use client";

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { site, telHref } from "@/lib/site";

/** `program` marks the request as interest in a specific program (a registration enquiry, not a booking). */
type OpenOptions = { source?: string; interest?: string; program?: string; trigger?: HTMLElement | null };
type Ctx = { open: (opts?: OpenOptions) => void };

const ConsultationContext = createContext<Ctx | null>(null);

const CONSULT_STEPS = [
  "Share your details and what you’d like guidance on.",
  "Our team reviews your request.",
  "We contact you to discuss suitable next steps.",
];
const PROGRAM_STEPS = [
  "Share your details and goals.",
  "We confirm availability, session details and delivery mode.",
  "You receive payment instructions before your session.",
];

const SESSION_KEY = "oc:consultation-auto-shown";
const AUTO_OPEN_DELAY_MS = 1800;
/** Pages where an unprompted popup would get in the way of the page's own purpose. */
const NO_AUTO_OPEN = ["/privacy-policy", "/terms", "/contact", "/for-colleges"];

export function useConsultation() {
  const ctx = useContext(ConsultationContext);
  if (!ctx) throw new Error("useConsultation must be used within <ConsultationProvider>");
  return ctx;
}

const safeSession = {
  get(key: string) {
    try {
      return window.sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch {}
  },
};

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const formApi = useRef<{ reset: () => void; isSuccess: boolean } | null>(null);
  const [source, setSource] = useState("Website");
  const [interest, setInterest] = useState<string | undefined>();
  const [program, setProgram] = useState<string | undefined>();
  // Changes on every open so the form re-applies the preset even when it's the same as last time.
  const [openId, setOpenId] = useState(0);
  const pathname = usePathname();
  const titleId = useId();
  const descId = useId();

  const open = useCallback((opts: OpenOptions = {}) => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    // A finished form starts fresh next time; an unfinished one keeps its draft.
    if (formApi.current?.isSuccess) formApi.current.reset();
    returnFocusRef.current = opts.trigger ?? (document.activeElement as HTMLElement | null);
    setSource(opts.source ?? "Website");
    setInterest(opts.interest);
    setProgram(opts.program);
    setOpenId((n) => n + 1);
    safeSession.set(SESSION_KEY, "1");
    dialog.showModal();
    document.body.classList.add("scroll-locked");
    requestAnimationFrame(() => dialog.querySelector<HTMLInputElement>('input[name="fullName"]')?.focus());
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Runs for every way the dialog closes: close button, Escape, backdrop click, programmatic.
  const handleClose = useCallback(() => {
    document.body.classList.remove("scroll-locked");
    const el = returnFocusRef.current;
    returnFocusRef.current = null;
    if (el && document.contains(el)) el.focus();
  }, []);

  // Auto-open once per browser session, shortly after the first page load.
  useEffect(() => {
    if (safeSession.get(SESSION_KEY)) return;
    if (NO_AUTO_OPEN.some((p) => pathname?.startsWith(p))) return;
    const t = window.setTimeout(() => {
      if (safeSession.get(SESSION_KEY)) return;
      // Don't interrupt someone who is already typing into a form on the page.
      const active = document.activeElement;
      if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement || active instanceof HTMLSelectElement) return;
      open({ source: "Auto popup", trigger: null });
    }, AUTO_OPEN_DELAY_MS);
    return () => window.clearTimeout(t);
    // Only on first mount — navigating between pages shouldn't re-trigger it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormReady = useCallback((api: { reset: () => void; isSuccess: boolean }) => {
    formApi.current = api;
  }, []);

  return (
    <ConsultationContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialogRef}
        className="consult-dialog m-auto w-[calc(100%-1.5rem)] max-w-5xl overflow-hidden rounded-3xl bg-white p-0 text-ink shadow-2xl sm:w-[calc(100%-3rem)]"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClose={handleClose}
        onClick={(e) => {
          // Click on the backdrop (outside the panel) closes the dialog.
          if (e.target === e.currentTarget) close();
        }}
      >
        {/* Brand panel beside the form on desktop, compact header above it on smaller screens.
            Only the form panel scrolls, so the close button and title always stay in view. */}
        <div className="relative flex max-h-[calc(100dvh-1.5rem)] flex-col sm:max-h-[calc(100dvh-3rem)] lg:flex-row">
          <aside className="relative flex shrink-0 flex-col overflow-hidden bg-brand-deep px-6 pt-6 pb-5 text-white sm:px-8 sm:pt-7 sm:pb-6 lg:w-[21rem] lg:px-9 lg:py-10">
            <BrandShards />
            <p className="eyebrow eyebrow-light relative">{program ? "Register your interest" : "Book a consultation"}</p>
            <h2 id={titleId} className="relative mt-3 pr-12 text-[1.375rem] leading-tight font-bold text-white sm:text-2xl lg:pr-0 lg:text-[1.75rem]">
              {program ?? "Let’s Build Your Career Roadmap."}
            </h2>
            <p id={descId} className="relative mt-3 pr-6 text-sm leading-relaxed text-white/80 sm:pr-28 lg:pr-0 lg:text-[0.9375rem]">
              {program
                ? "This is an enquiry, not a confirmed booking. Our team will contact you to confirm availability, session details and payment instructions."
                : "Tell us a little about yourself. Our team can connect with you to discuss the right learning or career-development opportunities."}
            </p>

            <div className="relative mt-9 hidden lg:block">
              <p className="text-xs font-semibold tracking-[0.14em] text-white/60 uppercase">What happens next</p>
              <ol className="mt-4 space-y-4">
                {(program ? PROGRAM_STEPS : CONSULT_STEPS).map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm leading-snug text-white/85">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-teal text-xs font-bold text-navy">{i + 1}</span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative mt-auto hidden border-t border-white/15 pt-5 text-sm lg:block">
              <p className="text-white/60">Prefer to talk?</p>
              <a href={telHref(site.contact.phone)} className="mt-1 block font-semibold text-white hover:text-teal">{site.contact.phone}</a>
              <a href={`mailto:${site.contact.email}`} className="mt-0.5 block break-all text-white/80 hover:text-teal">{site.contact.email}</a>
            </div>
          </aside>

          <div data-scroll className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8 sm:py-7 lg:px-10 lg:py-7">
            <ConsultationForm
              compact
              leadSource={source}
              presetInterest={interest}
              program={program}
              presetKey={openId}
              onReady={onFormReady}
              onClose={close}
            />
          </div>

          <button
            type="button"
            onClick={close}
            className="absolute top-3.5 right-3.5 z-10 grid size-11 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 lg:bg-soft lg:text-navy lg:hover:bg-line"
            aria-label="Close consultation form"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </dialog>
    </ConsultationContext.Provider>
  );
}

/** Small decorative echo of the logo's coloured petals. */
function BrandShards() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute -top-10 -right-12 h-36 w-36 opacity-70 sm:h-44 sm:w-44 lg:hidden" viewBox="0 0 200 200">
      <path d="M120 20 C150 8 175 18 178 48 L182 92 L118 44 Z" fill="#F42B88" opacity="0.85" />
      <path d="M48 98 C30 112 22 132 40 146 L82 168 L70 100 Z" fill="#00D9B0" opacity="0.8" />
      <path d="M180 112 L184 160 C186 182 168 194 146 188 L104 176 Z" fill="#FFC747" opacity="0.85" />
    </svg>
  );
}
