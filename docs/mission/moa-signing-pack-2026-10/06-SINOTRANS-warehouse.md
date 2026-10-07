# MEMORANDUM OF AGREEMENT

**Reference:** MOA-SINO-WH-2026-EXEC-01  
**Instrument:** M06  
**Control date:** 7 October 2026  
**Status:** EXECUTION-READY NEGOTIATION DRAFT — not executed until the legal identity/signatory gates below are completed and every named Party signs.

## Parties

GHSCL; PHC where accepted; and the exact Sinotrans warehouse/CFS operating entity and site(s).

## 1. Strategic purpose

Define warehouse/CFS readiness, segregation, receiving, storage, picking, loading, container/seal and evidence controls for nominated pilot goods.

## 2. Scope of cooperation

1. Site/facility identification and applicable licences.
2. Receiving and quarantine.
3. Segregation and storage controls.
4. Temperature/environment monitoring where applicable.
5. Pallet/package identity and stock movement.
6. Pick/load/container/seal process.
7. Cleaning/sanitation evidence.
8. WMS integration and exception records.

## 3. Responsibilities

- Sinotrans warehouse operator: provide site-specific SOP/evidence and accountable control owners; maintain operational records and exception handling.
- GHSCL: map evidence to canonical AMANAH objects and audit-readiness requirements.
- PHC: assurance coordination within mandate; not warehouse operator or certification authority.

## 4. AMANAH / AHTE integration and evidence

Where this cooperation exchanges digital evidence, the canonical internal model remains AMANAH/AHTE. Partner systems connect through controlled adapters. Minimum attributable evidence should bind, as applicable, **ObjectID + EventID + EvidenceID + ActorID + Timestamp + IntegrityProof**. External connector states are recorded as **UNCONFIGURED / DEVELOPMENT / SANDBOX / PENDING_AUTHORIZATION / PRODUCTION**. No unavailable external connection is represented as live.

## 5. Decision and authority boundaries

AHTE supports standards applicability, evidence, trust intelligence, digital twins, AI/ML assistance, exception detection and configured holds. It does not independently certify Halal, execute D5/D6 authority decisions, override JAKIM or another competent authority, release customs/sovereign holds, approve financing/Takaful or create legal title.

## 6. Implementation governance

Each Party shall nominate an executive sponsor, operational owner and technical/compliance owner. The workstream register shall record: action, owner, due date, evidence required, dependency, decision status and closure reference. Material scope changes require written approval by authorised representatives.

## 7. Milestones / KPIs

- Named site and accountable manager.
- Site control matrix and evidence exports.
- UAT of receive→store→pick→load→seal.
- Corrective-action ownership for identified gaps.

## 8. Commercial principles

Unless an Annex C or separate contract is executed, this MoA does not set price, purchase volume, revenue share, margin, exclusivity, service liability, credit terms, financing or insurance. A live shipment, purchase, integration, service or deployment requires the applicable separate operational/commercial instrument.

## 9. Data sharing, privacy and cross-border controls

Before production exchange, Annex B must identify each data field, purpose, source owner, recipient, jurisdiction, lawful basis/authority, retention, permitted disclosure and security control. Commercially confidential factory information is not disclosed to downstream parties unless necessary and authorised. Consumer/public verification uses only issuer-authorised disclosure fields.

## 10. Confidentiality, IP, cybersecurity and incident management

The Common Terms below apply. Any API integration must address authentication, authorisation, mTLS/PKI where appropriate, secrets, encryption, audit logging, rate limiting, versioning, UAT, rollback and incident notification. Evidence corrections use supersession; no silent overwrite.

## 11. Termination and transition

Termination of this MoA does not cancel separate live purchase orders/service contracts unless those contracts provide otherwise. The Parties shall preserve legally required records, protect confidential information and agree an orderly termination of active data connections.

## 12. Required schedules

