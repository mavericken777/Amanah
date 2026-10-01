"use server";

import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";
import { requireQueryResults } from "@/lib/query-results";
import { revalidatePath } from "next/cache";

async function registerManufacturer(formData: FormData) {
  const { supabase, user } = await requireUser();
  const organization = await getPrimaryWorkspace(supabase, user.id);
  if (!organization) throw new Error("Create a workspace before onboarding a manufacturer.");

  const value = (name: string) => String(formData.get(name) ?? "").trim();
  const payload = {
    legal_name: value("legal_name"),
    registration_no: value("registration_no"),
    jurisdiction: value("jurisdiction") || "China",
    facility_name: value("facility_name"),
    site_code: value("site_code"),
    product_name: value("product_name"),
    product_category: value("product_category"),
    sku_code: value("sku_code"),
    sku_name: value("sku_name"),
    gtin: value("gtin"),
    supplier_name: value("supplier_name"),
    supplier_registration_no: value("supplier_registration_no"),
    material_name: value("material_name"),
    material_role: value("material_role") || "raw_material",
    material_origin: value("material_origin") || value("jurisdiction") || "China",
    production_line_code: value("production_line_code"),
    production_line_name: value("production_line_name"),
    zone_code: value("zone_code"),
    zone_type: value("zone_type") || "controlled",
    warehouse_code: value("warehouse_code"),
    warehouse_name: value("warehouse_name"),
    warehouse_type: value("warehouse_type") || "ambient",
  };

  if (!payload.legal_name || !payload.facility_name || !payload.site_code || !payload.product_name || !payload.sku_code) {
    throw new Error("Legal organisation, facility/site, product and SKU fields are required.");
  }

  const { error } = await supabase.rpc("ahte_register_manufacturer_onboarding", {
    p_org: organization.id,
    p_payload: payload,
  });
  if (error) throw error;

  revalidatePath("/onboarding");
  revalidatePath("/ahte");
  revalidatePath("/ahte/operations");
}

