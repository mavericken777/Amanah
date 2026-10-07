const journey = {
  stages: [
    ["Manufacturer onboarding","Manufacturer","China","Register the organisation, authorised representatives and market scope.","Organisation profile, KYC, roles and onboarding readiness","Establish who is accountable before product assurance begins."],
    ["Facility & production line","Manufacturer","China facility","Register the facility, production lines, controlled areas and operating scope.","Facility profile, line identity, licences, training and control ownership","Tie every later event to the correct place, line and accountable team."],
    ["Product & SKU","Product team","Product workspace","Define product, SKU, formulation/BOM, packaging and destination scope.","Product master, SKU, formula/BOM, labels and market scope","Create the exact product object that all evidence will follow."],
    ["Suppliers & raw materials","Procurement / assurance","Supplier network","Map ingredient, raw material, supplier, supplier facility/origin and supporting credentials.","Supplier graph, material lots, origin, credentials and change history","Expose substitutions, expired evidence and high-risk dependencies before production."],
    ["Standards & applicability","Assurance team","AHTE standards layer","Resolve the complete applicable Malaysian/JAKIM framework and destination requirements by scope.","Applicable instruments, requirements, controls, HCP/SCCP and source references","Apply the right controls to the right product, process, facility and market."],
    ["Documents & evidence","Assurance team","Evidence workspace","Collect and bind supporting records to the exact object, actor and event.","Documents, attestations, timestamps, signatures and integrity references","Turn fragmented records into attributable evidence."],
    ["Laboratory evidence","Laboratory","Laboratory","Create the sample, preserve seal/custody, perform the scoped method/QC and review the result.","Sample identity, custody, method, QC, result, reviewer and signed report","Scientific evidence contributes to assurance; it does not independently certify Halal."],
    ["Smart audit","Human auditor","China facility","Guide the auditor through scoped controls using smart glasses/tablet and contextual assistance.","Observations, media, notes, object IDs, control references and auditor signature","AI assists; the human auditor owns the audit conclusion."],
    ["Findings & CAPA","Manufacturer + auditor","Corrective-action workflow","Classify findings, assign actions, attach corrective evidence and re-verify affected controls.","Finding, owner, due date, corrective evidence and re-verification record","Close the evidence gap before the next authority or operational decision."],
    ["Authority workflow","Competent authority","Authority-connected workflow","Present the complete evidence dossier through the authorised authority-connectivity path.","Evidence/status exchange, authority reference and independently owned decision","AHTE supports the process; authorised humans and competent authorities decide certification."],
    ["Production & digital twin","Production / quality","Factory","Bind approved inputs, batch genealogy, line state, cleaning, training and monitored process events.","Batch, material consumption, line events, sanitation and digital-twin state","Carry verified context into live production rather than restarting the assurance story."],
    ["Origin warehouse","Warehouse operator","China warehouse","Receive, segregate, store, pick and prepare the batch for controlled dispatch.","Pallet/package IDs, zone, condition, segregation, stock movement and loading record","Preserve product identity and control state before logistics handover."],
    ["Sinotrans logistics","Sinotrans operations","China dispatch","Assign vehicle/container/seal, capture custody, GNSS, door and condition events, and manage exceptions.","Vehicle, driver, container, seal, route, telemetry and custody events","Maintain accountable custody from warehouse to port and onward."],
    ["Origin port & customs","Port / customs","China port","Reconcile shipment identity, container/seal, documentation and inspection before sovereign release.","Pre-arrival data, inspection, authority/customs status and release reference","Border release remains with the competent sovereign authority."],
    ["International transit","Carrier / Command Center","China → GCC","Monitor route, condition, seal and custody continuity while correlating exceptions.","Transit milestones, telemetry, custody and exception evidence","Keep the same evidence chain intact between jurisdictions."],
    ["GCC port & customs","Destination authority","GCC port","Process destination pre-arrival, inspection, holds and sovereign release.","Arrival, inspection, customs/authority status and release reference","AHTE never overrides a customs or sovereign hold."],
    ["GCC importer","Importer","Destination receiving","Verify shipment/product scope, reconcile container/seal and condition, then accept, quarantine or reject.","Receiving inspection, discrepancy, quarantine/acceptance and warehouse placement","Make importer acceptance a first-class evidence-backed decision."],
    ["Distributor & 3PL","Distributor","GCC distribution","Move inventory lots through warehouses and routes using FEFO/FIFO as applicable and recorded custody transfers.","Inventory lot, allocation, route, transfer, proof of delivery and withdrawal state","Preserve trust through destination distribution, not just at the border."],
    ["Retail / marketplace","Retailer / buyer","GCC market","Check listing eligibility, receive SKU/batch, manage shelf/fulfilment state and withdrawal/recall.","Listing status, receiving scan, inventory/shelf state and verification event","Carry assurance to the point where products are actually listed, sold or fulfilled."],
    ["Consumer verification & Command Center","Consumer + GHSCL operations","Market + 24/7 Command Center","Present approved verification fields while the Command Center continuously monitors exceptions, recalls and blast radius.","Approved disclosure, current verification state, alerts, incident/CAPA and recall propagation","Close the loop from origin to consumer while keeping continuous assurance active."]
  ],
  perspectives: {
    journey: ["What happens","Why it matters","What moves forward"],
    actor: ["Responsible party","Action","Next accountable handoff"],
    evidence: ["Evidence created","Object relationship","Integrity / review"],
    risk: ["Potential failure","Containment","Recovery / re-verification"]
  }
};

