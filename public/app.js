const routes = new Map([
  ["how it works", "/how-it-works.html"],
  ["learn how it works", "/how-it-works.html"],
  ["learn technical safety", "/how-it-works.html"],
  ["learn more about our engine", "/how-it-works.html"],
  ["technical protocol", "/how-it-works.html"],
  ["trust check", "/trust-check.html"],
  ["run trust check", "/trust-check.html"],
  ["run a trust check", "/trust-check.html"],
  ["start verification", "/trust-check.html"],
  ["start trust check", "/trust-check.html"],
  ["explore trust check", "/trust-check.html"],
  ["verify a professional", "/trust-check.html"],
  ["secure report", "/report.html"],
  ["report anonymously", "/report.html"],
  ["submit report", "/report.html"],
  ["file a secure report", "/report.html"],
  ["start anonymous report", "/report.html"],
  ["learn more about amini", "/report.html"],
  ["learn more about amini reporting", "/report.html"],
  ["report concerns to amini", "/report.html"],
  ["anonymous report", "/report.html"],
  ["partners", "/partners.html"],
  ["partner with us", "/contact.html"],
  ["contact partnership team", "/contact.html"],
  ["integrate via api", "/contact.html"],
  ["contact for integration", "/contact.html"],
  ["contact", "/contact.html"],
  ["contact support", "/contact.html"],
  ["whatsapp", "/contact.html"],
  ["open whatsapp", "/contact.html"],
  ["api overview", "/contact.html"],
  ["legal faq", "/contact.html"]
]);

const professionFilters = new Map([
  ["all", "all"],
  ["medical", "medical"],
  ["legal", "legal"],
  ["engineering", "engineering"],
  ["architecture", "architecture"],
  ["contractors", "contractors"]
]);

const state = {
  selectedRecord: null,
  selectedProfession: "all",
  trustRefs: null,
  mobilePriming: false
};

const fallbackTrustRecords = [
  {
    id: "kmpdc-samuel-maina",
    name: "Dr. Samuel Maina, MBChB",
    shortName: "Dr. Samuel Maina",
    profession: "Senior Cardiologist",
    registrationNumber: "MED-55921-2024",
    licenseStatus: "Verified",
    confidenceScore: 98,
    confidenceLabel: "High",
    profileFields: {
      "Registered Since": "August 2012",
      Specialization: "Interventional Cardiology",
      "Primary Facility": "Kenyatta National Hospital"
    },
    sources: [
      { name: "KMPDC Live Database", status: "Matched" },
      { name: "Kenya Gazette Records", status: "Matched" },
      { name: "High Court Registry", status: "Clear" },
      { name: "Amini Accountability Vault", status: "No Reports" }
    ],
    aiSummary: "Dr. Maina is listed as a Senior Consultant in Good Standing. No active malpractice suits or disciplinary suspensions were found in the seeded MVP registry.",
    guidance: "You can proceed with professional engagement. Download this verification report for your records."
  },
  {
    id: "ebk-amina-mwangi",
    name: "Eng. Amina Wanjiru Mwangi",
    shortName: "Eng. Amina Wanjiru Mwangi",
    profession: "Civil Engineer",
    registrationNumber: "PE-10422",
    licenseStatus: "Verified",
    confidenceScore: 95,
    confidenceLabel: "High",
    profileFields: {
      "Registered Since": "March 2016",
      Specialization: "Civil Engineering",
      "Primary Facility": "Independent Consultant"
    },
    sources: [
      { name: "EBK Live Register", status: "Matched" },
      { name: "Kenya Gazette Records", status: "Matched" },
      { name: "High Court Registry", status: "Clear" },
      { name: "Amini Accountability Vault", status: "No Reports" }
    ],
    aiSummary: "EBK-style seeded records show an active professional engineer profile with no adverse regulator signal.",
    guidance: "Trust verified. Keep the source summary with your procurement or engagement file."
  },
  {
    id: "nca-msingi-roadworks",
    name: "Msingi Roadworks Company",
    shortName: "Msingi Roadworks Company",
    profession: "Contractor",
    registrationNumber: "NCA-771204",
    licenseStatus: "Under Review",
    confidenceScore: 64,
    confidenceLabel: "Low",
    profileFields: {
      "Registered Since": "June 2019",
      Specialization: "Roads and Civil Works",
      "Primary Facility": "Kisumu"
    },
    sources: [
      { name: "NCA Contractor Register", status: "Partial" },
      { name: "Kenya Gazette Records", status: "Matched" },
      { name: "High Court Registry", status: "Clear" },
      { name: "Amini Accountability Vault", status: "Reports Found" }
    ],
    aiSummary: "The contractor appears in the seeded register, but current license renewal evidence is incomplete.",
    guidance: "Request current licence evidence before engagement. Use Amini if the contractor is actively presenting an expired licence."
  }
];

