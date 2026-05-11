import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../..", import.meta.url));
const keyPath = join(root, ".private", "local.key");

async function ensureKey() {
  await mkdir(dirname(keyPath), { recursive: true });
  if (!existsSync(keyPath)) {
    await writeFile(keyPath, randomBytes(32).toString("base64"), { mode: 0o600 });
  }
  const encoded = await readFile(keyPath, "utf8");
  return Buffer.from(encoded.trim(), "base64");
}

export function hashValue(value) {
  return createHash("sha256")
    .update(String(value || "").trim().toLowerCase())
    .digest("hex");
}

export function maskReference(prefix = "HK") {
  return `${prefix}-${randomBytes(2).toString("hex").toUpperCase()}-${randomBytes(2).toString("hex").toUpperCase()}`;
}

export function redactContact(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (text.includes("@")) {
    const [name, domain] = text.split("@");
    return `${name.slice(0, 2)}***@${domain || "hidden"}`;
  }
  return `${text.slice(0, 4)}***${text.slice(-2)}`;
}

export async function encryptJson(payload) {
  const key = await ensureKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const plaintext = JSON.stringify(payload);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return {
    v: 1,
    alg: "AES-256-GCM",
    iv: iv.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
    ciphertext: ciphertext.toString("base64")
  };
}

export async function decryptJson(envelope) {
  const key = await ensureKey();
  const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(envelope.iv, "base64"));
  decipher.setAuthTag(Buffer.from(envelope.tag, "base64"));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(envelope.ciphertext, "base64")),
    decipher.final()
  ]).toString("utf8");
  return JSON.parse(plaintext);
}
