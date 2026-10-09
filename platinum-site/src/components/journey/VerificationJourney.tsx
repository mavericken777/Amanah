import { useEffect, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { demoJourneyStages } from "../../data/demoJourney";
import { ProcessScene3D } from "../scene/ProcessScene3D";

export function VerificationJourney({ sectionId = "verification-journey" }: { sectionId?: string }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reducedMotion = useReducedMotion();
  const stage = demoJourneyStages[active];

  useEffect(() => {
    if (!playing || reducedMotion) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % demoJourneyStages.length), 5200);
    return () => window.clearInterval(timer);
  }, [playing, reducedMotion]);

  return (
    <section className="section journey-section" id={sectionId || undefined} aria-labelledby="journey-title">
      <div className="section-heading">
        <p className="eyebrow">09 / COMPLETE VERIFICATION JOURNEY</p>
        <h2 id="journey-title">Twenty real operating stages, rendered as one connected process.</h2>
        <p>Follow each physical handoff from origin and onboarding through laboratory, audit, production, custody, GCC receiving and verification. Select any stage to inspect who acts and what evidence moves with it.</p>
      </div>
      <div className="journey-3d-workspace">
        <ProcessScene3D mode="corridor" stage={`${stage[0]} · ${stage[2]}`} index={active} className="journey-3d-scene" />
        <div className="journey-3d-detail glass" aria-live="polite">
          <div className="journey-progress-label"><span>LIVE PROCESS STAGE</span><strong>{String(active + 1).padStart(2, "0")} / {String(demoJourneyStages.length).padStart(2, "0")}</strong></div>
          <h3>{stage[0]}</h3>
          <p>{stage[1]}</p>
          <dl className="journey-evidence">
            <div><dt>Accountable actor</dt><dd>{stage[2]}</dd></div>
            <div><dt>Evidence created or consumed</dt><dd>{stage[3]}</dd></div>
            <div><dt>Next handoff</dt><dd>{stage[4]}</dd></div>
          </dl>
        </div>
      </div>
      <div className="journey-3d-controls" role="group" aria-label="3D journey playback">
        <button type="button" onClick={() => { setPlaying(false); setActive(current => (current - 1 + demoJourneyStages.length) % demoJourneyStages.length); }}>Previous stage</button>
        <button type="button" onClick={() => setPlaying(value => !value)}>{playing && !reducedMotion ? "Pause journey" : "Play journey"}</button>
        <button type="button" onClick={() => { setPlaying(false); setActive(current => (current + 1) % demoJourneyStages.length); }}>Next stage</button>
        <button type="button" onClick={() => { setActive(0); setPlaying(true); }}>Restart at origin</button>
        <span aria-live="off">{reducedMotion ? "Animation follows your reduced-motion setting." : playing ? "Automatically advancing through all stages." : "Paused for inspection."}</span>
      </div>
      <nav className="journey-3d-stage-list" aria-label="Choose a process stage">
        {demoJourneyStages.map(([title], index) => <button key={title} type="button" aria-current={active === index ? "step" : undefined} onClick={() => { setActive(index); setPlaying(false); }}><span>{String(index + 1).padStart(2, "0")}</span><span>{title}</span></button>)}
      </nav>
      {reducedMotion ? <p className="process-flow-note">Automatic movement is paused by your reduced-motion preference. Stage selection remains available.</p> : null}
    </section>
  );
}
