/* Public architecture interactions. No demo record is written to a production system. */
(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const menu = $('.site-menu');
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape' && menu?.open) { menu.open=false; menu.querySelector('summary').focus(); }
  });
  document.addEventListener('click', e => { if(menu?.open && !menu.contains(e.target)) menu.open=false; });
  const node = (tag, text, cls) => { const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el; };
  function download(name, value) {
    const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)+'\n'],{type:'application/json'}));
    const a=node('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  async function demo() {
    if(!$('#graphNodes')&&!$('#chainButtons')&&!$('#auditDemo')&&!$('#onboardingChecklist'))return;
    try {
      const response=await fetch('fixtures/architecture-demo.json',{credentials:'omit'});
      if(!response.ok)throw new Error('Architecture examples could not be loaded.');
      const data=await response.json();
      if(data.environment!=='demo'||data.simulated!==true)throw new Error('Demonstration boundary missing.');
      if($('#graphNodes')) {
        const buttons=[];
        function select(n,i) {
          buttons.forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));
          const panel=$('#graphDetail');panel.replaceChildren(node('h3',n.name),node('p',n.relations));
          const dl=node('dl');
          for(const [key,value] of [['Identity','Architecture node; production ID not issued'],['Evidence obligations',n.evidence],['Designed state / gate',n.state],['Integrity','Source, signature and hash checks required; no proof fabricated'],['Last update','No production event timestamp']]) dl.append(node('dt',key),node('dd',value));
          panel.append(dl);
        }
        data.nodes.forEach((n,i)=>{const b=node('button',n.name);b.type='button';b.addEventListener('click',()=>select(n,i));buttons.push(b);$('#graphNodes').append(b);});
        select(data.nodes[0],0);
      }
      if($('#chainButtons')) {
        const buttons=[];
        function select(c,i) {
          buttons.forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));
          const list=node('ol',undefined,'system-flow');c.steps.forEach(s=>list.append(node('li',s)));
          $('#chainDetail').replaceChildren(node('p',c.meaning),list);
        }
        data.chains.forEach((c,i)=>{const b=node('button',c.name);b.type='button';b.addEventListener('click',()=>select(c,i));buttons.push(b);$('#chainButtons').append(b);});select(data.chains[0],0);
      }
      if($('#auditDemo')) {
        let stage=0;
        const steps=data.audit.map(s=>{const li=node('li',s.title);$('#auditSteps').append(li);return li;});
        function render() {
          const s=data.audit[stage];$('#auditStage').textContent=s.hud;$('#auditObservation').textContent=`Step ${stage+1} / ${data.audit.length} · simulated`;
          $('#auditTitle').textContent=s.title;$('#auditText').textContent=s.text;$('#auditProof').textContent=s.proof;
          $('#auditPrevious').disabled=stage===0;$('#auditNext').disabled=stage===data.audit.length-1;
          steps.forEach((li,i)=>{if(i===stage)li.setAttribute('aria-current','step');else li.removeAttribute('aria-current');});
        }
        $('#auditNext').addEventListener('click',()=>{stage=Math.min(stage+1,data.audit.length-1);render();});
        $('#auditPrevious').addEventListener('click',()=>{stage=Math.max(0,stage-1);render();});$('#auditReset').addEventListener('click',()=>{stage=0;render();});render();
      }
      if($('#onboardingChecklist')) {
        const inputs=[];
        function summary(){const count=inputs.filter(i=>i.checked).length;$('#readinessSummary').textContent=`${count} of ${inputs.length} dossier areas self-reported as prepared. This is a preparation checklist, not an approval score.`;}
        data.readiness.forEach(([title,description])=>{const label=node('label'),input=node('input');input.type='checkbox';input.addEventListener('change',summary);const span=node('span',title);span.append(node('small',description));label.append(input,span);inputs.push(input);$('#onboardingChecklist').append(label);});summary();
        $('#downloadReadiness').addEventListener('click',()=>download('manufacturer-preparation.json',{purpose:'local preparation only',submitted:false,certification:false,areas:data.readiness.map(([title,description],i)=>({title,description,selfReportedPrepared:inputs[i].checked}))}));
      }
    } catch(error) {
      const host=$('#explorer')||$('#chainExplorer')||$('#auditDemo')||$('#onboarding');host?.append(node('p',error.message,'verification-error'));
    }
  }
  demo();
  const verify=$('#verificationForm');
  verify?.addEventListener('submit',async e=>{
    e.preventDefault();const panel=$('#verificationResult'),button=$('#verifyButton');
    let token=$('#verificationToken').value.trim();
    // Accept issuer QR links only from this public site or the known verification service.
    if(/^https?:/i.test(token)) {
      try {const u=new URL(token);if(!['https://mavericken777.github.io','https://lqvyyylrydcpjochknag.supabase.co'].includes(u.origin))throw new Error();token=u.searchParams.get('token')||'';}
      catch {panel.replaceChildren(node('p','Use an AHTE token or a link from the known AHTE verification service.','verification-error'));return;}
    }
    if(token.length<32||token.length>2048){panel.replaceChildren(node('p','A valid issuer-provided token is required. Product or shipment ID alone is insufficient.','verification-error'));return;}
    button.disabled=true;button.textContent='Verifying…';panel.replaceChildren(node('p','Requesting the authorized disclosure…'));panel.setAttribute('aria-busy','true');
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
    try {
      const url=new URL('https://lqvyyylrydcpjochknag.supabase.co/functions/v1/public-verify');url.searchParams.set('token',token);
      const response=await fetch(url,{credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer',signal:controller.signal});
      const result=await response.json();
      if(!response.ok||result.valid!==true) {
        const message=response.status===404?'No current authorized disclosure was found. The token may be unknown, revoked or expired.':response.status===400?'The service requires a valid disclosure token.':'Verification is unavailable. Try again later; no trust or certification conclusion can be drawn.';
        panel.replaceChildren(node('p',message,'verification-error'));return;
      }
      if(result.not_certification!==true||result.verification_scope!=='disclosure_token_only')throw new Error('Unexpected disclosure boundary');
      const dl=node('dl',undefined,'verification-fields');
      // Render only the issuer-authorized disclosure; never request internal packet payloads.
      for(const [key,value] of [['Packet reference',result.packet_id],['System packet state',result.status],['Recorded content hash',result.content_hash]])dl.append(field(key,value));
      if(result.disclosure&&typeof result.disclosure==='object')for(const [key,value] of Object.entries(result.disclosure))dl.append(field(key,value));
      panel.replaceChildren(node('h3','Authorized disclosure retrieved'),dl,node('p','Token resolution is not certification or an independent signature verification. The fields shown are limited by the issuer’s disclosure authorization.'));
    } catch {panel.replaceChildren(node('p','The disclosure could not be verified. Check connectivity and try again; no approval is inferred.','verification-error'));}
    finally {clearTimeout(timer);button.disabled=false;button.textContent='Verify disclosure';panel.removeAttribute('aria-busy');}
  });
  function field(key,value){const box=node('div');box.append(node('dt',key),node('dd',typeof value==='object'?JSON.stringify(value,null,2):String(value??'Not disclosed')));return box;}
  $('#enquiryForm')?.addEventListener('submit',e=>{e.preventDefault();download('ecosystem-enquiry.json',{workstream:$('#enquiryRole').value,scope:$('#enquiryScope').value.trim(),submitted:false,delivery:'Use your established project contact. No production enquiry service configured.'});$('#enquiryStatus').textContent='Local enquiry brief downloaded. No message was sent.';});
})();