function buttonText(target) {
  return (target.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function showToast(message) {
  let toast = document.querySelector(".static-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "static-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function routeForText(text) {
  if (routes.has(text)) return routes.get(text);
  if (text.includes("trust check") || text.includes("verification")) return "/trust-check.html";
  if (text.includes("report") || text.includes("ghost file") || text.includes("amini")) return "/report.html";
  if (text.includes("partner") || text.includes("api")) return "/contact.html";
  if (text.includes("contact") || text.includes("email")) return "/contact.html";
  if (text.includes("how")) return "/how-it-works.html";
  return "";
}

function isPlaceholderAction(text) {
  if (text.startsWith("view emergency contacts")) return true;
  return [
    "chat with hakikihub",
    "email support@hakikihub.ke",
    "download full report (pdf)",
    "view transparency report",
    "view emergency contacts",
    "next step"
  ].includes(text);
}

function placeholderMessage(text) {
  if (text.startsWith("view emergency contacts")) {
    return "Emergency contacts placeholder active. For immediate danger, contact local authorities directly.";
  }
  const messages = {
    "chat with hakikihub": "WhatsApp support placeholder active. The secure contact form remains available on this page.",
    "email support@hakikihub.ke": "Email channel noted. Production mail handoff is not connected in this local build.",
    "download full report (pdf)": "PDF export is active. Trust Check downloads a styled verification report.",
    "view transparency report": "Transparency report placeholder active. The current source and privacy model is documented in the README.",
    "view emergency contacts": "Emergency contacts placeholder active. For immediate danger, contact local authorities directly.",
    "next step": "Step advanced. This static prototype keeps the report flow on one secure page."
  };
  return messages[text] || "This placeholder is active and will be connected in the production integration pass.";
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "Request failed");
  }
  const type = response.headers.get("Content-Type") || "";
  return type.includes("application/json") ? response.json() : response.text();
}

function pageCanvas() {
  return document.querySelector('[data-type="PAGE"]') || document.body;
}

function isMobileLayout() {
  return window.matchMedia("(max-width: 760px)").matches;
}

function getTrustInput() {
  if (document.body.dataset.page !== "trust-check") return null;
  if (isMobileLayout()) return document.querySelector(".mobile-trust-input");
  const desktopInput = document.querySelector(".static-scale-frame .trust-query-input")
    || document.querySelector(".static-scale-frame input[placeholder*='Search HakikiHub']");
  if (desktopInput) return desktopInput;
  const candidates = Array.from(document.querySelectorAll("input[placeholder*='Search HakikiHub'], .mobile-trust-input"));
  return candidates.find((input) => {
    const rect = input.getBoundingClientRect();
    const style = window.getComputedStyle(input);
    return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
  }) || candidates[0] || null;
}

function trustQueryValue() {
  return getTrustInput()?.value.trim() || "Dr. Samuel Maina";
}

function normalizedText(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function professionMatchesFallback(record, selectedProfession) {
  const selected = normalizedText(selectedProfession);
  if (!selected || selected === "all") return true;
  const profession = normalizedText(record.profession);
  const aliases = {
    medical: ["medical", "doctor", "cardiologist", "clinician", "physician"],
    engineering: ["engineering", "engineer"],
    contractors: ["contractors", "contractor", "construction"],
    legal: ["legal", "lawyer", "advocate"],
    architecture: ["architecture", "architect"]
  };
  return (aliases[selected] || [selected]).some((alias) => profession.includes(alias));
}

function fallbackSearchRecords(query) {
  const needle = normalizedText(query);
  const results = fallbackTrustRecords.filter((record) => {
    const haystack = normalizedText([
      record.name,
      record.shortName,
      record.profession,
      record.registrationNumber,
      record.licenseStatus,
      ...Object.values(record.profileFields || {})
    ].join(" "));
    return (!needle || haystack.includes(needle)) && professionMatchesFallback(record, state.selectedProfession);
  });
  return { status: results.length ? "matched" : "not_found", count: results.length, results };
}

function allTextElements() {
  return Array.from(document.querySelectorAll('[data-type="TEXT"], [data-type="TEXT"] span, span, p, h1, h2, h3, h4, div'));
}

function findText(exactText) {
  return allTextElements().find((element) => element.childElementCount === 0 && element.textContent.trim() === exactText);
}

function findTextStarts(prefix) {
  return allTextElements().find((element) => element.childElementCount === 0 && element.textContent.trim().startsWith(prefix));
}

function setText(element, value) {
  if (element) element.textContent = value;
}

function captureTrustRefs() {
  if (state.trustRefs || document.body.dataset.page !== "trust-check") return state.trustRefs;
  state.trustRefs = {
    foundCount: findText("(1 Found)"),
    sortLabel: findText("Confidence"),
    name: findText("Dr. Silas Mwangi"),
    profession: findText("Cardiologist / General Surgeon"),
    status: findText("Verified"),
    licenseNumber: findText("KMPDC-MED-99421"),
    registeredSince: findText("March 12, 2018"),
    primaryPractice: findText("Nairobi City County"),
    aiSummary: findTextStarts("Matched across 4 regulatory databases"),
    sourceCount: findTextStarts("Reconciled via"),
    confidenceScore: findText("98.4%"),
    confidenceLabel: findText("Critical Match"),
    sourceOne: findText("KMPDC Portal"),
    sourceTwo: findText("Kenya Gazette"),
    sourceThree: findText("Internal Blacklist"),
    noResultTitle: findText("No other direct matches found"),
    noResultBody: findTextStarts("The HakikiHub engine has searched all active regulatory databases"),
    recentOne: findText("Dr. Amara O."),
    recentTwo: findText("Eng. Kimani J."),
    recentThree: findText("Adv. Sarah M.")
  };
  return state.trustRefs;
}

function updateFilterState(button, filter) {
  state.selectedProfession = filter || "all";
  document.querySelectorAll("[data-trust-filter]").forEach((item) => {
    item.classList.toggle("is-active-filter", item === button);
  });
}

function statusText(record) {
  if (!record) return "No Match";
  if (record.licenseStatus === "Verified") return "Verified";
  if (record.licenseStatus === "Under Review") return "Under Review";
  return record.licenseStatus || "Review";
}

function confidenceLabel(record) {
  if (!record) return "No Match";
  if (record.confidenceScore >= 85) return "Critical Match";
  if (record.confidenceScore >= 65) return "Needs Review";
  return "Low Confidence";
}

function profileField(record, key, fallback = "N/A") {
  return record?.profileFields?.[key] || fallback;
}

function aiSummary(record) {
  const publicSummary = (record.publicSnapshot?.sections || [])
    .flatMap((section) => section.findings || [])
    .find((finding) => finding.summary)?.summary;
  return publicSummary || record.aiSummary || "No public adverse records found in this local MVP dataset.";
}

function sourceName(record, index, fallback) {
  return record?.sources?.[index]?.name || fallback;
}

function shortDisplayName(record) {
  return record?.shortName || record?.name || "No trusted match";
}

function renderTrustResult(record) {
  state.selectedRecord = record;
  renderMobileTrustResult(record);
  const refs = captureTrustRefs();
  setText(refs.foundCount, "(1 Found)");
  setText(refs.sortLabel, "Confidence");
  setText(refs.name, shortDisplayName(record));
  setText(refs.profession, record.profession || "Professional");
  setText(refs.status, statusText(record));
  setText(refs.licenseNumber, record.registrationNumber || "N/A");
  setText(refs.registeredSince, profileField(record, "Registered Since"));
  setText(refs.primaryPractice, profileField(record, "Primary Facility"));
  setText(refs.aiSummary, aiSummary(record));
  setText(refs.sourceCount, `Reconciled via ${record.sources?.length || 0} secure sources`);
  setText(refs.confidenceScore, `${record.confidenceScore}%`);
  setText(refs.confidenceLabel, confidenceLabel(record));
  setText(refs.sourceOne, sourceName(record, 0, "Primary regulator"));
  setText(refs.sourceTwo, sourceName(record, 1, "Kenya Gazette"));
  setText(refs.sourceThree, sourceName(record, 2, "Public records"));
  setText(refs.noResultTitle, record.licenseStatus === "Verified" ? "Trust verified" : "Trust requires review");
  setText(refs.noResultBody, record.guidance || "Review the source summary before engagement.");
  setText(refs.recentOne, shortDisplayName(record));
  setText(refs.recentTwo, record.id === "ebk-amina-mwangi" ? "Dr. Samuel M." : "Eng. Amina M.");
  setText(refs.recentThree, record.id === "nca-msingi-roadworks" ? "Dr. Samuel M." : "Msingi Roadworks");
  if (!state.mobilePriming) showToast(`Trust Check updated for ${shortDisplayName(record)}.`);
}

function renderNoResults(query) {
  state.selectedRecord = null;
  renderMobileNoResults(query);
  const refs = captureTrustRefs();
  const filter = state.selectedProfession !== "all" ? ` in ${state.selectedProfession}` : "";
  setText(refs.foundCount, "(0 Found)");
  setText(refs.name, "No trusted match");
  setText(refs.profession, "No reconciled professional record");
  setText(refs.status, "No Match");
  setText(refs.licenseNumber, "N/A");
  setText(refs.registeredSince, "N/A");
  setText(refs.primaryPractice, "Manual review");
  setText(refs.aiSummary, `No seeded regulator-style record matched "${query || "your search"}"${filter}. Submit a manual audit request if this professional should be checked by a moderator.`);
  setText(refs.sourceCount, "Reconciled via 0 secure sources");
  setText(refs.confidenceScore, "0%");
  setText(refs.confidenceLabel, "No Match");
  setText(refs.sourceOne, "Regulator sources");
  setText(refs.sourceTwo, "Kenya Gazette");
  setText(refs.sourceThree, "Amini Vault");
  setText(refs.noResultTitle, "No trusted match found");
  setText(refs.noResultBody, `No active HakikiHub MVP record matched "${query || "your search"}"${filter}. Request a manual audit or submit concerns through Amini.`);
  showToast("No trusted match found. Manual audit is available.");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function mobileMetricCard(title, body) {
  return `<article class="mobile-card"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></article>`;
}

function mobileSourceItems(record) {
  const sources = record?.sources?.length ? record.sources : [];
  if (!sources.length) return `<li><span>No matched source</span><strong>Review</strong></li>`;
  return sources.slice(0, 4).map((source) => (
    `<li><span>${escapeHtml(source.name)}</span><strong>${escapeHtml(source.status || source.match || "Checked")}</strong></li>`
  )).join("");
}

function renderMobileTrustResult(record) {
  const target = document.querySelector(".mobile-result");
  if (!target || !record) return;
  const fields = record.profileFields || {};
  target.innerHTML = `
    <article class="mobile-card mobile-profile">
      <div>
        <h3>${escapeHtml(record.name)}</h3>
        <p>${escapeHtml(record.profession)} • license ${escapeHtml(record.registrationNumber)}</p>
      </div>
      <div class="mobile-score">${escapeHtml(record.confidenceScore)}%</div>
      <p><strong>Integrity Score: ${escapeHtml(record.confidenceLabel)}</strong><br>${escapeHtml(record.guidance || "Review the source summary before engagement.")}</p>
      <div class="mobile-grid">
        ${mobileMetricCard("Registered since", fields["Registered Since"] || "N/A")}
        ${mobileMetricCard("Specialization", fields.Specialization || "N/A")}
        ${mobileMetricCard("Primary facility", fields["Primary Facility"] || "N/A")}
      </div>
    </article>
    <article class="mobile-card">
      <h3>AI Background Check</h3>
      <p>${escapeHtml(aiSummary(record))}</p>
      <ul class="mobile-source-list">${mobileSourceItems(record)}</ul>
    </article>
    <div class="mobile-actions">
      <button class="mobile-button primary" type="button" data-action="download-report">Download Report</button>
      <button class="mobile-button danger" type="button" data-action="disagree">Disagree? Report</button>
    </div>
  `;
}

function renderMobileNoResults(query) {
  const target = document.querySelector(".mobile-result");
  if (!target) return;
  const filter = state.selectedProfession !== "all" ? ` in ${state.selectedProfession}` : "";
  target.innerHTML = `
    <article class="mobile-card">
      <h3>No trusted match found</h3>
      <p>No active HakikiHub MVP record matched "${escapeHtml(query || "your search")}"${escapeHtml(filter)}. Request a manual audit or submit concerns through Amini.</p>
    </article>
    <div class="mobile-actions">
      <button class="mobile-button primary" type="button" data-action="manual-audit">Request Manual Audit</button>
      <button class="mobile-button danger" type="button" data-action="report">Report Anonymously</button>
    </div>
  `;
}

function mobileHeader() {
  return `
    <header class="mobile-header">
      <button class="mobile-brand" type="button" data-action="home" aria-label="Go to homepage">
        <span class="mobile-brand-mark">⌑</span><span>HakikiHub</span>
      </button>
      <button class="mobile-menu-toggle" type="button" data-action="mobile-menu" aria-label="Open menu">☰</button>
    </header>
    <nav class="mobile-nav" aria-label="Mobile navigation">
      <a href="/how-it-works.html">How It Works</a>
      <a href="/trust-check.html">Trust Check</a>
      <a href="/report.html">Report</a>
      <a href="/partners.html">Partners</a>
      <a href="/contact.html">Contact</a>
    </nav>
  `;
}

function mobileFooter() {
  return `<footer class="mobile-footer">© 2026 HakikiHub. End-to-end encrypted reporting and source-backed verification.</footer>`;
}

function createHomeMobile() {
  return `
    <main class="mobile-content">
      <section class="mobile-hero">
        <span class="mobile-kicker">🇰🇪 Kenya's Leading Integrity Platform</span>
        <h1 class="mobile-title">Eradicate Fraud.<br>Restore <span>Trust.</span></h1>
        <p class="mobile-lede">HakikiHub helps citizens, employers, hospitals, schools, banks, and regulators verify professionals and report concerns safely.</p>
        <div class="mobile-actions">
          <a class="mobile-button primary" href="/trust-check.html">Run Trust Check</a>
          <a class="mobile-button danger" href="/report.html">Report Anonymously</a>
        </div>
      </section>
      <section class="mobile-section">
        <h2>The Stakes are Real</h2>
        <div class="mobile-grid">
          ${mobileMetricCard("Life & Death Stakes", "Professional quackery can put patients, clients, and public safety at risk.")}
          ${mobileMetricCard("Fragmented Data", "Regulator portals, gazette notices, and case records are difficult for the public to reconcile.")}
          ${mobileMetricCard("Silent Witnesses", "Amini gives citizens a safer channel to submit concerns without exposing identity.")}
        </div>
      </section>
      <section class="mobile-section">
        <h2>Dual-engine approach</h2>
        ${mobileMetricCard("Hakiki Verification", "Search seeded regulator-style records and see confidence, source tiers, and reconciliation logic.")}
        ${mobileMetricCard("Amini Reporting", "Submit secure reports with encrypted local persistence and metadata-safe evidence handling.")}
      </section>
    </main>
  `;
}

function createTrustMobile() {
  return `
    <main class="mobile-content">
      <section class="mobile-hero">
        <span class="mobile-kicker">HakikiHub Search Engine</span>
        <h1 class="mobile-title">Professional <span>Trust Check</span></h1>
        <p class="mobile-lede">Verify doctors, engineers, lawyers, and contractors through the local MVP reconciliation engine.</p>
        <div class="mobile-search">
          <input class="mobile-input mobile-trust-input" placeholder="Search name or license e.g. Samuel, PE-10422" value="Samuel" />
          <button class="mobile-button primary" type="button" data-action="execute-search">Verify Identity</button>
        </div>
        <div class="mobile-filter-row">
          <button class="mobile-chip is-active-filter" type="button" data-trust-filter="all">All</button>
          <button class="mobile-chip" type="button" data-trust-filter="medical">Medical</button>
          <button class="mobile-chip" type="button" data-trust-filter="engineering">Engineering</button>
          <button class="mobile-chip" type="button" data-trust-filter="contractors">Contractors</button>
          <button class="mobile-chip" type="button" data-trust-filter="legal">Legal</button>
        </div>
      </section>
      <section class="mobile-section">
        <h2>Search Results</h2>
        <div class="mobile-result"></div>
      </section>
    </main>
  `;
}

function createHowMobile() {
  return `
    <main class="mobile-content">
      <section class="mobile-hero">
        <span class="mobile-kicker">System Documentation v2.4</span>
        <h1 class="mobile-title">Inside the <span>Integrity Engine.</span></h1>
        <p class="mobile-lede">Three layers of verification and safety remove doubt while protecting whistleblowers.</p>
      </section>
      <section class="mobile-section">
        <h2>Three-tier model</h2>
        ${mobileMetricCard("Tier 1: Live Synchronization", "Regulator-style records are normalized from KMPDC, EBK, NCA, LSK, and Gazette-style sources.")}
        ${mobileMetricCard("Tier 2: Deep Intelligence", "Public legal notices, case-style records, and web context are summarized as informational signals.")}
        ${mobileMetricCard("Tier 3: Secure Reporting", "Amini accepts anonymous reports and protects evidence metadata in the MVP flow.")}
      </section>
      <section class="mobile-section">
        <h2>Source links</h2>
        <div class="mobile-actions">
          <a class="mobile-button" href="https://kmpdc.go.ke/Registers.html" target="_blank" rel="noreferrer">KMPDC Source</a>
          <a class="mobile-button" href="https://new.kenyalaw.org/judgments/" target="_blank" rel="noreferrer">Kenya Law Source</a>
          <a class="mobile-button" href="https://www.ebk.go.ke/register/" target="_blank" rel="noreferrer">EBK Source</a>
        </div>
      </section>
    </main>
  `;
}

function createReportMobile() {
  return `
    <main class="mobile-content">
      <section class="mobile-hero">
        <span class="mobile-kicker">Secure Portal</span>
        <h1 class="mobile-title">Report safely. <span>Stay anonymous.</span></h1>
        <p class="mobile-lede">Amini protects your identity and stores local MVP submissions as encrypted envelopes.</p>
      </section>
      <form class="mobile-section">
        <h2>Submission details</h2>
        <input class="mobile-input mobile-report-subject" placeholder="Subject or professional involved" />
        <select class="mobile-select mobile-report-profession">
          <option>Medical</option><option>Engineering</option><option>Legal</option><option>Contractor</option><option>Other</option>
        </select>
        <textarea class="mobile-textarea mobile-report-description" placeholder="Describe what happened, when, and who was involved"></textarea>
        <button class="mobile-button primary" type="submit">Submit Secure Report</button>
      </form>
      <section class="mobile-section">
        <h2>Safety tips</h2>
        ${mobileMetricCard("Metadata Ghost", "Evidence metadata is treated as sensitive. Evidence bytes are not stored in this prototype.")}
        ${mobileMetricCard("Emergency", "If there is immediate danger, contact local authorities directly.")}
      </section>
    </main>
  `;
}

function createPartnersMobile() {
  return `
    <main class="mobile-content">
      <section class="mobile-hero">
        <span class="mobile-kicker">Institutional purpose</span>
        <h1 class="mobile-title">Restoring integrity to Kenya's <span>professional fabric.</span></h1>
        <p class="mobile-lede">HakikiHub bridges fragmented registers, public intelligence, and safer reporting into one civic trust layer.</p>
        <div class="mobile-actions">
          <a class="mobile-button primary" href="/trust-check.html">Explore Trust Check</a>
          <a class="mobile-button" href="/contact.html">Partner with Us</a>
        </div>
      </section>
      <section class="mobile-section">
        <h2>Validated data partners</h2>
        <div class="mobile-grid">
          ${mobileMetricCard("KMPDC", "Medical regulator-style source for seeded MVP checks.")}
          ${mobileMetricCard("EBK", "Engineering register-style source for seeded MVP checks.")}
          ${mobileMetricCard("NCA", "Contractor register-style source for seeded MVP checks.")}
          ${mobileMetricCard("Kenya Gazette", "Historical public notice context for public intelligence summaries.")}
        </div>
      </section>
    </main>
  `;
}

function createContactMobile() {
  return `
    <main class="mobile-content">
      <section class="mobile-hero">
        <span class="mobile-kicker">Connectivity & Trust</span>
        <h1 class="mobile-title">Get in touch with the <span>Integrity Engine.</span></h1>
        <p class="mobile-lede">Use secure channels for support, whistleblower guidance, regulator integrations, and API conversations.</p>
      </section>
      <form class="mobile-section">
        <h2>Contact HakikiHub</h2>
        <input class="mobile-input mobile-contact-topic" placeholder="Topic e.g. API integration" />
        <textarea class="mobile-textarea mobile-contact-message" placeholder="How can we help?"></textarea>
        <button class="mobile-button primary" type="submit">Send Secure Message</button>
      </form>
      <section class="mobile-section">
        <h2>Integration routes</h2>
        ${mobileMetricCard("Regulator API", "Partner APIs and sync schedules are planned for production integrations.")}
        ${mobileMetricCard("Privacy-first reporting", "Reports are encrypted locally in the MVP and should move to hardened storage for launch.")}
      </section>
    </main>
  `;
}

function mobilePageMarkup(page) {
  const pages = {
    home: createHomeMobile,
    "trust-check": createTrustMobile,
    "how-it-works": createHowMobile,
    report: createReportMobile,
    partners: createPartnersMobile,
    contact: createContactMobile
  };
  const create = pages[page] || createHomeMobile;
  return `<div class="mobile-page">${mobileHeader()}${create()}${mobileFooter()}</div>`;
}

function createMobilePage() {
  if (document.querySelector(".mobile-page")) return;
  document.body.insertAdjacentHTML("afterbegin", mobilePageMarkup(document.body.dataset.page || "home"));
  if (document.body.dataset.page === "trust-check") {
    state.mobilePriming = true;
    window.setTimeout(async () => {
      await runTrustSearch();
      state.mobilePriming = false;
    }, 0);
  }
}

async function runTrustSearch() {
  const query = trustQueryValue();
  try {
    const params = new URLSearchParams({
      q: query,
      profession: state.selectedProfession || "all"
    });
    const payload = await api(`/api/search?${params.toString()}`);
    if (!payload.results.length) renderNoResults(query);
    else renderTrustResult(payload.results[0]);
  } catch (error) {
    const fallback = fallbackSearchRecords(query);
    if (fallback.results.length) {
      renderTrustResult(fallback.results[0]);
      showToast("Search used local seeded records while the API is unavailable.");
    } else {
      renderNoResults(query);
      showToast("Search API unavailable. Local seeded records checked.");
    }
  }
}

async function submitReport() {
  const input = document.querySelector(".mobile-report-subject")
    || document.querySelector(".static-scale-frame .report-subject-input")
    || document.querySelector("input[placeholder*='Dr. John Doe']");
  const category = document.querySelector(".mobile-report-profession")
    || document.querySelector(".static-scale-frame .report-category-input");
  const textarea = document.querySelector(".mobile-report-description")
    || document.querySelector(".static-scale-frame .report-description-input")
    || document.querySelector("textarea[placeholder*='fraud or quackery']");
  const subject = input?.value.trim() || "Anonymous subject";
  const description = textarea?.value.trim() || "Anonymous report submitted from HakikiHub static reset.";
  try {
    const result = await api("/api/reports", {
      method: "POST",
      body: JSON.stringify({
        subject,
        profession: category?.value || "Other",
        description,
        incidentDate: "",
        location: "",
        contactOptional: "",
        evidenceMetadata: {}
      })
    });
    showConfirmation(result.referenceId, result.message);
  } catch (error) {
    showToast(error.message);
  }
}

async function submitContact(text) {
  const topic = document.querySelector(".mobile-contact-topic");
  const message = document.querySelector(".mobile-contact-message");
  try {
    const result = await api("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        topic: topic?.value || text || "Contact request",
        message: message?.value || "Contact request submitted from HakikiHub static reset.",
        channel: "web"
      })
    });
    showConfirmation(result.referenceId, result.message);
  } catch (error) {
    showToast(error.message);
  }
}

function showConfirmation(referenceId, message) {
  let panel = document.querySelector(".static-confirmation");
  if (!panel) {
    panel = document.createElement("div");
    panel.className = "static-confirmation";
    document.body.append(panel);
  }
  panel.innerHTML = `
    <strong>Encrypted reference: ${referenceId || "created"}</strong>
    <p>${message || "Your identity remains protected."}</p>
  `;
  panel.classList.add("is-visible");
  showToast("Encrypted confirmation created.");
}

async function downloadReport() {
  const recordId = state.selectedRecord?.id || "kmpdc-samuel-maina";
  const response = await fetch("/api/download-report", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ id: recordId })
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Report download failed" }));
    throw new Error(error.error || "Report download failed");
  }
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${recordId}-hakikihub-report.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}

