import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const expected = [
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

test("complete 17-standard operating catalogue is consistent across platform sources", () => {
  const operatingSet = JSON.parse(fs.readFileSync("docs/ahte/MS_OPERATING_SET.json", "utf8"));
  const config = JSON.parse(fs.readFileSync("config/ahte-standards-catalog.json", "utf8"));
  const migration = fs.readFileSync("supabase/migrations/0013_seed_17_standard_reference_catalog.sql", "utf8");
  const publicPage = fs.readFileSync("ghscl-website/standards.html", "utf8");
  const homePage = fs.readFileSync("ghscl-website/index.html", "utf8");
  const publisher = fs.readFileSync("scripts/build-trust-journey.mjs", "utf8");

  assert.equal(operatingSet.catalog_count, 17);
  assert.equal(operatingSet.standards.length, 17);
  assert.equal(config.catalog_count, 17);
  assert.equal(config.standards.length, 17);

  for (const code of expected) {
    assert.ok(operatingSet.standards.some((s) => s.code === code), "operating set missing " + code);
    assert.ok(config.standards.some((s) => s.code === code), "machine catalogue missing " + code);
    assert.ok(migration.includes(code), "database seed missing " + code);
    assert.ok(publicPage.includes(code), "public standards page missing " + code);
    assert.ok(homePage.includes(code), "public homepage missing " + code);
  }

  assert.equal(operatingSet.supplemental_instruments[0].code, "MS 2683:2017");
  assert.ok(publicPage.includes("MS 2683:2017"));
  assert.ok(homePage.includes("MS 2683:2017"));
  assert.match(publisher, /MS_OPERATING_SET\.json/);
  assert.match(homePage, /COMPLETE MALAYSIAN \/ JAKIM STANDARDS/);
});

test("certification framework remains layered above the MS catalogue", () => {
  const operatingSet = JSON.parse(fs.readFileSync("docs/ahte/MS_OPERATING_SET.json", "utf8"));
  for (const item of ["MPPHM 2020","MHMS 2020","HAS","IHCS","protocols","circulars","authority instructions","destination rules","laboratory methods"]) {
    assert.ok(operatingSet.certification_layer.includes(item), "framework layer missing " + item);
  }
  assert.match(operatingSet.scope_rule, /MS 1500 and MS 2400 are not the entire Malaysian\/JAKIM standards universe/);
});