- Annex A — site(s), zones and pilot capacities.
- Annex B — WMS/data/evidence interface.
- Annex C — storage/handling rates and SLA under separate contract.

## 13. Execution gate — must be complete before signature

For **each Party** record: exact registered legal name; registration/company number; registered address; authorised signatory name/title; written mandate/board/POA reference where required; notice email; signature date; seal/chop requirement; controlling language. Attach final Annex A and Annex B. Do not backdate. Do not state JAKIM approval, laboratory accreditation, exclusivity, procurement commitment or commercial appointment unless supported by the relevant authoritative evidence.

## 14. Signatures

**For Party 1**  
Legal name: ______________________________  
Authorised signatory: _____________________  
Title: __________________________________  
Mandate reference: _______________________  
Date: ___________________________________  
Signature / seal: _________________________

**For Party 2**  
Legal name: ______________________________  
Authorised signatory: _____________________  
Title: __________________________________  
Mandate reference: _______________________  
Date: ___________________________________  
Signature / seal: _________________________

**Additional Party (where applicable)**  
Legal name: ______________________________  
Authorised signatory: _____________________  
Title: __________________________________  
Mandate reference: _______________________  
Date: ___________________________________  
Signature / seal: _________________________


## Common legal and governance terms

1. **Legal character.** This instrument records a framework for cooperation. It does not create a purchase order, guaranteed volume, exclusivity, partnership, agency, certification mandate, customs concession, financing commitment or authority appointment unless a separately executed schedule expressly states otherwise.
2. **Authority firewall.** AMANAH/AHTE, PHC, GHSCL, laboratories, logistics operators, retailers and technology providers do not create Halal certification. The controlling topology is **AHTE ⇄ Direct JAKIM API ⇄ JAKIM** where authorised. AI may support D0–D2 analysis and configured D4 holds; D5/D6 authority/legal decisions remain with authorised humans / competent authority. Customs and sovereign releases remain with the relevant competent authority.
3. **Corridor.** The default physical corridor is **China → GCC direct**. Malaysia provides governance, assurance, standards and authority-connectivity functions unless a transaction is separately scoped otherwise.
4. **Confidentiality.** Each Party shall protect non-public commercial, technical, customer, sample and operational information, use it only for the agreed purpose, limit access to personnel/advisers with equivalent duties, and apply lawful disclosure exceptions. Trade secrets remain protected for so long as they legally qualify as trade secrets.
5. **Data and cybersecurity.** Data exchange shall be purpose-bound and minimum-necessary. Before production exchange, the Parties shall agree data fields, lawful basis, jurisdictions, roles, retention, access, incident notification and deletion. Production connections shall use appropriate IAM, MFA, PKI/mTLS, encryption, secrets management, logging and least privilege. No production credentials may be placed in public repositories.
6. **IP.** Each Party retains pre-existing IP. No implied licence, ownership transfer or right to use another Party's marks arises. New IP, integration development ownership and licensing require a separately executed schedule.
7. **Publicity.** No Party may use another Party's name, logo, government mark, certificate, endorsement or announce exclusivity without prior written approval of exact wording/artwork.
8. **Compliance and integrity.** Evidence records may be hashed/signed for integrity; a hash proves integrity of recorded bytes, not truth of the underlying statement. Corrections shall be made by supersession, not silent overwrite.
9. **Term and termination.** Proposed term: two years from the last valid signature, terminable by any Party on 30 days' written notice, without cancelling separate live purchase orders/service contracts.
10. **Disputes.** Proposed governing law for binding provisions: Hong Kong SAR, with good-faith senior escalation for 30 days before proceedings in the courts of Hong Kong SAR, unless the execution copy expressly substitutes another agreed mechanism.
11. **Execution.** Before signature, record each Party's exact legal name, registration number, registered address, authorised signatory, title, mandate reference, signature date, seal/chop requirements and controlling language. English/Chinese bilingual text may be used where appropriate; unresolved translation discrepancies block signature.