export default async function ManufacturerOnboardingPage() {
  const { supabase, user } = await requireUser();
  const organization = await getPrimaryWorkspace(supabase, user.id);
  if (!organization) return <div className="page"><div className="card"><h1>Create a workspace first</h1><p className="muted">Amanah uses the workspace as the tenant boundary for operational records.</p></div></div>;

  const [{ count: identityCount }, { count: facilityCount }, { count: productCount }, { count: skuCount }, { count: supplierCount }, { count: materialCount }, { count: documentCount }, { count: labCount }, { count: auditCount }, { count: gateCount }] =
    requireQueryResults(await Promise.all([
      supabase.from("ahte_identities").select("id",{count:"exact",head:true}).eq("organization_id",organization.id).eq("entity_type","manufacturer"),
      supabase.from("ahte_facilities").select("id",{count:"exact",head:true}).eq("organization_id",organization.id),
      supabase.from("ahte_products").select("id",{count:"exact",head:true}).eq("organization_id",organization.id),
      supabase.from("ahte_skus").select("id",{count:"exact",head:true}).eq("organization_id",organization.id),
      supabase.from("ahte_suppliers").select("id",{count:"exact",head:true}).eq("organization_id",organization.id),
      supabase.from("ahte_materials").select("id",{count:"exact",head:true}).eq("organization_id",organization.id),
      supabase.from("documents").select("id",{count:"exact",head:true}).eq("organization_id",organization.id),
      supabase.from("ahte_lab_samples").select("id",{count:"exact",head:true}).eq("organization_id",organization.id),
      supabase.from("ahte_audits").select("id",{count:"exact",head:true}).eq("organization_id",organization.id),
      supabase.from("ahte_authority_gates").select("id",{count:"exact",head:true}).eq("organization_id",organization.id),
    ] as const));

  const stages = [
    ["Identity / KYC record", identityCount ?? 0],
    ["Facility", facilityCount ?? 0],
    ["Product / SKU", Math.min(productCount ?? 0, skuCount ?? 0)],
    ["Supplier / materials", Math.max(supplierCount ?? 0, materialCount ?? 0)],
    ["Evidence / lab / audit", Math.max(documentCount ?? 0, labCount ?? 0, auditCount ?? 0)],
    ["Authority gate", gateCount ?? 0],
  ] as const;
  const completed = stages.filter(([, count]) => Number(count) > 0).length;
  const progress = Math.round((completed / stages.length) * 100);

  return <div className="page stack-xl">
    <header className="page-header"><div><div className="eyebrow">AMANAH / MANUFACTURER ONBOARDING</div><h1>Build the controlled origin record</h1><p className="lead">Register the controlled origin record: legal identity, facility, production line, zone, product/SKU, supplier/material graph, formula version and warehouse. The resulting records feed evidence, laboratory, audit, corrective action, authority and logistics workflows.</p></div><span className="status">{progress}% readiness record</span></header>
    <section className="metric-grid">{stages.map(([label,count]) => <div className="metric-card" key={label}><span>{label}</span><strong>{count}</strong></div>)}</section>
    <section className="card"><div className="eyebrow">CONTROLLED REGISTRATION</div><h2>Manufacturer intake</h2><p className="muted">Records begin in non-authority states. No field below creates Halal certification or a sovereign decision.</p>
    <form action={registerManufacturer} className="stack">
      <div className="grid-2"><label>Legal organisation name<input name="legal_name" required placeholder="Registered manufacturer name" /></label><label>Registration number<input name="registration_no" placeholder="Company registration" /></label></div>
      <div className="grid-2"><label>Jurisdiction<input name="jurisdiction" defaultValue="China" /></label><label>Facility legal name<input name="facility_name" required placeholder="Factory / facility name" /></label></div>
      <div className="grid-2"><label>Site code<input name="site_code" required placeholder="SITE-001" /></label><label>Product category<input name="product_category" placeholder="Food / pharma / cosmetics / other" /></label></div>
      <div className="grid-2"><label>Product name<input name="product_name" required /></label><label>SKU code<input name="sku_code" required placeholder="SKU-001" /></label></div>
      <div className="grid-2"><label>SKU name<input name="sku_name" /></label><label>GTIN / barcode<input name="gtin" /></label></div>
      <div className="grid-2"><label>Supplier legal name<input name="supplier_name" /></label><label>Supplier registration number<input name="supplier_registration_no" /></label></div>
      <div className="grid-2"><label>Ingredient / raw material<input name="material_name" /></label><label>Material role<select name="material_role" defaultValue="raw_material"><option value="ingredient">Ingredient</option><option value="raw_material">Raw material</option><option value="processing_aid">Processing aid</option><option value="packaging">Packaging</option><option value="other">Other</option></select></label></div>
      <label>Material origin country<input name="material_origin" defaultValue="China" /></label><div className="grid-2"><label>Production line code<input name="production_line_code" placeholder="LINE-001" /></label><label>Production line name<input name="production_line_name" /></label></div><div className="grid-2"><label>Facility zone code<input name="zone_code" placeholder="ZONE-RAW-01" /></label><label>Zone type<input name="zone_type" defaultValue="controlled" /></label></div><div className="grid-2"><label>Warehouse code<input name="warehouse_code" placeholder="WH-001" /></label><label>Warehouse name<input name="warehouse_name" /></label></div><label>Warehouse type<input name="warehouse_type" defaultValue="ambient" /></label>
      <button className="button" type="submit">Register controlled origin record</button>
    </form></section>
    <section className="card"><div className="eyebrow">NEXT CONTROL POINTS</div><h2>After registration</h2><p className="muted">Documents → readiness → applicable requirements → laboratory plan → audit → corrective action → authority gate → trust state → operational release.</p><p className="muted">Evidence, certificate scope and authority status must be independently substantiated. <strong>NOT DETECTED ≠ HALAL.</strong></p></section>
  </div>;
}
