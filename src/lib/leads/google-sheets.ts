import "server-only";
import { createSign } from "node:crypto";

/**
 * Minimal Google Sheets API client using a service account (OAuth 2.0 JWT bearer flow).
 * Uses Node's crypto + fetch only, so there's no large SDK in the server bundle.
 */

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const SHEETS_BASE = "https://sheets.googleapis.com/v4/spreadsheets";

export class SheetsError extends Error {
  readonly retryable: boolean;
  readonly status?: number;
  constructor(message: string, retryable: boolean, status?: number) {
    super(message);
    this.retryable = retryable;
    this.status = status;
    this.name = "SheetsError";
  }
}

type Credentials = { clientEmail: string; privateKey: string; spreadsheetId: string };

export function readSheetsCredentials(): Credentials {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n").trim();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new SheetsError("Google Sheets credentials are not configured", false);
  }
  return { clientEmail, privateKey, spreadsheetId };
}

const b64url = (input: string | Buffer) => Buffer.from(input).toString("base64url");

export function signServiceAccountJwt(clientEmail: string, privateKey: string, nowSeconds = Math.floor(Date.now() / 1000)) {
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({ iss: clientEmail, scope: SCOPE, aud: TOKEN_URL, iat: nowSeconds, exp: nowSeconds + 3600 }),
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  return `${header}.${claims}.${signer.sign(privateKey).toString("base64url")}`;
}

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(creds: Credentials): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;

  let assertion: string;
  try {
    assertion = signServiceAccountJwt(creds.clientEmail, creds.privateKey);
  } catch {
    throw new SheetsError("GOOGLE_PRIVATE_KEY could not be used to sign a token", false);
  }

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new SheetsError(`Token request failed (${res.status})`, res.status >= 500, res.status);
  }
  const json = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!json.access_token) throw new SheetsError("Token response missing access_token", true);
  cachedToken = { value: json.access_token, expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000 };
  return json.access_token;
}

/**
 * Appends one row to the given tab and resolves only after Google confirms exactly one
 * row was written. Values are sent RAW, so user text is never evaluated as a formula.
 */
export async function appendRow(tab: string, row: string[]): Promise<{ updatedRange: string }> {
  const creds = readSheetsCredentials();
  const range = encodeURIComponent(`'${tab.replace(/'/g, "''")}'!A1`);
  const url = `${SHEETS_BASE}/${encodeURIComponent(creds.spreadsheetId)}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const attempt = async () => {
    const token = await getAccessToken(creds);
    return fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ majorDimension: "ROWS", values: [row] }),
      signal: AbortSignal.timeout(12_000),
      cache: "no-store",
    });
  };

  let res = await attempt();
  // A 429/503 means the write was rejected, so one retry can't create a duplicate row.
  if (res.status === 429 || res.status === 503) {
    await new Promise((r) => setTimeout(r, 800));
    res = await attempt();
  }
  if (res.status === 401) cachedToken = null;

  if (!res.ok) {
    const retryable = res.status === 429 || res.status >= 500;
    const hint =
      res.status === 403 ? " — is the sheet shared with the service account as Editor?" :
      res.status === 400 ? " — does the tab exist with this exact name?" : "";
    throw new SheetsError(`Sheets append failed (${res.status})${hint}`, retryable, res.status);
  }

  const json = (await res.json()) as { updates?: { updatedRows?: number; updatedRange?: string } };
  if (json.updates?.updatedRows !== 1 || !json.updates.updatedRange) {
    throw new SheetsError("Sheets did not confirm the row was written", true);
  }
  return { updatedRange: json.updates.updatedRange };
}
