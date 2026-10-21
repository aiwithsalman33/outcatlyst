// Run: npm test   (Node 22.18+/24 — uses native TypeScript type stripping)
// Exercises the Sheets client against a mocked Google API: JWT signing, token exchange,
// append request shape, and that success is reported only when Google confirms one row.
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync, createVerify } from "node:crypto";

const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = "leads@test-project.iam.gserviceaccount.com";
process.env.GOOGLE_PRIVATE_KEY = privateKey.export({ type: "pkcs8", format: "pem" }).replace(/\n/g, "\n");
process.env.GOOGLE_SHEETS_SPREADSHEET_ID = "sheet123";

const { appendRow, signServiceAccountJwt, SheetsError } = await import("../src/lib/leads/google-sheets.ts");

let calls = [];
let appendResponse;
beforeEach(() => {
  calls = [];
  appendResponse = () => Response.json({ updates: { updatedRows: 1, updatedRange: "'Consultation Leads'!A2:Q2" } });
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    if (String(url).startsWith("https://oauth2.googleapis.com/token")) return Response.json({ access_token: "tok", expires_in: 3600 });
    return appendResponse();
  };
});

test("JWT is RS256-signed with the service-account key and correct claims", () => {
  const jwt = signServiceAccountJwt(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, privateKey.export({ type: "pkcs8", format: "pem" }), 1000);
  const [h, c, s] = jwt.split(".");
  const v = createVerify("RSA-SHA256");
  v.update(`${h}.${c}`);
  assert.ok(v.verify(publicKey, Buffer.from(s, "base64url")), "signature verifies with public key");
  const claims = JSON.parse(Buffer.from(c, "base64url").toString());
  assert.equal(claims.scope, "https://www.googleapis.com/auth/spreadsheets");
  assert.equal(claims.aud, "https://oauth2.googleapis.com/token");
  assert.equal(claims.exp - claims.iat, 3600);
});

test("appends one RAW row to the named tab and resolves on confirmation", async () => {
  const res = await appendRow("Consultation Leads", ["id-1", "2026-01-01T00:00:00Z", "Consultation"]);
  assert.equal(res.updatedRange, "'Consultation Leads'!A2:Q2");
  const append = calls.find((c) => c.url.includes("sheets.googleapis.com"));
  assert.equal(decodeURIComponent(append.url.split("/values/")[1].split(":append")[0]), "'Consultation Leads'!A1");
  assert.equal(append.init.headers.Authorization, "Bearer tok");
  assert.deepEqual(JSON.parse(append.init.body).values, [["id-1", "2026-01-01T00:00:00Z", "Consultation"]]);
});

test("rejects when Google does not confirm exactly one written row", async () => {
  appendResponse = () => Response.json({ updates: { updatedRows: 0 } });
  await assert.rejects(appendRow("Consultation Leads", ["x"]), SheetsError);
});

test("403 is a non-retryable error with a sharing hint", async () => {
  appendResponse = () => new Response("forbidden", { status: 403 });
  await assert.rejects(appendRow("Consultation Leads", ["x"]), (e) => e instanceof SheetsError && !e.retryable && /shared with the service account/.test(e.message));
});

test("retries once on 503 then succeeds", async () => {
  let n = 0;
  appendResponse = () => (n++ === 0 ? new Response("busy", { status: 503 }) : Response.json({ updates: { updatedRows: 1, updatedRange: "A2" } }));
  await appendRow("Consultation Leads", ["x"]);
  assert.equal(calls.filter((c) => c.url.includes("sheets.googleapis.com")).length, 2);
});
