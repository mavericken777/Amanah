import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const currentPrimary = [
  "MS 1500:2019",
  "MS 2400-1:2019",
  "MS 2400-2:2019",
  "MS 2400-3:2019",
  "MS 2424:2019",
  "MS 2634:2019",
  "MS 2636:2019",
  "MS 2738:2023",
  "MS 2803:2025",
  "MS 2393:2023",
  "MS 2627:2017",
  "MS 2627-2:2025",
  "MS 1900:2025",
  "MS 2691:2021",
  "MS 2610:2015",
  "MS 2809:2025",
  "MS 2810:2025",
];

test("current primary Malaysian/JAKIM standards registry is complete across platform sources", () => {
  const operatingSet = JSON.parse(fs.readFileSync("docs/ahte/MS_OPERATING_SET.json", "utf8"));
  const config = JSON.parse(fs.readFileSync("config/ahte-standards-catalog.json", "utf8"));
  const migration = fs.readFileSync("supabase/migrations/0013_seed_17_standard_reference_catalog.sql", "utf8");
  const publicPage = fs.readFileSync("ghscl-website/standards.html", "utf8");
  const homePage = fs.readFileSync("ghscl-website/index.html", "utf8");
  const publisher = fs.readFileSync("scripts/build-trust-journey.mjs", "utf8");

  assert.equal(operatingSet.catalog_count, currentPrimary.length);
  assert.equal(operatingSet.standards.length, currentPrimary.length);
  assert.equal(config.catalog_count, currentPrimary.length);
  assert.equal(config.standards.length, currentPrimary.length);
  assert.equal(operatingSet.registry_mode, "extensible_applicability_registry");
  assert.equal(config.registry_mode, "extensible_applicability_registry");
  assert.equal(operatingSet.superseded_context, undefined);
  assert.equal(config.superseded_context, undefined);
  for (const item of [...operatingSet.standards, ...operatingSet.supplemental_instruments, ...config.standards, ...config.supplemental_instruments]) {
    assert.equal(item.source_status, undefined, `${item.code} must not carry retired source-status labels`);
  }

  for (const code of currentPrimary) {
    assert.ok(operatingSet.standards.some((s) => s.code === code), "operating registry missing " + code);
    assert.ok(config.standards.some((s) => s.code === code), "machine registry missing " + code);
    assert.ok(migration.includes(code), "database seed missing " + code);
    assert.ok(publicPage.includes(code), "public standards page missing " + code);
    assert.ok(homePage.includes(code), "public homepage missing " + code);
  }

  assert.ok(operatingSet.supplemental_instruments.some((s) => s.code === "MS 2683:2017"));
  assert.ok(config.supplemental_instruments.some((s) => s.code === "MS 2683:2017"));
  assert.ok(publicPage.includes("MS 2683:2017"));
  assert.ok(homePage.includes("MS 2683:2017"));
  assert.match(publisher, /MS_OPERATING_SET\.json/);
  assert.match(homePage, /complete current Malaysian\/JAKIM standards registry/i);
  assert.match(homePage, /certification and governance workflows/i);
  assert.doesNotMatch(homePage, /complete controlled 17-standard/i);
  assert.doesNotMatch(homePage, /17-standard halal operating set/i);
});

test("complete JAKIM framework remains layered above the extensible MS registry", () => {
  const operatingSet = JSON.parse(fs.readFileSync("docs/ahte/MS_OPERATING_SET.json", "utf8"));
  for (const item of ["MPPHM 2020","MHMS 2020","HAS","IHCS","protocols","circulars","authority instructions","destination rules","laboratory methods"]) {
    assert.ok(operatingSet.certification_layer.includes(item), "framework layer missing " + item);
  }
  assert.match(operatingSet.scope_rule, /MS 1500 and MS 2400 are not the entire standards universe/);
  assert.match(operatingSet.scope_rule, /not hard-coded to a fixed standards count/);

  const flagship = fs.readFileSync("platinum-site/src/App.tsx", "utf8");
  assert.match(flagship, /complete applicable Malaysian\/JAKIM framework/i);
  assert.match(flagship, /never by a fixed standards count/i);
  assert.doesNotMatch(flagship, /All 17 controlled Malaysian Standards are first-class applicability candidates/);
});
