import "server-only";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { appendRow, SheetsError } from "./google-sheets";
import type { FormType, LeadInput } from "./schema";

/** Column order for every tab. Keep in sync with docs/google-sheets-setup.md. */
export const SHEET_COLUMNS = [
  "Submission ID",
  "Timestamp (UTC)",
  "Enquiry Category",
  "Full Name",
  "Email",
  "Phone",
  "User Type",
  "College / Organization",
  "Designation",
  "Student Cohort Size",
  "Area of Interest",
  "Preferred Consultation Date",
  "Message",
  "Consent",
  "Lead Source",
  "Page URL",
  "Submission Status",
] as const;

export type LeadRecord = {
  submissionId: string;
  timestamp: string;
  formType: FormType;
  data: LeadInput;
  leadSource: string;
  pageUrl: string;
};

const CATEGORY: Record<FormType, string> = {
  consultation: "Consultation",
  college: "College partnership",
  general: "General enquiry",
};

export function tabFor(formType: FormType): string {
  const env = {
    consultation: process.env.SHEET_TAB_CONSULTATION,
    college: process.env.SHEET_TAB_COLLEGE,
    general: process.env.SHEET_TAB_GENERAL,
  }[formType];
  const fallback = { consultation: "Consultation Leads", college: "College Partnerships", general: "General Enquiries" }[formType];
  return env?.trim() || fallback;
}

/**
 * Neutralises values a spreadsheet could interpret as a formula if the sheet is later
 * exported to CSV and opened elsewhere (CSV/formula injection).
 */
export function safeCell(value: string | undefined): string {
  const v = value ?? "";
  // Plain numbers such as "+91 98765 43210" can't execute anything, so keep them readable.
  if (/^[+-]?[\d\s().-]+$/.test(v)) return v;
  return /^[=+\-@\t\r]/.test(v) ? `'${v}` : v;
}

export function toRow(rec: LeadRecord): string[] {
  const d = rec.data;
  const category = rec.formType === "general" && d.category ? d.category : CATEGORY[rec.formType];
  return [
    rec.submissionId,
    rec.timestamp,
    category,
    d.fullName,
    d.email,
    d.phone,
    rec.formType === "college" ? "College Representative" : d.userType,
    d.organization,
    d.designation,
    d.cohortSize,
    d.interest,
    d.preferredDate,
    d.message,
    d.consent ? `Yes (${rec.timestamp})` : "No",
    rec.leadSource,
    rec.pageUrl,
    "New",
  ].map((v) => safeCell(v));
}

export class StoreError extends Error {
  readonly retryable: boolean;
  constructor(message: string, retryable: boolean) {
    super(message);
    this.retryable = retryable;
    this.name = "StoreError";
  }
}

async function saveToAppsScript(tab: string, row: string[]) {
  const url = process.env.APPS_SCRIPT_URL?.trim();
  const secret = process.env.APPS_SCRIPT_SHARED_SECRET?.trim();
  if (!url || !secret) throw new StoreError("Apps Script backend is not configured", false);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, tab, columns: SHEET_COLUMNS, row }),
    redirect: "follow",
    signal: AbortSignal.timeout(15_000),
    cache: "no-store",
  });
  const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!res.ok || !json?.ok) {
    throw new StoreError(`Apps Script write failed (${res.status}${json?.error ? `: ${json.error}` : ""})`, res.status >= 500);
  }
}

async function saveToLocalFile(tab: string, row: string[]) {
  if (process.env.NODE_ENV === "production") {
    throw new StoreError("local-file backend is disabled in production", false);
  }
  const dir = path.join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  const record = Object.fromEntries(SHEET_COLUMNS.map((c, i) => [c, row[i] ?? ""]));
  await appendFile(path.join(dir, "leads.jsonl"), JSON.stringify({ tab, ...record }) + "\n", "utf8");
}

/** Persists a lead. Resolves only after the backend confirms the write. */
export async function saveLead(rec: LeadRecord): Promise<void> {
  const backend = (process.env.LEADS_BACKEND || "sheets-api").trim();
  const tab = tabFor(rec.formType);
  const row = toRow(rec);
  try {
    if (backend === "sheets-api") await appendRow(tab, row);
    else if (backend === "apps-script") await saveToAppsScript(tab, row);
    else if (backend === "local-file") await saveToLocalFile(tab, row);
    else throw new StoreError(`Unknown LEADS_BACKEND "${backend}"`, false);
  } catch (err) {
    if (err instanceof StoreError) throw err;
    if (err instanceof SheetsError) throw new StoreError(err.message, err.retryable);
    const timeout = err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError");
    throw new StoreError(timeout ? "Storage backend timed out" : "Storage backend unreachable", true);
  }
}
