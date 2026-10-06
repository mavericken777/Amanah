/* One illustrative record. Never used as production evidence or Shipment 001. */
const journey = {
  product: 'Premium Halal Food Product', batch: 'CN-DEMO-24001', shipment: 'DEMO-SHIPMENT-001',
  stages: [
    ['Origin','Manufacturer','China facility','Register producer, facility, ingredients and product identity.','Facility scope, supplier provenance, formulation and packaging records','Establish the object and its source before assessment.','INITIAL','Manufacturer'],
    ['Identity','Manufacturer','China facility','Associate the SKU, lot, batch and destination with one product.','SKU-DEMO-01, lot CN-LOT-01, product dossier and destination scope','Bind every later observation to the same object.','INITIAL','Manufacturer'],
    ['Audit','Human auditor','Ingredient storage','Inspect materials, segregation, sanitation, packaging and labels with AI guidance.','Attributable checklist, observations, media manifest and auditor sign-off','Human auditors assess observations; AI prompts and organizes evidence.','INITIAL','Manufacturer'],
    ['Lab','Laboratory reviewer','China laboratory','Seal a sample, record custody, apply the scoped method and review the result.','SAMPLE-DEMO-01, custody record, method/QC record and signed review','A reviewed result supports a control; NOT_DETECTED ≠ HALAL.','INITIAL','Laboratory'],
    ['Standards','Assurance team','Evidence workspace','Map applicable instruments to controls and retrievable evidence.','Applicability assessment, HCP/SCCP, audit test and source binding','Complete Malaysian/JAKIM framework and destination requirements govern applicability.','EVIDENCE-COMPLETE','Manufacturer'],
    ['Warehouse','Warehouse operator','China warehouse','Receive, segregate, inspect and prepare the batch for dispatch.','Zone record, receiving inspection, handling and temperature history','Preserve segregation and accountable handling.','ASSESSED','Warehouse'],
    ['Logistics','Logistics operator','China dispatch','Record pickup, container assignment, loading, seal and custody transfer.','CONTAINER-DEMO-01, SEAL-DEMO-01 and signed transfer manifest','Sinotrans is the reference logistics workflow; operational connections require authorization.','ASSESSED','Logistics provider'],
    ['Export port','Port / customs officer','China export port','Reconcile container, seal, documents and vessel loading.','Port receipt, seal inspection, export decision reference and loading event','Export release stays with the sovereign authority.','ASSESSED','Carrier'],
    ['Transit','Carrier / Command Center','Maritime route','Follow location, condition, seal and custody signals between ports.','Illustrative 4.2°C observation, route event and custody lineage','GHSCL + JAKIM Command Center coordinates monitoring and exception review.','ASSESSED','Carrier'],
    ['GCC port','Destination authority','GCC port','Inspect destination documentation and record the competent release decision.','Inspection record, destination applicability and sovereign decision reference','AHTE trust assessment cannot release a customs or authority hold.','ASSESSED','Importer'],
    ['Distribution','Importer / distributor','GCC receiving warehouse','Receive the same batch, maintain segregation and record distribution.','Receipt, warehouse controls, transfer and dispatch events','Trust context continues after import, across every receiving party.','ASSESSED','Distributor'],
    ['Retail','Retail receiving team','GCC retail','Check receipt, product identity, storage and authorized disclosure.','Store receipt, handling controls and issuer disclosure reference','Retail controls and expiry remain part of ongoing assurance.','ASSESSED','Retailer'],
    ['Consumer','Consumer','GCC consumer','Explore origin, handling and the evidence behind the journey.','Authorized provenance view linked to the same product identity','QR/NFC reveals a disclosure; it does not create Halal certification.','ASSESSED','Consumer']
  ],
  audit: ['Auditor login','Facility confirmation','Audit scope','AI-guided checklist','Ingredient inspection','Process inspection','Segregation check','Sanitation / cleaning','Packaging check','Label check','Evidence capture','Finding / observation','Auditor sign-off','Audit record created'],
  lab: ['Sample created','Sample sealed','Custody recorded','Lab receives sample','Identity verified','Test panel / method QC','Result generated','Reviewer signature','Result linked to batch','Evidence record updated'],
  actors: [
    ['Manufacturer','Creates facility, product, supplier and process evidence; consumes applicability and corrective actions.','Origin, identity and readiness'],
    ['Human auditor','Inspects controls, captures attributable observations and signs findings; consumes requirements and evidence.','Accountable audit judgment'],
    ['Certification / assurance body','Reviews the scoped dossier and authority workflow; consumes audit and re-verification evidence.','Competent authority owns certification'],
    ['Laboratory','Creates sample custody, method/QC and reviewed result records; consumes sample identity and test scope.','Evidence within verified accreditation and scope'],
    ['Warehouse','Records receiving, segregation, handling and dispatch; consumes product and custody records.','Safe, accountable storage'],
    ['Logistics provider','Records transfers, container, seal and condition; consumes dispatch identity and handling requirements.','Sinotrans reference workflow'],
    ['Port authority','Records receipt, inspection and official decisions; consumes authorized documents and evidence.','Sovereign release'],
    ['Importer','Reconciles destination scope, receiving and release references.','Destination responsibility'],
    ['Distributor','Records downstream custody and handling; consumes receiving evidence.','Continuous provenance'],
    ['Retailer','Records store receipt and storage; consumes product disclosure.','Inspectable consumer information'],
    ['Consumer','Consumes authorized origin, handling and provenance information.','Accessible evidence behind the journey'],
    ['Regulator','Consumes authorized lineage, findings and exception records within legal scope.','Independent authority decisions']
  ],
  layers: [
    ['Amanah experience','Operational workflows and authorized public disclosure.','Origin, audit, custody and consumer views'],
    ['Identity / authorization / tenant','Organization context, role permissions and RLS protect scoped records.','Actor access and attributable actions'],
    ['AHTE controls / evidence','Applicability, HCP/SCCP, evidence graphs, digital twins and event fabric.','Assessment, audit tests and provenance'],
    ['Integrity / audit trail','Append-only records, hashes, signatures and supersession preserve lineage. Hash proves integrity, not truth.','Every evidence event'],
    ['AI / preemptive strategy','D0–D2 support; configured D4 holds; CAPA, prediction and recall/blast-radius analysis.','Monitoring and corrective action'],
    ['Direct JAKIM API','AHTE ⇄ Direct JAKIM API ⇄ JAKIM. Connector: PENDING_AUTHORIZATION.','Authority submission and decision references'],
    ['Ports / finance / Takaful','Authorized sovereign interfaces and provider review; separate customs and finance states.','Border release, claims evidence and approved financing']
  ]
};
if (typeof document !== 'undefined') {
  const $ = id => document.getElementById(id);
  let index = 0, mode = 'Journey', auditStep = 0, labStep = 0, exception = '', passportTab = 'Overview', monitorView = 'Map';
  const element = (tag, text, cls) => { const el = document.createElement(tag); el.textContent = text; if (cls) el.className = cls; return el; };
  const buttons = (host, labels, action) => labels.forEach((label, i) => { const b = element('button', label); b.type = 'button'; b.addEventListener('click', () => action(i, label)); host.append(b); });
  function fields(host, values) { host.replaceChildren(); const dl = document.createElement('dl'); values.forEach(([key,val]) => { dl.append(element('dt',key),element('dd',val)); }); host.append(dl); }
  function renderPassport() {
    const s = journey.stages[index];
    const views = {
      Overview: [['Product',journey.product],['Batch',journey.batch],['Shipment',journey.shipment],['Origin → destination','China → GCC direct'],['Stage',s[0]],['Custody',s[7]],['Illustrative evidence events',String(index+1)],['AHTE demonstration state',exception ? 'HOLD' : s[6]],['Authority / customs','No decision asserted'],['Operational / finance','No release or approval asserted']],
      Identity: [['Product',journey.product],['SKU','SKU-DEMO-01'],['Batch',journey.batch],['Lot','CN-LOT-01'],['Facility','Demonstration China facility'],['Destination','GCC']],
      Audit: [['Session','AUDIT-DEMO-01'],['Checkpoint',journey.audit[auditStep]],['Actor','Human auditor'],['Decision','Auditor assessment; authority certification separate']],
      Lab: [['Sample','SAMPLE-DEMO-01'],['Batch',journey.batch],['Step',journey.lab[labStep]],['Method / normative result','DATA NOT AVAILABLE — SOURCE-LOCKED'],['Meaning','Reviewed lab evidence ≠ Halal certification']],
      Custody: [['Current holder',s[7]],['Transfer','Outgoing → incoming actor'],['Evidence','Signed transfer and seal record'],['Batch',journey.batch]],
      Logistics: [['Shipment',journey.shipment],['Container','CONTAINER-DEMO-01'],['Seal','SEAL-DEMO-01'],['Location',s[2]]],
      Policy: [['Framework','MPPHM · MHMS · HAS · IHCS · protocols · circulars · authority instructions'],['Destination','Applicable GCC requirements'],['Exact clause','DATA NOT AVAILABLE — SOURCE-LOCKED']],
      Timeline: journey.stages.slice(0,index+1).map((v,i)=>[`Event ${i+1}`,`${v[0]} · ${v[1]}`]),
      Provenance: [['ObjectID',journey.batch],['EventID',`EVENT-DEMO-${index+1}`],['EvidenceID',`EVIDENCE-DEMO-${index+1}`],['ActorID',`ACTOR-DEMO-${index+1}`],['Timestamp','2026-10-05T08:00:00Z · illustrative'],['IntegrityProof','Demonstration placeholder; no signature claimed']]
    };
    fields($('passportBody'), views[passportTab]);
    [...$('passportTabs').children].forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===passportTab)));
  }
  function renderMonitor() {
    const s=journey.stages[index];
    $('monitorPanel').textContent={
      Map:`China → maritime route → GCC; current stage: ${s[2]}`,
      Timeline:`${index+1} illustrative events; inspect each event in the synchronized timeline.`,
      Custody:`Current holder: ${s[7]}`,
      Evidence:`${journey.batch} · EVENT-DEMO-${index+1} · provenance and integrity obligations apply.`,
      Exceptions:exception||'Select an exception scenario below.'
    }[monitorView];
    [...$('monitorViews').children].forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===monitorView)));
  }
  function render() {
    const s = journey.stages[index];
    $('stageTitle').textContent = `${String(index+1).padStart(2,'0')} / ${s[0]}`;
    $('stageStory').textContent = s[3]; $('stageWhy').textContent = s[5];
    fields($('stageDetail'), mode === 'Standards' ? [['Requirement','Applicable Malaysian/JAKIM and destination instruments'],['Control objective',s[5]],['Evidence',s[4]],['Responsible actor',s[1]],['Exact normative clause','DATA NOT AVAILABLE — SOURCE-LOCKED']] : [['Actor',s[1]],['Location',s[2]],['Evidence created',s[4]],['What changed',s[5]],['ObjectID',journey.batch],['EventID',`EVENT-DEMO-${index+1}`]]);
    $('modeExplanation').textContent = {Journey:s[3],Trust:`Physical event → identity → evidence → applicable control → attributable assessment. ${s[5]}`,Actor:`${s[1]} acts at ${s[2]}. ${s[5]}`,Standards:'Applicable requirements become controls, evidence obligations and audit tests. Open the detail to inspect the mapping.',Custody:`${s[7]} holds the product at this stage. Every transfer binds actors, time, location, seal and evidence.`,Monitoring:`${s[2]} · illustrative temperature 4.2°C · ${exception ? exception+' / HOLD' : 'no scenario exception selected'}`,Consumer:'Know where it came from. Understand how it was handled. See the evidence behind the journey.',Technical:'ObjectID + EventID + EvidenceID + ActorID + Timestamp + IntegrityProof; append-only correction by supersession.'}[mode];
    $('scrubber').value = String(index); $('stageCount').textContent = `${index+1} / ${journey.stages.length} · ${s[0]}`;
    $('previousStage').disabled=index===0; $('nextStage').disabled=index===journey.stages.length-1;
    [...$('stageNav').children].forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===index));});
    [...$('viewModes').children].forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===mode)));
    [...$('routeNodes').children].forEach((b,i)=>{b.classList.toggle('reached',i<=index);b.setAttribute('aria-pressed',String(i===index));});
    const route=$('journeyRoute'); const point=route.getPointAtLength(route.getTotalLength()*index/(journey.stages.length-1)); $('routeMarker').setAttribute('cx',String(point.x)); $('routeMarker').setAttribute('cy',String(point.y));
    $('routeLocation').textContent = `${s[2]} · ${s[7]} · ${journey.batch}`;
    $('timeline').replaceChildren(); journey.stages.slice(0,index+1).forEach((v,i)=>{const b=element('button',`${String(i+1).padStart(2,'0')} · ${v[0]} · ${v[1]}`);b.type='button';b.addEventListener('click',()=>select(i));$('timeline').append(b);});
    $('custodyHolder').textContent=s[7]; renderMonitor(); renderPassport();
  }
  function select(i) { index=i; render(); }
  buttons($('stageNav'),journey.stages.map(s=>s[0]),select);
  buttons($('routeNodes'),journey.stages.map(s=>s[0]),select);
  buttons($('viewModes'),['Journey','Trust','Actor','Standards','Custody','Monitoring','Consumer','Technical'],(_,v)=>{mode=v;render();});
  buttons($('passportTabs'),['Overview','Identity','Audit','Lab','Custody','Logistics','Policy','Timeline','Provenance'],(_,v)=>{passportTab=v;renderPassport();});
  $('scrubber').addEventListener('input',e=>select(Number(e.target.value)));
  $('previousStage').addEventListener('click',()=>select(Math.max(0,index-1)));
  $('nextStage').addEventListener('click',()=>select(Math.min(journey.stages.length-1,index+1)));
  function auditRender() { $('auditCheckpoint').textContent=journey.audit[auditStep]; $('auditGuide').textContent=auditStep<10?'AI guidance: reconcile this checkpoint against the applicable control and capture attributable evidence.':'Human review: assess the observation, record findings and sign the attributable audit record.'; fields($('auditEvidence'),[['Batch',journey.batch],['Checkpoint',journey.audit[auditStep]],['Actor','AUDITOR-DEMO-01'],['EvidenceID',`AUDIT-EVIDENCE-DEMO-${auditStep+1}`],['Time / location','2026-10-05T08:00:00Z · illustrative China facility'],['Record',auditStep===13?'Illustrative audit record formed':'Evidence obligation shown; no actual audit asserted']]); $('auditPrevious').disabled=auditStep===0; $('auditNext').disabled=auditStep===13; renderPassport(); }
  $('auditNext').addEventListener('click',()=>{auditStep=Math.min(13,auditStep+1);auditRender();});
  $('auditPrevious').addEventListener('click',()=>{auditStep=Math.max(0,auditStep-1);auditRender();});
  $('auditReset').addEventListener('click',()=>{auditStep=0;auditRender();});
  buttons($('labSteps'),journey.lab, i=>{labStep=i;$('labCurrent').textContent=journey.lab[i];fields($('labEvidence'),[['Sample','SAMPLE-DEMO-01'],['Batch',journey.batch],['Custody','Collector → courier → laboratory'],['Step',journey.lab[i]],['Method / QC / result','Source-bound method and review required; no analytical result fabricated'],['Reviewer','Authorized laboratory reviewer']]);renderPassport();[...$('labSteps').children].forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));});
  buttons($('warehouseZones'),['Receiving','Quarantine','Halal storage','Separation','Picking','Dispatch','Cold storage','Inspection'],(_,zone)=>fields($('warehouseDetail'),[['Zone',zone],['Batch',journey.batch],['Control','Segregation, contamination prevention and attributable handling'],['Condition','Illustrative 4.2°C'],['Custody','Warehouse operator'],['Evidence','Zone, receiving and handling records']]));
  buttons($('custodyRibbon'),['Manufacturer','Logistics provider','Warehouse','Port','Carrier','Importer','Distributor'],(i,actor)=>fields($('custodyDetail'),[['Outgoing',i?$('custodyRibbon').children[i-1].textContent:'Origin'],['Incoming',actor],['Batch',journey.batch],['Time','2026-10-05T08:00:00Z · illustrative'],['Seal','SEAL-DEMO-01'],['Evidence','Attributable transfer manifest; no actual signature asserted']]));
  buttons($('portNodes'),['Container','Seal','Documents','Inspection','Vessel','Release'],(_,node)=>fields($('portDetail'),[['Checkpoint',node],['Actor','Port / customs authority'],['Action','Reconcile scoped identity and authorized evidence'],['Object',journey.shipment],['Result','Illustrative obligation; no sovereign release asserted'],['Trust impact','AHTE, authority and customs states stay separate']]));
  buttons($('monitorViews'),['Map','Timeline','Custody','Evidence','Exceptions'],(_,view)=>{monitorView=view;renderMonitor();});
  buttons($('exceptionButtons'),['Temperature excursion','Seal mismatch','Missing custody event','Document mismatch','Route deviation'],(_,v)=>{exception=v;$('exceptionState').textContent=`${v} → alert → policy assessment → HOLD → investigation → corrective action → re-verification → human / competent-authority gate. No automatic release.`;render();});
  $('resetException').addEventListener('click',()=>{exception='';$('exceptionState').textContent='Scenario reset. No real-world hold or release was changed.';render();});
  buttons($('actorButtons'),journey.actors.map(a=>a[0]),i=>fields($('actorDetail'),[['Role',journey.actors[i][0]],['Creates / consumes',journey.actors[i][1]],['Value and responsibility',journey.actors[i][2]]]));
  buttons($('architectureButtons'),journey.layers.map(a=>a[0]),i=>fields($('architectureDetail'),[['Layer',journey.layers[i][0]],['Purpose',journey.layers[i][1]],['Journey dependency',journey.layers[i][2]]]));
  $('consumerScan').addEventListener('click',()=>{select(12);fields($('consumerRecord'),[['Product',journey.product],['Batch',journey.batch],['Origin','China'],['Journey','Audit → lab → custody → GCC retail'],['Halal information','Authority-issued information must be separately verified'],['Disclosure','Illustrative consumer view; no certification asserted']]);});
  render(); auditRender(); $('labSteps').firstElementChild.click(); $('warehouseZones').firstElementChild.click(); $('custodyRibbon').firstElementChild.click(); $('portNodes').firstElementChild.click(); $('actorButtons').firstElementChild.click(); $('architectureButtons').firstElementChild.click();
}
if (typeof module !== 'undefined') module.exports = journey;
