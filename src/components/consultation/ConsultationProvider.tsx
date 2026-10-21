"use client";

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ConsultationForm } from "@/components/forms/ConsultationForm";

type OpenOptions = { source?: string; interest?: string; trigger?: HTMLElement | null };
type Ctx = { open: (opts?: OpenOptions) => void };

const ConsultationContext = createContext<Ctx | null>(null);

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
        className="consult-dialog m-auto max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-2xl overflow-y-auto overscroll-contain rounded-3xl bg-white p-0 text-ink shadow-2xl"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClose={handleClose}
        onClick={(e) => {
          // Click on the backdrop (outside the panel) closes the dialog.
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="relative">
          <div className="relative overflow-hidden bg-brand-deep px-6 pt-8 pb-7 text-white sm:px-10 sm:pt-10">
            <BrandShards />
            <p className="eyebrow eyebrow-light">Book a consultation</p>
            <h2 id={titleId} className="mt-3 max-w-md text-2xl font-bold text-white sm:text-3xl">
              Let&apos;s Build Your Career Roadmap.
            </h2>
            <p id={descId} className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-white/80">
              Tell us a little about yourself. Our team can connect with you to discuss the right learning or
              career-development opportunities.
            </p>
            <button
              type="button"
              onClick={close}
              className="absolute top-4 right-4 grid size-11 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Close consultation form"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <div className="px-6 py-7 sm:px-10 sm:py-8">
            <ConsultationForm compact leadSource={source} presetInterest={interest} onReady={onFormReady} onClose={close} />
            <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-muted">
              <strong className="font-semibold text-ink">Your privacy:</strong> we use these details only to respond to
              your request and never sell them. See our{" "}
              <a href="/privacy-policy" target="_blank" className="font-medium text-brand underline underline-offset-2">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </dialog>
    </ConsultationContext.Provider>
  );
}

/** Small decorative echo of the logo's coloured petals. */
function BrandShards() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute -top-6 -right-8 h-40 w-40 opacity-90 sm:h-48 sm:w-48" viewBox="0 0 200 200">
      <path d="M120 20 C150 8 175 18 178 48 L182 92 L118 44 Z" fill="#F42B88" opacity="0.85" />
      <path d="M48 98 C30 112 22 132 40 146 L82 168 L70 100 Z" fill="#00D9B0" opacity="0.8" />
      <path d="M180 112 L184 160 C186 182 168 194 146 188 L104 176 Z" fill="#FFC747" opacity="0.85" />
    </svg>
  );
}