function showTimeline() {
  showToast("Timeline: Tier 1 sync checks run first, then Gazette/case-file context, then Amini accountability signals.");
}

async function showConfidence() {
  if (!state.selectedRecord) await runTrustSearch();
  captureTrustRefs()?.confidenceScore?.scrollIntoView({ behavior: "smooth", block: "center" });
  showToast("Confidence weighs regulator match, license match, public records, data freshness, and context-only sentiment.");
}

function primeTrustFilters() {
  document.querySelectorAll("button").forEach((button) => {
    const filter = professionFilters.get(buttonText(button));
    if (filter) button.dataset.trustFilter = filter;
  });
}

function addHowItWorksSourceLinks() {
  if (document.body.dataset.page !== "how-it-works") return;
  const sources = [
    { row: "Medical Practitioner", label: "KMPDC Source", url: "https://kmpdc.go.ke/Registers.html" },
    { row: "Historical Archives", label: "Kenya Law Source", url: "https://new.kenyalaw.org/judgments/" },
    { row: "Advocacy Records", label: "LSK Source", url: "https://lsk.or.ke/" },
    { row: "Engineering Licenses", label: "EBK Source", url: "https://www.ebk.go.ke/register/" },
    { row: "Contractor Accreditation", label: "NCA Source", url: "https://www.nca.go.ke/registered-contractors" }
  ];
  sources.forEach((source) => {
    const label = findText(source.row);
    const row = label?.closest("tr");
    const cell = row?.querySelector("td:first-child > div");
    if (!cell || cell.querySelector(".matrix-source-link")) return;
    cell.classList.add("source-cell");
    const link = document.createElement("a");
    link.className = "matrix-source-link";
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = source.label;
    cell.append(link);
  });
}

