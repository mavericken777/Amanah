# AMANAH Exception Engine
**Status:** REPOSITORY-IMPLEMENTED DESIGN CONTRACT

## Canonical exception flow
Signal → deterministic rule → evidence/context bind → severity → configured D4 HOLD/QUARANTINE where permitted → human queue → finding/CAPA → re-verification → D5 authority gate when required → operational release.

Exception states: HOLD, QUARANTINED, DISPUTED, CORRECTIVE-ACTION, RE-VERIFICATION, EXPIRED, SUSPENDED, REVOKED, RECALLED.

No exception automation may certify Halal, approve financing/Takaful, create legal title, release sovereign holds, or execute D5/D6.

Minimum exception record: ExceptionID, ObjectID, EventID, EvidenceID(s), ActorID/system actor, rule/version, timestamp, severity, integrity proof, state, owner, required action, supersession/re-verification links.

Blast-radius traversal follows Product/SKU ↔ ingredient/raw material ↔ supplier/facility ↔ batch/lot ↔ package/pallet/container ↔ shipment/custody/destination.