# AGENTS.md

## Project Overview
- **Project:** HakikiHub - a mobile-first Kenyan professional verification and civic integrity platform.
- **Active reset project:** `C:\Users\.....\Hakiki`
- **Target user:** Kenyan citizens, diaspora clients, hospitals, schools, banks, procurement teams, and regulators.
- **Core journey:** Verify a professional first, then report concerns safely through Amini.
- **Current MVP status:** Static Visily-derived layout with local Node APIs, seeded Trust Check data, encrypted local report/contact storage, AI public record summaries, context-only sentiment snapshots, and styled PDF verification reports.

## Project Description
HakikiHub is a Kenyan civic integrity platform that helps citizens, employers, procurement teams, hospitals, schools, banks, and regulators verify professionals before trust is placed in them. It combines a Trust Check search engine with an anonymous Amini reporting channel to reduce professional quackery, credential fraud, and fragmented public records. The prototype preserves a polished multi-page web experience, adds seeded professional verification records, encrypted local report/contact storage, AI-generated public record summaries, and context-only public sentiment snapshots. I am most proud of the privacy-first reporting flow and the clear reconciliation panel that shows where confidence comes from instead of hiding the source logic.

The longer-term vision is to evolve HakikiHub into a Kenya-first civic integrity platform that helps citizens bridge Chapter Six leadership and integrity principles with everyday oversight. Future phases should support source-backed candidate integrity checks, public official profiles, public resource monitoring for schools and health centers, anonymous whistleblower reports, and evidence case packs for institutions such as EACC, ODPP, DCI, IEBC, PPRA, Auditor-General, Controller of Budget, and county oversight bodies. Do not frame the platform as a court or prosecutor; it should show source-backed signals, confidence, evidence trails, and referral routes.

## Commands
- **Install:** no new dependencies are required for the reset project.
- **Dev:** `cd C:\Users\.....\Hakiki && npm run dev`
- **Check:** `cd C:\Users\......\Hakiki && npm run check`
- **Build:** no build step; this is a static HTML reset served by `server.js`.

## Do
- Read existing code before modifying anything.
- Keep changes scoped to `Hakiki` unless the user explicitly asks to touch the older root prototype.
- Match existing static-export patterns and add behavior through `public/app.js`, CSS, or local API services.
- Keep verification usable without login.
- Treat source transparency as a product requirement.
- Show every field pulled from seeded regulator-style data; do not silently omit source data.
- Keep UI copy translation-ready and English-first.
- Preserve privacy-first behavior: encrypted local report/contact storage, no raw evidence bytes, no hardcoded secrets.
- Keep PDF report downloads styled, readable, and aligned with the Trust Check design.
- Keep civic integrity claims source-backed; separate verified records from allegations.
- For election/public official features, include moderation, right-of-reply, correction workflows, and politically neutral scoring rules.
- Run `npm run check` after changes.

## Don't
- Do not install new dependencies without asking.
- Do not claim production live scraping is complete. Current Trust Check uses seeded/local MVP records plus deterministic public intelligence.
- Do not treat citizen reports, social media, or reviews as proof. They are context-only until corroborated by official or strongly credible sources.
- Do not route ordinary corruption, campaign misuse, procurement fraud, or misuse of state resources to ICC by default. Kenyan institutional pathways come first; ICC is only relevant to extreme international-crime scenarios.
- Do not hardcode secrets, API keys, or credentials.
- Do not delete or overwrite files without confirming.
- Do not redesign the exported templates unless explicitly asked.
- Do not push, deploy, or force-push without permission.

## Seeded Trust Check Records
- `Dr. Samuel Maina, MBChB` - query `Samuel`, `Dr. Samuel Maina`, or `MED-55921-2024`; profession `Senior Cardiologist`; source `KMPDC Live Database`; status `Verified`.
- `Eng. Amina Wanjiru Mwangi` - query `Amina`, `Amina Mwangi`, or `PE-10422`; profession `Civil Engineer`; source `EBK Live Register`; status `Verified`.
- `Msingi Roadworks Company` - query `Msingi`, `Roadworks`, or `NCA-771204`; profession `Contractor`; source `NCA Contractor Register`; status `Under Review`.

## Response Style
- Be clear and concise.
- Use plain English.
- Explain limits honestly, especially around scraping, public records, and privacy.
