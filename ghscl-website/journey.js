const journey = {
  product: 'Premium Halal food product',
  stages: [
    ['Origin & producer','Producer / source owner','China origin','Establish the producer, source location and accountable organisation before materials enter the controlled chain.','Origin record, producer identity, source relationship and material provenance','Start with a known source and accountable owner.','INITIAL','Producer'],
    ['Organisation & KYC','Manufacturer authorised representative','Manufacturer organisation','Register the organisation, KYC, authorised representatives, licences and operating scope.','Organisation profile, authorised users, licences and jurisdiction','Only recognised organisations and accountable users can create or approve records.','INITIAL','Manufacturer'],
    ['Facility & production line','Manufacturer quality / Halal team','China facility','Register facilities, production lines, process scope, equipment and relevant operating controls.','Facility profile, line scope, process map, equipment and training records','Bind every later event to the exact place and process where it occurred.','INITIAL','Manufacturer'],
    ['Product & SKU','Product owner','Product workspace','Create product, SKU, formulation, packaging, destination and change-control relationships.','Product record, SKU, formulation/BOM, packaging and market scope','Keep product identity stable across audit, production, logistics and market receiving.','INITIAL','Manufacturer'],
    ['Supplier & materials','Procurement / assurance team','Supplier network','Connect ingredients and raw materials to approved suppliers, origin, lots, certificates and supporting evidence.','Supplier graph, ingredient/raw-material links, lot provenance and current evidence','Expose substitutions, expired evidence and high-risk material changes before production.','INITIAL','Supplier network'],
    ['Standards & applicability','Assurance team','Standards workspace','Resolve the complete applicable Malaysian/JAKIM framework and destination requirements for the actual product, process and market.','Applicable instruments, controls, HCP/SCCP and evidence obligations','Turn standards into operational controls instead of a generic certificate check.','EVIDENCE-COMPLETE','Assurance team'],
    ['Laboratory evidence','Laboratory reviewer','Laboratory','Bind sample identity, seal, chain of custody, method, QC, technical review and signed report to the product and batch.','Sample record, custody, method/QC context, reviewed result and signed report','Scientific evidence supports assurance; it does not independently certify Halal status.','EVIDENCE-COMPLETE','Laboratory'],
    ['Smart audit & CAPA','Human auditor','Manufacturer facility','Guide the assigned auditor through scoped controls, capture attributable evidence, record findings and close CAPA through re-verification.','Audit scope, observations, media, findings, corrective action, re-verification and signed session','AI assists the audit; the human auditor owns findings and conclusions.','ASSESSED','Human auditor'],
    ['JAKIM interface','JAKIM integration','Authority-connected workflow','Present the complete evidence context through the authority-connectivity path and retain the independently owned issuer record.','Evidence dossier, authority submission reference and issuer status','Product, evidence and operating information remain visible in the journey record.','ASSESSED','Issuing organisation'],
    ['Controlled production','Manufacturer production / quality','Production line','Bind approved inputs, line status, cleaning, operator competence, process events and batch genealogy during production.','Material consumption, process events, cleaning evidence, line and batch links','Continuous evidence carries the approved product scope into the actual production run.','ASSESSED','Manufacturer'],
    ['Origin warehouse','Warehouse operator','China warehouse','Connect the warehouse certification and scope to receiving, segregation, storage, inspection, picking and dispatch.','JAKIM certification and scope, receiving, zone, segregation, storage condition, pallet/package and dispatch records','Preserve the certified facility status, identity and handling controls between production and logistics.','ASSESSED','Warehouse'],
    ['Sinotrans logistics','Logistics operator','China dispatch','Connect the logistics provider certification and scope to vehicle, container, seal, loading, custody transfer, GNSS, door and condition events.','JAKIM certification and scope, vehicle/container/seal identity, route, telemetry, handover and exception records','Carry certified-provider and trust context with the physical shipment from origin to destination.','ASSESSED','Sinotrans / logistics'],
    ['Origin port & customs','Port / customs authority','China export port','Reconcile shipment identity, authorised documents, container/seal and inspection events before export handoff.','Manifest, document checks, inspection, seal condition and authority response','Border-system export release remains with the competent border authority.','ASSESSED','Origin authority'],
    ['International transit','Carrier / Command Center','China → GCC route','Maintain custody, route, seal and environmental continuity while exceptions are monitored across the corridor.','Transit milestones, route, condition, custody and exception events','Continuous monitoring identifies emerging risk before destination receiving.','ASSESSED','Carrier'],
    ['GCC port & customs','Destination authority','GCC port','Resolve pre-arrival data, inspections, holds and the import outcome recorded by the connected system.','Arrival, inspection, authority response, hold/release reference and custody transfer','Evidence context supports the process; customs status is displayed from connected border systems.','ASSESSED','Destination authority'],
    ['GCC importer','Importer receiving team','Destination receiving','Verify product/SKU/batch, container/seal, condition, documents and issuer status; accept, record discrepancy or quarantine.','Receiving inspection, discrepancy, quarantine/acceptance, claims and warehouse placement','Make importer acceptance a first-class controlled handoff.','ASSESSED','Importer'],
    ['Destination warehouse','Warehouse / 3PL','GCC warehouse','Create inventory lots, preserve condition and segregation, and determine onward distribution eligibility.','Inventory lot, location, condition, custody and eligibility records','Keep received goods connected to original product and shipment evidence.','ASSESSED','Destination warehouse'],
    ['Distributor / 3PL','Distributor operator','GCC distribution','Allocate stock, apply FEFO/FIFO as appropriate, record route and vehicle custody, and confirm proof of delivery.','Allocation, transfer order, route, custody handoff, delivery and withdrawal records','Preserve accountability between warehouse inventory and retail receiving.','ASSESSED','Distributor'],
    ['Retail / marketplace','Retail receiving / marketplace team','GCC retail / fulfilment','Check listing eligibility, receive SKU/batch, manage inventory/shelf or fulfilment status, and propagate withdrawals or recalls.','Listing state, receiving scan, inventory, expiry, sale status and recall records','Make downstream market controls visible without exposing unnecessary confidential factory data.','ASSESSED','Retailer / marketplace'],
    ['Consumer verification & continuous assurance','Authorised verifier / Command Center','Market / consumer','Present approved product identity, issuing authority, validity, provenance and selected custody information while monitoring remains active for post-market signals.','Purpose-bound disclosure, verification event, incident lineage and recall links','Give buyers and consumers understandable evidence while keeping recall and corrective action connected to affected objects.','VERIFIED','Consumer / Command Center']
  ],
  audit: ['Auditor identity & MFA','Facility / scope confirmation','Applicable controls','Walkthrough plan','Object / QR / NFC identification','Evidence capture','AI-assisted retrieval','Auditor assessment','Finding / CAR','Corrective action','Re-verification','Signed session','Sync / reconciliation'],
  lab: ['Test requirement','Sample request','Sample identity','Collection','Seal','Chain of custody','Transport','Receipt','Seal verification','Accession','Aliquot','Method & QC','Result','Technical review','Authorised signatory','Report','Evidence binding'],
  actors: [
    ['Manufacturer','Creates organisation, facility, product, supplier, process and production evidence.','Origin and manufacturing accountability'],
    ['Human auditor','Inspects controls, captures attributable observations and signs findings.','Accountable audit judgment'],
    ['Issuing organisation','Owns formal certification and other reserved issuer records.','Independent issuer record'],
    ['Laboratory','Creates sample custody, method/QC and reviewed result records.','Scientific evidence'],
    ['Warehouse','Records receiving, segregation, handling, storage and dispatch.','Controlled storage and inventory'],
    ['Sinotrans / logistics','Records custody transfers, vehicle, container, seal, route and condition.','End-to-end logistics accountability'],
    ['Port / customs authority','Owns border inspection and border-system release decisions.','Border-system border decision'],
    ['Importer','Owns destination receiving, discrepancy, quarantine and acceptance.','Destination acceptance'],
    ['Distributor / 3PL','Owns inventory allocation, transfer, route and proof of delivery.','Destination custody continuity'],
    ['Retailer / marketplace','Owns listing, receiving, inventory, sale status and withdrawal.','Market-side assurance'],
    ['Consumer / buyer','Consumes approved verification information.','Understandable provenance'],
    ['Command Center','Correlates corridor state, exceptions, recommendations, incidents and recall scope.','Continuous assurance']
  ],
  layers: [
    ['Amanah experience','Role-based workflows and approved public verification.','Every lifecycle stage'],
    ['Identity & access','Organisation, users, roles, MFA and tenant isolation protect scoped actions.','Accountable access'],
    ['Standards & controls','Applicability, requirements, controls and HCP/SCCP connect obligations to operations.','Readiness and assurance'],
    ['Evidence & digital twins','Products, materials, facilities, batches, shipments and custody events remain connected.','End-to-end traceability'],
    ['Integrity & audit trail','Append-only records, signatures, hashes and supersession preserve lineage.','Every evidence event'],
    ['AI & preemptive strategy','Gap detection, anomaly assessment, prediction and recommendations support accountable action.','Monitoring and corrective action'],
    ['Authority connectivity','AHTE ⇄ Direct JAKIM API ⇄ JAKIM preserves independent issuer records.','JAKIM interface'],
    ['External ecosystem','Ports, customs, finance, Takaful and partner systems connect through governed adapters.','Cross-border and commercial workflows']
  ]
};

