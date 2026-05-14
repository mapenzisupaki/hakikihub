import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";
import { searchRecords, findRecord, verificationReport } from "../src/services/engine.js";
import { verificationReportPdf } from "../src/services/pdfReport.js";
import { generatePublicSnapshot, generateSentimentSnapshot, publicSnapshotImpact, sentimentImpact } from "../src/services/publicIntelligence.js";
import { storeContact, storeReport } from "../src/services/store.js";

const pages = [
  "index.html",
  "how-it-works.html",
  "trust-check.html",
  "report.html",
  "partners.html",
  "contact.html"
];

const forbidden = [
  "visily",
  "Made with",
  "Hakiki-Amini",
  "href=\"#\"",
  "src=\"./assets"
];

for (const file of [...pages, "public/static-reset.css", "public/app.js", "server.js", "README.md", "../agents.md"]) {
  await access(file, constants.R_OK);
}

for (const page of pages) {
  const html = await readFile(page, "utf8");
  for (const token of forbidden) {
    if (html.includes(token)) throw new Error(`${page} still contains forbidden token: ${token}`);
  }
  assert.ok(html.includes("/public/static-reset.css"), `${page} is missing responsive reset CSS.`);
  assert.ok(html.includes("/public/app.js"), `${page} is missing static interaction script.`);
  assert.ok(html.includes("/assets/"), `${page} is missing scoped asset paths.`);
}

const valid = searchRecords({ query: "Samuel" });
assert.equal(valid.status, "matched");
assert.equal(valid.results[0].id, "kmpdc-samuel-maina");
assert.equal(valid.results[0].confidenceScore, 98);
assert.ok(valid.results[0].publicSnapshot.sections.length >= 5);
assert.equal(valid.results[0].sentimentSnapshot.scoringDisabled, true);
assert.equal(valid.results[0].sentimentSnapshot.overallSentiment, "generally positive");
assert.equal(sentimentImpact(valid.results[0].sentimentSnapshot), 0);
assert.ok(valid.results[0].scoreBreakdown.length >= 6);
assert.match(valid.results[0].snapshotNote, /AI summary is informational/);

const medicalSamuel = searchRecords({ query: "Samuel", profession: "medical" });
assert.equal(medicalSamuel.status, "matched");
assert.equal(medicalSamuel.results[0].id, "kmpdc-samuel-maina");

const engineeringAmina = searchRecords({ query: "Amina", profession: "engineering" });
assert.equal(engineeringAmina.status, "matched");
assert.equal(engineeringAmina.results[0].id, "ebk-amina-mwangi");

const contractorMsingi = searchRecords({ query: "Msingi", profession: "contractors" });
assert.equal(contractorMsingi.status, "matched");
assert.equal(contractorMsingi.results[0].id, "nca-msingi-roadworks");

const legalEmpty = searchRecords({ query: "Samuel", profession: "legal" });
assert.equal(legalEmpty.status, "not_found");
assert.equal(legalEmpty.count, 0);

const missing = searchRecords({ query: "Definitely Unknown Person" });
assert.equal(missing.status, "not_found");
assert.equal(missing.count, 0);

const partial = searchRecords({ query: "doctor" });
assert.equal(partial.status, "partial");
assert.equal(partial.results[0].confidenceLabel, "Low");

const record = findRecord("kmpdc-samuel-maina");
assert.equal(record.name, "Dr. Samuel Maina, MBChB");
assert.match(verificationReport(record), /HakikiHub Trust Check Report/);
assert.match(verificationReport(record), /Kenyan Case Files|Kenya Gazette Mentions/);
assert.match(verificationReport(record), /Public sentiment snapshot/);
const pdf = verificationReportPdf(record);
assert.ok(Buffer.isBuffer(pdf));
assert.equal(pdf.subarray(0, 5).toString("utf8"), "%PDF-");
assert.match(pdf.toString("latin1"), /HakikiHub/);
assert.match(pdf.toString("latin1"), /\/Count 2/);

const emptySnapshot = generatePublicSnapshot({ id: "unknown-record" });
assert.equal(emptySnapshot.status, "empty");
assert.equal(emptySnapshot.sections[0].findings[0].title, "No public adverse records found");

const failedSnapshot = generatePublicSnapshot(record, { forceFailure: true });
assert.equal(failedSnapshot.status, "unavailable");
assert.match(failedSnapshot.sections[0].findings[0].summary, /temporarily unavailable/);

const socialOnlyImpact = publicSnapshotImpact({
  sections: [{
    title: "Social Context",
    findings: [{ impact: -50, scoringDisabled: true }]
  }]
});
assert.equal(socialOnlyImpact, 0);

const socialSentiment = generateSentimentSnapshot(record);
assert.equal(socialSentiment.scoringDisabled, true);
assert.equal(socialSentiment.riskMentionCount, 0);
assert.match(socialSentiment.note, /context only/);

const nca = searchRecords({ query: "Msingi" });
assert.equal(nca.status, "matched");
assert.equal(nca.results[0].confidenceLabel, "Low");
assert.ok(nca.results[0].scoreBreakdown.some((item) => item.label === "Public intelligence impact" && item.points < 0));
assert.ok(nca.results[0].sentimentSnapshot.riskMentionCount >= 1);
assert.ok(nca.results[0].scoreBreakdown.some((item) => item.label === "Social and review sentiment" && item.points === 0));

