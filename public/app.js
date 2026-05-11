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
  ["medical", "medical"],
  ["legal", "legal"],
  ["engineering", "engineering"],
  ["architecture", "architecture"],
  ["contractors", "contractors"]
]);

const state = {
  selectedRecord: null,
  selectedProfession: "all",
  trustRefs: null
};

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

function getTrustInput() {
  return document.body.dataset.page === "trust-check"
    ? document.querySelector("input[placeholder*='Search HakikiHub']")
    : null;
}

function trustQueryValue() {
  return getTrustInput()?.value.trim() || "Dr. Samuel Maina";
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
  showToast(`Trust Check updated for ${shortDisplayName(record)}.`);
}

function renderNoResults(query) {
  state.selectedRecord = null;
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
    showToast(error.message);
  }
}

async function submitReport() {
  const input = document.querySelector("input[placeholder*='Dr. John Doe']");
  const textarea = document.querySelector("textarea[placeholder*='fraud or quackery']");
  try {
    const result = await api("/api/reports", {
      method: "POST",
      body: JSON.stringify({
        subject: input?.value || "Anonymous subject",
        profession: "Unknown",
        description: textarea?.value || "Anonymous report submitted from HakikiHub static reset.",
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
  try {
    const result = await api("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        topic: text || "Contact request",
        message: "Contact request submitted from HakikiHub static reset.",
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

primeTrustFilters();
addHowItWorksSourceLinks();
createTrustSearchHitTargets();
createLogoHomeTarget();

document.addEventListener("click", async (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
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
  if (page === "trust-check" && filter) {
    event.preventDefault();
    updateFilterState(button, filter);
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
