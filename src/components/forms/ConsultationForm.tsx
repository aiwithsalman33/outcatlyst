"use client";

import { useEffect, useRef } from "react";
import { INTEREST_AREAS, USER_TYPES } from "@/lib/leads/schema";
import { ConsentField, FormAlert, FormSuccess, Honeypot, SelectField, Spinner, TextAreaField, TextField } from "./fields";
import { todayLocalISO, useLeadForm } from "./useLeadForm";

type Props = {
  leadSource: string;
  presetInterest?: string;
  /** Called with the reset function so a parent (e.g. the modal) can clear a finished form. */
  onReady?: (api: { reset: () => void; isSuccess: boolean }) => void;
  onClose?: () => void;
  compact?: boolean;
};

export function ConsultationForm({ leadSource, presetInterest, onReady, onClose, compact }: Props) {
  const f = useLeadForm("consultation", { leadSource });
  const formRef = useRef<HTMLFormElement>(null);
  const { setValues, values, status } = f;

  // Pre-select the interest from the CTA that opened the form, without overwriting a user choice.
  useEffect(() => {
    if (presetInterest && !values.interest && (INTEREST_AREAS as readonly string[]).includes(presetInterest)) {
      setValues((v) => ({ ...v, interest: presetInterest }));
    }
  }, [presetInterest, values.interest, setValues]);

  useEffect(() => {
    onReady?.({ reset: f.reset, isSuccess: status === "success" });
  }, [onReady, f.reset, status]);

  if (status === "success") {
    return (
      <FormSuccess title="Thank You! Your Journey Starts Here." reference={f.reference}>
        <p>
          We&apos;ve received your consultation request. A member of the OunCatalyst team will review it and contact you
          using the details you shared.
        </p>
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
  const grid = compact ? "grid gap-4 sm:grid-cols-2" : "grid gap-5 sm:grid-cols-2";

  return (
    <form
      ref={formRef}
      noValidate
      onFocus={f.markStarted}
      onSubmit={(e) => {
        e.preventDefault();
        f.submit(formRef.current);
      }}
      className="relative space-y-5"
      aria-busy={busy}
    >
      <div className={grid}>
        <TextField name="fullName" label="Full Name" required autoComplete="name" value={values.fullName} onChange={f.set("fullName")} error={f.errors.fullName} />
        <TextField name="email" label="Email" type="email" required autoComplete="email" inputMode="email" value={values.email} onChange={f.set("email")} error={f.errors.email} />
        <TextField name="phone" label="Phone Number" type="tel" required autoComplete="tel" inputMode="tel" value={values.phone} onChange={f.set("phone")} error={f.errors.phone} />
        <SelectField name="userType" label="I am a" required options={USER_TYPES} value={values.userType} onChange={f.set("userType")} error={f.errors.userType} />
        <TextField name="organization" label="College / Organization" autoComplete="organization" value={values.organization} onChange={f.set("organization")} error={f.errors.organization} />
        <SelectField name="interest" label="Area of Interest" required options={INTEREST_AREAS} value={values.interest} onChange={f.set("interest")} error={f.errors.interest} />
        <DateField value={values.preferredDate} onChange={f.set("preferredDate")} error={f.errors.preferredDate} />
        <TextAreaField
          className="sm:col-span-2"
          name="message"
          label="Message"
          rows={compact ? 3 : 4}
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

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={busy}>
          {busy ? (<><Spinner /> Sending…</>) : "Request My Consultation"}
        </button>
        <p className="text-xs text-muted sm:max-w-[16rem] sm:text-right">
          We use your details only to respond to this request. No spam.
        </p>
      </div>
      <p className="sr-only" aria-live="polite">{busy ? "Sending your request" : ""}</p>
    </form>
  );
}

export function DateField({ value, onChange, error, label = "Preferred Consultation Date" }: { value: string; onChange: (v: string) => void; error?: string; label?: string }) {
  return (
    <TextField
      name="preferredDate"
      label={label}
      type="date"
      min={typeof window === "undefined" ? undefined : todayLocalISO()}
      value={value}
      onChange={onChange}
      error={error}
      hint="We'll do our best to accommodate it."
    />
  );
}