const reportSecret = `raw-report-${Date.now()}`;
const contactSecret = `contact-${Date.now()}@example.test`;
const report = await storeReport({
  subject: "Sensitive Test Subject",
  profession: "Doctor",
  description: reportSecret,
  incidentDate: "2026-05-08",
  location: "Nairobi",
  contactOptional: contactSecret,
  evidenceMetadata: { name: "photo.jpg", type: "image/jpeg", size: 1234 }
});
assert.equal(report.ok, true);
assert.equal(report.encrypted, true);

const contact = await storeContact({
  name: "Sensitive Name",
  contact: contactSecret,
  topic: "Integration",
  message: reportSecret,
  channel: "web"
});
assert.equal(contact.ok, true);
assert.equal(contact.encrypted, true);

const reportStore = await readFile(join(".private", "submissions", "reports.json"), "utf8");
const contactStore = await readFile(join(".private", "submissions", "contacts.json"), "utf8");
assert.equal(reportStore.includes(reportSecret), false);
assert.equal(reportStore.includes(contactSecret), false);
assert.equal(contactStore.includes(reportSecret), false);
assert.equal(contactStore.includes(contactSecret), false);
assert.match(reportStore, /AES-256-GCM/);
assert.match(contactStore, /AES-256-GCM/);

const appSource = await readFile("public/app.js", "utf8");
const buttonLabels = [
  "verify a professional",
  "contact for integration",
  "file a secure report",
  "run a trust check",
  "learn more about amini reporting",
  "explore trust check",
  "start trust check",
  "technical protocol",
  "contact partnership team",
  "view transparency report",
  "next step",
  "view emergency contacts",
  "chat with hakikihub",
  "email support@hakikihub.ke",
  "download full report (pdf)",
  "legal faq",
  "start anonymous report",
  "verify identity",
  "request manual audit",
  "timeline",
  "confidence",
  "logo-home-hit",
  "execute-search",
  "dataset.action = \"home\"",
  "toggle-profession",
  "data-profession-option"
];

for (const label of buttonLabels) {
  assert.ok(appSource.toLowerCase().includes(label), `Missing button mapping for ${label}`);
}

const cssSource = await readFile("public/static-reset.css", "utf8");
assert.match(appSource, /KMPDC/);
assert.match(appSource, /Kenya Law/);
assert.match(appSource, /LSK/);
assert.match(appSource, /EBK/);
assert.match(appSource, /NCA/);
assert.match(appSource, /Dr\. Silas Mwangi/);
assert.match(appSource, /No other direct matches found/);
assert.match(appSource, /Medical Practitioner/);
assert.match(appSource, /hakikihub-report\.pdf/);
assert.match(cssSource, /matrix-source-link/);
assert.match(cssSource, /source-cell/);
assert.match(cssSource, /position:\s*static/);
assert.match(cssSource, /trust-search-hit-layer/);
assert.match(cssSource, /trust-profession-menu/);
assert.match(cssSource, /logo-home-hit/);
assert.match(appSource, /getBoundingClientRect/);
assert.match(appSource, /static-scale-frame input/);
assert.match(appSource, /trust-query-input/);
assert.match(appSource, /matchMedia\("\(max-width: 760px\)"\)/);
assert.match(appSource, /fallbackTrustRecords/);
assert.match(appSource, /bindTrustSearchControls/);
assert.match(appSource, /bindReportControls/);
assert.match(appSource, /report-subject-input/);
assert.match(appSource, /report-category-input/);
assert.match(appSource, /submit-report/);
assert.match(appSource, /data-trust-filter="all"/);
assert.match(appSource, /data-profession-option="all"/);
for (const page of pages) {
  const html = await readFile(page, "utf8");
  assert.match(html, /\/public\/app\.js\?v=interaction-fix-4/);
  assert.match(html, /\/public\/static-reset\.css\?v=interaction-fix-4/);
}
const trustHtml = await readFile("trust-check.html", "utf8");
assert.match(trustHtml, /trust-query-input/);
assert.match(trustHtml, /data-action="execute-search"/);
const reportHtml = await readFile("report.html", "utf8");
assert.match(reportHtml, /report-subject-input/);
assert.match(reportHtml, /report-category-input/);
assert.match(reportHtml, /Credential fraud/);
assert.match(reportHtml, /Misuse of public resources/);
assert.match(reportHtml, /report-description-input/);
assert.match(reportHtml, /data-action="submit-report"/);
assert.doesNotMatch(appSource, /trust-live-panel/);
assert.doesNotMatch(appSource, /ensureTrustPanel/);
assert.doesNotMatch(appSource, /inline-result-card/);
assert.doesNotMatch(appSource, /inline-public-card/);
assert.doesNotMatch(appSource, /has-live-trust-result/);
assert.doesNotMatch(cssSource, /trust-live-panel/);
assert.doesNotMatch(cssSource, /inline-result-card/);
assert.doesNotMatch(cssSource, /inline-public-card/);
assert.doesNotMatch(cssSource, /source-link-layer/);
assert.doesNotMatch(cssSource, /has-live-trust-result/);

const readme = await readFile("README.md", "utf8");
assert.match(readme, /Dr\. Samuel Maina, MBChB/);
assert.match(readme, /Eng\. Amina Wanjiru Mwangi/);
assert.match(readme, /Msingi Roadworks Company/);
assert.match(readme, /Live scraping and production regulator crawling are not complete/);
assert.match(await readFile("server.js", "utf8"), /application\/pdf/);

console.log(`Static reset check passed for ${pages.length} pages and backend privacy flows.`);
