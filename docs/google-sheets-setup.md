# Google Sheets lead capture — setup guide

Every form on the site (consultation modal, Global Career Coaching form, college partnership form, contact form) posts to one server endpoint, `POST /api/leads`. That endpoint validates the submission and writes **one row** to Google Sheets. The visitor only sees a success message after Google confirms the row was written.

```
Browser form ──► /api/leads (Next.js, server) ──► Google Sheets API ──► Spreadsheet tab
                 validate · consent · origin       service account       Consultation Leads
                 honeypot · timing · rate limit    (credentials stay     College Partnerships
                 duplicate protection              on the server)        General Enquiries
```

There are two supported backends:

| Backend | `LEADS_BACKEND` | When to use |
|---|---|---|
| Google Sheets API + service account | `sheets-api` | **Recommended.** Direct, fast, and confirms each write. |
| Google Apps Script web app | `apps-script` | If you can't create a Google Cloud project. |
| Local JSONL file | `local-file` | Development only. It writes to `.data/leads.jsonl` and is refused in production. |

---

## 1. Create the spreadsheet

1. Create a new Google Sheet, for example **"OunCatalyst — Website Leads"**.
2. Create three tabs with these **exact** names. They can be changed with the `SHEET_TAB_*` env vars.
   - `Consultation Leads`
   - `College Partnerships`
   - `General Enquiries`
3. In **row 1 of each tab**, paste this header row. It is tab-separated, so it pastes into columns A–Q:

```
Submission ID	Timestamp (UTC)	Enquiry Category	Full Name	Email	Phone	User Type	College / Organization	Designation	Student Cohort Size	Area of Interest	Preferred Consultation Date	Message	Consent	Lead Source	Page URL	Submission Status
```

4. Optional but recommended:
   - Freeze row 1.
   - Add a dropdown on **Submission Status** (`New`, `Contacted`, `In discussion`, `Closed`). New rows arrive as `New`.
5. Copy the **spreadsheet ID** from the URL: `https://docs.google.com/spreadsheets/d/`**`<THIS_PART>`**`/edit`.

What each column contains:

| Column | Notes |
|---|---|
| Submission ID | Random UUID generated per form fill. The visitor sees the first 8 characters as their reference. |
| Timestamp (UTC) | ISO-8601 time the server received the submission. |
| Enquiry Category | `Consultation`, `College partnership`, or the category picked on the contact form. |
| User Type | Student, College Representative, Working Professional, Parent or Other. |
| Consent | `Yes (<timestamp>)`. The API rejects any submission without consent. |
| Lead Source | Which button or form was used, e.g. `Header CTA`, `Auto popup`, `For Colleges form`. |
| Page URL | The page the form was submitted from. |

## 2. Create a service account (Google Cloud)

1. Go to <https://console.cloud.google.com/> and create (or select) a project.
2. **APIs & Services → Library →** enable **Google Sheets API**.
3. **IAM & Admin → Service Accounts → Create service account**, for example `website-leads`. It needs no project roles.
4. Open the service account → **Keys → Add key → Create new key → JSON**. A JSON file downloads. Treat it like a password.
5. From the JSON, you need:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY`

## 3. Share the sheet with the service account

In the spreadsheet click **Share** and add the service account's `client_email` as an **Editor**. Untick "Notify people".

This is the only access the service account has. It can't see any other file in your Drive. Keep the sheet's other sharing restricted to the team members who handle leads.

## 4. Configure environment variables

Locally, copy `.env.example` to `.env.local`. In production, add these values in your host's environment settings:

```bash
LEADS_BACKEND=sheets-api
GOOGLE_SHEETS_SPREADSHEET_ID=1AbC...xyz
GOOGLE_SERVICE_ACCOUNT_EMAIL=website-leads@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com
```

- Paste the private key on one line, keeping the `\n` sequences as they appear in the JSON. The server converts them back to line breaks.
- **Never** prefix these with `NEXT_PUBLIC_`. Only `NEXT_PUBLIC_*` variables reach the browser.
- Delete the downloaded JSON key file once the values are stored in your host's secret settings.

## 5. Test a submission

1. Start the site (`npm run dev`) and open it.
2. Submit the consultation popup with test data.
3. Expected result: the success message **"Thank You! Your Journey Starts Here."**, plus a new row in `Consultation Leads` whose Submission ID starts with the reference shown.
4. Repeat for `/for-colleges` (→ `College Partnerships`) and `/contact` (→ `General Enquiries`).
5. Test the failure path. Temporarily set a wrong spreadsheet ID and submit. The form should show an error, keep everything you typed, and show **no** success message. The server log will show `[leads] save failed id=… : Sheets append failed (404)` with no personal data.

Common errors (from the server log):

| Log message | Fix |
|---|---|
| `credentials are not configured` | One of the three `GOOGLE_*` variables is missing. |
| `could not be used to sign a token` | `GOOGLE_PRIVATE_KEY` is malformed. Re-paste it with its `\n` sequences and surrounding quotes. |
| `Token request failed (400/401)` | Key revoked, or email and key belong to different service accounts. |
| `(403) — is the sheet shared…` | Share the sheet with the service account as Editor, and check the Sheets API is enabled. |
| `(400) — does the tab exist…` | Tab name doesn't match. Check spelling and the `SHEET_TAB_*` variables. |
| `(404)` | Wrong spreadsheet ID. |

## 6. Alternative: Google Apps Script backend

Use this if a Google Cloud project isn't an option.

1. In the spreadsheet: **Extensions → Apps Script**. Replace the code with [`google-apps-script.gs`](./google-apps-script.gs).
2. **Project Settings → Script properties →** add `SHARED_SECRET` with a long random value. You can generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
3. **Deploy → New deployment → Web app**. Set **Execute as: Me** and **Who has access: Anyone**. Copy the `/exec` URL.
4. Set the environment variables:
   ```bash
   LEADS_BACKEND=apps-script
   APPS_SCRIPT_URL=https://script.google.com/macros/s/…/exec
   APPS_SCRIPT_SHARED_SECRET=<same value as the script property>
   ```

The web app URL is public, but it rejects any request without the shared secret. The secret is only ever sent from the server.

## Security notes

- **Credentials stay server-side.** The browser only talks to `/api/leads`.
- **Validation is enforced on the server.** It covers required fields, formats and allowed dropdown values, and the same rules give instant feedback in the browser.
- **Consent is required.** Submissions without it are rejected with `422`.
- **Spam protection:**
  - A hidden honeypot field.
  - Submissions completed in under 2 seconds are rejected.
  - Requests from other websites are rejected with `403`.
  - Bodies over 20 KB are rejected.
- **Rate limiting:** 5 submissions per IP per 10 minutes by default. Configure with `RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW_SECONDS`.
- **Duplicate protection:**
  - Retries reuse the same Submission ID, so they never create a second row.
  - Identical content from the same email within 10 minutes is recognised as already received.
- **Formula injection:** values are written `RAW` (never evaluated), and cells beginning with `=`, `+`, `-` or `@` are prefixed with `'` (plain phone numbers excepted).
- **Logging:** errors log only the submission ID, the form type and the reason, never names, emails or messages.

> **Multi-instance hosting:** rate limiting and duplicate detection are kept in memory per server instance. That's adequate for a single Node server. On serverless or multi-instance hosting, back `src/lib/leads/guards.ts` with a shared store such as Upstash Redis or Vercel KV, or add a CAPTCHA such as Cloudflare Turnstile if spam appears.
