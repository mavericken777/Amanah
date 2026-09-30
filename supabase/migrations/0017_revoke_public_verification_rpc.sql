-- Revoke the legacy public SECURITY DEFINER verification RPC.
-- Public verification is served exclusively by the `public-verify` Edge Function,
-- which performs token hashing, expiry/revocation checks, organization scoping,
-- controlled disclosure, and returns `not_certification: true`.
--
-- This migration closes a regression caused by a later replay of the operational
-- primitives migration recreating `public.ahte_public_verify(text)` after an
-- earlier migration had removed/revoked it.

do $$ begin
 if to_regprocedure('public.ahte_public_verify(text)') is not null then
  revoke all on function public.ahte_public_verify(text) from public,anon,authenticated;
 end if;
end $$;
