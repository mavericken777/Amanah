(() => {
  const qs = (s, root = document) => root.querySelector(s);
  const qsa = (s, root = document) => [...root.querySelectorAll(s)];

  const progress = qs('#scrollProgress');
  const header = qs('#siteHeader');
  const menuToggle = qs('#menuToggle');
  const mobileNav = qs('#mobileNav');

  const onScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (scrollTop / max) * 100 : 0}%`;
    if (header) header.classList.toggle('scrolled', scrollTop > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    qsa('a', mobileNav).forEach(a => a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  qsa('.reveal').forEach(el => revealObserver.observe(el));

  const architecture = [
    ['01','SOURCE OF LEGITIMACY','Authority','The control path begins with the competent authority or destination requirement. The platform records the authority boundary; it does not replace it.'],
    ['02','TECHNICAL INSTRUMENT','Standard / Instrument','The applicable technical instrument is versioned and source-bound. Licensed normative wording remains with its authoritative source.'],
    ['03','MACHINE-READABLE LOCATOR','Clause / Requirement','Requirement objects identify the exact clause or obligation that must be evaluated without inventing missing normative language.'],
    ['04','SCOPE DECISION','Applicability','The system records why a requirement applies to a product, facility, process, shipment, jurisdiction or destination context.'],
    ['05','OPERATING CONTROL','Control','Requirements become executable controls with owners, monitoring logic, evidence expectations and verification criteria.'],
    ['06','CRITICAL CONTROL POINT','HCP / SCCP','Halal Control Points and Shariah Critical Control Points isolate the points where loss of control has material trust consequences.'],
    ['07','PROVABLE RECORD','Evidence','Documents, laboratory records, telemetry, identity data and custody events are bound with provenance, timestamps and integrity references.'],
    ['08','TEST OF CONTROL','Audit Test','Evidence is not accepted merely because it exists. Audit tests evaluate whether the defined control is operating as intended.'],
    ['09','EXCEPTION OBJECT','Finding','A failed, partial or conflicting result becomes a finding with traceable linkage to the requirement, control and evidence that produced it.'],
    ['10','REMEDIATION','Corrective Action','Corrective action records the owner, action, due state and supporting evidence needed to close the finding.'],
    ['11','PROOF OF CLOSURE','Re-verification','Closure requires re-verification. A declared fix does not silently restore trust without supporting evidence.'],
    ['12','RESERVED DECISION','Authority Gate','Reserved decisions are routed to accountable humans and competent authorities. AI assessment remains advisory at this boundary.'],
    ['13','INTERNAL MODEL STATE','Trust State','The platform expresses the current assurance state — including hold, contested or eligible — without presenting that state as a certificate.'],
    ['14','CONTROLLED EXECUTION','Operational Release','Release is an operational control decision reached only after required gates are satisfied. Operational release is not Halal certification.']
  ];

  const archButtons = qsa('.arch-step');
  const detailNumber = qs('#detailNumber');
  const detailLabel = qs('#detailLabel');
  const detailTitle = qs('#detailTitle');
  const detailText = qs('#detailText');

  archButtons.forEach(btn => btn.addEventListener('click', () => {
    const idx = Number(btn.dataset.step || 0);
    archButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const data = architecture[idx];
    if (!data) return;
    if (detailNumber) detailNumber.textContent = data[0];
    if (detailLabel) detailLabel.textContent = data[1];
    if (detailTitle) detailTitle.textContent = data[2];
    if (detailText) detailText.textContent = data[3];
  }));

  const twinContent = {
    facility:['FACILITY LAYER','Identity → zones → process controls','Digital structure mirrors the real operating environment so evidence can be attached to the correct control point rather than stored as isolated files.'],
    materials:['MATERIAL GENEALOGY','Supplier → material lot → formula → batch','Material lineage connects incoming identity and evidence to the product version and batch that ultimately enters trade.'],
    laboratory:['LABORATORY EVIDENCE','Sample → method → result → scope','Laboratory records remain evidence objects with method, scope, provenance and chain-of-custody context. A laboratory result is not itself Halal certification.'],
    custody:['PHYSICAL-DIGITAL CUSTODY','Handover → seal → geofence → receiving','Signed custody events and physical condition signals create continuity between the evidence record and the real movement of goods.'],
    release:['CONTROLLED RELEASE','Hard gates → HITM → authority gate → release','Operational release occurs only after the required gates are satisfied. Critical fractures route to hold and re-verification rather than automatic release.']
  };
  const twinDetail = qs('#twinDetail');
  qsa('#twinTabs button').forEach(btn => btn.addEventListener('click', () => {
    qsa('#twinTabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const d = twinContent[btn.dataset.twin];
    if (d && twinDetail) {
      twinDetail.innerHTML = `<small>${d[0]}</small><strong>${d[1]}</strong><p>${d[2]}</p>`;
    }
  }));

  const roles = {
    government:{label:'GOVERNMENT & AUTHORITY',title:'Inspect the evidence path without surrendering decision authority.',text:'Source references, findings, CAPA, re-verification and authority gates are separated from AI assessment. Reserved determinations remain accountable human decisions.',items:['Authority-gated decision points','Traceable evidence provenance','Exception and fracture visibility','Auditable release history']},
    manufacturer:{label:'MANUFACTURERS',title:'Turn operating controls into evidence that can travel with the product.',text:'Facility identity, product versions, material genealogy, process controls and batch evidence can be linked before a shipment ever reaches the border.',items:['Facility and product identity','Material and batch genealogy','Control ownership and CAPA','Evidence-ready shipment records']},
    laboratory:{label:'LABORATORIES',title:'Preserve laboratory evidence as evidence — with scope, method and provenance intact.',text:'Samples and results can be connected to the exact product, batch and control question they support while keeping the certification boundary explicit.',items:['Sample chain of custody','Method and scope metadata','Result provenance','Direct linkage to audit questions']},
    logistics:{label:'LOGISTICS & PORTS',title:'Make custody continuity visible from handover to destination.',text:'Shipment identity, seals, geofences, transport events and port custody can become signed evidence rather than disconnected operational messages.',items:['Shipment and container identity','Custody handovers','Seal and telemetry events','Port and border gateway records']},
    importer:{label:'IMPORTERS & RETAIL',title:'Receive a trust packet that shows what happened — not merely a badge.',text:'Destination stakeholders can inspect the relevant evidence chain, authority gates and exception history needed for receiving and market-entry decisions.',items:['Receiving verification','Destination requirement mapping','Controlled disclosure','Recall and traceability support']}
  };
  const stakeholderView = qs('#stakeholderView');
  qsa('#stakeholderTabs button').forEach(btn => btn.addEventListener('click', () => {
    qsa('#stakeholderTabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const d = roles[btn.dataset.role];
    if (!d || !stakeholderView) return;
    stakeholderView.innerHTML = `<div><span class="mono-label">${d.label}</span><h3>${d.title}</h3><p>${d.text}</p></div><ul>${d.items.map(i => `<li>${i}</li>`).join('')}</ul>`;
  }));

  const stackCards = qsa('.stack-card');
  stackCards.forEach(card => card.addEventListener('mouseenter', () => {
    stackCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  }));

  const canvas = qs('#trustCanvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = 1, raf = 0;
    let points = [];

    const makePoints = () => {
      const count = Math.max(28, Math.min(70, Math.round((w * h) / 24000)));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - .5) * .18,
        vy: (Math.random() - .5) * .18,
        r: Math.random() * 1.2 + .35
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makePoints();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      points.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = w + 20; if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20; if (p.y > h + 20) p.y = -20;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = i % 7 === 0 ? 'rgba(216,184,107,.48)' : 'rgba(77,227,176,.38)'; ctx.fill();
      });
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j];
          const dx = a.x - b.x, dy = a.y - b.y, dist = Math.hypot(dx, dy);
          if (dist < 145) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(77,227,176,${(1 - dist / 145) * .11})`; ctx.lineWidth = .65; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize(); draw();
    window.addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); draw(); }, { passive: true });
  }
})();