let currentStage=0;
let perspective="journey";
let autoplay=true;
let timer=null;
const intervalMs=5200;

const $=id=>document.getElementById(id);
const stageNav=$("stageNav");
const scrubber=$("scrubber");
const stageCount=$("stageCount");
const viewModes=$("viewModes");
const playPause=$("playPauseJourney");
const progress=$("journeyProgress");

function perspectiveDetail(stage){
  const [title,actor,place,story,evidence,why]=stage;
  if(perspective==="actor") return `<dl><dt>Responsible party</dt><dd>${actor}</dd><dt>Action</dt><dd>${story}</dd><dt>Location / workspace</dt><dd>${place}</dd></dl>`;
  if(perspective==="evidence") return `<dl><dt>Evidence created or consumed</dt><dd>${evidence}</dd><dt>Object continuity</dt><dd>The evidence remains linked to the relevant product, batch, facility, shipment or market object.</dd><dt>Review principle</dt><dd>Evidence is attributable and reviewable; integrity mechanisms do not replace accountable judgment.</dd></dl>`;
  if(perspective==="risk") return `<dl><dt>Potential failure</dt><dd>Missing, expired, contradictory, tampered or out-of-range evidence can fracture trust at this stage.</dd><dt>Containment</dt><dd>Scope the affected object and hold or quarantine it when configured controls require containment.</dd><dt>Recovery</dt><dd>Investigate → CAPA → re-verification → accountable release, escalation or recall.</dd></dl>`;
  return `<dl><dt>What happens</dt><dd>${story}</dd><dt>Why it matters</dt><dd>${why}</dd><dt>What moves forward</dt><dd>${evidence}</dd></dl>`;
}

function render(){
  const s=journey.stages[currentStage];
  if(!s) return;
  $("stageTitle").textContent=s[0];
  $("stageStory").textContent=s[3];
  $("stageWhy").textContent=s[5];
  $("modeExplanation").textContent=`${s[1]} · ${s[2]}`;
  $("stageDetail").innerHTML=perspectiveDetail(s);
  stageCount.textContent=`${String(currentStage+1).padStart(2,"0")} / ${String(journey.stages.length).padStart(2,"0")}`;
  scrubber.value=String(currentStage);
  scrubber.max=String(journey.stages.length-1);
  if(progress) progress.style.setProperty("--journey-progress", `${((currentStage+1)/journey.stages.length)*100}%`);
  [...stageNav.querySelectorAll("button")].forEach((b,i)=>{
    b.setAttribute("aria-pressed",String(i===currentStage));
    b.classList.toggle("reached",i<=currentStage);
  });
  const next=currentStage===journey.stages.length-1?0:currentStage+1;
  $("nextStage").textContent=currentStage===journey.stages.length-1?"Restart journey":"Next stage";
  $("previousStage").disabled=currentStage===0;
  const summary=$("journeySummary");
  if(summary) summary.innerHTML=`<strong>${s[0]}</strong><span>${s[1]}</span><span>${s[4]}</span>`;
}

function setStage(i,{manual=false}={}){
  currentStage=Math.max(0,Math.min(journey.stages.length-1,i));
  if(manual) pauseAutoplay();
  render();
}

