# HakikiHub Civic Integrity Expansion

## Executive Vision

HakikiHub turns constitutional integrity principles into usable civic oversight tools.

The current HakikiHub MVP starts with professional verification: citizens, employers, hospitals, schools, banks, procurement teams, and regulators can run a Trust Check before placing trust in a professional. The next phase expands that same model into a broader civic integrity platform for Kenya. It can help citizens understand whether public leaders, candidates, public institutions, projects, and resource use are aligned with the spirit of Chapter Six of the Constitution on Leadership and Integrity.

The platform should function as a source-backed digital truth meter, not as a court, prosecutor, or political attack tool. Its job is to make verified public records, official findings, court status, procurement signals, and citizen evidence easier to understand. It should show what is known, what is alleged, what is unverified, where the information came from, and which institution should handle escalation.

In practical terms, HakikiHub can bridge the gap between high-level constitutional requirements and everyday public oversight by turning abstract principles such as public trust, accountability, selfless service, objectivity, and integrity into structured public-facing checks.

## Strategic Problem

Kenya already has strong legal and constitutional language on leadership and integrity. Chapter Six of the Constitution frames authority assigned to State officers as a public trust. The Leadership and Integrity Act gives effect to that constitutional framework. EACC, ODPP, DCI, IEBC, PPRA, the Auditor-General, Controller of Budget, county assemblies, and other institutions each hold pieces of the accountability system.

The citizen problem is fragmentation.

- Public records are scattered across court portals, Gazette notices, EACC updates, procurement sources, county documents, audit reports, social media, and news.
- Election periods move quickly, while integrity checks are hard for ordinary voters to perform.
- Citizens often see misuse of vehicles, public funds, school resources, health center supplies, bursaries, tenders, or campaign assets but lack a safe evidence channel.
- Whistleblowers fear retaliation.
- Allegations can spread without verification, creating defamation and political manipulation risks.

HakikiHub should solve this by creating a civic integrity layer that is evidence-led, privacy-first, politically neutral, and institutionally responsible.

## Product Requirements Document

### Product Name

HakikiHub Civic Integrity Platform

### Product Mission

Help citizens, voters, watchdogs, public institutions, journalists, and regulators verify integrity signals, safely submit evidence, and route credible accountability concerns to the proper Kenyan institutions.

### Primary Users

- Citizens and voters checking candidates, public officers, or local projects.
- Journalists and civil society organizations investigating public-interest issues.
- Schools, hospitals, and community groups monitoring resource use.
- Procurement teams checking vendors, conflicts, and public tender risks.
- Election observers tracking candidate integrity signals.
- Regulators and oversight bodies receiving structured evidence packs.
- Diaspora citizens seeking simple, source-backed civic accountability tools.

### Core Modules

#### 1. Candidate Integrity Check / Red Carding

Purpose: Help voters and election observers understand integrity concerns before elections.

Key capabilities:

- Search candidates by name, party, office, county, constituency, ward, ID reference where lawful, or public nomination list.
- Reconcile candidate profiles against court records, EACC updates, Gazette notices, IEBC information, asset declaration status where lawfully available, public sanctions, procurement conflicts, and credible media reports.
- Show integrity labels: `Clear`, `Watchlist`, `Red Flag`, `Under Review`, `Unverified Allegation`.
- Generate a voter-friendly candidate integrity summary.
- Provide a right-of-reply and correction request process.

Important rule: Red Carding must mean "source-backed public warning." It must not mean a finding of guilt unless a competent institution or court has made that finding.

#### 2. Public Official Integrity Profile

Purpose: Track public officers and elected leaders against ethical accountability indicators.

Key capabilities:

- Profile public office holders by role, office, county, institution, and term.
- Display verified public record signals such as active cases, past convictions, audit issues, conflict-of-interest signals, procurement links, unexplained public resource allegations, and official disciplinary findings.
- Separate official findings from citizen reports and media context.
- Track changes over time with source dates.

#### 3. Public Resource Watch

Purpose: Let communities monitor public resources in schools, health centers, public works, county projects, vehicles, bursaries, and tenders.

Key capabilities:

- Search or register a public project, school, health center, road, water point, public vehicle, fund, tender, or facility.
- Upload evidence such as photos, documents, vehicle plates, location descriptions, receipts, invoices, tender screenshots, or witness notes.
- Strip GPS and device metadata unless the reporter intentionally keeps location evidence.
- Compare citizen reports with budget allocations, procurement notices, audit reports, project completion claims, and county or ministry publications.
- Produce public resource watch summaries by county, ward, institution, or project type.

