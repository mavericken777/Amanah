import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const expectedCodes = [
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

test("AHTE exposes the complete 17-standard Malaysian/JAKIM operating set", async () => {
  const operatingSet = JSON.parse(await readFile("docs/ahte/MS_OPERATING_SET.json", "utf8"));
  const configSet = JSON.parse(await readFile("config/ahte-standards-catalog.json", "utf8"));
  const migration = await readFile("supabase/migrations/0013_seed_17_standard_reference_catalog.sql", "utf8");
  const publicApp = await readFile("platinum-site/src/App.tsx", "utf8");

  assert.equal(operatingSet.catalog_count, 17);
  assert.deepEqual(operatingSet.standards.map((item) => item.code), expectedCodes);
  assert.deepEqual(configSet.standards.map((item) => item.code), expectedCodes);

  for (const code of expectedCodes) {
    assert.ok(migration.includes(code), `database seed is missing ${code}`);
    assert.ok(publicApp.includes(code), `public website is missing ${code}`);
  }

  for (const instrument of ["MPPHM 2020", "MHMS 2020", "HAS", "IHCS"]) {
    assert.ok(operatingSet.certification_layer.includes(instrument), `certification/governance layer is missing ${instrument}`);
    assert.ok(publicApp.includes(instrument), `public website is missing ${instrument}`);
  }

  assert.match(operatingSet.scope_rule, /MS 1500 and MS 2400 are not treated as the entire standards universe/);
  assert.match(publicApp, /does not stop at MS 1500 and MS 2400/);
});
