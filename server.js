import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { findRecord, publicSnapshotForRecord, searchRecords, sentimentSnapshotForRecord, stats, verificationReport } from "./src/services/engine.js";
import { verificationReportPdf } from "./src/services/pdfReport.js";
import { storeContact, storeReport } from "./src/services/store.js";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 3100);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon"
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return {};
  }
}

async function handleApi(req, res, url) {
  if (req.method === "GET" && url.pathname === "/api/health") {
    sendJson(res, 200, { ok: true, service: "hakikihub-static-reset", checkedAt: new Date().toISOString() });
    return true;
  }

  if (req.method === "GET" && url.pathname === "/api/stats") {
    sendJson(res, 200, stats());
    return true;
  }

  if (req.method === "GET" && url.pathname === "/api/search") {
    sendJson(res, 200, searchRecords({
      query: url.searchParams.get("q") || "",
      profession: url.searchParams.get("profession") || "all",
      regulator: url.searchParams.get("regulator") || "all"
    }));
    return true;
  }

  if (req.method === "GET" && url.pathname.startsWith("/api/records/")) {
    const id = decodeURIComponent(url.pathname.replace("/api/records/", ""));
    const record = findRecord(id);
    sendJson(res, record ? 200 : 404, record || { error: "Record not found" });
    return true;
  }

  if (req.method === "GET" && url.pathname === "/api/public-snapshot") {
    const snapshot = publicSnapshotForRecord(url.searchParams.get("id") || "");
    sendJson(res, snapshot ? 200 : 404, snapshot || { error: "Record not found" });
    return true;
  }

  if (req.method === "GET" && url.pathname === "/api/sentiment-snapshot") {
    const snapshot = sentimentSnapshotForRecord(url.searchParams.get("id") || "");
    sendJson(res, snapshot ? 200 : 404, snapshot || { error: "Record not found" });
    return true;
  }

  if (req.method === "POST" && url.pathname === "/api/reports") {
    const result = await storeReport(await readBody(req));
    sendJson(res, 201, result);
    return true;
  }

  if (req.method === "POST" && url.pathname === "/api/contact") {
    const result = await storeContact(await readBody(req));
    sendJson(res, 201, result);
    return true;
  }

  if (req.method === "POST" && url.pathname === "/api/download-report") {
    const body = await readBody(req);
    const record = findRecord(body.id);
    if (!record) {
      sendJson(res, 404, { error: "Record not found" });
      return true;
    }
    if (body.format === "text") {
      res.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store"
      });
      res.end(verificationReport(record));
      return true;
    }
    const pdf = verificationReportPdf(record);
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${record.id}-hakikihub-report.pdf"`,
      "Cache-Control": "no-store",
      "Content-Length": pdf.length
    });
    res.end(pdf);
    return true;
  }

  if (url.pathname.startsWith("/api/")) {
    sendJson(res, 404, { error: "API endpoint not found" });
    return true;
  }

  return false;
}

async function serveStatic(req, res, url) {
  const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
  const safePath = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(root, safePath);

  if (!filePath.startsWith(root)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  try {
    const data = await readFile(filePath);
    const type = contentTypes[extname(filePath)] || "application/octet-stream";
    const cacheControl = type.includes("html") || type.includes("css") || type.includes("javascript")
      ? "no-store"
      : "public, max-age=3600";
    res.writeHead(200, {
      "Content-Type": type,
      "Cache-Control": cacheControl
    });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(await readFile(join(root, "index.html")));
  }
}

async function serve(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (await handleApi(req, res, url)) return;
  await serveStatic(req, res, url);
}

http.createServer(serve).listen(port, () => {
  console.log(`HakikiHub static reset running at http://localhost:${port}`);
});
