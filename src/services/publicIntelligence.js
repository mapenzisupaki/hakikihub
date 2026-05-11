const SNAPSHOT_NOTE = "AI summary is informational. Cross-reference Tier 1 live sync data shown in the Reconciliation panel.";
const SENTIMENT_NOTE = "Social and review sentiment is context only. It does not affect the Trust Check score unless corroborated by official regulator, court, or Gazette records.";

const publicFindings = {
  "kmpdc-samuel-maina": [
    {
      section: "Professional Standing",
      sourceType: "Regulator-derived standing",
      title: "Professional Standing",
      summary: "Dr. Maina is listed as a Senior Consultant in Good Standing. No active malpractice suits or disciplinary suspensions were found in the 2023-2024 prototype registry.",
      url: "https://osp.nckenya.go.ke/LicenseStatus",
      date: "2026-05-08",
      confidence: "high",
      impact: 4,
      official: true
    },
    {
      section: "Kenya Gazette Mentions",
      sourceType: "Gazette-style notice",
      title: "Kenya Gazette Mentions",
      summary: "Identified in Gazette Notice No. 4521 (Jan 2022) regarding medical board certification renewal. No adverse mentions found in professional misconduct notices in the seeded review period.",
      url: "https://new.kenyalaw.org/",
      date: "2022-01-14",
      confidence: "medium",
      impact: 2,
      official: true
    },
    {
      section: "Kenyan Case Files",
      sourceType: "Kenya Law case-law search",
      title: "No adverse case-law match",
      summary: "No strong Kenya Law case-law match was found for the exact name and license context in this local MVP dataset.",
      url: "https://new.kenyalaw.org/judgments/",
      date: "2026-05-08",
      confidence: "medium",
      impact: 0,
      official: true
    },
    {
      section: "Public Web Mentions",
      sourceType: "Public web context",
      title: "Hospital affiliation context",
      summary: "Public web context is consistent with a senior cardiology profile, but this signal is informational and does not overrule regulator data.",
      url: "",
      date: "2026-05-08",
      confidence: "low",
      impact: 0,
      official: false
    },
    {
      section: "Social Context",
      sourceType: "Social media context",
      title: "Social context reserved",
      summary: "No social media signal is used for scoring in this build. Social posts require human review and corroboration by official sources.",
      url: "",
      date: "2026-05-08",
      confidence: "low",
      impact: 0,
      official: false,
      scoringDisabled: true
    }
  ],
  "ebk-amina-mwangi": [
    {
      section: "Professional Standing",
      sourceType: "Regulator-derived standing",
      title: "Professional Standing",
      summary: "EBK-style seeded records show an active professional engineer profile with no adverse regulator signal.",
      url: "https://www.ebk.go.ke/register/",
      date: "2026-05-08",
      confidence: "medium",
      impact: 3,
      official: true
    },
    {
      section: "Kenya Gazette Mentions",
      sourceType: "Gazette-style notice",
      title: "No adverse Gazette notice",
      summary: "No adverse Gazette-style notice is attached to this prototype profile.",
      url: "https://new.kenyalaw.org/",
      date: "2026-05-08",
      confidence: "medium",
      impact: 0,
      official: true
    },
    {
      section: "Kenyan Case Files",
      sourceType: "Kenya Law case-law search",
      title: "No adverse case-law match",
      summary: "No exact-name case-law match appears in the local MVP public snapshot set.",
      url: "https://new.kenyalaw.org/judgments/",
      date: "2026-05-08",
      confidence: "medium",
      impact: 0,
      official: true
    },
    {
      section: "Public Web Mentions",
      sourceType: "Public web context",
      title: "Public web signal unavailable",
      summary: "No reliable public web snippet is available in this local MVP dataset.",
      url: "",
      date: "2026-05-08",
      confidence: "low",
      impact: 0,
      official: false
    },
    {
      section: "Social Context",
      sourceType: "Social media context",
      title: "Social context reserved",
      summary: "Social media context is not used for scoring unless corroborated by official sources.",
      url: "",
      date: "2026-05-08",
      confidence: "low",
      impact: 0,
      official: false,
      scoringDisabled: true
    }
  ],
  "nca-msingi-roadworks": [
    {
      section: "Professional Standing",
      sourceType: "Regulator-derived standing",
      title: "Professional Standing",
      summary: "The contractor appears in the seeded register, but current license renewal evidence is incomplete.",
      url: "https://www.nca.go.ke/registered-contractors",
      date: "2026-05-08",
      confidence: "medium",
      impact: -6,
      official: true
    },
    {
      section: "Kenya Gazette Mentions",
      sourceType: "Gazette-style notice",
      title: "Renewal gap notice",
      summary: "A Gazette-style renewal notice in the prototype data flags license renewal as required before new work is undertaken.",
      url: "https://new.kenyalaw.org/",
      date: "2026-01-01",
      confidence: "medium",
      impact: -4,
      official: true
    },
    {
      section: "Kenyan Case Files",
      sourceType: "Kenya Law case-law search",
      title: "No court finding attached",
      summary: "No exact case-law judgment is attached in this local MVP dataset; treat this as unresolved rather than cleared.",
      url: "https://new.kenyalaw.org/judgments/",
      date: "2026-05-08",
      confidence: "low",
      impact: 0,
      official: true
    },
    {
      section: "Public Web Mentions",
      sourceType: "Public web context",
      title: "Amini-linked concern",
      summary: "Two Amini report signals mention expired-license concerns. These are accountability signals and require regulator confirmation.",
      url: "",
      date: "2026-05-08",
      confidence: "low",
      impact: -6,
      official: false
    },
    {
      section: "Social Context",
      sourceType: "Social media context",
      title: "Social context reserved",
      summary: "Social media allegations are not used for scoring in this build. They can be stored as context only after human moderation.",
      url: "",
      date: "2026-05-08",
      confidence: "low",
      impact: 0,
      official: false,
      scoringDisabled: true
    }
  ]
};

