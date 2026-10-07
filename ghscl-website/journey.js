const journey = {
  product: 'Premium Halal food product',
  stages: [
    ['Origin & producer','Producer / source owner','China origin','Establish the producer, source location and accountable organisation before materials enter the controlled chain.','Origin record, producer identity, source relationship and material provenance','Start with a known source and accountable owner.','INITIAL','Producer'],
    ['Organisation & KYC','Manufacturer authorised representative','Manufacturer organisation','Register the organisation, KYC, authorised representatives, licences and operating scope.','Organisation profile, authorised users, licences and jurisdiction','Only recognised organisations and accountable users can create or approve records.','INITIAL','Manufacturer'],
    ['Facility & production line','Manufacturer quality / Halal team','China facility','Register facilities, production lines, process scope, equipment and relevant operating controls.','Facility profile, line scope, process map, equipment and training records','Bind every later event to the exact place and process where it occurred.','INITIAL','Manufacturer'],
    ['Product & SKU','Product owner','Product workspace','Create product, SKU, formulation, packaging, destination and change-control relationships.','Product record, SKU, formulation/BOM, packaging and market scope','Keep product identity stable across audit, production, logistics and market receiving.','INITIAL','Manufacturer'],
    ['Supplier & materials','Procurement / assurance team','Supplier network','Connect ingredients and raw materials to approved suppliers, origin, lots, certificates and supporting evidence.','Supplier graph, ingredient/raw-material links, lot provenance and current evidence','Expose substitutions, expired evidence and high-risk material changes before production.','INITIAL','Supplier network'],
    ['Standards & applicability','Assurance team','AHTE standards workspace','Resolve the complete applicable Malaysian/JAKIM framework and destination requirements for the actual product, process and market.','Applicable instruments, requirements, controls, HCP/SCCP and evidence obligations','Turn standards into operational controls instead of a generic certificate check.','EVIDENCE-COMPLETE','Assurance team'],
    ['Laboratory evidence','Laboratory reviewer','Laboratory','Bind sample identity, seal, chain of custody, method, QC, technical review and signed report to the product and batch.','Sample record, custody, method/QC context, reviewed result and signed report','Scientific evidence supports assurance; it does not independently certify Halal status.','EVIDENCE-COMPLETE','Laboratory'],
    ['Smart audit & CAPA','Human auditor','Manufacturer facility','Guide the assigned auditor through scoped controls, capture attributable evidence, record findings and close CAPA through re-verification.','Audit scope, observations, media, findings, corrective action, re-verification and signed session','AI assists the audit; the human auditor owns findings and conclusions.','ASSESSED','Human auditor'],
    ['Authority workflow','Authorised competent authority','Authority-connected workflow','Present the complete evidence context through the authority-connectivity path and preserve the independently owned authority decision.','Evidence dossier, authority submission reference and authority-owned status','Authority state remains separate from AHTE trust and operational state.','ASSESSED','Competent authority'],
    ['Controlled production','Manufacturer production / quality','Production line','Bind approved inputs, line status, cleaning, operator competence, process events and batch genealogy during production.','Material consumption, process events, cleaning evidence, line and batch links','Continuous evidence carries the approved product scope into the actual production run.','ASSESSED','Manufacturer'],
    ['Origin warehouse','Warehouse operator','China warehouse','Receive, segregate, store, inspect, pick and prepare the finished batch for dispatch.','Receiving, zone, segregation, storage condition, pallet/package and dispatch records','Preserve identity and handling controls between production and logistics.','ASSESSED','Warehouse'],
    ['Sinotrans logistics','Logistics operator','China dispatch','Assign vehicle, container and seal; record loading, custody transfer, GNSS, door and condition events.','Vehicle/container/seal identity, route, telemetry, handover and exception records','Carry trust context with the physical shipment rather than reconstructing it later.','ASSESSED','Sinotrans / logistics'],
    ['Origin port & customs','Port / customs authority','China export port','Reconcile shipment identity, authorised documents, container/seal and inspection events before export handoff.','Manifest, document checks, inspection, seal condition and authority response','Sovereign export release remains with the competent border authority.','ASSESSED','Origin authority'],
    ['International transit','Carrier / Command Center','China → GCC route','Maintain custody, route, seal and environmental continuity while exceptions are monitored across the corridor.','Transit milestones, route, condition, custody and exception events','Continuous monitoring identifies emerging risk before destination receiving.','ASSESSED','Carrier'],
    ['GCC port & customs','Destination authority','GCC port','Resolve pre-arrival data, inspections, holds and the competent authority-owned import outcome.','Arrival, inspection, authority response, hold/release reference and custody transfer','AHTE provides evidence context; sovereign release remains external.','ASSESSED','Destination authority'],
    ['GCC importer','Importer receiving team','Destination receiving','Verify product/SKU/batch, container/seal, condition, documents and authority status; accept, record discrepancy or quarantine.','Receiving inspection, discrepancy, quarantine/acceptance, claims and warehouse placement','Make importer acceptance a first-class controlled handoff.','ASSESSED','Importer'],
    ['Destination warehouse','Warehouse / 3PL','GCC warehouse','Create inventory lots, preserve condition and segregation, and determine onward distribution eligibility.','Inventory lot, location, condition, custody and eligibility records','Keep received goods connected to the original product and shipment evidence.','ASSESSED','Destination warehouse'],
    ['Distributor / 3PL','Distributor operator','GCC distribution','Allocate stock, apply FEFO/FIFO as appropriate, record route and vehicle custody, and confirm proof of delivery.','Allocation, transfer order, route, custody handoff, delivery and withdrawal records','Preserve accountability between warehouse inventory and retail receiving.','ASSESSED','Distributor'],
    ['Retail / marketplace','Retail receiving / marketplace team','GCC retail / fulfilment','Check listing eligibility, receive SKU/batch, manage inventory/shelf or fulfilment status, and propagate withdrawals or recalls.','Listing state, receiving scan, inventory, expiry, sale status and recall records','Make downstream market controls visible without exposing unnecessary confidential factory data.','ASSESSED','Retailer / marketplace'],
    ['Consumer verification & response','Authorised verifier','Market / consumer','Present approved product identity, issuing authority, validity, provenance summary and selected custody confirmation; propagate post-market exceptions and recall when required.','Purpose-bound disclosure, current verification state, event history and recall links','Give buyers and consumers understandable evidence without turning QR into certification.','VERIFIED','Consumer / buyer']
  ],
  audit: ['Auditor identity & MFA','Facility / scope confirmation','Applicable controls','Walkthrough plan','Object / QR / NFC identification','Evidence capture','AI-assisted retrieval','Auditor assessment','Finding / CAR','Corrective action','Re-verification','Signed session','Sync / reconciliation'],
  lab: ['Test requirement','Sample request','Sample identity','Collection','Seal','Chain of custody','Transport','Receipt','Seal verification','Accession','Aliquot','Method & QC','Result','Technical review','Authorised signatory','Report','Evidence binding'],
  actors: [
    ['Manufacturer','Creates organisation, facility, product, supplier, process and production evidence; consumes readiness and corrective actions.','Origin and manufacturing accountability'],
    ['Human auditor','Inspects controls, captures attributable observations and signs findings; consumes requirements and evidence.','Accountable audit judgment'],
    ['Competent authority','Owns formal certification and other reserved authority decisions.','Independent authority decision'],
    ['Laboratory','Creates sample custody, method/QC and reviewed result records.','Scientific evidence within applicable scope'],
    ['Warehouse','Records receiving, segregation, handling, storage and dispatch.','Controlled storage and inventory'],
    ['Sinotrans / logistics','Records custody transfers, vehicle, container, seal, route and condition.','End-to-end logistics accountability'],
    ['Port / customs authority','Owns border inspection and sovereign release decisions.','Sovereign border decision'],
    ['Importer','Owns destination receiving, discrepancy, quarantine and acceptance.','Destination acceptance'],
    ['Distributor / 3PL','Owns inventory allocation, transfer, route and proof of delivery.','Destination custody continuity'],
    ['Retailer / marketplace','Owns listing, receiving, inventory, sale status and withdrawal.','Market-side assurance'],
    ['Consumer / buyer','Consumes approved verification information.','Understandable provenance'],
    ['Command Center','Correlates corridor state, exceptions, recommendations, incidents and recall scope.','Continuous assurance']
  ],
  layers: [
    ['Amanah experience','Role-based operational workflows and approved public verification.','Every lifecycle stage'],
    ['Identity & access','Organisation, users, roles, MFA and tenant isolation protect scoped actions.','Accountable access'],
    ['AHTE standards & controls','Applicability, requirements, controls and HCP/SCCP connect obligations to operations.','Readiness and assurance'],
    ['Evidence & digital twins','Products, materials, facilities, batches, shipments and custody events remain connected.','End-to-end traceability'],
    ['Integrity & audit trail','Append-only records, signatures, hashes and supersession preserve lineage.','Every evidence event'],
    ['AI & preemptive strategy','Gap detection, anomaly assessment, prediction and recommendations support accountable action.','Monitoring and corrective action'],
    ['Authority connectivity','AHTE ⇄ Direct JAKIM API ⇄ JAKIM target topology preserves independent authority decisions.','Authority workflow'],
    ['External ecosystem','Ports, customs, finance, Takaful and partner systems connect through governed adapters.','Cross-border and commercial workflows']
  ]
};

