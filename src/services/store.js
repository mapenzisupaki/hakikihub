import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { encryptJson, hashValue, maskReference, redactContact } from "./privacy.js";

const root = fileURLToPath(new URL("../..", import.meta.url));
const storageDir = join(root, ".private", "submissions");

async function appendEnvelope(kind, publicRecord, privatePayload) {
  await mkdir(storageDir, { recursive: true });
  const file = join(storageDir, `${kind}.json`);
  const current = existsSync(file) ? JSON.parse(await readFile(file, "utf8")) : [];
  const envelope = await encryptJson(privatePayload);
  current.push({
    ...publicRecord,
    encrypted: true,
    envelope,
    storedAt: new Date().toISOString()
  });
  await writeFile(file, JSON.stringify(current, null, 2));
  return current.at(-1);
}

export async function storeReport(body = {}) {
  const referenceId = maskReference("AMINI");
  const contactOptional = String(body.contactOptional || "").trim();
  const evidenceMetadata = body.evidenceMetadata || {};
  const privatePayload = {
    referenceId,
    subject: String(body.subject || "").trim(),
    profession: String(body.profession || "").trim(),
    description: String(body.description || "").trim(),
    incidentDate: String(body.incidentDate || "").trim(),
    location: String(body.location || "").trim(),
    contactOptional,
    evidenceMetadata: {
      name: String(evidenceMetadata.name || "").slice(0, 120),
      type: String(evidenceMetadata.type || "unknown"),
      size: Number(evidenceMetadata.size || 0),
      metadataRemoved: ["gps", "device_serial", "camera_model", "created_at", "software"]
    }
  };
  const publicRecord = {
    kind: "report",
    referenceHash: hashValue(referenceId),
    contactHash: contactOptional ? hashValue(contactOptional) : "",
    contactRedacted: redactContact(contactOptional)
  };
  await appendEnvelope("reports", publicRecord, privatePayload);
  return {
    ok: true,
    encrypted: true,
    referenceId,
    message: "Report received. Evidence metadata was stripped and the submission was stored in an encrypted local envelope."
  };
}

export async function storeContact(body = {}) {
  const referenceId = maskReference("CNT");
  const contact = String(body.contact || body.email || body.phone || "").trim();
  const privatePayload = {
    referenceId,
    name: String(body.name || "").trim(),
    contact,
    topic: String(body.topic || "General inquiry").trim(),
    message: String(body.message || "").trim(),
    channel: String(body.channel || "web").trim()
  };
  const publicRecord = {
    kind: "contact",
    referenceHash: hashValue(referenceId),
    contactHash: contact ? hashValue(contact) : "",
    contactRedacted: redactContact(contact)
  };
  await appendEnvelope("contacts", publicRecord, privatePayload);
  return {
    ok: true,
    encrypted: true,
    referenceId,
    message: "Message received through an encrypted local envelope. We did not store raw contact text outside the encrypted payload."
  };
}
