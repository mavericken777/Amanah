-- Align authority-decision persistence with the deployed assurance API.
-- Both signed and final are internal lifecycle labels for externally issued decisions.
-- Neither status permits AHTE to originate certification authority.

alter table public.ahte_authority_decisions
  drop constraint if exists ahte_authority_decisions_status_check;

alter table public.ahte_authority_decisions
  add constraint ahte_authority_decisions_status_check
  check (status = any (array['draft'::text,'signed'::text,'final'::text,'revoked'::text]));

alter table public.ahte_authority_decisions
  drop constraint if exists ahte_authority_decision_external_proof;

alter table public.ahte_authority_decisions
  add constraint ahte_authority_decision_external_proof
  check (
    status not in ('signed','final')
    or (decision_reference is not null and signature_hash is not null)
  );
