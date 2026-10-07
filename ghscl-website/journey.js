const journey = {
  stages: [
    ["Manufacturer onboarding","Manufacturer","China","Register the organisation, authorised representatives and market scope.","Organisation profile, KYC, roles and onboarding readiness","Establish who is accountable before product assurance begins.","Manufacturer"],
    ["Facility & production line","Manufacturer","China facility","Register the facility, production lines, controlled areas and operating scope.","Facility profile, line identity, licences, training and control ownership","Tie every later event to the correct place, line and accountable team.","Manufacturer"],
    ["Product & SKU","Product team","Product workspace","Define product, SKU, formulation/BOM, packaging and destination scope.","Product master, SKU, formula/BOM, labels and market scope","Create the exact product object that all evidence will follow.","Manufacturer"],
    ["Suppliers & raw materials","Procurement / assurance","Supplier network","Map ingredient, raw material, supplier, supplier facility/origin and supporting credentials.","Supplier graph, material lots, origin, credentials and change history","Expose substitutions, expired evidence and high-risk dependencies before production.","Supplier"],
    ["Standards & applicability","Assurance team","AHTE standards layer","Resolve the complete applicable Malaysian/JAKIM framework and destination requirements by scope.","Applicable instruments, requirements, controls, HCP/SCCP and source references","Apply the right controls to the right product, process, facility and market.","Assurance"],
    ["Documents & evidence","Assurance team","Evidence workspace","Collect and bind supporting records to the exact object, actor and event.","Documents, attestations, timestamps, signatures and integrity references","Turn fragmented records into attributable evidence.","Assurance"],
    ["Laboratory evidence","Laboratory","Laboratory","Create the sample, preserve seal/custody, perform the scoped method/QC and review the result.","Sample identity, custody, method, QC, result, reviewer and signed report","Scientific evidence contributes to assurance; it does not independently certify Halal.","Laboratory"],
    ["Smart audit","Human auditor","China facility","Guide the auditor through scoped controls using smart glasses/tablet and contextual assistance.","Observations, media, notes, object IDs, control references and auditor signature","AI assists; the human auditor owns the audit conclusion.","Auditor"],
    ["Findings & CAPA","Manufacturer + auditor","Corrective-action workflow","Classify findings, assign actions, attach corrective evidence and re-verify affected controls.","Finding, owner, due date, corrective evidence and re-verification record","Close the evidence gap before the next authority or operational decision.","Assurance"],
    ["Authority workflow","Competent authority","Authority-connected workflow","Present the complete evidence dossier through the authorised authority-connectivity path.","Evidence/status exchange, authority reference and independently owned decision","AHTE supports the process; authorised humans and competent authorities decide certification.","Authority"],
    ["Production & digital twin","Production / quality","Factory","Bind approved inputs, batch genealogy, line state, cleaning, training and monitored process events.","Batch, material consumption, line events, sanitation and digital-twin state","Carry verified context into live production rather than restarting the assurance story.","Manufacturer"],
    ["Origin warehouse","Warehouse operator","China warehouse","Receive, segregate, store, pick and prepare the batch for controlled dispatch.","Pallet/package IDs, zone, condition, segregation, stock movement and loading record","Preserve product identity and control state before logistics handover.","Warehouse"],
    ["Sinotrans logistics","Sinotrans operations","China dispatch","Assign vehicle/container/seal, capture custody, GNSS, door and condition events, and manage exceptions.","Vehicle, driver, container, seal, route, telemetry and custody events","Maintain accountable custody from warehouse to port and onward.","Logistics provider"],
    ["Origin port & customs","Port / customs","China port","Reconcile shipment identity, container/seal, documentation and inspection before sovereign release.","Pre-arrival data, inspection, authority/customs status and release reference","Border release remains with the competent sovereign authority.","Port / customs"],
    ["International transit","Carrier / Command Center","China → GCC","Monitor route, condition, seal and custody continuity while correlating exceptions.","Transit milestones, telemetry, custody and exception evidence","Keep the same evidence chain intact between jurisdictions.","Carrier"],
    ["GCC port & customs","Destination authority","GCC port","Process destination pre-arrival, inspection, holds and sovereign release.","Arrival, inspection, customs/authority status and release reference","AHTE never overrides a customs or sovereign hold.","Port / customs"],
    ["GCC importer","Importer","Destination receiving","Verify shipment/product scope, reconcile container/seal and condition, then accept, quarantine or reject.","Receiving inspection, discrepancy, quarantine/acceptance and warehouse placement","Make importer acceptance a first-class evidence-backed decision.","Importer"],
    ["Distributor & 3PL","Distributor","GCC distribution","Move inventory lots through warehouses and routes using FEFO/FIFO as applicable and recorded custody transfers.","Inventory lot, allocation, route, transfer, proof of delivery and withdrawal state","Preserve trust through destination distribution, not just at the border.","Distributor"],
    ["Retail / marketplace","Retailer / buyer","GCC market","Check listing eligibility, receive SKU/batch, manage shelf/fulfilment state and withdrawal/recall.","Listing status, receiving scan, inventory/shelf state and verification event","Carry assurance to the point where products are actually listed, sold or fulfilled.","Retailer"],
    ["Consumer verification & Command Center","Consumer + GHSCL operations","Market + 24/7 Command Center","Present approved verification fields while the Command Center continuously monitors exceptions, recalls and blast radius.","Approved disclosure, current verification state, alerts, incident/CAPA and recall propagation","Close the loop from origin to consumer while continuous assurance remains active.","Consumer"]
  ],
  audit:["Scope & prepare","Facility confirm","Control selection","Smart-glass guidance","Object identification","Observation capture","Evidence tagging","AI-assisted gap review","Human assessment","Finding / CAR","Corrective action","Re-verification","Auditor sign-off","Session sync"],
  lab:["Test requirement","Sample request","Sample identity","Collection & seal","Custody transport","Receipt & seal verification","Accession & aliquot","Method & QC","Result","Technical review","Authorised report","Evidence binding"],
  actors:[
    ["Manufacturer","Creates organisation, facility, product, supplier, production and corrective-action evidence.","Origin readiness and controlled production"],
    ["Human auditor","Inspects controls, captures attributable observations and signs audit conclusions.","Accountable audit judgment"],
    ["Competent authority","Reviews the scoped dossier and owns formal certification decisions.","Authority decision"],
    ["Laboratory","Creates sample-custody, method/QC, technical-review and signed-report evidence.","Scientific evidence"],
    ["Warehouse","Records receiving, segregation, storage, handling and dispatch.","Controlled storage"],
    ["Sinotrans / logistics","Records transfers, vehicle/container/seal, route and condition events.","Digital chain of custody"],
    ["Port / customs","Records inspection and sovereign release decisions.","Border authority"],
    ["Importer","Reconciles destination scope, receiving, discrepancy, quarantine and acceptance.","Destination receiving"],
    ["Distributor / 3PL","Manages inventory lots, allocation, route and custody transfer.","Destination distribution"],
    ["Retailer / marketplace","Manages listing, receiving, inventory/shelf or fulfilment state and withdrawal.","Market execution"],
    ["Consumer / buyer","Consumes approved verification fields.","Purpose-bound disclosure"],
    ["Command Center","Monitors evidence, exceptions, prediction, CAPA, recall and blast radius.","Continuous assurance"]
  ],
  layers:[
    ["Amanah experience","Operational workflows and approved verification experiences.","Origin through market operations"],
    ["Identity & access","Organisation, user, role and tenant controls protect scoped records.","Accountable access"],
    ["AHTE standards & evidence","Applicability, controls, HCP/SCCP, evidence graph, digital twins and event fabric.","Assurance and provenance"],
    ["Integrity & audit trail","Append-only history, signatures, hashes and supersession preserve lineage.","Every evidence event"],
    ["AI & preemptive strategy","D0–D2 support, configured D4 holds, prediction, CAPA and blast-radius analysis.","Decision support"],
    ["Authority connectivity","AHTE ⇄ Direct JAKIM API ⇄ JAKIM.","Authority evidence/status exchange"],
    ["Ports, finance & Takaful","Purpose-bound evidence supports separately owned sovereign and commercial decisions.","Border, finance and claims workflows"]
  ]
};

