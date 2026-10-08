import test from"node:test";import assert from"node:assert/strict";import{readFileSync}from"node:fs";
const adapters=readFileSync(new URL("../docs/integration/PORT_CUSTOMS_REGULATORY_ADAPTER_ARCHITECTURE_2026-10-02.md",import.meta.url),"utf8");
const ai=readFileSync(new URL("../docs/ai/AI_INTEGRATION_COPILOT_2026-10-02.md",import.meta.url),"utf8");
const api=readFileSync(new URL("../docs/api/API_CONTRACT_PACKAGE_2026-10-02.md",import.meta.url),"utf8");
const kit=readFileSync(new URL("../docs/integration/PARTNER_INTEGRATION_KIT_2026-10-02.md",import.meta.url),"utf8");
test("adapter perimeter covers required protocols",()=>{for(const x of["REST","SOAP","XML","EDI","CSV","SFTP","MQ","webhooks","events"])assert.match(adapters,new RegExp(x));});
test("AI supports the named certification decision makers",()=>{assert.match(ai,/cannot execute authorised certification decision workflow/);});
test("API package includes core contract controls",()=>{for(const x of["OpenAPI","AsyncAPI","OAuth2","mTLS","idempotency","rate-limit","deprecation","PENDING_AUTHORIZATION"])assert.match(api,new RegExp(x));});
test("partner kit includes sandbox UAT production sequence",()=>{for(const x of["sandbox","UAT","production credentials"])assert.match(kit,new RegExp(x,"i"));});
