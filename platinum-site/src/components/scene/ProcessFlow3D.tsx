import { useEffect, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { ProcessScene3D } from "./ProcessScene3D";

export function ProcessFlow3D({ title, steps, mode = "corridor", id }: { title: string; steps: string[]; mode?: string; id?: string }) {
  const locale=mode==='ar'?'ar':mode==='zh-Hant'?'zh-Hant':'en';
  const words=locale==='zh-Hant'?['營運流程','上一步','下一步','暫停動畫','播放動畫','依您的偏好暫停自動播放，請使用步驟控制。']:locale==='ar'?['مسار التشغيل','السابق','التالي','إيقاف الحركة','تشغيل الحركة','تم إيقاف الحركة حسب تفضيلاتك. استخدم عناصر التحكم بالخطوات.']:['ANIMATED OPERATING VIEW','Previous','Next','Pause animation','Play animation','Automatic movement is paused by your reduced-motion preference. Use the step controls to inspect the process sequence.'];
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reducedMotion = useReducedMotion();
  const selected = steps[Math.min(active, Math.max(0, steps.length - 1))] || title;

  useEffect(() => {
    if (!playing || reducedMotion || steps.length < 2) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % steps.length), 5200);
    return () => window.clearInterval(timer);
  }, [playing, reducedMotion, steps.length]);

  return <div className="process-flow-experience" id={id} aria-label={`${title} animated process flow`}>
    <div className="process-flow-heading"><span>{words[0]}</span><strong>{String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</strong></div>
    <ProcessScene3D mode={mode} stage={`${title} · ${selected}`} index={active} className="process-flow-scene" />
    <div className="process-flow-controls">
      <button type="button" aria-label="Previous process step" onClick={() => setActive(current => (current - 1 + steps.length) % steps.length)}>{words[1]}</button>
      <button type="button" onClick={() => setPlaying(value => !value)}>{playing && !reducedMotion ? words[3] : words[4]}</button>
      <button type="button" aria-label="Next process step" onClick={() => setActive(current => (current + 1) % steps.length)}>{words[2]}</button>
    </div>
    <p className="process-flow-current" aria-live="polite">{selected}</p>
    <nav className="process-flow-steps" aria-label={`${title} steps`}>
      {steps.map((step, index) => <button key={`${step}-${index}`} type="button" aria-current={active === index ? "step" : undefined} aria-label={`Show step ${index + 1}: ${step}`} onClick={() => { setActive(index); setPlaying(false); }}><span>{String(index + 1).padStart(2, "0")}</span><span>{step}</span></button>)}
    </nav>
    {reducedMotion ? <p className="process-flow-note">{words[5]}</p> : null}
  </div>;
}