const sections = [
  "Professional Standing",
  "Kenya Gazette Mentions",
  "Kenyan Case Files",
  "Public Web Mentions",
  "Social Context"
];

const sentimentSignals = {
  "kmpdc-samuel-maina": [
    {
      sourceType: "Online review",
      channel: "Hospital review snippet",
      title: "Patient service comments",
      summary: "Several public review-style snippets describe cardiology consultation access and appointment wait times. No professional misconduct claim is corroborated by official sources.",
      url: "",
      date: "2026-04-18",
      sentiment: "neutral",
      themes: ["availability", "patient experience"],
      confidence: "low"
    },
    {
      sourceType: "Public web",
      channel: "Professional profile snippet",
      title: "Clinical affiliation mention",
      summary: "Public web context is consistent with a senior cardiology role and hospital affiliation.",
      url: "",
      date: "2026-03-30",
      sentiment: "positive",
      themes: ["professional standing", "hospital affiliation"],
      confidence: "low"
    }
  ],
  "ebk-amina-mwangi": [
    {
      sourceType: "Public web",
      channel: "Engineering project mention",
      title: "Infrastructure project participation",
      summary: "Public snippets mention engineering project participation with no adverse professional signal in the local dataset.",
      url: "",
      date: "2026-02-12",
      sentiment: "positive",
      themes: ["project delivery", "professional standing"],
      confidence: "low"
    },
    {
      sourceType: "Online review",
      channel: "Client review snippet",
      title: "Delivery communication",
      summary: "Review-style snippets are mostly neutral and refer to scheduling communication rather than credential risk.",
      url: "",
      date: "2026-01-22",
      sentiment: "neutral",
      themes: ["communication"],
      confidence: "low"
    }
  ],
  "nca-msingi-roadworks": [
    {
      sourceType: "Public web",
      channel: "Procurement forum snippet",
      title: "License renewal concern",
      summary: "Public discussion snippets mention expired-license concern. This is displayed for review but does not change the score without official corroboration.",
      url: "",
      date: "2026-04-04",
      sentiment: "risk-related",
      themes: ["license renewal", "procurement risk"],
      confidence: "low"
    },
    {
      sourceType: "Online review",
      channel: "Client review snippet",
      title: "Delayed paperwork complaint",
      summary: "A review-style complaint references delayed compliance documents. Treat as context only until verified by the regulator.",
      url: "",
      date: "2026-03-09",
      sentiment: "negative",
      themes: ["compliance paperwork", "delay"],
      confidence: "low"
    },
    {
      sourceType: "Social media context",
      channel: "Public social snippet",
      title: "Unverified allegation",
      summary: "A public social snippet alleges contract irregularity. It is not scored and needs human moderation plus official-source confirmation.",
      url: "",
      date: "2026-02-18",
      sentiment: "unverified allegation",
      themes: ["unverified allegation"],
      confidence: "low"
    }
  ]
};

