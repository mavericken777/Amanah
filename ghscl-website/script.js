(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const boot = $('#boot');
  window.addEventListener('load', () => setTimeout(() => boot?.classList.add('done'), 300));

  const cursor = $('#cursor');
  const aura = $('#cursorAura');
  if (matchMedia('(pointer:fine)').matches && cursor && aura) {
    window.addEventListener('pointermove', e => {
      cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`;
      aura.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 140, fill: 'forwards' });
    });
    $$('a,button').forEach(el => {
      el.addEventListener('mouseenter', () => aura.classList.add('big'));
      el.addEventListener('mouseleave', () => aura.classList.remove('big'));
    });
  }

  const progress = $('#pageProgress');
  const nav = $('#nav');
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
    nav?.classList.toggle('scrolled', scrollY > 24);
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const menu = $('#menu'); const mobileNav = $('#mobileNav');
  menu?.addEventListener('click', () => {
    const open = mobileNav?.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(!!open));
  });
  $$('#mobileNav a').forEach(a => a.addEventListener('click', () => { mobileNav?.classList.remove('open'); menu?.setAttribute('aria-expanded','false'); }));

  const revealObs = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  }), { threshold: .12 });
  $$('.reveal').forEach(el => revealObs.observe(el));

  const pathData = [
    ['01','SOURCE OF LEGITIMACY','Authority','The chain begins with the competent authority or destination requirement. The platform records the authority boundary; it never substitutes for it.','BOUNDARY ANCHORED'],
    ['02','SOURCE CONTROL','Standard / Instrument','The applicable technical instrument is identified by edition, source status and scope before requirements are interpreted.','SOURCE VERSIONED'],
    ['03','NORMATIVE LOCATOR','Clause / Requirement','A requirement object points to the exact source locator without redistributing licensed normative wording.','LOCATOR BOUND'],
    ['04','CONTEXT','Applicability','The system establishes which requirement applies to which product, process, facility, actor or destination context.','SCOPE RESOLVED'],
    ['05','OPERATING RESPONSE','Control','The requirement becomes a defined control with an accountable owner, expected evidence and verification logic.','CONTROL DEFINED'],
    ['06','CRITICAL CONTROL','HCP / SCCP','Halal and Shariah-critical control points are made explicit so monitoring and escalation are not left to inference.','CRITICALITY DECLARED'],
    ['07','PROOF','Evidence','Evidence is attached with identity, provenance, timestamps, hashes and source relationships to the control it supports.','PROVENANCE LINKED'],
    ['08','VERIFICATION','Audit Test','The platform records how evidence is tested rather than assuming that possession of a document proves compliance.','TEST DEFINED'],
    ['09','EXCEPTION','Finding','A failed or uncertain audit test creates a finding that remains visible until disposition.','EXCEPTION OPEN'],
    ['10','REMEDIATION','Corrective Action','Corrective action has ownership, evidence and status. Closure requires proof rather than a text note.','ACTION CONTROLLED'],
    ['11','CLOSURE TEST','Re-verification','The relevant control is tested again after corrective action before downstream trust can be restored.','RE-TEST REQUIRED'],
    ['12','HUMAN / AUTHORITY','Authority Gate','Reserved determinations remain with accountable humans and competent authorities. AI assessment is advisory.','HITM REQUIRED'],
    ['13','MODEL STATE','Trust State','The internal model state expresses what the evidence currently supports. It is not a Halal certificate.','STATE COMPUTED'],
    ['14','OPERATIONS','Operational Release','Release is allowed only when required hard gates are satisfied. Operational release remains distinct from certification.','RELEASE GATED']
  ];
  const renderPath = i => {
    const d = pathData[i]; if (!d) return;
    $('#pathNumber').textContent = d[0]; $('#pathLabel').textContent = d[1]; $('#pathTitle').textContent = d[2]; $('#pathText').textContent = d[3]; $('#pathStatus').textContent = d[4];
    $$('.path-node').forEach((b,n) => b.classList.toggle('active', n===i));
  };
  $$('.path-node').forEach(btn => btn.addEventListener('click', () => renderPath(+btn.dataset.step)));

  const twinData = {
    facility:['FACILITY LAYER','Identity → zones → process controls','Evidence attaches to the real control point rather than disappearing into disconnected files.'],
    material:['MATERIAL LAYER','Supplier → material → lot → formula','Material genealogy can be bound forward into product and batch context, preserving provenance.'],
    lab:['LABORATORY LAYER','Sample → method → result → evidence','Laboratory evidence strengthens the assurance graph but does not itself become Halal certification.'],
    custody:['CUSTODY LAYER','Shipment → transfer → port → destination','Physical handoffs can be represented as signed custody events with exceptions routed into review.'],
    release:['RELEASE LAYER','Hard gates → authority gate → release','Operational release is the final software state only after mandatory gates are satisfied.']
  };
  $$('#twinTabs button').forEach(btn => btn.addEventListener('click', () => {
    $$('#twinTabs button').forEach(b => b.classList.remove('active')); btn.classList.add('active');
    const d=twinData[btn.dataset.layer]; const box=$('#twinCopyDetail'); if(!d||!box)return;
    box.innerHTML=`<span>${d[0]}</span><strong>${d[1]}</strong><p>${d[2]}</p>`;
  }));

  const corridorData = {
    origin:['ORIGIN EVIDENCE','Manufacturer, product, facility and batch identity establish the starting evidence context.','Real manufacturer and Shipment 001 transaction evidence remain external gates until supplied.'],
    lab:['LABORATORY EVIDENCE','Samples and results can be bound to the correct product, batch and method context.','Laboratory results are evidence objects, not certification decisions.'],
    port:['CUSTODY TRANSFER','Port and logistics events preserve who had custody, when, where and under what condition.','Missing or conflicting custody can trigger a trust fracture and HOLD.'],
    transit:['IN-TRANSIT ASSURANCE','Telemetry and event streams can strengthen continuity across the route.','Monitoring may detect exceptions; it does not create religious or regulatory authority.'],
    gcc:['DESTINATION GATE','Destination requirements and receiving verification determine whether the shipment can progress operationally.','GCC authority or importer acceptance remains an external decision gate.']
  };
  $$('.corridor-node').forEach(btn => btn.addEventListener('click', () => {
    $$('.corridor-node').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
    const d=corridorData[btn.dataset.corridor], box=$('#corridorDetail'); if(!d||!box)return;
    box.innerHTML=`<span>${d[0]}</span><strong>${d[1]}</strong><p>${d[2]}</p>`;
  }));

  const stakeholderData = {
    government:['GOVERNANCE / OVERSIGHT','See the evidence trail without surrendering authority.','Inspect source binding, controls, findings, re-verification and authority gates. The platform supports oversight; it does not issue sovereign or religious determinations.',['Source provenance','Audit lineage','Authority gate','Selective disclosure'],'G'],
    manufacturer:['ORIGIN / OPERATIONS','Turn compliance work into an operational evidence system.','Bind facility, product, material, batch and control evidence so readiness is visible before a shipment moves.',['Facility twin','Batch genealogy','Control evidence','CAPA'],'M'],
    laboratory:['LAB / EVIDENCE','Make every result traceable to the sample, method and shipment context.','Laboratory outputs become provenance-bound evidence objects that can be audited and re-used without inflating their authority.',['Sample identity','Method context','Result provenance','Scope control'],'L'],
    logistics:['MOVEMENT / CUSTODY','Preserve trust while custody changes hands.','Represent transfers, port events and monitored conditions as an evidence chain that exposes gaps instead of smoothing them over.',['Custody events','Port handoff','Geofence','Exception routing'],'P'],
    importer:['DESTINATION / MARKET','Receive a shipment with its trust context intact.','Destination actors can inspect the evidence state, outstanding gates and receiving verification without relying on a single opaque score.',['Receiving check','Destination gate','Trust packet','Controlled release'],'I']
  };
  $$('#stakeholderNav button').forEach(btn=>btn.addEventListener('click',()=>{
    $$('#stakeholderNav button').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
    const d=stakeholderData[btn.dataset.role]; if(!d)return;
    $('#stakeholderEyebrow').textContent=d[0]; $('#stakeholderTitle').textContent=d[1]; $('#stakeholderText').textContent=d[2]; $('#bigLetter').textContent=d[4];
    $('#stakeholderPoints').innerHTML=d[3].map(x=>`<span>${x}</span>`).join('');
  }));

  const magnetic = $$('.magnetic');
  if(matchMedia('(pointer:fine)').matches){magnetic.forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.08}px,${y*.12}px)`});el.addEventListener('mouseleave',()=>el.style.transform='')})}

  function fitCanvas(canvas){const r=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);canvas.width=r.width*d;canvas.height=r.height*d;const c=canvas.getContext('2d');c.setTransform(d,0,0,d,0,0);return {ctx:c,w:r.width,h:r.height}}

  const world=$('#worldCanvas');
  if(world){
    let pointer={x:.62,y:.42}; let state;
    const resize=()=>state=fitCanvas(world); resize(); addEventListener('resize',resize);
    world.addEventListener('pointermove',e=>{const r=world.getBoundingClientRect();pointer={x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height}});
    const pts=Array.from({length:150},(_,i)=>({lat:Math.asin(2*(i+.5)/150-1),lon:Math.PI*(1+Math.sqrt(5))*i,phase:Math.random()*6.28}));
    const hubs=[[.12,.38],[.27,.28],[.46,.45],[.64,.34],[.79,.53],[.88,.39]];
    function draw(t){if(!state)return;const {ctx,w,h}=state;ctx.clearRect(0,0,w,h);const cx=w*.73,cy=h*.46,R=Math.min(w,h)*.31;const rot=t*.00006+(pointer.x-.5)*.35;ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.stroke();
      pts.forEach(p=>{const x=Math.cos(p.lat)*Math.cos(p.lon+rot),z=Math.cos(p.lat)*Math.sin(p.lon+rot),y=Math.sin(p.lat);if(z<-.2)return;const s=.8+z*.4;ctx.fillStyle=`rgba(190,220,206,${.12+z*.16})`;ctx.beginPath();ctx.arc(cx+x*R,cy+y*R,Math.max(.5,s),0,Math.PI*2);ctx.fill()});
      ctx.strokeStyle='rgba(125,240,197,.16)';hubs.forEach((a,i)=>hubs.slice(i+1,i+2).forEach(b=>{ctx.beginPath();ctx.moveTo(w*a[0],h*a[1]);ctx.quadraticCurveTo(w*(a[0]+b[0])/2,h*((a[1]+b[1])/2-.08),w*b[0],h*b[1]);ctx.stroke()}));
      requestAnimationFrame(draw)} requestAnimationFrame(draw)
  }

  const sig=$('#signalCanvas');
  if(sig){let state;const resize=()=>state=fitCanvas(sig);resize();addEventListener('resize',resize);function draw(t){if(!state)return;const{ctx,w,h}=state;ctx.clearRect(0,0,w,h);ctx.strokeStyle='rgba(255,255,255,.04)';for(let x=0;x<w;x+=42){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}for(let y=0;y<h;y+=42){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}const series=[['#7df0c5',.18,.12,0],['#bba16c',.28,.07,1.6],['#7a92c8',.36,.1,3.1],['#b7b7af',.45,.055,4.3]];series.forEach(([color,base,amp,ph])=>{ctx.strokeStyle=color;ctx.lineWidth=1.2;ctx.beginPath();for(let x=0;x<=w;x+=3){const y=h*base+Math.sin(x*.018+t*.001+ph)*h*amp*.35+Math.sin(x*.05+t*.0005)*6;if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.stroke()});requestAnimationFrame(draw)}requestAnimationFrame(draw)}

  const final=$('#finalCanvas');
  if(final){let state;const resize=()=>state=fitCanvas(final);resize();addEventListener('resize',resize);const nodes=Array.from({length:55},()=>({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.00008,vy:(Math.random()-.5)*.00008}));function draw(){if(!state)return;const{ctx,w,h}=state;ctx.clearRect(0,0,w,h);nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>1)n.vx*=-1;if(n.y<0||n.y>1)n.vy*=-1;ctx.fillStyle='rgba(125,240,197,.35)';ctx.fillRect(n.x*w,n.y*h,1,1)});for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j],dx=(a.x-b.x)*w,dy=(a.y-b.y)*h,d=Math.hypot(dx,dy);if(d<135){ctx.strokeStyle=`rgba(125,240,197,${(1-d/135)*.07})`;ctx.beginPath();ctx.moveTo(a.x*w,a.y*h);ctx.lineTo(b.x*w,b.y*h);ctx.stroke()}}requestAnimationFrame(draw)}draw()}
})();
