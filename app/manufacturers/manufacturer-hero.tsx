"use client";

import { useEffect, useRef } from "react";

const layers = [
  { number: "01", label: "ORIGIN", detail: "Supplier & material provenance" },
  { number: "02", label: "FACILITY", detail: "Controls & evidence" },
  { number: "03", label: "ASSURANCE", detail: "Lab, audit & review" },
  { number: "04", label: "MARKET", detail: "China → GCC readiness" },
];

export function ManufacturerHero() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onPointerMove = (event: PointerEvent) => {
      const bounds = scene.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
      targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      scene.style.setProperty("--pointer-x", `${currentX.toFixed(2)}px`);
      scene.style.setProperty("--pointer-y", `${currentY.toFixed(2)}px`);
      frame = window.requestAnimationFrame(render);
    };

    scene.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = window.requestAnimationFrame(render);
    return () => {
      scene.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className="manufacturer-experience">
      <a className="manufacturer-skip" href="#manufacturer-main">Skip to content</a>
      <header className="manufacturer-header">
        <a className="manufacturer-brand" href="/" aria-label="Amanah home">
          <span className="manufacturer-brand-mark" aria-hidden="true">A</span>
          <span><strong>AMANAH</strong><small>GLOBAL HALAL DIGITAL TRUST</small></span>
        </a>
        <nav className="manufacturer-nav" aria-label="Main navigation">
          <a href="#journey">The journey</a>
          <a href="#readiness">Readiness</a>
          <a className="manufacturer-nav-cta" href="/login">Open workspace <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section className="manufacturer-hero" id="manufacturer-main" aria-labelledby="manufacturer-title">
        <div className="manufacturer-grain" aria-hidden="true" />
        <div className="manufacturer-orbit manufacturer-orbit-one" aria-hidden="true" />
        <div className="manufacturer-orbit manufacturer-orbit-two" aria-hidden="true" />
        <div className="manufacturer-hero-copy">
          <p className="manufacturer-eyebrow"><span /> MANUFACTURER READINESS / 01</p>
          <h1 id="manufacturer-title">
            Prepare your products
            <span>for the <em>next market.</em></span>
          </h1>
          <p className="manufacturer-lede">
            Bring your facility, ingredients, suppliers, controls, laboratory records
            and audit actions into one readiness journey. Keep the systems you use;
            make the evidence that connects them easier to understand.
          </p>
          <div className="manufacturer-actions">
            <a className="manufacturer-button-primary" href="/login">Open Amanah workspace <span aria-hidden="true">↗</span></a>
            <a className="manufacturer-button-secondary" href="#journey">Explore the journey <span aria-hidden="true">↓</span></a>
          </div>
          <div className="manufacturer-proofline">
            <span className="manufacturer-proof-dot" />
            Evidence-led preparation <i aria-hidden="true">/</i> Human authority decisions
          </div>
        </div>

        <div className="manufacturer-visual" ref={sceneRef} aria-label="Illustration of connected manufacturer readiness layers">
          <div className="manufacturer-visual-top"><span>AMANAH / READINESS SYSTEM</span><span>LIVE MODEL <b>●</b></span></div>
          <div className="manufacturer-geometry" aria-hidden="true">
            <div className="manufacturer-ring ring-a" />
            <div className="manufacturer-ring ring-b" />
            <div className="manufacturer-ring ring-c" />
            <div className="manufacturer-core"><span>AH</span><small>TRUST<br />LAYER</small></div>
            <div className="manufacturer-node node-a"><span>01</span></div>
            <div className="manufacturer-node node-b"><span>02</span></div>
            <div className="manufacturer-node node-c"><span>03</span></div>
            <div className="manufacturer-node node-d"><span>04</span></div>
            <div className="manufacturer-link link-a" />
            <div className="manufacturer-link link-b" />
            <div className="manufacturer-link link-c" />
          </div>
          <div className="manufacturer-visual-caption"><span>FIG. 01</span><span>FROM SOURCE TO MARKET</span></div>
          <div className="manufacturer-visual-index">
            {layers.map((layer) => (
              <div className="manufacturer-index-row" key={layer.number}>
                <span className="manufacturer-index-number">{layer.number}</span>
                <span className="manufacturer-index-text"><strong>{layer.label}</strong><small>{layer.detail}</small></span>
                <span className="manufacturer-index-arrow" aria-hidden="true">↗</span>
              </div>
            ))}
          </div>
        </div>

        <div className="manufacturer-scroll-note" aria-hidden="true"><span /> SCROLL TO EXPLORE</div>
        <div className="manufacturer-hero-footer"><span>01 — PREPARE</span><span>ORIGIN <b>→</b> FACILITY <b>→</b> EVIDENCE <b>→</b> MARKET</span><span>AMANAH / 2026</span></div>
      </section>

      <section className="manufacturer-next" id="journey">
        <p className="manufacturer-eyebrow">A CONNECTED OPERATING VIEW</p>
        <h2>One journey. Clearer readiness.</h2>
        <p>Preparation starts with the real operating picture: who makes the product, where it is made, what goes into it, which controls apply and what evidence is still needed.</p>
        <div className="manufacturer-process" aria-label="Four preparation stages">
          <div><span>01</span><strong>Confirm production scope</strong><small>Facility, line, product and SKU</small></div>
          <div><span>02</span><strong>Check process controls</strong><small>Requirements mapped to evidence</small></div>
          <div><span>03</span><strong>Record the batch</strong><small>Materials, records and provenance</small></div>
          <div><span>04</span><strong>Prepare traceable dispatch</strong><small>Custody and market handoff</small></div>
        </div>
      </section>

      <section className="manufacturer-readiness" id="readiness">
        <div><p className="manufacturer-eyebrow">START WITH WHAT YOU HAVE</p><h2>Readiness, made practical.</h2></div>
        <p>Use your existing systems and records as the starting point. The next stage of this experience will help organize the five preparation areas into a clear, actionable view.</p>
      </section>
      <footer className="manufacturer-footer"><a className="manufacturer-brand" href="/"><span className="manufacturer-brand-mark" aria-hidden="true">A</span><span><strong>AMANAH</strong><small>GLOBAL HALAL DIGITAL TRUST</small></span></a><span>Evidence before trust. Trust before operational release.</span><a href="/login">Enter workspace ↗</a></footer>
    </main>
  );
}
