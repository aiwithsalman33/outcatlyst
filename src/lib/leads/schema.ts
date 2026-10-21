/**
 * Shared lead-form schema and validation, used by both the browser (instant feedback)
 * and the API route (authoritative check). Keep this file free of server-only imports.
 */

export const FORM_TYPES = ["consultation", "college", "general"] as const;
export type FormType = (typeof FORM_TYPES)[number];

export const USER_TYPES = ["Student", "College Representative", "Working Professional", "Parent", "Other"] as const;

export const INTEREST_AREAS = [
  "Live Classes with Real Scenarios",
  "Industry Expert Connect",
  "Global Career Coaching",
  "Beyond Employability",
  "Experiential Programs (incl. The Years Exchange)",
  "College Partnership",
  "Not sure yet — I'd like guidance",
] as const;

export const COLLEGE_INTERESTS = [
  "Practical learning programs",
  "Industry interactions & expert sessions",
  "Mentorship programs",
  "Global career coaching for students",
  "Experiential learning initiatives",
  "A customised engagement",
  "Not sure yet",
] as const;

export const COHORT_SIZES = ["Under 100", "100–500", "500–1,000", "1,000+", "Not sure yet"] as const;

export const ENQUIRY_CATEGORIES = ["Student enquiry", "College partnership", "General enquiry"] as const;

export const CONSENT_TEXT =
  "I agree to be contacted by OunCatalyst about my enquiry and understand my details will be handled as described in the Privacy Policy.";

export type LeadInput = {
  fullName?: string;
  email?: string;
  phone?: string;
  userType?: string;
  organization?: string;
  designation?: string;
  cohortSize?: string;
  interest?: string;
  category?: string;
  preferredDate?: string;
  message?: string;
  consent?: boolean;
};

export type FieldName = keyof LeadInput;
export type FieldErrors = Partial<Record<FieldName, string>>;

type Rule = { required: boolean; max: number };

/** Which fields each form accepts, whether they're required, and max lengths. */
export const FORM_FIELDS: Record<FormType, Partial<Record<FieldName, Rule>>> = {
  consultation: {
    fullName: { required: true, max: 100 },
    email: { required: true, max: 160 },
    phone: { required: true, max: 24 },
    userType: { required: true, max: 40 },
    organization: { required: false, max: 160 },
    interest: { required: true, max: 80 },
    preferredDate: { required: false, max: 10 },
    message: { required: false, max: 2000 },
    consent: { required: true, max: 5 },
  },
  college: {
    fullName: { required: true, max: 100 },
    email: { required: true, max: 160 },
    phone: { required: true, max: 24 },
    organization: { required: true, max: 160 },
    designation: { required: true, max: 100 },
    cohortSize: { required: false, max: 40 },
    interest: { required: true, max: 80 },
    preferredDate: { required: false, max: 10 },
    message: { required: true, max: 2000 },
    consent: { required: true, max: 5 },
  },
  general: {
    fullName: { required: true, max: 100 },
    email: { required: true, max: 160 },
    phone: { required: false, max: 24 },
    category: { required: true, max: 40 },
    organization: { required: false, max: 160 },
    message: { required: true, max: 2000 },
    consent: { required: true, max: 5 },
  },
};

const OPTIONS: Partial<Record<FieldName, readonly string[]>> = {
  userType: USER_TYPES,
  cohortSize: COHORT_SIZES,
  category: ENQUIRY_CATEGORIES,
};

const INTEREST_OPTIONS: Record<FormType, readonly string[]> = {
  consultation: INTEREST_AREAS,
  college: COLLEGE_INTERESTS,
  general: [],
};

const LABELS: Record<FieldName, string> = {
  fullName: "your full name",
  email: "your email address",
  phone: "your phone number",
  userType: "which best describes you",
  organization: "your college or organization",
  designation: "your designation",
  cohortSize: "an approximate cohort size",
  interest: "an area of interest",
  category: "an enquiry type",
  preferredDate: "a date",
  message: "a message",
  consent: "consent",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s\-().]{7,24}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
// Control characters except tab/newline
const CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export function cleanText(value: unknown, max: number, multiline = false): string {
  if (typeof value !== "string") return "";
  let v = value.replace(CONTROL_RE, "").replace(/\r\n?/g, "\n");
  if (!multiline) v = v.replace(/\s+/g, " ");
  return v.trim().slice(0, max);
}

function todayISO(): string {
  const d = new Date();
  // Local calendar date, so users west of UTC aren't blocked from choosing "today".
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

/**
 * Validates and normalises input for a given form. Returns cleaned data containing only
 * the fields that form accepts, or a map of human-readable field errors.
 */
export function validateLead(
  formType: FormType,
  raw: Record<string, unknown>,
): { ok: true; data: LeadInput } | { ok: false; errors: FieldErrors } {
  const rules = FORM_FIELDS[formType];
  const errors: FieldErrors = {};
  const data: LeadInput = {};

  for (const [field, rule] of Object.entries(rules) as [FieldName, Rule][]) {
    if (field === "consent") {
      const given = raw.consent === true || raw.consent === "true" || raw.consent === "on";
      if (!given) errors.consent = "Please confirm you agree to be contacted.";
      data.consent = given;
      continue;
    }

    const value = cleanText(raw[field], rule.max + 1, field === "message");
    if (!value) {
      if (rule.required) {
        const isChoice = field in OPTIONS || field === "interest";
        errors[field] = `Please ${isChoice ? "select" : "enter"} ${LABELS[field]}.`;
      }
      continue;
    }
    if (value.length > rule.max) {
      errors[field] = `Please keep this under ${rule.max} characters.`;
      continue;
    }

    switch (field) {
      case "fullName":
        if (value.length < 2) errors.fullName = "Please enter your full name.";
        break;
      case "email":
        if (!EMAIL_RE.test(value)) errors.email = "Please enter a valid email address, e.g. name@example.com.";
        break;
      case "phone": {
        const digits = value.replace(/\D/g, "");
        if (!PHONE_RE.test(value) || digits.length < 7 || digits.length > 15)
          errors.phone = "Please enter a valid phone number, including country code if outside your country.";
        break;
      }
      case "preferredDate": {
        const t = Date.parse(`${value}T00:00:00Z`);
        if (!DATE_RE.test(value) || Number.isNaN(t)) errors.preferredDate = "Please choose a valid date.";
        else if (value < todayISO()) errors.preferredDate = "Please choose today or a future date.";
        break;
      }
      case "interest":
        if (INTEREST_OPTIONS[formType].length && !INTEREST_OPTIONS[formType].includes(value))
          errors.interest = "Please select an option from the list.";
        break;
      default:
        if (OPTIONS[field] && !OPTIONS[field]!.includes(value)) errors[field] = "Please select an option from the list.";
    }

    (data as Record<string, unknown>)[field] = field === "email" ? value.toLowerCase() : value;
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

/** Body the browser sends to /api/leads. */
export type LeadRequest = {
  formType: FormType;
  submissionId: string;
  fields: Record<string, unknown>;
  meta: { leadSource: string; pagePath: string; startedAt: number };
  /** Honeypot — must be empty. */
  website?: string;
};

export type LeadResponse =
  | { ok: true; submissionId: string; duplicate?: boolean }
  | { ok: false; error: string; fieldErrors?: FieldErrors; retryable?: boolean };
