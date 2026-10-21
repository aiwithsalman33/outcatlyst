import { NextResponse } from "next/server";
import { FORM_TYPES, cleanText, validateLead, type LeadRequest, type LeadResponse } from "@/lib/leads/schema";
import { saveLead, StoreError } from "@/lib/leads/store";
import { clientIp, fingerprint, isAllowedOrigin, markCompleted, once, rateLimit, wasCompleted } from "@/lib/leads/guards";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20_000;
const MIN_FILL_MS = 2_000;
const ID_RE = /^[a-zA-Z0-9-]{16,64}$/;

const reply = (body: LeadResponse, status: number, headers?: Record<string, string>) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

export async function POST(req: Request) {
  if (!isAllowedOrigin(req.headers)) {
    return reply({ ok: false, error: "This request was not accepted." }, 403);
  }
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return reply({ ok: false, error: "Unsupported request format." }, 415);
  }

  const text = await req.text();
  if (text.length > MAX_BODY_BYTES) {
    return reply({ ok: false, error: "Your message is too long. Please shorten it and try again." }, 413);
  }

  let body: Partial<LeadRequest>;
  try {
    body = JSON.parse(text);
  } catch {
    return reply({ ok: false, error: "We couldn't read that submission. Please try again." }, 400);
  }

  const formType = body.formType;
  if (!formType || !FORM_TYPES.includes(formType) || typeof body.fields !== "object" || !body.fields) {
    return reply({ ok: false, error: "We couldn't read that submission. Please try again." }, 400);
  }
  const submissionId = typeof body.submissionId === "string" && ID_RE.test(body.submissionId) ? body.submissionId : null;
  if (!submissionId) {
    return reply({ ok: false, error: "We couldn't read that submission. Please refresh the page and try again." }, 400);
  }

  // Idempotent retry: this exact submission was already saved.
  if (wasCompleted(`id:${submissionId}`)) return reply({ ok: true, submissionId, duplicate: true }, 200);

  // Spam checks: hidden honeypot field and an implausibly fast fill time.
  const startedAt = Number(body.meta?.startedAt);
  if (body.website || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return reply(
      { ok: false, error: "We couldn't verify this submission. Please review your details and submit again.", retryable: true },
      400,
    );
  }

  const ip = clientIp(req.headers);
  const limit = rateLimit(`ip:${ip}`);
  if (!limit.allowed) {
    const minutes = Math.max(1, Math.ceil(limit.retryAfterSeconds / 60));
    return reply(
      { ok: false, error: `Too many submissions from this connection. Please try again in about ${minutes} minute${minutes === 1 ? "" : "s"}.` },
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  const result = validateLead(formType, body.fields as Record<string, unknown>);
  if (!result.ok) {
    return reply({ ok: false, error: "Please correct the highlighted fields.", fieldErrors: result.errors }, 422);
  }

  const leadSource = cleanText(body.meta?.leadSource, 60) || "Website";
  const rawPath = cleanText(body.meta?.pagePath, 200);
  const pagePath = rawPath.startsWith("/") && !rawPath.startsWith("//") ? rawPath : "/";
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

  // Same person, same form, same content within a short window → already received.
  const fp = fingerprint([formType, result.data.email, result.data.interest, result.data.message]);
  if (wasCompleted(fp)) return reply({ ok: true, submissionId, duplicate: true }, 200);

  try {
    await once(submissionId, () =>
      saveLead({
        submissionId,
        timestamp: new Date().toISOString(),
        formType,
        data: result.data,
        leadSource,
        pageUrl: `${siteUrl}${pagePath}`,
      }),
    );
    markCompleted(`id:${submissionId}`, fp);
    return reply({ ok: true, submissionId }, 201);
  } catch (err) {
    const retryable = err instanceof StoreError ? err.retryable : true;
    // Log the reason and the ID only — never the submitted personal data.
    console.error(`[leads] save failed id=${submissionId} form=${formType}: ${err instanceof Error ? err.message : "unknown"}`);
    return reply(
      {
        ok: false,
        retryable,
        error: retryable
          ? "We couldn't save your request just now. Your details are still here — please try again in a moment."
          : "Our enquiry system is temporarily unavailable. Your details are still here — please try again later or use the contact page.",
      },
      retryable ? 503 : 500,
    );
  }
}

export function GET() {
  return reply({ ok: false, error: "Method not allowed." }, 405, { Allow: "POST" });
}
