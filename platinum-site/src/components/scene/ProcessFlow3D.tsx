import { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { ProcessScene3D } from "./ProcessScene3D";

export function ProcessFlow3D({ title, steps, mode = "corridor", id, descriptions = [], labels = {} }: { title: string; steps: string[]; mode?: string; id?: string; descriptions?: string[]; labels?: { previous?: string; next?: string; pause?: string; play?: string; overview?: string; showStep?: string; reduced?: string } }) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reducedMotion = useReducedMotion();
  const selected = steps[Math.min(active, Math.max(0, steps.length - 1))] || title;

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const observer = new IntersectionObserver(entries => setVisible(entries.some(entry => entry.isIntersecting)));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !playing || reducedMotion || steps.length < 2) return;
    const timer = window.setInterval(() => { if (!document.hidden) setActive(current => (current + 1) % steps.length); }, 5200);
    return () => window.clearInterval(timer);
  }, [playing, reducedMotion, steps.length, visible]);

  return <div ref={host} className="process-flow-experience" id={id} aria-label={`${title} animated process flow`}>
    <div className="process-flow-heading"><span>{labels.overview || "PROCESS EXPLANATION"}</span><strong>{String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</strong></div>
    <ProcessScene3D mode={mode} stage={selected} index={active} controlled playing={playing && !reducedMotion && visible} detail={descriptions[active]} className="process-flow-scene" />
    <div className="process-flow-controls">
      <button type="button" aria-label="Previous process step" onClick={() => { setActive(current => (current - 1 + steps.length) % steps.length); setPlaying(false); }}>{labels.previous || "Previous"}</button>
      <button type="button" onClick={() => setPlaying(value => !value)}>{playing && !reducedMotion ? labels.pause || "Pause animation" : labels.play || "Play animation"}</button>
      <button type="button" aria-label="Next process step" onClick={() => { setActive(current => (current + 1) % steps.length); setPlaying(false); }}>{labels.next || "Next"}</button>
    </div>
    <p className="process-flow-current" aria-live="polite">{selected}</p>
    <nav className="process-flow-steps" aria-label={`${title} steps`}>
      {steps.map((step, index) => <button key={`${step}-${index}`} type="button" aria-current={active === index ? "step" : undefined} aria-label={`${labels.showStep || "Show step"} ${index + 1}: ${step}`} onClick={() => { setActive(index); setPlaying(false); }}><span>{String(index + 1).padStart(2, "0")}</span><span>{step}</span></button>)}
    </nav>
    {reducedMotion ? <p className="process-flow-note">{labels.reduced || "Automatic movement is paused by your reduced-motion preference. Use the step controls to inspect the process sequence."}</p> : null}
  </div>;
}