function ensureProfessionMenu() {
  let menu = document.querySelector(".trust-profession-menu");
  if (menu) return menu;
  menu = document.createElement("div");
  menu.className = "trust-profession-menu";
  menu.innerHTML = `
    <button type="button" data-profession-option="all">All Professions</button>
    <button type="button" data-profession-option="medical">Medical</button>
    <button type="button" data-profession-option="legal">Legal</button>
    <button type="button" data-profession-option="engineering">Engineering</button>
    <button type="button" data-profession-option="architecture">Architecture</button>
    <button type="button" data-profession-option="contractors">Contractors</button>
  `;
  pageCanvas().append(menu);
  return menu;
}

function toggleProfessionMenu(forceOpen = null) {
  const menu = ensureProfessionMenu();
  const shouldOpen = forceOpen === null ? !menu.classList.contains("is-visible") : forceOpen;
  menu.classList.toggle("is-visible", shouldOpen);
}

function createTrustSearchHitTargets() {
  if (document.body.dataset.page !== "trust-check" || document.querySelector(".trust-search-hit-layer")) return;
  const layer = document.createElement("div");
  layer.className = "trust-search-hit-layer";
  layer.innerHTML = `
    <button type="button" class="trust-hit trust-profession-hit" data-action="toggle-profession" aria-label="Choose profession filter"></button>
    <button type="button" class="trust-hit trust-verify-hit" data-action="execute-search" aria-label="Verify identity"></button>
  `;
  pageCanvas().append(layer);
  ensureProfessionMenu();
}

