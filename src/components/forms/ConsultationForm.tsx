"use client";

import { useEffect, useRef } from "react";
import { INTEREST_AREAS, USER_TYPES } from "@/lib/leads/schema";
import { ConsentField, FormAlert, FormSuccess, Honeypot, SelectField, Spinner, TextAreaField, TextField } from "./fields";
import { todayLocalISO, useLeadForm } from "./useLeadForm";
import { Icon } from "@/components/ui/Icon";

type Props = {
  leadSource: string;
  presetInterest?: string;
  /** Program title when registering interest in a specific program; adjusts copy and always applies the preset. */
  program?: string;
  /** Changes each time the modal opens, so the preset is re-applied on every open. */
  presetKey?: number;
  /** Called with the reset function so a parent (e.g. the modal) can clear a finished form. */
  onReady?: (api: { reset: () => void; isSuccess: boolean }) => void;
  onClose?: () => void;
  compact?: boolean;
};

export function ConsultationForm({ leadSource, presetInterest, program, presetKey, onReady, onClose, compact }: Props) {
  const f = useLeadForm("consultation", { leadSource });
  const formRef = useRef<HTMLFormElement>(null);
  const { setValues, values, status } = f;

  // Pre-select the interest from the CTA that opened the form. A general CTA never overwrites a
  // user's choice; a program CTA does, since it's the visitor's latest explicit intent. Other
  // fields are always left as the visitor typed them.
  useEffect(() => {
    if (!presetInterest || !(INTEREST_AREAS as readonly string[]).includes(presetInterest)) return;
    setValues((v) => (program || !v.interest ? { ...v, interest: presetInterest } : v));
  }, [presetInterest, program, presetKey, setValues]);

  useEffect(() => {
    onReady?.({ reset: f.reset, isSuccess: status === "success" });
  }, [onReady, f.reset, status]);

  if (status === "success") {
    return (
      <FormSuccess title="Thank You! Your Journey Starts Here." reference={f.reference}>
        {program ? (
          <p>
            We&apos;ve received your interest in the {program}. Your place isn&apos;t confirmed yet — the OunCatalyst team
            will contact you to confirm availability, session details and payment instructions.
          </p>
        ) : (
          <p>
            We&apos;ve received your consultation request. A member of the OunCatalyst team will review it and contact you
            using the details you shared.
          </p>
        )}
        {onClose ? (
          <button type="button" className="btn-primary mt-6" onClick={onClose}>
            Close
          </button>
        ) : (
          <button type="button" className="btn-secondary mt-6" onClick={f.reset}>
            Submit another request
          </button>
        )}
      </FormSuccess>
    );
  }

  const busy = status === "submitting";
  // Two columns from md up: below that, labels such as "College / Organization (optional)" wrap
  // and push inputs in neighbouring columns out of line.
  const grid = compact ? "grid gap-x-4 gap-y-4 md:grid-cols-2" : "grid gap-x-5 gap-y-5 md:grid-cols-2";

  return (
    <form
      ref={formRef}
      noValidate
      onFocus={f.markStarted}
      onSubmit={(e) => {
        e.preventDefault();
        f.submit(formRef.current);
      }}
      className={`relative ${compact ? "form-compact space-y-4" : "space-y-5"}`}
      aria-busy={busy}
    >
      {compact ? (
        <div className="hidden items-baseline justify-between gap-4 pr-14 lg:flex">
          <h3 className="text-lg font-semibold">Your details</h3>
          <p className="text-xs text-muted">
            Fields marked <span className="text-danger">*</span> are required
          </p>
        </div>
      ) : null}
      <div className={grid}>
        <TextField name="fullName" label="Full Name" required autoComplete="name" value={values.fullName} onChange={f.set("fullName")} error={f.errors.fullName} />
        <TextField name="email" label="Email" type="email" required autoComplete="email" inputMode="email" value={values.email} onChange={f.set("email")} error={f.errors.email} />
        <TextField name="phone" label="Phone Number" type="tel" required autoComplete="tel" inputMode="tel" value={values.phone} onChange={f.set("phone")} error={f.errors.phone} />
        <SelectField name="userType" label="I am a" required options={USER_TYPES} value={values.userType} onChange={f.set("userType")} error={f.errors.userType} />
        <SelectField name="interest" label="Area of Interest" required options={INTEREST_AREAS} value={values.interest} onChange={f.set("interest")} error={f.errors.interest} />
        <DateField
          label={program ? "Preferred Session Date" : compact ? "Preferred Date" : undefined}
          hint={compact ? null : undefined}
          value={values.preferredDate}
          onChange={f.set("preferredDate")}
          error={f.errors.preferredDate}
        />
        <TextField className="md:col-span-2" name="organization" label="College / Organization" autoComplete="organization" value={values.organization} onChange={f.set("organization")} error={f.errors.organization} />
        <TextAreaField
          className="md:col-span-2"
          name="message"
          label="Message"
          rows={3}
          placeholder="Tell us about your goals or questions."
          value={values.message}
          onChange={f.set("message")}
          error={f.errors.message}
        />
      </div>

      <Honeypot value={f.honeypot} onChange={f.setHoneypot} />
      <ConsentField checked={values.consent} onChange={f.set("consent")} error={f.errors.consent} />

      {status === "error" && f.serverError ? (
        <FormAlert message={f.serverError} onRetry={() => f.submit(formRef.current)} busy={busy} />
      ) : null}

      <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={busy}>
          {busy ? (<><Spinner /> Sending…</>) : program ? "Register My Interest" : "Request My Consultation"}
        </button>
        <p className="flex items-start gap-2 text-xs leading-relaxed text-muted sm:max-w-[17rem]">
          <Icon name="shield" className="mt-px size-4 shrink-0 text-success" />
          <span>We use your details only to respond to this request. No spam.</span>
        </p>
      </div>
      <p className="sr-only" aria-live="polite">{busy ? "Sending your request" : ""}</p>
    </form>
  );
}

type DateFieldProps = { value: string; onChange: (v: string) => void; error?: string; label?: string; hint?: string | null };

export function DateField({ value, onChange, error, label = "Preferred Consultation Date", hint = "We'll do our best to accommodate it." }: DateFieldProps) {
  return (
    <TextField
      name="preferredDate"
      label={label}
      type="date"
      min={typeof window === "undefined" ? undefined : todayLocalISO()}
      value={value}
      onChange={onChange}
      error={error}
      hint={hint ?? undefined}
    />
  );
}