#### 4. Amini Anonymous Whistleblower Vault

Purpose: Protect citizens and insiders who report unethical conduct, corruption, misuse of state resources, intimidation, procurement fraud, ghost projects, or campaign misuse of public assets.

Key capabilities:

- Anonymous reporting without login.
- Encrypted report storage.
- Metadata Ghost processing for evidence files.
- Anonymous follow-up key so investigators can ask questions without exposing the reporter.
- Report categories for election misuse, public vehicle misuse, procurement fraud, school funds, health supplies, county projects, bribery, nepotism, conflict of interest, intimidation, and abuse of office.
- Human moderation before any public display.

#### 5. Evidence Case Pack Generator

Purpose: Convert citizen evidence and public records into structured, institution-ready referrals.

Key capabilities:

- Build case packs for EACC, ODPP, DCI, IEBC, PPRA, Auditor-General, Controller of Budget, county assemblies, school boards, hospital boards, and other relevant institutions.
- Include source URLs, dates checked, evidence hashes, chain-of-custody notes, redacted reporter details, confidence score, and legal category.
- Export a secure PDF summary for internal review.
- Mark whether evidence is official, citizen-submitted, media-based, public web context, or unverified.

### Core User Journeys

#### Candidate Integrity Journey

1. User searches a candidate by name, office, county, or party.
2. HakikiHub shows a candidate integrity profile.
3. User sees source-backed labels and a confidence breakdown.
4. User opens the evidence trail behind any `Watchlist` or `Red Flag` signal.
5. User downloads or shares a public-facing summary.
6. Candidate or representative can request correction or right of reply.

#### Anonymous Corruption Report Journey

1. User chooses a report category, such as misuse of public vehicle or school funds.
2. User adds a description and optional evidence.
3. Metadata Ghost strips sensitive metadata.
4. HakikiHub encrypts the submission and generates an anonymous follow-up key.
5. The report is reviewed by a moderator.
6. If credible, a case pack is prepared for the correct institution.

#### Public Resource Monitoring Journey

1. User searches a school, health center, project, fund, tender, or vehicle.
2. HakikiHub displays available public records and prior reports.
3. User submits new evidence or confirms field observations.
4. The platform reconciles citizen evidence with budget, procurement, audit, and project records.
5. A public resource integrity profile is updated after moderation.

## Scoring and Integrity Model

HakikiHub should use transparent integrity labels instead of hidden scoring.

### Integrity Labels

- `Clear`: No adverse official or credible source-backed signals found in the checked sources.
- `Watchlist`: Some concern exists, but evidence is incomplete, context-only, or pending confirmation.
- `Red Flag`: A serious adverse signal is backed by official, court, regulator, audit, procurement, or institutionally credible records.
- `Under Review`: A report or signal is being moderated or awaiting source reconciliation.
- `Unverified Allegation`: A citizen, social, media, or review signal exists but is not corroborated.

### Source Weighting

Strong sources:

- Court findings and active court records.
- EACC, ODPP, DCI, IEBC, PPRA, Auditor-General, Controller of Budget, or official regulator records.
- Kenya Gazette notices.
- Official procurement and budget records.
- Official disciplinary findings.

Medium sources:

- Credible media reports with named sources.
- Public institutional reports.
- Civil society reports with documentation.
- Repeated citizen submissions supported by evidence.

Context-only sources:

- Social media posts.
- Online reviews.
- Anonymous allegations without supporting evidence.
- Unverified screenshots.
- Rumours or politically motivated claims.

### Red Carding Rules

Red Carding should be careful and legally defensible.

- A `Red Flag` can only be generated from official or strongly corroborated records.
- An active corruption case should be shown as an active case, not as proof of guilt.
- A conviction, final adverse finding, disqualification, sanction, or confirmed misuse record can be marked more strongly.
- Citizen reports can trigger `Under Review` or `Watchlist`, not `Red Flag`, unless corroborated.
- Every red card must show the reason, source, date checked, and confidence.
- Public figures must have a correction and right-of-reply route.

## Implementation and Architecture

### Current Foundation

The current HakikiHub reset project already provides the foundation:

- Static multi-page civic trust interface.
- Trust Check search flow.
- Seeded verification records.
- AI-generated public record summaries.
- Context-only sentiment snapshots.
- Amini anonymous report flow.
- Encrypted local report/contact storage.
- Styled PDF verification report download.

### Future Civic Integrity Data Model

Add structured entities for:

- People: candidates, public officials, public officers, professionals, complainants where lawful, and witnesses where protected.
- Offices: elected offices, appointed offices, boards, commissions, ministries, county departments, schools, and health facilities.
- Agencies: EACC, IEBC, ODPP, DCI, PPRA, Auditor-General, Controller of Budget, county governments, courts, and professional regulators.
- Projects: schools, hospitals, roads, water projects, public works, tenders, bursaries, CDF/NG-CDF projects, and county projects.
- Public assets: vehicles, equipment, land, buildings, funds, supplies, and procurement items.
- Reports: whistleblower reports, citizen observations, evidence uploads, moderator notes, and referral records.
- Evidence: files, metadata, hashes, source URLs, witness notes, location descriptions, and chain-of-custody logs.
- Source records: official records, court records, Gazette notices, procurement records, audit records, media records, and citizen-submitted context.
- Case packs: structured referral packages for institutions.

### Future APIs

Suggested future API surface:

- `GET /api/civic-search?q=&type=&county=&office=`
- `GET /api/candidates/:id`
- `GET /api/officials/:id`
- `GET /api/projects/:id`
- `GET /api/assets/:id`
- `POST /api/civic-reports`
- `POST /api/evidence`
- `POST /api/case-packs`
- `GET /api/case-packs/:id/status`
- `POST /api/correction-requests`
- `POST /api/right-of-reply`

### Privacy and Security Requirements

- Encrypt all report submissions at rest.
- Strip EXIF, GPS, and device metadata from uploaded evidence by default.
- Store evidence hashes for chain of custody.
- Avoid storing raw evidence bytes until secure evidence storage is approved.
- Provide anonymous follow-up keys.
- Separate public display data from private investigative evidence.
- Log all moderation and source changes.
- Do not expose reporter identity to public users.
- Use role-based access for moderators and institutional partners.

### Human Moderation

Human review is mandatory before any citizen allegation affects a public profile.

Moderators should:

- Verify whether evidence is relevant.
- Classify source type.
- Remove personally dangerous details.
- Check for defamation risk.
- Detect political manipulation and duplicate reports.
- Route credible matters to the right institution.
- Preserve audit trails.

## Institutional Referral Logic

HakikiHub should route issues to Kenyan institutions first.

Suggested routing:

- EACC: corruption, bribery, unethical conduct, abuse of office, conflict of interest, unexplained wealth, procurement corruption.
- ODPP: prosecution decision support after investigation files are ready.
- DCI: criminal investigation, fraud, forgery, threats, intimidation, evidence of organized crime.
- IEBC: election offences, candidate nomination concerns, campaign misuse complaints, election integrity signals.
- PPRA: public procurement irregularities, tender manipulation, conflict in procurement.
- Auditor-General: audit issues, public expenditure irregularities, missing documentation.
- Controller of Budget: budget implementation concerns and county/public fund monitoring.
- County assemblies: county executive oversight, local public resource accountability.
- School or hospital boards: local governance, supplies, facility resource concerns.
- ICC: only for extreme international crimes such as genocide, crimes against humanity, war crimes, or aggression. Ordinary corruption, misuse of state vehicles, campaign misuse of public resources, or procurement fraud should not be routed to ICC by default.

## Investor Pitch

### Problem

Kenya has strong constitutional standards for leadership and integrity, but citizens lack an easy, safe, and trusted way to connect those standards to everyday oversight. Public records are fragmented. Election integrity checks are difficult. Whistleblowers face risk. Communities see corruption in schools, health centers, tenders, vehicles, and local projects but often lack a protected channel to submit evidence.

### Solution

HakikiHub provides a trusted civic integrity layer for Kenya. It combines source-backed integrity checks, AI-assisted public record reconciliation, anonymous reporting, and institution-ready evidence case packs.

The platform helps citizens ask:

- Is this candidate facing active integrity concerns?
- Is this public officer linked to verified misconduct?
- Was this public resource misused?
- Does this public project match what was budgeted or promised?
- Can I report safely without exposing myself?

### Differentiator