if(typeof document!=="undefined"){
  const $=id=>document.getElementById(id);
  const element=(tag,text,cls)=>{const el=document.createElement(tag);el.textContent=text;if(cls)el.className=cls;return el;};
  const buttons=(host,labels,action)=>{if(!host)return;host.replaceChildren();labels.forEach((label,i)=>{const b=element("button",label);b.type="button";b.addEventListener("click",()=>action(i,label));host.append(b);});};
  const fields=(host,values)=>{if(!host)return;host.replaceChildren();const dl=document.createElement("dl");values.forEach(([k,v])=>dl.append(element("dt",k),element("dd",v)));host.append(dl);};

  let index=0, mode="Process", auditStep=0, labStep=0, exception="", monitorView="Map", autoplay=true, timer=null;
  const intervalMs=5200;

  function pause(){autoplay=false;clearInterval(timer);if($("playPauseJourney")){$("playPauseJourney").textContent="Resume journey";$("playPauseJourney").setAttribute("aria-pressed","false");}}
  function play(){autoplay=true;clearInterval(timer);if($("playPauseJourney")){$("playPauseJourney").textContent="Pause journey";$("playPauseJourney").setAttribute("aria-pressed","true");}if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)timer=setInterval(()=>{index=(index+1)%journey.stages.length;render();},intervalMs);}
  function select(i,manual=true){index=Math.max(0,Math.min(journey.stages.length-1,i));if(manual)pause();render();}

  function renderMonitor(){
    if(!$("monitorPanel"))return;
    const s=journey.stages[index];
    const views={
      Map:`China → GCC direct · current stage: ${s[2]}`,
      Timeline:`${index+1} process stages reached; select a stage above to inspect the chain.`,
      Custody:`Current accountable holder: ${s[6]}`,
      Evidence:s[4],
      Exceptions:exception||"No active scenario selected."
    };
    $("monitorPanel").textContent=views[monitorView]||views.Map;
    [...($("monitorViews")?.children||[])].forEach(b=>b.setAttribute("aria-pressed",String(b.textContent===monitorView)));
  }

  function detailFor(s){
    if(mode==="People & accountability")return [["Responsible party",s[1]],["Location / workspace",s[2]],["Action",s[3]],["Next accountable holder",s[6]]];
    if(mode==="Evidence")return [["Evidence created or consumed",s[4]],["Object continuity","Evidence remains linked to the relevant product, batch, facility, shipment or market object."],["Review principle","Integrity and provenance support accountable review; they do not replace human judgment."]];
    if(mode==="Risk & response")return [["Potential failure","Missing, expired, contradictory, tampered or out-of-range evidence can fracture trust at this stage."],["Containment","Scope the affected object and hold or quarantine it when configured controls require containment."],["Recovery","Investigate → CAPA → re-verification → accountable release, escalation or recall."]];
    return [["What happens",s[3]],["Why it matters",s[5]],["What moves forward",s[4]]];
  }

  function render(){
    const s=journey.stages[index];
    if($("stageTitle"))$("stageTitle").textContent=s[0];
    if($("stageStory"))$("stageStory").textContent=s[3];
    if($("stageWhy"))$("stageWhy").textContent=s[5];
    if($("modeExplanation"))$("modeExplanation").textContent=`${s[1]} · ${s[2]}`;
    fields($("stageDetail"),detailFor(s));
    if($("scrubber")){$("scrubber").value=String(index);$("scrubber").max=String(journey.stages.length-1);}
    if($("stageCount"))$("stageCount").textContent=`${String(index+1).padStart(2,"0")} / ${String(journey.stages.length).padStart(2,"0")}`;
    if($("journeyProgress"))$("journeyProgress").style.setProperty("--journey-progress",`${((index+1)/journey.stages.length)*100}%`);
    [...($("stageNav")?.children||[])].forEach((b,i)=>{b.setAttribute("aria-pressed",String(i===index));b.classList.toggle("reached",i<=index);});
    [...($("viewModes")?.children||[])].forEach(b=>b.setAttribute("aria-pressed",String(b.textContent===mode)));
    if($("previousStage"))$("previousStage").disabled=index===0;
    if($("nextStage"))$("nextStage").textContent=index===journey.stages.length-1?"Restart journey":"Next stage";
    if($("journeySummary"))$("journeySummary").innerHTML=`<strong>${s[0]}</strong><span>${s[1]}</span><span>${s[4]}</span>`;

    if($("routeNodes")){
      [...$("routeNodes").children].forEach((b,i)=>{b.classList.toggle("reached",i<=index);b.setAttribute("aria-pressed",String(i===index));});
      const route=$("journeyRoute"), marker=$("routeMarker");
      if(route&&marker){const point=route.getPointAtLength(route.getTotalLength()*index/(journey.stages.length-1));marker.setAttribute("cx",String(point.x));marker.setAttribute("cy",String(point.y));}
      if($("routeLocation"))$("routeLocation").textContent=`${s[2]} · ${s[6]}`;
    }

    if($("timeline")){
      $("timeline").replaceChildren();
      journey.stages.slice(0,index+1).forEach((v,i)=>{const b=element("button",`${String(i+1).padStart(2,"0")} · ${v[0]} · ${v[1]}`);b.type="button";b.addEventListener("click",()=>select(i));$("timeline").append(b);});
    }
    if($("custodyHolder"))$("custodyHolder").textContent=s[6];
    renderMonitor();
  }

  buttons($("stageNav"),journey.stages.map((s,i)=>`${String(i+1).padStart(2,"0")} · ${s[0]}`),(i)=>select(i));
  buttons($("routeNodes"),journey.stages.map(s=>s[0]),i=>select(i));
  buttons($("viewModes"),["Process","People & accountability","Evidence","Risk & response"],(_,v)=>{mode=v;pause();render();});
  $("scrubber")?.addEventListener("input",e=>select(Number(e.target.value)));
  $("previousStage")?.addEventListener("click",()=>select(index-1));
  $("nextStage")?.addEventListener("click",()=>select(index===journey.stages.length-1?0:index+1));
  $("playPauseJourney")?.addEventListener("click",()=>autoplay?pause():play());
  $("restartJourney")?.addEventListener("click",()=>{index=0;render();play();});

  function auditRender(){
    if(!$("auditCheckpoint"))return;
    $("auditCheckpoint").textContent=journey.audit[auditStep];
    if($("auditGuide"))$("auditGuide").textContent=auditStep<8?"Contextual guidance: reconcile this checkpoint against the applicable control and capture attributable evidence.":"Human review: assess the observation, record findings and sign the attributable audit record.";
    fields($("auditEvidence"),[["Checkpoint",journey.audit[auditStep]],["Actor","Assigned human auditor"],["Evidence","Object-linked observation, media/note and control reference"],["Decision","Audit conclusion remains human-owned; certification remains with the competent authority."]]);
    if($("auditPrevious"))$("auditPrevious").disabled=auditStep===0;
    if($("auditNext"))$("auditNext").disabled=auditStep===journey.audit.length-1;
  }
  $("auditNext")?.addEventListener("click",()=>{auditStep=Math.min(journey.audit.length-1,auditStep+1);auditRender();});
  $("auditPrevious")?.addEventListener("click",()=>{auditStep=Math.max(0,auditStep-1);auditRender();});
  $("auditReset")?.addEventListener("click",()=>{auditStep=0;auditRender();});

  buttons($("labSteps"),journey.lab,(i)=>{labStep=i;if($("labCurrent"))$("labCurrent").textContent=journey.lab[i];fields($("labEvidence"),[["Step",journey.lab[i]],["Identity","Sample remains bound to product/batch context"],["Custody","Collector → courier → laboratory → authorised reviewer"],["Method / QC","Applicable method and QC scope must be verified"],["Meaning","Laboratory evidence contributes to assurance; it does not independently certify Halal."]]);[...($("labSteps")?.children||[])].forEach((b,j)=>b.setAttribute("aria-pressed",String(i===j)));});

  buttons($("warehouseZones"),["Receiving","Quarantine","Halal storage","Segregation","Picking","Dispatch","Cold storage","Inspection"],(_,zone)=>fields($("warehouseDetail"),[["Zone",zone],["Control","Segregation, contamination prevention and attributable handling"],["Condition","Configured environmental controls where applicable"],["Custody","Warehouse operator"],["Evidence","Zone, receiving, handling and release records"]]));
  buttons($("custodyRibbon"),["Manufacturer","Warehouse","Sinotrans","Port","Carrier","Importer","Distributor","Retailer"],(i,actor)=>fields($("custodyDetail"),[["Outgoing",i?$("custodyRibbon").children[i-1].textContent:"Origin"],["Incoming",actor],["Evidence","Attributable custody-transfer event"],["Integrity","Actor, time, location, object and condition remain linked"]]));
  buttons($("portNodes"),["Shipment","Container","Seal","Documents","Inspection","Release"],(_,node)=>fields($("portDetail"),[["Checkpoint",node],["Actor","Port / customs authority"],["Action","Reconcile identity and authorised evidence"],["Decision","Sovereign hold/release remains externally owned"],["AHTE role","Provide attributable evidence and preserve status separation"]]));
  buttons($("monitorViews"),["Map","Timeline","Custody","Evidence","Exceptions"],(_,view)=>{monitorView=view;renderMonitor();});
  buttons($("exceptionButtons"),["Temperature excursion","Seal mismatch","Missing custody event","Document mismatch","Route deviation"],(_,v)=>{exception=v;if($("exceptionState"))$("exceptionState").textContent=`${v} → DETECTED → CLASSIFIED → CONTAINED / HOLD → INVESTIGATING → CAPA → RE-VERIFICATION → CLOSED / ESCALATED / RECALLED`;render();});
  $("resetException")?.addEventListener("click",()=>{exception="";if($("exceptionState"))$("exceptionState").textContent="Select a scenario to inspect the hold and review path.";render();});
  buttons($("actorButtons"),journey.actors.map(a=>a[0]),i=>fields($("actorDetail"),[["Role",journey.actors[i][0]],["Creates / consumes",journey.actors[i][1]],["Responsibility",journey.actors[i][2]]]));
  buttons($("architectureButtons"),journey.layers.map(a=>a[0]),i=>fields($("architectureDetail"),[["Layer",journey.layers[i][0]],["Purpose",journey.layers[i][1]],["Journey dependency",journey.layers[i][2]]]));

  $("consumerScan")?.addEventListener("click",()=>{
    fields($("consumerRecord"),[["Product identity","Approved product information"],["Manufacturer","Approved manufacturer identity"],["Credential state","Current issuer/authority status and validity"],["Provenance","Approved origin and handling summary"],["Custody","Selected handoff confirmation"],["Verification","Current approved verification state"]]);
  });

  render();
  auditRender();
  $("labSteps")?.firstElementChild?.click();
  $("warehouseZones")?.firstElementChild?.click();
  $("custodyRibbon")?.firstElementChild?.click();
  $("portNodes")?.firstElementChild?.click();
  $("actorButtons")?.firstElementChild?.click();
  $("architectureButtons")?.firstElementChild?.click();
  play();

  document.addEventListener("visibilitychange",()=>{if(document.hidden)clearInterval(timer);else if(autoplay)play();});
  window.addEventListener("beforeunload",()=>clearInterval(timer));
}
if(typeof module!=="undefined")module.exports=journey;