function createLogoHomeTarget() {
  if (document.querySelector(".logo-home-hit")) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "logo-home-hit";
  button.dataset.action = "home";
  button.setAttribute("aria-label", "Go to HakikiHub homepage");
  pageCanvas().append(button);
}

function bindTrustSearchControls() {
  if (document.body.dataset.page !== "trust-check") return;
  const input = document.querySelector(".static-scale-frame .trust-query-input");
  const verifyButton = document.querySelector(".static-scale-frame [data-action='execute-search']");
  const professionButton = document.querySelector(".static-scale-frame [data-type='CONTAINER'].w-\\[164px\\]");
  if (verifyButton && !verifyButton.dataset.boundSearch) {
    verifyButton.dataset.boundSearch = "true";
    verifyButton.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleProfessionMenu(false);
      await runTrustSearch();
    });
  }
  if (input && !input.dataset.boundSearch) {
    input.dataset.boundSearch = "true";
    input.addEventListener("keydown", async (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      await runTrustSearch();
    });
  }
  if (professionButton && !professionButton.dataset.boundSearch) {
    professionButton.dataset.boundSearch = "true";
    professionButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleProfessionMenu();
    });
  }
}

function bindReportControls() {
  if (document.body.dataset.page !== "report") return;
  const submitButton = document.querySelector(".static-scale-frame [data-action='submit-report']");
  const description = document.querySelector(".static-scale-frame .report-description-input");
  if (submitButton && !submitButton.dataset.boundReport) {
    submitButton.dataset.boundReport = "true";
    submitButton.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      await submitReport();
    });
  }
  if (description && !description.dataset.boundReport) {
    description.dataset.boundReport = "true";
    description.addEventListener("keydown", async (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        await submitReport();
      }
    });
  }
}