- Source transparency: every score shows where it came from.
- Privacy-first reporting: encrypted submissions, metadata stripping, and anonymous follow-up.
- Kenya-first institutional routing: EACC, IEBC, ODPP, DCI, PPRA, Auditor-General, Controller of Budget, counties, schools, and health boards.
- AI-assisted reconciliation: public records become readable and actionable.
- Guardrails against political misuse: no unverified allegation becomes a public red flag without corroboration.

### Market and Impact Opportunity

Primary impact users:

- Voters during election cycles.
- CSOs and watchdog organizations.
- Journalists.
- Public institutions.
- Procurement teams.
- Development partners and civic funders.
- Communities monitoring schools, hospitals, roads, and local projects.

Potential impact metrics:

- Officials and candidates checked.
- Public projects monitored.
- Reports safely submitted.
- Evidence files protected.
- Verified misconduct signals surfaced.
- Case packs referred to institutions.
- Corrections and right-of-reply requests resolved.

### Sustainability Options

- Civic technology grants.
- Election integrity partnerships.
- Institutional dashboards for vetted watchdogs and public-interest organizations.
- API access for verified media, CSOs, and compliance teams.
- Procurement and due diligence compliance tools.
- Donor-funded public resource monitoring programs.

## Roadmap

### Phase 1: Current MVP

- Professional Trust Check.
- Amini anonymous reporting.
- Seeded records.
- Encrypted local storage.
- AI public records summary.
- Styled PDF verification report.

### Phase 2: Civic Integrity Data Layer

- Candidate and official profile schemas.
- Public resource and project schemas.
- Evidence and case pack schemas.
- Moderation workflow.
- Right-of-reply workflow.

### Phase 3: Public Leadership Truth Meter

- Candidate Integrity Check.
- Red Carding with source-backed warnings.
- Election-period public summaries.
- County and office filters.
- Public correction trail.

### Phase 4: Public Resource Watch

- School, health center, vehicle, tender, and project monitoring.
- Budget and procurement record reconciliation.
- Community reporting dashboards.
- Institution-ready evidence bundles.

### Phase 5: Institutional Integrations

- Secure partner dashboards.
- Case pack export to EACC, IEBC, PPRA, ODPP, DCI, Auditor-General, Controller of Budget, and county oversight bodies.
- API access for approved partners.
- Stronger evidence storage and chain-of-custody controls.

## Governance and Safeguards

HakikiHub must be designed for accountability without becoming a tool for defamation, intimidation, or political manipulation.

Required safeguards:

- Political neutrality across all parties, candidates, offices, and counties.
- Same scoring rules for every person and institution.
- Clear separation between verified official records and allegations.
- Human moderation before public display of citizen reports.
- Correction and right-of-reply channels.
- Visible source links and date checked.
- Public labels that avoid implying guilt before legal findings.
- Election-period escalation review for high-risk claims.
- AI summaries labeled as informational, not legal findings.
- Legal review before launch of candidate Red Carding.

## Legal and Ethical Position

HakikiHub should not replace EACC, IEBC, ODPP, DCI, courts, auditors, or prosecutors. It should support public oversight by organizing evidence, increasing transparency, protecting reporters, and routing credible concerns to the right institutions.

The platform should treat integrity as a public-interest question, not a political weapon. It should help citizens see patterns and records while preserving fairness, due process, and dignity.

## Reference Sources

- Kenya Law, Constitution of Kenya, Chapter Six, Article 73 on leadership as public trust and accountability: https://new.kenyalaw.org/akn/ke/act/2010/constitution
- Kenya Law, Leadership and Integrity Act, which gives effect to Chapter Six: https://new.kenyalaw.org/akn/ke/act/2012/19
- EACC, mandate and Chapter Six implementation role: https://eacc.go.ke/en/default/about-us/
- EACC, corruption reporting and anonymous whistleblower channels: https://eacc.go.ke/en/default/report-corruption/
- EACC, anonymous reporting and informer protection FAQs: https://beta.eacc.go.ke/faq-categories/protection/
- Rome Statute / ICC jurisdiction limits: https://legal.un.org/icc/statute/99_corr/cstatute.htm

## Assumptions

- This document is strategic and product-facing, not legal advice.
- The next implementation phase remains Kenya-first and institutionally responsible.
- The platform should empower citizens without publishing unverified accusations as facts.
- Production launch of civic integrity scoring requires legal review, moderation operations, source agreements, and clear public correction workflows.
