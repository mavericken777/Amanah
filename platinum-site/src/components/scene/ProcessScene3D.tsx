import { useEffect, useRef } from "react";
import { inferKind, sceneAssetUrl } from "./sceneImages";

const SCENE_SLOT_AVAILABLE = "amanah-process-scene-slot-available";
let activeSceneHost: HTMLElement | null = null;

function releaseSceneSlot(host: HTMLElement) {
  if (activeSceneHost !== host) return;
  activeSceneHost = null;
  window.dispatchEvent(new Event(SCENE_SLOT_AVAILABLE));
}

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
    let scene: { dispose: () => void } | null = null;
    let mounting = false;
    let mountTimer = 0;
    let idleHandle = 0;
    let cancelIdle: (() => void) | undefined;
    let sceneVisible = false;
    const onSceneSlotAvailable = () => { if (sceneVisible && !scene && !mounting) scheduleMount(); };
    const mount = async () => {
      if (scene || mounting) return;
      if (activeSceneHost && activeSceneHost !== host) return;
      activeSceneHost = host;
      mounting = true;
      try {
        const runtime = await import("./processSceneRuntime");
        if (host.isConnected && host.dataset.sceneVisible === "true" && activeSceneHost === host) {
          scene = runtime.mountProcessSceneOnElement(host);
          if (!scene) releaseSceneSlot(host);
        } else releaseSceneSlot(host);
      } catch {
        host.dataset.sceneFallback = "true";
        releaseSceneSlot(host);
      } finally {
        mounting = false;
      }
    };
    const scheduleMount = () => {
      window.clearTimeout(mountTimer);
      cancelIdle?.();
      mountTimer = window.setTimeout(() => {
        const idleWindow = window as Window & { requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number; cancelIdleCallback?: (handle: number) => void };
        if (idleWindow.requestIdleCallback) {
          idleHandle = idleWindow.requestIdleCallback(() => { void mount(); }, { timeout: 1200 });
          cancelIdle = () => idleWindow.cancelIdleCallback?.(idleHandle);
        } else void mount();
      }, 6000);
    };
    window.addEventListener(SCENE_SLOT_AVAILABLE, onSceneSlotAvailable);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        sceneVisible = entry.isIntersecting;
        host.dataset.sceneVisible = String(sceneVisible);
        if (sceneVisible) scheduleMount();
        else {
          window.clearTimeout(mountTimer);
          cancelIdle?.();
          if (scene) { scene.dispose(); scene = null; }
          releaseSceneSlot(host);
        }
      });
    }, { rootMargin: "0px" });
    observer.observe(host);
    return () => {
      window.clearTimeout(mountTimer);
      cancelIdle?.();
      window.removeEventListener(SCENE_SLOT_AVAILABLE, onSceneSlotAvailable);
      observer.disconnect();
      scene?.dispose();
      scene = null;
      sceneVisible = false;
      releaseSceneSlot(host);
      delete host.dataset.sceneVisible;
    };
  }, []);

  return <div
    ref={ref}
    className={`process-scene-3d ${className}`.trim()}
    data-process-scene="true"
    data-scene={mode}
    data-overview-only={overviewOnly ? "true" : undefined}
    data-stage-label={`${mode} · ${stage}`}
    data-stage-index={index}
    role="img"
    aria-label={`Cinematic animated process view: ${stage}`}
  ><img className="process-scene-photograph" src={sceneAssetUrl(inferKind(overviewOnly ? mode : `${mode} · ${stage}`))} alt="" aria-hidden="true" decoding="async" /><span className="process-scene-loading" role="status">Loading animated operating scene…</span><span className="process-scene-caption" aria-hidden="true">{stage}</span><span className="process-scene-orbit" aria-hidden="true" /></div>;
}
