# AMANAH / GHSCL Master Legal & Contractual Pack

**Version:** 1.0.0  
**Control date:** 2026-10-03  
**Status:** LEGAL WORKING DRAFT / COUNTERPARTY + COUNSEL REVIEW REQUIRED  
**Classification:** COMMERCIAL PROPOSAL / PROJECT-CONTROLLED

This pack provides the controlling legal structure for counterparties. It does not fabricate signatures, mandates, approvals, governing-law acceptance, authority delegations or partner commitments.

## 1. Contract stack

1. Master Cooperation / Services Agreement (MSA)
2. Partner-specific Statement of Work (SOW)
3. Data Processing & Evidence Governance Schedule
4. Security & Integration Schedule
5. Service Level / KPI Schedule
6. Commercial Schedule
7. Confidentiality / IP / Publicity Schedule
8. Laboratory Evidence Schedule where applicable
9. Logistics / Custody Schedule where applicable
10. Authority-Connectivity Schedule where authorised
11. Finance / Takaful Evidence Schedule where applicable
12. Change Control / Exit / Transition Schedule

## 2. Mandatory party data before execution

- exact registered legal name;
- registration number / jurisdiction;
- registered address;
- authorised representative;
- signer mandate / board or delegated authority;
- notice address and email;
- tax / invoicing details;
- applicable licences/accreditations;
- subcontractor list where material;
- execution language and precedence;
- seal/chop requirements.

No document is execution-ready while required party identity or mandate fields are blank.

## 3. Purpose and scope

The parties may cooperate to implement AMANAH / AHTE-enabled evidence, assurance, traceability, audit, logistics, verification and related trade workflows. Each SOW shall identify the exact facility, product, country, interface, service, deliverable, owner and acceptance criteria.

## 4. Authority boundary

AHTE ⇄ Direct JAKIM API ⇄ JAKIM is the project authority-connectivity topology.

GHSCL, AMANAH, AHTE, AI, blockchain, laboratories, QR/NFC, sensors, logistics providers, digital twins and cryptographic hashes do not independently create Halal certification or sovereign release. Formal certification and sovereign/legal decisions remain with competent authorities and authorised humans.

No party obtains a power to bind JAKIM, another competent authority, a port/customs authority, financier, Takaful operator or other sovereign/regulatory body merely by signing a commercial agreement with GHSCL.

## 5. Evidence and records

- Evidence objects are append-only and provenance-linked.
- Corrections use supersession; material audit history is not overwritten.
- Originating parties remain responsible for information they issue.
- Hash/signature mechanisms prove integrity/provenance to their technical scope; they do not prove underlying factual truth.
- Minimum binding where applicable: ObjectID + EventID + EvidenceID + ActorID + Timestamp + IntegrityProof.
- Retention, confidentiality and disclosure scope are defined per data class and jurisdiction.

## 6. Data protection / cross-border data

Each SOW shall define:
- controller/processor or equivalent roles;
- lawful purpose and minimum-necessary data;
- data categories and subjects;
- storage/processing jurisdictions;
- cross-border transfer mechanism where applicable;
- access roles and recipients;
- retention/deletion;
- incident notification;
- data-subject / regulator cooperation where legally required.

Restricted-authority, restricted-commercial and personal data may not be exported merely because an integration exists.

## 7. Security

Minimum contract baseline:
- MFA for privileged access;
- least privilege / RBAC;
- tenant isolation;
- OAuth/OIDC or equivalent for user/service authentication;
- mTLS/PKI or signed-channel equivalent for high-trust machine integrations;
- encryption in transit and at rest where supported;
- secrets outside public repositories;
- auditable administrative actions;
- vulnerability / patch management;
- incident response and evidence preservation;
- backup / continuity / restoration testing.

## 8. Integration

Interfaces may use REST, SOAP/XML, EDI, CSV/SFTP, message queues, webhooks, event streams or batch exchange.

Production activation requires:
- authorised technical specification;
- credentials/certificates;
- approved scopes;
- endpoint allowlisting where required;
- sandbox/UAT evidence;
- error/retry/idempotency agreement;
- production cutover approval.

No simulated receipt may be represented as a production authority or partner response.

## 9. Laboratory schedule

Laboratory scope shall identify legal entity, accreditation, competent scope, methods, sample chain, QC, authorised signatories, amendment/versioning, data interface and result ownership.

Hard rule: **NOT_DETECTED ≠ HALAL**.

## 10. Logistics / custody schedule

The schedule shall identify named sites, lanes, subcontractors, modes, temperature classes, container/seal responsibilities, telemetry, route/geofence rules, custody handoffs, incident ownership, proof of delivery, insurance/liability references and data interfaces.

Sinotrans or another logistics provider contributes custody evidence and does not create Halal certification.

## 11. IP

- Pre-existing IP remains with its owner.
- New project-specific deliverables require an explicit ownership/licence schedule.
- No implied transfer of standards copyright, authority marks, logos or partner trademarks.
- Model outputs, prompts, configuration, schemas, connectors and derived analytics require explicit allocation in the SOW.
- Open-source components retain their licence terms.

## 12. Confidentiality / publicity

Non-public technical, commercial, customer, sample and authority-related information is used only for the agreed purpose and protected with reasonable care.

No party may publicise a partnership, certification, government endorsement, authority approval, logo, mark, customer identity or volume without written approval of the exact claim/artwork unless legally required.

## 13. Commercial terms

Fees, hardware, licences, integration, travel, testing, freight, taxes, third-party services, financing cost, insurance/Takaful cost and change requests belong in the Commercial Schedule.

No purchase volume, exclusivity, revenue share or guaranteed market access exists unless expressly executed.

## 14. Service levels

Only the executed SLA Schedule creates external commitments. Internal engineering objectives or proposals are not binding counterparty SLAs.

Service credits, exclusions, maintenance windows, force majeure, dependency failures and third-party outages must be specified.

## 15. Liability / indemnity / insurance

Final limits, exclusions, indemnities and insurance requirements require legal/counterparty negotiation. The project pack does not invent values.

Particular risks requiring allocation:
- incorrect origin/product data;
- laboratory error;
- custody loss/tamper;
- cybersecurity incident;
- authority/port rejection;
- customs delay;
- product recall;
- IP infringement;
- privacy breach;
- unauthorised publicity.

## 16. Compliance

Each party remains responsible for laws, licences, permits, sanctions/export controls, anti-bribery, competition, tax, employment, privacy, food/product, customs, Shariah and sector requirements applicable to it.

## 17. Change control

Changes affecting product, formulation, supplier, origin, facility, route, control, laboratory method, integration contract, data scope or authority requirement must trigger documented impact assessment and, where needed, re-verification.

## 18. Term / suspension / termination

Final agreement shall define:
- term and renewal;
- suspension triggers;
- material breach cure;
- immediate termination triggers;
- data/evidence retention;
- credential revocation;
- transition assistance;
- outstanding payment;
- survival of confidentiality/IP/audit obligations.

## 19. Dispute framework

The final agreement shall identify governing law, dispute forum/arbitration rules, seat, language and escalation process. Until executed, these remain open legal terms and must not be presented as agreed.

## 20. Execution gate

[OPEN GATE: final legal review and counterparty execution — exact legal entities, governing law, liability, commercial schedule, data roles and signatures required.]
