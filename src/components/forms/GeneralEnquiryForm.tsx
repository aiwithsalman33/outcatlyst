"use client";

import { useRef } from "react";
import { ENQUIRY_CATEGORIES } from "@/lib/leads/schema";
import { ConsentField, FormAlert, FormSuccess, Honeypot, SelectField, Spinner, TextAreaField, TextField } from "./fields";
import { useLeadForm } from "./useLeadForm";

export function GeneralEnquiryForm({ initialCategory }: { initialCategory?: string }) {
  const f = useLeadForm("general", { leadSource: "Contact page form", initial: { category: initialCategory ?? "" } });
  const formRef = useRef<HTMLFormElement>(null);
  const { values, status } = f;

  if (status === "success") {
    return (
      <FormSuccess title="Thanks — your message is with us." reference={f.reference}>
        <p>We&apos;ve saved your enquiry and the OunCatalyst team will get back to you.</p>
        <button type="button" className="btn-secondary mt-6" onClick={f.reset}>Send another message</button>
      </FormSuccess>
    );
  }

  const busy = status === "submitting";
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
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="fullName" label="Full Name" required autoComplete="name" value={values.fullName} onChange={f.set("fullName")} error={f.errors.fullName} />
        <TextField name="email" label="Email" type="email" required autoComplete="email" inputMode="email" value={values.email} onChange={f.set("email")} error={f.errors.email} />
        <TextField name="phone" label="Phone Number" type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={f.set("phone")} error={f.errors.phone} />
        <SelectField name="category" label="Enquiry Type" required options={ENQUIRY_CATEGORIES} value={values.category} onChange={f.set("category")} error={f.errors.category} />
        <TextField className="sm:col-span-2" name="organization" label="College / Organization" autoComplete="organization" value={values.organization} onChange={f.set("organization")} error={f.errors.organization} />
        <TextAreaField className="sm:col-span-2" name="message" label="Message" required rows={5} value={values.message} onChange={f.set("message")} error={f.errors.message} />
      </div>

      <Honeypot value={f.honeypot} onChange={f.setHoneypot} />
      <ConsentField checked={values.consent} onChange={f.set("consent")} error={f.errors.consent} />

      {status === "error" && f.serverError ? (
        <FormAlert message={f.serverError} onRetry={() => f.submit(formRef.current)} busy={busy} />
      ) : null}

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={busy}>
        {busy ? (<><Spinner /> Sending…</>) : "Send Message"}
      </button>
    </form>
  );
}
