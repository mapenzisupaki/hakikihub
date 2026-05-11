import { records } from "../data/records.js";
import { flattenSnapshot, generatePublicSnapshot, generateSentimentSnapshot, publicSnapshotImpact, sentimentImpact } from "./publicIntelligence.js";

function normalize(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function professionAliases(value) {
  const prof = normalize(value);
  if (!prof || prof === "all") return [];
  const aliases = {
    medical: ["medical", "doctor", "cardiologist", "clinician", "physician", "surgeon", "nurse"],
    legal: ["legal", "lawyer", "advocate", "attorney"],
    engineering: ["engineering", "engineer"],
    architecture: ["architecture", "architect"],
    contractors: ["contractors", "contractor", "construction"],
    contractor: ["contractor", "contractors", "construction"]
  };
  return aliases[prof] || [prof];
}

function professionMatches(recordProfession, selectedProfession) {
  const aliases = professionAliases(selectedProfession);
  if (!aliases.length) return true;
  const profession = normalize(recordProfession);
  return aliases.some((alias) => profession.includes(alias) || alias.includes(profession));
}

function confidenceLabel(score) {
  if (score >= 85) return "High";
  if (score >= 65) return "Medium";
  if (score >= 35) return "Low";
  return "Not Found";
}

function scoreBreakdown(record, snapshot) {
  const regulatorMatch = record.sources.some((source) => /matched/i.test(source.status)) ? 40 : 15;
  const licenseMatch = record.registrationNumber ? 20 : 0;
  const nameProfessionMatch = record.name && record.profession ? 13 : 5;
  const secondaryStatus = record.sources.some((source) => /gazette|court|high court/i.test(source.name) && /matched|clear/i.test(source.status)) ? 10 : 0;
  const aminiSignal = record.sources.some((source) => /amini/i.test(source.name) && /reports found/i.test(source.status)) ? -12 : 0;
  const freshness = record.lastVerified ? 9 : 0;
  const publicImpact = publicSnapshotImpact(snapshot);
  const socialReviewImpact = sentimentImpact();
  return [
    { label: "Official regulator match", points: regulatorMatch, max: 40 },
    { label: "License number match", points: licenseMatch, max: 20 },
    { label: "Name and profession match", points: nameProfessionMatch, max: 13 },
    { label: "Secondary public records", points: secondaryStatus, max: 10 },
    { label: "Amini accountability signal", points: aminiSignal, max: 0 },
    { label: "Data freshness", points: freshness, max: 9 },
    { label: "Public intelligence impact", points: publicImpact, max: 10 },
    { label: "Social and review sentiment", points: socialReviewImpact, max: 0, note: "Context only" }
  ];
}

function scoredRecord(record) {
  const publicSnapshot = generatePublicSnapshot(record);
  const sentimentSnapshot = generateSentimentSnapshot(record);
  const breakdown = scoreBreakdown(record, publicSnapshot);
  const score = Math.max(0, Math.min(100, breakdown.reduce((total, item) => total + item.points, 0)));
  return {
    score,
    label: confidenceLabel(score),
    publicSnapshot,
    sentimentSnapshot,
    scoreBreakdown: breakdown,
    snapshotNote: publicSnapshot.note
  };
}

function publicRecord(record) {
  const scored = scoredRecord(record);
  return {
    id: record.id,
    name: record.name,
    shortName: record.shortName,
    profession: record.profession,
    registrationNumber: record.registrationNumber,
    licenseStatus: record.licenseStatus,
    confidenceScore: scored.score,
    confidenceLabel: scored.label,
    lastVerified: record.lastVerified,
    avatar: record.avatar,
    profileFields: record.profileFields,
    sources: record.sources,
    publicSnapshot: scored.publicSnapshot,
    sentimentSnapshot: scored.sentimentSnapshot,
    scoreBreakdown: scored.scoreBreakdown,
    snapshotNote: scored.snapshotNote,
    aiSummary: record.aiSummary,
    guidance: record.guidance,
    disclaimer: record.disclaimer
  };
}

export function searchRecords({ query = "", profession = "all", regulator = "all" } = {}) {
  const needle = normalize(query);
  const prof = normalize(profession);
  const reg = normalize(regulator);
  const matched = records.filter((record) => {
    const haystack = normalize([
      record.name,
      record.shortName,
      record.profession,
      record.registrationNumber,
      record.licenseStatus,
      ...Object.values(record.profileFields)
    ].join(" "));
    const queryMatch = !needle || haystack.includes(needle);
    const professionMatch = professionMatches(record.profession, prof);
    const regulatorMatch = !reg || reg === "all" || record.sources.some((source) => normalize(source.name).includes(reg));
    return queryMatch && professionMatch && regulatorMatch;
  });

  if (matched.length) {
    return {
      query,
      status: "matched",
      count: matched.length,
      results: matched.map(publicRecord)
    };
  }

  const partial = needle
    ? records.filter((record) => {
        const profession = normalize(record.profession);
        const isDoctorLike = needle.includes("doctor") || needle.includes("medical") || needle.includes("clinician");
        const partialProfessionMatch = profession.includes(needle) || needle.includes(profession) || (isDoctorLike && profession.includes("cardiologist"));
        return professionMatches(record.profession, prof) && partialProfessionMatch;
      })
    : [];

  if (partial.length) {
    return {
      query,
      status: "partial",
      count: partial.length,
      results: partial.map((record) => ({
        ...publicRecord(record),
        licenseStatus: "Partial / Low Confidence",
        confidenceScore: Math.min(record.confidenceScore, 55),
        confidenceLabel: "Low",
        guidance: "Partial match only. Ask the professional for a registration number or submit a moderated request."
      }))
    };
  }

  return {
    query,
    status: "not_found",
    count: 0,
    results: []
  };
}

export function findRecord(id) {
  const record = records.find((item) => item.id === id);
  return record ? publicRecord(record) : null;
}

export function publicSnapshotForRecord(id) {
  const record = findRecord(id);
  if (!record) return null;
  return {
    recordId: id,
    publicSnapshot: record.publicSnapshot,
    scoreBreakdown: record.scoreBreakdown,
    snapshotNote: record.snapshotNote
  };
}

export function sentimentSnapshotForRecord(id) {
  const record = findRecord(id);
  if (!record) return null;
  return {
    recordId: id,
    sentimentSnapshot: record.sentimentSnapshot,
    scoreBreakdown: record.scoreBreakdown
  };
}

export function stats() {
  return {
    totalRecords: records.length,
    regulatorSources: 4,
    encryptedStorage: true,
    lastUpdated: new Date().toISOString()
  };
}

export function verificationReport(record) {
  return [
    "HakikiHub Trust Check Report",
    "",
    `Name: ${record.name}`,
    `Profession: ${record.profession}`,
    `Registration: ${record.registrationNumber}`,
    `Status: ${record.licenseStatus}`,
    `Confidence: ${record.confidenceScore}% (${record.confidenceLabel})`,
    `Last verified: ${record.lastVerified}`,
    "",
    "Reconciled sources:",
    ...record.sources.map((source) => `- ${source.name}: ${source.status} (${source.tier}, ${source.checkedAgo})`),
    "",
    "AI public records summary:",
    ...flattenSnapshot(record.publicSnapshot).map((item) => `- ${item.section} / ${item.title}: ${item.summary}${item.url ? ` (${item.url})` : ""}`),
    "",
    "Public sentiment snapshot:",
    `- Overall sentiment: ${record.sentimentSnapshot.overallSentiment}`,
    `- Mentions reviewed: ${record.sentimentSnapshot.mentionCount}`,
    `- Risk-related mentions: ${record.sentimentSnapshot.riskMentionCount}`,
    `- Scoring: ${record.sentimentSnapshot.scoringDisabled ? "context only, not scored" : "scored"}`,
    ...record.sentimentSnapshot.mentions.map((item) => `- ${item.sourceType} / ${item.title}: ${item.summary}`),
    "",
    "Score breakdown:",
    ...record.scoreBreakdown.map((item) => `- ${item.label}: ${item.points}${item.note ? ` (${item.note})` : ""}`),
    "",
    record.disclaimer
  ].join("\n");
}
