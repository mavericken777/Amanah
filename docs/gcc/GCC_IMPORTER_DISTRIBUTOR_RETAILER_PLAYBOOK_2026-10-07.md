# GCC Importer / Distributor / Retailer — A-to-Z Operating Playbook
**Control date:** 7 October 2026  
**Status:** CURRENT DESTINATION-MARKET OPERATING PLAYBOOK

## 1. Purpose

This playbook completes the destination side of the AMANAH / Global Halal Digital Trust lifecycle. It treats the GCC importer, distributor/3PL, retailer/marketplace and final verification audiences as first-class platform participants.

Canonical corridor:

**China origin → Sinotrans logistics → GCC port/customs → importer → warehouse/distribution → retailer/marketplace → buyer/authority/consumer verification**

## 2. Importer onboarding

Capture legal entity, registration/licence, jurisdiction, authorised users, warehouse/3PL relationships, product/SKU portfolio, buyer/retailer relationships, regulatory documents and integration credentials.

### Pre-arrival dossier

- purchase order;
- shipment manifest;
- exporter/manufacturer;
- product/SKU;
- batch/lot;
- certificate/credential status;
- issuing authority;
- validity;
- laboratory/audit evidence references;
- container/seal;
- custody history;
- temperature/condition history;
- port/customs documents;
- ETA;
- open exceptions.

### Receiving workflow

**Port release reference  
→ Receiving appointment  
→ Container/seal reconciliation  
→ Product/SKU/batch reconciliation  
→ Quantity and condition inspection  
→ Temperature/environment check  
→ Credential/document check  
→ Accept / discrepancy / quarantine  
→ Warehouse location  
→ Inventory lot  
→ Distribution eligibility**

### Importer Command Center

Show inbound shipments, port/customs status, credential validity, seal/container condition, environmental history, discrepancies, quarantine, inventory lots, distributor/retailer allocations, recalls, finance/Takaful evidence and open exceptions.

## 3. Distributor / 3PL

Support onboarding, facility identity, warehouse controls, receiving, lot/batch reconciliation, storage, segregation, FEFO/FIFO where applicable, transfer orders, vehicle assignment, custody events, proof of delivery, returns and recall execution.

Every transfer preserves:

**ProductID + SKU + Batch/Lot + Shipment/Transfer + Custodian + Time + Condition + Evidence**

## 4. Retailer / marketplace onboarding

Capture legal entity, store/DC/fulfilment locations, authorised users, buyer/category teams, importer/supplier relationships, approved product listings and API/EDI integration.

### Listing eligibility

Evaluate:

- product/SKU identity;
- manufacturer;
- importer/supplier;
- current certificate/credential state;
- issuing authority;
- validity;
- batch/lot;
- destination requirements;
- open holds/recalls;
- evidence required for the retailer decision.

### Retail receiving

**PO → ASN / shipment → scan SKU/batch → verify credential state → quantity/condition → storage/shelf/fulfilment → availability**

### Retail operations

- DC/store receiving;
- cold-chain where relevant;
- lot/batch traceability;
- expiry/FEFO;
- shelf/stock state;
- QR verification;
- returns;
- complaints;
- withdrawal;
- recall;
- supplier/product changes;
- credential-expiry alerts.

### Retailer Command Center

Show approved listings, inbound orders, credential expiry, receiving exceptions, blocked/quarantined stock, affected batches, recall scope, affected stores/orders, verification events and authority/customer enquiries.

## 5. Marketplace / e-commerce

Support seller/product listing approval, SKU mapping, fulfilment centre, batch/lot, order-to-shipment linkage, verification link and recall/withdrawal propagation.

## 6. Verification audiences

### Buyer
Procurement and receiving status for approved products/SKUs.

### Retailer
Listing/receiving/sale eligibility and recall status.

### Authority
Permitted credential, evidence and custody view according to authority role.

### Consumer
Purpose-bound product identity, issuer-authorised credential status, validity, provenance summary and selected custody evidence.

Public verification never exposes confidential business or personal information.

## 7. Exceptions

Destination exceptions include:

- missing/expired credential;
- seal discrepancy;
- temperature excursion;
- quantity mismatch;
- damaged cargo;
- wrong SKU/batch;
- document mismatch;
- customs hold;
- authority hold;
- importer rejection;
- quarantine;
- retailer listing block;
- receiving rejection;
- customer complaint;
- withdrawal;
- recall.

Lifecycle:

**Detected → Classified → Contained → Investigated → Corrective Action → Re-verification → Closed / Escalated / Recalled**

## 8. Recall / blast radius

Trace:

**Product/SKU → Batch/Lot → Import Shipment → Importer Inventory → Distributor Transfers → Retail DC/Store/Order → Verification / Customer Contact**

Command Center must identify affected units, locations, stores, orders, custody events and responsible actors.

## 9. Integration

Support REST, SOAP, XML, EDI, CSV, SFTP, batch, webhooks, queues and streaming through adapters to the canonical AMANAH model.

Typical integration targets:

- importer ERP;
- WMS;
- distributor TMS/WMS;
- retailer ERP/POS;
- marketplace catalogue/order platform;
- port/customs interfaces;
- verification service.

## 10. KPIs

- pre-arrival document completeness;
- port-to-receiving time;
- receiving discrepancy rate;
- quarantine rate;
- credential-expiry exposure;
- distribution exception rate;
- retail listing block rate;
- cold-chain exception rate;
- recall notification time;
- recall closure time;
- verification latency.

## 11. Decision boundaries

Importer/retailer operational acceptance is distinct from formal Halal certification and sovereign customs release.

**AHTE ⇄ Direct JAKIM API ⇄ JAKIM**

AI assists with analysis, risk and mapping. Authorised humans and competent authorities decide where the applicable mandate requires it.
