"use client";

import { useRef } from "react";
import { COHORT_SIZES, COLLEGE_INTERESTS } from "@/lib/leads/schema";
import { ConsentField, FormAlert, FormSuccess, Honeypot, SelectField, Spinner, TextAreaField, TextField } from "./fields";
import { useLeadForm } from "./useLeadForm";
import { DateField } from "./ConsultationForm";

export function CollegePartnershipForm({ leadSource = "For Colleges form" }: { leadSource?: string }) {
  const f = useLeadForm("college", { leadSource });
  const formRef = useRef<HTMLFormElement>(null);
  const { values, status } = f;

  if (status === "success") {
    return (
      <FormSuccess title="Thank you — we've received your enquiry." reference={f.reference}>
        <p>
          Our partnerships team will review your institution&apos;s requirements and reach out to arrange an initial
          conversation.
        </p>
        <button type="button" className="btn-secondary mt-6" onClick={f.reset}>Submit another enquiry</button>
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
        <TextField name="fullName" label="Contact Person's Name" required autoComplete="name" value={values.fullName} onChange={f.set("fullName")} error={f.errors.fullName} />
        <TextField name="designation" label="Designation" required autoComplete="organization-title" placeholder="e.g. Placement Officer, Dean" value={values.designation} onChange={f.set("designation")} error={f.errors.designation} />
        <TextField name="email" label="Official Email" type="email" required autoComplete="email" inputMode="email" value={values.email} onChange={f.set("email")} error={f.errors.email} />
        <TextField name="phone" label="Phone Number" type="tel" required autoComplete="tel" inputMode="tel" value={values.phone} onChange={f.set("phone")} error={f.errors.phone} />
        <TextField className="sm:col-span-2" name="organization" label="College / Institution Name" required autoComplete="organization" value={values.organization} onChange={f.set("organization")} error={f.errors.organization} />
        <SelectField name="cohortSize" label="Approximate Student Cohort Size" options={COHORT_SIZES} value={values.cohortSize} onChange={f.set("cohortSize")} error={f.errors.cohortSize} />
        <SelectField name="interest" label="Area of Interest" required options={COLLEGE_INTERESTS} value={values.interest} onChange={f.set("interest")} error={f.errors.interest} />
        <DateField label="Preferred Discussion Date" value={values.preferredDate} onChange={f.set("preferredDate")} error={f.errors.preferredDate} />
        <div className="hidden sm:block" aria-hidden="true" />
        <TextAreaField
          className="sm:col-span-2"
          name="message"
          label="Message"
          required
          rows={5}
          placeholder="Share your students' needs, programs you're considering, or questions for our team."
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

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={busy}>
        {busy ? (<><Spinner /> Sending…</>) : "Discuss a College Partnership"}
      </button>
    </form>
  );
}