if (typeof document !== 'undefined') {
  const $ = id => document.getElementById(id);
  let index = 0, mode = 'Journey', auditStep = 0, labStep = 0, exception = null, lastExceptionResolution = '', recordTab = 'Overview', monitorView = 'Map';
  let playing = !window.matchMedia('(prefers-reduced-motion: reduce)').matches, timer = null, countdownTimer = null, playbackSpeed = 1, stageStartedAt = 0;
  const element = (tag, text, cls) => { const el = document.createElement(tag); el.textContent = text; if (cls) el.className = cls; return el; };
  const pulse = id => { const node=$(id); if(!node)return; node.classList.remove('flow-change'); void node.offsetWidth; node.classList.add('flow-change'); };
  const buttons = (host, labels, action) => labels.forEach((label, i) => { const b = element('button', label); b.type = 'button'; b.addEventListener('click', () => action(i, label)); host.append(b); });
  function fields(host, values) { host.replaceChildren(); const dl = document.createElement('dl'); values.forEach(([key,val]) => { dl.append(element('dt',key),element('dd',val)); }); host.append(dl); }

  function renderRecord() {
    const s = journey.stages[index];
    const views = {
      Overview: [['Product',journey.product],['Route','China → GCC direct'],['Current stage',s[0]],['Accountable owner',s[7]],['Connected stages',String(index+1)+' of '+journey.stages.length],['Trust state',exception ? 'HOLD' : s[6]],['Authority state','Independently owned'],['Operational state','Managed by accountable operator']],
      Identity: [['Product',journey.product],['Current object',s[0]],['Origin','China'],['Destination','GCC'],['Accountable owner',s[7]]],
      Audit: [['Current checkpoint',journey.audit[auditStep]],['Actor','Human auditor'],['Outcome','Auditor assessment and signed evidence'],['Authority decision','Separate competent-authority workflow']],
      Lab: [['Current step',journey.lab[labStep]],['Product link','Exact product and production batch'],['Method / QC','Applicable laboratory method and quality controls'],['Meaning','Reviewed scientific evidence supports assurance; it does not independently certify Halal']],
      Custody: [['Current holder',s[7]],['Location',s[2]],['Transfer','Outgoing → incoming accountable actor'],['Evidence','Custody, condition and handoff record']],
      Logistics: [['Route','China → GCC direct'],['Current location',s[2]],['Evidence','Container / seal / vehicle / route / condition as applicable'],['Exception handling','Scoped hold, investigation, CAPA and re-verification']],
      Policy: [['Framework','Complete applicable Malaysian/JAKIM framework'],['Destination','Applicable GCC market requirements'],['Control mapping','Requirement → control → HCP/SCCP → evidence → audit test']],
      Timeline: journey.stages.slice(0,index+1).map((v,i)=>['Stage '+(i+1),v[0]+' · '+v[1]]),
      Provenance: [['Object','Exact product / batch / shipment object'],['Event','Attributable lifecycle event'],['Evidence','Source-bound evidence record'],['Actor','Authenticated accountable actor'],['Timestamp','Recorded event time'],['Integrity','Signature / hash / provenance proof where applicable']]
    };
    fields($('passportBody'), views[recordTab]);
    [...$('passportTabs').children].forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===recordTab)));
  }

  function renderGovernanceMatrix() {
    const host=$('governanceMatrix');
    if(!host)return;
    const levels=[
      ['CONTINUOUS MONITORING','Connect live product, premises, laboratory, production and custody records','AHTE'],
      ['AI / ML ANALYSIS','Detect anomalies and assess changing evidence across the journey','AHTE intelligence'],
      ['PREDICTIVE INSIGHT','Forecast risk, impact and affected product or shipment scope','Predictive analytics'],
      ['PREEMPTIVE STRATEGY','Recommend timely actions for accountable operators and reviewers','Decision support'],
      ['HUMAN CERTIFICATION DECISION','JAKIM / JAIN / JAIM, muftis, scholars and authorised halal auditors award or revoke certification','Authorised decision makers'],
      ['LIVE STATUS UPDATE','Record the decision and update connected monitoring and assurance records','End-to-end assurance']
    ];
    host.replaceChildren();
    const heading=element('h3','Continuous assurance and certification workflow');
    const grid=element('div','', 'governance-levels');
    levels.forEach(([level,description,owner])=>{
      const card=element('article','', 'governance-level');
      if(exception&&level==='PREEMPTIVE STRATEGY')card.classList.add('active');
      card.append(element('strong',level),element('span',description),element('small',owner));
      if(exception&&level==='PREEMPTIVE STRATEGY')card.setAttribute('aria-current','step');
      grid.append(card);
    });
    host.append(heading,grid,element('p','AI/ML continuously supports monitoring, prediction and preemptive strategies. Certification is awarded or revoked by JAKIM / JAIN / JAIM, muftis, scholars and authorised halal auditors.'));
  }

  function renderExceptionState() {
    const host=$('exceptionState'), actions=$('exceptionActions'), radius=$('exceptionBlastRadius'), clear=$('resetException');
    if(!host||!actions||!radius||!clear)return;
    host.replaceChildren(); actions.replaceChildren(); radius.replaceChildren();
    $('playJourney').disabled=Boolean(exception);
    $('restartJourney').disabled=Boolean(exception);
    [...$('exceptionButtons').children].forEach(button=>{button.disabled=Boolean(exception);});
    if(exception){
      host.append(element('strong','Operational response · '+exception.type));
      host.append(element('p','Monitoring has flagged an exception at stage '+String(exception.stage+1)+'. The accountable team reviews evidence, resolves the issue and records the outcome.'));
      host.append(element('p','The walkthrough shows how a detected issue moves through investigation, corrective action and re-verification while the certification decision remains with authorised human decision makers.'));
      const path=element('ol','', 'exception-response-path');
      [['HOLD','Configured hold'],['INVESTIGATION','Investigation'],['CORRECTIVE-ACTION','Corrective action'],['RE-VERIFICATION','Re-verification']].forEach(([phase,label])=>{
        const item=element('li',label);
        if(exception.phase===phase)item.setAttribute('aria-current','step');
        path.append(item);
      });
      host.append(path);
      const title=element('h3','Potential recall trace scope');
      const tree=element('ul','', 'recall-tree');
      const root=element('li','Current product and batch identity');
      const branches=element('ul');
      ['Shipment and custody events','Importer inventory and destination warehouse','Distributor transfers and deliveries','Retail stock and affected orders'].forEach(label=>branches.append(element('li',label)));
      root.append(branches);tree.append(root);
      radius.append(title,tree,element('p','Exact lots, quantities and recipients must come from linked records; this walkthrough does not invent identifiers or affected counts.'));
      const phases=['HOLD','INVESTIGATION','CORRECTIVE-ACTION','RE-VERIFICATION'];
      const labels=['Record investigation','Record corrective action','Complete re-verification','Finish response walkthrough'];
      const at=phases.indexOf(exception.phase);
      const action=element('button',labels[Math.max(0,at)]);
      action.type='button';
      action.addEventListener('click',()=>{
        if(at<3){exception.phase=phases[at+1];renderExceptionState();render();return;}
        lastExceptionResolution='Re-verification recorded. The resulting operating status is shown; authorised human decision makers retain certification decisions.';
        exception=null;renderExceptionState();render();updatePlayback();
      });
      actions.append(action);
      clear.disabled=true;
    }else{
      host.textContent=lastExceptionResolution||'Select a scenario to follow live monitoring, investigation and corrective action.';
      clear.disabled=!lastExceptionResolution;
    }
    renderGovernanceMatrix();
  }

  function renderMonitor() {
    const s=journey.stages[index];
    $('monitorPanel').textContent={
      Map:'China → GCC direct · current stage: '+s[2],
      Timeline:(index+1)+' connected lifecycle stages completed or in view.',
      Custody:'Current accountable holder: '+s[7],
      Evidence:s[4],
      Exceptions:exception ? exception.type+' · '+exception.phase : (lastExceptionResolution||'No exception selected. Choose a scenario to inspect the response path.')
    }[monitorView];
    [...$('monitorViews').children].forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===monitorView)));
  }

  function render() {
    const s = journey.stages[index];
    const journeyScene = $('journeyScene');
    if (journeyScene) {
      journeyScene.dataset.stageLabel = s[0];
      journeyScene.dataset.stageIndex = String(index);
      journeyScene.setAttribute('aria-label', 'Animated 3D supply chain journey: ' + s[0]);
    }
    const routeScene = $('routeScene3d');
    if (routeScene) {
      routeScene.dataset.stageLabel = 'corridor · ' + s[0];
      routeScene.dataset.stageIndex = String(index);
      routeScene.setAttribute('aria-label', 'Three-dimensional direct China to GCC journey: ' + s[0]);
    }
    pulse('stageTitle'); pulse('stageStory'); pulse('stageDetail'); pulse('sceneData');
    const sceneName=$('sceneStageName');
    if(sceneName){
      sceneName.textContent=s[0]; $('sceneStageAction').textContent=s[3]; $('sceneActor').textContent=s[1];
      $('sceneObject').textContent=s[2]; $('sceneEvidence').textContent=s[4];
    }
    $('stageTitle').textContent = String(index+1).padStart(2,'0')+' / '+s[0];
    $('stageStory').textContent = s[3];
    $('stageWhy').textContent = s[5];
    fields($('stageDetail'), mode === 'Standards'
      ? [['Applicable scope','Malaysian/JAKIM and destination requirements resolved for this stage'],['Control objective',s[5]],['Evidence',s[4]],['Responsible actor',s[1]],['Decision path','Requirement → control → evidence → accountable review']]
      : [['Accountable actor',s[1]],['Operating location',s[2]],['Evidence created / consumed',s[4]],['Why this stage matters',s[5]],['Next handoff',index < journey.stages.length-1 ? journey.stages[index+1][0] : 'Continuous assurance']]);
    $('modeExplanation').textContent = {
      Journey:s[3], Trust:'Physical event → identity → evidence → applicable control → attributable assessment. '+s[5],
      Actor:s[1]+' acts at '+s[2]+'. '+s[5],
      Standards:'Applicable requirements become operational controls, evidence obligations and audit tests for this stage.',
      Custody:s[7]+' owns the current accountable handoff. Transfers preserve actor, time, location, object and condition context.',
      Monitoring:s[2]+' · continuous monitoring and exception correlation where applicable.',
      Consumer:'Approved verification fields make provenance understandable without exposing unrelated confidential records.',
      Technical:'Identity, event, evidence, actor, timestamp and integrity proof stay bound throughout the lifecycle.'
    }[mode];
    $('scrubber').max=String(journey.stages.length-1);
    $('scrubber').value=String(index);
    $('stageCount').textContent=(index+1)+' / '+journey.stages.length+' · '+s[0];
    $('previousStage').disabled=index===0;
    $('nextStage').disabled=index===journey.stages.length-1;
    [...$('stageNav').children].forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===index));if(i===index)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
    const selectedStop=$('stageNav').children[index];
    if(selectedStop){
      const nav=$('stageNav'), target=selectedStop.offsetLeft-nav.clientWidth/2+selectedStop.offsetWidth/2;
      nav.scrollTo({left:Math.max(0,target),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    }
    [...$('viewModes').children].forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===mode)));
    [...$('routeNodes').children].forEach((b,i)=>{b.classList.toggle('reached',i<=index);b.setAttribute('aria-pressed',String(i===index));});
    $('routeLocation').textContent=s[2]+' · '+s[7];
    $('timeline').replaceChildren();
    journey.stages.slice(0,index+1).forEach((v,i)=>{const b=element('button',String(i+1).padStart(2,'0')+' · '+v[0]+' · '+v[1]);b.type='button';b.addEventListener('click',()=>{pause();select(i);});$('timeline').append(b);});
    $('custodyHolder').textContent=s[7];
    renderMonitor(); renderRecord();
  }

  function select(i){ index=Math.max(0,Math.min(journey.stages.length-1,i)); render(); }
  function updatePlayback(){ $('playJourney').textContent=playing?'Pause journey':'Play journey'; $('playbackStatus').textContent=playing?'Automatically advancing through the complete platform process':'Journey paused for inspection'; }
  function schedule(){
    if(timer)clearTimeout(timer);
    if(countdownTimer)clearInterval(countdownTimer);
    timer=null;countdownTimer=null;
    if(!playing||exception)return;
    const duration=4200/playbackSpeed;
    stageStartedAt=Date.now();
    const progress=$('journeyTimer'),label=$('journeyTimerLabel');
    if(progress){progress.max=String(duration);progress.value='0';}
    if(label)label.textContent='Next stage in '+(duration/1000).toFixed(1)+' seconds';
    timer=setTimeout(()=>{index=index>=journey.stages.length-1?0:index+1;render();schedule();},duration);
    countdownTimer=setInterval(()=>{
      const elapsed=Date.now()-stageStartedAt;
      if(progress)progress.value=String(Math.min(duration,elapsed));
      if(label)label.textContent='Next stage in '+Math.max(0,(duration-elapsed)/1000).toFixed(1)+' seconds';
    },100);
  }
  function pause(){playing=false;if(timer)clearTimeout(timer);if(countdownTimer)clearInterval(countdownTimer);timer=null;countdownTimer=null;updatePlayback();}
  function toggle(){playing=!playing;updatePlayback();schedule();}

  journey.stages.forEach((stage,i)=>{
    const b=element('button','', 'journey-stop');b.type='button';
    b.setAttribute('aria-label',String(i+1).padStart(2,'0')+' · '+stage[0]);
    b.append(element('span',String(i+1).padStart(2,'0'),'journey-stop-number'),element('span',stage[0],'journey-stop-name'));
    b.addEventListener('click',()=>{pause();select(i);});$('stageNav').append(b);
  });
  buttons($('routeNodes'),journey.stages.map(s=>s[0]),i=>{pause();select(i);});
  buttons($('viewModes'),['Journey','Trust','Actor','Standards','Custody','Monitoring','Consumer','Technical'],(_,v)=>{mode=v;render();});
  buttons($('passportTabs'),['Overview','Identity','Audit','Lab','Custody','Logistics','Policy','Timeline','Provenance'],(_,v)=>{recordTab=v;renderRecord();});
  $('scrubber').addEventListener('input',e=>{pause();select(Number(e.target.value));});
  $('previousStage').addEventListener('click',()=>{pause();select(index-1);});
  $('nextStage').addEventListener('click',()=>{pause();select(index+1);});
  $('playJourney').addEventListener('click',toggle);
  $('playbackSpeed').addEventListener('click',e=>{
    const button=e.target.closest('button[data-speed]');
    if(!button)return;
    playbackSpeed=Number(button.dataset.speed);
    [...$('playbackSpeed').children].forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    schedule();
  });
  $('restartJourney').addEventListener('click',()=>{index=0;playing=true;render();updatePlayback();schedule();});

  function auditRender(){ $('auditCheckpoint').textContent=journey.audit[auditStep]; $('auditGuide').textContent=auditStep<8?'Guided workflow: resolve the applicable control, inspect the object and capture attributable evidence.':'Human review: assess the observation, record findings, close corrective action and sign the attributable audit session.'; fields($('auditEvidence'),[['Checkpoint',journey.audit[auditStep]],['Actor','Assigned human auditor'],['Evidence','Attributable observation / media / record'],['Decision','Human audit conclusion; competent-authority certification remains separate']]);pulse('auditCheckpoint');pulse('auditEvidence');$('auditPrevious').disabled=auditStep===0; $('auditNext').disabled=auditStep===journey.audit.length-1; renderRecord(); }
  $('auditNext').addEventListener('click',()=>{auditStep=Math.min(journey.audit.length-1,auditStep+1);auditRender();});
  $('auditPrevious').addEventListener('click',()=>{auditStep=Math.max(0,auditStep-1);auditRender();});
  $('auditReset').addEventListener('click',()=>{auditStep=0;auditRender();});

  buttons($('labSteps'),journey.lab,i=>{labStep=i;$('labCurrent').textContent=journey.lab[i];fields($('labEvidence'),[['Step',journey.lab[i]],['Product link','Exact product and production batch'],['Custody','Collector → courier → laboratory'],['Method / QC','Applicable method and quality controls'],['Review','Authorised technical review and signed evidence']]);pulse('labCurrent');pulse('labEvidence');renderRecord();[...$('labSteps').children].forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));});
  buttons($('warehouseZones'),['Receiving','Quarantine','Controlled storage','Segregation','Picking','Dispatch','Cold storage','Inspection'],(_,zone)=>{fields($('warehouseDetail'),[['Zone',zone],['Control','Segregation, contamination prevention and accountable handling'],['Condition','Continuous monitoring where applicable'],['Custody','Warehouse operator'],['Evidence','Receiving, zone, inventory and handling records']]);pulse('warehouseDetail');});
  buttons($('custodyRibbon'),['Manufacturer','Sinotrans / logistics','Warehouse','Port','Carrier','Importer','Distributor','Retailer'],(i,actor)=>{fields($('custodyDetail'),[['Outgoing',i?$('custodyRibbon').children[i-1].textContent:'Origin'],['Incoming',actor],['Evidence','Attributable transfer, object identity and condition record'],['Control','Custody remains linked to the same product / batch / shipment lineage']]);pulse('custodyDetail');});
  buttons($('portNodes'),['Pre-arrival','Container / seal','Documents','Inspection','Authority response','Custody transfer'],(_,node)=>{fields($('portDetail'),[['Checkpoint',node],['Actor','Port / customs authority'],['Action','Reconcile scoped identity and authorised evidence'],['Result','Authority-owned border decision'],['Trust impact','Trust, authority and customs states remain separate']]);pulse('portDetail');});
  buttons($('monitorViews'),['Map','Timeline','Custody','Evidence','Exceptions'],(_,view)=>{monitorView=view;renderMonitor();});
  buttons($('exceptionButtons'),['Temperature excursion','Seal tamper','Laboratory evidence discrepancy','Missing custody event','Document mismatch','Route deviation'],(_,v)=>{pause();exception={type:v,phase:'HOLD',stage:index};lastExceptionResolution='';renderExceptionState();render();});
  $('resetException').addEventListener('click',()=>{if(exception)return;lastExceptionResolution='';renderExceptionState();render();});
  buttons($('actorButtons'),journey.actors.map(a=>a[0]),i=>fields($('actorDetail'),[['Role',journey.actors[i][0]],['Creates / consumes',journey.actors[i][1]],['Value and responsibility',journey.actors[i][2]]]));
  buttons($('architectureButtons'),journey.layers.map(a=>a[0]),i=>fields($('architectureDetail'),[['Layer',journey.layers[i][0]],['Purpose',journey.layers[i][1]],['Journey dependency',journey.layers[i][2]]]));
  $('consumerScan').addEventListener('click',()=>{pause();select(19);fields($('consumerRecord'),[['Product',journey.product],['Origin','China'],['Journey','Manufacturer → assurance → logistics → GCC market'],['Authority information','Issuer-authorised status and validity'],['Disclosure','Approved provenance and custody summary']]);});

  for(const id of ['labSteps','warehouseZones','custodyRibbon','portNodes','monitorViews','viewModes','passportTabs','actorButtons','architectureButtons','exceptionButtons','routeNodes']) $(id)?.classList.add('journey-sequence');

  renderExceptionState(); render(); auditRender(); $('labSteps').firstElementChild?.click(); $('warehouseZones').firstElementChild?.click(); $('custodyRibbon').firstElementChild?.click(); $('portNodes').firstElementChild?.click(); $('actorButtons').firstElementChild?.click(); $('architectureButtons').firstElementChild?.click(); updatePlayback(); schedule();
}
if (typeof module !== 'undefined') module.exports = journey;
