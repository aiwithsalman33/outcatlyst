"use client";

import { useId, type ReactNode } from "react";
import Link from "next/link";
import { CONSENT_TEXT } from "@/lib/leads/schema";

type Base = {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  hint?: ReactNode;
  className?: string;
};

function Label({ id, label, required }: { id: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="field-label">
      {label}
      {required ? (
        <span className="text-danger" aria-hidden="true"> *</span>
      ) : (
        <span className="font-normal text-muted"> (optional)</span>
      )}
    </label>
  );
}

function Help({ id, error, hint }: { id: string; error?: string; hint?: ReactNode }) {
  return (
    <>
      {hint && !error ? <p id={`${id}-hint`} className="field-hint">{hint}</p> : null}
      {error ? <p id={`${id}-error`} className="field-error">{error}</p> : null}
    </>
  );
}

const describedBy = (id: string, error?: string, hint?: ReactNode) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export function TextField({
  type = "text",
  autoComplete,
  inputMode,
  min,
  placeholder,
  ...p
}: Base & {
  type?: "text" | "email" | "tel" | "date";
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  min?: string;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div className={p.className}>
      <Label id={id} label={p.label} required={p.required} />
      <input
        id={id}
        name={p.name}
        type={type}
        value={p.value}
        onChange={(e) => p.onChange(e.target.value)}
        required={p.required}
        aria-required={p.required}
        aria-invalid={p.error ? true : undefined}
        aria-describedby={describedBy(id, p.error, p.hint)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        min={min}
        suppressHydrationWarning
        placeholder={placeholder}
        className="field-input field-control"
      />
      <Help id={id} error={p.error} hint={p.hint} />
    </div>
  );
}

export function SelectField({ options, ...p }: Base & { options: readonly string[] }) {
  const id = useId();
  return (
    <div className={p.className}>
      <Label id={id} label={p.label} required={p.required} />
      <div className="relative">
        <select
          id={id}
          name={p.name}
          value={p.value}
          onChange={(e) => p.onChange(e.target.value)}
          required={p.required}
          aria-required={p.required}
          aria-invalid={p.error ? true : undefined}
          aria-describedby={describedBy(id, p.error, p.hint)}
          className="field-input field-control appearance-none pr-10"
        >
          <option value="">Select an option</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <svg aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </div>
      <Help id={id} error={p.error} hint={p.hint} />
    </div>
  );
}

export function TextAreaField({ rows = 4, placeholder, ...p }: Base & { rows?: number; placeholder?: string }) {
  const id = useId();
  return (
    <div className={p.className}>
      <Label id={id} label={p.label} required={p.required} />
      <textarea
        id={id}
        name={p.name}
        rows={rows}
        value={p.value}
        onChange={(e) => p.onChange(e.target.value)}
        required={p.required}
        aria-required={p.required}
        aria-invalid={p.error ? true : undefined}
        aria-describedby={describedBy(id, p.error, p.hint)}
        placeholder={placeholder}
        maxLength={2000}
        className="field-input min-h-24 resize-y"
      />
      <Help id={id} error={p.error} hint={p.hint} />
    </div>
  );
}

export function ConsentField({ checked, onChange, error }: { checked: boolean; onChange: (v: boolean) => void; error?: string }) {
  const id = useId();
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name="consent"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
          aria-required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-brand"
        />
        <label htmlFor={id} className="min-w-0 flex-1 cursor-pointer text-sm leading-relaxed text-muted">
          {CONSENT_TEXT.replace(" in the Privacy Policy.", "")} in the{" "}
          <Link href="/privacy-policy" className="font-medium text-brand underline underline-offset-2" target="_blank">
            Privacy Policy
          </Link>
          . <span className="text-danger" aria-hidden="true">*</span>
        </label>
      </div>
      {error ? <p id={`${id}-error`} className="field-error pl-8">{error}</p> : null}
    </div>
  );
}

/** Off-screen honeypot. Humans never see or reach it; bots that fill every field get rejected. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}

export function Spinner() {
  return (
    <svg className="size-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function FormAlert({ message, onRetry, busy }: { message: string; onRetry?: () => void; busy?: boolean }) {
  return (
    <div role="alert" className="flex flex-col gap-3 rounded-xl border border-danger/25 bg-danger/5 p-4 text-sm text-ink sm:flex-row sm:items-center sm:justify-between">
      <p className="flex items-start gap-2">
        <svg aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-danger" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
        <span>{message}</span>
      </p>
      {onRetry ? (
        <button type="button" onClick={onRetry} disabled={busy} className="btn-secondary min-h-10 shrink-0 px-4 py-2 text-sm">
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function FormSuccess({ title, children, reference }: { title: string; children: ReactNode; reference: string }) {
  return (
    <div role="status" className="py-6 text-center">
      <div className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-teal/15 text-success">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <div className="mx-auto mt-3 max-w-md text-muted">{children}</div>
      <p className="mt-4 text-xs text-muted">
        Reference: <span className="font-mono">{reference.slice(0, 8).toUpperCase()}</span>
      </p>
    </div>
  );
}
