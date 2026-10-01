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
  const legalName = value("legal_name");
  const registrationNo = value("registration_no");
  const jurisdiction = value("jurisdiction") || "China";
  const facilityName = value("facility_name");
  const siteCode = value("site_code");
  const productName = value("product_name");
  const productCategory = value("product_category");
  const skuCode = value("sku_code");
  const skuName = value("sku_name") || productName;
  const gtin = value("gtin");
  const supplierName = value("supplier_name");
  const supplierRegistrationNo = value("supplier_registration_no");
  const materialName = value("material_name");
  const materialRole = value("material_role") || "raw_material";
  const materialOrigin = value("material_origin") || jurisdiction;

  if (!legalName || !facilityName || !siteCode || !productName || !skuCode) {
    throw new Error("Legal organisation, facility/site, product and SKU fields are required.");
  }

  const { data: identity, error: identityError } = await supabase.from("ahte_identities").insert({
    organization_id: organization.id,
    entity_type: "manufacturer",
    legal_name: legalName,
    registration_no: registrationNo || null,
    jurisdiction,
    metadata: { onboarding_source: "manufacturer_portal", created_by_user: user.id },
  }).select("id").single();
  if (identityError) throw identityError;

  const { error: partnerError } = await supabase.from("ahte_partners").insert({
    organization_id: organization.id,
    name: legalName,
    partner_type: "manufacturer",
    role: "origin / manufacturer",
    authority_status: "unverified",
    identity_id: identity.id,
    notes: "Created through AMANAH onboarding. External authority status is not inferred.",
  });
  if (partnerError) throw partnerError;

  const { data: facility, error: facilityError } = await supabase.from("ahte_facilities").insert({
    organization_id: organization.id,
    legal_name: facilityName,
    site_code: siteCode,
    jurisdiction,
    address: { country: jurisdiction },
    status: "draft",
    metadata: { onboarding_source: "manufacturer_portal" },
  }).select("id").single();
  if (facilityError) throw facilityError;

  const { data: product, error: productError } = await supabase.from("ahte_products").insert({
    organization_id: organization.id,
    name: productName,
    category: productCategory || null,
    status: "draft",
    market_status: "not_cleared",
    metadata: { onboarding_source: "manufacturer_portal", facility_id: facility.id },
  }).select("id").single();
  if (productError) throw productError;

  const { error: skuError } = await supabase.from("ahte_skus").insert({
    organization_id: organization.id,
    product_id: product.id,
    sku_code: skuCode,
    name: skuName,
    gtin: gtin || null,
    status: "draft",
    metadata: { onboarding_source: "manufacturer_portal" },
  });
  if (skuError) throw skuError;

  if (supplierName) {
    const { data: supplier, error: supplierError } = await supabase.from("ahte_suppliers").insert({
      organization_id: organization.id,
      legal_name: supplierName,
      registration_no: supplierRegistrationNo || null,
      jurisdiction: materialOrigin,
      risk_class: "medium",
      verification_status: "unverified",
      status: "active",
      metadata: { onboarding_source: "manufacturer_portal" },
    }).select("id").single();
    if (supplierError) throw supplierError;

    if (materialName) {
      const { error } = await supabase.from("ahte_materials").insert({
        organization_id: organization.id,
        supplier_id: supplier.id,
        name: materialName,
        material_role: materialRole,
        category: materialRole,
        source_type: "supplier",
        origin_country: materialOrigin,
        halal_status: "unverified",
        status: "active",
        metadata: { onboarding_source: "manufacturer_portal" },
      });
      if (error) throw error;
    }
  } else if (materialName) {
    const { error } = await supabase.from("ahte_materials").insert({
      organization_id: organization.id,
      name: materialName,
      material_role: materialRole,
      category: materialRole,
      source_type: "direct",
      origin_country: materialOrigin,
      halal_status: "unverified",
      status: "active",
      metadata: { onboarding_source: "manufacturer_portal" },
    });
    if (error) throw error;
  }

  revalidatePath("/onboarding");
  revalidatePath("/ahte");
  revalidatePath("/ahte/operations");
}

export default async function ManufacturerOnboardingPage() {
  const { supabase, user } = await requireUser();
  const organization = await getPrimaryWorkspace(supabase, user.id);
  if (!organization) return <div className="page"><div className="card"><h1>Create a workspace first</h1><p className="muted">Amanah uses the workspace as the tenant boundary for operational records.</p></div></div>;

  const [{ count: identityCount }, { count: facilityCount }, { count: productCount }, { count: skuCount }, { count: supplierCount }, { count: materialCount }] =
    requireQueryResults(await Promise.all([
      supabase.from("ahte_identities").select("id",{count:"exact",head:true}).eq("organization_id",organization.id).eq("entity_type","manufacturer"),
      supabase.from("ahte_facilities").select("id",{count:"exact",head:true}).eq("organization_id",organization.id),
      supabase.from("ahte_products").select("id",{count:"exact",head:true}).eq("organization_id",organization.id),
      supabase.from("ahte_skus").select("id",{count:"exact",head:true}).eq("organization_id",organization.id),
      supabase.from("ahte_suppliers").select("id",{count:"exact",head:true}).eq("organization_id",organization.id),
      supabase.from("ahte_materials").select("id",{count:"exact",head:true}).eq("organization_id",organization.id),
    ] as const));

  const stages = [
    ["Identity / KYC record", identityCount ?? 0],
    ["Facility", facilityCount ?? 0],
    ["Product / SKU", Math.min(productCount ?? 0, skuCount ?? 0)],
    ["Supplier / materials", Math.max(supplierCount ?? 0, materialCount ?? 0)],
    ["Evidence / lab / audit", 0],
  ] as const;
  const completed = stages.filter(([, count]) => Number(count) > 0).length;
  const progress = Math.round((completed / stages.length) * 100);

  return <div className="page stack-xl">
    <header className="page-header"><div><div className="eyebrow">AMANAH / MANUFACTURER ONBOARDING</div><h1>Build the controlled origin record</h1><p className="lead">Register the legal identity, facility, product/SKU and supplier/material graph that feeds evidence, laboratory, audit, corrective action and authority workflows.</p></div><span className="status">{progress}% readiness record</span></header>
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
      <label>Material origin country<input name="material_origin" defaultValue="China" /></label>
      <button className="button" type="submit">Register controlled origin record</button>
    </form></section>
    <section className="card"><div className="eyebrow">NEXT CONTROL POINTS</div><h2>After registration</h2><p className="muted">Documents → readiness → applicable requirements → laboratory plan → audit → corrective action → authority gate → trust state → operational release.</p><p className="muted">Evidence, certificate scope and authority status must be independently substantiated. <strong>NOT DETECTED ≠ HALAL.</strong></p></section>
  </div>;
}
