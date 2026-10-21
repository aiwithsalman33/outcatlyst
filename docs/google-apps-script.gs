/**
 * OunCatalyst website → Google Sheets (Apps Script alternative backend).
 *
 * Setup: see docs/google-sheets-setup.md §6.
 *  - Script property SHARED_SECRET must match APPS_SCRIPT_SHARED_SECRET on the web server.
 *  - Deploy as Web app: Execute as "Me", access "Anyone".
 *
 * Request body (JSON, sent only by the website server):
 *   { secret: string, tab: string, columns: string[], row: string[] }
 * Response: { ok: true, row: <row number> } or { ok: false, error: string }
 */
var ALLOWED_TABS = ["Consultation Leads", "College Partnerships", "General Enquiries"];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    var expected = PropertiesService.getScriptProperties().getProperty("SHARED_SECRET");
    if (!expected || body.secret !== expected) return json({ ok: false, error: "unauthorized" });
    if (ALLOWED_TABS.indexOf(body.tab) === -1) return json({ ok: false, error: "unknown tab" });
    if (!Array.isArray(body.row) || body.row.length > 30) return json({ ok: false, error: "invalid row" });

    lock.waitLock(10000);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(body.tab);
    if (!sheet) return json({ ok: false, error: "tab not found" });

    if (sheet.getLastRow() === 0 && Array.isArray(body.columns)) sheet.appendRow(body.columns);
    // Write as plain text so values are never interpreted as formulas.
    var row = body.row.map(function (v) { return String(v == null ? "" : v).slice(0, 5000); });
    var target = sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length);
    target.setNumberFormat("@").setValues([row]);
    SpreadsheetApp.flush();
    return json({ ok: true, row: target.getRow() });
  } catch (err) {
    return json({ ok: false, error: "write failed" });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
