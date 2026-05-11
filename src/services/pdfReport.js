import { flattenSnapshot } from "./publicIntelligence.js";

const page = { width: 595, height: 842 };
const colors = {
  bg: "0.06 0.06 0.09",
  card: "0.09 0.09 0.13",
  cardSoft: "0.12 0.12 0.17",
  panel: "0.08 0.10 0.15",
  border: "0.24 0.24 0.32",
  white: "0.97 0.97 0.99",
  text: "0.82 0.82 0.88",
  muted: "0.64 0.64 0.72",
  blue: "0.24 0.84 0.96",
  trustBlue: "0.33 0.60 0.96",
  red: "0.88 0.18 0.29",
  amber: "0.96 0.62 0.25"
};

function clean(value) {
  return String(value ?? "")
    .replace(/[^\x09\x0a\x0d\x20-\x7e]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function pdfString(value) {
  return clean(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapText(value, maxChars) {
  const words = clean(value).split(" ").filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function rect(x, y, w, h, fill, stroke = null) {
  const commands = [`${fill} rg`];
  if (stroke) commands.push(`${stroke} RG`);
  commands.push(`${x} ${y} ${w} ${h} re ${stroke ? "B" : "f"}`);
  return commands.join("\n");
}

function line(x1, y1, x2, y2, color = colors.border) {
  return `${color} RG\n0.65 w\n${x1} ${y1} m\n${x2} ${y2} l\nS`;
}

function text(x, y, value, size = 10, color = colors.white, font = "F1") {
  return [
    "BT",
    `/${font} ${size} Tf`,
    `${color} rg`,
    `${x} ${y} Td`,
    `(${pdfString(value)}) Tj`,
    "ET"
  ].join("\n");
}

function multiline(x, y, value, options = {}) {
  const {
    size = 10,
    color = colors.text,
    font = "F1",
    maxChars = 72,
    lineHeight = 13,
    maxLines = 4
  } = options;
  return wrapText(value, maxChars)
    .slice(0, maxLines)
    .map((lineText, index) => text(x, y - (index * lineHeight), lineText, size, color, font))
    .join("\n");
}

function labelValue(x, y, label, value, width = 22) {
  return [
    text(x, y, clean(label).toUpperCase(), 6, colors.muted, "F2"),
    multiline(x, y - 12, value, {
      size: 8,
      color: colors.white,
      font: "F2",
      maxChars: width,
      lineHeight: 10,
      maxLines: 2
    })
  ].join("\n");
}

function object(id, body) {
  return `${id} 0 obj\n${body}\nendobj\n`;
}

function scoreColor(score) {
  if (score >= 85) return colors.trustBlue;
  if (score >= 65) return colors.amber;
  return colors.red;
}

function header(record, pageNumber, reportDate) {
  return [
    rect(0, 0, page.width, page.height, colors.bg),
    text(36, 795, "HakikiHub", 17, colors.blue, "F2"),
    text(36, 777, "Professional Trust Check Report", 8, colors.text),
    text(380, 795, `Generated: ${reportDate}`, 6, colors.muted),
    text(520, 36, `Page ${pageNumber} of 2`, 7, colors.muted)
  ].join("\n");
}

function snapshotItems(record) {
  return flattenSnapshot(record.publicSnapshot)
    .filter((item) => /Professional Standing|Kenya Gazette Mentions|Kenyan Case Files/.test(item.section))
    .slice(0, 3);
}

function snapshotBlock(record) {
  return snapshotItems(record).map((item, index) => {
    const y = 413 - (index * 58);
    const heading = item.section === item.title ? item.section : `${item.section}: ${item.title}`;
    return [
      text(58, y, heading, 9, colors.white, "F2"),
      multiline(58, y - 15, item.summary, {
        size: 7,
        color: colors.text,
        maxChars: 96,
        lineHeight: 9,
        maxLines: 4
      })
    ].join("\n");
  }).join("\n");
}

function pageOne(record, reportDate) {
  const profile = record.profileFields || {};
  const statusTitle = record.licenseStatus === "Verified" ? "Trust Verified" : "Trust Requires Review";

  return [
    header(record, 1, reportDate),

    rect(36, 620, 523, 102, colors.card, colors.border),
    text(58, 688, record.shortName || record.name, 15, colors.white, "F2"),
    text(58, 668, `${record.profession} - license ${record.registrationNumber}`, 8, colors.text),
    text(390, 688, record.licenseStatus.toUpperCase(), 7, colors.white, "F2"),
    text(390, 672, "LAST VERIFIED", 6, colors.muted, "F2"),
    multiline(390, 661, record.lastVerified, { size: 8, color: colors.white, font: "F2", maxChars: 24, lineHeight: 10, maxLines: 2 }),
    line(58, 650, 537, 650),
    labelValue(58, 634, "Registered Since", profile["Registered Since"] || "N/A"),
    labelValue(218, 634, "Specialization", profile.Specialization || "N/A", 25),
    labelValue(378, 634, "Primary Facility", profile["Primary Facility"] || "N/A", 27),

    rect(36, 528, 250, 66, "0.08 0.08 0.11"),
    text(58, 570, `${record.confidenceScore}%`, 18, colors.white, "F2"),
    text(112, 572, "CONFIDENCE", 6, scoreColor(record.confidenceScore), "F2"),
    text(58, 552, `Integrity Score: ${record.confidenceLabel}`, 9, colors.white, "F2"),
    multiline(58, 537, "License matches primary and secondary government records with reconciled source checks.", {
      size: 7,
      maxChars: 54,
      maxLines: 2
    }),

    rect(310, 528, 249, 66, colors.panel),
    text(332, 568, statusTitle, 10, colors.white, "F2"),
    multiline(332, 550, record.guidance || record.disclaimer, {
      size: 7,
      color: colors.text,
      maxChars: 54,
      lineHeight: 9,
      maxLines: 3
    }),

    text(36, 494, "AI-Generated Public Records Snapshot", 11, colors.white, "F2"),
    text(36, 478, "Synthesized from official legal notices, regulatory announcements, and public context.", 7, colors.text),
    rect(36, 245, 523, 214, colors.cardSoft, colors.border),
    snapshotBlock(record),
    line(58, 272, 537, 272),
    text(58, 257, "Note: AI summary is informational. Cross-reference Tier 1 live sync data.", 7, colors.text),

    rect(36, 155, 523, 50, colors.panel),
    text(58, 184, "Public Use Guidance", 8, colors.white, "F2"),
    multiline(58, 170, "This report is a source-backed verification summary. It is not a legal finding, court order, or final regulatory decision.", {
      size: 7,
      color: colors.text,
      maxChars: 104,
      lineHeight: 9,
      maxLines: 2
    })
  ].join("\n");
}

function sourceRows(record) {
  return record.sources.slice(0, 6).map((source, index) => {
    const y = 610 - (index * 48);
    return [
      line(56, y + 22, 537, y + 22, "0.18 0.18 0.24"),
      text(58, y, source.name, 9, colors.white, "F2"),
      text(58, y - 14, `${source.tier} - checked ${source.checkedAgo}`, 7, colors.muted),
      text(420, y, source.status, 8, colors.white, "F2")
    ].join("\n");
  }).join("\n");
}

function metricRows(record) {
  return record.scoreBreakdown.slice(0, 8).map((item, index) => {
    const y = 290 - (index * 30);
    const points = Number(item.points) > 0 ? `+${item.points}` : String(item.points);
    return [
      line(56, y + 17, 537, y + 17, "0.18 0.18 0.24"),
      text(58, y, item.label.toUpperCase(), 7, colors.muted),
      text(456, y, points, 9, colors.blue, "F2"),
      item.note ? text(58, y - 12, item.note, 6, colors.muted) : ""
    ].join("\n");
  }).join("\n");
}

function pageTwo(record, reportDate) {
  return [
    header(record, 2, reportDate),

    text(36, 720, "Data Reconciliation Tiers", 12, colors.white, "F2"),
    text(36, 703, "Official, public, and accountability sources used to produce this Trust Check.", 7, colors.text),
    rect(36, 365, 523, 315, colors.card, colors.border),
    sourceRows(record),

    text(36, 325, "Confidence Metrics", 12, colors.white, "F2"),
    text(36, 308, "Visible scoring factors. Context-only sources do not change the score unless corroborated.", 7, colors.text),
    rect(36, 72, 523, 214, colors.card, colors.border),
    metricRows(record),

    rect(36, 28, 523, 28, colors.panel),
    multiline(50, 45, record.disclaimer, {
      size: 6,
      color: colors.text,
      maxChars: 116,
      lineHeight: 8,
      maxLines: 2
    })
  ].join("\n");
}

export function verificationReportPdf(record) {
  const reportDate = new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" });
  const streams = [pageOne(record, reportDate), pageTwo(record, reportDate)];
  const objects = [
    object(1, "<< /Type /Catalog /Pages 2 0 R >>"),
    object(2, "<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>"),
    object(3, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 7 0 R >>`),
    object(4, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 8 0 R >>`),
    object(5, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"),
    object(6, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"),
    object(7, `<< /Length ${Buffer.byteLength(streams[0], "utf8")} >>\nstream\n${streams[0]}\nendstream`),
    object(8, `<< /Length ${Buffer.byteLength(streams[1], "utf8")} >>\nstream\n${streams[1]}\nendstream`)
  ];

  let body = "%PDF-1.4\n";
  const offsets = [0];
  for (const entry of objects) {
    offsets.push(Buffer.byteLength(body, "utf8"));
    body += entry;
  }
  const xrefOffset = Buffer.byteLength(body, "utf8");
  body += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    body += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  body += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return Buffer.from(body, "utf8");
}
