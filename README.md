# HakikiHub Static Reset

HakikiHub is a Kenyan civic integrity platform that helps citizens, employers, procurement teams, hospitals, schools, banks, and regulators verify professionals before trust is placed in them. It combines a Trust Check search engine with an anonymous Amini reporting channel to reduce professional quackery, credential fraud, and fragmented public records. The prototype preserves a polished multi-page web experience, adds seeded professional verification records, encrypted local report/contact storage, AI-generated public record summaries, and context-only public sentiment snapshots. I am most proud of the privacy-first reporting flow and the clear reconciliation panel that shows where confidence comes from instead of hiding the source logic.

This folder is the active isolated reset project. It preserves the provided static layouts and layers local API behavior around them.

For the civic integrity expansion PRD, investor pitch, implementation direction, and future roadmap, see [PROJECT DOCUMENTATION.md](./PROJECT%20DOCUMENTATION.md).

## Live Deployment

- Live Render URL: [https://hakikihub.onrender.com](https://hakikihub.onrender.com)
- Local development URL: `http://localhost:3100`
- Repository: [https://github.com/mapenzisupaki/hakikihub](https://github.com/mapenzisupaki/hakikihub)

The Render deployment runs the same Node server as local development, including static pages, Trust Check APIs, report/contact APIs, and PDF report generation.

## Pages

- `/` - Home / Landing
- `/how-it-works.html` - How It Works
- `/trust-check.html` - Trust Check
- `/report.html` - Report Anonymously
- `/partners.html` - About & Partners
- `/contact.html` - Contact & Integrations

## Commands

- `npm run dev` - serve the static reset on `http://localhost:3100`
- `npm start` - start the Node server for hosted environments such as Render
- `npm run check` - verify required pages, asset paths, API data, button mappings, and encrypted privacy flows

No install step is required for the current reset. Do not add dependencies without approval.

## Render Deployment

Render can deploy this repo from `main` using the included `render.yaml`.

Manual Render settings, if needed:

- Runtime: `Node`
- Build command: `npm install`
- Start command: `npm start`
- Root directory: leave blank because app files are at the repo root
- Node version: `20`

## Local APIs

- `GET /api/health`
- `GET /api/stats`
- `GET /api/search?q=&profession=&regulator=`
- `GET /api/records/:id`
- `GET /api/public-snapshot?id=`
- `GET /api/sentiment-snapshot?id=`
- `POST /api/reports`
- `POST /api/contact`
- `POST /api/download-report`

## Seeded Trust Check Records

| Name | Query examples | Profession | Regulator/source | Status |
| --- | --- | --- | --- | --- |
| Dr. Samuel Maina, MBChB | `Samuel`, `Dr. Samuel Maina`, `MED-55921-2024` | Senior Cardiologist | KMPDC Live Database | Verified |
| Eng. Amina Wanjiru Mwangi | `Amina`, `Amina Mwangi`, `PE-10422` | Civil Engineer | EBK Live Register | Verified |
| Msingi Roadworks Company | `Msingi`, `Roadworks`, `NCA-771204` | Contractor | NCA Contractor Register | Under Review |

Trust Check profession filters currently map as follows:

- `Medical` finds doctor/cardiology-style records.
- `Engineering` finds engineering records.
- `Contractors` finds contractor records.
- `Legal` and `Architecture` are wired but return a no-result guidance state until seeded data is added.

## Scoring Model

The Trust Check confidence score is based on:

- Official regulator match
- License number match
- Name and profession match
- Secondary public records such as Gazette or court-style signals
- Amini accountability signals
- Data freshness
- Public intelligence impact

Social media and online review sentiment is displayed as context only. It does not change the Trust Check score unless later corroborated by official regulator, court, or Gazette records.

## Privacy Model

- Reports and contact requests are stored as AES-256-GCM encrypted local envelope files under `.private`.
- Contact identifiers are hashed or masked where possible.
- Evidence file bytes are not stored in this prototype.
- Evidence metadata can be accepted for UI flow testing.
- No production secrets or API keys should be committed.

## Current Limitations

- Live scraping and production regulator crawling are not complete.
- Current Trust Check data is seeded/local MVP data plus deterministic public intelligence.
- Manual audit is a moderated report/contact flow for now, not a separate production workflow.
- PDF export returns a styled local verification PDF for the selected record.
- The current encrypted report/contact store writes to local filesystem envelopes under `.private`. For production-grade persistence on Render, move submissions to a database or encrypted object storage.