createMobilePage();
primeTrustFilters();
addHowItWorksSourceLinks();
createTrustSearchHitTargets();
createLogoHomeTarget();
bindTrustSearchControls();
bindReportControls();

document.addEventListener("click", async (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "mobile-menu") {
    event.preventDefault();
    event.target.closest(".mobile-page")?.classList.toggle("menu-open");
    return;
  }
  if (action === "home") {
    event.preventDefault();
    window.location.href = "/";
    return;
  }
  if (action === "execute-search") {
    event.preventDefault();
    toggleProfessionMenu(false);
    return runTrustSearch();
  }
  if (action === "toggle-profession") {
    event.preventDefault();
    return toggleProfessionMenu();
  }
  if (action === "download-report") return downloadReport();
  if (action === "submit-report") return submitReport();
  if (action === "timeline") return showTimeline();
  if (action === "manual-audit") return window.location.href = "/report.html?type=manual-audit";
  if (action === "disagree" || action === "report") return window.location.href = "/report.html";
  if (action === "contact") return window.location.href = "/contact.html";

  const button = event.target.closest("button, [role='button']");
  if (!button) return;

  const text = buttonText(button);
  const page = document.body.dataset.page;
  const professionOption = button.dataset.professionOption;
  if (page === "trust-check" && professionOption) {
    event.preventDefault();
    state.selectedProfession = professionOption;
    toggleProfessionMenu(false);
    showToast(`Profession filter: ${button.textContent.trim()}`);
    await runTrustSearch();
    return;
  }

  const filter = professionFilters.get(text);
  const dataFilter = button.dataset.trustFilter;
  if (page === "trust-check" && (filter || dataFilter)) {
    event.preventDefault();
    updateFilterState(button, filter || dataFilter);
    await runTrustSearch();
    return;
  }

  if (page === "trust-check" && (text.includes("execute") || text.includes("verify identity") || text.includes("trust check"))) {
    event.preventDefault();
    await runTrustSearch();
    return;
  }

  if (page === "trust-check" && text === "confidence") {
    event.preventDefault();
    await showConfidence();
    return;
  }

  if (page === "trust-check" && text === "download") {
    event.preventDefault();
    await downloadReport();
    return;
  }

  if (page === "trust-check" && text === "timeline") {
    event.preventDefault();
    showTimeline();
    return;
  }

  if (page === "trust-check" && text === "request manual audit") {
    event.preventDefault();
    window.location.href = "/report.html?type=manual-audit";
    return;
  }

  if (page === "report" && text.includes("submit")) {
    event.preventDefault();
    await submitReport();
    return;
  }

  if (page === "contact" && (text.includes("send") || text.includes("request") || text.includes("sandbox") || text.includes("whatsapp") || text.includes("support"))) {
    event.preventDefault();
    await submitContact(text);
    return;
  }

  if (isPlaceholderAction(text)) {
    event.preventDefault();
    showToast(placeholderMessage(text));
    if (text === "download full report (pdf)") await downloadReport();
    return;
  }

  if (!text && button.querySelector("img")) {
    event.preventDefault();
    showToast("Social channel placeholder active. Use Contact for the current support route.");
    return;
  }

  if (text.includes("upload") || text.includes("attach")) {
    event.preventDefault();
    showToast("Upload placeholder active. Evidence bytes are not stored in this prototype.");
    return;
  }

  const route = routeForText(text);
  if (route) {
    event.preventDefault();
    window.location.href = route;
  }
});

document.addEventListener("keydown", async (event) => {
  if (event.key === "Enter" && document.body.dataset.page === "trust-check" && event.target === getTrustInput()) {
    event.preventDefault();
    await runTrustSearch();
  }
});

document.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (document.body.dataset.page === "report") await submitReport();
  else if (document.body.dataset.page === "contact") await submitContact("contact form");
});
