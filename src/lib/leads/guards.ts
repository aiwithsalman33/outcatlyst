import "server-only";
import { createHash } from "node:crypto";

/**
 * In-memory abuse guards. They protect a single server instance; on multi-instance or
 * serverless hosting, back these with a shared store (e.g. Redis/Upstash) — see docs.
 */

const hits = new Map<string, number[]>();

export function rateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const max = Number(process.env.RATE_LIMIT_MAX) || 5;
  const windowMs = (Number(process.env.RATE_LIMIT_WINDOW_SECONDS) || 600) * 1000;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return { allowed: false, retryAfterSeconds: Math.ceil((windowMs - (now - recent[0])) / 1000) };
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 10_000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

/** Successful submissions remembered for idempotent retries and duplicate detection. */
const completed = new Map<string, number>();
const inFlight = new Map<string, Promise<void>>();
const ID_TTL = 60 * 60 * 1000;
const FINGERPRINT_TTL = 10 * 60 * 1000;

function prune() {
  const now = Date.now();
  if (completed.size < 5_000) return;
  for (const [k, t] of completed) if (now - t > ID_TTL) completed.delete(k);
}

export function fingerprint(parts: (string | undefined)[]): string {
  return "fp:" + createHash("sha256").update(parts.map((p) => (p ?? "").toLowerCase()).join("|")).digest("hex");
}

export function wasCompleted(key: string, ttl = key.startsWith("fp:") ? FINGERPRINT_TTL : ID_TTL): boolean {
  const t = completed.get(key);
  return t !== undefined && Date.now() - t < ttl;
}

export function markCompleted(...keys: string[]) {
  prune();
  const now = Date.now();
  for (const k of keys) completed.set(k, now);
}

/** Ensures two concurrent requests with the same submission ID trigger only one write. */
export async function once(id: string, work: () => Promise<void>): Promise<void> {
  const existing = inFlight.get(id);
  if (existing) return existing;
  const p = work().finally(() => inFlight.delete(id));
  inFlight.set(id, p);
  return p;
}

export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

/** Same-origin check so third-party pages can't post into the CRM from a visitor's browser. */
export function isAllowedOrigin(headers: Headers): boolean {
  const origin = headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  const allowed = new Set<string>();
  const host = headers.get("x-forwarded-host") ?? headers.get("host");
  if (host) allowed.add(host);
  try {
    if (process.env.NEXT_PUBLIC_SITE_URL) allowed.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).host);
  } catch {}
  return allowed.has(originHost);
}
