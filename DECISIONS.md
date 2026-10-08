# Decision Log

**Status:** CURRENT PROJECT DECISION HANDOFF  
**Controlling architecture:** `docs/architecture/PLATFORM_ARCHITECTURE.md`  
**Current state:** `docs/operations/STATUS.md`

| ID | Date | Decision | Reason / context | Owner / authority | Affected areas |
|---|---|---|---|---|---|
| D-001 | 2026-09-29 | Amanah is the central operational project source of truth | Keep operational records together and auditable | Programme governance | All |
| D-002 | 2026-09-30 | Authority topology is AHTE ⇄ Direct JAKIM API ⇄ JAKIM | Preserve direct authority connectivity and decision ownership | Project architecture | Authority / API / website |
| D-003 | 2026-09-30 | Default physical corridor is China → GCC direct | Remove stale China→Malaysia physical-routing assumptions | Project architecture | Logistics / mission / website |
| D-004 | 2026-09-30 | AI does not execute authorised certification decision workflow | Preserve competent-authority / authorised-human decision rights | AI governance | AI / HITM / release |
| D-005 | 2026-09-30 | Laboratory evidence does not itself create Halal status | Scientific evidence must remain distinct from certification | Assurance governance | Laboratory / audit / verification |
| D-006 | 2026-10-03 | Items 1–69 are complete to project-controlled scope | Final exact-head CI and merge verified; external activation remains gated | Programme governance | Entire programme |

## Decision-recording rule

New decisions must record:
- Decision ID and date;
- exact decision;
- evidence / reason;
- decision owner and mandate;
- affected domains;
- superseded decision, if any;
- implementation / follow-up reference.

Operational decisions should be entered in the authenticated Amanah workspace. Authority, customs, finance/Takaful and counterparty decisions remain externally owned and require attributable evidence.

[SOURCE-LOCKED: external competent-authority / counterparty decisions]
