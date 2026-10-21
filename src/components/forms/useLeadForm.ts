"use client";

import { useCallback, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  validateLead,
  type FieldErrors,
  type FieldName,
  type FormType,
  type LeadInput,
  type LeadRequest,
  type LeadResponse,
} from "@/lib/leads/schema";

export type Status = "idle" | "submitting" | "success" | "error";

type Values = Required<Omit<LeadInput, "consent">> & { consent: boolean };

const EMPTY: Values = {
  fullName: "",
  email: "",
  phone: "",
  userType: "",
  organization: "",
  designation: "",
  cohortSize: "",
  interest: "",
  category: "",
  preferredDate: "",
  message: "",
  consent: false,
};

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;

/**
 * Form state + submission for every lead form. The submission ID stays the same across
 * retries so the server can de-duplicate, and values are kept on failure.
 */
export function useLeadForm(formType: FormType, opts: { leadSource: string; initial?: Partial<Values> }) {
  const pathname = usePathname();
  const [values, setValues] = useState<Values>({ ...EMPTY, ...opts.initial });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");
  const [reference, setReference] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const submissionId = useRef<string>("");
  const startedAt = useRef<number>(0);

  const markStarted = useCallback(() => {
    if (!startedAt.current) startedAt.current = Date.now();
  }, []);

  const set = useCallback(
    <K extends keyof Values>(field: K) =>
      (value: Values[K]) => {
        if (!startedAt.current) startedAt.current = Date.now();
        setValues((v) => ({ ...v, [field]: value }));
        setErrors((e) => (e[field as FieldName] ? { ...e, [field]: undefined } : e));
      },
    [],
  );

  const focusFirstError = (errs: FieldErrors, form: HTMLFormElement | null) => {
    const first = Object.keys(errs)[0];
    if (!first || !form) return;
    const el = form.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
  };

  const submit = useCallback(
    async (form: HTMLFormElement | null) => {
      if (status === "submitting") return;
      const check = validateLead(formType, values as Record<string, unknown>);
      if (!check.ok) {
        setErrors(check.errors);
        setStatus("idle");
        setServerError("");
        requestAnimationFrame(() => focusFirstError(check.errors, form));
        return;
      }

      if (!submissionId.current) submissionId.current = newId();
      if (!startedAt.current) startedAt.current = Date.now();
      setStatus("submitting");
      setServerError("");

      const payload: LeadRequest = {
        formType,
        submissionId: submissionId.current,
        fields: values,
        meta: { leadSource: opts.leadSource, pagePath: pathname || "/", startedAt: startedAt.current },
        website: honeypot,
      };

      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = (await res.json().catch(() => null)) as LeadResponse | null;

        if (res.ok && json?.ok) {
          setReference(json.submissionId);
          setStatus("success");
          return;
        }
        if (json && !json.ok && json.fieldErrors) {
          setErrors(json.fieldErrors);
          requestAnimationFrame(() => focusFirstError(json.fieldErrors!, form));
        }
        setServerError(
          json && !json.ok ? json.error : "We couldn't save your request just now. Your details are still here — please try again.",
        );
        setStatus("error");
      } catch {
        setServerError("We couldn't reach our server. Please check your connection — your details are still here.");
        setStatus("error");
      }
    },
    [formType, values, honeypot, pathname, status, opts.leadSource],
  );

  const reset = useCallback(() => {
    setValues({ ...EMPTY, ...opts.initial });
    setErrors({});
    setStatus("idle");
    setServerError("");
    setReference("");
    submissionId.current = "";
    startedAt.current = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { values, set, setValues, errors, status, serverError, reference, submit, reset, honeypot, setHoneypot, markStarted };
}

export function todayLocalISO() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}