if (typeof document !== 'undefined') {
  const $ = id => document.getElementById(id);
  let index = 0;
  let mode = 'Journey';
  let auditStep = 0;
  let labStep = 0;
  let exception = '';
  let monitorView = 'Map';
  let playing = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timer = null;

  const el = (tag,text,cls) => {
    const node=document.createElement(tag);
    node.textContent=text;
    if(cls) node.className=cls;
    return node;
  };
  const fields=(host,values)=>{
    if(!host) return;
    host.replaceChildren();
    const dl=document.createElement('dl');
    values.forEach(([k,v])=>dl.append(el('dt',k),el('dd',v)));
    host.append(dl);
  };
  const buttons=(host,labels,action)=>{
    if(!host) return;
    host.replaceChildren();
    labels.forEach((label,i)=>{
      const b=el('button',label);
      b.type='button';
      b.addEventListener('click',()=>action(i,label));
      host.append(b);
    });
  };

  function pause(){
    playing=false;
    if(timer) window.clearInterval(timer);
    timer=null;
    updatePlayback();
  }
  function schedule(){
    if(timer) window.clearInterval(timer);
    if(!playing) return;
    timer=window.setInterval(()=>{
      index=(index+1)%journey.stages.length;
      render();
    },4300);
  }
  function updatePlayback(){
    const button=$('playPauseJourney');
    if(button){
      button.textContent=playing?'Pause journey':'Play journey';
      button.setAttribute('aria-pressed',String(playing));
    }
    if($('playbackStatus')) $('playbackStatus').textContent=playing?'Automatic guided walkthrough':'Journey paused — choose any stage or resume';
  }
  function select(i,{manual=true}={}){
    index=Math.max(0,Math.min(journey.stages.length-1,i));
    if(manual) pause();
    render();
  }
  function renderSummary(s){
    fields($('journeySummary'),[
      ['Accountable owner',s[7]],
      ['Operating location',s[2]],
      ['Evidence created / consumed',s[4]],
      ['Trust state',exception?'HOLD':s[6]],
      ['Next handoff',index<journey.stages.length-1?journey.stages[index+1][0]:'Continuous assurance / recall readiness']
    ]);
  }
  function renderMonitor(){
    const s=journey.stages[index];
    if(!$('monitorPanel')) return;
    $('monitorPanel').textContent={
      Map:`China → GCC direct · current stage: ${s[2]}`,
      Timeline:`${index+1} lifecycle stages connected to this point.`,
      Custody:`Current accountable holder: ${s[7]}`,
      Evidence:s[4],
      Exceptions:exception||'No exception selected. Choose a scenario to inspect the response path.'
    }[monitorView];
    [...($('monitorViews')?.children||[])].forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===monitorView)));
  }
  function render(){
    const s=journey.stages[index];
    if($('stageTitle')) $('stageTitle').textContent=`${String(index+1).padStart(2,'0')} / ${s[0]}`;
    if($('stageStory')) $('stageStory').textContent=s[3];
    if($('stageWhy')) $('stageWhy').textContent=s[5];
    const detail=mode==='Standards'
      ? [['Applicable scope','Malaysian/JAKIM and destination requirements resolved for this stage'],['Control objective',s[5]],['Evidence obligation',s[4]],['Responsible actor',s[1]],['Decision path','Requirement → control → evidence → accountable review']]
      : [['Accountable actor',s[1]],['Operating location',s[2]],['Evidence created / consumed',s[4]],['Why this stage matters',s[5]],['Next handoff',index<journey.stages.length-1?journey.stages[index+1][0]:'Continuous assurance']];
    fields($('stageDetail'),detail);
    if($('modeExplanation')) $('modeExplanation').textContent={
      Journey:s[3],
      Trust:`Physical event → identity → evidence → applicable control → attributable assessment. ${s[5]}`,
      Actor:`${s[1]} acts at ${s[2]}. ${s[5]}`,
      Standards:'Applicable requirements become operational controls, evidence obligations and audit tests for this stage.',
      Custody:`${s[7]} owns the current accountable handoff. Transfers preserve actor, time, location, object and condition context.`,
      Monitoring:`${s[2]} · monitoring, anomaly detection and exception correlation where applicable.`,
      Consumer:'Approved verification fields make provenance understandable without exposing unrelated confidential records.',
      Technical:'Identity, event, evidence, actor, timestamp and integrity proof remain bound throughout the lifecycle.'
    }[mode];
    if($('scrubber')){
      $('scrubber').max=String(journey.stages.length-1);
      $('scrubber').value=String(index);
    }
    if($('stageCount')) $('stageCount').textContent=`${index+1} / ${journey.stages.length} · ${s[0]}`;
    if($('previousStage')) $('previousStage').disabled=index===0;
    if($('nextStage')) $('nextStage').disabled=index===journey.stages.length-1;
    [...($('stageNav')?.children||[])].forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
    [...($('viewModes')?.children||[])].forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===mode)));
    const progress=$('journeyProgress');
    if(progress) progress.style.setProperty('--journey-progress',`${((index+1)/journey.stages.length)*100}%`);
    if($('routeNodes')){
      [...$('routeNodes').children].forEach((b,i)=>{b.classList.toggle('reached',i<=index);b.setAttribute('aria-pressed',String(i===index));});
    }
    const route=$('journeyRoute');
    if(route && $('routeMarker')){
      const point=route.getPointAtLength(route.getTotalLength()*index/(journey.stages.length-1));
      $('routeMarker').setAttribute('cx',String(point.x));
      $('routeMarker').setAttribute('cy',String(point.y));
    }
    if($('routeLocation')) $('routeLocation').textContent=`${s[2]} · ${s[7]}`;
    if($('timeline')){
      $('timeline').replaceChildren();
      journey.stages.slice(0,index+1).forEach((v,i)=>{
        const b=el('button',`${String(i+1).padStart(2,'0')} · ${v[0]} · ${v[1]}`);
        b.type='button';
        b.addEventListener('click',()=>select(i));
        $('timeline').append(b);
      });
    }
    if($('custodyHolder')) $('custodyHolder').textContent=s[7];
    renderSummary(s);
    renderMonitor();
    updatePlayback();
  }

  buttons($('stageNav'),journey.stages.map(s=>s[0]),i=>select(i));
  buttons($('routeNodes'),journey.stages.map(s=>s[0]),i=>select(i));
  buttons($('viewModes'),['Journey','Trust','Actor','Standards','Custody','Monitoring','Consumer','Technical'],(_,v)=>{mode=v;pause();render();});
  $('scrubber')?.addEventListener('input',e=>select(Number(e.target.value)));
  $('previousStage')?.addEventListener('click',()=>select(index-1));
  $('nextStage')?.addEventListener('click',()=>select(index+1));
  $('playPauseJourney')?.addEventListener('click',()=>{
    playing=!playing;
    updatePlayback();
    schedule();
  });
  $('restartJourney')?.addEventListener('click',()=>{
    index=0;
    playing=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    render();
    schedule();
  });

  function auditRender(){
    if(!$('auditCheckpoint')) return;
    $('auditCheckpoint').textContent=journey.audit[auditStep];
    $('auditGuide').textContent=auditStep<7?'Guided workflow: resolve the applicable control, inspect the object and capture attributable evidence.':'Human review: assess the observation, record findings, close corrective action and sign the attributable audit session.';
    fields($('auditEvidence'),[
      ['Checkpoint',journey.audit[auditStep]],
      ['Actor','Assigned human auditor'],
      ['Evidence','Attributable observation / media / record'],
      ['Decision','Human audit conclusion; competent-authority certification remains separate']
    ]);
    if($('auditPrevious')) $('auditPrevious').disabled=auditStep===0;
    if($('auditNext')) $('auditNext').disabled=auditStep===journey.audit.length-1;
  }
  $('auditNext')?.addEventListener('click',()=>{auditStep=Math.min(journey.audit.length-1,auditStep+1);auditRender();});
  $('auditPrevious')?.addEventListener('click',()=>{auditStep=Math.max(0,auditStep-1);auditRender();});
  $('auditReset')?.addEventListener('click',()=>{auditStep=0;auditRender();});

  buttons($('labSteps'),journey.lab,i=>{
    labStep=i;
    if($('labCurrent')) $('labCurrent').textContent=journey.lab[i];
    fields($('labEvidence'),[
      ['Step',journey.lab[i]],
      ['Product link','Exact product and production batch'],
      ['Custody','Collector → courier → laboratory'],
      ['Method / QC','Applicable method and quality controls'],
      ['Review','Authorised technical review and signed evidence']
    ]);
    [...($('labSteps')?.children||[])].forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));
  });

  buttons($('warehouseZones'),['Receiving','Quarantine','Controlled storage','Segregation','Picking','Dispatch','Cold storage','Inspection'],(_,zone)=>fields($('warehouseDetail'),[
    ['Zone',zone],['Control','Segregation, contamination prevention and accountable handling'],['Condition','Continuous monitoring where applicable'],['Custody','Warehouse operator'],['Evidence','Receiving, zone, inventory and handling records']
  ]));
  buttons($('custodyRibbon'),['Manufacturer','Sinotrans / logistics','Warehouse','Port','Carrier','Importer','Distributor','Retailer'],(i,actor)=>fields($('custodyDetail'),[
    ['Outgoing',i?$('custodyRibbon').children[i-1].textContent:'Origin'],['Incoming',actor],['Evidence','Attributable transfer, object identity and condition record'],['Control','Custody remains linked to the same product / batch / shipment lineage']
  ]));
  buttons($('portNodes'),['Pre-arrival','Container / seal','Documents','Inspection','Authority response','Custody transfer'],(_,node)=>fields($('portDetail'),[
    ['Checkpoint',node],['Actor','Port / customs authority'],['Action','Reconcile scoped identity and authorised evidence'],['Result','Authority-owned border decision'],['Trust impact','AHTE, authority and customs states remain separate']
  ]));
  buttons($('monitorViews'),['Map','Timeline','Custody','Evidence','Exceptions'],(_,view)=>{monitorView=view;renderMonitor();});
  buttons($('exceptionButtons'),['Temperature excursion','Seal mismatch','Missing custody event','Document mismatch','Route deviation'],(_,v)=>{
    exception=v;
    if($('exceptionState')) $('exceptionState').textContent=`${v} → alert → policy assessment → HOLD → investigation → corrective action → re-verification → accountable release decision.`;
    pause();
    render();
  });
  $('resetException')?.addEventListener('click',()=>{
    exception='';
    if($('exceptionState')) $('exceptionState').textContent='Scenario reset. Continuous assurance remains active.';
    render();
  });
  buttons($('actorButtons'),journey.actors.map(a=>a[0]),i=>fields($('actorDetail'),[['Role',journey.actors[i][0]],['Creates / consumes',journey.actors[i][1]],['Value and responsibility',journey.actors[i][2]]]));
  buttons($('architectureButtons'),journey.layers.map(a=>a[0]),i=>fields($('architectureDetail'),[['Layer',journey.layers[i][0]],['Purpose',journey.layers[i][1]],['Journey dependency',journey.layers[i][2]]]));
  $('consumerScan')?.addEventListener('click',()=>{
    select(19);
    fields($('consumerRecord'),[
      ['Product',journey.product],['Origin','China'],['Journey','Manufacturer → assurance → logistics → GCC market'],['Authority information','Issuer-authorised status and validity'],['Disclosure','Approved provenance and custody summary']
    ]);
  });

  render();
  auditRender();
  $('labSteps')?.firstElementChild?.click();
  $('warehouseZones')?.firstElementChild?.click();
  $('custodyRibbon')?.firstElementChild?.click();
  $('portNodes')?.firstElementChild?.click();
  $('actorButtons')?.firstElementChild?.click();
  $('architectureButtons')?.firstElementChild?.click();
  schedule();
}
if (typeof module !== 'undefined') module.exports = journey;
