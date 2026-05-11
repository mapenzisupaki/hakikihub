export const sourceTiers = [
  {
    name: "KMPDC Live Database",
    tier: "Tier 1 Sync",
    status: "Matched",
    checkedAgo: "2s ago"
  },
  {
    name: "Kenya Gazette Records",
    tier: "Tier 2 Sync",
    status: "Matched",
    checkedAgo: "Real-time"
  },
  {
    name: "High Court Registry",
    tier: "Tier 2 Sync",
    status: "Clear",
    checkedAgo: "4s ago"
  },
  {
    name: "Amini Accountability Vault",
    tier: "Tier 3 Sync",
    status: "No Reports",
    checkedAgo: "1s ago"
  }
];

export const records = [
  {
    id: "kmpdc-samuel-maina",
    name: "Dr. Samuel Maina, MBChB",
    shortName: "Dr. Samuel Maina",
    profession: "Senior Cardiologist",
    registrationNumber: "MED-55921-2024",
    licenseStatus: "Verified",
    confidenceScore: 98,
    confidenceLabel: "High",
    lastVerified: "Today, 09:42 AM EAT",
    avatar: "/assets/trust-check/IMG_9.webp",
    profileFields: {
      "Registered Since": "August 2012",
      Specialization: "Interventional Cardiology",
      "Primary Facility": "Kenyatta National Hospital"
    },
    sources: sourceTiers,
    aiSummary: [
      {
        title: "Professional Standing",
        text: "Dr. Maina is currently listed as a Senior Consultant in Good Standing. Our engine found zero active malpractice suits or disciplinary suspensions in the 2023-2024 registry."
      },
      {
        title: "Kenya Gazette Mentions",
        text: "Identified in Gazette Notice No. 4521 (Jan 2022) regarding medical board certification renewal. No adverse mentions found in the Professional Misconduct sections of the past 10 years."
      }
    ],
    guidance: "You can proceed with professional engagement. Download this verification report for your records.",
    disclaimer: "This verification is based on live data reconciliation from state regulators. Discrepancies should be reported via the Accountability Vault."
  },
  {
    id: "ebk-amina-mwangi",
    name: "Eng. Amina Wanjiru Mwangi",
    shortName: "Eng. Amina Mwangi",
    profession: "Civil Engineer",
    registrationNumber: "PE-10422",
    licenseStatus: "Verified",
    confidenceScore: 92,
    confidenceLabel: "High",
    lastVerified: "Today, 09:38 AM EAT",
    avatar: "",
    profileFields: {
      "Registered Since": "March 2016",
      Specialization: "Civil Engineering",
      "Primary Facility": "Independent Consultant"
    },
    sources: [
      { name: "EBK Live Register", tier: "Tier 1 Sync", status: "Matched", checkedAgo: "3s ago" },
      { name: "Kenya Gazette Records", tier: "Tier 2 Sync", status: "Matched", checkedAgo: "Real-time" },
      { name: "High Court Registry", tier: "Tier 2 Sync", status: "Clear", checkedAgo: "5s ago" },
      { name: "Amini Accountability Vault", tier: "Tier 3 Sync", status: "No Reports", checkedAgo: "1s ago" }
    ],
    aiSummary: [
      {
        title: "Professional Standing",
        text: "The EBK registration profile is active and matches public professional engineer records."
      },
      {
        title: "Public Records",
        text: "No active disciplinary notices or adverse public registry matches were found in this prototype dataset."
      }
    ],
    guidance: "Trust verified. Keep the source summary with your procurement or engagement file.",
    disclaimer: "Prototype result reconciled against seeded regulator-style sources."
  },
  {
    id: "nca-msingi-roadworks",
    name: "Msingi Roadworks Company",
    shortName: "Msingi Roadworks",
    profession: "Contractor",
    registrationNumber: "NCA-771204",
    licenseStatus: "Under Review",
    confidenceScore: 61,
    confidenceLabel: "Medium",
    lastVerified: "Today, 09:31 AM EAT",
    avatar: "",
    profileFields: {
      "Registered Since": "June 2019",
      Specialization: "Roads and Civil Works",
      "Primary Facility": "Kisumu"
    },
    sources: [
      { name: "NCA Contractor Register", tier: "Tier 1 Sync", status: "Partial", checkedAgo: "6s ago" },
      { name: "Kenya Gazette Records", tier: "Tier 2 Sync", status: "Matched", checkedAgo: "Real-time" },
      { name: "High Court Registry", tier: "Tier 2 Sync", status: "Clear", checkedAgo: "8s ago" },
      { name: "Amini Accountability Vault", tier: "Tier 3 Sync", status: "Reports Found", checkedAgo: "2s ago" }
    ],
    aiSummary: [
      {
        title: "Professional Standing",
        text: "The contractor appears in the register, but current license renewal evidence is incomplete in the prototype source set."
      },
      {
        title: "Accountability Signals",
        text: "Two related Amini reports mention expired license concerns. Treat this as low-confidence until a regulator confirms renewal."
      }
    ],
    guidance: "Request current licence evidence before engagement. Use Amini if the contractor is actively presenting an expired licence.",
    disclaimer: "Partial matches require human review before final reliance."
  }
];
