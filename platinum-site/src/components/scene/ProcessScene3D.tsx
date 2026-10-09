import { useEffect, useRef } from "react";

export function ProcessScene3D({
  mode = "corridor",
  stage = "China to GCC product journey",
  index = 0,
  className = "",
}: { mode?: string; stage?: string; index?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    if (typeof IntersectionObserver === "undefined") {
      host.dataset.sceneFallback = "true";
      host.querySelector(".process-scene-loading")?.remove();
      return;
    }
    let scene: { dispose: () => void } | null = null;
    let mounting = false;
    let mountTimer = 0;
    let idleHandle = 0;
    let cancelIdle: (() => void) | undefined;
    const mount = async () => {
      if (scene || mounting) return;
      mounting = true;
      try {
        const runtime = await import("./processSceneRuntime");
        if (host.isConnected && host.dataset.sceneVisible === "true") scene = runtime.mountProcessSceneOnElement(host);
      } catch {
        host.dataset.sceneFallback = "true";
      } finally {
        mounting = false;
      }
    };
    const scheduleMount = () => {
      window.clearTimeout(mountTimer);
      cancelIdle?.();
      const idleWindow = window as Window & { requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number; cancelIdleCallback?: (handle: number) => void };
      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(() => { void mount(); }, { timeout: 1100 });
        cancelIdle = () => idleWindow.cancelIdleCallback?.(idleHandle);
      } else {
        mountTimer = window.setTimeout(() => { void mount(); }, 420);
      }
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        host.dataset.sceneVisible = String(entry.isIntersecting);
        if (entry.isIntersecting) scheduleMount();
        else { window.clearTimeout(mountTimer); cancelIdle?.(); if (scene) { scene.dispose(); scene = null; } }
      });
    }, { rootMargin: "160px" });
    observer.observe(host);
    return () => { window.clearTimeout(mountTimer); cancelIdle?.(); observer.disconnect(); scene?.dispose(); delete host.dataset.sceneVisible; };
  }, []);

  return <div
    ref={ref}
    className={`process-scene-3d ${className}`.trim()}
    data-process-scene="true"
    data-scene={mode}
    data-stage-label={`${mode} · ${stage}`}
    data-stage-index={index}
    role="img"
    aria-label={`Three-dimensional animated view: ${stage}`}
  ><span className="process-scene-loading" role="status">Loading animated 3D scene…</span><span className="process-scene-caption" aria-hidden="true">{stage}</span><span className="process-scene-orbit" aria-hidden="true" /></div>;
}
