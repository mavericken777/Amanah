import { useEffect, useRef } from "react";
import { inferKind, sceneImage } from "./sceneImages";

export function ProcessScene3D({
  mode = "corridor",
  stage = "China to GCC product journey",
  index = 0,
  className = "",
  overviewOnly = false,
}: { mode?: string; stage?: string; index?: number; className?: string; overviewOnly?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    if (typeof IntersectionObserver === "undefined") {
      host.dataset.sceneFallback = "true";
      host.querySelector(".process-scene-loading")?.remove();
      return;
    }
    let scene: { dispose: () => void; setVisible: (value: boolean) => void } | null = null;
    let disposed = false;
    let visible = false;
    const observer = new IntersectionObserver(async entries => {
      visible = entries.some(entry => entry.isIntersecting);
      scene?.setVisible(visible);
      if (!visible) return;
      try {
        const runtime = await import("./processSceneRuntime");
        if (!disposed && visible && !scene) scene = runtime.mountProcessSceneOnElement(host);
      } catch { host.dataset.sceneFallback = "true"; }
    }, { rootMargin: "0px" });
    observer.observe(host);
    return () => { disposed = true; observer.disconnect(); scene?.dispose(); };

  }, []);

  return <div
    ref={ref}
    className={`process-scene-3d ${className}`.trim()}
    data-process-scene="true"
    data-scene={mode}
    data-overview-only={overviewOnly ? "true" : undefined}
    data-stage-label={`${mode} · ${stage}`}
    data-stage-index={index}
    role="group"
    aria-label={`Process explanation: ${stage}`}
  ><img className="process-scene-photograph" src={`assets/${sceneImage(inferKind(overviewOnly ? mode : `${mode} · ${stage}`))}`} alt="" aria-hidden="true" decoding="async" fetchPriority={className.includes("hero") || className.includes("page-scene") ? "high" : "auto"} loading={className.includes("hero") || className.includes("page-scene") ? "eager" : "lazy"} /><span className="process-scene-loading" role="status">Loading animated operating scene…</span><span className="process-scene-caption" aria-hidden="true">{stage}</span><span className="process-scene-orbit" aria-hidden="true" /></div>;
}
