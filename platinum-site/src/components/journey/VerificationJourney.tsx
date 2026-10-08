import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const stages = [
  {
    id: "facility",
    index: "01",
    eyebrow: "SMART FACILITY",
    title: "Controls begin at the real operating point.",
    text: "Facility, process, product, material and control-point evidence are linked before a readiness conclusion is made.",
    status: ["HCP evidence: connected", "Production controls: monitored where configured", "Authority state: separately governed"],
  },
  {
    id: "laboratory",
    index: "02",
    eyebrow: "LABORATORY",
    title: "Science becomes evidence through provenance.",
    text: "Sample identity, chain of custody, method/QC, result, review and signature remain inspectable. NOT_DETECTED ≠ HALAL.",
    status: ["Sample identity: bound", "Method/QC: evidence chain", "Certification: competent-authority decision"],
  },
  {
    id: "port",
    index: "03",
    eyebrow: "PORT / CUSTOMS HANDSHAKE",
    title: "The trust packet reaches the sovereign boundary.",
    text: "AHTE can provide authorised shipment trust context. Inspection, hold and release remain with the competent port/customs authority.",
    status: ["Adapter: contract-ready", "Sovereign release: external", "Direct route: China → GCC"],
  },
  {
    id: "consumer",
    index: "04",
    eyebrow: "AUTHORIZED VERIFICATION",
    title: "The market sees only the disclosure it is entitled to see.",
    text: "Issuer-authorised QR or token disclosures can expose product, batch or shipment evidence without making private factory records publicly searchable.",
    status: ["Verification: approved disclosure", "Disclosure: purpose-bound", "Authority reference: issuer-controlled"],
  },
];

export function VerificationJourney({ sectionId = "verification-journey" }: { sectionId?: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;

    const root = rootRef.current;
    let cancelled = false;
    let cleanup = () => {};

    const observer = new IntersectionObserver(async entries => {
      if (!entries.some(entry => entry.isIntersecting) || cancelled) return;
      observer.disconnect();

      const [{ gsap }, scrollTriggerModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add("(min-width: 801px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".journey-stage", root);
        const ctx = gsap.context(() => {
          panels.forEach((panel, index) => {
            if (index === panels.length - 1) return;
            ScrollTrigger.create({
              trigger: panel,
              start: "top top+=96",
              end: "bottom top+=96",
              pin: panel.querySelector(".journey-stage-inner"),
              pinSpacing: false,
              scrub: .5,
            });
          });
        }, root);
        return () => ctx.revert();
      });

      mm.add("(max-width: 800px)", () => {
        const ctx = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>(".journey-stage", root).forEach(panel => {
            gsap.fromTo(panel, { opacity: .45, y: 28 }, {
              opacity: 1,
              y: 0,
              duration: .6,
              scrollTrigger: { trigger: panel, start: "top 82%", once: true },
            });
          });
        }, root);
        return () => ctx.revert();
      });

      cleanup = () => mm.revert();
    }, { rootMargin: "450px 0px" });

    observer.observe(root);

    return () => {
      cancelled = true;
      observer.disconnect();
      cleanup();
    };
  }, [reducedMotion]);

  return (
    <section className="section journey-section" id={sectionId || undefined} ref={rootRef} aria-labelledby="journey-title">
      <div className="section-heading">
        <p className="eyebrow">09 / VERIFICATION JOURNEY</p>
        <h2 id="journey-title">Four stages. One evidence lineage. No collapsed authority boundary.</h2>
        <p>Scroll through the assurance journey. Reduced-motion users receive the same content as a static stacked sequence.</p>
      </div>

      <div className="journey-stack">
        {stages.map((stage) => (
          <article className={`journey-stage journey-${stage.id}`} key={stage.id}>
            <div className="journey-stage-inner glass">
              <div className="journey-stage-copy">
                <span className="journey-index">{stage.index}</span>
                <p className="eyebrow">{stage.eyebrow}</p>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
                <ul>
                  {stage.status.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="journey-visual" aria-hidden="true">
                {stage.id === "facility" && (
                  <div className="facility-schematic">
                    <span className="robot-arm arm-a" /><span className="robot-arm arm-b" />
                    <i className="facility-line l1" /><i className="facility-line l2" /><i className="facility-line l3" />
                    <b>CONTROL EVIDENCE</b>
                  </div>
                )}
                {stage.id === "laboratory" && (
                  <div className="gel-schematic">
                    <i /><i /><i /><i /><i /><i /><i /><i />
                    <b>SCIENTIFIC EVIDENCE</b>
                  </div>
                )}
                {stage.id === "port" && (
                  <div className="port-lock">
                    <span className="container-box">GHSCL / CORRIDOR</span>
                    <span className="digital-lock">⌾</span>
                    <b>AUTHORITY DECISION</b>
                  </div>
                )}
                {stage.id === "consumer" && (
                  <div className="phone-verify">
                    <span className="phone-notch" />
                    <div className="phone-screen">
                      <span className="qr-mini">{Array.from({length:25},(_,i)=><i key={i} className={i%3===0||i%7===0?"on":""} />)}</span>
                      <b>AUTHORIZED DISCLOSURE</b>
                      <svg viewBox="0 0 80 80"><path d="M17 42 33 57 64 24" /></svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