function summarizeSentiment(mentions) {
  const counts = mentions.reduce((total, item) => {
    total[item.sentiment] = (total[item.sentiment] || 0) + 1;
    return total;
  }, {});
  const riskCount = (counts["risk-related"] || 0) + (counts.negative || 0) + (counts["unverified allegation"] || 0);
  const positiveCount = counts.positive || 0;
  if (riskCount > positiveCount) return "mixed / needs review";
  if (positiveCount > riskCount && positiveCount >= (counts.neutral || 0)) return "generally positive";
  return "mostly neutral";
}

function sourceMix(mentions) {
  return mentions.reduce((total, item) => {
    total[item.sourceType] = (total[item.sourceType] || 0) + 1;
    return total;
  }, {});
}

function topThemes(mentions) {
  const totals = mentions.flatMap((item) => item.themes || []).reduce((result, theme) => {
    result[theme] = (result[theme] || 0) + 1;
    return result;
  }, {});
  return Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([theme, count]) => ({ theme, count }));
}

export function generatePublicSnapshot(record, options = {}) {
  if (options.forceFailure) {
    return {
      status: "unavailable",
      note: SNAPSHOT_NOTE,
      sections: sections.map((title) => ({
        title,
        findings: [{
          sourceType: "Public intelligence",
          title: `${title} unavailable`,
          summary: "Public snapshot lookup is temporarily unavailable. Regulator reconciliation remains available.",
          url: "",
          date: new Date().toISOString().slice(0, 10),
          confidence: "low",
          impact: 0,
          scoringDisabled: true
        }]
      }))
    };
  }

  const findings = publicFindings[record.id] || [];
  const grouped = sections.map((title) => {
    const sectionFindings = findings.filter((finding) => finding.section === title);
    return {
      title,
      findings: sectionFindings.length
        ? sectionFindings.map(({ section, ...finding }) => finding)
        : [{
            sourceType: "Public intelligence",
            title: "No public adverse records found",
            summary: "No relevant public record was found for this section in the local MVP public snapshot set.",
            url: "",
            date: new Date().toISOString().slice(0, 10),
            confidence: "low",
            impact: 0
          }]
    };
  });

  return {
    status: findings.length ? "available" : "empty",
    note: SNAPSHOT_NOTE,
    sections: grouped
  };
}

export function generateSentimentSnapshot(record, options = {}) {
  if (options.forceFailure) {
    return {
      status: "unavailable",
      overallSentiment: "unavailable",
      mentionCount: 0,
      riskMentionCount: 0,
      confidence: "low",
      scoringDisabled: true,
      sourceMix: {},
      themes: [],
      mentions: [],
      note: "Sentiment lookup is temporarily unavailable. Verification remains based on official source reconciliation."
    };
  }

  const mentions = sentimentSignals[record.id] || [];
  const riskMentionCount = mentions.filter((item) =>
    ["negative", "risk-related", "unverified allegation"].includes(item.sentiment)
  ).length;

  return {
    status: mentions.length ? "available" : "empty",
    overallSentiment: mentions.length ? summarizeSentiment(mentions) : "no public sentiment found",
    mentionCount: mentions.length,
    riskMentionCount,
    confidence: "low",
    scoringDisabled: true,
    sourceMix: sourceMix(mentions),
    themes: topThemes(mentions),
    mentions,
    note: SENTIMENT_NOTE
  };
}

export function sentimentImpact() {
  return 0;
}

export function publicSnapshotImpact(snapshot) {
  return snapshot.sections
    .flatMap((section) => section.findings)
    .filter((finding) => !finding.scoringDisabled)
    .reduce((total, finding) => total + Number(finding.impact || 0), 0);
}

export function flattenSnapshot(snapshot) {
  return snapshot.sections.flatMap((section) =>
    section.findings.map((finding) => ({ section: section.title, ...finding }))
  );
}