function startAutoplay(){
  autoplay=true;
  if(playPause){playPause.textContent="Pause journey";playPause.setAttribute("aria-pressed","true");}
  clearInterval(timer);
  if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    timer=setInterval(()=>{currentStage=(currentStage+1)%journey.stages.length;render();},intervalMs);
  }
}
function pauseAutoplay(){
  autoplay=false;
  clearInterval(timer);
  if(playPause){playPause.textContent="Play journey";playPause.setAttribute("aria-pressed","false");}
}
function toggleAutoplay(){ autoplay?pauseAutoplay():startAutoplay(); }

journey.stages.forEach((s,i)=>{
  const b=document.createElement("button");
  b.type="button";
  b.innerHTML=`<span>${String(i+1).padStart(2,"0")}</span>${s[0]}`;
  b.addEventListener("click",()=>setStage(i,{manual:true}));
  stageNav?.appendChild(b);
});
Object.keys(journey.perspectives).forEach(key=>{
  const b=document.createElement("button");
  b.type="button";
  b.textContent=key==="journey"?"Process":key==="actor"?"People & accountability":key==="evidence"?"Evidence":"Risk & response";
  b.setAttribute("aria-pressed",String(key===perspective));
  b.addEventListener("click",()=>{
    perspective=key;
    [...viewModes.querySelectorAll("button")].forEach(x=>x.setAttribute("aria-pressed",String(x===b)));
    pauseAutoplay();
    render();
  });
  viewModes?.appendChild(b);
});
scrubber?.addEventListener("input",e=>setStage(Number(e.target.value),{manual:true}));
$("nextStage")?.addEventListener("click",()=>setStage(currentStage===journey.stages.length-1?0:currentStage+1,{manual:true}));
$("previousStage")?.addEventListener("click",()=>setStage(currentStage-1,{manual:true}));
playPause?.addEventListener("click",toggleAutoplay);

document.addEventListener("visibilitychange",()=>{ if(document.hidden) clearInterval(timer); else if(autoplay) startAutoplay(); });

render();
startAutoplay();

// Secondary interactive explainers: simple progressive controls, no internal/demo identifiers.
const auditSteps=[
  ["Scope & prepare","Select the facility, line, product and applicable controls."],
  ["Guided observation","Identify the object and capture attributable observations using smart glasses/tablet."],
  ["AI assistance","Surface relevant controls, missing evidence and possible contradictions for auditor review."],
  ["Human assessment","The auditor confirms findings and signs the audit record."],
  ["CAPA & re-verification","Correct findings, attach evidence and re-verify before the next decision."]
];
let ai=0;
function renderAudit(){const s=auditSteps[ai];if($("auditCheckpoint"))$("auditCheckpoint").textContent=s[0];if($("auditGuide"))$("auditGuide").textContent=s[1];if($("auditEvidence"))$("auditEvidence").innerHTML=`<p><strong>Checkpoint ${ai+1} of ${auditSteps.length}</strong></p><p>${s[1]}</p>`;}
$("auditNext")?.addEventListener("click",()=>{ai=(ai+1)%auditSteps.length;renderAudit()});
$("auditPrevious")?.addEventListener("click",()=>{ai=Math.max(0,ai-1);renderAudit()});
$("auditReset")?.addEventListener("click",()=>{ai=0;renderAudit()});
renderAudit();

const labSteps=["Sample request","Collection & seal","Transport & receipt","Accession & aliquot","Method & QC","Technical review","Authorised report","Evidence binding"];
let li=0;
const labHost=$("labSteps");
labSteps.forEach((name,i)=>{const b=document.createElement("button");b.type="button";b.textContent=name;b.addEventListener("click",()=>{li=i;renderLab()});labHost?.appendChild(b)});
function renderLab(){if($("labCurrent"))$("labCurrent").textContent=labSteps[li];if($("labEvidence"))$("labEvidence").innerHTML=`<p><strong>Stage ${li+1} of ${labSteps.length}</strong></p><p>The sample remains linked to identity, custody, method/QC, reviewer and product context.</p>`;[...(labHost?.querySelectorAll("button")||[])].forEach((b,i)=>b.setAttribute("aria-pressed",String(i===li)));}
renderLab();

$("consumerScan")?.addEventListener("click",()=>{const r=$("consumerRecord");if(r)r.innerHTML="<p><strong>Product verified</strong></p><p>Approved view: product identity, manufacturer, credential state, issuing authority, validity, provenance summary, selected custody confirmation and current verification state.</p>";});

window.addEventListener("beforeunload",()=>clearInterval(timer));
